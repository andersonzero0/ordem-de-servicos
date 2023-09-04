import { TextField } from "@mui/material"

import './style.css'

export default function infoGeneral({ setForm, data }) {

    return (
        <form className="form">
            <legend>Descrições Gerais</legend>

            <div>

                <div className="boxInput">
                    <TextField
                    size="small"
                    className="input"
                    label="NF Serviço"
                    value={data.nf_service}
                    onChange={(event) => {
                        setForm("nf_service", event.target.value)
                    }}
                    />

                    <TextField
                    size="small"
                    className="input"
                    label="NF Peças"
                    value={data.nf_parts}
                    onChange={(event) => {
                        setForm("nf_parts", event.target.value)
                    }}
                    />

                    <TextField
                    size="small"
                    className="input"
                    label="Faturas"
                    value={data.invoices}
                    onChange={(event) => {
                        setForm("invoices", event.target.value)
                    }}
                    />
                </div>

                <TextField
                minRows={'10'}
                multiline
                value={data.description_general}
                onChange={(event) => {
                    setForm("description_general", event.target.value)
                }}
                />

            </div>
            
        </form>
    )
    
}