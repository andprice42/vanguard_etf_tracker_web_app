import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import {
    addNumber,
    goData,
} from '../../../../store/actionCreators'
import axiosInstance from '../../../../service/request'


function Wdata(props) {

    const [data, setData] = useState([])
    // useEffect(() => {setData([])}, [])
    function svg1() {
        return <svg t="1714068683120" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2312" width="200" height="200"><path d="M490.25408215 1009.56037424l0-652.37753843L550.65940993 357.18283581 550.65940993 1009.56037424l-60.40532778-2e-8z" fill="#65a542" p-id="2313"></path><path d="M309.4952894 350.18868834L515.8019253-1.0901777l211.88249064 351.27886604-418.18912654 0z" fill="#65a542" p-id="2314"></path></svg>
    }

    function svg2() {
        return <svg t="1714068731308" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3582" width="200" height="200"><path d="M839.68535914 66.87048248l0 611.60394228L783.05536433 678.47442476 783.05536433 66.87048248l56.62999481 2e-8z" fill="#ba3b30" p-id="3583"></path><path d="M1009.14672734 685.03143801L815.73425616 1014.35537492l-198.63983493-329.32393691 392.05230611 0z" fill="#ba3b30" p-id="3584"></path></svg>
    }

    if (props.userre.length === 0) {
        return <div></div>;
    }

    // Add to follow 
    function t(item) {
        const savedToken = JSON.parse(localStorage.getItem('user'));

        axiosInstance.get(`/AddFollow?UID=${savedToken.id}&PERMNO=${item.permno}`).then((result) => {
            alert("Successfully added")
        }).catch((err) => {
            alert("Failed to add, please try again later.")
            console.log(err);
        });

    }

    return (
        <div>
            <ul className="box_right_show">
                {
                    props.userre.map((item, index) => [
                        <li key={item.permno}>
                            <table className="box_table">
                                <tbody>
                                    <tr>
                                        <td align="left">
                                            <h2 onClick={e => props.go(2, item)}>{item.ticker}</h2>
                                        </td>
                                        <td align="right" onClick={e => t(item)}>
                                            <svg t="1712038739921" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1458" width="200" height="200"><path d="M511.488 64.468c-246.974 0-447.184 200.211-447.184 447.185 0 246.972 200.21 447.185 447.184 447.185s447.185-200.213 447.185-447.185c0-246.974-200.21-447.185-447.185-447.185z m223.795 472.027h-198.95v198.953c0 13.608-11.028 24.64-24.846 24.64-13.72 0-24.845-11.311-24.845-24.64V536.495h-198.95c-13.607 0-24.64-11.027-24.64-24.842 0-13.722 11.31-24.845 24.64-24.845h198.953V287.856c0-13.608 11.027-24.64 24.844-24.64 13.72 0 24.845 11.311 24.845 24.64v198.953h198.95c13.611 0 24.643 11.027 24.643 24.845-0.002 13.719-11.313 24.84-24.644 24.84z" p-id="1459"></path></svg>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td colSpan="2">
                                            <p>{item.name}</p>
                                        </td>
                                        <td>
                                            &nbsp;
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>&nbsp;</td>
                                        <td align="right">
                                            <h3> $ <span>{item.price}</span></h3>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>&nbsp;</td>
                                        <td align="right">
                                            <span className={item.indicator ? 'rise' : 'fall'}>{item.DailyReturn}</span>
                                            {item.indicator === 0 ? svg2() : svg1()}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </li>
                    ])
                }
            </ul>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        godata: state.godata,
        userre: state.userre
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

export default connect(mapStateToProps, mapDispatchToProps)(Wdata)