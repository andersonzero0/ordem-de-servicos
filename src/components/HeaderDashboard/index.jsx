import { useContext, useState } from "react";
import ButtonNew from "../ButtonNew";
import "./style.css";
import "./responsive.css"
import { Dialog } from "primereact/dialog";

import InfoClient from "../../components/FormOrdemServico/InfoCliet";
import InfoVeicle from "../../components/FormOrdemServico/InfoVeicle";
import InfoService from "../../components/FormOrdemServico/InfoService";
import InfoGeneral from "../../components/FormOrdemServico/infoGeneral";
import AdditionalRemarks from "../../components/FormOrdemServico/AdditionalRemarks";
import Payment from "../../components/FormOrdemServico/Payment";
import { api } from "../../service/api";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import { OrderContext } from "../../contexts/Order";

export default function HeaderDashboard() {
  const modelForm = {
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
  const [slideMenu, setSlideMenu] = useState(false)
  const { setRefresh, refresh } = useContext(OrderContext)

  const [titleButtom, setTitleButton] = useState("Continuar");

  const [pageForm, setPageForm] = useState(1);
  const [idOrder, setIdOrder] = useState("")

  const [loading, setLoading] = useState(false)

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

      setLoading(true)

      api
        .post("/order", dataForm)
        .then((response) => {
          const id = response.data.id
          
          setIdOrder(id.substring(0, 8))
          setConcluded(true);
          setLoading(false)
          setRefresh(!refresh)
        })
        .catch((error) => {
          setLoading(false)
          console.log(error.response);
        });
    }
  }

  return (
    <>
      <header className="headerDashboard">
        <div className="box_Logo">
          <img className="logo" src="./Logo.svg" />
        </div>

        <div className="boxBtnNewOrder">
          <ButtonNew
            title="Nova ordem"
            onClick={() => {
              setVisible(true);
            }}
          />
        </div>

        <div className="box_btnMenu" onClick={() => {
          setSlideMenu(!slideMenu)
        }}>
          <img className="btn_menuHOff" src="./Menu_Hamburguer.svg" alt="" />
        </div>
      </header>

      <div className="boxMenuHover" style={slideMenu ? {
        display: "block"
      } : {
        display: "none"
      }}>
        <Link className="linkMenu" to={"/dashboard"}>
          <img src="./dashboard.svg" alt="" />
          <p>Dashboard</p>
        </Link>

        <Link className="linkMenu" to={"/financeiro"}>
          <img src="./attach_money.svg" alt="" />
          <p>Financeiro</p>
        </Link>

        <Link className="linkMenu" to={"/arquivo"}>
          <img src="./inventory.svg" alt="" />
          <p>Arquivo</p>
        </Link>
      </div>

      <div className="boxPlus" onClick={() => {
        setVisible(true)
      }}>
        <img src="./PlusOutline.svg" alt="" />
      </div>

      <Dialog
      className="dialogModal"
        closable={false}
        header="ORDEM DE SERVIÇO"
        visible={visible}
        style={{
          zIndex: 9999
        }}
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
              {`ORDEM DE SERVICO Nº${idOrder} CADASTRADA COM SUCESSO`}
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
            disabled={loading}
            label={titleButtom}
            icon={loading ? "pi pi-spinner" : "pi pi-arrow-right"}
            severity="info"
            iconPos="right"
            onClick={paginationForm}
          />
        </footer>
      </Dialog>
    </>
  );
}
