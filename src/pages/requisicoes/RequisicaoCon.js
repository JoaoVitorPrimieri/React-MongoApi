import React, { useState, useEffect, useRef } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import api from "../../services/api";
import RequisicaoList from "./RequisicaoList";
import RequisicaoForm from "./RequisicaoForm";
import RequisicaoSrv from "./RequisicaoSrv";
import TipoRequisicaoSrv from "../tipoRequisicao/TipoRequisicaoSrv";
import SolicitanteSrv from "../solicitantes/SolicitanteSrv";

import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';

function RequisicaoCont() {

  const [tipoRequisicoes, setTipoRequisicoes] = useState([]);
  const [solicitantes, setSolicitantes] = useState([]);
  const [requisicoes, setRequisicoes] = useState([]);
  const toastRef = useRef();
  const initialState = { id: null, titulo: '', descricao: '', dataHora: '', status: '', prazoAtendimento: '', tipoRequisicao: '', solicitante: '' }
  const [requisicao, setRequisicao] = useState(initialState)
  const [editando, setEditando] = useState(false)

  useEffect(() => {
    onClickAtualizar(); // ao inicializar execula método para atualizar
    TipoRequisicaoSrv.listar()
    .then((response) => {
      setTipoRequisicoes(response.data);
      toastRef.current.show({
        severity: "success",
        summary: "tipoRequisicoes atualizados",
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
    SolicitanteSrv.listar()
    .then((response) => {
      setSolicitantes(response.data);
      toastRef.current.show({
        severity: "success",
        summary: "solicitantes atualizados",
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
    RequisicaoSrv.listar()
      .then((response) => {
        setRequisicoes(response.data);
        toastRef.current.show({
          severity: "success",
          summary: "Requisicao atualizado",
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
      .get("/requisicao")
      .then((response) => setRequisicoes(response.data))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, []);
  // operação inserir


  const inserir = () => {
    setRequisicao(initialState);
    setEditando(true);
  }
  const cancelar = () => {
    console.log('Cancelou ...');
    setEditando(false);
  }
  const salvar = () => {
    if (requisicao._id == null) { // inclussão
      RequisicaoSrv.incluir(requisicao).then(response => {
        setEditando(false);
        onClickAtualizar();
        toastRef.current.show({ severity: 'success', summary: "Salvou", life: 2000 });
      })
        .catch(e => {
          toastRef.current.show({ severity: 'error', summary: e.message, life: 4000 });
        });
    } else { // alteração
      RequisicaoSrv.alterar(requisicao).then(response => {
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
    setRequisicao(requisicoes.filter((requisicao) => requisicao._id === id)[0]);
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

    RequisicaoSrv.excluir(_id).then(response => {
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
        <RequisicaoList
          requisicoes={requisicoes}
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
        <RequisicaoForm
          requisicao={requisicao}
          tipoRequisicoes={tipoRequisicoes}
          solicitantes={solicitantes}
          setRequisicao={setRequisicao}
          salvar={salvar}
          cancelar={cancelar} />
        <Toast ref={toastRef} />

      </div>
    );
  }
}

export default RequisicaoCont;
