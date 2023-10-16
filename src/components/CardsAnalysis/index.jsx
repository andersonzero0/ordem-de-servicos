import "./style.css";

export default function CardAnalysis({
  totalServices,
  totalPendente,
  totalPago,
}) {
  return (
    <div className="conteinerCardAnalysis">
      <div className="subCardAnalysis">
        <p className="titleCardAnalysis">Total de serviços</p>

        <p className="valueCardAnalysis">{totalServices}</p>
      </div>

      <div className="subCardAnalysis">
        <p className="titleCardAnalysis">Serviços pagos</p>

        <p style={{
          color: "#168039"
        }} className="valueCardAnalysis">R${totalPendente}</p>
      </div>

      <div className="subCardAnalysis">
        <p className="titleCardAnalysis">Serviços pendentes</p>

        <p className="valueCardAnalysis">R${totalPago}</p>
      </div>
    </div>
  );
}
