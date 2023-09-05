import { useState } from "react";
import { Box, FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { InputSwitch } from 'primereact/inputswitch';

import "./style.css"

export default function Payment({ setForm, data }) {

    const [checked, setChecked] = useState(false);

    return (
        <form className="form">
            <legend>Pagamento</legend>

            <div>

                <TextField value={data.total_price}
                onChange={(event) => {

                    setForm("total_price", event.target.value)

                }} InputProps={{
                    startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                }} label="Preço Total"/>


                <TextField value={data.discount}
                onChange={(event) => {

                    setForm("discount", event.target.value)

                }} InputProps={{
                    startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                }} label="Desconto"/>


                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Forma de Pagamento</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={data.payment_method}
                        label="Forma de Pagamento"
                        onChange={(event) => {

                            setForm("payment_method", event.target.value)
                            
                        }}
                        >
                        <MenuItem value={"pix"}>Pix</MenuItem>
                        <MenuItem value={"boleto"}>Boleto</MenuItem>
                        <MenuItem value={"credit_card"}>Cartão de crédito</MenuItem>
                        </Select>
                    </FormControl>
                </Box>


                <TextField 
                value={data.total_payable}
                onChange={(event) => {

                    setForm("total_payable", event.target.value)

                }} InputProps={{
                    startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                }} label="Total a pagar"/>

                

                <div className="conteinerSwitch">

                    <p>Esta ORDEM DE SERVIÇO está?</p>

                    <div className="boxSwitch">

                        <p>Pendente</p>

                        <InputSwitch checked={checked} onChange={(e) => {
                            setChecked(e.value)

                            if(checked) {

                                setForm("status", "pending")
                                
                            } else {

                                setForm("status", "paidout")
                                
                            }
                            
                        }}/>

                        <p>Paga</p>
                        
                    </div>
                    
                </div>

            </div>
            
        </form>
    )
    
}