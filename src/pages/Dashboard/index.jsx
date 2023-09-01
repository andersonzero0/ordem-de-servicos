import HeaderDashboard from "../../components/HeaderDashboard"
import UltimasOrdens from "../../components/UltimasOrdens"
import ResumoFinanceiro from "../../components/ResumoFinanceiro"
import "./style.css"

export default function Dashboard() {

    return (
        <section className="sectionDashboard">

            <HeaderDashboard/>

            <div className="conteinerDashboard">
                <UltimasOrdens/>
                <ResumoFinanceiro/>
            </div>
            
        </section>
    )
    
}