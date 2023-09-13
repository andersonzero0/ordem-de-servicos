import { useContext } from "react"
import CardResumo from "../CardResumo"
import "./style.css"
import { OrderContext } from "../../contexts/Order"

export default function ResumoFinanceiro() {

    const { orders } = useContext(OrderContext)

    const valueTotal = orders.reduce((acc, value) => {
        if(value.status == "paidout") {

            return acc + Number(value.total_payable)
            
        }

        return acc
    }, 0)
    
    return (

        <div>

            <CardResumo totalMes={valueTotal} totalServicos={orders.length}/>
            
        </div>
        
    )
    
}