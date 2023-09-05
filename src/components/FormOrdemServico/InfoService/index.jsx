import { TextField } from "@mui/material";

import "./style.css";

export default function InfoService({ setForm, data }) {
  return (
    <form className="form">
      <legend>Informações sobre o serviço</legend>

      <div>
        <TextField
        required
        minRows={"3"} 
        multiline 
        label="Problema Informado"
        value={data.reported}
        onChange={(event) => {
            setForm("reported", event.target.value)
        }}
        />

        <TextField
        minRows={"3"}
        multiline
        label="Problema Constatado"
        value={data.problem_verified}
        onChange={(event) => {
            setForm("problem_verified", event.target.value)
        }}
        />

        <TextField
        minRows={"3"}
        multiline
        label="Serviços Realizados" 
        value={data.services_performed}
        onChange={(event) => {
            setForm("services_performed", event.target.value)
        }}
        />
      </div>
    </form>
  );
}