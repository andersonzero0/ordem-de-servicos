import { useContext, useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import HeaderDashboard from "../../components/HeaderDashboard";
import UltimasOrdens from "../../components/UltimasOrdens";
import { OrderContext } from "../../contexts/Order";

import "./style.css";

export default function Arquivo() {
  const { orders, haveOrders } = useContext(OrderContext);

  const [query, setQuery] = useState("");
  const [order, setOrder] = useState([]);
  const [clickOrderAlpha] = useState(false)

  const handleQuery = async (e) => {
    
      setQuery(e.target.value);

      const newResult = await orders.filter((data) =>
        data.name.includes(e.target.value)
      );

      setOrder(newResult);
  };

  useEffect(() => {
    if(!orders) {
        return
    }

    setOrder(orders)
  }, [orders])

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
                  <button style={{
                    cursor: 'pointer'
                  }} onClick={() => {

                   let newArr = [...order]
                   
                    setOrder( [...newArr].sort((a, b) => {

                        let fa = a.name.toLowerCase()
                        let fb= b.name.toLowerCase()

                        if(fa < fb) {

                            return -1;
                            
                        }
                        if(fa > fb) {

                            return 1;
                            
                        }
                        
                        return 0
                    }))
                    
                  }}>
                    <p>Ordem alfabetica</p>

                    <img src="./Vector.svg" alt="" />
                  </button>

                  <button>
                    <p>Data</p>

                    <img src="./Vector.svg" alt="" />
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
