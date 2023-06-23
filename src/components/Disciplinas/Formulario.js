import React, { useEffect, useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import api from '../../service/api';
import { Link, useNavigate, useParams } from 'react-router-dom';

const FormularioDisciplina = (props) => {
  const navigate = useNavigate();
  let { id } = useParams();

  const [professores, setProfessores] = useState([]);
  const [disciplina, setFormValues] = useState({
    nome: '',
    periodo: '',
    carga_horaria: '',
    professor_id: '',
  });
  const [alertMessageSuccess, setAlertMessageSuccess] = useState('');
  const [alertMessageError, setAlertMessageError] = useState('');

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
          const { disciplina, professores } = response.data;
          setFormValues({
            ...disciplina,
            professor_nome: professores.find(p => p.id == disciplina.professor_id)?.nome || ''
          });
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
    let url = '/disciplinas/';
    if (props.action === 'editar') {
      api.put(url + 'editar/' + id, {
        ...disciplina,
        professor_nome: professores.find(p => p.id == disciplina.professor_id)?.nome || ''
      })
      // console.log(professor_nome)
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
              navigate('/disciplinas');
            }, 1500);
          }
        })
        .catch(error => {
          console.log(error)
        });
    } else {
      api.post(url + 'adicionar', {
        ...disciplina,
        professor_nome: professores.find(p => p.id == disciplina.professor_id)?.nome || ''
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
              navigate('/disciplinas');
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
        <Link to="/disciplinas" style={{ position: 'absolute', marginTop: '5px', color: 'black' }}>
          <span className="material-icons">arrow_back</span>
        </Link>
        <div className="text-center">
          <h4>{props.action === 'editar' ? 'Editar' : 'Adicionar'} disciplina</h4>
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
              value={disciplina.nome}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="periodo">
            <Form.Label>Período</Form.Label>
            <Form.Control
              type="text"
              name="periodo"
              value={disciplina.periodo}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="carga_horaria">
            <Form.Label>Carga Horária</Form.Label>
            <Form.Control
              type="text"
              name="carga_horaria"
              value={disciplina.carga_horaria}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="professor_id">
            <Form.Label>Professor</Form.Label>
            <Form.Control
              as="select"
              name="professor_id"
              value={disciplina.professor_id}
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
