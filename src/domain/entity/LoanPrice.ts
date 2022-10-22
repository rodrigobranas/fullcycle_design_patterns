import Installment from "./Installment";
import currency from "currency.js";
import AbstractLoan from "./AbstractLoan";

export default class LoanPrice extends AbstractLoan {

	generateInstallments(): Installment[] {
		const installments: Installment[] = [];
		let balance = currency(this.amount);
		let rate = this.rate / 100;
		let installmentNumber = 1;
		let formula = Math.pow((1 + rate), this.period);
		let amount = balance.multiply((formula * rate) / (formula - 1));
		while (balance.value > 0) {
			let interest = balance.multiply(rate);
			let amortization = amount.subtract(interest);
			balance = balance.subtract(amortization);
			if (balance.value <= 0.05) balance = currency(0);
			installments.push(new Installment(
				this.code,
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