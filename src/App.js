import "./App.css";
import React, { Suspense, lazy } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from'./Menu'

const Home = lazy(() => import('./pages/home/home'));
const ColaboradorCon = lazy(() => import('./pages/colaboradores/ColaboradorCon'));
const SolicitanteCon = lazy(() => import('./pages/solicitantes/SolicitanteCon'));
const TipoRequisicaoCon = lazy(() => import('./pages/tipoRequisicao/TipoRequisicaoCon'));
const RequisicaoCon = lazy(() => import('./pages/requisicoes/RequisicaoCon'));
const AtividadeCon = lazy(() => import('./pages/atividades/AtividadeCon'));

sessionStorage.setItem('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjlmZDdkMmFhNDQxYWVlZGQxNTE1N2UiLCJub21lIjoiQnJ1bm8iLCJpYXQiOjE2NTQ2NDk4MjcsImV4cCI6MTY1NDY1MzQyN30.0yocczG928UURYsuICoDfruc7QqixW5omHeoa4kS5ow');

function App() {




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

        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}




export default App;
