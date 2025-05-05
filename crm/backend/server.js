const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3000;

// Configurações básicas
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Conexão com o banco de dados
const db = new sqlite3.Database("./loja_vip.db", (err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err.message);
  } else {
    console.log("Conectado ao banco de dados SQLite");
    initializeDatabase();
  }
});

// Inicializar o banco de dados
function initializeDatabase() {
  db.serialize(() => {
    // Tabela de produtos
    db.run(`
      CREATE TABLE IF NOT EXISTS produtos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        quantidade INTEGER DEFAULT 0,
        valorAtual REAL NOT NULL,
        ultimoValor REAL,
        descricao TEXT,
        descontoAtual REAL DEFAULT 0,
        ultimoDesconto REAL,
        cupomAtivo BOOLEAN DEFAULT FALSE,
        imagem TEXT,
        data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Tabela de carrinho
    db.run(`
      CREATE TABLE IF NOT EXISTS carrinho (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        produto_id INTEGER NOT NULL,
        quantidade INTEGER DEFAULT 1,
        tipo TEXT CHECK(tipo IN ('compra', 'presente')) DEFAULT 'compra',
        data_adicao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (produto_id) REFERENCES produtos(id)
      )
    `);

    // Tabela de pedidos
    db.run(`
      CREATE TABLE IF NOT EXISTS pedidos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        valor_total REAL NOT NULL,
        status TEXT DEFAULT 'pendente',
        metodo_pagamento TEXT,
        data_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Tabela de categorias do fórum
    db.run(`
      CREATE TABLE IF NOT EXISTS forum_categorias (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        descricao TEXT,
        url TEXT UNIQUE NOT NULL,
        threads INTEGER DEFAULT 0,
        posts INTEGER DEFAULT 0,
        data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Tabela de tópicos do fórum
    db.run(`
      CREATE TABLE IF NOT EXISTS forum_topicos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        categoria_id INTEGER NOT NULL,
        titulo TEXT NOT NULL,
        conteudo TEXT NOT NULL,
        autor_id INTEGER NOT NULL,
        autor_nome TEXT NOT NULL,
        respostas INTEGER DEFAULT 0,
        visualizacoes INTEGER DEFAULT 0,
        fixado BOOLEAN DEFAULT FALSE,
        fechado BOOLEAN DEFAULT FALSE,
        data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        ultima_resposta TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (categoria_id) REFERENCES forum_categorias(id)
      )
    `);

    // Tabela de postagens/respostas
    db.run(`
      CREATE TABLE IF NOT EXISTS forum_postagens (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        topico_id INTEGER NOT NULL,
        autor_id INTEGER NOT NULL,
        autor_nome TEXT NOT NULL,
        conteudo TEXT NOT NULL,
        data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (topico_id) REFERENCES forum_topicos(id)
      )
    `);

    // Tabela de visualizações
    db.run(`
      CREATE TABLE IF NOT EXISTS forum_visualizacoes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        topico_id INTEGER NOT NULL,
        usuario_id INTEGER,
        data_visualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (topico_id) REFERENCES forum_topicos(id)
      )
    `);

    // Verificar e popular produtos iniciais
    db.get("SELECT COUNT(*) as count FROM produtos", (err, row) => {
      if (err) {
        console.error("Erro ao verificar produtos:", err.message);
        return;
      }

      if (row.count === 0) {
        const produtosIniciais = [
          {
            nome: "Ruby",
            quantidade: 100,
            valorAtual: 49.99,
            ultimoValor: 54.99,
            descricao: "Pacote Ruby VIP com benefícios exclusivos",
            descontoAtual: 30,
            ultimoDesconto: 20,
            cupomAtivo: true,
            imagem: "https://i.imgur.com/ube1Lze.png"
          },
          {
            nome: "Safira",
            quantidade: 75,
            valorAtual: 39.99,
            ultimoValor: 44.99,
            descricao: "Pacote Safira VIP com benefícios intermediários",
            descontoAtual: 25,
            ultimoDesconto: 15,
            cupomAtivo: false,
            imagem: "https://i.imgur.com/ube1Lze.png"
          },
          {
            nome: "Boom",
            quantidade: 50,
            valorAtual: 29.99,
            ultimoValor: 34.99,
            descricao: "Pacote Boom VIP com benefícios básicos",
            descontoAtual: 40,
            ultimoDesconto: 30,
            cupomAtivo: true,
            imagem: "https://i.imgur.com/ube1Lze.png"
          }
        ];

        const stmt = db.prepare(`
          INSERT INTO produtos (
            nome, quantidade, valorAtual, ultimoValor, descricao, 
            descontoAtual, ultimoDesconto, cupomAtivo, imagem
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);

        produtosIniciais.forEach(produto => {
          stmt.run(
            produto.nome,
            produto.quantidade,
            produto.valorAtual,
            produto.ultimoValor,
            produto.descricao,
            produto.descontoAtual,
            produto.ultimoDesconto,
            produto.cupomAtivo ? 1 : 0,
            produto.imagem
          );
        });

        stmt.finalize(err => {
          if (err) {
            console.error("Erro ao inserir produtos iniciais:", err.message);
          } else {
            console.log("Produtos iniciais inseridos com sucesso");
          }
        });
      }
    });

    // Popular categorias iniciais do fórum
    db.get("SELECT COUNT(*) as count FROM forum_categorias", (err, row) => {
      if (err) {
        console.error("Erro ao verificar categorias:", err.message);
        return;
      }

      if (row.count === 0) {
        const categoriasIniciais = [
          {
            nome: "Anúncios e Novidades",
            descricao: "Notícias e atualizações do servidor",
            url: "anuncios-e-novidades",
            threads: 24,
            posts: 156
          },
          {
            nome: "Suporte",
            descricao: "Problemas e dúvidas técnicas",
            url: "suporte",
            threads: 42,
            posts: 287
          },
          {
            nome: "Eventos",
            descricao: "Eventos e competições",
            url: "eventos",
            threads: 15,
            posts: 203
          }
        ];

        const stmt = db.prepare(`
          INSERT INTO forum_categorias (
            nome, descricao, url, threads, posts
          ) VALUES (?, ?, ?, ?, ?)
        `);

        categoriasIniciais.forEach(categoria => {
          stmt.run(
            categoria.nome,
            categoria.descricao,
            categoria.url,
            categoria.threads,
            categoria.posts
          );
        });

        stmt.finalize(err => {
          if (err) {
            console.error("Erro ao inserir categorias iniciais:", err.message);
          } else {
            console.log("Categorias iniciais do fórum inseridas com sucesso");
          }
        });
      }
    });
  });
}

