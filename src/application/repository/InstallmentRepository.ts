import Installment from "../../domain/entity/Installment";

export default interface InstallmentRepository {
	save (installment: Installment): Promise<void>;
	getByCode (code: string): Promise<Installment[]>;
}