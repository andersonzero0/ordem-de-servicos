import { useState, useContext, useRef } from "react";
import { Dialog } from "primereact/dialog";
import jsPDF from "jspdf";
import ReactDOMServer from "react-dom/server";

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
import "./responsive.css";
import { OrderContext } from "../../contexts/Order";
import { Backdrop, CircularProgress } from "@mui/material";

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

    total_price: 0,
    discount: 0,
    payment_method: 0,
    total_payable: 0,
    create_at: new Date(Date.now()).toISOString().slice(0, 16),
    status: "pending",
  };

  const [dataForm, setDataForm] = useState(modelForm);
  const { refresh, setRefresh } = useContext(OrderContext);

  const [visible, setVisible] = useState(false);
  const [visibleAlert, setVisibleAlert] = useState(false);
  const [concluded, setConcluded] = useState(false);
  const [id, setId] = useState(0);
  const [idOrder, setIdOrder] = useState("");

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const [titleButtom, setTitleButton] = useState("Continuar");

  const [pageForm, setPageForm] = useState(1);

  const [loading, setLoading] = useState(false);

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
      setLoading(true);

      api
        .put(`/order/${id}`, dataForm)
        .then((response) => {
          const id = response.data.id;

          setIdOrder(id.substring(0, 8));
          setConcluded(true);
          setPageForm(1)
          setLoading(false);
          setRefresh(!refresh);
        })
        .catch((error) => {
          console.log(error.response);
          setLoading(false);
        });
    }
  }

  async function handleOrder(id) {
    if (id == 0) {
      return;
    }

    handleOpen();

    api.get(`/order/${id}`).then((response) => {
      if (response.data == undefined) {
        handleClose();

        return;
      }

      setId(id);

      setDataForm(response.data);
      handleClose();
      setVisible(true);
    });
  }

  const html = (
    <html
      style={{
        boxSizing: "border-box",
        width: "190mm",
        fontSize: "4mm"
      }}
    >
      <h1 className="titlePDF">ORDEM DE SERVIÇOS</h1>

      <div>
        <p className="labelPDF">Nome: {dataForm.name || "Não preenchido"}</p>
        <p className="labelPDF">CPF: {dataForm.document || "Não preenchido"}</p>
        <p className="labelPDF">
          Apelido: {dataForm.nickname || "Não preenchido"}
        </p>
        <p className="labelPDF">
          Solicitador: {dataForm.requester || "Não preenchido"}
        </p>
        <p className="labelPDF">
          Endereço: {dataForm.address || "Não preenchido"}
        </p>
        <p className="labelPDF">
          Celular: {dataForm.phone || "Não preenchido"}
        </p>
        <p className="labelPDF">Email: {dataForm.email || "Não preenchido"}</p>
        <p className="labelPDF">
          Orçamento: {dataForm.budget ? "Sim" : "Não"}
        </p>
      </div>

      <hr
        style={{
          width: "500px",
          margin: "20px 0",
        }}
      />

      <div>
        <p className="labelPDF">Modelo: {dataForm.model || "Não preenchido"}</p>
        <p className="labelPDF">Marca: {dataForm.brand || "Não preenchido"}</p>
        <p className="labelPDF">Placa: {dataForm.plate || "Não preenchido"}</p>
        <p className="labelPDF">Frota: {dataForm.fleet || "Não preenchido"}</p>
        <p className="labelPDF">
          Chassis: {dataForm.chassis || "Não preenchido"}
        </p>
        <p className="labelPDF">
          Renavam: {dataForm.renavam || "Não preenchido"}
        </p>
        <p className="labelPDF">Km: {dataForm.km || "Não preenchido"}</p>
        <p className="labelPDF">Color: {dataForm.color || "Não preenchido"}</p>
        <p className="labelPDF">Ano: {dataForm.age || "Não preenchido"}</p>
        <p className="labelPDF">
          Observação: {dataForm.observation || "Não preenchido"}
        </p>
      </div>

      <hr
        style={{
          width: "500px",
          margin: "20px 0",
        }}
      />

      <div>
        <p className="labelPDF">
          Problema informado: {dataForm.reported || "Não preenchido"}
        </p>
        <p className="labelPDF">
          Problema constatado: {dataForm.problem_verified || "Não preenchido"}
        </p>
        <p className="labelPDF">
          Serviços realizados: {dataForm.services_performed || "Não preenchido"}
        </p>
      </div>

      <hr
        style={{
          width: "500px",
          margin: "20px 0",
        }}
      />

      <div>
        <p className="labelPDF">
          NF Serviço: {dataForm.nf_service || "Não preenchido"}
        </p>
        <p className="labelPDF">
          NF Peças: {dataForm.nf_parts || "Não preenchido"}
        </p>
        <p className="labelPDF">
          Faturas: {dataForm.invoices || "Não preenchido"}
        </p>
        <p className="labelPDF">
          Descrição: {dataForm.description_general || "Não preenchido"}
        </p>
      </div>

      <hr
        style={{
          width: "500px",
          margin: "20px 0",
        }}
      />

      <div>
        <p className="labelPDF">
          Obs. Pneus: {dataForm.obs_wheel || "Não preenchido"}
        </p>
        <p className="labelPDF">
          Obs. Acessórios: {dataForm.obs_accessories || "Não preenchido"}
        </p>
        <p className="labelPDF">
          Obs. Estrutura: {dataForm.obs_structure || "Não preenchido"}
        </p>
        <p className="labelPDF">
          Obs: {dataForm.add_observation || "Não preenchido"}
        </p>

        <p className="labelPDF">
          Extra Observação: {dataForm.extra_observation || "Não preenchido"}
        </p>
      </div>

      <hr
        style={{
          width: "500px",
          margin: "20px 0",
        }}
      />

      <div>
        <p className="labelPDF">
          Preço total: R${dataForm.total_price || "Não preenchido"}
        </p>
        <p className="labelPDF">
          Desconto: R${dataForm.discount || "Não preenchido"}
        </p>
        <p className="labelPDF">
          Forma de pagamento: {dataForm.payment_method || "Não preenchido"}
        </p>
        <p className="labelPDF">
          Total pago: R${dataForm.total_payable || "Não preenchido"}
        </p>

        <p className="labelPDF">Status: {dataForm.status == "paidout" ? "Pago" : "Pendente"}</p>
      </div>
    </html>
  );

  const options = {
    orientation: "portrait",
    format: "a4"
  };

  const handleExportPDF = async () => {
    const doc = new jsPDF(options);
    doc.setFontSize(12);
    doc.html(ReactDOMServer.renderToString(html), {
      html2canvas: {
        scale: 0.2645,
      },
      margin: 10,
      callback: function (doc) {
        doc.save(`ordem-${id.substring(0, 8)}.pdf`);
      },
    });
  };

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <section className="conteinerOrdens">
        {orders.length != 0 ? (
          orders.map((data, key) => {
            return (
              <CardOrdem
                name={data.name}
                model={data.model}
                brand={data.brand}
                plate={data.plate}
                id={data.id}
                status={data.status === "paidout" ? "Pago" : "Pendente"}
                key={key}
                onClick={() => {
                  handleOrder(data.id);
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
        style={{
          zIndex: 999999,
          minWidth: "60vw",
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
              {`ORDEM DE SERVIÇO Nº${idOrder} ATUALIZADO COM SUCESSO`}
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

          <div
            style={{
              display: "flex",
              gap: "10px",
            }}
          >
            <Button
              label="EXPORTAR EM PDF"
              disabled={loading}
              icon={loading ? "pi pi-spinner" : "pi pi-file-export"}
              severity="info"
              iconPos="right"
              onClick={handleExportPDF}
              outlined
            />
            <Button
              label={titleButtom}
              disabled={loading}
              icon={loading ? "pi pi-spinner" : "pi pi-arrow-right"}
              severity="info"
              iconPos="right"
              onClick={paginationForm}
            />
          </div>
        </footer>
      </Dialog>
    </>
  );
}
