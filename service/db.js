const { vary } = require("koa/lib/response");

const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./local.db");

exports.create = () => {
  const sql = `
    CREATE TABLE article (
        id int primary key,
        title varchar(32),
        content text,
        auth varchar(16)
    )
    `;
  db.run(sql);
  return db;
};

exports.insertList = (list) => {
  db.serialize(() => {
    const stmt = db.prepare(
      "INSERT INTO article(id, title, content, auth ) VALUES (?, ?, ?, ?)"
    );
    list.forEach((item) => {
      stmt.run(item.id, item.title, item.content, item.author);
    });
    stmt.finalize();
  });
};

exports.queryList = async () => {
  var list = [];

  return new Promise((resolve) => {
    db.each("SELECT * FROM article limit 20", (_, row) => {
      list.push(row);
    });
    setTimeout(() => {
      console.table(list);
      resolve(list);
    }, 200);
  });
};

exports.queryList();
// db.close();
