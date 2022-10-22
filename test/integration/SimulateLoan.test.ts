import crypto from "crypto";
import SimulateLoan from "../../src/application/usecase/SimulateLoan";

test("Deve simular um financiamento utilizando a tabela price", async function () {
	// given / arrange
	const simulateLoan = new SimulateLoan();
	const input = {
		code: crypto.randomUUID(),
		purchasePrice: 250000,
		downPayment: 50000,
		salary: 70000,
		period: 12,
		type: "price"
	}
	// when / act
	const output = await simulateLoan.execute(input);
	// then / assert
	expect(output.installments).toHaveLength(12);
	const [firstInstallment] = output.installments;
	expect(firstInstallment.balance).toBe(184230.24);
	const lastInstallment = output.installments[output.installments.length - 1];
	expect(lastInstallment.balance).toBe(0);
});
