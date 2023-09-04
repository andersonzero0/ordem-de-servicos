import { TextField } from "@mui/material";

import "./style.css";

export default function InfoService() {
  return (
    <form className="form">
      <legend>Informações sobre o serviço</legend>

      <div>
        <TextField minRows={"3"} multiline label="Problema Informado" />

        <TextField minRows={"3"} multiline label="Problema Constatado" />

        <TextField minRows={"3"} multiline label="Serviços Realizados" />
      </div>
    </form>
  );
}
