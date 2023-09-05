import { useState } from "react";
import HeaderDashboard from "../../components/HeaderDashboard";
import UltimasOrdens from "../../components/UltimasOrdens";

export default function Arquivo() {

    const [ordens, setOrdens] = useState([])

    return (
        <section className="sectionFinanceiro">

            <HeaderDashboard setVisible={() => setVisible(!visible)}/>

            <div className="conteinerDashboard">
                <UltimasOrdens ordens={ordens}/>
            </div>
            
        </section>
    )
    
}