import { useLocation, Navigate } from 'react-router-dom'

function Private(props) {
    var token = localStorage.getItem("user");

    var location = useLocation();

    if(token){
        return <>{props.children}</>
    }else{
        return <Navigate to={{'pathname':'/',search:"?redirect="+location.pathname}}></Navigate>
    }
}

export default Private