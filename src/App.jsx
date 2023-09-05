import {
  Routes,
  Route
} from "react-router-dom"
import Layout from "./components/Layout"
import Dashboard from "./pages/Dashboard"
import Financeiro from "./pages/Financeiro"
import Arquivo from "./pages/Arquivo"


//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";     
    
//core
import "primereact/resources/primereact.min.css";

import 'primeicons/primeicons.css';
                                          
        

function App() {
  return (
    <Routes>

      <Route element={<Layout/>}>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/financeiro" element={<Financeiro/>}/>
        <Route path="/arquivo" element={<Arquivo/>}/>
      </Route>
      
    </Routes>
  )
}

export default App