// Rotas da API

// PRODUTOS

// Listar todos os produtos
app.get("/produtos", (req, res) => {
  const { limit } = req.query;
  let query = "SELECT * FROM produtos";
  const params = [];

  if (limit) {
    query += " LIMIT ?";
    params.push(parseInt(limit));
  }

  db.all(query, params, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Obter um produto específico
app.get("/produtos/:id", (req, res) => {
  const id = req.params.id;
  db.get("SELECT * FROM produtos WHERE id = ?", [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: "Produto não encontrado" });
      return;
    }
    res.json(row);
  });
});

// Criar um novo produto
app.post("/produtos", (req, res) => {
  const { 
    nome, 
    quantidade, 
    valorAtual, 
    descricao, 
    descontoAtual, 
    cupomAtivo,
    imagem
  } = req.body;

  db.run(`
    INSERT INTO produtos (
      nome, quantidade, valorAtual, descricao, 
      descontoAtual, cupomAtivo, imagem
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
  `, [nome, quantidade, valorAtual, descricao, descontoAtual, cupomAtivo ? 1 : 0, imagem], 
  function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id: this.lastID, message: "Produto criado com sucesso" });
  });
});

// Atualizar um produto
app.put("/produtos/:id", (req, res) => {
  const id = req.params.id;
  const { 
    nome, 
    quantidade, 
    valorAtual, 
    descricao, 
    descontoAtual, 
    cupomAtivo,
    imagem
  } = req.body;

  db.get("SELECT valorAtual, descontoAtual FROM produtos WHERE id = ?", [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: "Produto não encontrado" });
      return;
    }

    db.run(`
      UPDATE produtos SET
        nome = ?,
        quantidade = ?,
        ultimoValor = ?,
        valorAtual = ?,
        descricao = ?,
        ultimoDesconto = ?,
        descontoAtual = ?,
        cupomAtivo = ?,
        imagem = ?
      WHERE id = ?
    `, [
      nome,
      quantidade,
      row.valorAtual,
      valorAtual,
      descricao,
      row.descontoAtual,
      descontoAtual,
      cupomAtivo ? 1 : 0,
      imagem,
      id
    ], function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ message: "Produto atualizado com sucesso" });
    });
  });
});

