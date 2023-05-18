import { db } from './dbConnect.js'


const collection = db.collection("Users")

export async function signup(req, res) {
    const { email, password } = req.body
    if(!email || !password) {
        res.status(400).send({message: "Email and password are both required. Password must be 6 characters or more"})
        return
    }

    const newUser = {
        email: email.toLowerCase(),
        password,
        createdAt: new Date()
    }
    await collection.addOne(newUser)
    //Once the user is added, it will log them in...
    login(req, res)
}
// export async function signup