import { getConnection } from "../../../../database/connection.js";
import sql from 'mssql';

export const createEmpresa = async (req, res) => {
    const { razon_social, nit, tipo_sociedad, nombre_representante, actividad_economica, id_usuario, id_persona } = req.body;
    try {
        const pool = await getConnection();
        const result = await pool
            .request()
            .input('razon_social', sql.VarChar, razon_social)
            .input('nit', sql.VarChar, nit)
            .input('tipo_sociedad', sql.VarChar, tipo_sociedad)
            .input('nombre_representante', sql.VarChar, nombre_representante)
            .input('actividad_economica', sql.VarChar, actividad_economica)
            .input('id_usuario', sql.BigInt, id_usuario)
            .input('id_persona', sql.BigInt, id_persona)
            .query(`INSERT INTO empresas ( razon_social, nit, tipo_sociedad, nombre_representante, actividad_economica, id_usuario, id_persona ) VALUES (@razon_social, @nit, @tipo_sociedad, @nombre_representante, @actividad_economica, @id_usuario, @id_persona)`);

            res.json({
                message: 'Empresa creada exitosamente',
                body: {
                    empresa: {
                        razon_social,
                        nit,
                        tipo_sociedad,
                        nombre_representante,
                        actividad_economica,
                        id_usuario,
                        id_persona
                    }
                }
            })

    } catch (error) {
        res.status(500).json(error.message);
    }

}