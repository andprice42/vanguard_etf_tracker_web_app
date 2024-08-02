import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import axiosInstance from '../../../../service/request'

import {
    addNumber,
    goData,
    addWatchlist
} from '../../../../store/actionCreators'

function Wdata(props) {
    const [text, setText] = useState()
    const savedToken = JSON.parse(localStorage.getItem('user'))

    useEffect(() => {
        axiosInstance.get(`/ViewFollow?UID=${savedToken.id}`).then((result) => {
            if (result.data.length === 0) {
                setText("You don't have ETF in your Watchlist currently. It's time to add some ETF in Top Movers Section")
            } else {
                props.da(result.data)
            }
        }).catch((err) => {
            // console.log(err);
            // alert("403")
            // localStorage.removeItem('user');
            // window.location.reload()
        });
    }, [props.watchlist])

    function svg1() {
        return <svg t="1714068683120" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2312" width="200" height="200"><path d="M490.25408215 1009.56037424l0-652.37753843L550.65940993 357.18283581 550.65940993 1009.56037424l-60.40532778-2e-8z" fill="#65a542" p-id="2313"></path><path d="M309.4952894 350.18868834L515.8019253-1.0901777l211.88249064 351.27886604-418.18912654 0z" fill="#65a542" p-id="2314"></path></svg>
    }

    function svg2() {
        return <svg t="1714068731308" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3582" width="200" height="200"><path d="M839.68535914 66.87048248l0 611.60394228L783.05536433 678.47442476 783.05536433 66.87048248l56.62999481 2e-8z" fill="#ba3b30" p-id="3583"></path><path d="M1009.14672734 685.03143801L815.73425616 1014.35537492l-198.63983493-329.32393691 392.05230611 0z" fill="#ba3b30" p-id="3584"></path></svg>
    }

    if (props.watchlist === 0) {
        return <div>Loading...</div>;
    }

    function t(item) {
        const savedToken = JSON.parse(localStorage.getItem('user'));

        axiosInstance.get(`/DELEFollow?UID=${savedToken.id}&PERMNO=${item.permno}`).then((result) => {
            alert("Removed Successfully")
            window.location.reload()
            console.log(result);
        }).catch((err) => {
            alert("Failed to remove, please try again later.")
            console.log(err);
        });

    }
    return (
        <div>
            {
                text
            }
            <ul className="box_right_show">
                {
                    props.watchlist.map((item, index) => [
                        <li key={item.permno}>
                            <table className="box_table">
                                <tbody>
                                    <tr>
                                        <td align="left">
                                            <h2 onClick={e => props.go(2, item)}>{item.ticker}</h2>
                                        </td>
                                        <td align="right" onClick={e => t(item)}>
                                            <svg t="1712038747941" className="icon" viewBox="0 0 1024 1024" version="1.1"
                                                xmlns="http://www.w3.org/2000/svg" p-id="1447" width="200" height="200">
                                                <path
                                                    d="M512 58.368c-246.784 0-446.976 200.192-446.976 446.976 0 246.784 200.192 446.976 446.976 446.976s446.976-200.192 446.976-446.976c0-246.784-200.192-446.976-446.976-446.976z m225.28 472.576H286.72c-14.336 0-25.6-11.776-25.6-25.6s11.776-25.6 25.6-25.6h450.56c14.336 0 25.6 11.776 25.6 25.6s-11.264 25.6-25.6 25.6z"
                                                    p-id="1448"></path>
                                            </svg>
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
        watchlist: state.watchlist
    }
}

const mapDispatchToProps = dispatch => {
    return {
        go(num, item) {
            dispatch(addNumber(num))
            dispatch(goData(item))
        },
        da(data) {
            dispatch(addWatchlist(data))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wdata)