import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import { ButtonToolbar } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';

const Reference = props => {
   
    const [todo, setTodo] = useState(props.onSendTodo);


    //Modal
    //const [smShow, setSmShow] = useState(false);
    const [lgShow, setLgShow] = useState(false);
    //Modal

    
    
    
   /*  const handleInput = e => {
        const value = e.target.value;
        const name = e.target.name;
        console.log(e.target.name + " " + e.target.value);
        setTodo({
            ...todo, [name]: value
        })

    } */

    //const [reference, setTipo_reference] = useState([]);
   // const reference = contacto.map((todo, i) => {
    
    return (
        <ButtonToolbar>
          
          <Button onClick={() => setLgShow(true)}>Referencias</Button>
    
          
    
          <Modal
            size="lg"
            show={lgShow}
            onHide={() => setLgShow(false)}
            aria-labelledby="example-modal-sizes-title-lg"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-lg">
                Referencias
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Last Name</th>
                        </tr>
                    </thead>
                    <tbody>
                    {props.onSendTodo.map((todo, i) =>
                        <tr>
                            <td>{todo.id}</td>
                            <td>{todo.nombre}</td>
                            <td>{todo.apellido_paterno}</td>
                        </tr>
                        )
                    }
                    </tbody>
                </Table>
               {/*  <Button variant="success">
                            Add
                </Button> */}
                <Reference onSendTodo={todo}></Reference>
            </Modal.Body>
          </Modal>
        </ButtonToolbar>
      )}

export default Reference