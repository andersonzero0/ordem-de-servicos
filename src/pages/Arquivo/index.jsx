import { useState } from "react";
import { InputText } from "primereact/inputtext";
import HeaderDashboard from "../../components/HeaderDashboard";
import UltimasOrdens from "../../components/UltimasOrdens";

import "./style.css"

export default function Arquivo() {

    const [ordens, setOrdens] = useState([])

    return (
        <section className="sectionArquivos">

            <HeaderDashboard setVisible={() => setVisible(!visible)}/>

            <div className="conteinerDashboard">
                {
                    ordens.length != 0 ? 
                    <div style={{
                        display: 'flex',
                        flexFlow: 'column nowrap',
                        gap: '10px'
                    }}>
                        <h2 className="titleOrdens">Arquivos</h2>
                           <div className="conteinerNãoEncontrado">
                                <img src="./undraw_towing.svg" alt="" />
                                <p>
                                    Não encontramos nada da sua pesquisa.... <br/>
                                    Tente Novamente!
                                </p>
                           </div>
                        
                    </div>

                : 

                <>
                    <div style={{
                        display: 'flex',
                        flexFlow: 'column nowrap',
                        gap: '10px'
                    }}>
                        <h2 className="titleOrdens">Arquivos</h2>
                        
                        <UltimasOrdens ordens={ordens}/>
                        
                    </div>

                    <div className="conteinerFilter">
                        <span className="p-input-icon-right">
                            <i className="pi pi-search" />
                            <InputText pt={{
                                root: { className: "inputSearch" }
                            }} placeholder="Pesquisar..." />
                        </span>

                        <div className="conteinerOrganize">
                            <h2>Organizar por:</h2>

                            <div>
                                <button>
                                    <p>
                                    Ordem alfabetica
                                    </p>

                                    <img src="./Vector.svg" alt="" />
                                </button>

                                <button>
                                    <p>
                                    Data
                                    </p>

                                    <img src="./Vector.svg" alt="" />
                                </button>
                            </div>
                        </div>
                    </div>
                </>
                
                }
            </div>
            
        </section>
    )
    
}