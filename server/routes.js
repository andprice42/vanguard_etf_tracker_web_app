const mysql = require('mysql')
const config = require('./config.json')

const connection = mysql.createConnection({
    host: config.rds_host,
    user: config.rds_user,
    password: config.rds_password,
    port: config.rds_port,
    database: config.rds_db
});
connection.connect(err => {
    if (err) {
        console.error('Error: Connection to the database', err.stack);
        return;
    }
    console.log('Successfully connected to the database');
});


const createClient = async function (req, res) {
    const { name, password, email } = req.body;

    const query = `
    INSERT INTO Clients (name, password, email) Values (?, ?, ?)
    `;
    connection.query(query, [name, password, email], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "An error occurred while retrieving ETFs." });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: "No ETFs found." });
        }
        res.status(200).json(results);
    });
};

const deleteClient = async function (req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
    }

    const deleteQuery = `DELETE FROM Clients WHERE email = ? AND password = ?`;
    connection.query(deleteQuery, [email, password], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "An error occurred while deleting your account." });
        }

        if (result.affectedRows === 0) {
            return res.status(401).json({ message: "Invalid email or password." });
        }

        res.json({ message: "Account deleted successfully." });
    });
};
const logout = function (req, res) {
    req.session.destroy(err => {
        if (err) {
            res.status(500).json({ message: "An error occurred during logout." });
        } else {
            res.json({ message: "Logout successful." });
        }
    });
}

const login = async function (req, res) {
    const { email, password } = req.body;
    const query = `SELECT CID, name FROM Clients WHERE email = ? AND password = ? LIMIT 1`;

    connection.query(query, [email, password], (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).json({ message: "An error occurred during login." });
        } else if (results.length === 0) {
            res.status(401).json({ message: "Invalid email or password." });
        } else {
            const user = results[0];
            req.session.user = { id: user.CID, name: user.name };
            req.session.islogin = true
            res.json({ message: "Login successful.", user: req.session.user });
        }

    });
}

const ViewFollow = async function (req, res) {

    const { UID } = req.query

    // if (!req.session.user) {
    //     return res.status(403).json({ message: "Please log in to view your watchlist." });
    // }
    connection.query(`
    SELECT edr.permno, edr.ticker, edr.name, round(edr.price, 2) as price, CONCAT(CAST(ROUND(edr.daily_return*100,2) AS CHAR), '%') AS DailyReturn,
         case when edr.daily_return >=0 then 1 else 0 end as indicator
    FROM Watchlist w
    LEFT JOIN daily_returns edr
    ON w.PERMNO = edr.PERMNO
    WHERE w.cid = ? and date = (select max(date) from daily_returns)
    `, [UID], (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).json({ message: "An error occurred while retrieving the watchlist." });
        } else {
            res.status(200).json(data);
        }
    });
}

const HistoricalPrices = async function (req, res) {
    const { PERMNO } = req.query

    const query = `
    SELECT date_format(date, '%Y-%m-%d') as date, price from ETF_Prices where date >= '2023-01-01' and PERMNO = ?;
    `;
    connection.query(query, [PERMNO], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "An error occurred while retrieving ETFs." });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: "No ETFs found." });
        }
        res.status(200).json(results);
    });
}

