import { useContext } from "react";
import { Trash } from "lucide-react";
import "./style.css";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { useState } from "react";
import { api } from "../../service/api";
import { OrderContext } from "../../contexts/Order";

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

  async function handleDelete() {

    setLoading(true)
    
    try {
        api.delete(`/order/${id}`).then((response) => {
            
            setVisible(false)
            
        })
        
    } catch(error) {

        return error
        
    } finally {
        setLoading(false)
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
                handleDelete()
              }}
              label="DELETAR"
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
          <Trash
            style={{
              cursor: "pointer",
            }}
            color="red"
            onClick={() => {
              setVisible(true);
            }}
          />
        </div>
      </div>
    </>
  );
}
