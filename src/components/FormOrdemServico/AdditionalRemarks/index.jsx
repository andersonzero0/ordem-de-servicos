import { TextField, Checkbox } from "@mui/material"

import './style.css'

export default function AdditionalRemarks() {

    return (
        <form className="form">
            <legend>Observações adicionais sobre o veículo</legend>

            <div>

                <div className="conteinerBox">

                    <div className="box">

                        <div>
                            <TextField label="Pneus" size="small"/>
                            <Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 40 } }}/>
                        </div>

                        <div>
                            <TextField label="Acessórios" size="small"/>
                            <Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 40 } }}/>
                        </div>  
                        
                    </div>

                    <div className="box">

                        <div>
                            <TextField label="Estrutura" size="small"/>
                            <Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 40 } }}/>
                        </div>

                        <div>
                            <TextField label="Observações" size="small"/>
                            <Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 40 } }}/>
                        </div>  

                    </div>
                    
                </div>

                <TextField minRows={'6'} multiline/>

            </div>
            
        </form>
    )
    
}