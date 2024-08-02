import React, { memo, useRef, useEffect } from 'react'
import * as echarts from 'echarts';

export default memo(function Vgtext(data) {
    const chartRef = useRef(null);

    useEffect(() => {
        const chartDom = chartRef.current;
        if (chartDom) {
            const myChart = echarts.init(chartDom);
            const option = {
                title: {
                    text: data.data.Symbol
                },
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        data: [820, 932, 901, 934, 1290, 1330, 1320],
                        type: 'line',
                        smooth: true
                    }
                ]
            };
            myChart.setOption(option);
        }
    }, []);

    return (
        <div>
            <ul className="box_excel">
                <li className="excel_data">
                    <div id="main" ref={chartRef}></div>
                </li>
                <li className="excel_text">
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <a href="./details.html">
                                        <h2><span>VTEC</span> Summary:</h2>
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p>
                                        Previous Close: $ <span>131.02</span>
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p>
                                        Year Range: <span>$92.64 - $132.47</span>
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p>
                                        Market Cap: <span>3.04B USD</span>
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
                                                <h4>Symbols Company</h4>
                                            </td>
                                            <td>
                                                <h4>Company</h4>
                                            </td>
                                            <td>
                                                <h4>%Assets</h4>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p>
                                                    META
                                                </p>
                                            </td>
                                            <td>
                                                <p>
                                                    META Platform Inc
                                                </p>
                                            </td>
                                            <td>
                                                <p>23.21%</p>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </li>
            </ul>
        </div>
    )
})
