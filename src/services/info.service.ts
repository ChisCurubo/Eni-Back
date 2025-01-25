import { count } from 'console';
import { InternalServerError, UnauthorizedError,DatabaseError, NotFoundError  } from '../middlewares/customErrors';
import connectToDatabase from "../providers/database";

class InfoService{

    public async getHQinfo(){
        try{
            
        // Usamos await para esperar a que se resuelva el pool
        const pool = await connectToDatabase(); // Esperamos que el pool se resuelva
        const connection = await pool.getConnection(); // Obtenemos una conexión del pool
        
        console.log('Conexión obtenida desde el pool');
    
        // Realizar operaciones con la conexión...
        const query = `
            SELECT 
                TRUNC(d.INVC_POST_DATE) AS INVC_POST_DATE, -- Agrupa por fecha sin horas
                s.STORE_NAME, -- Nombre de la tienda
                s.STORE_CODE, -- Código de la tienda
                COUNT(*) AS RECORD_COUNT -- Cuenta los registros de ventas por tienda y fecha
            FROM RPS.Store s
                INNER JOIN RPS.DOCUMENT d ON s.SID = d.STORE_SID
            WHERE d.status = 4 -- Filtra por status 4
            GROUP BY 
                TRUNC(d.INVC_POST_DATE), -- Fecha sin horas
                s.STORE_NAME, -- Nombre de la tienda
                s.STORE_CODE -- Código de la tienda
            ORDER BY 
                TRUNC(d.INVC_POST_DATE) DESC
    `;
    
        const result: any = await connection.execute(query);

        const jsonResponse = result.rows.map((row: any) => ({
            sellDate: row[0],
            storeName: row[1],
            storeCode: row[2],
            countSell: row[3],
          }));
        console.log('Resultado en JSON:', jsonResponse);
    
        // Liberar la conexión de vuelta al pool
        await connection.close();
        return jsonResponse;     
        }catch (error) {
          throw new DatabaseError('Error al obtener informacion del HQ');
        }
    }

    public async getMoreInfoDatesSell(){
      try{
        // Usamos await para esperar a que se resuelva el pool
        const pool = await connectToDatabase(); // Esperamos que el pool se resuelva
        const connection = await pool.getConnection(); // Obtenemos una conexión del pool
        
        console.log('Conexión obtenida desde el pool');
    
        // Realizar operaciones con la conexión...
        const query = `
               select c.CONTROLLER_NAME, c.ADDRESS  from RPS.Controller c;
    `;
    
        const result: any = await connection.execute(query);

        const jsonResponse = result.rows.map((row: any) => ({
            controllerName: row[0],
            address: row[1]
          }));
        console.log('Resultado en JSON:', jsonResponse);
    
        // Liberar la conexión de vuelta al pool
        await connection.close();
        return jsonResponse;     
      }catch (error) {
        throw new DatabaseError('Error al obtener informacion del HQ');
      }
    }

    public async getDetailSellDate(storeName: string, storeCode: string, postDate: string) {
      try {
        // Usamos await para esperar a que se resuelva el pool
        const pool = await connectToDatabase(); // Esperamos que el pool se resuelva
        const connection = await pool.getConnection(); // Obtenemos una conexión del pool
    

        console.log('Conexión obtenida desde el pool');
    
        // Realizar operaciones con la conexión...
        const query = `
          SELECT 
              TRUNC(d.INVC_POST_DATE) AS INVC_POST_DATE,
              s.STORE_NAME, 
              s.STORE_CODE, 
              d.DOC_NO,
              d.BT_FIRST_NAME,
              d.BT_LAST_NAME,
              d.TRACKING_NO,
              d.POS_FLAG1,
              d.TRANSACTION_TOTAL_AMT,
              d.EXTERNAL_TRANSFER_STATUS
          FROM RPS.Store s
          INNER JOIN RPS.DOCUMENT d ON s.SID = d.STORE_SID
          WHERE 
              d.status = 4 
              AND s.STORE_NAME = '${storeName}'
              AND s.STORE_CODE = '${storeCode}'
              AND TRUNC(d.INVC_POST_DATE) = TRUNC(TO_DATE('${postDate}', 'DD/MM/YY'))
          ORDER BY 
              TRUNC(d.INVC_POST_DATE) DESC
        `;
        
        // Ejecutar la consulta con los parámetros
        const result: any = await connection.execute(query);
    
        const jsonResponse = result.rows.map((row: any) => ({
          sellDate: row[0],
          storeName: row[1],
          storeCode: row[2],
          docNo: row[3],
          btName: `${row[4]} ${row[5]}`,
          traking: row[6],
          pos_flag: row[7],
          transaction: row[8],
          external: row[9],
        }));
    
        console.log('Resultado en JSON:', jsonResponse);
    
        // Liberar la conexión de vuelta al pool
        await connection.close();
    
        return jsonResponse;
      } catch (error) {
        throw new DatabaseError('Error al obtener informacion del HQ');
      }
    }
    
    

    public async getControllerInfo(){
      try{
        // Usamos await para esperar a que se resuelva el pool
        const pool = await connectToDatabase(); // Esperamos que el pool se resuelva
        const connection = await pool.getConnection(); // Obtenemos una conexión del pool
        
        console.log('Conexión obtenida desde el pool');
    
        // Realizar operaciones con la conexión...
        const query = `
               select c.CONTROLLER_NAME, c.ADDRESS  from RPS.Controller c;
    `;
    
        const result: any = await connection.execute(query);

        const jsonResponse = result.rows.map((row: any) => ({
            controllerName: row[0],
            address: row[1]
          }));
        console.log('Resultado en JSON:', jsonResponse);
    
        // Liberar la conexión de vuelta al pool
        await connection.close();
        return jsonResponse;     
      }catch (error) {
        throw new DatabaseError('Error al obtener informacion del HQ');
      }
    }

    public async getSt(){
        try{

        }catch (error) {
          throw new DatabaseError('Error al obtener informacion del HQ');
        }
    }
    // public async getHistoriaClinicaByUsuarioCC(idUsuarioCC: string): Promise<HistoriaClinica | null> {
    //     const query = `
    //       SELECT HM.* FROM HISTORIA_MEDICA HM
    //       INNER JOIN CITAS C ON C.idHistoria_Medica = HM.idHistoria_Medica
    //       WHERE C.idUsuarioCC = ?
    //       ORDER BY C.dia DESC, C.hora DESC LIMIT 1;
    //     `;
      
    //     try {
    //       const [rows]: [any[], any] = await connection.query(query, [idUsuarioCC]);
    //       if (rows.length === 0) {
    //         throw new NotFoundError('No se encontró la historia clínica para el paciente');
    //       }
    //       return rows[0]; // Devuelve la primera fila, que es la historia clínica
    //     } catch (error) {
    //       throw new DatabaseError('Error al obtener la historia clínica para el paciente');
    //     }
    //   }
}

export default new InfoService();