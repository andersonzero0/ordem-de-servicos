import { TextField } from "@mui/material"

import "./style.css"

export default function InfoVeicle({ setForm, data }) {

    return (
        <form className="form">
            <legend>Informações do veículo</legend>

            <div>

                <div className="boxInput">
                    <TextField
                    size="small"
                    className="input"
                    label="Modelo"
                    value={data.model}
                    onChange={(event) => {
                        setForm("model", event.target.value)
                    }}
                    />

                    <TextField
                    size="small"
                    className="input"
                    label="Marca"
                    value={data.brand}
                    onChange={(event) => {
                        setForm("brand", event.target.value)
                    }}
                    />

                    <TextField
                    required
                    size="small"
                    className="input"
                    label="Placa"
                    value={data.plate}
                    onChange={(event) => {
                        setForm("plate", event.target.value)
                    }}
                    />

                    <TextField
                    size="small"
                    className="input"
                    label="Frota"
                    value={data.fleet}
                    onChange={(event) => {
                        setForm("fleet", event.target.value)
                    }}
                    />
                </div>

                <div className="boxInput">
                    <TextField
                    size="small"
                    className="input"
                    label="Chassis"
                    value={data.chassis}
                    onChange={(event) => {
                        setForm("chassis", event.target.value)
                    }}
                    />

                    <TextField
                    size="small"
                    className="input"
                    label="RENAVAM"
                    value={data.renavam}
                    onChange={(event) => {
                        setForm("renavam", event.target.value)
                    }}
                    />
                </div>

                <div className="boxInput">
                    <TextField
                    required    
                    size="small"
                    className="input"
                    label="Km"
                    value={data.km}
                    onChange={(event) => {
                        setForm("km", event.target.value)
                    }}
                    />

                    <TextField
                    size="small"
                    className="input"
                    label="Cor"
                    value={data.color}
                    onChange={(event) => {
                        setForm("color", event.target.value)
                    }}
                    />

                    <TextField
                    size="small"
                    className="input"
                    label="Ano"
                    value={data.age}
                    onChange={(event) => {
                        setForm("age", event.target.value)
                    }}
                    />
                </div>

                <TextField 
                minRows={'4'}
                multiline
                label="Observações"
                value={data.observation}
                    onChange={(event) => {
                        setForm("observation", event.target.value)
                    }}
                />

            </div>
            
        </form>
    )
    
}