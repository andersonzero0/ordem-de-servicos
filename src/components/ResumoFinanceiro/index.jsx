import { useContext } from "react";
import CardResumo from "../CardResumo";
import "./style.css";
import { OrderContext } from "../../contexts/Order";

export default function ResumoFinanceiro() {
  const { orders } = useContext(OrderContext);

const valueTotal = orders.reduce((acc, value) => {
  if(value.status == "paidout") {

    acc.pago += Number(value.total_payable)
    
  } else {

    acc.pendente += Number(value.total_payable)
  }

  return acc;
}, { pago: 0, pendente: 0 });

  return (
    <div>
      <CardResumo totalMesPago={valueTotal.pago} totalMesPendente={valueTotal.pendente} totalServicos={orders.length} />
    </div>
  );
}
