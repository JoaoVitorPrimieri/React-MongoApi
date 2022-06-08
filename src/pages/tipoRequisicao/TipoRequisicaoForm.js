import React from "react";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useForm } from "react-hook-form";

const TipoRequisicaoForm = (props) => {
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    props.setTipoRequisicao({ ...props.tipoRequisicao, [name]: value });
  };



  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => {
    //console.log(data);




  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div style={{ padding: 15 }}>
        <div className="card">
          <h5>Cadastro de Tipo Requisição</h5>
          <div style={{marginLeft: "33em"}}>
          <div className="p-fluid grid formgrid">
            <div className="field col-12 md:col-4">
              <label htmlFor="descricao">Descricao</label>
              <InputText name="descricao" {...register("descricao", {
                required: { value: true, message: 'A descrição é obrigatória!' },
                maxLength: { value: 50, message: 'A descrição pode ter no máximo 50 caracteres!' },
                minLength: { value: 2, message: 'A descrição pode ter no mínimo 2 caracteres!' },
              })}
                defaultValue={props.tipoRequisicao.descricao} onChange={handleInputChange} />
              {errors.descricao && <span style={{ color: 'red' }}>{errors.descricao.message}</span>}
            </div>
          </div>
          </div>
          <div>
            <Button type="submit" icon="pi pi-pencil" className="p-button-rounded p-button-text "
              label="Salvar" onClick={props.salvar}></Button>
            <Button type="button" icon="pi pi-trash" className="p-button-rounded p-button-text"
              label="Cancelar" onClick={props.cancelar}></Button>

          </div>



        </div>
      </div>
    </form>
  );
};
export default TipoRequisicaoForm;
