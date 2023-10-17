const router = require("express").Router();

const connection = require("../../database");

router.get("/getSeries", (req, res) => {
  const sql = "SELECT * FROM series";
  connection.query(sql, (err, result) => {
    if (err) throw (err, console.log(result));
    console.log("Séries récupérées");
    res.send(JSON.stringify(result));
  });
});

router.patch("/likedOne", (req, res) => {
  console.log(req.body);
  const likes = req.body.likes === true ? 1 : 0;
  const id = req.body.id;
  const updateSql = "UPDATE series SET likes=? WHERE id=?";
  connection.query(updateSql, [likes, id], (err, result) => {
    if (err) throw err;
    console.log("Série modifiée en BDD");
    res.send(req.body);
  });
});

router.delete("/deleteSerie/:id", (req, res) => {
  console.log(req.params);
  const id = req.params.id;
  const deleteSql = "DELETE FROM series WHERE id= ?";
  connection.query(deleteSql, [id], (err, result) => {
    if (err) throw err;
  });
  res.sendStatus(200);
});

router.post("/insertSerie", (req, res) => {
  console.log(req.body);
  const {synopsis, year, poster, title} = req.body
  const insertSql= "INSERT INTO series(title, year, imgBlob, content) VALUES (?,?,?,?)"
  connection.query(insertSql, [title, year, poster, synopsis], (err, result) => {
    if (err) throw err
    let lastInsertId = result.insertId
    let sqlLastOne = "SELECT * FROM series WHERE id = ?"
    connection.query(sqlLastOne, [lastInsertId], (err, result)=> {
      res.send(JSON.stringify(result))
    })
  })
})

// router.post("/insertSerie", async (req, res) => {
//   const {title, }
// })

module.exports = router;
