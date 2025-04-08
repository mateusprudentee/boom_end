const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

// Configurar middleware
app.use(cors());
app.use(bodyParser.json());

// Configuração do banco de dados (SQLite)
const db = new sqlite3.Database("./database.db", (err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados SQLite:", err.message);
  } else {
    console.log("Conectado ao banco de dados SQLite");
  }
});

// Criar a tabela 'projects' se não existir
db.run(
  `
 CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    has_plan INTEGER DEFAULT 0,
    has_5w2h INTEGER DEFAULT 0,
    has_conference INTEGER DEFAULT 0,
    has_finance INTEGER DEFAULT 0,
    router TEXT,
    status TEXT DEFAULT 'new',
    idNome TEXT,
    idObjetivo TEXT,
    idCampoAplicacao TEXT,
    idDiretrizes TEXT,
  )
`,
  (err) => {
    if (err) {
      console.error("Erro ao criar a tabela de projetos:", err.message);
    } else {
      console.log("Tabela de projetos criada ou já existente.");
    }
  }
);

// Criar a tabela 'users' se não existir
db.run(
  `
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    username TEXT NOT NULL,
    lastPage TEXT,
    totalLoginTime INTEGER DEFAULT 0,
    registrationDate DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`,
  (err) => {
    if (err) {
      console.error("Erro ao criar a tabela de usuários:", err.message);
    } else {
      console.log("Tabela de usuários criada ou já existente.");
    }
  }
);

db.run(
  `
  CREATE TABLE IF NOT EXISTS planoProjeto (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    idNome TEXT NOT NULL,
    idObjetivo TEXT NOT NULL,
    idCampoAplicacao TEXT NOT NULL,
    idDiretrizes TEXT NOT NULL,
    creationDate DATETIME DEFAULT CURRENT_TIMESTAMP
  )
  `,
  (err) => {
    if (err) {
      console.error("Erro ao criar a tabela planoProjeto:", err.message);
    } else {
      console.log("Tabela planoProjeto criada ou já existente.");
    }
  }
);


// Adicionar coluna 'planFile' se não existir
db.serialize(() => {
  db.run(`PRAGMA foreign_keys=off;`, (err) => {
    if (err) {
      console.error("Erro ao desabilitar chaves estrangeiras:", err.message);
    }
  });

  db.run(`ALTER TABLE projects ADD COLUMN planFile TEXT;`, (err) => {
    if (err) {
      console.error("Erro ao adicionar a coluna 'planFile':", err.message);
    } else {
      console.log("Coluna 'planFile' adicionada com sucesso.");
    }
  });

  db.run(`PRAGMA foreign_keys=on;`, (err) => {
    if (err) {
      console.error("Erro ao habilitar chaves estrangeiras:", err.message);
    }
  });
});

// Inicializar valores para colunas recém-adicionadas na tabela 'users'
db.run(`UPDATE users SET lastPage = 'Página Inicial' WHERE lastPage IS NULL`, (err) => {
  if (err) {
    console.error("Erro ao inicializar lastPage:", err.message);
  }
});

db.run(`UPDATE users SET totalLoginTime = 0 WHERE totalLoginTime IS NULL`, (err) => {
  if (err) {
    console.error("Erro ao inicializar totalLoginTime:", err.message);
  }
});

db.run(`UPDATE users SET registrationDate = CURRENT_TIMESTAMP WHERE registrationDate IS NULL`, (err) => {
  if (err) {
    console.error("Erro ao inicializar registrationDate:", err.message);
  }
});

// Rotas da aplicação (projetos, usuários e atividades)

app.get("/projects", (req, res) => {
  const sql = "SELECT * FROM projects";
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error("Erro ao buscar projetos:", err.message);
      res.status(500).send("Erro ao buscar projetos.");
    } else {
      res.json(rows);
    }
  });
});

app.post("/projects", (req, res) => {
  const { name, has_plan, has_5w2h, has_conference, has_finance, router, planFile, created_by } = req.body;

  if (!name || !router || !created_by) {
    return res.status(400).json({ error: 'Campos "name", "router" e "created_by" são obrigatórios.' });
  }

  const sql = `INSERT INTO projects (name, has_plan, has_5w2h, has_conference, has_finance, router, planFile, created_by)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  db.run(
    sql,
    [name, has_plan, has_5w2h, has_conference, has_finance, router, planFile, created_by],
    function (err) {
      if (err) {
        console.error("Erro ao adicionar projeto:", err.message);
        res.status(500).send("Erro ao adicionar projeto.");
      } else {
        res.status(201).json({ message: "Projeto adicionado com sucesso!", id: this.lastID });
      }
    }
  );
});

app.put("/projects/:id", (req, res) => {
  const { id } = req.params;
  const { name, has_plan, has_5w2h, has_conference, has_finance, router, status, planFile } = req.body;

  const sql = `
    UPDATE projects 
    SET name = ?, has_plan = ?, has_5w2h = ?, has_conference = ?, has_finance = ?, router = ?, status = ?, planFile = ?
    WHERE id = ?
  `;

  db.run(
    sql,
    [name, has_plan, has_5w2h, has_conference, has_finance, router, status, planFile, id],
    function (err) {
      if (err) {
        console.error("Erro ao atualizar projeto:", err.message);
        res.status(500).send("Erro ao atualizar projeto.");
      } else {
        res.json({ message: "Projeto atualizado com sucesso!" });
      }
    }
  );
});

app.delete("/projects/:id", (req, res) => {
  const { id } = req.params;

  const sql = `DELETE FROM projects WHERE id = ?`;

  db.run(sql, [id], function (err) {
    if (err) {
      console.error("Erro ao deletar projeto:", err.message);
      res.status(500).send("Erro ao deletar projeto.");
    } else {
      res.json({ message: "Projeto excluído com sucesso!" });
    }
  });
});

// Outras rotas para usuários e login permanecem inalteradas...

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
