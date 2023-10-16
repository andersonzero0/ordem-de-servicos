import { useContext } from "react";
import CardResumo from "../CardResumo";
import "./style.css";
import { OrderContext } from "../../contexts/Order";
import CardAnalysis from "../CardsAnalysis";

export default function ResumoFinanceiro() {
  const { countOrders, orders, ordersMany } = useContext(OrderContext);

  const valueTotal = ordersMany.reduce((acc, value) => {
    if(value.status == "paidout") {

      acc.pago += Number(value.total_payable)
      
    } else {

      acc.pendente += Number(value.total_payable)
    }

    return acc;
  }, { pago: 0, pendente: 0 });

  return (
    <div>
      {/* <CardResumo totalMesPago={valueTotal.pago} totalMesPendente={valueTotal.pendente} totalServicos={orders.length} /> */}
      <CardAnalysis totalServices={countOrders} totalPago={valueTotal.pago} totalPendente={valueTotal.pendente}/>
    </div>
  );
}
