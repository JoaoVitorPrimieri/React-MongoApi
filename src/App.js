import "./App.css";
import React, { useState, useEffect,Suspense, lazy } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from './pages/login/LoginForm'
import Menu from'./Menu'

const Home = lazy(() => import('./pages/home/home'));
const ColaboradorCon = lazy(() => import('./pages/colaboradores/ColaboradorCon'));
const SolicitanteCon = lazy(() => import('./pages/solicitantes/SolicitanteCon'));
const TipoRequisicaoCon = lazy(() => import('./pages/tipoRequisicao/TipoRequisicaoCon'));
const RequisicaoCon = lazy(() => import('./pages/requisicoes/RequisicaoCon'));
const AtividadeCon = lazy(() => import('./pages/atividades/AtividadeCon'));
const AndamentoCon = lazy(() => import('./pages/andamento/AndamentoCon'));


function App() {

  const [token, setToken] = useState([])
  useEffect(() => {
  setToken(sessionStorage.getItem('token'));
  }, []);
  if (!token) {
  return <LoginForm/>
  }
 


  return (
    <BrowserRouter>
    <Menu/>
      <Suspense fallback={<div>Carregando ...</div>}>

        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/colaboradores" element={<ColaboradorCon />} />
          <Route path="/solicitantes" element={<SolicitanteCon />} />
          <Route path="/tipoRequisicao" element={<TipoRequisicaoCon />} />
          <Route path="/requisicao" element={<RequisicaoCon />} />
          <Route path="/atividade" element={<AtividadeCon />} />
          <Route path="/andamento" element={<AndamentoCon />} />

        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}




export default App;
