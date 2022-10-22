import pgp from "pg-promise";
import Connection from "./Connection";

export default class PgPromiseConnection implements Connection {
	connection: any;

	constructor () {
		this.connection = pgp()("postgres://postgres:123456@localhost:5432/app");
	}

	async query (statement: string, params: any) {
		return this.connection.query(statement, params);
	}

	async close () {
		return this.connection.$pool.end();
	}
}