// Deletar um produto
app.delete("/produtos/:id", (req, res) => {
  const id = req.params.id;
  db.run("DELETE FROM produtos WHERE id = ?", [id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: "Produto não encontrado" });
      return;
    }
    res.json({ message: "Produto deletado com sucesso" });
  });
});

// Produtos com desconto
app.get("/produtos/descontos", (req, res) => {
  db.all("SELECT * FROM produtos WHERE descontoAtual > 0", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Produtos com cupom ativo
app.get("/produtos/cupons-ativos", (req, res) => {
  db.all("SELECT * FROM produtos WHERE cupomAtivo = 1", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// CARRINHO

// Adicionar ao carrinho
app.post("/carrinho", (req, res) => {
  const { productId, actionType } = req.body;
  
  db.get("SELECT id FROM produtos WHERE id = ?", [productId], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: "Produto não encontrado" });
      return;
    }
    
    const tipo = actionType === 'gift' ? 'presente' : 'compra';
    
    // Verificar se o item já está no carrinho
    db.get("SELECT id, quantidade FROM carrinho WHERE produto_id = ?", [productId], (err, item) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      
      if (item) {
        // Atualizar quantidade se já existir
        const novaQuantidade = item.quantidade + 1;
        db.run(
          "UPDATE carrinho SET quantidade = ? WHERE id = ?",
          [novaQuantidade, item.id],
          function(err) {
            if (err) {
              res.status(500).json({ error: err.message });
              return;
            }
            res.json({ 
              id: item.id, 
              message: "Quantidade atualizada no carrinho"
            });
          }
        );
      } else {
        // Adicionar novo item ao carrinho
        db.run(
          "INSERT INTO carrinho (produto_id, tipo) VALUES (?, ?)",
          [productId, tipo],
          function(err) {
            if (err) {
              res.status(500).json({ error: err.message });
              return;
            }
            res.json({ 
              id: this.lastID, 
              message: "Item adicionado ao carrinho com sucesso" 
            });
          }
        );
      }
    });
  });
});

// Obter itens do carrinho
app.get("/carrinho", (req, res) => {
  db.all(`
    SELECT 
      c.id as carrinho_id,
      c.quantidade,
      c.tipo,
      p.id as produto_id,
      p.nome,
      p.descricao,
      p.valorAtual as preco,
      p.imagem,
      p.descontoAtual as desconto
    FROM carrinho c
    JOIN produtos p ON c.produto_id = p.id
    ORDER BY c.data_adicao DESC
  `, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Remover item do carrinho
app.delete("/carrinho/:id", (req, res) => {
  const id = req.params.id;
  db.run("DELETE FROM carrinho WHERE id = ?", [id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: "Item não encontrado no carrinho" });
      return;
    }
    res.json({ message: "Item removido do carrinho com sucesso" });
  });
});

// Atualizar quantidade no carrinho
app.put("/carrinho/:id", (req, res) => {
  const id = req.params.id;
  const { quantidade } = req.body;
  
  if (!quantidade || quantidade < 1) {
    res.status(400).json({ error: "Quantidade inválida" });
    return;
  }
  
  db.run(
    "UPDATE carrinho SET quantidade = ? WHERE id = ?",
    [quantidade, id],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (this.changes === 0) {
        res.status(404).json({ error: "Item não encontrado no carrinho" });
        return;
      }
      res.json({ message: "Quantidade atualizada com sucesso" });
    }
  );
});

// Rota para calcular total do carrinho
app.get("/carrinho/total", (req, res) => {
  db.all(`
    SELECT 
      p.valorAtual as preco,
      p.descontoAtual as desconto,
      c.quantidade
    FROM carrinho c
    JOIN produtos p ON c.produto_id = p.id
  `, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    const total = rows.reduce((sum, item) => {
      const precoComDesconto = item.preco * (1 - (item.desconto || 0) / 100);
      return sum + (precoComDesconto * item.quantidade);
    }, 0);

    res.json({ total });
  });
});

