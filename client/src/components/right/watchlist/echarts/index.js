import React, { useEffect,useState } from 'react'
import ReactEcharts from 'echarts-for-react';
import { connect } from 'react-redux'

import {
    addNumber,
    goData
} from '../../../../store/actionCreators'

import './style.css'

import axiosInstance from '../../../../service/request';

function Echarts(props) {
    
    const [data, setData] = useState([])
    const [volume, setVolume] = useState()
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function echarts() {
            if (props.godata.permno === undefined) {
                const response = await axiosInstance.get(`/HistoricalPrices?PERMNO=${props.godata.PERMNO}`)
                console.log(response.data);
                setData(response.data);
            } else {
                const response = await axiosInstance.get(`/HistoricalPrices?PERMNO=${props.godata.permno}`)
                console.log(response.data);
                setData(response.data);
            }
        }

        async function Volume() {
            if (props.godata.permno === undefined) {
                const response = await axiosInstance.get(`/introduce?PERMNO=${props.godata.PERMNO}`)
                setVolume(response.data);
                setLoading(false);
            } else {
                const response = await axiosInstance.get(`/introduce?PERMNO=${props.godata.permno}`)

                setVolume(response.data);
                setLoading(false);
            }
        }

        echarts()
        Volume()
    }, [])
    
    const chartData = data.map(item => ({
        name: item.date,
        value: item.price
    }));

    const option = {
        title: {
            text: props.godata.ticker
        },
        xAxis: {
            type: 'category',
            data: chartData.map(item => item.name) 
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: chartData.map(item => item.value), 
            type: 'bar'
        }]
    };

    if (loading) {
        return <div>Loading...</div>;
      }

    const risk = (i) => {
    const sum = []
    for (let j = 0; j < i; j++) {
        sum.push(<svg t="1712041923106" className="icon" viewBox="0 0 1024 1024" version="1.1"
        xmlns="http://www.w3.org/2000/svg" p-id="21600" width="200" height="200" key={j*2^10}>
        <path
            d="M512 85.9l110.8 318.7 337.2 6.8-268.8 203.8 97.7 322.9L512 745.4 235.1 938.1l97.7-322.9L64 411.4l337.2-6.8z"
            p-id="21601" fill="#2c2c2c"></path>
    </svg>)
    }

    return sum
}
    return (
        <div>
            <ReactEcharts option={option} style={{ height: '400px' }} />
            <table>
                <tbody>
                    <tr>
                        <td>
                            <h2><span>{props.godata.ticker}</span> Summary:</h2>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>
                            Volume:<span>{volume.volume}</span>
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>
                            Average Daily Volume: <span>{volume.avgDailyVolume}</span>
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>
                            Risk: <span>{risk(volume.risk)}</span>
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>
                                Top 10 Holdings:
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <table className="excel_text_table">
                                <tbody>
                                    <tr>
                                        <td>
                                            <h4>Symbol</h4>
                                        </td>
                                        <td>
                                            <h4>Company Name</h4>
                                        </td>
                                        <td>
                                            <h4>Holding Percentage</h4>
                                        </td>
                                    </tr>
                                    {
                                        volume.topHoldings.map((item, index) => {
                                            return <tr className='meta' onClick={e => props.go(3, item)} key={index}>
                                                <td>
                                                    <p>
                                                        {item.ticker}
                                                    </p>
                                                </td>
                                                <td>
                                                    <p>
                                                        {item.comnam}
                                                    </p>
                                                </td>
                                                <td>
                                                    <p>
                                                        {item.Holding_pct}
                                                    </p>
                                                </td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}


const mapStateToProps = state => {
    return {
        godata: state.godata
    }
}

const mapDispatchToProps = dispatch => {
    return {
        go(num, item) {
            dispatch(goData(item))
            dispatch(addNumber(num))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Echarts)