const introduce = async function (req, res) {
    const { PERMNO } = req.query

    //Query for volume
    connection.query(`
    SELECT volume from ETF_Prices where PERMNO = ? and date = (select max(date) from ETF_Prices);
    `, [PERMNO], (error, results, fields) => {
        if (error) {
            console.error('Error executing volume query: ', error);
            res.status(500).send('Error fetching volume');
            return;
        }

        const volume = results[0].volume;

        // query for  Average Daily Volume
        connection.query('SELECT avg_daily_vol FROM avg_daily_volume where permno = ?;', [PERMNO], (error, results, fields) => {
            if (error) {
                console.error('Error executing avg_daily_vol query: ', error);
                res.status(500).send('Error fetching avg_daily_vol');
                return;
            }

            const avgDailyVolume = results[0].avg_daily_vol;

            // query for Risk
            connection.query(`
          Select case when risk <= 0.05 then 1 when risk <=0.1 then 2 when risk <= 0.25 then 3 when risk <= 0.5 then 4 else 5 end as risk_level from volatility where permno = ?
          `, [PERMNO], (error, results, fields) => {
                if (error) {
                    console.error('Error executing risk query: ', error);
                    res.status(500).send('Error fetching risk');
                    return;
                }
                const risk = results[0].risk_level;

        // query for Top 10 Holdings
    
            connection.query(`
                select s.Stock_PERMNO, s.ticker, s.comnam, CONCAT(CAST(ROUND(lh.Holding_pct*100,2) AS CHAR),'%') AS Holding_pct from latest_holdings lh
             JOIN ETFs
             on lh.ETF_PERMNO = ETFs.PERMNO
             JOIN stocks s
             on lh.Stock_PERMNO = s.Stock_PERMNO
             where ETFs.PERMNO = ?
             order by Holding_pct DESC
             LIMIT 10;
             `, [PERMNO], (error, results, fields) => {
                    if (error) {
                        console.error('Error executing top holdings query: ', error);
                        res.status(500).send('Error fetching top holdings');
                        return;
                    }

                    const topHoldings = results;

                    // return all results to the client
                    res.json({ volume, avgDailyVolume, risk, topHoldings });
                });
            });

        });
    });
}
const ShareDetails = async function (req, res) {
    const { PERMNO } = req.query

    // console.log(PERMNO);
    const query = `
    select date_format(date, '%Y-%m-%d') as date,  close from stocks_price sp
        where PERMNO = ?
          order by date;
    `;
    connection.query(query, [PERMNO], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "An error occurred while retrieving ETFs." });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: "No ETFs found." });
        }
        res.status(200).json(results);
    });
}

const ShareDetailsText = async function (req, res) {
    const { PERMNO } = req.query

    const query = `
    select  s.sector, s.industry, s.country,sp.volume,
              round(sp.open, 2) as open, round(sp.high, 2) as high, round(sp.low, 2) as low, round(sp.close, 2) as close,
    CONCAT(CAST(ROUND(sp.low, 2) AS CHAR), ' - ', CAST(ROUND(sp.high, 2) AS CHAR)) AS daily_range,
    CONCAT(CAST(ROUND(sdr.DailyReturn*100,2) AS CHAR), '%') AS DailyReturn,
    round(s52whl.Year_High, 2) as Year_High, round(s52whl.Year_Low, 2) as Year_Low
from stocks_price sp
join stocks s on s.Stock_PERMNO = sp.PERMNO
join stock_daily_return sdr on sp.date = sdr.date and s.Stock_PERMNO = sdr.Stock_PERMNO
JOIN (SELECT PERMNO, MAX(close) AS Year_High, MIN(close) AS Year_Low
      FROM stocks_price
      WHERE date >= ((select max(date) from stocks_price) - INTERVAL 365 DAY)
GROUP BY PERMNO) s52whl
    on s52whl.PERMNO = sp.PERMNO
where s.Stock_PERMNO = ? and sp.date = (select max(date) from stocks_price);
    `;
    connection.query(query, [PERMNO], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "An error occurred while retrieving ETFs." });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: "No ETFs found." });
        }
        res.status(200).json(results);
    });
}

const recommendation = async function (req, res) {
    const { UID, name } = req.query

    const query = `
    SELECT PERMNO, ticker, name, asset_class, price, daily_return, indicator, risk,
       case when CID is null then 0 else 1 end as followFlag
FROM (select tm.PERMNO,
             tm.ticker,
             tm.name,
             tm.asset_class,
             tm.price,
             round(tm.price, 2),
             CONCAT(CAST(ROUND(tm.daily_return * 100, 2) AS CHAR), '%') AS daily_return,
             case when tm.daily_return >= 0 then 1 else 0 end           as indicator,
             w.CID,
             case
                 when tm.risk <= 0.05 then 1
                 when tm.risk <= 0.1 then 2
                 when tm.risk <= 0.25 then 3
                 when tm.risk <= 0.5 then 4
                 else 5 end as risk
      from (select e.PERMNO,
                   e.ticker,
                   e.name,
                   e.asset_class,
                   dr.price,
                   dr.daily_return,
                   v.risk
            FROM daily_returns dr
                     join ETFs e on dr.PERMNO = e.PERMNO
                     join volatility v on v.permno = e.PERMNO
            where dr.date = (select max(date) from daily_returns)
            ) tm
               LEFT JOIN (SELECT * FROM Watchlist WHERE CID = ?)w
                         ON w.PERMNO = tm.PERMNO) fl
                         where ticker LIKE ? or name like ? or  asset_class like ?
            order by daily_return desc
    `;
    connection.query(query, [UID, `%${name}%`, `%${name}%`, `%${name}%`], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "An error occurred while retrieving ETFs." });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: "No ETFs found." });
        }
        res.status(200).json(results);
    });
}

