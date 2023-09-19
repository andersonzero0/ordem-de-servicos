import { useContext } from "react";

import HeaderDashboard from "../../components/HeaderDashboard"
import UltimasOrdens from "../../components/UltimasOrdens"
import ResumoFinanceiro from "../../components/ResumoFinanceiro"
        
import "./style.css"
import "./responsive.css"
import { OrderContext } from "../../contexts/Order";

export default function Dashboard() {
    const { orders } = useContext(OrderContext)



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
                    <UltimasOrdens orders={orders}/>
                </div>
                <div>
                    <h2 className="titleResumoFinanceiro">Resumo Financeiro</h2>
                    <ResumoFinanceiro/>
                </div>
            </div>
            
        </section>
    )
    
}