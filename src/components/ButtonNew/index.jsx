import { Button } from "@mui/material"
import "./style.css"
import "./responsive.css"

export default function ButtonNew({ title, onClick }) {

    return (
        <Button className="btn-novaOrdem" variant="contained" onClick={onClick}>
                <img src="./Plus.svg" alt="" />
                <p>{title}</p>
        </Button>
    )
    
}