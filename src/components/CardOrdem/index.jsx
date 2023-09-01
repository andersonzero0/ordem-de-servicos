import "./style.css"

export default function CardOrdem({nome, modelo, marca, placa, id, status}) {

    return (

        <div className="conteinerCard">

            <div className="boxInfoCustomer">

                <h3 className="nameCard">{nome}</h3>

                <div className="box_infosCar">

                    <p>{modelo}</p>
                    <p>{marca}</p>
                    <p>{placa}</p>
                    
                </div>
                
            </div>

            <div className="box_extra">

                <h3 className="idCard">Nº{id}</h3>
                <p>{status}</p>
                
            </div>
            
        </div>
        
    )
    
}