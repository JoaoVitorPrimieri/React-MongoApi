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

function App() {



  return (
    <BrowserRouter>
    <Menu/>
      <Suspense fallback={<div>Carregando ...</div>}>

        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/colaboradores" element={<ColaboradorCon />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}




export default App;
