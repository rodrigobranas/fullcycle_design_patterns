export default class Loan {

	constructor (
		readonly code: string, 
		readonly amount: number,
		readonly period: number,
		readonly rate: number,
		readonly type: string,
		readonly salary: number
	) {
		if (salary*0.25 < (amount/period)) {
			throw new Error("Insufficient salary");
		}
	}
}