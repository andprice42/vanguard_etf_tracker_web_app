from datetime import datetime, timedelta
import time
import pandas as pd
import numpy as np
from sqlalchemy import create_engine, text
import mysql.connector as mc
from mysql.connector import Error
import yfinance as yf
from yahooquery import Ticker

db_connection_str = 'mysql+mysqlconnector://icey:cyvfyv-zipnoK-0jucty@iceydatabase.caqw1q4tuhyj.us-east-1.rds.amazonaws.com/vanguard'
db_connection = create_engine(db_connection_str)

with db_connection.connect() as connection:
    connection.execute(text("USE vanguard;"))  
    query = text("SELECT * FROM stocks;")  
    result = connection.execute(query)  
    holdings_data = result.fetchall()
    df = pd.DataFrame(holdings_data, columns=result.keys())

stock_list = list(df['ticker'])
today = datetime.now().strftime('%Y-%m-%d')
df_stock = Ticker('ABBV').history(start=today, end=today).reset_index(level=[0,1])
for stock in stock_list[1:]:
    try:
        d1 = Ticker(stock).history(start=today, end=today).reset_index(level=[0,1])
        df_stock = pd.concat([df_stock,d1], ignore_index= True)
    except:
        pass
    
with db_connection.connect() as connection:
    connection.execute(text("USE vanguard;")) 
    query = text("SELECT * FROM Holdings_Extended;")  
    result = connection.execute(query)  
    holdings_data = result.fetchall()
    df = pd.DataFrame(holdings_data, columns=result.keys())
    
df_stock_permno = df[['Stock_PERMNO','Stock_ticker']].drop_duplicates()
df_stock_permno = df_stock_permno.rename(columns={'Stock_PERMNO':'PERMNO','Stock_ticker':'symbol'})
df_stock_price = df_stock.merge(df_stock_permno, on = 'symbol', how = 'left' )
df_stock_price = df_stock_price[['PERMNO','date','open','high','low','close','volume']]
df_stock_price = df_stock_price.dropna(subset='PERMNO')
df_stock_price['PERMNO'] = df_stock_price['PERMNO'].apply(lambda x: int(x))
df_stock_price['volume'] = df_stock_price['volume'].apply(lambda x: int(x))

df_stock_price.to_sql('stocks_price', con = db_connection, if_exists = 'replace', index = False)