import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Table, Pagination } from 'antd';

import {
    addNumber,
    goData
} from "../../../../store/actionCreators"

import "./style.css"

import axiosInstance from "../../../../service/request.js"

function DataShow(props) {
    const [data, setData] = useState([])

    const [currentPage, setCurrentPage] = useState(0)
    const [pageSize, setPageSize] = useState(10)

    const [searchName, setSearchName] = useState("")

    const [total, setTotal] = useState(0)

    useEffect(() => {
        GetDataList()
        GetDataTotal()
    }, [])

    useEffect(() => {
        GetDataList()
        GetDataTotal()
    }, [data])

    useEffect(() => {
        GetDataList()  
    }, [currentPage, pageSize])

    useEffect(() => {
        GetDataList()
        GetDataTotal()
    }, [searchName])

    function f1(){
        return <svg t="1712038739921" className="icon" viewBox="0 0 1024 1024" version="1.1"
        xmlns="http://www.w3.org/2000/svg" p-id="1458" width="200" height="200">
        <path
            d="M511.488 64.468c-246.974 0-447.184 200.211-447.184 447.185 0 246.972 200.21 447.185 447.184 447.185s447.185-200.213 447.185-447.185c0-246.974-200.21-447.185-447.185-447.185z m223.795 472.027h-198.95v198.953c0 13.608-11.028 24.64-24.846 24.64-13.72 0-24.845-11.311-24.845-24.64V536.495h-198.95c-13.607 0-24.64-11.027-24.64-24.842 0-13.722 11.31-24.845 24.64-24.845h198.953V287.856c0-13.608 11.027-24.64 24.844-24.64 13.72 0 24.845 11.311 24.845 24.64v198.953h198.95c13.611 0 24.643 11.027 24.643 24.845-0.002 13.719-11.313 24.84-24.644 24.84z"
            p-id="1459"></path>
    </svg>
    }
    function f2(){
        return <svg t="1712038747941" className="icon" viewBox="0 0 1024 1024" version="1.1"
        xmlns="http://www.w3.org/2000/svg" p-id="1447" width="200" height="200">
        <path
            d="M512 58.368c-246.784 0-446.976 200.192-446.976 446.976 0 246.784 200.192 446.976 446.976 446.976s446.976-200.192 446.976-446.976c0-246.784-200.192-446.976-446.976-446.976z m225.28 472.576H286.72c-14.336 0-25.6-11.776-25.6-25.6s11.776-25.6 25.6-25.6h450.56c14.336 0 25.6 11.776 25.6 25.6s-11.264 25.6-25.6 25.6z"
            p-id="1448"></path>
    </svg>
    }
    // function handleNameClick(record, index){
    //     if(record.followFlag === 0){
    //         handleAddClick(record, index)
    //     }else{
    //         handleDeleteClick(record, index)
    //     }
    // }
    const columns = [
        {
            title: 'Symbol',
            dataIndex: 'ticker',
            key: 'Symbol',
            render: (text, record,index) => {
                return (
                    <div className='icon2'>
                        <span  onClick={() => handleNameClick(record, index)}>
                        {record.followFlag === 0 ? f1() : f2()}
                        </span>

                        <span onClick={() => props.go(2,record)}>{text}</span>
                    </div>
                )
            }
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'Name',
        },
        {
            title: 'Asset class',
            dataIndex: 'asset_class',
            key: 'Asset class',
        },
        {
            title: 'Risk',
            dataIndex: 'risk',
            key: 'Risk',
            render: (text, record,index) => {
                return (
                    <div key={index^0.3}>
                        {risk(text)}
                    </div>
                )
            }
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'Price',
        },
        {
            title: 'Changes',
            dataIndex: 'daily_return',
            key: 'Changes',
        },
    ]

    // inital ETF list
    const GetDataList = async () => {
        try {
            const savedToken = JSON.parse(localStorage.getItem('user'));
            
            const response = await axiosInstance.get(`/searchrecommendation?name=${searchName}&num1=${pageSize}&num2=${currentPage * 10}&UID=${savedToken.id}`)
            setData(response.data)

        } catch (error) {
            console.log(error);
        }
    }

    //get all the ETF
    const GetDataTotal = async () => {
        try {
            const savedToken = JSON.parse(localStorage.getItem('user'));
            const response = await axiosInstance.get(`/recommendation?UID=${savedToken.id}&name=${searchName}`)
            setTotal(response.data.length)
            
        } catch (error) {
            console.log(error);
        }
    }

    const handlechangePage = (current, pageSize) => {

        if (current > 0) {
            current = current - 1
        }
        setCurrentPage(current)
        setPageSize(pageSize)
    }

    // elastic search
    const handlesearch = e => {
        const valueAsString = e.target.value.toString()
        console.log(valueAsString);
        setSearchName(e.target.value)
        setCurrentPage(0)
    }


    // add to follow
    
const handleNameClick = (record, index) => {
        const savedToken = JSON.parse(localStorage.getItem('user'));
        if (record.followFlag === 0) {
            axiosInstance.get(`/AddFollow?UID=${savedToken.id}&PERMNO=${record.PERMNO}`).then((result) => {
                alert("Successfully added")
            }).catch((err) => {
                alert("Failed to add, please try again later.")
                console.log(err);
            });
        } 
        if(record.followFlag === 1){
            axiosInstance.get(`/DELEFollow?UID=${savedToken.id}&PERMNO=${record.PERMNO}`).then((result) => {
                alert("Successfully removed.")
            }).catch((err) => {
                alert("Failed to remove, please try again later.")
                console.log(err);
            });
        }
    };
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

            <div className="box_Search">
                <svg t="1712040596292" className="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="20429" width="200" height="200">
                    <path
                        d="M756.565333 697.258667c2.133333 1.493333 4.224 3.157333 6.101334 5.12l241.664 241.621333c16.256 16.256 16.512 43.52-0.128 60.16a42.453333 42.453333 0 0 1-60.202667 0.170667l-241.664-241.664a41.429333 41.429333 0 0 1-5.034667-6.101334A424.917333 424.917333 0 0 1 426.666667 853.333333C191.018667 853.333333 0 662.314667 0 426.666667S191.018667 0 426.666667 0s426.666667 191.018667 426.666666 426.666667c0 102.698667-36.266667 196.949333-96.768 270.592zM426.666667 768a341.333333 341.333333 0 1 0 0-682.666667 341.333333 341.333333 0 0 0 0 682.666667z"
                        fill="#3D3D3D" p-id="20430"></path>
                </svg>

                <input type="text" placeholder="Search" value={searchName} onChange={handlesearch} />
            </div>

            <Table columns={columns} dataSource={data} rowKey={(record) => record.PERMNO} pagination={false} />
            <Pagination
                showSizeChanger
                onShowSizeChange={handlechangePage}
                defaultCurrent={currentPage}
                onChange={handlechangePage}
                total={total}
            />
        </div >
    )
}

const mapStateToProps = state => {
    return {
        vanguardlist: state.vanguardlist
    }
}

const mapDispatchToProps = dispatch => {
    return {
        go(num, item) {
            dispatch(addNumber(num))
            dispatch(goData(item))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataShow)