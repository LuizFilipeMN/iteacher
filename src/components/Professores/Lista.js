import React, { useEffect, useState } from 'react';
import { Card, Button, Table } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import api from '../../service/api';

function ListaProfessores() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const busca = params.get('busca');

  const [professores, setProfessores] = useState([]);
  const [alertMessageSuccess, setAlertMessageSuccess] = useState('');
  const [alertMessageError, setAlertMessageError] = useState('');

  useEffect(() => {
    api.get('professores/listar' + (busca ? `?busca=${busca}` : ''))
      .then(response => {
        setProfessores(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [busca]);

  const handleDelete = id => {
    api.delete('professores/' + id)
      .then(response => {
        const { status, message } = response.data;
        if (status === 'error') {
          setAlertMessageError(message);
          setTimeout(() => {
            setAlertMessageError('');
          }, 1500);
        } else {
          setProfessores(prevProfessores => prevProfessores.filter(professor => professor.id !== id));
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
        <h4>Lista de Professores</h4>
      </Card.Header>
      <Card.Body>
        {alertMessageSuccess && (
          <div className="alert alert-success">{alertMessageSuccess}</div>
        )}
        {alertMessageError && (
          <div className="alert alert-danger">{alertMessageError}</div>
        )}
        <div className="text-right mb-3">
          <Link to="/professores/adicionar" className="btn btn-warning" size="lg">
            <div className="d-flex align-items-center">
              <span className="material-icons fs-4">
                add
              </span>
              Cadastrar professor
            </div>
          </Link>
        </div>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Especialidade</th>
              <th style={{ width: "130px", minWidth: "130px", textAlign: "center" }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {professores.length > 0 ? (
              professores.map(professor => (
                <tr key={professor.id}>
                  <td>{professor.nome}</td>
                  <td>{professor.especialidade}</td>
                  <td className='d-flex justify-content-around'>
                    <Link
                      className="btn btn-primary"
                      to={'/professores/visualizar/' + professor.id}
                      variant="primary"
                      style={{ width: "30px", height: "30px" }}
                    >
                      <div className='d-flex justify-content-center'>
                        <span className='material-icons fs-5 text-dark'>
                          search
                        </span>
                      </div>
                    </Link>
                    <Link
                      className='btn btn-warning'
                      to={'/professores/editar/' + professor.id}
                      style={{ width: "30px", height: "30px" }}
                      variant="warning"
                    >
                      <div className='d-flex justify-content-center'>
                        <span className='material-icons fs-5'>
                          edit
                        </span>
                      </div>
                    </Link>
                    <Button
                      variant="danger"
                      style={{ width: "30px", height: "30px" }}
                      onClick={() => handleDelete(professor.id)}
                    >
                      <div className='d-flex justify-content-center'>
                        <span className='material-icons fs-5 text-dark'>
                          clear
                        </span>
                      </div>
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center">
                  Nenhum professor encontrado!
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}

export default ListaProfessores;