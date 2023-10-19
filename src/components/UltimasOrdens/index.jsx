import { useState, useContext, useEffect } from "react";
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
import "./responsive.css";
import { OrderContext } from "../../contexts/Order";
import { Backdrop, CircularProgress } from "@mui/material";
import { Paginator } from "primereact/paginator";
import { Loader } from "lucide-react";

export default function UltimasOrdens({ orders, search = false, visiblePagination = false }) {
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
  const { refresh, setRefresh, countOrders, setCountOrders, loadingOrder } = useContext(OrderContext);
  const [first, setFirst] = useState(0);
  const [ordersView, setOrdersView] = useState([])

  const onPageChange = async (event) => {
    const response = await api.get(`/order?page=${event.first}`)
    setOrdersView(response.data.orders)
    setCountOrders(response.data.count)
    setFirst(event.first);
  };

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

  const [visibleDelete, setVisibleDelete] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  async function handleDelete(ref) {
    setLoadingDelete(true);
    setOpen(true);

    try {
      api.delete(`/order/${ref}`).then((response) => {
        setVisibleDelete(false);

        setRefresh(!refresh);
        setVisible(false);
        setOpen(false);
      });
    } catch (error) {
      return error;
    } finally {
      setLoadingDelete(false);
    }
  }

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
          setPageForm(1);
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

  useEffect(() => {
    if(orders.length > 0) {
      setOrdersView(orders) 
    }
  }, [orders])

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <section className="conteinerOrdens">
        {ordersView.length != 0 ? (
          ordersView.map((data, key) => {
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
          loadingOrder ? <Loader/> : <p>Não há ordens!</p>
        )}
        <Paginator alwaysShow={visiblePagination} first={first} rows={10} totalRecords={countOrders} onPageChange={onPageChange}/>
      </section>

      <Dialog
        closable={true}
        header="ORDEM DE SERVIÇO"
        visible={visible}
        style={{
          zIndex: 999999,
          minWidth: "60vw",
        }}
        onHide={() => {
          setPageForm(1)
          setDataForm(modelForm)
          setVisible(false)
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

        <Dialog
          closable={false}
          visible={visibleDelete}
          header="ATENÇÃO!"
          pt={{
            headerTitle: { style: { color: "#D12727" } },
          }}
        >
          <div className="conteinerAlert">
            <div className="boxOptDelete">
              <Button
                onClick={() => {
                  setVisibleDelete(false);
                }}
                label="CANCELAR"
                severity="secondary"
                outlined
              />
              <Button
                onClick={() => {
                  handleDelete(dataForm.id);
                }}
                disabled={loadingDelete}
                label={loadingDelete ? <CircularProgress /> : "DELETAR"}
                severity="danger"
              />
            </div>
          </div>
        </Dialog>

        <footer className="footerForm">
          <Button
            pt={{
              root: { className: "rootBtnResp" },
            }}
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
            className="boxOptResp"
          >
            <Button
              label="DELETAR"
              disabled={loading}
              icon="pi pi-trash"
              severity="danger"
              iconPos="right"
              onClick={() => setVisibleDelete(true)}
              pt={{
                label: { className: "labelBtnResp" },
              }}
            />
            <Button
              label={titleButtom}
              disabled={loading}
              icon={loading ? "pi pi-spinner" : "pi pi-arrow-right"}
              severity="info"
              iconPos="right"
              onClick={paginationForm}
              pt={{
                label: { className: "labelBtnResp" },
              }}
            />
          </div>
        </footer>
      </Dialog>
    </>
  );
}
