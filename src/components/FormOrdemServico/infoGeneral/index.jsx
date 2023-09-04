import { TextField } from "@mui/material"

import './style.css'

export default function infoGeneral() {

    return (
        <form className="form">
            <legend>Descrições Gerais</legend>

            <div>

                <div className="boxInput">
                    <TextField size="small" className="input" label="NF Serviço"/>
                    <TextField size="small" className="input" label="NF Peças"/>
                    <TextField size="small" className="input" label="Faturas"/>
                </div>

                <TextField minRows={'10'} multiline/>

            </div>
            
        </form>
    )
    
}