import "./style.css";

export default function CardResumo({ totalMesPago, totalMesPendente, totalServicos }) {
  return (
    <div className="conteinerCardResumo">
      <div>
        <h3>Total do mês</h3>
        <p>Pago: R${totalMesPago}</p>
        <p>Pendente: R${totalMesPendente}</p>
      </div>

      <div>
        <h3>Total de serviços</h3>
        <p>{totalServicos}</p>
      </div>
    </div>
  );
}
