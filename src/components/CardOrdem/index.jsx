import { Download, Eye } from "lucide-react";
import "./style.css";
import { api } from "../../service/api";
import jsPDF from "jspdf";
import ReactDOMServer from "react-dom/server";
import React, { useEffect, useState } from "react";
import ReactPDF, { PDFDownloadLink } from "@react-pdf/renderer";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

export default function CardOrdem({
  name,
  model,
  brand,
  plate,
  id,
  status,
  onClick,
}) {
  // const html = (dataForm) => (
  //   <html>
  //     <h1 className="titlePDF">ORDEM DE SERVIÇOS</h1>

  //     <div>
  //       <p className="labelPDF">Nome: {dataForm.name || "Não preenchido"}</p>
  //       <p className="labelPDF">CPF: {dataForm.document || "Não preenchido"}</p>
  //       <p className="labelPDF">
  //         Apelido: {dataForm.nickname || "Não preenchido"}
  //       </p>
  //       <p className="labelPDF">
  //         Solicitador: {dataForm.requester || "Não preenchido"}
  //       </p>
  //       <p className="labelPDF">
  //         Endereço: {dataForm.address || "Não preenchido"}
  //       </p>
  //       <p className="labelPDF">
  //         Celular: {dataForm.phone || "Não preenchido"}
  //       </p>
  //       <p className="labelPDF">Email: {dataForm.email || "Não preenchido"}</p>
  //       <p className="labelPDF">Orçamento: {dataForm.budget ? "Sim" : "Não"}</p>
  //     </div>

  //     <hr
  //       style={{
  //         width: "500px",
  //         margin: "20px 0",
  //       }}
  //     />

  //     <div>
  //       <p className="labelPDF">Modelo: {dataForm.model || "Não preenchido"}</p>
  //       <p className="labelPDF">Marca: {dataForm.brand || "Não preenchido"}</p>
  //       <p className="labelPDF">Placa: {dataForm.plate || "Não preenchido"}</p>
  //       <p className="labelPDF">Frota: {dataForm.fleet || "Não preenchido"}</p>
  //       <p className="labelPDF">
  //         Chassis: {dataForm.chassis || "Não preenchido"}
  //       </p>
  //       <p className="labelPDF">
  //         Renavam: {dataForm.renavam || "Não preenchido"}
  //       </p>
  //       <p className="labelPDF">Km: {dataForm.km || "Não preenchido"}</p>
  //       <p className="labelPDF">Color: {dataForm.color || "Não preenchido"}</p>
  //       <p className="labelPDF">Ano: {dataForm.age || "Não preenchido"}</p>
  //       <p className="labelPDF">
  //         Observação: {dataForm.observation || "Não preenchido"}
  //       </p>
  //     </div>

  //     <hr
  //       style={{
  //         width: "500px",
  //         margin: "20px 0",
  //       }}
  //     />

  //     <div>
  //       <p className="labelPDF">
  //         Problema informado: {dataForm.reported || "Não preenchido"}
  //       </p>
  //       <p className="labelPDF">
  //         Problema constatado: {dataForm.problem_verified || "Não preenchido"}
  //       </p>
  //       <p className="labelPDF">
  //         Serviços realizados: {dataForm.services_performed || "Não preenchido"}
  //       </p>
  //     </div>

  //     <hr
  //       style={{
  //         width: "500px",
  //         margin: "20px 0",
  //       }}
  //     />

  //     <div>
  //       <p className="labelPDF">
  //         NF Serviço: {dataForm.nf_service || "Não preenchido"}
  //       </p>
  //       <p className="labelPDF">
  //         NF Peças: {dataForm.nf_parts || "Não preenchido"}
  //       </p>
  //       <p className="labelPDF">
  //         Faturas: {dataForm.invoices || "Não preenchido"}
  //       </p>
  //       <p className="labelPDF">
  //         Descrição: {dataForm.description_general || "Não preenchido"}
  //       </p>
  //     </div>

  //     <hr
  //       style={{
  //         width: "500px",
  //         margin: "20px 0",
  //       }}
  //     />

  //     <div>
  //       <p className="labelPDF">
  //         Obs. Pneus: {dataForm.obs_wheel || "Não preenchido"}
  //       </p>
  //       <p className="labelPDF">
  //         Obs. Acessórios: {dataForm.obs_accessories || "Não preenchido"}
  //       </p>
  //       <p className="labelPDF">
  //         Obs. Estrutura: {dataForm.obs_structure || "Não preenchido"}
  //       </p>
  //       <p className="labelPDF">
  //         Obs: {dataForm.add_observation || "Não preenchido"}
  //       </p>

  //       <p className="labelPDF">
  //         Extra Observação: {dataForm.extra_observation || "Não preenchido"}
  //       </p>
  //     </div>

  //     <hr
  //       style={{
  //         width: "500px",
  //         margin: "20px 0",
  //       }}
  //     />

  //     <div>
  //       <p className="labelPDF">
  //         Preço total: R${dataForm.total_price || "Não preenchido"}
  //       </p>
  //       <p className="labelPDF">
  //         Desconto: R${dataForm.discount || "Não preenchido"}
  //       </p>
  //       <p className="labelPDF">
  //         Forma de pagamento: {dataForm.payment_method || "Não preenchido"}
  //       </p>
  //       <p className="labelPDF">
  //         Total pago: R${dataForm.total_payable || "Não preenchido"}
  //       </p>

  //       <p className="labelPDF">
  //         Status: {dataForm.status == "paidout" ? "Pago" : "Pendente"}
  //       </p>
  //     </div>
  //   </html>
  // );

  // const options = {
  //   orientation: "portrait",
  //   format: "a4",
  // };
  const [order, setOrder] = useState({});
  const [downloadDisable, setDownloadDisable] = useState(true);

  useEffect(() => {
    const getOrdem = async () => {
     const {data} = await api.get(`/order/${id}`)
      setOrder(data)
      setDownloadDisable(false)
    }
    getOrdem()
  }, [])

  const styles = StyleSheet.create({
    page: {
      flexDirection: "column",
    },
    section: {
      margin: 10,
      padding: 10,
      backgroundColor: "lightgray"
    },
    text: {
      fontWeight: "700"
    }
  });

  // Create Document Component
  const MyDocument = ({data}) => {
    return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.text}>Nome: {data.name}</Text>
          <Text style={styles.text}>CPF: {data.document}</Text>
          <Text style={styles.text}>Apelido: {data.nickname}</Text>
          <Text style={styles.text}>Solicitador: {data.requester}</Text>
        </View>
      </Page>
    </Document>
  )};

  async function handleDownload() {
    try {
      const { data } = await api.get(`/order/${id}`);
      //handleExportPDF(data)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
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
          <div className="boxEye" style={downloadDisable ? {
            touchAction: "none",
            pointerEvents: "none"
          } : {}}>
            <PDFDownloadLink className="boxEye" document={<MyDocument data={order}/>} fileName={`ordem-${id.substring(0, 5)}.pdf`}>
              <Download
                style={{
                  cursor: "pointer",
                }}
                size={26}
                color="white"
                onClick={handleDownload}
              />
            </PDFDownloadLink>
          </div>
        </div>
      </div>
    </>
  );
}
