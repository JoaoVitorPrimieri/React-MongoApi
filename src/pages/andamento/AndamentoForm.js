import React from "react";
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useForm } from "react-hook-form";
const AndamentoForm = (props) => {

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        props.setAndamento({ ...props.andamento, [name]: value });
    };

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {
        //console.log(data);
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div style={{ padding: 15 }}>
                <div className="card">
                    <h5>Cadastro de Andamento:</h5>
                    <div style={{ marginLeft: "33em" }}>
                        <div className="p-fluid grid formgrid">
                            <div className="field col-12 md:col-4">
                                <label htmlFor="dataHora">Data e Hora:</label>
                                <input className="form-control" type="datetime-local" name="dataHora"
                                    value={props.andamento.dataHora} onChange={handleInputChange} />
                            </div>
                        </div>
                        <div className="p-fluid grid formgrid">
                            <div className="field col-12 md:col-4">
                                <label htmlFor="titulo">Titulo</label>
                                <InputText name="titulo" {...register("titulo", {
                                    required: { value: true, message: 'O titulo é obrigatório!' },
                                    maxLength: { value: 50, message: 'O titulo pode ter no máximo 50 caracteres!' },
                                    minLength: { value: 2, message: 'O titulo pode ter no mínimo 2 caracteres!' },
                                })}
                                    defaultValue={props.andamento.titulo} onChange={handleInputChange} />
                                {errors.titulo && <span style={{ color: 'red' }}>{errors.titulo.message}</span>}
                            </div>
                        </div>
                        <div className="p-fluid grid formgrid">
                            <div className="field col-12 md:col-4">
                                <label htmlFor="descricao">Descricao</label>
                                <InputText name="descricao" {...register("descricao", {
                                    required: { value: true, message: 'A descrição é obrigatória!' },
                                    maxLength: { value: 50, message: 'A descrição pode ter no máximo 50 caracteres!' },
                                    minLength: { value: 2, message: 'A descrição pode ter no mínimo 2 caracteres!' },
                                })}
                                    defaultValue={props.andamento.descricao} onChange={handleInputChange} />
                                {errors.descricao && <span style={{ color: 'red' }}>{errors.descricao.message}</span>}
                            </div>
                        </div>

                        <div className="p-fluid grid formgrid">
                            <div className="field col-12 md:col-4">
                                <label htmlFor="colaborador">Colaboradores:</label>
                                <Dropdown name="colaborador" value={props.andamento.colaborador}
                                    options={props.colaboradores} optionLabel="nome" optionValue="_id"
                                    onChange={handleInputChange} placeholder="Selecione o Colaborador" />
                            </div>
                        </div>
                        <div className="p-fluid grid formgrid">
                            <div className="field col-12 md:col-4">
                                <label htmlFor="atividade">Atividade:</label>
                                <Dropdown name="atividade" value={props.andamento.atividade}
                                    options={props.atividades} optionLabel="titulo" optionValue="_id"
                                    onChange={handleInputChange} placeholder="Selecione a Atividade" />
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
export default AndamentoForm;