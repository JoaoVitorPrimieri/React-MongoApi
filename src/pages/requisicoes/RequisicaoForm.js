import React from "react";
import { Dropdown } from 'primereact/dropdown';
const RequisicaoForm = (props) => {
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    props.setRequisicao({ ...props.requisicao, [name]: value });
  };

  return (

    <form>
       <div className="form-group">
        <label>Id</label>
        <input className="form-control" type="text" name="id"
          value={props.requisicao._id} onChange={handleInputChange} />
      </div>
      <div className="form-group">
        <label>Titulo</label>
        <input className="form-control" type="text" name="titulo"
          value={props.requisicao.titulo} onChange={handleInputChange} />
      </div>
      <div className="form-group">
        <label>Descrição</label>
        <input className="form-control" type="text" name="descricao"
          value={props.requisicao.descricao} onChange={handleInputChange} />
      </div>
      <div className="form-group">
        <label>Data Hora Criada</label>
        <input className="form-control" type="text" name="dataHora"
          value={props.requisicao.dataHora} onChange={handleInputChange} />
      </div>
      <div className="form-group">
        <label>Status</label>
        <input className="form-control" type="text" name="status"
          value={props.requisicao.status} onChange={handleInputChange} />
      </div>
      <div className="form-group">
        <label>Prazo Atendimento</label>
        <input className="form-control" type="text" name="prazoAtendimento"
          value={props.requisicao.prazoAtendimento} onChange={handleInputChange} />
      </div>      
      <div className="form-group">
        <label>Tipo Requisicao</label>
        {console.log(props.requisicao)}   
        <Dropdown value={props.requisicao.tipoRequisicao} options={props.tipoRequisicoes}
        optionLabel="descricao" optionValue="_id"
         onChange={handleInputChange} placeholder="Selecione o Tipo"/>


      </div>

      <div className="form-group">
        <button type="button" onClick={props.salvar}
          className="btn btn-primary btn-sm">Salvar</button>
        <button type="button" onClick={props.cancelar}
          className="btn btn-primary btn-sm">Cancelar</button>
      </div>
    </form>
  );
};
export default RequisicaoForm;