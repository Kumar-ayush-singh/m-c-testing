
import { Navigate } from "react-router-dom";


export default function WithAuth({isLogedIn, children}){
    if(isLogedIn){
        return children;
    }
    return <Navigate to="/auth"/>
}