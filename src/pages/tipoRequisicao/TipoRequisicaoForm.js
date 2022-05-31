import React from "react";
const tipoRequisicaoForm = (props) => {
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    props.settipoRequisicao({ ...props.tipoRequisicao, [name]: value });
  };

  return (
    <form>
       <div className="form-group">
        <label>Id</label>
        <input className="form-control" type="text" name="id"
          value={props.tipoRequisicao._id} onChange={handleInputChange} />
      </div>
      <div className="form-group">
        <label>Descrição</label>
        <input className="form-control" type="text" name="tipoRequisicao"
          value={props.tipoRequisicao.nome} onChange={handleInputChange} />
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
export default tipoRequisicaoForm;