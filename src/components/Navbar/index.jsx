import { Link } from "react-router-dom";
import "./style.css";
import "./responsive.css"

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link className="link" to={"/dashboard"}>
        <img src="./dashboard.svg" alt="" />
        <div className="tooltip">
           
            <p>Dashboard</p>
        </div>
      </Link>

      <Link className="link" to={"/financeiro"}>
        <img src="./attach_money.svg" alt="" />
        <div className="tooltip">
         
          <p>Financeiro</p>
        </div>
      </Link>

      <Link className="link" to={"/arquivo"}>
        <img src="./inventory.svg" alt="" />
        <div className="tooltip">
        
            <p>Arquivo</p>
        </div>
      </Link>
    </nav>
  );
}
