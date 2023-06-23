import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from "../Layout/index";

import ListarProfessores from '../views/Professores/Listar';
import AdicionarProfessor from '../views/Professores/Adicionar';
import EditarProfessor from '../views/Professores/Editar';
import VisualizarProfessor from '../views/Professores/Visualizar';

import ListarDisciplinas from '../views/Disciplinas/Listar';
import AdicionarDisciplina from '../views/Disciplinas/Adicionar';
import EditarDisciplina from '../views/Disciplinas/Editar';
import VisualizarDisciplina from '../views/Disciplinas/Visualizar';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />} >
        {/* Rotas BEBIDAS */}
        <Route index element={<ListarProfessores />} />
        <Route path="/professores" element={<ListarProfessores />} />
        <Route path="/professores/adicionar" element={<AdicionarProfessor />} />
        <Route path="/professores/editar/:id" element={<EditarProfessor />} />
        <Route path="/professores/visualizar/:id" element={<VisualizarProfessor />} />
        {/* Rotas disciplinas */}
        <Route path="/disciplinas" element={<ListarDisciplinas />} />
        <Route path="/disciplinas/adicionar" element={<AdicionarDisciplina />} />
        <Route path="/disciplinas/editar/:id" element={<EditarDisciplina />} />
        <Route path="/disciplinas/visualizar/:id" element={<VisualizarDisciplina />} />

      </Route>
    </Routes>
  );
};

export default Router;
