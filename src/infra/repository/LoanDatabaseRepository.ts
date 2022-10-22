import Loan from "../../domain/entity/Loan";
import Connection from "../database/Connection";

export default class LoanDatabaseRepository {

	constructor (readonly connection: Connection) {
	}

	async save (loan: Loan): Promise<void> {
		await this.connection.query("insert into fc.loan (code, amount, period, rate, type) values ($1, $2, $3, $4, $5)", [loan.code, loan.amount, loan.period, loan.rate, loan.type]);
	}

	async get (code: string): Promise<Loan> {
		const [loanData] = await this.connection.query("select * from fc.loan where code = $1", [code]);
		if (!loanData) throw new Error();
		return new Loan(loanData.code, parseFloat(loanData.amount), loanData.period, loanData.rate, loanData.type, 100000000);
	}
}