import { useState } from "react";

import HeaderDashboard from "../../components/HeaderDashboard"
import UltimasOrdens from "../../components/UltimasOrdens"
import ResumoFinanceiro from "../../components/ResumoFinanceiro"

import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
        
import "./style.css"
import InfoClient from "../../components/FormOrdemServico/InfoCliet";
import InfoVeicle from "../../components/FormOrdemServico/InfoVeicle";
import InfoService from "../../components/FormOrdemServico/InfoService";
import InfoGeneral from "../../components/FormOrdemServico/infoGeneral";
import AdditionalRemarks from "../../components/FormOrdemServico/AdditionalRemarks";

export default function Dashboard() {

    const [visible, setVisible] = useState(false);

    const [pageForm, setPageForm] = useState(1)

    return (
        <section className="sectionDashboard">

            <HeaderDashboard setVisible={() => setVisible(!visible)}/>

            <div className="conteinerDashboard">
                <UltimasOrdens/>
                <ResumoFinanceiro/>
            </div>

            <Dialog header="ORDEM DE SERVIÇO" style={{ width: '60vw' }} visible={visible} onHide={() => {setVisible(!visible)}}>

                {
                    pageForm == 1 ? <InfoClient/> : ""
                }
                { 
                    pageForm == 2 ? <InfoVeicle/> : ""
                }
                {
                    pageForm == 3 ? <InfoService/> : ""
                }
                {
                    pageForm == 4 ? <InfoGeneral/> : ""
                }
                {
                    pageForm == 5 ? <AdditionalRemarks/> : ""
                }
                
                <footer className="footerForm">

                    <Button icon="pi pi-times" label="Cancelar" severity="danger" outlined />

                    <Button label="Continuar" icon="pi pi-arrow-right" severity="info" iconPos="right"
                    onClick={() => {
                        setPageForm(pageForm + 1)
                    }}
                    />
                    
                </footer>
                
            </Dialog>
            
        </section>
    )
    
}