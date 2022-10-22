import crypto from "crypto";
import LogDecorator from "../../src/application/decorator/LogDecorator";
import GetLoan from "../../src/application/usecase/GetLoan";
import RequestLoan from "../../src/application/usecase/RequestLoan";
import PgPromiseConnection from "../../src/infra/database/PgPromiseConnection";
import RepositoryDatabaseFactory from "../../src/infra/factory/RepositoryDatabaseFactory";
import RepositoryMemoryFactory from "../../src/infra/factory/RepositoryMemoryFactory";
import InstallmentDatabaseRepository from "../../src/infra/repository/InstallmentDatabaseRepository";
import LoanDatabaseRepository from "../../src/infra/repository/LoanDatabaseRepository";
import InstallmentMemoryRepository from "../../src/infra/repository/memory/InstallmentMemoryRepository";
import LoanMemoryRepository from "../../src/infra/repository/memory/LoanMemoryRepository";

test("Deve aplicar para um financiamento utilizando a tabela price", async function () {
	const code = crypto.randomUUID();
	const connection = new PgPromiseConnection();
	const repositoryFactory = new RepositoryDatabaseFactory(connection);
	// const repositoryFactory = new RepositoryMemoryFactory();
	const requestLoan = new LogDecorator(new RequestLoan(repositoryFactory));
	const inputRequestLoan = {
		code,
		purchasePrice: 250000,
		downPayment: 50000,
		salary: 70000,
		period: 12,
		type: "price"
	}
	await requestLoan.execute(inputRequestLoan);
	const getLoan = new LogDecorator(new GetLoan(repositoryFactory));
	const inputGetLoan = {
		code
	};
	const output = await getLoan.execute(inputGetLoan);
	expect(output.installments).toHaveLength(12);
	const [firstInstallment] = output.installments;
	expect(firstInstallment.balance).toBe(184230.24);
	const lastInstallment = output.installments[output.installments.length - 1];
	expect(lastInstallment.balance).toBe(0);
	connection.close();
});
