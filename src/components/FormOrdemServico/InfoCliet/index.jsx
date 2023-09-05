import { Radio, TextField } from "@mui/material"

import "./style.css"

export default function InfoClient({ setForm, data }) {

    const handleChange = () => {
        setForm("budget", !data.budget)
    };

    return (
        <form className="form">
            <legend>Informações do Cliente</legend>

            <div>

                <TextField
                    type="text"
                    required
                    size="small"
                    className="input"
                    label="Nome/Razão"
                    value={data.name}
                    onChange={(event) => {
                        setForm("name", event.target.value)
                    }}
                />
                <div className="boxInput">
                    <TextField 
                    
                    size="small" 
                    className="input"
                    label="CNPJ/CPF"
                    value={data.document}
                    onChange={(event) => {
                        setForm("document", event.target.value)
                    }}
                    />
                    <TextField
                    size="small"
                    className="input"
                    label="Fantasia/Apelido"
                    value={data.nickname}
                    onChange={(event) => {
                        setForm("nickname", event.target.value)
                    }}
                    />
                </div>

                <TextField
                required
                size="small"
                className="input"
                label="Solicitante"
                value={data.requester}
                    onChange={(event) => {
                        setForm("requester", event.target.value)
                    }}
                />
                <TextField
                size="small"
                className="input"
                label="Endereço"
                value={data.address}
                    onChange={(event) => {
                        setForm("address", event.target.value)
                    }}
                />

                <div className="boxInput">
                    <TextField
                    size="small"
                    className="input"
                    label="Fone"
                    value={data.phone}
                    onChange={(event) => {
                        setForm("phone", event.target.value)
                    }}
                    />

                    <TextField
                    size="small"
                    className="input"
                    label="Email"
                    value={data.email}
                    onChange={(event) => {
                        setForm("email", event.target.value)
                    }}
                    />
                </div>


                <div>
                    <p>Orçamento</p>
                    <label className="labelRadio">
                        <Radio
                            checked={data.budget === true}
                            onChange={handleChange}
                            value="true"
                            name="radio-buttons"
                            inputProps={{ 'aria-label': 'A' }}
                            size="small"

                            sx={{
                                color: '#0E213E',
                                '&.Mui-checked': {
                                    color: '#0E213E',
                                },
                            }}
                        />
                        <p>Sim</p>
                    </label>
                    <label className="labelRadio">
                        <Radio
                            checked={data.budget === false}
                            onChange={handleChange}
                            value="false"
                            name="radio-buttons"
                            inputProps={{ 'aria-label': 'B' }}
                            size="small"

                            sx={{
                                color: '#0E213E',
                                '&.Mui-checked': {
                                    color: '#0E213E',
                                },
                            }}
                        />
                        <p>Não</p>
                    </label>
                </div>

            </div>
            
        </form>
    )   
    
}