import React, { useEffect, useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import api from '../../service/api';
import { Link, useNavigate, useParams } from 'react-router-dom';

const FormularioDisciplina = (props) => {
  const navigate = useNavigate();
  let { id } = useParams();

  const [professores, setProfessores] = useState([]);
  const [disciplinas, setFormValues] = useState({
    nome: '',
    periodo: '',
    carga_horaria: '',
    professor_id: '',
    professor_nome: ''
  });
  const [alertMessage, setAlertMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (props.action === 'adicionar') {
      api.get('disciplinas/adicionar')
          .then(response => {
              const { professores } = response.data;
              setProfessores(professores);
          })
          .catch(error => {
              console.log(error);
          });
  } else if (props.action === 'editar') {
      api.get(`disciplinas/editar/${id}`)
          .then(response => {
              const { bebida, professores } = response.data;
              setFormValues(bebida);
              setProfessores(professores);
          })
          .catch(error => {
              console.log(error);
          });
  }
}, [props.action, id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({
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
          <Form.Group controlId="professor_id">
            <Form.Label>Professores</Form.Label>
            <Form.Control
              as="select"
              name="professor_id"
              value={disciplinas.professor_id}
              onChange={handleInputChange}
            >
              <option value="">Selecione um professor</option>
              {professores.map((professor) => (
                <option key={professor.id} value={professor.id}>
                  {professor.nome}
                </option>
              ))}
            </Form.Control>
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
