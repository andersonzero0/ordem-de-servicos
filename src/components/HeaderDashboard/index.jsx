import { Button } from "@mui/material"
import "./style.css"

export default function HeaderDashboard() {

    return (

        <header>

            <div>

                <img src="./Logo.svg" />
                
            </div>

            <div>

            <Button className="btn-novaOrdem" variant="contained">
                <img src="./Plus.svg" alt="" />
                <p>Nova ordem</p>
            </Button>
                
            </div>
            
        </header>
        
    )
    
}