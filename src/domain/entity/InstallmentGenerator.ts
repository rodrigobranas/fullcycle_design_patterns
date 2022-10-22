import Installment from "./Installment";

export default interface InstallmentGenerator {
	generate (code: string, amount: number, period: number, rate: number): Promise<Installment[]>;
}