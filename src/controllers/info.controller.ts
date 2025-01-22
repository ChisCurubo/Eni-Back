import { Request, Response, NextFunction } from 'express';
import { BadRequestError, UnauthorizedError, InternalServerError, DatabaseError, NotFoundError } from '../middlewares/customErrors';
import InfoService from '../services/info.service'

class InfoController{

    public async getInfoHQ (req: Request, res: Response){
        try{
        const respu = await InfoService.getHQinfo()
        if(respu != null){
            return res.status(200).json(respu)
        }else{
            return res.status(500).json(null)
        }
        }catch (error) {
            console.error("Error en getCitasWithPatientsAndDoctorsByCC:", error);
            if (error instanceof NotFoundError) {
            return res.status(404).json({ message: error.message });
            }
            return res.status(500).json({ message: "Error al obtener citas con pacientes y doctores." });
        }
                 
    }
    

    public async getInfoSt (req: Request, res: Response){
        try{

        }catch (error) {
          console.error("Error getInfoSt:", error);
          
        }
    }

    // public  async getCitasWithPatientsAndDoctorsByCC(req: Request, res: Response): Promise<Response> {
    //     const { cedula } = req.params; // Asumiendo que la cédula se pasa como parámetro en la ruta
    
    //     try {
    //       const citas: CitaConPacientesYDoctores[] = await CitasService.getCitasWithPatientsAndDoctorsByCC(cedula);
    //       return res.status(200).json(citas);
    //     } catch (error) {
    //       console.error("Error en getCitasWithPatientsAndDoctorsByCC:", error);
    //       if (error instanceof NotFoundError) {
    //         return res.status(404).json({ message: error.message });
    //       }
    //       return res.status(500).json({ message: "Error al obtener citas con pacientes y doctores." });
    //     }
    //   }

}

export default new InfoController();