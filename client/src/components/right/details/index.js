import React,{useEffect,useState} from 'react'
import { connect } from 'react-redux'

import axiosInstance from '../../../service/request'

import './style.css'

import Detailscharts from './detailsEcharts'
import DetailsText from './detailsText'


function Details(props) {
    const [data, setData] = useState([])
    const [text, setText] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function echarts() {
            const response = await axiosInstance.get(`/ShareDetails?PERMNO=${props.godata.Stock_PERMNO}`)
            setData(response.data);
        }
        async function text() {
            const response = await axiosInstance.get(`/ShareDetailsText?PERMNO=${props.godata.Stock_PERMNO}`)
            setText(response.data);
            setLoading(false);
        }

        echarts()
        text()
    }, [])
 
    if (loading) {
        return <div>Loading...</div>;
    }
    const ec ={
        name: props.godata.ticker,
        data: data
    }

    return (
        <div className="details">
            <Detailscharts data={ec}/>
            <DetailsText data={text}/>
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
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Details)