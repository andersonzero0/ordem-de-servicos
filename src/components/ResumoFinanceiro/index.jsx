import CardResumo from "../CardResumo"
import "./style.css"

export default function ResumoFinanceiro({ ordens }) {

    const valorMes = ordens.reduce((acc, value) => {

            return acc + Number(value.total_payable)
            
    }, 0)

    const servicos = ordens.length

    return (

        <div>

            <CardResumo totalMes={valorMes} totalServicos={servicos}/>
            
        </div>
        
    )
    
}