import * as functions from "firebase-functions";
import admin from "firebase-admin";
import express, { Request, Response } from "express";
import cors from "cors";


admin.initializeApp();
const db = admin.firestore();


const app = express();
app.use(cors({ origin: true }));
app.use(express.json());


app.post("/addUser", async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const ref = await db.collection("users").add(data);
        res.status(200).send({ id: ref.id });
    } catch (err) {
        res.status(500).send(err);
    }
});


app.get("/getUsers", async (_: Request, res: Response) => {
    try {
        const snapshot = await db.collection("users").get();
        const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(users);
    } catch (err) {
        res.status(500).send(err);
    }
});


app.put("/updateUser", async (req: Request, res: Response) => {
    try {
        const { id, ...data } = req.body;
        await db.collection("users").doc(id).update(data);
        res.send("User updated");
    } catch (err) {
        res.status(500).send(err);
    }
});


app.delete("/deleteUser", async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        await db.collection("users").doc(id).delete();
        res.send("User deleted");
    } catch (err) {
        res.status(500).send(err);
    }
});


export const api = functions.https.onRequest(app);
