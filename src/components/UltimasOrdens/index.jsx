import CardOrdem from "../CardOrdem"
import "./style.css"

import { OrderContext } from "../../contexts/Order";
import { useContext } from "react";

export default function UltimasOrdens({ orders, search = false }) {


    return (

        <section className="conteinerOrdens">

            {
                orders.length != 0 ? orders.map((data, key) => {

                    return (<CardOrdem 
                        name={data.name}
                        model={data.model}
                        brand={data.brand}
                        plate={data.plate}
                        id={key}
                        status={data.status === 'paidout' ?  "Pago" : "Pendente"}
                        key={key}
                    />)
                        
                }) : search ? <p>Não há ordens com esse nome!</p> : <p>Não há ordens!</p>
            }
            
        </section>
    )
    
}