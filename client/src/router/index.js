// import { Navigate } from 'react-router-dom'
import { useRoutes } from 'react-router-dom';

import Login from "../pages/login";
import Welcome from "../pages/welcome";
import Private from './Private'
import Watchlist from '../components/right/watchlist'


const PrivateRouter = () => {
    let routerConfig = [
        {
            path: '/',
            element: <Login />
        },
        {
            path: '/home',
            element: <Private><Welcome /></Private>,
            // routers: [
            //     {
            //         path: '/home/Watchlist',
            //         element: Watchlist
            //     }
            // ]
        }
    ]

    const routers = useRoutes(routerConfig)

    return routers
}

export default PrivateRouter