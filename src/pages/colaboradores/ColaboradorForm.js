import React, { useState } from "react";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useForm } from "react-hook-form";

const ColaboradorForm = (props) => {
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    props.setColaborador({ ...props.colaborador, [name]: value });
  };
  
  const [contraSenha, setContraSenha] = useState();

  const { register, handleSubmit, setError, formState: { errors } } = useForm();
  
  const onSubmit = data => {
     //console.log(data);
     if (contraSenha != props.colaborador.senha){
        setError('senha', { type: 'custom', message: 'Senha e contra senha são diferentes!' });
     } else {
        props.salvar();
     }


     
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
     <div style={{padding:15}}>
            <div className="card">
                <h5>Cadastro de Colaboradores</h5>
                <div style={{marginLeft: "33em"}}>

                <div className="p-fluid grid formgrid">
                    <div className="field col-12 md:col-4">
                        <label htmlFor="nome">Nome</label>
                        <InputText name="nome" {...register("nome", { 
                                  required: {value: true, message:'O nome é obrigatório!'},
                                  maxLength: {value: 50, message:'O nome pode ter no máximo 50 caracteres!'},
                                  minLength: {value: 2, message:'O nome pode ter no mínimo 2 caracteres!'}, 
                                })}
                                defaultValue={props.colaborador.nome} onChange={handleInputChange} />
                         {errors.nome && <span style={{color:'red'}}>{errors.nome.message}</span>}          
                    </div>
                </div>
                <div className="p-fluid grid formgrid">
                    <div className="field col-12 md:col-4">
                        <label htmlFor="email">Email</label>
                        <InputText name="email" {...register("email", { 
                                  required: {value: true, message:'O email é obrigatório!'},
                                  maxLength: {value: 100, message:'O email pode ter no máximo 100 caracteres!'},
                                  minLength: {value: 10, message:'O nome deve ter no mínimo 10 caracteres!'}, 
                                })}
                                defaultValue={props.colaborador.email} onChange={handleInputChange} />
                         {errors.email && <span style={{color:'red'}}>{errors.email.message}</span>} 
                    </div>
                </div>
                <div className="p-fluid grid formgrid">
                    <div className="field col-12 md:col-4">
                        <label htmlFor="senha">Senha</label>
                        <InputText name="senha" 
                        {...register("senha", { })}
                        defaultValue={props.colaborador.senha} onChange={handleInputChange} />
                        {errors.senha && <span style={{color:'red'}}>{errors.senha.message}</span>} 
                    </div>
                </div>    
                <div className="p-fluid grid formgrid">
                    <div className="field col-12 md:col-4">
                        <label htmlFor="contraSenha">Contra Senha</label>
                        <InputText name="contraSenha" defaultValue={contraSenha} 
                                   onChange={ e => setContraSenha(e.target.value)} />
                    </div>
                </div>                         
</div>


<div>
<Button type="submit" icon="pi pi-pencil" className="p-button-rounded p-button-text " 
                       label="Salvar"></Button>
                <Button type="button" icon="pi pi-trash" className="p-button-rounded p-button-text" 
                       label="Cancelar" onClick={props.cancelar}></Button>

</div>

                
                
            </div>
        </div>
    </form>
  );
};
export default ColaboradorForm;
