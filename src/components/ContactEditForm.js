import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';

const ContactEditForm = props => {
    const [todo, setTodo] = useState(props.onSendTodo);


    //Modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    //Modal

    const handleInput = e => {
        const value = e.target.value;
        const name = e.target.name;
        console.log(e.target.name + " " + e.target.value);
        setTodo({
            ...todo, [name]: value
        })

    }

    async function handleSubmit(e) {


        e.preventDefault();

        try {
            let config = {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(todo)
            }
            var url = "http://127.0.0.1:8000/api/contact/" + todo.id;
            //console.log(todo);
            let res = await fetch(url, config);
            let data = await res.json();
            props.onAddContact(data);
        } catch (error) {
            console.log(error);
        }


    }


    const [tipo_telefono, setTipo_telefono] = useState([]);
    
    //console.log(tipo_telefono);
    useEffect(() => {
        console.log("useeffect");
        if (show === true) {
        console.log("Dentro de");    
            //No es necesaria por que ya hiciste la consulta antes
            console.log("paso en el useeffect");
            async function getTypePhones() {
                try {
                    let res = await fetch('http://127.0.0.1:8000/api/contact/create');
                    let data = await res.json();
                    
                    setTipo_telefono(
                        data
                    )

                } catch (error) {
                    setTipo_telefono(
                        tipo_telefono
                    )
                }
            }
            getTypePhones();
           
        }
    },[]);

    return (
        <>

            <Button variant="info" onClick={handleShow}>Edit</Button>


            <Modal show={show} onHide={handleShow}>

                <Modal.Header closeButton onClick={handleClose}>
                    <Modal.Title>Editar Tarea</Modal.Title>
                </Modal.Header>
                <Modal.Body>

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
                                placeholder="Nombre" />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                name="apellido_paterno"
                                value={todo.apellido_paterno}
                                onChange={handleInput}
                                className="form-control"
                                placeholder="Apellido Paterno" />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                name="apellido_materno"
                                value={todo.apellido_materno}
                                onChange={handleInput}
                                className="form-control"
                                placeholder="Apellido Materno" />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                name="edad"
                                value={todo.edad}
                                onChange={handleInput}
                                className="form-control"
                                placeholder="Edad" />
                        </div>

                        <div className="form-group">
                            <select
                                className="form-control"
                                name="tipo_telefono"
                                onChange={handleInput}>
                                {
                                    props.onSendTipos.map((tipo, i) =>
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
                                placeholder="Numero Telefono" />
                        </div>

                        <Button variant="secondary" onClick={handleClose}>
                            Cerrar
                        </Button>
                        <Button type="submit" variant="primary" onClick={handleClose}>
                            Guardar Cambios
                        </Button>
                    </form>
                </Modal.Body>

            </Modal>
        </>
    );
}

export default ContactEditForm;
