import { FieldValue } from "firebase-admin/firestore";
import jwt from "jsonwebtoken";
import { db } from "./dbConnect.js";
import { secrets } from "../secrets.js";

const collection = db.collection("forms");

export async function getAllForms(req,res) {
  const formsCollection = await collection.get()
  const forms = formsCollection.docs.map(doc => ({...doc.data(), id: doc.id}))
  res.send(forms)
}

export async function addNewForm(req, res) {
  const token = req.headers.authorization
  if(!token) {
    res.status(401).send({ message: "Unauthorized. A valid token is required." })
    return
  }
  const decoded = jwt.verify(token, secrets)
  if(!decoded) {
    res.status(401).send({ message: "A valid token is required." })
    return
  }
  const { name, email, number, propertyType } = req.body
  if(!name || !email || !number || !propertyType) {
    res.status(400).send({ message: "Show Name, Email, Number,and Property Type are required." })
    return
  }
  const newForms = {
    name: name.FieldValue,
    email: email.FieldValue,
    number:number.FieldValue,
    propertyType: propertyType.FieldValue,
    createdAt: FieldValue.serverTimestamp(),
  }
  await collection.add(newForms) // add the new forms
  getforms(req, res) // return the updated forms
}