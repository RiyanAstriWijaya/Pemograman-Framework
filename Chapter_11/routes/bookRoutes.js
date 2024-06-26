const express = require("express");
const router = express.Router();
const db = require("../config/database");

// Read All Books
router.get("/", async (req, res) => {
  try {
    const [books] = await db.query("SELECT * FROM books");
    res.render("index", { books });
  } catch (err) {
    res.status(500).send(err);
  }
});

// Show Form to Add Book
router.get("/add", (req, res) => {
  res.render("addBook");
});

// Add Book
router.post("/add", async (req, res) => {
  const { title, author, published } = req.body;
  try {
    await db.query("INSERT INTO books (title, author, published) VALUES (?, ?, ?)", [title, author, published]);
    res.redirect("/");
  } catch (err) {
    res.status(500).send(err);
  }
});

// Show Form to Edit Book
router.get("/edit/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [books] = await db.query("SELECT * FROM books WHERE id = ?", [id]);
    const book = books[0];
    res.render("editBook", { book });
  } catch (err) {
    res.status(500).send(err);
  }
});

// Update Book
router.post("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const { title, author, published } = req.body;
  try {
    await db.query("UPDATE books SET title = ?, author = ?, published = ? WHERE id = ?", [title, author, published, id]);
    res.redirect("/");
  } catch (err) {
    res.status(500).send(err);
  }
});

// Delete Book
router.post("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM books WHERE id = ?", [id]);
    res.redirect("/");
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
