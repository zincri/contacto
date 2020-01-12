import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import ContactForm from './components/ContactForm.js';

import { contacts_json } from './tasks.json';
import ContactEditForm from './components/ContactEditForm.js';
import Login from './components/Login.js';

function App() {

  const [contactos, setContactos] = useState(
    []
  );
  const [tipo_telefono, setTipo_telefono] = useState([]);

  const [token, setToken] = useState(localStorage.getItem('access_token') ||'');
  const [user, setUser] = useState(null);
  const [flag, setFlag] = useState(false);
  
  

  useEffect(() => {
    async function getContacts() {
      try {
        let res = await fetch('http://127.0.0.1:8000/api/contact');
        let data = await res.json();
        setContactos(
          data
        );

      } catch (error) {
        console.log("Se fue al catch");
        setContactos(
          contacts_json
        );
      }
    }
    getContacts();
    
  }, []);
  

  async function deleteContact(id) {
    try {
      let config = {
        method: 'DELETE',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
        },
        body: JSON.stringify({
          'id':id
        })
      }
      let res = await fetch('http://127.0.0.1:8000/api/contact/'+id,config);
      let data = await res.json();
      console.log(data);
    } catch (error) {
      console.log("Se fue al catch");
    }
  }

  async function logoutAccount() {
    try {
      let config = {
        method: 'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
        },
        body: JSON.stringify({
          'token':token
        })
    }
      let res = await fetch('http://127.0.0.1:8000/api/logout',config);
      let data = await res.json();
      localStorage.removeItem('access_token');
      setToken('');
      console.log(data);
    } catch (error) {
      console.log("Se fue al catch");
    }
  }

  async function checkMe() {
    try {
      let config = {
        method: 'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
        },
        body: JSON.stringify({
          'token':'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTU3ODg2MjMwOSwiZXhwIjoxNTc4ODY1OTA5LCJuYmYiOjE1Nzg4NjIzMDksImp0aSI6IjlpNHZzRFU4ckNBSWU2WUMiLCJzdWIiOjEsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.bXw32oQ6Kf6Q4-iPvR_tryWhu1HG3bBhHnhpg0DyrQc'
        })
    }
      let res = await fetch('http://127.0.0.1:8000/api/me',config);
      let data = await res.json();
      console.log(data);
    } catch (error) {
      console.log("Se fue al catch");
    }
  }

  
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
                      // AQUI VAS A EMPEZAR CON EL UPDATE
                      let contactos_editados = contactos.map(function(dato){
                      if(dato.id === todo.id){
                        console.log("Si paso ");
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

                      setContactos(contactos_editados);
                    }
                  }
                  ></ContactEditForm>

            
            
            <button
              className="btn btn-danger"
              onClick={() => {
                if (window.confirm('¿Estas seguro que deceas eliminar?')) {
                  
                  deleteContact(todo.id);
                  setContactos(
                    contactos.filter(i => {
                      return i.id !== todo.id
                    }
                    )
                  )
                }
              }
              } >Delete
            </button>

          </div>
        </div>
      </div>
    )
  })
  return (

    (token != '')?
    <div className="App">
      <nav className="navbar navbar-dark bg-dark">
        <a className="text-white">
          Contactos
            <span className="badge badge-pill badge-light ml-2">{contactos.length}</span>
        </a>

        <button
              className="btn btn-primary"
              onClick={() => {
                if (window.confirm('¿Checar?')) {
                  
                  checkMe()
                  
                }
              }
              } >Check me
            </button>

        <button
              className="btn btn-danger"
              onClick={() => {
                if (window.confirm('¿Estas seguro que deceas cerrar sesion?')) {
                  logoutAccount()
                }
              }
              } >Logout
            </button>

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
  <Login
    onSendData={(datos) => {

      console.log(datos.access_token);
      setToken(datos.access_token);
      localStorage.setItem('access_token', datos.access_token);
      //setFlag(true)
    }

    }
    ></Login>
  
  );
}

export default App;
