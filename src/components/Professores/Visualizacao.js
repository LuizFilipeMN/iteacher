import React, { useEffect, useState } from 'react';
import { Card, Table } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import api from '../../service/api';

const VisualizacaoProfessor = () => {
  const { id } = useParams();
  const [professor, setProfessor] = useState(null);

  useEffect(() => {
    api.get(`professores/visualizar/${id}`)
      .then(response => {
        setProfessor(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [id]);

  if (!professor) {
    return (
      <div className="text-center">Carregando...</div>
    );
  }

  return (
    <Card className="mx-auto mt-4" style={{ maxWidth: '800px' }}>
      <Card.Header className="">
        <Link to="/professores" style={{ position: 'absolute', marginTop: '5px', color: 'black' }}>
          <span className="material-icons">arrow_back</span>
        </Link>
        <div className="text-center">
          <h4>Detalhes</h4>
        </div>
      </Card.Header>
      <Card.Body>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Especialidade</th>
            </tr>
          </thead>
          <tbody>
            <tr key={professor.id}>
              <td>{professor.nome}</td>
              <td>{professor.especialidade}</td>
            </tr>
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default VisualizacaoProfessor;