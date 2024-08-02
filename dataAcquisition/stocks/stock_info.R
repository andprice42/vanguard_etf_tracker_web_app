library(DBI)
library(tidyquant)
library(tidyverse)
library(dplyr)
library(RMySQL)
library(quantmod)

setwd("~/Documents/UPenn/CIS550/GroupProject/cis5500-project/dataAcquisition/stocks/")

#Establish the baseline for stocks on PERM number mapping
res = dbSendQuery(wrds, "SELECT bb.* FROM 
                          (SELECT aa.*, ROW_NUMBER() OVER (PARTITION BY aa.PERMNO ORDER BY aa.nameenddt DESC) AS rn2
                                  FROM (SELECT *, ROW_NUMBER() OVER (PARTITION BY ticker ORDER BY nameenddt DESC) AS rn 
                                        FROM crsp.stocknames) aa 
                                where aa.rn = 1 ) bb
                           where bb.rn2 = 1"
                  )
permno_mapping <- dbFetch(res)
dbClearResult(res)
mapping_clean <- permno_mapping %>% select(permno, nameenddt, ticker, comnam)

cn <- dbConnect(drv      = RMySQL::MySQL(), 
                username = "icey", 
                password = "cyvfyv-zipnoK-0jucty", 
                host     = "iceydatabase.caqw1q4tuhyj.us-east-1.rds.amazonaws.com", 
                port     = 3306, 
                dbname   = "vanguard")
holdings <- dbGetQuery(cn, "select distinct Stock_PERMNO FROM Holdings")

stocks <- holdings %>% left_join(mapping_clean, by = c("Stock_PERMNO" = "permno")) %>%
                       mutate(ticker = ifelse(Stock_PERMNO == '83443' & is.na(ticker), 'BRK-B',  ticker)) %>%
                       mutate(nameenddt = ifelse(Stock_PERMNO == '83443' & is.na(nameenddt), '2023-12-29',  nameenddt)) %>%
                       mutate(comnam = ifelse(Stock_PERMNO == '83443' & is.na(comnam), 'Berkshire Hathaway Inc Class B',  comnam)) %>%
                       #mutate(ticker = ifelse(Stock_PERMNO == '14752' & is.na(ticker), 'TPL',  ticker)) %>%
                       #mutate(nameenddt = ifelse(Stock_PERMNO == '14752' & is.na(nameenddt), '2023-12-29',  nameenddt)) %>%
                       #mutate(comnam = ifelse(Stock_PERMNO == '14752' & is.na(comnam), 'Texas Pacific Land Corporation',  comnam)) %>%
                       mutate(ticker = ifelse(ticker == 'NXGN', 'NXGN.TA', ticker)) %>%
                       rename(PERMNO = Stock_PERMNO, company = comnam) %>%
                       select(PERMNO, ticker, company)

write.csv(stocks, "stock_tickers.csv", row.names = FALSE)