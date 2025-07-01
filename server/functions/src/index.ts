import * as functions from "firebase-functions";
import admin from "firebase-admin";
import express, { Request, Response } from "express";
import cors from "cors";

// Initialize Firebase Admin SDK
admin.initializeApp();
const db = admin.firestore();

// Initialize Express App
const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

// 📥 Create user
app.post("/addUser", async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const ref = await db.collection("users").add(data);
        res.status(200).send({ id: ref.id });
    } catch (err) {
        res.status(500).send(err);
    }
});

// 📤 Read users
app.get("/getUsers", async (_: Request, res: Response) => {
    try {
        const snapshot = await db.collection("users").get();
        const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(users);
    } catch (err) {
        res.status(500).send(err);
    }
});

// ✏️ Update user
app.put("/updateUser", async (req: Request, res: Response) => {
    try {
        const { id, ...data } = req.body;
        await db.collection("users").doc(id).update(data);
        res.send("User updated");
    } catch (err) {
        res.status(500).send(err);
    }
});

// ❌ Delete user
app.delete("/deleteUser", async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        await db.collection("users").doc(id).delete();
        res.send("User deleted");
    } catch (err) {
        res.status(500).send(err);
    }
});

// 🔗 Export Cloud Function
export const api = functions.https.onRequest(app);
