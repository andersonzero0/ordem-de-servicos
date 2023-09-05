import Charts from "../../components/Charts";
import HeaderDashboard from "../../components/HeaderDashboard";
import ResumoFinanceiro from "../../components/ResumoFinanceiro";
import "./style.css"

export default function Financeiro() {

    return (
        <section className="sectionFinanceiro">

            <HeaderDashboard setVisible={() => setVisible(!visible)}/>

            <div className="conteinerDashboard">
                <div>
                    <h2 className="titleResumoFinanceiro">Financeiro</h2>
                    <ResumoFinanceiro ordens={[]}/>
                </div>


                <Charts/>
                
            </div>
            
        </section>
    )
    
}