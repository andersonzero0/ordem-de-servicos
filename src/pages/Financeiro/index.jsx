import { useState } from "react";
import Charts from "../../components/Charts";
import HeaderDashboard from "../../components/HeaderDashboard";
import ResumoFinanceiro from "../../components/ResumoFinanceiro";
import "./style.css"

export default function Financeiro() {
    
  const [ordem, setOrdem] = useState({
    name: "jan",
    value: 4000,
    total:12
  })

    return (
        <section className="sectionFinanceiro">

            <HeaderDashboard setVisible={() => setVisible(!visible)}/>

            <div className="conteinerDashboard">
                <div>
                    <h2 className="titleResumoFinanceiro">Financeiro</h2>
                    <ResumoFinanceiro ordens={ordem}/>
                </div>
                
                <Charts setMonth={(param) => setOrdem(param)}/>
                
            </div>

            
        </section>
    )
    
}