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
app.use(cors());
// app.use(cors());

// {
//   origin: "http://localhost:5173", //especificamos el puerto que se puede comunicar solamente
//   credentials: true,
// }
app.use(morgan("dev")); //nos mostrara un mensaje ecorto por consola
app.use(express.json()); //le permitira a express entender los json del front
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type,Authorization ,Accept"
  );
  res.setHeader("Access-Control-Allow-Origin", ["*"]);
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Expose-Headers", "Authorization");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type, Authorization"
  );

  console.log(req.header("Authorization"));
  next();
});
app.use("/api", authRoutes);
app.use("/api", cuestionario);

export default app;
