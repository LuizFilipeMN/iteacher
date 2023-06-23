# Projeto de CRUD de um sistema de gerenciamento de disciplinas e professores.

Este é um projeto de CRUD de gerenciamento de disciplinas e professores desenvolvido em React, utilizando Express como servidor backend e MySQL como banco de dados.

# Alunos

- Guilherme Henrique Luiz Soares Pereira
- Lucas Emmanuel Estevão da Paixão
- Luiz Filipe Marques Nascimento
- Tulio Barros

## Pré-requisitos

Antes de começar, verifique se o seguinte software está instalado em sua máquina:

- Node.js (versão 12 ou superior)
- MySQL Server

## Configuração do Banco de Dados

1. Execute a seguinte query no seu servidor MySQL para criar o banco de dados e as tabelas necessárias:

```sql
USE iteacher_bd;
-- Tabela professores
CREATE TABLE professores (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(100),
  especialidade VARCHAR(100)
);

-- Tabela disciplinas
CREATE TABLE disciplinas (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(100),
  periodo VARCHAR(50),
  carga_horaria INT,
  professor_id INT,
  professor_nome VARCHAR(50),
  FOREIGN KEY (professor_id) REFERENCES professores(id) ON DELETE SET NULL
);

-- Tabela horarios
CREATE TABLE horarios (
  id INT PRIMARY KEY AUTO_INCREMENT,
  dia VARCHAR(20),
  turno VARCHAR(20),
  hora TIME
);

-- Tabela alocacoes
CREATE TABLE alocacoes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  disciplina_id INT,
  horario_id INT,
  FOREIGN KEY (disciplina_id) REFERENCES disciplinas(id),
  FOREIGN KEY (horario_id) REFERENCES horarios(id)
);

-- Tabela engenharia_computacao
CREATE TABLE engenharia_computacao (
  id INT PRIMARY KEY AUTO_INCREMENT,
  disciplina_id INT,
  FOREIGN KEY (disciplina_id) REFERENCES disciplinas(id)
);

-- Tabela sistemas_informacao
CREATE TABLE sistemas_informacao (
  id INT PRIMARY KEY AUTO_INCREMENT,
  disciplina_id INT,
  FOREIGN KEY (disciplina_id) REFERENCES disciplinas(id)
);

-- Tabela paralelas
CREATE TABLE paralelas (
  id INT PRIMARY KEY AUTO_INCREMENT,
  disciplina1_id INT,
  disciplina2_id INT,
  FOREIGN KEY (disciplina1_id) REFERENCES disciplinas(id),
  FOREIGN KEY (disciplina2_id) REFERENCES disciplinas(id)
);

-- Tabela horarios_alocados
CREATE TABLE horarios_alocados (
  id INT PRIMARY KEY AUTO_INCREMENT,
  disciplina_id INT,
  horario_id INT,
  professor_id INT,
  FOREIGN KEY (disciplina_id) REFERENCES disciplinas(id),
  FOREIGN KEY (horario_id) REFERENCES horarios(id),
  FOREIGN KEY (professor_id) REFERENCES professores(id)
);

-- Tabela horarios_indisponiveis
CREATE TABLE horarios_indisponiveis (
  id INT PRIMARY KEY AUTO_INCREMENT,
  professor_id INT,
  horario_id INT,
  FOREIGN KEY (professor_id) REFERENCES professores(id),
  FOREIGN KEY (horario_id) REFERENCES horarios(id)
);

-- Tabela horarios_disponiveis
CREATE TABLE horarios_disponiveis (
  id INT PRIMARY KEY AUTO_INCREMENT,
  professor_id INT,
  horario_id INT,
  FOREIGN KEY (professor_id) REFERENCES professores(id),
  FOREIGN KEY (horario_id) REFERENCES horarios(id)
);
```
2. Certifique-se de ter as informações de conexão corretas do seu banco de dados MySQL (host, porta, nome de usuário e senha) para configurar a conexão com o servidor.

# Instalação

1. Clone o repositório do projeto:

    - git clone https://github.com/LuizFilipeMN/iteacher.git
2. Acesse a pasta do projeto:

    - cd iteacher-app

3. Instale as dependências:

    - npm install

# Execução

1. Inicie o servidor backend:

    - cd src/server
    - node server.js

2. Em outro terminal, inicie o aplicativo React:

    - npm start

3. O aplicativo estará disponível em http://localhost:3000 e o servidor backend estará em http://localhost:5000.

# 