// search top10
const searchrecommendation = async function (req, res) {
    const { UID, name, num1, num2 } = req.query

    const query = `
    SELECT PERMNO, ticker, name, asset_class, price, daily_return, indicator, risk,
       case when CID is null then 0 else 1 end as followFlag
FROM (select tm.PERMNO,
             tm.ticker,
             tm.name,
             tm.asset_class,
             tm.price,
             round(tm.price, 2),
             CONCAT(CAST(ROUND(tm.daily_return * 100, 2) AS CHAR), '%') AS daily_return,
             case when tm.daily_return >= 0 then 1 else 0 end           as indicator,
             w.CID,
             case
                 when tm.risk <= 0.05 then 1
                 when tm.risk <= 0.1 then 2
                 when tm.risk <= 0.25 then 3
                 when tm.risk <= 0.5 then 4
                 else 5 end as risk
      from (select e.PERMNO,
                   e.ticker,
                   e.name,
                   e.asset_class,
                   dr.price,
                   dr.daily_return,
                   v.risk
            FROM daily_returns dr
                     join ETFs e on dr.PERMNO = e.PERMNO
                     join volatility v on v.permno = e.PERMNO
            where dr.date = (select max(date) from daily_returns)
            ) tm
               LEFT JOIN (SELECT * FROM Watchlist WHERE CID = ?)w
                         ON w.PERMNO = tm.PERMNO) fl
where ticker LIKE ? or name like ? or  asset_class like ?
order by daily_return desc
LIMIT ? OFFSET ?
    `;
    connection.query(query, [UID, `%${name}%`, `%${name}%`, `%${name}%`, parseInt(num1), parseInt(num2)], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "An error occurred while retrieving ETFs." });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: "No ETFs found." });
        }
        res.status(200).json(results);
    });
}


const button = async function (req, res) {
    const { PERMNO } = req.query

    const query = `
    SELECT DISTINCT catID, Category FROM Recommendation
    `;
    connection.query(query, [PERMNO], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "An error occurred while retrieving ETFs." });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: "No ETFs found." });
        }
        res.status(200).json(results);
    });
}

const buttonRecommendation = async function (req, res) {
    const { PERMNO, UId } = req.query
    const query = `
    select r.PERMNO as permno, dr.ticker, dr.name, round(dr.price, 2) as price, 
      CONCAT(CAST(ROUND(dr.daily_return*100,2) AS CHAR), '%') AS DailyReturn,
        case when dr.daily_return >=0 then 1 else 0 end as indicator
FROM Recommendation r
join daily_returns dr
on r.PERMNO = dr.permno 
where date = (select max(date) from daily_returns) and r.catID = ? and r.cid= ?
    `;
    connection.query(query, [PERMNO, UId], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "An error occurred while retrieving ETFs." });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: "No ETFs found." });
        }
        res.status(200).json(results);
    });
}

// check if the ETF is in the watchlist
const JudgingAttention = async function (req, res) {
    const { UID, PERMNO } = req.query

    const query = `
    SELECT CASE 
    WHEN EXISTS (
        SELECT 1 
        FROM Watchlist 
        WHERE CID = ? AND permno = ?
    ) THEN 1 
    ELSE 0 
  END AS result;
    `;
    connection.query(query, [UID, PERMNO], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "An error occurred while retrieving ETFs." });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: "No ETFs found." });
        }
        res.status(200).json(results);
    });
}

// add to watchlist
const AddFollow = async function (req, res) {
    const { UID, PERMNO } = req.query

    const query = `
    INSERT INTO Watchlist (CID, PERMNO) VALUES (?, ?)
    `;
    connection.query(query, [UID, PERMNO], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "An error occurred while retrieving ETFs." });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: "No ETFs found." });
        }
        res.status(200).json(results);
    });
}

const DELEFollow = async function (req, res) {
    const { UID, PERMNO } = req.query

    const query = `
    DELETE FROM Watchlist WHERE CID = ? AND PERMNO = ?
    `;
    connection.query(query, [UID, PERMNO], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "An error occurred while retrieving ETFs." });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: "No ETFs found." });
        }
        res.status(200).json(results);
    });
}


module.exports = {
    login,
    logout,
    createClient,
    deleteClient,
    ViewFollow,
    HistoricalPrices,
    introduce,
    ShareDetails,
    ShareDetailsText,
    recommendation,
    button,
    buttonRecommendation,
    JudgingAttention,
    AddFollow,
    DELEFollow,
    searchrecommendation
};
