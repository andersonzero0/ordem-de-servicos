import { useState } from "react";
import Charts from "../../components/Charts";
import HeaderDashboard from "../../components/HeaderDashboard";
import "./style.css"
import "./responsive.css"
import CardResumo from "../../components/CardResumo";

export default function Financeiro() {
    
  const [ordem, setOrdem] = useState({
    name: "",
    totalService: "0",
    valorTotal: "0"
  })

    return (
        <section className="sectionFinanceiro">

            <HeaderDashboard setVisible={() => setVisible(!visible)}/>

            <div className="conteinerFinanceiro">
                <div>
                    <h2 className="titleResumoFinanceiro">Financeiro</h2>
                    <CardResumo totalMes={ordem.valorTotal} totalServicos={ordem.totalService}/>
                </div>
                
                <Charts setMonth={(param) => setOrdem(param)}/>
                
            </div>

            
        </section>
    )
    
}