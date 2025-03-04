import mysql2 from 'mysql2';

const params = {
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    
}

class Database{
    private pool: mysql2.Pool;

    private constructor() {
        this.pool = mysql2.createPool({
            host: params.host,
            database: params.database,
            user: params.user,
            password: params.user,
            connectionLimit: 10, //default, maximum of connection to create at once
            queueLimit: 0 //default 0, no limit
        })
    }

    // singleton instance of the database
    private static instance: Database;

    /**Method that accesses the singleton instance */
    public static getInstance(): Database{
        if(!this.instance){
            return Database.instance = new Database;
        }else{
            return this.instance
        }
    }

    /**Method that gets a connection from the pool*/
    public async connect(): Promise<mysql2.PoolConnection>{
        return new Promise<mysql2.PoolConnection>((resolve, reject) => {
            this.pool.getConnection((err, connection) => {
                if(err){
                    reject(err);
                    return;
                }else{
                    console.log('Database connected successfully.');
                    resolve(connection);
                };
            });
        });
    }

    /**Method that executes a database query */
    public async processQuery(connection: mysql2.PoolConnection, queryString: string, values: any[] = []): Promise<any> {
        return new Promise((resolve, reject) => {
            connection.query(queryString, values, (err, result) => {
                if(err){
                    console.log('Query unsuccessful');
                    reject(err);
                    return;
                }else{
                    console.log('Query successful');
                    resolve(result);
                    return;                    
                }
            })
        })
    }
}


export const database = Database.getInstance();