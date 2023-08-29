import {
    Outlet
} from "react-router-dom"
import Navbar from "../Navbar"
import "./style.css"

export default function Layout() {

    return (
        <main className="mainLayout">
            <Navbar/>

            <Outlet/>                
        </main>
    )
    
}