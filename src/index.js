import express, { application } from 'express';
import "dotenv/config";
import "./database/db_connect.js";
import authRoutes from "./routes/users/authRoutes.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Escuchando en puerto: ${port}...`));