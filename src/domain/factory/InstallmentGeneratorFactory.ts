import InstallmentGeneratorPrice from "../entity/InstallmentGeneratorPrice";
import InstallmentGeneratorSac from "../entity/InstallmentGeneratorSac";

export default class InstallmentGeneratorFactory {
	static create (type: string) {
		if (type === "price") {
			return new InstallmentGeneratorPrice();
		}
		if (type === "sac") {
			return new InstallmentGeneratorSac();
		}
		throw new Error();
	}
}
