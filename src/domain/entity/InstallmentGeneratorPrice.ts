import InstallmentGenerator from "./InstallmentGenerator";
import Installment from "./Installment";
import currency from "currency.js";

export default class InstallmentGenratorPrice implements InstallmentGenerator {

	async generate(loanCode: string, loanAmount: number, loanPeriod: number, loanRate: number): Promise<Installment[]> {
		const installments: Installment[] = [];
		let balance = currency(loanAmount);
		let rate = loanRate / 100;
		let installmentNumber = 1;
		let formula = Math.pow((1 + rate), loanPeriod);
		let amount = balance.multiply((formula * rate) / (formula - 1));
		while (balance.value > 0) {
			let interest = balance.multiply(rate);
			let amortization = amount.subtract(interest);
			balance = balance.subtract(amortization);
			if (balance.value <= 0.05) balance = currency(0);
			installments.push(new Installment(
				loanCode,
				installmentNumber,
				amount.value, 
				interest.value, 
				amortization.value, 
				balance.value
			));
			installmentNumber++;
		}
		return installments;
	}

}