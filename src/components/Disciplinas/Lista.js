import React, { useEffect, useState } from 'react';
import { Card, Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import api from '../../service/api';

function ListaDisciplinas() {
  const [disciplinas, setDisciplinas] = useState([]);
  const [alertMessageError, setAlertMessageError] = useState('');
  const [alertMessageSuccess, setAlertMessageSuccess] = useState('');

  useEffect(() => {
    api.get('disciplinas/listar')
      .then(response => {
        setDisciplinas(response.data)
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleDelete = id => {
    api.delete('disciplinas/' + id)
      .then(response => {
        const { status, message } = response.data;
        if (status === 'error') {
          setAlertMessageError(message);
          setTimeout(() => {
            setAlertMessageError('');
          }, 1500);
        } else {
          // Remove a disciplina excluída do estado disciplinas
          setDisciplinas(prevDisciplinas => prevDisciplinas.filter(disciplina => disciplina.id !== id));
          setAlertMessageSuccess(message);
          setTimeout(() => {
            setAlertMessageSuccess('');
          }, 1500);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <Card className="mx-auto mt-4" style={{ maxWidth: '800px' }}>
      <Card.Header className="text-center">
        <h4>Lista de Disciplinas</h4>
      </Card.Header>
      <Card.Body>
        {alertMessageError && (
          <div className="alert alert-danger">{alertMessageError}</div>
        )}
        {alertMessageSuccess && (
          <div className="alert alert-success">{alertMessageSuccess}</div>
        )}
        <div className="text-right mb-3">
          <Link to="/disciplinas/adicionar" className="btn btn-warning" size="lg">
            <div className="d-flex align-items-center">
              <span className="material-icons fs-4">add</span>
              Cadastrar disciplina
            </div>
          </Link>
        </div>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Período</th>
              <th>Carga horária</th>
              <th>Professor</th>
              <th style={{ width: '130px', minWidth: '130px', textAlign: 'center' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {disciplinas.map(disciplina => (
              <tr key={disciplina.id}>
                <td>{disciplina.nome}</td>
                <td>{disciplina.periodo}</td>
                <td>{disciplina.carga_horaria}</td>
                <td>{disciplina.professor}</td>
                <td className="d-flex justify-content-around">
                  <Link
                    className="btn btn-primary"
                    to={`/disciplinas/visualizar/${disciplina.id}`}
                    variant="primary"
                    style={{ width: '30px', height: '30px' }}
                  >
                    <div className="d-flex justify-content-center">
                      <span className="material-icons fs-5 text-dark">search</span>
                    </div>
                  </Link>
                  <Link
                    className="btn btn-warning"
                    to={`/disciplinas/editar/${disciplina.id}`}
                    style={{ width: '30px', height: '30px' }}
                    variant="warning"
                  >
                    <div className="d-flex justify-content-center">
                      <span className="material-icons fs-5">edit</span>
                    </div>
                  </Link>
                  <Button
                    variant="danger"
                    style={{ width: '30px', height: '30px' }}
                    onClick={() => handleDelete(disciplina.id)}
                  >
                    <div className="d-flex justify-content-center">
                      <span className="material-icons fs-5 text-dark">clear</span>
                    </div>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}

export default ListaDisciplinas;
