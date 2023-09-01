import CardResumo from "../CardResumo"
import "./style.css"

export default function ResumoFinanceiro() {

    return (

        <div>

            <h2 className="titleResumoFinanceiro">Resumo Financeiro</h2>

            <CardResumo totalMes={"13.800,50"} totalServicos={"07"}/>
            
        </div>
        
    )
    
}