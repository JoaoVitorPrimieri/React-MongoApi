import React, { useState, useEffect, useRef } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import api from "../../services/api";
import AndamentoList from "./AndamentoList";
import AndamentoForm from "./AndamentoForm";
import AndamentoSrv from "./AndamentoSrv";
import ColaboradorSrv from "../colaboradores/ColaboradorSrv";
import AtividadeSrv from "../atividades/AtividadeSrv";

import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';

function AndamentoCont() {

  const [colaboradores, setColaboradores] = useState([]);
  const [atividades, setAtividades] = useState([]);
  const [andamentos, setAndamentos] = useState([]);
  const toastRef = useRef();
  const initialState = { id: null, titulo: '', descricao: '', dataHora: '', colaborador: '', atividade: '' }
  const [andamento, setAndamento] = useState(initialState)
  const [editando, setEditando] = useState(false)

  useEffect(() => {
    onClickAtualizar(); // ao inicializar execula método para atualizar
    ColaboradorSrv.listar()
    .then((response) => {
      setColaboradores(response.data);
      toastRef.current.show({
        severity: "success",
        summary: "Colaboradores atualizados",
        life: 3000,
      });
    })
    .catch((e) => {
      toastRef.current.show({
        severity: "error",
        summary: e.message,
        life: 3000,
      });
    });
    AtividadeSrv.listar()
    .then((response) => {
      setAtividades(response.data);
      toastRef.current.show({
        severity: "success",
        summary: "Atividades atualizadas",
        life: 3000,
      });
    })
    .catch((e) => {
      toastRef.current.show({
        severity: "error",
        summary: e.message,
        life: 3000,
      });
    });
  }, []);

  const onClickAtualizar = () => {
    AndamentoSrv.listar()
      .then((response) => {
        setAndamentos(response.data);
        toastRef.current.show({
          severity: "success",
          summary: "Andamento atualizado",
          life: 3000,
        });
      })
      .catch((e) => {
        toastRef.current.show({
          severity: "error",
          summary: e.message,
          life: 3000,
        });
      });
  };


  React.useEffect(() => {
    api
      .get("/andamento")
      .then((response) => setAndamentos(response.data))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, []);
  // operação inserir


  const inserir = () => {
    setAndamentos(initialState);
    setEditando(true);
  }
  const cancelar = () => {
    console.log('Cancelou ...');
    setEditando(false);
  }
  const salvar = () => {
    if (andamento._id == null) { // inclussão
      AndamentoSrv.incluir(andamento).then(response => {
        setEditando(false);
        onClickAtualizar();
        toastRef.current.show({ severity: 'success', summary: "Salvou", life: 2000 });
      })
        .catch(e => {
          toastRef.current.show({ severity: 'error', summary: e.message, life: 4000 });
        });
    } else { // alteração
      AndamentoSrv.alterar(andamento).then(response => {
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
    setAndamento(andamentos.filter((andamento) => andamento._id === id)[0]);
    setEditando(true);
  }

  const excluir = (_id) => {
    confirmDialog({
      message: 'Confirma a exclusão?',
      header: 'Confirmação',
      icon: 'pi pi-question',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      acceptClassName: 'p-button-danger',
      accept: () => excluirConfirm(_id)
    });
  }

  const excluirConfirm = (_id) => {

    AndamentoSrv.excluir(_id).then(response => {
      onClickAtualizar();
      toastRef.current.show({
        severity: 'success',
        summary: "Excluído", life: 2000
      });
    })
      .catch(e => {
        toastRef.current.show({
          severity: 'error',
          summary: e.message, life: 4000
        });
      });
  }

  if (!editando) {
    return (
      <div className="App">
        <Toast ref={toastRef} />
        <ConfirmDialog />
        <AndamentoList
          andamentos={andamentos}
          inserir={inserir}
          editar={editar}
          excluir={excluir}
          onClickAtualizar={onClickAtualizar}
          />

        <Toast ref={toastRef} />

      </div>
    );  
  } else {
    return (
      <div className="App">
        <AndamentoForm
          andamento={andamento}
          colaboradores={colaboradores}
          atividades={atividades}
          setAndamento={setAndamento}
          salvar={salvar}
          cancelar={cancelar} />
        <Toast ref={toastRef} />

      </div>
    );
  }
}

export default AndamentoCont;
