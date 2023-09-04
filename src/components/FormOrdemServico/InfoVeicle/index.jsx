import { TextField } from "@mui/material"

import "./style.css"

export default function InfoVeicle() {

    return (
        <form className="form">
            <legend>Informações do veículo</legend>

            <div>

                <div className="boxInput">
                    <TextField size="small" className="input" label="Modelo"/>
                    <TextField size="small" className="input" label="Marca"/>
                    <TextField size="small" className="input" label="Placa"/>
                    <TextField size="small" className="input" label="Frota"/>
                </div>

                <div className="boxInput">
                    <TextField size="small" className="input" label="Chassis"/>
                    <TextField size="small" className="input" label="RENAVAM"/>
                </div>

                <div className="boxInput">
                    <TextField size="small" className="input" label="Km"/>
                    <TextField size="small" className="input" label="Cor"/>
                    <TextField size="small" className="input" label="Ano"/>
                </div>

                <TextField minRows={'4'} multiline label="Observações" />

            </div>
            
        </form>
    )
    
}