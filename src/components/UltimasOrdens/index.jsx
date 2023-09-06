import { Car } from "lucide-react"
import CardOrdem from "../CardOrdem"
import "./style.css"

export default function UltimasOrdens({ ordens }) {

    return (

        <section className="conteinerOrdens">

            {
                ordens.length != 0 ? ordens.map((data, key) => {
                    console.log(data);

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