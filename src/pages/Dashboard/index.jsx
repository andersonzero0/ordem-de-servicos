import { useContext, useState } from "react";

import HeaderDashboard from "../../components/HeaderDashboard"
import UltimasOrdens from "../../components/UltimasOrdens"
import ResumoFinanceiro from "../../components/ResumoFinanceiro"
        
import "./style.css"

export default function Dashboard() {


    return (
        <section className="sectionDashboard">

            <HeaderDashboard/>

            <div className="conteinerDashboard">
                <div style={{
                    display: 'flex',
                    flexFlow: 'column nowrap',
                    gap: '10px'
                }}>
                    <h2 className="titleOrdens">Últimas Ordens</h2>
                    <UltimasOrdens/>
                </div>
                <div>
                    <h2 className="titleResumoFinanceiro">Resumo Financeiro</h2>
                    <ResumoFinanceiro/>
                </div>
            </div>
            
        </section>
    )
    
}