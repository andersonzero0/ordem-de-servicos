import { useState } from "react" 

import { Radio, TextField } from "@mui/material"

import "./style.css"

export default function InfoClient() {

    const [selectedValue, setSelectedValue] = useState('a');

  const handleChange = (e) => {
    setSelectedValue(e.target.value);
  };

    return (
        <form className="form">
            <legend>Informações do Cliente</legend>

            <div>

                <TextField size="small" className="input" label="Nome/Razão"/>

                <div className="boxInput">
                    <TextField size="small" color="" className="input" label="CNPJ/CPF"/>
                    <TextField size="small" className="input" label="Fantasia/Apelido"/>
                </div>

                <TextField size="small" className="input" label="Solicitante"/>
                <TextField size="small" className="input"  label="Endereço"/>

                <div className="boxInput">
                    <TextField size="small" className="input" label="Fone"/>
                    <TextField size="small" className="input" label="Email"/>
                </div>


                <div>
                    <p>Orçamento</p>
                    <label className="labelRadio">
                        <Radio
                            checked={selectedValue === 'a'}
                            onChange={handleChange}
                            value="a"
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
                            checked={selectedValue === 'b'}
                            onChange={handleChange}
                            value="b"
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