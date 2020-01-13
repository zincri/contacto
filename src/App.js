import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import ContactForm from './components/ContactForm.js';
import LoginForm from './components/LoginForm.js';
import { contacts_json } from './tasks.json';
import ContactEditForm from './components/ContactEditForm.js';
import Reference from './components/Reference';

function App() {

  const [contactos, setContactos] = useState(
    []
  );
  const [tipo_telefono, setTipo_telefono] = useState([]);
    
  
  const [inicio,setLogin] = useState(true);
    

  useEffect(() => {

    async function getContacts() {
      try {
        let res = await fetch('http://127.0.0.1:8000/api/contact');
        let data = await res.json();
        setContactos(
          data
        );

      } catch (error) {
        console.log("pasó al catch");
        setContactos(
          contacts_json
        );
      }
    }
    getContacts();
    
  }, []);

  async function deleteContacts(id){
    //e.preventDefault();

    try {
        let config = {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(id)
        }
        let res = await fetch("http://127.0.0.1:8000/api/contact/"+id,config);
        //console.log(todo);
        //(let res = await fetch(url, config);
        let data = await res.json();
        //props.onAddContact(data);
    } catch (error) {
        console.log(error);
    }
  }

  
  console.log(contactos);
  const contactos_const = contactos.map((todo, i) => {
    return (
      <div key={todo.id} className="col-md-4 col-sm-4 rowml">
        <div className="card">
          <div className="card-header">
            <h3>{todo.nombre} - {todo.id}</h3>
            <span className="badge badge-pill badge-danger ml-2"></span>
          </div>
          <div className="card-body">
            <p><mark>{todo.apellido_paterno} / {todo.apellido_materno}</mark></p>
          </div>
          <div className="card-footer">
            

          <ContactEditForm
                    onSendTodo={todo}
                    onSendTipos={tipo_telefono}
                    
                    onAddContact={(todo) => {
                      /* setContactos(
                        [...contactos, todo]
                      ) */
                      let edit_contact = contactos.map(function(dato){
                        if(dato.id === todo.id){
                        
                        dato.id = todo.id;
                        dato.nombre = todo.nombre;
                        dato.apellido_paterno = todo.apellido_paterno;
                        dato.apellido_materno = todo.apellido_materno;
                        dato.edad = todo.edad;
                        dato.numero_telefono = todo.numero_telefono;
                        dato.created_at = todo.created_at;
                        dato.updated_at = todo.updated_at;
                        dato.user_id = todo.user_id;

                        }
                        return dato;
                      })
                      setContactos(edit_contact);
                    }
                    }
                  ></ContactEditForm>

            <button
              className="btn btn-danger"
              onClick={() => {
                if (window.confirm('¿Estas seguro que deceas eliminar?')) {
                  deleteContacts(todo.id)
                  setContactos(
                    contactos.filter(i => {
                      return i.id !== todo.id
                    })
                  )
                }
              }
              }>Delete</button>

           <Reference onSendTodo={todo.reference}></Reference>

          </div>
        </div>
      </div>
    )
  })
  
  
  return (

   (inicio) ? 
    <div className="App">
      <nav className="navbar navbar-dark bg-dark">
        <a className="text-white">
          Contactos
            <span className="badge badge-pill badge-light ml-2">{contactos.length}</span>
        </a>
        
      </nav>
      <div className="container">
        <div className="row mt-4">
          <div className="col-md-3">
            <img src={logo} className="App-logo" alt="logo" />

            <ContactForm onAddTodo=
              {(todo) => {
                setContactos(
                  [...contactos, todo]
                )
              }
              }
              onAddTipo={
                (parametro) => 
                {
                  setTipo_telefono(parametro)
                  console.log(parametro);
                }
              }
              >
            </ContactForm>
          </div>
          <div className="col-md-9">
            <div className="row">
              {contactos_const}
            </div>
          </div>
        </div>
      </div>
    </div>
    :
    <LoginForm
    onSendData={(user)=>{
      setLogin(true);
    }}
    ></LoginForm>
  );
}

export default App;
