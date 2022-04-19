import "./App.css";
import React, { useState, useEffect, useRef } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import api from "./services/api";
import ColaboradorList from "./ColaboradorList";
import ColaboradorForm from "./ColaboradorForm";
import ColaboradorSrv from "./services/ColaboradorSrv";
import PrimeReact from 'primereact/api';
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';


import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';

function App() {
  let colaboradoresList = [
    { id: 1, nome: "Fulano", email: "email1@teste", senha: "12okp1" },
    { id: 2, nome: "Beltrano", email: "email2@teste", senha: "1293912" },
  ];

  const [colaboradores, setColaboradores] = useState(colaboradoresList);
  const toastRef = useRef();
  const [usuarios, setUsuarios] = useState([])
  useEffect(() => {
    onClickAtualizar(); // ao inicializar execula método para atualizar
  }, []);

  const onClickAtualizar = () => {
    ColaboradorSrv.listar().then(response => {
      setUsuarios(response.data);
      toastRef.current.show({
        severity: 'success',
        summary: "Colaborador atualizados",
        life: 3000
      });
    })
      .catch(e => {
        toastRef.current.show({
          severity: 'error',
          summary: e.message,
          life: 3000
        });
      });
  }
  React.useEffect(() => {
    api
      .get("/colaborador")
      .then((response) => setColaboradores(response.data))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, []);
  // operação inserir
  const initialState = { id: null, nome: '', email: '', senha: '' }
  const [colaborador, setColaborador] = useState(initialState)
  const [editando, setEditando] = useState(false)

  const [visible, setVisible] = useState(false);
  const inserir = () => {
    setColaborador(initialState);
    setEditando(true);
  }
  const cancelar = () => {
    console.log('Cancelou ...');
    setEditando(false);
  }
  const salvar = () => {
    if (colaborador._id == null) { // inclussão
      ColaboradorSrv.incluir(colaborador).then(response => {
        setEditando(false);
        onClickAtualizar();
        toastRef.current.show({ severity: 'success', summary: "Salvou", life: 2000 });
      })
        .catch(e => {
          toastRef.current.show({ severity: 'error', summary: e.message, life: 4000 });
        });
    } else { // alteração
      ColaboradorSrv.alterar(colaborador).then(response => {
        setEditando(false);
        onClickAtualizar();
        toastRef.current.show({ severity: 'success', summary: "Salvou", life: 2000 });
      })
        .catch(e => {
          toastRef.current.show({ severity: 'error', summary: e.message, life: 4000 });
        });
    }
  }







  const editar = (id) => {
"text"

  }

  const excluir = (_id) => {
    confirmDialog({
      message: 'Confirma a exclusão?',
      header: 'Confirmação',
      icon: 'pi pi-question',
      acceptLabel:'Sim',
      rejectLabel:'Não',
      acceptClassName: 'p-button-danger',
      accept: () => excluirConfirm(_id)
      });
    }

  const excluirConfirm = (_id) => {
    
    ColaboradorSrv.excluir(_id).then(response => {
    onClickAtualizar();
    toastRef.current.show({ severity: 'success',
    summary: "Excluído", life: 2000 });
    })
    .catch(e => {
    toastRef.current.show({ severity: 'error',
    summary: e.message, life: 4000 });
    });
    }

  if (!editando) {
    return (
      <div className="App">
        <Toast ref={toastRef} />
        <ConfirmDialog></ConfirmDialog>
        <ColaboradorList colaboradores={colaboradores}
          inserir={inserir} editar={editar} excluir={excluir} />
      </div>
    );
  } else {
    return (
      <div className="App">
        <ColaboradorForm colaborador={colaborador} setColaborador={setColaborador}
          salvar={salvar} cancelar={cancelar} />
      </div>
    );
  }
}

export default App;
