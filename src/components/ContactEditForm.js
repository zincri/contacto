import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { Checkbox } from 'react-bootstrap';

const ContactEditForm = props => {
    const [contacto, setContacto] = useState(props.onSendContacto);


    //Modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    //Modal

    const handleInput = e => {
        const value = e.target.value;
        const name = e.target.name;
        setContacto({
            ...contacto, [name]: value
        })

    }

    async function handleSubmit(e) {


        e.preventDefault();
        if(props.onSendToken!==''){
            try {
                let config = {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'bearer '+props.onSendToken,
                    },
                    body: JSON.stringify(contacto)
                }
                var url = "http://127.0.0.1:8000/api/contact/" + contacto.id;
                console.log(contacto);
                let res = await fetch(url, config);
                let data = await res.json();
                props.onAddContact(data);
            } catch (error) {
                console.log(error);
            }
        }


    }
    useEffect(() => {
        //console.log("useeffect");
        
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
                                value={contacto.nombre}
                                onChange={handleInput}
                                className="form-control"
                                placeholder="Nombre" />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                name="apellido_paterno"
                                value={contacto.apellido_paterno}
                                onChange={handleInput}
                                className="form-control"
                                placeholder="Apellido Paterno" />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                name="apellido_materno"
                                value={contacto.apellido_materno}
                                onChange={handleInput}
                                className="form-control"
                                placeholder="Apellido Materno" />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                name="edad"
                                value={contacto.edad}
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
                                value={contacto.numero_telefono}
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
