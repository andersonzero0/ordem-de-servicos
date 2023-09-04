import ButtonNew from "../ButtonNew"
import "./style.css"

export default function HeaderDashboard({ setVisible }) {

    return (

        <header className="headerDashboard">

            <div>

                <img src="./Logo.svg" />
                
            </div>

            <div>

                <ButtonNew title="Nova ordem" onClick={setVisible} />
                
            </div>
            
        </header>
        
    )
    
}