import React, { useEffect, useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import api from '../../service/api';
import { Link, useNavigate, useParams } from 'react-router-dom';

const FormularioDisciplina = () => {
  const navigate = useNavigate();
  let { id } = useParams();

  const [disciplinas, setDisciplinas] = useState({
    nome: '',
  });
  const [alertMessage, setAlertMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (id) {
      setIsEditing(true);
      api.get(`/disciplinas/visualizar/${id}`)
        .then(response => {
          setDisciplinas(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDisciplinas((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      api.put(`/disciplinas/editar/${id}`, disciplinas)
        .then(response => {
          setAlertMessage(response.data.message);
          setTimeout(() => {
            setAlertMessage('');
            navigate('/disciplinas');
          }, 1500);
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      api.post('/disciplinas/adicionar', disciplinas)
        .then(response => {
          setAlertMessage(response.data.message);
          setTimeout(() => {
            setAlertMessage('');
            navigate('/disciplinas');
          }, 1500);
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  return (
    <Card className="mx-auto mt-4" style={{ maxWidth: '800px' }}>
      <Card.Header className=''>
        <Link to="/disciplinas" style={{ position: 'absolute', marginTop: '5px', color: 'black' }}>
          <span className="material-icons">arrow_back</span>
        </Link>
        <div className="text-center">
          <h4>{isEditing ? 'Editar' : 'Adicionar'} Disciplina</h4>
        </div>
      </Card.Header>
      <Card.Body>
        {alertMessage && (
          <div className="alert alert-success">{alertMessage}</div>
        )}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="nome">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              name="nome"
              value={disciplinas.nome}
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

export default FormularioDisciplina;
