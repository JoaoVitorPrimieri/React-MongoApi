import React, { useState, useEffect, useRef } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import api from "../../services/api";
import TipoRequisicaoList from "./TipoRequisicaoList";
import TipoRequisicaoForm from "./TipoRequisicaoForm";
import TipoRequisicaoSrv from "./TipoRequisicaoSrv";
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';

function TipoRequisicaoCont() {


  const [tipoRequisicoes, setTipoRequisicoes] = useState([]);
  const toastRef = useRef();
  const initialState = { id: null, nome: '', email: '', senha: '' }
  const [tipoRequisicao, setTipoRequisicao] = useState(initialState)
  const [editando, setEditando] = useState(false)

  useEffect(() => {
    onClickAtualizar(); // ao inicializar execula método para atualizar
  }, []);

  const onClickAtualizar = () => {
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
  };


  React.useEffect(() => {
    api
      .get("/tipoRequisicao")
      .then((response) => setTipoRequisicoes(response.data))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, []);
  // operação inserir


  const inserir = () => {
    setTipoRequisicao(initialState);
    setEditando(true);
  }
  const cancelar = () => {
    console.log('Cancelou ...');
    setEditando(false);
  }
  const salvar = () => {
    if (tipoRequisicao._id == null) { // inclussão
      TipoRequisicaoSrv.incluir(tipoRequisicao).then(response => {
        setEditando(false);
        onClickAtualizar();
        toastRef.current.show({ severity: 'success', summary: "Salvou", life: 2000 });
      })
        .catch(e => {
          toastRef.current.show({ severity: 'error', summary: e.message, life: 4000 });
        });
    } else { // alteração
      TipoRequisicaoSrv.alterar(tipoRequisicao).then(response => {
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
    setTipoRequisicao(tipoRequisicoes.filter((tipoRequisicao) => tipoRequisicao._id === id)[0]);
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

    TipoRequisicaoSrv.excluir(_id).then(response => {
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
        <TipoRequisicaoList
          tipoRequisicoes={tipoRequisicoes}
          inserir={inserir}
          editar={editar}
          excluir={excluir} />

        <Toast ref={toastRef} />

      </div>
    );  
  } else {
    return (
      <div className="App">
        <TipoRequisicaoForm
          tipoRequisicao={tipoRequisicao}
          setTipoRequisicao={setTipoRequisicao}
          salvar={salvar}
          cancelar={cancelar} />
        <Toast ref={toastRef} />

      </div>
    );
  }
}

export default TipoRequisicaoCont;
