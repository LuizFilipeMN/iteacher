import React, { useEffect, useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import api from '../../service/api';
import { useParams, useNavigate, Link } from 'react-router-dom';

const FormularioProfessor = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [professor, setProfessor] = useState({
    nome: '',
    especialidade: '',
  });
  const [alertMessageSuccess, setAlertMessageSuccess] = useState('');
  const [alertMessageError, setAlertMessageError] = useState('');

  useEffect(() => {
    if (props.action === 'editar') {
      api.get(`professores/editar/${id}`)
        .then(response => {
          const { professor } = response.data;
          setProfessor(professor);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [props.action, id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfessor(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let url = '/professores/';

    if (props.action === 'editar') {
      api.put(url + 'editar/' + id, {
        professor,
      })
        .then(response => {
          const { status, message } = response.data;
          if (status === 'error') {
            setAlertMessageError(message);
            setTimeout(() => {
              setAlertMessageError('');
            }, 1500);
          } else {
            setAlertMessageSuccess(message);
            setTimeout(() => {
              setAlertMessageSuccess('');
              navigate('/professores');
            }, 1500);
          }
        })
        .catch(error => {
          console.log(error)
        });
    } else {
      api.post(url + 'adicionar', {
        professor,
      })
        .then(response => {
          const { status, message } = response.data;
          if (status === 'error') {
            setAlertMessageError(message);
            setTimeout(() => {
              setAlertMessageError('');
            }, 1500);
          } else {
            setAlertMessageSuccess(message);
            setTimeout(() => {
              setAlertMessageSuccess('');
              navigate('/professores');
            }, 1500);
          }
        })
        .catch(error => {
          console.log(error)
        });
    }
  };

  return (
    <Card className="mx-auto mt-4" style={{ maxWidth: '800px' }}>
      <Card.Header className=''>
        <Link to="/professores" style={{ position: 'absolute', marginTop: '5px', color: 'black' }}>
          <span className="material-icons">arrow_back</span>
        </Link>
        <div className="text-center">
          <h4>{props.action === 'editar' ? 'Editar' : 'Adicionar'} professor</h4>
        </div>
      </Card.Header>
      <Card.Body>
        {alertMessageSuccess && (
          <div className="alert alert-success">{alertMessageSuccess}</div>
        )}
        {alertMessageError && (
          <div className="alert alert-danger">{alertMessageError}</div>
        )}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="nome">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              name="nome"
              value={professor.nome || ''}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="especialidade" className='mt-2'>
            <Form.Label>Especialidade</Form.Label>
            <Form.Control
              as="textarea"
              name="especialidade"
              value={professor.especialidade || ''}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Button variant="warning" type="submit" className='mt-3'>
            Salvar
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default FormularioProfessor;