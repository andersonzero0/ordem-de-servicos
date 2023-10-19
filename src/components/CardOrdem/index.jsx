import { Download, Eye, Loader } from "lucide-react";
import "./style.css";
import "./responsive.css";
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
      margin: "4 8",
      borderRadius: "2",
      flexDirection: "column",
      gap: "2",
      flexWrap: "wrap",
      justifyContent: "space-evenly",
      alignItems: "start",
      border: "1 solid #0E213E",
    },
    title: {
      fontWeight: "extrabold"
    },
    header: {
      backgroundColor: "#0E213E",
      color: "white",
      width: "100%",
      textAlign: "center",
    },
    titleHeader: {
      fontSize: 14,
    },
    content: {
      width: "100%",
      padding: 4,
      flexDirection: "row",
      flexWrap: "wrap"
    },
    text: {
      fontWeight: "normal",
      fontSize: "12",
      color: "black",
      width: "50%"
    },
    section_logo: {
      margin: "0 auto",
      textAlign: "center",
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "4 8"
    },
    img: {
      width: "50",
      height: "50",
    },
    date: {
      fontSize: "12"
    }
  });

  const MyDocument = ({ data }) => {
    var date = new Date(data.create_at);
    const dateString = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear()
    
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section_logo}>
            <View>
              <Text>ORDERM DE SERVIÇO</Text>
              <Text style={styles.date}><Text style={styles.title}>ID:</Text> {(data.id)}</Text>
              <Text style={styles.date}><Text style={styles.title}>CRIADO EM:</Text> {dateString}</Text>
            </View>
            <Image src="./Logo.png" style={styles.img} />
          </View>
          <View style={styles.section}>
            <View style={styles.header}>
              <Text style={styles.titleHeader}>Informações do Cliente</Text>
            </View>

            <View style={styles.content}>
              <Text style={styles.text}>
                <Text style={styles.title}>Nome:</Text> {data.name ? data.name : "Não preenchido"}
              </Text>
              <Text style={styles.text}>
                <Text style={styles.title}>CPF:</Text> {data.document ? data.document : "Não preenchido"}
              </Text>
              <Text style={styles.text}>
                <Text style={styles.title}>Apelido:</Text> {data.nickname ? data.nickname : "Não preenchido"}
              </Text>
              <Text style={styles.text}>
                <Text style={styles.title}>Solicitador:</Text>{" "}
                {data.requester ? data.requester : "Não preenchido"}
              </Text>
              <Text style={styles.text}>
                <Text style={styles.title}>Celular:</Text> {data.phone ? data.phone : "Não preenchido"}
              </Text>
              <Text style={styles.text}>
                <Text style={styles.title}>Email:</Text> {data.email ? data.email : "Não preenchido"}
              </Text>
              <Text style={styles.text}>
                <Text style={styles.title}>Orçamento:</Text> {data.budget ? "Sim" : "Não"}
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.header}>
              <Text style={styles.titleHeader}>Informações do veículo</Text>
            </View>

            <View style={styles.content}>
              <Text style={styles.text}>
                <Text style={styles.title}>Modelo:</Text> {data.model ? data.model : "Não preenchido"}
              </Text>
              <Text style={styles.text}>
                <Text style={styles.title}>Marca:</Text> {data.brand ? data.brand : "Não preenchido"}
              </Text>
              <Text style={styles.text}>
                <Text style={styles.title}>Placa:</Text> {data.plate ? data.plate : "Não preenchido"}
              </Text>
              <Text style={styles.text}>
                <Text style={styles.title}>Frota:</Text> {data.fleet ? data.fleet : "Não preenchido"}
              </Text>
              <Text style={styles.text}>
                <Text style={styles.title}>Chassis:</Text> {data.chassis ? data.chassis : "Não preenchido"}
              </Text>
              <Text style={styles.text}>
                <Text style={styles.title}>Renavam:</Text> {data.renavam ? data.renavam : "Não preenchido"}
              </Text>
              <Text style={styles.text}>
                <Text style={styles.title}>Km:</Text> {data.km ? data.km : "Não preenchido"}
              </Text>
              <Text style={styles.text}>
                <Text style={styles.title}>Cor:</Text> {data.color ? data.color : "Não preenchido"}
              </Text>
              <Text style={styles.text}>
                <Text style={styles.title}>Ano:</Text> {data.age ? data.age : "Não preenchido"}
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.header}>
              <Text style={styles.titleHeader}>Informações sobre o serviço</Text>
            </View>

            <View style={styles.content}>
              <Text style={styles.text}>
                <Text style={styles.title}>Problema Informado:</Text> {data.reported ? data.reported : "Não preenchido"}
              </Text>
              <Text style={styles.text}>
                <Text style={styles.title}>Problema Constatado:</Text> {data.problem_verified
                  ? data.problem_verified
                  : "Não preenchido"}
              </Text>
              <Text style={styles.text}>
                <Text style={styles.title}>Serviços realizados:</Text> {data.services_performed
                  ? data.services_performed
                  : "Não preenchido"}
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.header}>
              <Text style={styles.titleHeader}>Descrições Gerais</Text>
            </View>

            <View style={styles.content}>
              <Text style={styles.text}>
                <Text style={styles.title}>NF Serviço:</Text> {data.nf_service ? data.nf_service : "Não preenchido"}
              </Text>
              <Text style={styles.text}>
                <Text style={styles.title}>NF Peças:</Text> {data.nf_parts ? data.nf_parts : "Não preenchido"}
              </Text>
              <Text style={styles.text}>
                <Text style={styles.title}>Faturas:</Text> {data.invoices ? data.invoices : "Não preenchido"}
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.header}>
              <Text style={styles.titleHeader}>Observações adicionais sobre o veículo</Text>
            </View>

            <View style={styles.content}>
              <Text style={styles.text}>
                <Text style={styles.title}>Obs. Pneus:</Text> {data.obs_wheel ? data.obs_wheel : "Não preenchido"}
              </Text>
              <Text style={styles.text}>
                <Text style={styles.title}>Obs. Acessórios:</Text> {data.obs_accessories ? data.obs_accessories : "Não preenchido"}
              </Text>
              <Text style={styles.text}>
                <Text style={styles.title}>Obs. Estrutura:</Text> {data.obs_structure ? data.obs_structure : "Não preenchido"}
              </Text>
              <Text style={styles.text}>
                <Text style={styles.title}>Observações:</Text> {data.add_observation ? data.add_observation : "Não preenchido"}
              </Text>
              <Text style={styles.text}>
                <Text style={styles.title}>Obs. Extra:</Text> {data.extra_observation
                  ? data.extra_observation
                  : "Não preenchido"}
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.header}>
              <Text style={styles.titleHeader}>Pagamento</Text>
            </View>

            <View style={styles.content}>
              <Text style={styles.text}>
                <Text style={styles.title}>Preço total:</Text> R${data.total_price ? data.total_price : "Não preenchido"}
              </Text>
              <Text style={styles.text}>
                <Text style={styles.title}>Desconto:</Text> R${data.discount ? data.discount : "Não preenchido"}
              </Text>
              <Text style={styles.text}>
                <Text style={styles.title}>Método:</Text> {data.payment_method ? (data.payment_method).toUpperCase() : "Não preenchido"}
              </Text>
              <Text style={styles.text}>
                <Text style={styles.title}>Total pago:</Text> R${data.total_payable ? data.total_payable : "Não preenchido"}
              </Text>
              <Text style={styles.text}>
                <Text style={styles.title}>Pago:</Text> {data.status == "pending" ? "Não" : "Sim"}
              </Text>
            </View>
          </View>
        </Page>
      </Document>
    );
  };

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
                />
              )}
            </PDFDownloadLink>
          </div>
        </div>
      </div>
    </>
  );
}
