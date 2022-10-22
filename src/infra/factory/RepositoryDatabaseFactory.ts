import RepositoryAbstractFactory from "../../application/factory/RepositoryAbstractFactory";
import InstallmentRepository from "../../application/repository/InstallmentRepository";
import LoanRepository from "../../application/repository/LoanRepository";
import Connection from "../database/Connection";
import InstallmentDatabaseRepository from "../repository/InstallmentDatabaseRepository";
import LoanDatabaseRepository from "../repository/LoanDatabaseRepository";

export default class RepositoryDatabaseFactory implements RepositoryAbstractFactory {

	constructor (readonly connection: Connection) {
	}

	createLoanRepository(): LoanRepository {
		return new LoanDatabaseRepository(this.connection);
	}

	createInstallmentRepository(): InstallmentRepository {
		return new InstallmentDatabaseRepository(this.connection);
	}

}