// Rota para finalizar compra (limpar carrinho após pagamento)
app.post("/carrinho/finalizar", (req, res) => {
  db.run("DELETE FROM carrinho", function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: "Carrinho limpo com sucesso" });
  });
});

// FÓRUM - CATEGORIAS

// Listar todas as categorias
app.get("/forum/categorias", (req, res) => {
  db.all("SELECT * FROM forum_categorias ORDER BY nome", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Obter uma categoria específica por URL
app.get("/forum/categorias/:url", (req, res) => {
  const url = req.params.url;
  db.get("SELECT * FROM forum_categorias WHERE url = ?", [url], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: "Categoria não encontrada" });
      return;
    }
    res.json(row);
  });
});

// FÓRUM - TÓPICOS

// Listar tópicos de uma categoria
app.get("/forum/categorias/:url/topicos", (req, res) => {
  const url = req.params.url;
  const { limit } = req.query;
  
  let query = `
    SELECT t.* 
    FROM forum_topicos t
    JOIN forum_categorias c ON t.categoria_id = c.id
    WHERE c.url = ?
    ORDER BY t.fixado DESC, t.ultima_resposta DESC
  `;
  
  const params = [url];
  
  if (limit) {
    query += " LIMIT ?";
    params.push(parseInt(limit));
  }

  db.all(query, params, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Criar novo tópico
app.post("/forum/topicos", (req, res) => {
  const { categoria_id, titulo, conteudo, autor_id, autor_nome } = req.body;
  
  if (!categoria_id || !titulo || !conteudo || !autor_id || !autor_nome) {
    res.status(400).json({ error: "Dados incompletos" });
    return;
  }

  db.run(`
    INSERT INTO forum_topicos (
      categoria_id, titulo, conteudo, autor_id, autor_nome
    ) VALUES (?, ?, ?, ?, ?)
  `, [categoria_id, titulo, conteudo, autor_id, autor_nome], 
  function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    // Atualizar contador de threads na categoria
    db.run(
      "UPDATE forum_categorias SET threads = threads + 1 WHERE id = ?",
      [categoria_id]
    );
    
    res.json({ 
      id: this.lastID, 
      message: "Tópico criado com sucesso" 
    });
  });
});

// Obter um tópico específico
app.get("/forum/topicos/:id", (req, res) => {
  const id = req.params.id;
  
  // Registrar visualização
  db.run(
    "INSERT INTO forum_visualizacoes (topico_id) VALUES (?)",
    [id]
  );
  
  // Atualizar contador de visualizações
  db.run(
    "UPDATE forum_topicos SET visualizacoes = visualizacoes + 1 WHERE id = ?",
    [id]
  );
  
  // Obter dados do tópico
  db.get("SELECT * FROM forum_topicos WHERE id = ?", [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: "Tópico não encontrado" });
      return;
    }
    res.json(row);
  });
});

// FÓRUM - POSTAGENS

// Listar postagens de um tópico
app.get("/forum/topicos/:id/postagens", (req, res) => {
  const id = req.params.id;
  db.all(`
    SELECT * FROM forum_postagens 
    WHERE topico_id = ?
    ORDER BY data_criacao ASC
  `, [id], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Adicionar postagem a um tópico
app.post("/forum/topicos/:id/postagens", (req, res) => {
  const topico_id = req.params.id;
  const { autor_id, autor_nome, conteudo } = req.body;
  
  if (!autor_id || !autor_nome || !conteudo) {
    res.status(400).json({ error: "Dados incompletos" });
    return;
  }

  db.run(`
    INSERT INTO forum_postagens (
      topico_id, autor_id, autor_nome, conteudo
    ) VALUES (?, ?, ?, ?)
  `, [topico_id, autor_id, autor_nome, conteudo], 
  function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    // Atualizar contador de respostas e data da última resposta
    db.run(`
      UPDATE forum_topicos 
      SET 
        respostas = respostas + 1,
        ultima_resposta = CURRENT_TIMESTAMP
      WHERE id = ?
    `, [topico_id]);
    
    // Atualizar contador de posts na categoria
    db.run(`
      UPDATE forum_categorias c
      SET posts = posts + 1
      FROM forum_topicos t
      WHERE t.id = ? AND c.id = t.categoria_id
    `, [topico_id]);
    
    res.json({ 
      id: this.lastID, 
      message: "Postagem adicionada com sucesso" 
    });
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});