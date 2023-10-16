import { Download, Eye, Loader } from "lucide-react";
import "./style.css";
import "./responsive.css"
import { api } from "../../service/api";
import React, { useEffect, useState } from "react";
import { Image, PDFDownloadLink } from "@react-pdf/renderer";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import PoppinsLight from "../../../public/fonts/Poppins/Poppins-Light.ttf";
import PoppinsMedium from "../../../public/fonts/Poppins/Poppins-Medium.ttf";
import PoppinsBold from "../../../public/fonts/Poppins/Poppins-Bold.ttf";

export default function CardOrdem({
  name,
  model,
  brand,
  plate,
  id,
  status,
  onClick,
}) {
  const [order, setOrder] = useState({});
  const [downloadDisable, setDownloadDisable] = useState(true);

  useEffect(() => {
    const getOrdem = async () => {
      const { data } = await api.get(`/order/${id}`);
      setOrder(data);
      setDownloadDisable(false);
    };
    getOrdem();
  }, []);

  Font.register({
    family: "Poppins",
    fonts: [
      { src: PoppinsLight, fontWeight: "light" },
      { src: PoppinsMedium, fontWeight: "medium" },
      { src: PoppinsBold, fontWeight: "bold" },
    ],
  });

  const styles = StyleSheet.create({
    page: {
      flexDirection: "column",
      fontFamily: "Poppins",
    },
    section: {
      margin: 10,
      padding: 10,
      backgroundColor: "#0E213E",
      borderRadius: "8",
      flexDirection: "row",
      gap: "2",
      flexWrap: "wrap",
      justifyContent: "space-evenly",
      alignItems: "center",
    },
    text: {
      fontWeight: "ultrabold",
      fontSize: "16",
      color: "white",
      textDecoration: "underline",
    },
    section_logo: {
      margin: "0 auto",
      textAlign: "center",
    },
    img: {
      width: "50",
      height: "50",
    },
  });

  const MyDocument = ({ data }) => {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section_logo}>
            <Image src="./Logo.png" style={styles.img} />
          </View>
          <View style={styles.section}>
            <Text style={styles.text}>
              Nome: {data.name ? data.name : "Não preenchido"}
            </Text>
            <Text style={styles.text}>
              CPF: {data.document ? data.document : "Não preenchido"}
            </Text>
            <Text style={styles.text}>
              Apelido: {data.nickname ? data.nickname : "Não preenchido"}
            </Text>
            <Text style={styles.text}>
              Solicitador: {data.requester ? data.requester : "Não preenchido"}
            </Text>
            <Text style={styles.text}>
              Celular: {data.phone ? data.phone : "Não preenchido"}
            </Text>
            <Text style={styles.text}>
              Email: {data.email ? data.email : "Não preenchido"}
            </Text>
            <Text style={styles.text}>
              Orçamento: {data.budget ? "Sim" : "Não"}
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.text}>
              Modelo: {data.model ? data.model : "Não preenchido"}
            </Text>
            <Text style={styles.text}>
              Marca: {data.brand ? data.brand : "Não preenchido"}
            </Text>
            <Text style={styles.text}>
              Placa: {data.plate ? data.plate : "Não preenchido"}
            </Text>
            <Text style={styles.text}>
              Frota: {data.fleet ? data.fleet : "Não preenchido"}
            </Text>
            <Text style={styles.text}>
              Chassis: {data.chassis ? data.chassis : "Não preenchido"}
            </Text>
            <Text style={styles.text}>
              Renavam: {data.renavam ? data.renavam : "Não preenchido"}
            </Text>
            <Text style={styles.text}>
              Km: {data.km ? data.km : "Não preenchido"}
            </Text>
            <Text style={styles.text}>
              Cor: {data.color ? data.color : "Não preenchido"}
            </Text>
            <Text style={styles.text}>
              Ano: {data.age ? data.age : "Não preenchido"}
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.text}>
              Problema Informado:{" "}
              {data.reported ? data.reported : "Não preenchido"}
            </Text>
            <Text style={styles.text}>
              Problema Constatado:{" "}
              {data.problem_verified ? data.problem_verified : "Não preenchido"}
            </Text>
            <Text style={styles.text}>
              Serviços realizados:{" "}
              {data.services_performed
                ? data.services_performed
                : "Não preenchido"}
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.text}>
              NF Serviço: {data.nf_service ? data.nf_service : "Não preenchido"}
            </Text>
            <Text style={styles.text}>
              NF Peças: {data.nf_parts ? data.nf_parts : "Não preenchido"}
            </Text>
            <Text style={styles.text}>
              Faturas: {data.invoices ? data.invoices : "Não preenchido"}
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.text}>
              Obs. Pneus: {data.obs_wheel ? data.obs_wheel : "Não preenchido"}
            </Text>
            <Text style={styles.text}>
              Obs. Acessórios:{" "}
              {data.obs_accessories ? data.obs_accessories : "Não preenchido"}
            </Text>
            <Text style={styles.text}>
              Obs. Estrutura:{" "}
              {data.obs_structure ? data.obs_structure : "Não preenchido"}
            </Text>
            <Text style={styles.text}>
              Observações:{" "}
              {data.add_observation ? data.add_observation : "Não preenchido"}
            </Text>
            <Text style={styles.text}>
              Obs. Extra:{" "}
              {data.extra_observation
                ? data.extra_observation
                : "Não preenchido"}
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.text}>
              Preço total: R$
              {data.total_price ? data.total_price : "Não preenchido"}
            </Text>
            <Text style={styles.text}>
              Desconto: R${data.discount ? data.discount : "Não preenchido"}
            </Text>
            <Text style={styles.text}>
              Obs. Estrutura: R$
              {data.obs_structure ? data.obs_structure : "Não preenchido"}
            </Text>
            <Text style={styles.text}>
              Método:{" "}
              {data.payment_method ? data.payment_method : "Não preenchido"}
            </Text>
            <Text style={styles.text}>
              Total pago: R$
              {data.total_payable ? data.total_payable : "Não preenchido"}
            </Text>
            <Text style={styles.text}>
              Pago: R${data.status == "pending" ? "Não" : "Sim"}
            </Text>
          </View>
        </Page>
      </Document>
    );
  };

  async function handleDownload() {
    try {
      const { data } = await api.get(`/order/${id}`);
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
          <div
            className="boxEye"
            style={
              downloadDisable
                ? {
                    touchAction: "none",
                    pointerEvents: "none",
                  }
                : {}
            }
          >
            <PDFDownloadLink
              className="linkPDF"
              document={<MyDocument data={order} />}
              fileName={`ordem-${id.substring(0, 5)}.pdf`}
            >
              {downloadDisable ? (
                <Loader color="white" />
              ) : (
                <Download
                  style={{
                    cursor: "pointer",
                  }}
                  size={26}
                  color="white"
                  onClick={handleDownload}
                />
              )}
            </PDFDownloadLink>
          </div>
        </div>
      </div>
    </>
  );
}
