import React from "react";
const ColaboradorForm = (props) => {
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    props.setColaborador({ ...props.colaborador, [name]: value });
  };

  return (
    <form>
       <div className="form-group">
        <label>Id</label>
        <input className="form-control" type="text" name="id"
          value={props.colaborador._id} onChange={handleInputChange} />
      </div>
      <div className="form-group">
        <label>Nome</label>
        <input className="form-control" type="text" name="nome"
          value={props.colaborador.nome} onChange={handleInputChange} />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input className="form-control" type="text" name="email"
          value={props.colaborador.email} onChange={handleInputChange} />
      </div>
      <div className="form-group">
        <label>Senha</label>
        <input className="form-control" type="text" name="senha"
          value={props.colaborador.senha} onChange={handleInputChange} />
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
export default ColaboradorForm;