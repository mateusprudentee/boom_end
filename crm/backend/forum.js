// server.js
const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3001;

// Configurações básicas
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Conexão com o banco de dados
const db = new sqlite3.Database("./forum.db", (err) => {
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
    // Tabela de membros da equipe
    db.run(`
      CREATE TABLE IF NOT EXISTS team_members (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        role TEXT NOT NULL,
        avatar TEXT NOT NULL,
        data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Tabela de conteúdo dos tópicos
    db.run(`
      CREATE TABLE IF NOT EXISTS topic_content (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        topic_id INTEGER NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (topic_id) REFERENCES recent_topics(id) ON DELETE CASCADE
      )
    `);

    // Tabela de categorias do fórum
    db.run(`
      CREATE TABLE IF NOT EXISTS forum_categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        threads INTEGER DEFAULT 0,
        posts INTEGER DEFAULT 0,
        type TEXT CHECK(type IN ('main', 'team')) DEFAULT 'main',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Tabela de tópicos recentes
    db.run(`
      CREATE TABLE IF NOT EXISTS recent_topics (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        avatar TEXT NOT NULL,
        title TEXT NOT NULL,
        category TEXT NOT NULL,
        content TEXT NOT NULL,
        views INTEGER NOT NULL DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Tabela de respostas
    db.run(`
      CREATE TABLE IF NOT EXISTS topic_replies (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        topic_id INTEGER NOT NULL,
        author TEXT NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (topic_id) REFERENCES recent_topics(id) ON DELETE CASCADE
      )
    `);

    // Tabela de estatísticas
    db.run(`
      CREATE TABLE IF NOT EXISTS forum_stats (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        posts INTEGER DEFAULT 0,
        members INTEGER DEFAULT 0,
        guests INTEGER DEFAULT 0,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Inserir dados iniciais
    insertInitialData();
  });
}

// Inserir dados iniciais
function insertInitialData() {
  // Membros da equipe
  db.get("SELECT COUNT(*) as count FROM team_members", (err, row) => {
    if (err) return console.error("Erro ao verificar team_members:", err.message);
    
    if (row.count === 0) {
      const teamMembers = [
        { name: "Azalim", role: "Master", avatar: "https://cravatar.eu/helmavatar/Azalim/64" },
        { name: "Matcky", role: "Moderador", avatar: "https://cravatar.eu/helmavatar/Matcky/64" },
        { name: "Pedroo", role: "Ajudante", avatar: "https://cravatar.eu/helmavatar/Pedroo/64" }
      ];

      const stmt = db.prepare("INSERT INTO team_members (name, role, avatar) VALUES (?, ?, ?)");
      teamMembers.forEach(member => stmt.run(member.name, member.role, member.avatar));
      stmt.finalize();
    }
  });

  // Categorias do fórum
  db.get("SELECT COUNT(*) as count FROM forum_categories", (err, row) => {
    if (err) return console.error("Erro ao verificar forum_categories:", err.message);
    
    if (row.count === 0) {
      const forumCategories = [
        { name: "Anúncios e Novidades", description: "Notícias e atualizações do servidor", type: "main" },
        { name: "Suporte", description: "Problemas e dúvidas técnicas", type: "main" },
        { name: "Eventos", description: "Eventos e competições", type: "main" },
        { name: "Sugestões", description: "Ideias para melhorar o servidor", type: "main" },
        { name: "Off-topic", description: "Conversas fora do tema principal", type: "main" }
      ];
      
      const stmt = db.prepare("INSERT INTO forum_categories (name, description, type) VALUES (?, ?, ?)");
      forumCategories.forEach(category => stmt.run(category.name, category.description, category.type));
      stmt.finalize();
    }
  });

  // Tópicos recentes
  db.get("SELECT COUNT(*) as count FROM recent_topics", (err, row) => {
    if (err) return console.error("Erro ao verificar recent_topics:", err.message);
    
    if (row.count === 0) {
      const recentTopics = [
        { 
          avatar: "https://cravatar.eu/helmavatar/Azalim/64", 
          title: "Bem-vindo ao nosso fórum", 
          category: "Anúncios e Novidades",
          content: `
            <h4>Seja bem-vindo ao nosso fórum!</h4>
            <p>Estamos muito felizes em tê-lo conosco nesta nova comunidade. Aqui você pode:</p>
            <ul>
              <li>Discutir sobre o servidor</li>
              <li>Encontrar ajuda quando precisar</li>
              <li>Sugerir novas ideias e melhorias</li>
              <li>Participar de eventos especiais</li>
            </ul>
            <p>Não se esqueça de ler as <strong>regras do fórum</strong> antes de postar!</p>
            <p>Estamos ansiosos para ver suas contribuições e ideias para tornar nosso servidor ainda melhor.</p>
          `
        },
        { 
          avatar: "https://cravatar.eu/helmavatar/Matcky/64", 
          title: "Precisa de ajuda?", 
          category: "Suporte",
          content: `
            <h4>Seja bem-vindo ao nosso fórum!</h4>
            <p>Estamos muito felizes em tê-lo conosco nesta nova comunidade. Aqui você pode:</p>
            <ul>
              <li>Discutir sobre o servidor</li>
              <li>Encontrar ajuda quando precisar</li>
              <li>Sugerir novas ideias e melhorias</li>
              <li>Participar de eventos especiais</li>
            </ul>
            <p>Não se esqueça de ler as <strong>regras do fórum</strong> antes de postar!</p>
            <p>Estamos ansiosos para ver suas contribuições e ideias para tornar nosso servidor ainda melhor.</p>
          `
        },
        { 
          avatar: "https://cravatar.eu/helmavatar/Pedroo/64", 
          title: "Próximos eventos", 
          category: "Eventos",
          content: `
            <h4>Seja bem-vindo ao nosso fórum!</h4>
            <p>Estamos muito felizes em tê-lo conosco nesta nova comunidade. Aqui você pode:</p>
            <ul>
              <li>Discutir sobre o servidor</li>
              <li>Encontrar ajuda quando precisar</li>
              <li>Sugerir novas ideias e melhorias</li>
              <li>Participar de eventos especiais</li>
            </ul>
            <p>Não se esqueça de ler as <strong>regras do fórum</strong> antes de postar!</p>
            <p>Estamos ansiosos para ver suas contribuições e ideias para tornar nosso servidor ainda melhor.</p>
          `
        },
        { 
          avatar: "https://cravatar.eu/helmavatar/Azalim/64", 
          title: "Dê suas sugestões aqui", 
          category: "Sugestões",
          content: `
            <h4>Seja bem-vindo ao nosso fórum!</h4>
            <p>Estamos muito felizes em tê-lo conosco nesta nova comunidade. Aqui você pode:</p>
            <ul>
              <li>Discutir sobre o servidor</li>
              <li>Encontrar ajuda quando precisar</li>
              <li>Sugerir novas ideias e melhorias</li>
              <li>Participar de eventos especiais</li>
            </ul>
            <p>Não se esqueça de ler as <strong>regras do fórum</strong> antes de postar!</p>
            <p>Estamos ansiosos para ver suas contribuições e ideias para tornar nosso servidor ainda melhor.</p>
          `
        },
        { 
          avatar: "https://cravatar.eu/helmavatar/Matcky/64", 
          title: "Conversa livre", 
          category: "Off-topic",
          content: `
            <h4>Seja bem-vindo ao nosso fórum!</h4>
            <p>Estamos muito felizes em tê-lo conosco nesta nova comunidade. Aqui você pode:</p>
            <ul>
              <li>Discutir sobre o servidor</li>
              <li>Encontrar ajuda quando precisar</li>
              <li>Sugerir novas ideias e melhorias</li>
              <li>Participar de eventos especiais</li>
            </ul>
            <p>Não se esqueça de ler as <strong>regras do fórum</strong> antes de postar!</p>
            <p>Estamos ansiosos para ver suas contribuições e ideias para tornar nosso servidor ainda melhor.</p>
          `
        }
      ];
    // Inserir tópicos e seus conteúdos
    const topicStmt = db.prepare("INSERT INTO recent_topics (avatar, title, category) VALUES (?, ?, ?)");
    const contentStmt = db.prepare("INSERT INTO topic_content (topic_id, content) VALUES (?, ?)");
    
    recentTopics.forEach(topic => {
      topicStmt.run(topic.avatar, topic.title, topic.category, function(err) {
        if (err) return console.error(err);
        
        const topicId = this.lastID;
        contentStmt.run(topicId, topic.content);
      });
    });
    
    topicStmt.finalize();
    contentStmt.finalize();
  }
});
 
  
  // Estatísticas
  db.get("SELECT COUNT(*) as count FROM forum_stats", (err, row) => {
    if (err) return console.error("Erro ao verificar forum_stats:", err.message);
    
    if (row.count === 0) {
      db.run("INSERT INTO forum_stats (posts, members, guests) VALUES (5, 0, 0)");
    }
  });
}

// Função auxiliar para formatar o tempo relativo
function formatRelativeTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (days > 0) return `há ${days} dia${days > 1 ? 's' : ''}`;
  if (hours > 0) return `há ${hours} hora${hours > 1 ? 's' : ''}`;
  if (minutes > 0) return `há ${minutes} minuto${minutes > 1 ? 's' : ''}`;
  return 'agora mesmo';
}

// Rotas da API

// Obter todos os membros da equipe
app.get("/api/team", (req, res) => {
  db.all("SELECT * FROM team_members ORDER BY data_criacao", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Obter todas as categorias do fórum com contagens reais
app.get("/api/forum/categories", (req, res) => {
  const { type } = req.query;
  
  db.all(`
    SELECT 
      fc.id,
      fc.name,
      fc.description,
      fc.type,
      fc.created_at,
      COUNT(DISTINCT rt.id) as threads,
      SUM(rt.replies + 1) as posts  -- +1 para contar o post inicial
    FROM forum_categories fc
    LEFT JOIN recent_topics rt ON fc.name = rt.category
    ${type ? 'WHERE fc.type = ?' : ''}
    GROUP BY fc.id, fc.name, fc.description, fc.type, fc.created_at
    ORDER BY fc.name
  `, type ? [type] : [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    // Garantir que pelo menos mostre 0 se não houver tópicos
    const result = rows.map(row => ({
      ...row,
      threads: row.threads || 0,
      posts: row.posts || 0
    }));
    
    res.json(result);
  });
});

// Obter tópicos recentes
app.get("/api/forum/recent-topics", (req, res) => {
  const { limit } = req.query;
  let query = "SELECT * FROM recent_topics ORDER BY created_at DESC";
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

// Obter estatísticas do fórum
app.get("/api/forum/stats", (req, res) => {
  db.get("SELECT posts, members, guests FROM forum_stats ORDER BY updated_at DESC LIMIT 1", (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(row || { posts: 0, members: 0, guests: 0 });
  });
});

// Obter tópicos por categoria
app.get("/api/forum/topics/:category", (req, res) => {
  const { category } = req.params;
  
  db.all(
    `SELECT 
      rt.id,
      rt.avatar,
      rt.title,
      rt.category,
      rt.views,
      COUNT(tr.id) as replies,
      MAX(tr.created_at) as last_reply_time,
      (
        SELECT tr.author 
        FROM topic_replies tr 
        WHERE tr.topic_id = rt.id 
        ORDER BY tr.created_at DESC 
        LIMIT 1
      ) as last_reply_user,
      strftime('%Y-%m-%d %H:%M:%S', rt.created_at) as created_at,
      strftime('%s', 'now') - strftime('%s', rt.created_at) as seconds_ago
    FROM recent_topics rt
    LEFT JOIN topic_replies tr ON tr.topic_id = rt.id
    WHERE rt.category = ?
    GROUP BY rt.id
    ORDER BY rt.created_at DESC`, 
    [category],
    (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      
      const topics = rows.map(topic => ({
        ...topic,
        replies: topic.replies || 0,
        views: topic.views || 0,
        last_reply_time: topic.last_reply_time || null,
        last_reply_user: topic.last_reply_user || null,
        relative_time: formatRelativeTime(topic.seconds_ago)
      }));
      
      res.json(topics);
    }
  );
});

// Obter detalhes de um tópico específico por ID
app.get("/api/forum/topic/:id", (req, res) => {
    const { id } = req.params;
    
    db.get(`
      SELECT 
        rt.id,
        rt.title as titulo,
        rt.avatar,
        rt.category as categoria,
        rt.views as visualizacoes,
        rt.created_at,
        tm.name as autor,
        tm.role as autor_cargo,
        (SELECT COUNT(*) FROM topic_replies WHERE topic_id = rt.id) as respostas,
        tc.content as conteudo,
        (SELECT COUNT(*) FROM recent_topics WHERE avatar = rt.avatar) as posts_autor
      FROM recent_topics rt
      LEFT JOIN team_members tm ON rt.avatar LIKE '%' || tm.name || '%'
      LEFT JOIN topic_content tc ON tc.topic_id = rt.id
      WHERE rt.id = ?
    `, [id], (err, row) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      
      if (!row) {
        res.status(404).json({ error: "Tópico não encontrado" });
        return;
      }
      
      // Formatar a resposta
      const response = {
        id: row.id,
        titulo: row.titulo,
        avatar: row.avatar,
        categoria: row.categoria,
        visualizacoes: row.visualizacoes || 0,
        autor: row.autor || 'Anônimo',
        autor_cargo: row.autor_cargo || 'Membro',
        respostas: row.respostas || 0,
        content: row.conteudo || 'Conteúdo não disponível',
        posts_autor: row.posts_autor || 0,
        criado_em: row.created_at,
        link: `boom.me/${row.titulo.toLowerCase().replace(/\s+/g, '-')}`
      };
      
      res.json(response);
    });
  });
// Registrar visualização de tópico
app.post('/api/forum/topic/:id/view', (req, res) => {
  const { id } = req.params;
  
  db.run(
    'UPDATE recent_topics SET views = views + 1 WHERE id = ?',
    [id],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ success: true });
    }
  );
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});