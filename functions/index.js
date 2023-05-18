import functions from "firebase-functions"
import express from "express"
import cors from "cors"
import { signup } from "./src/users.js"
import { addNewForm, getAllForms } from "./src/forms.js"


const PORT= 5000
const app = express()

app.use(cors())
app.use(express.json())

app.post("/signup", signup) 

app.get("/forms",getAllForms)
app.post ("/form",addNewForm)

// POST /form addNewForm()

// GET /forms getAllForms()

// app.get("/", (req, res) => {
//  res.send(`My api is working`)
// })
  
// app.listen(5000, () => {
//     console.log('listening on http://localhost:5000');
//   });

export const api = functions.https.onRequest(app)
