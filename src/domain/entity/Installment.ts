export default class Installment {
	constructor (
		readonly loanCode: string,
		readonly number: number,
		readonly amount: number,
		readonly interest: number,
		readonly amortization: number,
		readonly balance: number
	) {

	}
}