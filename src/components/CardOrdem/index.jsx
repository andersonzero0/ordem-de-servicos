import { useContext } from "react";
import { Eye } from "lucide-react";
import "./style.css";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { useState } from "react";
import { api } from "../../service/api";
import { OrderContext } from "../../contexts/Order";
import { CircularProgress } from "@mui/material";

export default function CardOrdem({
  name,
  model,
  brand,
  plate,
  id,
  status,
  onClick,
}) {
  const { refresh, setRefresh } = useContext(OrderContext);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDelete(ref) {
    setLoading(true);

    try {
      api.delete(`/order/${ref}`).then((response) => {
        setVisible(false);

        setRefresh(!refresh);
      });
    } catch (error) {
      return error;
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Dialog
        closable={false}
        visible={visible}
        header="ATENÇÃO!"
        pt={{
          headerTitle: { style: { color: "#D12727" } },
        }}
      >
        <div className="conteinerAlert">
          <div className="boxOptDelete">
            <Button
              onClick={() => {
                setVisible(false);
              }}
              label="CANCELAR"
              severity="secondary"
              outlined
            />
            <Button
              onClick={() => {
                handleDelete();
              }}
              disabled={loading}
              label={loading ? <CircularProgress /> : "DELETAR"}
              severity="danger"
            />
          </div>
        </div>
      </Dialog>

      <div className="conteinerCard">
        <div className="boxInfoCustomer" onClick={onClick}>
          <h3 className="nameCard">{name}</h3>

          <div className="box_infosCar">
            <p>{model}</p>
            <p>{brand}</p>
            <p>{plate}</p>
          </div>
        </div>

        <div className="box_extra">
          <div className="box_extraInfo" onClick={onClick}>
            <h3 className="idCard">Nº{id.substring(0, 8)}</h3>
            <p>{status}</p>
          </div>
          <div className="boxEye">
            <Eye
              style={{
                cursor: "pointer",
              }}
              size={26}
              color="white"
              onClick={onClick}
            />
          </div>
        </div>
      </div>
    </>
  );
}
