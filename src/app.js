import express from "express";
import morgan from "morgan"; //nos permite ver las peticiones que lleguen al servidor
import { conectarDB } from "./db.js";
import authRoutes from "./routes/auth.routes.js"; //importamos las rutas
import cuestionario from "./routes/cuestionario.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors"; //nos permite lidear con los cors

const app = express();

app.use(cookieParser()); //le permite a express a entender las cookies

conectarDB();
app.use(
  cors({
    origin: "https://setylsa.guiatusemociones.com", //especificamos el puerto que se puede comunicar solamente
    credentials: true,
  })
);

// app.use(cors());

// {
//   origin: "http://localhost:5173", //especificamos el puerto que se puede comunicar solamente
//   credentials: true,
// }
app.use(morgan("dev")); //nos mostrara un mensaje ecorto por consola
app.use(express.json()); //le permitira a express entender los json del front

app.use("/api", authRoutes);
app.use("/api", cuestionario);

export default app;
