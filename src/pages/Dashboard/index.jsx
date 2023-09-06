import { useState } from "react";

import HeaderDashboard from "../../components/HeaderDashboard"
import UltimasOrdens from "../../components/UltimasOrdens"
import ResumoFinanceiro from "../../components/ResumoFinanceiro"
        
import "./style.css"

export default function Dashboard() {

     const [ordens, setOrdens] = useState([])

    return (
        <section className="sectionDashboard">

            <HeaderDashboard setOrdens={(pram) => setOrdens([...ordens, pram])} ordens={ordens}/>

            <div className="conteinerDashboard">
                <div style={{
                    display: 'flex',
                    flexFlow: 'column nowrap',
                    gap: '10px'
                }}>
                    <h2 className="titleOrdens">Últimas Ordens</h2>
                    <UltimasOrdens ordens={ordens}/>
                </div>
                <div>
                    <h2 className="titleResumoFinanceiro">Resumo Financeiro</h2>
                    <ResumoFinanceiro ordens={ordens}/>
                </div>
            </div>
            
        </section>
    )
    
}