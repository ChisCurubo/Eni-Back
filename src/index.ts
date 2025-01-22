import cors from "cors";
import * as dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import path from "path";
dotenv.config({ path: path.join(__dirname, "../environment/.env") });
import helmet from "helmet";

import connectToDatabase from "./providers/database"
import { errorHandler } from "./middlewares/errorHandler";
import info from "./routes/info.routes"
//import apiSedes from "./routes/api.sedes.routes";


const app = express();
const port = process.env.VITE_PORT_BACK || 3002;

// Configurar CORS
app.use(cors({
  origin:'http://localhost:88',
  credentials: true,
}));

app.use(morgan("dev"));
app.use(express.json());
// app.use(helmet());

// Middleware para registrar el cuerpo de la solicitud y respuesta
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log("Request Body:", req.body);
  const originalSend = res.send.bind(res);
  res.send = (body: any) => {
    console.log("Response Body:", body);
    return originalSend(body);
  };

  next();
});

// Rutas
// app.use("/api/facturacion", facturacion);
// app.use("/api/citas", citas);
// app.use("/api/hoja-Vida", hojaVidaRoutes);

// app.use("/api/usuarios", usuarioRoutes);
// app.use("/api/usuariosE", usuarioRoutesEs);
// app.use("/api/historia-clinica", historiaClinicaRoutes);
// app.use("/api/ordenes-medicas", ordenMedicaRoutes);
// app.use("/api/doctor", DoctorRoutes);
// app.use("/api/patient", pacientesRoutes);

// app.use("/api/colillaPago", colillaPagoRoutes);
// app.use("/api/ordenes-medicas", ordenMedica);
// app.use("/api/mercadopago", mercadopagoRoutes);

// app.use("/api/emergencias", emergencia);
// app.use("/api/admin", emergencia);
// app.use("/api/auth", authRoutes);
// app.use("/apiSedes", apiSedes);
// app.use("/api/MercadoPagoFront", mercadopagoFrontRoutes);
// app.use("/api/", moduloAdminRoutes);

// Middelware para errores
app.use(errorHandler);

//app Use 
app.use("/api",info)

// Iniciar el servidor
app.listen(port, async() => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});

// Manejo de errores
app.on("error", (err: any) => {
  console.error("Error al iniciar el servidor:", err);
});
