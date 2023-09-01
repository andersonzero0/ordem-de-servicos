import { Car } from "lucide-react"
import CardOrdem from "../CardOrdem"
import "./style.css"

export default function UltimasOrdens() {

    return (

        <section className="conteinerOrdens">

            <h2 className="titleOrdens">Últimas Ordens</h2>

            <CardOrdem 
                nome={"Antonio Carlos de Oliveira Marcondes"}
                modelo={"Civic"}
                marca={"Honda"}
                placa={"BRA2E19"}
                id={"XXXX"}
                status={"Pago"}
            />
            
        </section>
        
    )
    
}