import { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";

import InfoClient from "../../components/FormOrdemServico/InfoCliet";
import InfoVeicle from "../../components/FormOrdemServico/InfoVeicle";
import InfoService from "../../components/FormOrdemServico/InfoService";
import InfoGeneral from "../../components/FormOrdemServico/infoGeneral";
import AdditionalRemarks from "../../components/FormOrdemServico/AdditionalRemarks";
import Payment from "../../components/FormOrdemServico/Payment";
import { api } from "../../service/api";
import { Button } from "primereact/button";
import CardOrdem from "../CardOrdem";
import "./style.css";
import "./responsive.css"

export default function UltimasOrdens({ orders, search = false }) {
  let modelForm = {
    name: "",
    document: "",
    nickname: "",
    requester: "",
    address: "",
    phone: "",
    email: "",
    budget: true,

    model: "",
    brand: "",
    plate: "",
    fleet: "",
    chassis: "",
    renavam: "",
    km: "",
    color: "",
    age: "",
    observation: "",

    reported: "",
    problem_verified: "",
    services_performed: "",

    nf_service: "",
    nf_parts: "",
    invoices: "",
    description_general: "",

    obs_wheel: "",
    obs_accessories: "",
    obs_structure: "",
    add_observation: "",
    extra_observation: "",

    total_price: "",
    discount: "",
    payment_method: "",
    total_payable: "",
    status: "pending",
  };

  const [dataForm, setDataForm] = useState(modelForm);

  const [visible, setVisible] = useState(false);
  const [visibleAlert, setVisibleAlert] = useState(false);
  const [concluded, setConcluded] = useState(false);
  const [id, setId] = useState(0)

  const [titleButtom, setTitleButton] = useState("Continuar");

  const [pageForm, setPageForm] = useState(1);

  function paginationForm() {
    if (pageForm == 1) {
      if (dataForm.name == "" || dataForm.requester == "") {
        setVisibleAlert(true);
      } else {
        setPageForm(pageForm + 1);
      }
    }
    if (pageForm == 2) {
      if (dataForm.plate == "" || dataForm.km == "") {
        setVisibleAlert(true);
      } else {
        setPageForm(pageForm + 1);
      }
    }
    if (pageForm == 3) {
      if (dataForm.reported == "") {
        setVisibleAlert(true);
      } else {
        setPageForm(pageForm + 1);
      }
    }
    if (pageForm == 5) {
      setTitleButton("Concluir");
    }

    if (pageForm > 3 && pageForm < 6) {
      setPageForm(pageForm + 1);
    }

    if (pageForm == 6) {
      api
        .put(`/order/${id}`, dataForm)
        .then((response) => {
          setConcluded(true);
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
  }

  useEffect(() => {

    api.get(`/order/${id}`).then((response) => {

        if(response.data == undefined) {
            return
        }

        setDataForm(response.data)
        
    })
    
  }, [id])

  return (
    <>
      <section className="conteinerOrdens">
        {orders.length != 0 ? (
          orders.map((data, key) => {
            return (
              <CardOrdem
                name={data.name}
                model={data.model}
                brand={data.brand}
                plate={data.plate}
                id={key}
                status={data.status === "paidout" ? "Pago" : "Pendente"}
                key={key}
                onClick={() => {
                    setId(data.id)
                    setVisible(true)
                }}
              />
            );
          })
        ) : search ? (
          <p>Não há ordens com esse nome!</p>
        ) : (
          <p>Não há ordens!</p>
        )}
      </section>

      <Dialog
        closable={false}
        header="ORDEM DE SERVIÇO"
        visible={visible}
      >
        {pageForm == 1 ? (
          <InfoClient
            setForm={(field, value) =>
              setDataForm({ ...dataForm, [field]: value })
            }
            data={dataForm}
          />
        ) : (
          ""
        )}
        {pageForm == 2 ? (
          <InfoVeicle
            setForm={(field, value) =>
              setDataForm({ ...dataForm, [field]: value })
            }
            data={dataForm}
          />
        ) : (
          ""
        )}
        {pageForm == 3 ? (
          <InfoService
            setForm={(field, value) =>
              setDataForm({ ...dataForm, [field]: value })
            }
            data={dataForm}
          />
        ) : (
          ""
        )}
        {pageForm == 4 ? (
          <InfoGeneral
            setForm={(field, value) =>
              setDataForm({ ...dataForm, [field]: value })
            }
            data={dataForm}
          />
        ) : (
          ""
        )}
        {pageForm == 5 ? (
          <AdditionalRemarks
            setForm={(field, value) =>
              setDataForm({ ...dataForm, [field]: value })
            }
            data={dataForm}
          />
        ) : (
          ""
        )}
        {pageForm == 6 ? (
          <Payment
            setForm={(field, value) =>
              setDataForm({ ...dataForm, [field]: value })
            }
            data={dataForm}
          />
        ) : (
          ""
        )}

        <Dialog
          closable={false}
          visible={visibleAlert}
          header="ATENÇÃO!"
          pt={{
            headerTitle: { style: { color: "#D12727" } },
          }}
        >
          <div className="conteinerAlert">
            <h3 className="alertMessage">
              Os campos marcados <span style={{ color: "red" }}>*</span> são
              obrigatorios!
            </h3>
            <Button
              onClick={() => setVisibleAlert(false)}
              style={{ width: "50%", margin: "auto" }}
              label="OK"
              severity="info"
            />
          </div>
        </Dialog>

        <Dialog closable={false} visible={concluded}>
          <div className="conteinerAlert">
            <h3 className="alertMessage">
              ORDEM DE SERVICO Nº XXXX CADASTRADA COM SUCESSO
            </h3>
            <Button
              onClick={() => {
                setVisible(false);
                setPageForm(1);
                setDataForm(modelForm);
                setConcluded(false);
              }}
              style={{ width: "50%", margin: "auto" }}
              label="Concluir"
              severity="info"
            />
          </div>
        </Dialog>

        <footer className="footerForm">
          <Button
            onClick={() => {
              setPageForm(1);
              setVisible(false);
              setDataForm(modelForm);
            }}
            icon="pi pi-times"
            label="Cancelar"
            severity="danger"
            outlined
          />

          <Button
            label={titleButtom}
            icon="pi pi-arrow-right"
            severity="info"
            iconPos="right"
            onClick={paginationForm}
          />
        </footer>
      </Dialog>
    </>
  );
}
