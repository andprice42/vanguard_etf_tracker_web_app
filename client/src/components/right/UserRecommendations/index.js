import React, { useState } from 'react'
import { Button } from 'antd';
import { connect } from 'react-redux'

import "./style.css"

import Wdata from "./data"
import axiosInstance from '../../../service/request';
import {
    userRe
} from '../../../store/actionCreators';
import { useEffect } from 'react';


function User(props) {
    const [text, setText] = useState()
    const [i, setI] = useState(0)

    const savedToken = JSON.parse(localStorage.getItem('user'))
    useEffect(() => {
        axiosInstance.get(`/ViewFollow?UID=${savedToken.id}`).then((result) => {
            if (result.data.length === 0) {
                setText("You don't have ETF in your Watchlist currently. It's time to add some ETF in Top Movers Section")
                console.log(result);
            } else {
                setI(1)
            }
        }).catch((err) => {
        });
    },[])

    function handleClick() {
        get(1, savedToken.id)
    };
    function handleClick2() {
        get(2, savedToken.id)
    };
    function handleClick3() {
        get(3, savedToken.id)
    };

    function get(name, UId) {
        axiosInstance.get(`/buttonRecommendation?PERMNO=${name}&UId=${UId}`).then((result) => {
            props.go(result.data)
        }).catch((err) => {

        });
    }

     if (i === 0) {
        return <div>
            Please add some ETF to your watchlist so that we can customize recommendations based on your preferences
        </div>;
    }


    return (
        <div>
            <ul className='user'>
                <li>
                    <Button type="primary" onClick={handleClick}>
                        By Volatility
                    </Button>
                </li>
                <li>
                    <Button type="primary" onClick={handleClick2}>
                        By Sector
                    </Button>
                </li>
                <li>
                    <Button type="primary" onClick={handleClick3}>
                        By Performance
                    </Button>
                </li>

            </ul>

            <Wdata/>
        </div>
    )
}

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = dispatch => {
    return {
        go(item) {
            dispatch(userRe(item))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(User)
