import InstallmentRepository from "../repository/InstallmentRepository";
import LoanRepository from "../repository/LoanRepository";

export default interface RepositoryAbstractFactory {
	createLoanRepository(): LoanRepository;
	createInstallmentRepository(): InstallmentRepository;
}
