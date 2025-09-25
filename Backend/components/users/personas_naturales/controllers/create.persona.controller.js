
import { getConnection } from "../../../../database/connection.js";
import sql from 'mssql';

export const createPersona = async (req, res) => {
    const pool = await getConnection();
    const result = await pool
        .request()
        .input('nombres', sql.VarChar, req.body.nombres)
        .input('apellidos', sql.VarChar, req.body.apellidos)
        .input('tipo_documento', sql.VarChar, req.body.tipo_documento)
        .input('documento', sql.VarChar, req.body.documento)
        .input('fecha_nacimiento', sql.Date, req.body.fecha_nacimiento)
        .input('actividad_economica', sql.VarChar, req.body.actividad_economica)
        .input('rut', sql.VarChar, req.body.rut)
        .input('id_usuario', sql.BigInt, req.body.id_usuario)
        .query(`INSERT INTO personas_naturales (nombres, apellidos, tipo_documento, documento, fecha_nacimiento, actividad_economica, rut, id_usuario) VALUES (@nombres, @apellidos, @tipo_documento, @documento, @fecha_nacimiento, @actividad_economica, @rut, @id_usuario); SELECT SCOPE_IDENTITY() AS id;`)
        
        res.json(
            {
                id: result.recordset[0].id,
                nombres: req.body.nombres,
                apellidos: req.body.apellidos,
                tipo_documento: req.body.tipo_documento,
                documento: req.body.documento,
                fecha_nacimiento: req.body.fecha_nacimiento,
                actividad_economica: req.body.actividad_economica,
                rut: req.body.rut,
                usuario_id: req.body.usuario_id
            }
        );
}