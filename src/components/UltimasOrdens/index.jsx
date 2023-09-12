import CardOrdem from "../CardOrdem"
import "./style.css"

import { OrderContext } from "../../contexts/Order";
import { useContext } from "react";

export default function UltimasOrdens() {

    const { orders } = useContext(OrderContext)

    return (

        <section className="conteinerOrdens">

            {
                orders.length != 0 ? orders.map((data, key) => {

                    return (<CardOrdem 
                        name={data.name}
                        model={data.model}
                        brand={data.brand}
                        place={data.plate}
                        id={key}
                        status={data.status === 'paidout' ?  "Pago" : "Pendente"}
                        key={key}
                    />)
                        
                }) : <p>Não há ordens!</p>
            }
            
        </section>
        
    )
    
}