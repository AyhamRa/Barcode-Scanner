import express from "express";
import cors from "cors";
import bcrypt from 'bcryptjs';
import { check_auth, generateToken } from "./auth.js";
import { fetch_user, setAccessToken, addArticle, deleteArticle, changePassword, registerNewAccount, getArticls, getAllUsers, deleteUser } from "./db/dbConn.js";

const app = express();
const port = 3000;

// Username start with a lowercase or upper case letter and then followed by 3 to 23 digits.
const userNameRegex = /^[A-z][A-z0-9-_]{3,23}$/;

// Password must contain at least one lowercase letter one UpperCase letter on Digits and one speacial character
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%.]).{8,24}$/;

const saltRounds = 10;

app.use(express.json());
app.use(cors());

// Backend Listinig Port
app.listen(port, () => {
  console.log(`listneing on port ${port}`);
});

// login Data handlers
app.post("/login", async (req, res) => {
  const resUser = await fetch_user(req.body.username);
  const validation = await validate_login_request(resUser, req.body);

  if (validation) {
    const token = generateToken({ role: resUser[0].Role, user: resUser[0].UserName });
    await setAccessToken(resUser[0].UserName, token);
    res.status(200).json({ token: token });
    return;
  }
  res.status(401).json({
    Error: "Not-Autorized",
  });

  return;
});

// User Authentication
app.get("/", [check_auth], async (req, res) => {
  res.status(200).json({ Autorized: "autorized" });
});

// Secret Phrase Authennotication
app.post('/api/verify-secret-phrase', (req, res) => {

  const secretPhrase = req.body.secretPhrase;
  //console.log(secretPhrase)
  if (secretPhrase === 'Repeat Shadow Fire Voltage Memory Duty Relax Estimated Agency Author Campus Emotion') {
    return res.send({ success: 200 });
  } else {
    return res.send({ success: 403 });
  }
});

// add product to the Database
app.post('/products', check_auth, async (req, res) => {
  const data = req.body
  console.log(data)

  const faildProducts = []
  data.forEach(async (e) => {
    if (e.ProductName == undefined || e.Model == undefined) {
      faildProducts.push(e.ProductID)
    } else {
      try {
        const productData = await addArticle(e);
        if (productData.affectedRows <= 0) {
          faildProducts.push(e.ProductID)
        }
      } catch (error) {
        faildProducts.push(e.ProductID)
      }
    }
  });

  res.status(200).json(faildProducts);

});

// get the Scanned Products from the Database
app.get('/products', check_auth, async (req, res, next) => {
  const barcodes = await getArticls();
  res.json(barcodes);
});

// get all Users from the Database
app.get('/users', check_auth, async (req, res, next) => {

  if (!req.isAdmin) {
    return res.status(401).json({
      error: "Not authorized",
    });
  }
  const users = await getAllUsers();
  res.json(users);
})

// Delete info from Database
app.post('/api/delete', check_auth, async (req, res) => {

  if (!req.isAdmin && !req.isModerator) {
    return res.status(401).json({
      error: "Not authorized",
    });
  }

  const ids = req.body;
  // console.log(ids)
  try {
    const sql = await deleteArticle(ids);  // call deleteRowsQuery function
    if (sql.affectedRows > 0) {
      res.send({ success: 200 });
    } else {
      res.send({ success: 403 });
    }
  } catch (error) {
    console.error(error);
    res.send({ success: 500 });
  }
});

// Delete User from the Database
app.post('/delete-user', check_auth, async (req, res) => {

  if (!req.isAdmin) {
    return res.status(401).json({
      error: "Not authorized",
    });
  }

  const { id } = req.body;
  try {
    const sql = await deleteUser(id);
    if (sql.affectedRows > 0) {
      res.send({ success: 200 });
    } else {
      res.send({ success: 403 });
    }
  } catch (error) {
    console.error(error);
    res.send({ success: 500 });
  }
});


// change Password
app.post('/change-password', async (req, res) => {
  const { userName, newPassword } = req.body;

  if (!passwordRegex.test(newPassword)) {
    return res.status(400).json({
      error: "Invalid password",
    });
  }
  const newHash = await getHash(newPassword);

  try {
    const sql = await changePassword(newHash, userName);
    if (sql.affectedRows > 0) {
      res.status(200).send();
    } else {
      res.status(403).send();
    }
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
})

// Create new Account
app.post('/register', check_auth, async (req, res) => {

  if (!req.isAdmin) {
    return res.status(401).json({
      error: "Not authorized",
    });
  }
  const { user, password, role } = req.body;

  if (!userNameRegex.test(user) || !passwordRegex.test(password)) {
    return res.status(400).json({
      error: "Invalid username or password",
    });
  }
  const hashPassword = await getHash(password);
  if (user == undefined || password == undefined) {
    res.status(400);
    return;
  }
  try {
    const sql = await registerNewAccount(user, hashPassword, role)
    if (sql.affectedRows > 0) {
      res.send({ success: 200 });
    } else {
      res.send({ success: 403 });
    }
  } catch (error) {
    console.error(error);
    res.send({ message: 500 });
  }
})

// Check user Validation
const validate_login_request = async (resUser, req_body) => {
  if (resUser.length === 0) return false;

  const username = req_body.username;
  const password = req_body.password;
  if (!(username && password)) {
    return false;
  }
  if (username != resUser[0].UserName) {
    return false;
  }

  const match = await bcrypt.compare(password, resUser[0].Password);
  return match
};

// Hash Passwords before saving them to the database
const getHash = async (data) => {
  console.log("this is my data", data)
  try {
    return await bcrypt.hash(data, saltRounds);

  } catch (error) {
    console.log("GET HASH ERROR:", error)
    return false;
  }

}

const initDB = () => {

}
