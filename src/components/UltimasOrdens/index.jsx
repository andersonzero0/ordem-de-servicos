import { Car } from "lucide-react"
import CardOrdem from "../CardOrdem"
import "./style.css"

export default function UltimasOrdens({ ordens }) {
    console.log(ordens);

    return (

        <section className="conteinerOrdens">

            <h2 className="titleOrdens">Últimas Ordens</h2>

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