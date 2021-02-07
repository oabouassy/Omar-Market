const express = require("express");
const app = express();
const cors = require("cors");
const { client } = require("./dbConfig");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const path = require("path");

/* Middlewares */
app.use(
  cors({
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "my secret!",
    resave: true,
    saveUninitialized: false,
  })
);
if (process.env.NODE_ENV === "production") {
  app.use(express.static("./client/build"));
}
app.get("/", (req, res) => {
  res.json("Welcome to my api");
});

app.put("/api/user/:email", async (req, res) => {
  const email = req.params.email;
  try {
    const result = await client.query("SELECT * FROM person WHERE email = $1", [
      email,
    ]);
    if (result.rows.length > 0) {
      const update = await client.query(
        "UPDATE person SET isadmin = $1 where email = $2 RETURNING *",
        [true, email]
      );
      res.json(update.rows[0]);
    } else {
      res.json({ message: "User does not exist" });
    }
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/api/product/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await client.query("SELECT * FROM product WHERE id = $1", [
      id,
    ]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});
app.delete("/api/product/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await client.query("DELETE FROM product WHERE id = $1", [
      id,
    ]);
    res.json({ message: "deleted" });
  } catch (err) {
    console.error(err.message);
  }
});

// for deleting cookies
app.get("/api/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.json({ deleted: true });
  });
});

// for getting session object
app.get("/api/signin", (req, res) => {
  if (req.session.user) {
    res.json({ user: req.session.user });
  } else {
    res.json({});
  }
});

// to sign in
app.post("/api/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const response = await client.query(
      "SELECT * FROM person WHERE email = $1",
      [email]
    );
    if (response.rows.length > 0) {
      bcrypt.compare(password, response.rows[0].password, (err, isTrue) => {
        if (isTrue) {
          req.session.user = response.rows[0];
          res.json(response.rows[0]);
        } else {
          res.json({ message: "Wrong email / password combination" });
        }
      });
    } else {
      res.json({ message: "User doesn't exist" });
    }
  } catch (err) {
    console.error(err.message);
  }
});

// register a new account/user
app.post("/api/signup", async (req, res) => {
  const { firstname, lastname, email, password, isadmin } = req.body;
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) console.error(err);
    client.query(
      "INSERT INTO person (firstname, lastname, email, password, isadmin) VALUES ($1, $2, $3, $4, $5)",
      [firstname, lastname, email, hash, isadmin],
      (err, result) => {
        if (err) {
          console.error(err);
        } else {
          res.json({ process: "DONE" });
        }
      }
    );
  });
});

// get all products
app.get("/api/products", (req, res) => {
  client.query("SELECT * FROM product", (err, result) => {
    if (err) {
      console.error(err);
    }
    res.json(result.rows);
  });
});

// insert new product
app.post("/api/products", async (req, res) => {
  const { name, about, category, thumbnail_url, rating } = req.body;
  try {
    const result = await client.query(
      "INSERT INTO product (name, about, category, thumbnail_url, rating) VALUES ($1, $2, $3, $4, $5)",
      [name, about, category, thumbnail_url, rating]
    );
    res.json({ message: "inserted" });
  } catch (err) {
    console.error(err.message);
  }
});
app.get("/test", async (req, res) => {
  const test = await client.query("SELECT NOW()");
  res.json(test.rows[0]);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});
/* Server LISTEN */
app.listen(process.env.PORT || 3001, () => {
  console.log(`api is listening now`);
});
