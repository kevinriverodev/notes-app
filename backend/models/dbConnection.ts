import { Dialect, Sequelize } from "sequelize";

class DBConection {
	private dbName: string;
	private user: string;
	private password: string;
	private host: string;
	private dialect: Dialect;
	private sequelize: Sequelize;

	constructor(dbName?: string, user?: string, password?: string, host?: string, dialect?: Dialect) {
		this.dbName = dbName || process.env.DB_NAME || "notesapp";
		this.user = user || process.env.DB_USER || "root";
		this.password = password || process.env.DB_PASSWORD || "";
		this.host = host || process.env.host || "localhost"
		this.dialect = dialect || (process.env.DB_DIALECT as Dialect) || "mysql"
		
		this.sequelize = new Sequelize(this.dbName, this.user, this.password, {
			host: this.host,
			dialect: this.dialect,
		});
	}

	get sequelizeInstance() {
		return this.sequelize;
	}

	async testConnection() {
		try {
			await this.sequelize.authenticate();
			console.log(`${this.dbName} database connected...`);
		} catch (error) {
			console.log(error);
		}
	}

	async closeConnection() {
		try {
			await this.sequelize.close();
			console.log(`${this.dbName} database disconnected...`);
		} catch (error) {
			console.log(error);
		}
	}
}

export default DBConection;
