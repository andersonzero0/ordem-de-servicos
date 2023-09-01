import { Button } from "@mui/material"
import "./style.css"

export default function ButtonNew({ title }) {

    return (
        <Button className="btn-novaOrdem" variant="contained">
                <img src="./Plus.svg" alt="" />
                <p>{title}</p>
        </Button>
    )
    
}