import "./style.css"

export default function CardOrdem({ name, model, brand, place, id, status }) {

    return (

        <div className="conteinerCard">

            <div className="boxInfoCustomer">

                <h3 className="nameCard">{name}</h3>

                <div className="box_infosCar">

                    <p>{model}</p>
                    <p>{brand}</p>
                    <p>{place}</p>
                    
                </div>
                
            </div>

            <div className="box_extra">

                <h3 className="idCard">Nº{id}</h3>
                <p>{status}</p>
                
            </div>
            
        </div>
        
    )
    
}