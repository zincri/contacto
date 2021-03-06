import React, {useState,useEffect} from 'react';
//import { element } from 'prop-types';

//Tienes que hacer otro servicio par aque consuma el que va a crear
//el contacto y otro para el listado.
//De manera que cada componente va a consumir un servicio distinto.
const ContactForm = props =>{

    const [todo,setTodo] = useState(
        {
            token:props.onSendToken,
            nombre: "",
            apellido_paterno: "",
            apellido_materno: "",
            edad: "",
            tipo_telefono:"",
            numero_telefono: "",
            created_at: "",
            updated_at: ""
        }

    );

    const [tipo_telefono,setTipo_telefono] = useState([]);

    useEffect(() => {
        async function getTypePhones() {
          try {
            let config = {
                method: 'GET',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json',
                    'Authorization': 'bearer '+props.onSendToken,
                },
              }
            let res = await fetch('http://127.0.0.1:8000/api/contact/create',config);
            let data = await res.json();
            setTipo_telefono(
                data
            )
            setTodo({
                ...todo,['tipo_telefono']: data[0].id
            })
            props.onAddTipo(data);
            
          }catch (error) {
            /* setTipo_telefono(    
                tipo_telefono
            ) */
          }
        }
        if(props.onSendToken!==''){
            getTypePhones();
        }
        
        
    },[]);

    const handleInput = e => {
        const value = e.target.value;
        const name = e.target.name;
        //console.log(e.target.name+" "+e.target.value);
        setTodo({
            ...todo,[name]: value
        })
        
    }
    async function handleSubmit(e) {

        e.preventDefault();
        
            try {
                let config = {
                    method: 'POST',
                    headers:{
                        'Accept':'application/json',
                        'Content-Type':'application/json',
                    },
                    body: JSON.stringify(todo)
                }
                let res = await fetch('http://127.0.0.1:8000/api/contact/',config);
                console.log(res);
                let data = await res.json();
                console.log(data);
                props.onAddTodo(data);

              }catch (error) {
                  console.log(error);
            }
        
    }
        return (
            <div className="card">
                <form 
                    className="card-body"
                    onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            name="nombre"
                            value={todo.nombre}
                            onChange={handleInput}
                            className="form-control"
                            placeholder="Nombre"/>
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            name="apellido_paterno"
                            value={todo.apellido_paterno}
                            onChange={handleInput}
                            className="form-control"
                            placeholder="Apellido Paterno"/>
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            name="apellido_materno"
                            value={todo.apellido_materno}
                            onChange={handleInput}
                            className="form-control"
                            placeholder="Apellido Materno"/>
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            name="edad"
                            value={todo.edad}
                            onChange={handleInput}
                            className="form-control"
                            placeholder="Edad"/>
                    </div>

                    <div className="form-group">
                        <select 
                            className="form-control"
                            name="tipo_telefono"
                            onChange={handleInput}>
                                {
                                tipo_telefono.map((tipo,i) => 
                                <option key={tipo.id} value={tipo.id} > {tipo.nombre_tipo}</option>
                                )
                                }

                        </select>
                        
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            name="numero_telefono"
                            value={todo.numero_telefono}
                            onChange={handleInput}
                            className="form-control"
                            placeholder="Numero Telefono"/>
                    </div>
                    
                    <button type="submit" className="btn btn-primary">Guardar</button>
                </form>
            </div>
        )

    
}
export default ContactForm;