import CardResumo from "../CardResumo"
import "./style.css"

export default function ResumoFinanceiro({ ordens }) {


    return (

        <div>

            <CardResumo totalMes={ordens.value} totalServicos={ordens.total}/>
            
        </div>
        
    )
    
}