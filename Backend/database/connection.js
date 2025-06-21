import sql from 'mssql';

const dbSettings = {
    user: "sa",
    password: "Akelarre05!",
    server: "localhost",
    database: "software_gestion",
    options: {
        encrypt: false,
        trustServerCertificate: true,
    }
}

export const getConnection = async () => {
    try {
        const pool = await sql.connect(dbSettings);
        return pool;
    } catch (error) {
        console.log(error);
        
    }
};