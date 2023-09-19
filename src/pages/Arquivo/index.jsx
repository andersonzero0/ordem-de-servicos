import { useContext, useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import HeaderDashboard from "../../components/HeaderDashboard";
import UltimasOrdens from "../../components/UltimasOrdens";
import { OrderContext } from "../../contexts/Order";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";

import "./style.css";

export default function Arquivo() {
  const { orders, haveOrders } = useContext(OrderContext);

  const [query, setQuery] = useState("");
  const [order, setOrder] = useState([]);

  const handleQuery = async (e) => {
    setQuery(e.target.value);

    const newResult = await orders.filter((data) =>
      data.name.includes(e.target.value)
    );

    setOrder(newResult);
  };

  useEffect(() => {
    if (!orders) {
      return;
    }

    setOrder(orders);
  }, [orders]);

  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl1, setAnchorEl1] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClose1 = () => {
    setAnchorEl1(null);
  };

  const open = Boolean(anchorEl);
  const open1 = Boolean(anchorEl1);
  const id = open ? "simple-popover" : undefined;
  const id1 = open1 ? "simple-popover" : undefined;

  return (
    <section className="sectionArquivos">
      <HeaderDashboard setVisible={() => setVisible(!visible)} />

      <div className="conteinerDashboard">
        {!haveOrders ? (
          <div
            style={{
              display: "flex",
              flexFlow: "column nowrap",
              gap: "10px",
            }}
          >
            <h2 className="titleOrdens">Arquivos</h2>
            <div className="conteinerNãoEncontrado">
              <img src="./undraw_towing.svg" alt="" />
              <p>
                Não encontramos nada da sua pesquisa.... <br />
                Tente Novamente!
              </p>
            </div>
          </div>
        ) : (
          <>
            <div
              style={{
                display: "flex",
                flexFlow: "column nowrap",
                gap: "10px",
              }}
            >
              <h2 className="titleOrdens">Arquivos</h2>

              <UltimasOrdens
                orders={order}
                search={haveOrders ? true : false}
              />
            </div>

            <div className="conteinerFilter">
              <span className="p-input-icon-right">
                <i className="pi pi-search" />
                <InputText
                  value={query}
                  onChange={(e) => {
                    handleQuery(e);
                  }}
                  pt={{
                    root: { className: "inputSearch" },
                  }}
                  placeholder="Pesquisar..."
                />
              </span>

              <div className="conteinerOrganize">
                <h2>Organizar por:</h2>

                <div>
                  <button
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={handleClick}
                  >
                    <p>Ordem alfabetica</p>

                    <img src="./Vector.svg" alt="" />
                  </button>
                  <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "center",
                    }}

                    style={{
                      background: "transparent"
                    }}
                  >
                    <div className="boxOrderAlpha">
                      <button
                        onClick={() => {
                          let newArr = [...order];
                          setOrder(
                            [...newArr].sort((a, b) => {
                              let fa = a.name.toLowerCase();
                              let fb = b.name.toLowerCase();
                              if (fa < fb) {
                                return -1;
                              }
                              if (fa > fb) {
                                return 1;
                              }
                              return 0;
                            })
                          );
                        }}
                      >
                        Crescente
                      </button>
                      <button
                        onClick={() => {
                          let newArr = [...order];
                          setOrder(
                            [...newArr].reverse((a, b) => {
                              let fa = a.name.toLowerCase();
                              let fb = b.name.toLowerCase();
                              if (fa < fb) {
                                return -1;
                              }
                              if (fa > fb) {
                                return 1;
                              }
                              return 0;
                            })
                          );
                        }}
                      >
                        Decrescente
                      </button>
                    </div>
                  </Popover>

                  <button
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={handleClick1}>
                    <p>Data</p>

                    <img src="./Vector.svg" alt="" />
                  </button>

                  <Popover
                    id={id1}
                    open={open1}
                    anchorEl={anchorEl1}
                    onClose={handleClose1}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "center",
                    }}

                    style={{
                      background: "transparent"
                    }}
                  >
                    <div className="boxOrderAlpha">
                      <button
                        onClick={() => {
                          let newArr = [...order];
                          setOrder(
                            [...newArr].reverse((a, b) => {
                              return new Date(b.create_at) - new Date(a.create_at);
                            })
                          );
                        }}
                      >
                        Mais novo
                      </button>
                      <button
                        onClick={() => {
                          let newArr = [...order];
                          setOrder(
                            [...newArr].sort((a, b) => {
                              return new Date(b.create_at) - new Date(a.create_at);
                            })
                          );
                        }}
                      >
                        Mais antigo
                      </button>
                    </div>
                  </Popover>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
