import React from "react";
import { Menubar } from 'primereact/menubar';
import { useNavigate } from "react-router-dom";

function Menu() {
    let navigate = useNavigate();
    const items = [
      {
        label: 'Home', icon: 'pi pi-fw pi-home',
        command: () => { navigate("/")}
      },
      {
        label: 'Cadastro', icon: 'pi pi-fw pi-file',
        items: [
          {
            label: 'Colaboradores', icon: 'pi pi-fw pi-user',
            command: () => { navigate("/colaboradores") }
          },
          {
            label: 'Solicitante', icon: 'pi pi-fw pi-user',
            command: () => { navigate("/solicitantes") }
          },
          {
            label: 'Tipo Requisição', icon: 'pi pi-fw pi-user',
            command: () => { navigate("/tipoRequisicao") }
          },
          {
            label: 'Requisicao', icon: 'pi pi-fw pi-user',
            command: () => { navigate("/requisicao") }
          }
        ]
      },
      {
        label: 'Sair', icon: 'pi pi-fw pi-power-off'
      }
    ];
    return (
    <Menubar model={items} 
    />)
  }
  export default Menu;