import React, { memo } from 'react'

export default memo(function Vgdata({ data }) {

    let newdata = []
    newdata.push(data)

    function ShowPentagram(a){
        let j = 3 - a
        let sum = []

        for (let i = 0; i < a; i++) {
            sum.push(Pentagram(i))
        }
        for (let i = 0; i < j; i++) {
            sum.push(Pentagram2(i))
        }

        return sum
    }

    function Pentagram(i) {
        return <li key={i+"i"}>
            <svg t="1712041923106" className="icon" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="21600" width="200" height="200">
                <path
                    d="M512 85.9l110.8 318.7 337.2 6.8-268.8 203.8 97.7 322.9L512 745.4 235.1 938.1l97.7-322.9L64 411.4l337.2-6.8z"
                    p-id="21601" fill="#2c2c2c"></path>
            </svg>
        </li>
    }

    function Pentagram2(i) {
        return <li key={i+"q"}>
            <svg t="1712041942619" className="icon" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="21806" width="200" height="200">
                <path
                    d="M786.408767 921.276431L511.151679 729.73193 235.895615 921.276431l97.103572-320.979432L65.767889 397.698744l335.273997-6.833639L511.151679 74.111928 621.261473 390.865105l335.264786 6.833639-267.221064 202.598255 97.103572 320.979432zM511.151679 684.628686l208.984709 145.419997-73.729212-243.689115 202.883757-153.816224-254.54844-5.188163-83.589791-240.48412-83.590813 240.48412-254.55765 5.188163 202.892967 153.816224-73.729212 243.689115 208.983685-145.419997z"
                    p-id="21807" fill="#2c2c2c"></path>
            </svg>
        </li>
    }

    return (
        <div>
            <div className="box_data">
                <table border="1">
                    <tbody>
                        <tr>
                            <th>
                                Symbol
                            </th>
                            <th>
                                Name
                            </th>
                            <th>
                                Asset class
                            </th>
                            <th>
                                Risk
                            </th>
                            <th>
                                Price
                            </th>
                            <th>
                                Changes
                            </th>
                        </tr>

                        {
                            newdata.map((item, index) => {
                                return <tr key={index}>
                                    <td>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td width="35%">
                                                        <svg t="1712038739921" className="icon" viewBox="0 0 1024 1024" version="1.1"
                                                            xmlns="http://www.w3.org/2000/svg" p-id="1458" width="200" height="200">
                                                            <path
                                                                d="M511.488 64.468c-246.974 0-447.184 200.211-447.184 447.185 0 246.972 200.21 447.185 447.184 447.185s447.185-200.213 447.185-447.185c0-246.974-200.21-447.185-447.185-447.185z m223.795 472.027h-198.95v198.953c0 13.608-11.028 24.64-24.846 24.64-13.72 0-24.845-11.311-24.845-24.64V536.495h-198.95c-13.607 0-24.64-11.027-24.64-24.842 0-13.722 11.31-24.845 24.64-24.845h198.953V287.856c0-13.608 11.027-24.64 24.844-24.64 13.72 0 24.845 11.311 24.845 24.64v198.953h198.95c13.611 0 24.643 11.027 24.643 24.845-0.002 13.719-11.313 24.84-24.644 24.84z"
                                                                p-id="1459"></path>
                                                        </svg>
                                                    </td>
                                                    <td align="center">
                                                        <h3>{item.Symbol}</h3>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                    <td>
                                        <p>{item.Name}</p>
                                    </td>
                                    <td>
                                        <p>{item.AssetClass}</p>
                                    </td>
                                    <td>
                                        <ul>
                                            {
                                               ShowPentagram(item.Risk)
                                            }
                                        </ul>
                                    </td>
                                    <td>
                                        <p>
                                            $ <span>{item.Price}</span>
                                        </p>
                                    </td>
                                    <td>
                                        <p>
                                            {item.Changes}
                                        </p>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
})
