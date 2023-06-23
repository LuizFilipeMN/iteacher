const express = require('express');
const db = require('./db');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

db.connect(function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Banco de dados conectado!");
    }
});

// LISTAR PROFESSOR
app.get("/api/professores/listar", (req, res) => {
    const {
        busca
    } = req.query;

    if (busca || busca != null) {
        const query = "SELECT * FROM professores WHERE nome LIKE ?";
        const search = `%${busca}%`;

        db.query(query, [search], (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send("Erro ao buscar professores");
            } else {
                res.send(result);
            }
        });
    } else {
        db.query("SELECT * FROM professores", (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send("Erro ao listar professores");
            } else {
                res.send(result);
            }
        });
    }
});

//ADICIONAR PROFESSOR
app.post('/api/professores/adicionar', (req, res) => {
    const { professor } = req.body;
    const { nome, especialidade } = professor;

    const query = "INSERT INTO professores (nome, especialidade) VALUES (?, ?)";
    db.query(query, [nome, especialidade], (err, result) => {
        if (err) {
            console.log(err);
            res.json({
                status: "error",
                message: "Não foi possível cadastrar o professor!"
            });
        } else {
            res.json({
                status: "success",
                message: "Professor adicionado com sucesso!"
            });
        }
    });
});

//EDITAR PROFESSOR
app.get('/api/professores/editar/:id', (req, res) => {
    const {
        id
    } = req.params;

    const query = "SELECT * FROM professores WHERE id = ?";
    db.query(query, [id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Erro ao buscar professor");
        } else {
            res.json(result[0]);
        }
    });
});

app.put('/api/professores/editar/:id', (req, res) => {
    const {
        id
    } = req.params;
    const {
        nome,
        especialidade
    } = req.body;

    const query = "UPDATE professores SET nome = ?, especialidade = ? WHERE id = ?";
    db.query(query, [nome, especialidade, id], (err, result) => {
        if (err) {
            console.log(err);
            res.json({
                status: "error",
                message: "Não foi possível editar o professor!"
            });
        } else {
            res.json({
                status: "success",
                message: "Professor editado com sucesso!"
            });
        }
    });
});

// VISUALIZAR PROFESSOR
app.get('/api/professores/visualizar/:id', (req, res) => {
    const {
        id
    } = req.params;

    const query = "SELECT * FROM professores WHERE id = ?";
    db.query(query, [id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Erro ao visualizar professor");
        } else {
            if (result.length === 0) {
                res.status(404).send("Professor não encontrado");
            } else {
                res.send(result[0]);
            }
        }
    });
});

// DELETAR PROFESSOR
app.delete('/api/professores/:id', (req, res) => {
    const {
        id
    } = req.params;
    const queryDelete = "DELETE FROM professores WHERE id = ?";
    const querySelectAll = "SELECT * FROM professores";

    db.query(queryDelete, [id], (err, result) => {
        if (err) {
            console.log(err);
            res.json({
                status: "error",
                message: "Não foi possível excluir o professor!"
            });
        } else {
            db.query(querySelectAll, (err, result) => {
                if (err) {
                    console.log(err);
                    res.json({
                        status: "error",
                        message: "Não foi possível excluir o professor!"
                    });
                } else {
                    res.json({
                        status: "success",
                        message: "Professor excluído com sucesso!",
                        data: result
                    });
                }
            });
        }
    });
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// LISTAR DISCIPLINAS
app.get("/api/disciplinas/listar", (req, res) => {
    db.query("SELECT * FROM disciplinas", (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Erro ao listar disciplinas");
        } else {
            res.send(result);
        }
    });
});

// ADICIONAR DISCIPLINA

app.get('/api/disciplinas/adicionar/', (req, res) => {
    Promise.all([
            new Promise((resolve, reject) => {
                db.query("SELECT * FROM professores", (err, result) => {
                    if (err) {
                        console.log(err);
                        reject("Erro ao listar professores");
                    } else {
                        resolve(result);
                    }
                });
            }),
        ])
        .then(([professores]) => {
            res.json({
                professores
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).send("Erro ao obter os dados");
        });
});

app.post('/api/disciplinas/adicionar', (req, res) => {
    const {
        nome,
        periodo,
        carga_horaria,
        professor_id,
        professor_nome
    } = req.body;

    const query = "INSERT INTO disciplinas (nome, periodo, carga_horaria, professor_id, professor_nome) VALUES (?, ?, ?, ?, ?)";
    db.query(query, [nome, periodo, carga_horaria, professor_id, professor_nome], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Erro ao adicionar disciplina");
        } else {
            res.json({
                status: "success",
                message: "Disciplina adicionada com sucesso"
            });
        }
    });
});

// EDITAR DISCIPLINA

app.get('/api/disciplinas/editar/:id', (req, res) => {
    Promise.all([
            new Promise((resolve, reject) => {
                db.query("SELECT * FROM professores", (err, result) => {
                    if (err) {
                        console.log(err);
                        reject("Erro ao listar professores");
                    } else {
                        resolve(result);
                    }
                });
            }),
            new Promise((resolve, reject) => {
                const {
                    id
                } = req.params;
                console.log(id)
                const query = "SELECT * FROM disciplinas WHERE id = ?";
                db.query(query, [id], (err, result) => {
                    if (err) {
                        console.log(err);
                        reject("Erro ao buscar bebida");
                    } else {
                        resolve(result[0]);
                    }
                });
            })
        ])
        .then(([professores, disciplina]) => {
            res.json({
                professores,
                disciplina
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).send("Erro ao obter os dados");
        });
});

app.put('/api/disciplinas/editar/:id', (req, res) => {
    const {
        id
    } = req.params;
    const {
        nome,
        periodo,
        carga_horaria,
        professor_id
    } = req.body;
    const query = "UPDATE disciplinas SET nome = ?, periodo = ?, carga_horaria = ?, professor_id = ? WHERE id = ?";
    db.query(query, [nome, periodo, carga_horaria, professor_id, id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Erro ao editar disciplina");
        } else {
            res.json({
                status: "success",
                message: "Disciplina editada com sucesso"
            });
        }
    });
});

// VISUALIZAR disciplina
app.get('/api/disciplinas/visualizar/:id', (req, res) => {
    const {
        id
    } = req.params;
    const query = "SELECT * FROM disciplinas WHERE id = ?";
    db.query(query, [id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Erro ao visualizar disciplina");
        } else {
            if (result.length === 0) {
                res.status(404).send("DISCIPLINA não encontrada");
            } else {
                res.send(result[0]);
            }
        }
    });
});

// DELETAR DISCIPLINA
app.delete('/api/disciplinas/:id', (req, res) => {
    const {
        id
    } = req.params;
    const queryDelete = "DELETE FROM disciplinas WHERE id = ?";
    const querySelectAll = "SELECT * FROM disciplinas";

    db.query(queryDelete, [id], (err, result) => {
        if (err) {
            console.log(err);
            res.json({
                status: "error",
                message: "Não foi possível excluir a disciplinas!"
            });
        } else {
            db.query(querySelectAll, (err, result) => {
                if (err) {
                    console.log(err);
                    res.json({
                        status: "error",
                        message: "Não foi possível excluir a disciplinas!"
                    });
                } else {
                    res.json({
                        status: "success",
                        message: "Disciplina excluída com sucesso!",
                        data: result
                    });
                }
            });
        }
    });
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


app.listen(PORT, () => {
    console.log(`Servidor Express iniciado na porta ${PORT}`);
});