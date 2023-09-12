import { useContext } from "react"
import CardResumo from "../CardResumo"
import "./style.css"
import { OrderContext } from "../../contexts/Order"

export default function ResumoFinanceiro() {

    const { orders } = useContext(OrderContext)
    
    return (

        <div>

            <CardResumo totalMes={orders.value} totalServicos={orders.lenght}/>
            
        </div>
        
    )
    
}