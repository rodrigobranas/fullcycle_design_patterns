import Installment from "./Installment";
import currency from "currency.js";
import AbstractLoan from "./AbstractLoan";

export default class LoanSac extends AbstractLoan {

	generateInstallments(): Installment[] {
		const installments: Installment[] = [];
		let balance = currency(this.amount);
		let rate = this.rate / 100;
		let installmentNumber = 1;
		let amortization = currency(balance.value / this.period);
		while (balance.value > 0) {
			let saldoInicial = currency(balance.value);
			let interest = currency(saldoInicial.value * rate);
			let updatedBalance = currency(saldoInicial.value + interest.value);
			let amount = currency(interest.value + amortization.value);
			balance = currency(updatedBalance.value - amount.value);
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