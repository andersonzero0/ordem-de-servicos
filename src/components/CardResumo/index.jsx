import "./style.css"

export default function CardResumo({totalMes, totalServicos}) {
    
    return (

        <div className="conteinerCardResumo">

            <div>

                <h3>Total do mês</h3>
                <p>R${totalMes}</p>
                
            </div>

            <div>

                <h3>Total de serviços</h3>
                <p>{totalServicos}</p>
                
            </div>
            
        </div>

    )
    
}