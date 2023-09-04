import { useState } from "react";
import { Box, FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { InputSwitch } from 'primereact/inputswitch';

import "./style.css"

export default function Payment() {

    const [payment, setPayment] = useState('');
    const [checked, setChecked] = useState(false);

    const handleChange = (event) => {
      setPayment(event.target.value);
    };
  

    return (
        <form className="form">
            <legend>Pagamento</legend>

            <div>

                <TextField InputProps={{
                    startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                }} label="Preço Total"/>

                <TextField InputProps={{
                    startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                }} label="Desconto"/>

                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Forma de Pagamento</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={payment}
                        label="Forma de Pagamento"
                        onChange={handleChange}
                        >
                        <MenuItem value={"pix"}>Pix</MenuItem>
                        <MenuItem value={"boleto"}>Boleto</MenuItem>
                        <MenuItem value={"credit_card"}>Cartão de crédito</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <TextField InputProps={{
                    startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                }} label="Total a pagar"/>

                <div className="conteinerSwitch">

                    <p>Esta ORDEM DE SERVIÇO está?</p>

                    <div className="boxSwitch">

                        <p>Pendente</p>

                        <InputSwitch checked={checked} onChange={(e) => setChecked(e.value)}/>

                        <p>Paga</p>
                        
                    </div>
                    
                </div>

            </div>
            
        </form>
    )
    
}