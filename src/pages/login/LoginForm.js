import React, { useState, useEffect, useRef } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useForm } from "react-hook-form";
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import LoginSrv from './LoginSrv';
const LoginForm = (props) => {

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        setCredenciais({ ...credenciais, [id]: value });
    };
    const { register, handleSubmit, setError, formState: { errors } } = useForm();
    const toastRef = useRef();
    const [credenciais, setCredenciais] = useState({ "login": "", "senha": "" })
    const onSubmit = data => {
        LoginSrv.login(credenciais).then(response => {
            let token = response.data;
            if (token) {
                sessionStorage.setItem('token', token);
                window.location = "/";
            } else {
                toastRef.current.show({ severity: 'error', summary: 'Erro no login', life: 5000 });
            }
        }).catch(({ response }) => {
            toastRef.current.show({ severity: 'error', summary: response.data, life: 5000 });
        });
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Toast ref={toastRef} />
            <div className="card"
                style={{ width: '200px', textAlign: "center", marginLeft: '40%', marginTop: '15%' }}>
                <div className="p-fluid grid formgrid">
                    <div className="field col-12 md:col-12">
                        <label htmlFor="email">Email</label>
                        <InputText  id="email" className="p-inputtext-sm block mb-2"
                            {...register("email", {
                                required: { value: true, message: "email é obrigatória" },
                            })}
                            defaultValue={credenciais.email} onKeyUp={handleInputChange} />
                        {errors.email && <span style={{ color: 'red' }}>{errors.email.message}</span>}
                    </div>
                </div>
                <div className="p-fluid grid formgrid">
                    <div className="field col-12 md:col-12">
                        <label htmlFor="senha">Senha</label>
                        <InputText type={'password'} id="senha" className="p-inputtext-sm block mb-2"
                            {...register("senha", {
                                required: { value: true, message: "Senha é obrigatória" },
                                minLength: { value: 2, message: "Tamanho mínimo é 2" },
                            })}
                            defaultValue={credenciais.senha} onKeyUp={handleInputChange} />
                        {errors.senha && <span style={{ color: 'red' }}>{errors.senha.message}</span>}
                    </div>
                </div>
                <br />
                <Button icon="pi pi-sign-in" type="submit" label="Login" className="p-button-text" />
            </div>
        </form>
    );
}
export default LoginForm;