import { useState } from "react"
import { TextField, Checkbox } from "@mui/material"

import './style.css'

export default function AdditionalRemarks({ setForm, data }) {

    const [ checkedWheel, setCheckedWheel ] = useState(false)
    const [ checkedStructure, setCheckedStructure ] = useState(false)
    const [ checkedAccessories, setCheckedAccessories ] = useState(false)
    const [ checkedObs, setCheckedObs ] = useState(false)

    return (
        <form className="form">
            <legend>Observações adicionais sobre o veículo</legend>

            <div>

                <div className="conteinerBox">

                    <div className="box">

                        <div>

                            <TextField disabled={!checkedWheel} value={data.obs_wheel}
                            onChange={(event) => {
                                
                                if(checkedWheel) {

                                    setForm("obs_wheel", event.target.value)             
                                    
                                }

                                return

                            }} label="Pneus" size="small"/>

                            <Checkbox checked={checkedWheel} onChange={() => {

                                setCheckedWheel(!checkedWheel)

                            }} sx={{ '& .MuiSvgIcon-root': { fontSize: 40 } }}/>

                        </div>

                        <div>

                            <TextField disabled={!checkedStructure} value={data.obs_structure}
                            onChange={(event) => {
                                
                                if(checkedStructure) {

                                    setForm("obs_structure", event.target.value)             
                                    
                                }

                                return

                            }} label="Estrutura" size="small"/>

                            <Checkbox  checked={checkedStructure} onChange={() => {

                                setCheckedStructure(!checkedStructure)

                            }} sx={{ '& .MuiSvgIcon-root': { fontSize: 40 } }}/>

                        </div>
                        
                    </div>

                    <div className="box">

                        <div>

                            <TextField disabled={!checkedAccessories} value={data.obs_accessories}
                            onChange={(event) => {
                                
                                if(checkedAccessories) {

                                    setForm("obs_accessories", event.target.value)             
                                    
                                }

                                return

                            }} label="Acessórios" size="small"/>

                            <Checkbox checked={checkedAccessories} onChange={() => {

                                setCheckedAccessories(!checkedAccessories)

                            }} sx={{ '& .MuiSvgIcon-root': { fontSize: 40 } }}/>

                        </div>

                        <div>

                            <TextField disabled={!checkedObs} value={data.add_observation}
                            onChange={(event) => {
                                
                                if(checkedObs) {

                                    setForm("add_observation", event.target.value)             
                                    
                                }

                                return

                            }} label="Observações" size="small"/>

                            <Checkbox checked={checkedObs} onChange={() => {

                                setCheckedObs(!checkedObs)

                            }} sx={{ '& .MuiSvgIcon-root': { fontSize: 40 } }}/>

                        </div>  

                    </div>
                    
                </div>

                <TextField value={data.extra_observation}
                    onChange={(event) => {

                        setForm("extra_observation", event.target.value)

                    }} minRows={'6'} multiline/>

            </div>
            
        </form>
    )
    
}