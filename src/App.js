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
  const [user, setUser] = useState('');

  

  useEffect(() => {

    
    async function getContacts() {
      try {

        let config = {
          method: 'GET',
          headers:{
              'Accept':'application/json',
              'Content-Type':'application/json',
              'Authorization': 'bearer '+token,
              //'token': token falla - no lo descomentes
  
          },
        }
        let res = await fetch('http://127.0.0.1:8000/api/contact',config);
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

    if(token !== ''){
      checkMe()
      getContacts();
    }
    
  }, []);
  

  async function deleteContact(id) {
    try {
      let config = {
        method: 'DELETE',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
            'Authorization': 'bearer '+token,

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
          'token':token
        })
      }
      let res = await fetch('http://127.0.0.1:8000/api/me',config);
      let data = await res.json();
      if(res.status===400){
        localStorage.removeItem('access_token');
        setToken('');
      }
      setUser(data);
      console.log(res);

    } catch (error) {
      console.log("Se fue al catch");
    }
  }

  
  const contactos_const = contactos.map((contacto, i) => {
    return (
      <div key={contacto.id} className="col-md-4 col-sm-4 rowml">
        <div className="card">
          <div className="card-header">
            <h3>{contacto.nombre} - {contacto.id}</h3>
            <span className="badge badge-pill badge-danger ml-2"></span>
          </div>
          <div className="card-body">
            <p><mark>{contacto.apellido_paterno} {contacto.apellido_materno}</mark></p>
          </div>
          <div className="card-footer">
          <ContactEditForm
                    onSendContacto={contacto}
                    onSendTipos={tipo_telefono}
                    onSendToken={token}
                    
                    onAddContact={(contacto) => {
                      let contactos_editados = contactos.map(function(dato){
                      if(dato.id === contacto.id){
                        dato.id = contacto.id;
                        dato.nombre = contacto.nombre;
                        dato.apellido_paterno = contacto.apellido_paterno;
                        dato.apellido_materno = contacto.apellido_materno;
                        dato.edad = contacto.edad;
                        dato.numero_telefono = contacto.numero_telefono;
                        dato.created_at = contacto.created_at;
                        dato.updated_at = contacto.updated_at;
                        dato.user_id = contacto.user_id;
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
                  
                  deleteContact(contacto.id);
                  setContactos(
                    contactos.filter(i => {
                      return i.id !== contacto.id
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

    (token !== '')?
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
              {(contacto) => {
                setContactos(
                  [...contactos, contacto]
                )
              }
              }

              onSendToken={token}
            
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
      setToken(datos.access_token);
      console.log(datos.access_token);
      setUser(datos.user);
      localStorage.setItem('access_token', datos.access_token);
      localStorage.setItem('user', datos.user);
    }
    }
    ></Login>
  
  );
}

export default App;
