import { Dialect, Model, Sequelize } from 'sequelize';

class DBConection {
    private DBname: string;
    private user: string;
    private password: string;
    private host: string;
    private dialect: Dialect;
    private db: Sequelize;

    constructor(DBname?: string, user?: string, password?: string, host?: string, dialect?: Dialect) {
        DBname ? this.DBname = DBname : this.DBname = process.env.DB_NAME || 'notesapp';
        user ? this.user = user : this.user = process.env.DB_USER || 'root';
        password ? this.password = password : this.password = process.env.DB_PASSWORD || '';
        host ? this.host = host : this.host = process.env.host || 'localhost';
        dialect ? this.dialect = dialect : this.dialect = 'mysql';

        this.db = new Sequelize(this.DBname, this.user, this.password, { host: this.host, dialect: this.dialect });
    }

    async getConnection() {
        try {
            await this.db.authenticate();
            console.log(`${this.DBname} database connected...`);
        } catch (error) {
            console.log(error);
        }
    }

    async closeConnection() {
        try {
            await this.db.close();
            console.log(`${this.DBname} database disconnected...`);
        } catch (error) {
            console.log(error);
        }
    }

    getdefineModelFunction() {
        return this.db.define;
    }
}

export default DBConection;