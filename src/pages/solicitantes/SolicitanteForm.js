import React from "react";
const SolicitanteForm = (props) => {
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    props.setSolicitante({ ...props.solicitante, [name]: value });
  };

  return (
    <form>
       <div className="form-group">
        <label>Id</label>
        <input className="form-control" type="text" name="id"
          value={props.solicitante._id} onChange={handleInputChange} />
      </div>
      <div className="form-group">
        <label>Nome</label>
        <input className="form-control" type="text" name="nome"
          value={props.solicitante.nome} onChange={handleInputChange} />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input className="form-control" type="text" name="email"
          value={props.solicitante.email} onChange={handleInputChange} />
      </div>
      <div className="form-group">
        <label>Senha</label>
        <input className="form-control" type="text" name="senha"
          value={props.solicitante.senha} onChange={handleInputChange} />
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
export default SolicitanteForm;