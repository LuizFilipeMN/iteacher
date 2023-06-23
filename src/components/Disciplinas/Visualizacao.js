import React, { useEffect, useState } from 'react';
import { Card, Table } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import api from '../../service/api';

const VisualizacaoDisciplina = () => {
  const { id } = useParams();
  const [disciplina, setDisciplina] = useState(null);

  useEffect(() => {
    api.get(`disciplinas/visualizar/${id}`)
      .then(response => {
        setDisciplina(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [id]);

  return (
    <Card className="mx-auto mt-4" style={{ maxWidth: '800px' }}>
      <Card.Header className=''>
        <Link to="/disciplinas" style={{ position: 'absolute', marginTop: '5px', color: 'black' }}>
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
            </tr>
          </thead>
          <tbody>
            <tr key={disciplina?.id}>
              <td>{disciplina?.nome}</td>
            </tr>
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default VisualizacaoDisciplina;
