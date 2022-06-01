import React from "react";
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
const AtividadeForm = (props) => {
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    props.setAtividade({ ...props.atividade, [name]: value });
  };

  return (

    <form>
       <div className="form-group">
        <label>Id</label>
        <input className="form-control" type="text" name="id"
          value={props.atividade._id} onChange={handleInputChange} />
      </div>
      <div className="form-group">
        <label>Titulo</label>
        <input className="form-control" type="text" name="titulo"
          value={props.atividade.titulo} onChange={handleInputChange} />
      </div>
      <div className="form-group">
        <label>Descrição</label>
        <input className="form-control" type="text" name="descricao"
          value={props.atividade.descricao} onChange={handleInputChange} />
      </div>
      <div className="form-group">
        <label>Status</label>
        <input className="form-control" type="text" name="status"
          value={props.atividade.status} onChange={handleInputChange} />
      </div>
  
      <div className="form-group">
        <label>Prazo </label>
        <input className="form-control" type="datetime-local" name="prazo"
          value={props.atividade.prazoAtendimento} onChange={handleInputChange} />
      </div>      
      <div className="form-group">
        <label>Agenda Inicio </label>
        <input className="form-control" type="datetime-local" name="agendaInicio"
          value={props.atividade.agendaInicio} onChange={handleInputChange} />
      </div>
      <div className="form-group">
        <label>Data Hora Termino</label>
        <input className="form-control" type="datetime-local" name="dataHoraTermino"
          value={props.atividade.agendaInicio} onChange={handleInputChange} />
      </div>
      <div className="form-group">
        <label>Requisicao</label>
        {console.log(props.requisicao)}   
        <Dropdown value={props.atividade.requisicao} options={props.requisicao}
        optionLabel="titulo" optionValue="_id"
         onChange={handleInputChange} placeholder="Selecione o Tipo"/>
      </div>
      <div className="form-group">
        <label>Colaborador</label>
        {console.log(props.colaborador)}   
        <Dropdown value={props.atividade.colaborador} options={props.colaborador}
        optionLabel="nome" optionValue="_id"
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
export default AtividadeForm;




   