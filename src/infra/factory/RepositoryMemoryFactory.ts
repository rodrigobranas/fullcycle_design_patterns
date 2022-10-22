import RepositoryAbstractFactory from "../../application/factory/RepositoryAbstractFactory";
import InstallmentRepository from "../../application/repository/InstallmentRepository";
import LoanRepository from "../../application/repository/LoanRepository";
import InstallmentMemoryRepository from "../repository/memory/InstallmentMemoryRepository";
import LoanMemoryRepository from "../repository/memory/LoanMemoryRepository";

export default class RepositoryMemoryFactory implements RepositoryAbstractFactory {

	createLoanRepository(): LoanRepository {
		return LoanMemoryRepository.getInstance();
	}

	createInstallmentRepository(): InstallmentRepository {
		return InstallmentMemoryRepository.getInstance();
	}

}