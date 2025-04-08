const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3000;
const { MercadoPagoConfig, Payment } = require('mercadopago');

// Configurações básicas
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Configuração do Mercado Pago
const client = new MercadoPagoConfig({
  accessToken: 'APP_USR-1489103879124630-031514-31c4530b8a5b69378bd8cf576c962599-312041186',
  options: { timeout: 5000 }
});

const paymentMP = new Payment(client);

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
        pix_qr_code TEXT,
        pix_ticket_url TEXT,
        data_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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

// PAGAMENTO PIX

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

// Rota para pagamento PIX
app.post("/api/payments/pix", async (req, res) => {
  try {
    const { email, amount, description } = req.body;

    // Validação dos dados
    if (!email || !amount || !description) {
      return res.status(400).json({ 
        success: false,
        error: 'Dados incompletos',
        message: 'Email, amount e description são obrigatórios'
      });
    }

    const paymentData = {
      transaction_amount: parseFloat(amount),
      description: description.substring(0, 100),
      payment_method_id: 'pix',
      payer: {
        email: email,
        first_name: 'Cliente',
        last_name: 'Loja VIP'
      }
    };

    // Configura timeout de 10 segundos
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error('Timeout na comunicação com o Mercado Pago'));
      }, 10000);
    });

    // Processa o pagamento
    const paymentPromise = paymentMP.create({ body: paymentData });
    const response = await Promise.race([paymentPromise, timeoutPromise]);

    if (!response?.point_of_interaction?.transaction_data) {
      throw new Error('Resposta inválida do Mercado Pago');
    }

    // Formata a resposta de sucesso
    const pixData = {
      qr_code: response.point_of_interaction.transaction_data.qr_code,
      qr_code_base64: response.point_of_interaction.transaction_data.qr_code_base64,
      ticket_url: response.point_of_interaction.transaction_data.ticket_url
    };

    // Registrar o pedido no banco de dados
    db.run(`
      INSERT INTO pedidos (
        valor_total,
        status,
        metodo_pagamento,
        pix_qr_code,
        pix_ticket_url
      ) VALUES (?, ?, ?, ?, ?)
    `, [
      amount,
      'pendente',
      'pix',
      pixData.qr_code_base64,
      pixData.ticket_url
    ], function(err) {
      if (err) {
        console.error("Erro ao registrar pedido:", err.message);
      }
    });

    res.json({
      success: true,
      payment_id: response.id,
      status: response.status,
      ...pixData
    });

  } catch (error) {
    console.error('Erro no processamento PIX:', {
      error: error.message,
      stack: error.stack,
      request: req.body
    });

    res.status(500).json({
      success: false,
      error: 'Erro ao processar pagamento PIX',
      message: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
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

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});