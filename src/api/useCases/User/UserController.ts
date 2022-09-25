// Importing all required libraries.
import getCurrentLine from "get-current-line";
import { Request, Response, NextFunction } from "express";

// Importing all required files.
import { UserService } from "./UserService";
import { errors } from "../../constants/errors";
import axios from "axios";
import { AppDataSource } from "../../../database/data-source";
import { User } from "../../../database/entities/User";
import { success } from "../../constants/success";
import { BankAccount } from "../../../database/entities/BankAccount";

// Instacing the user controller.
export const UserController = {

	async store(req : Request, res : Response, next : NextFunction) {

		try {

			const response = await UserService.store({first_name: req.body.first_name, last_name: req.body.last_name, cpf: req.body.cpf, date_of_birth: req.body.date_of_birth, email_address: req.body.email_address});

			return res.status(response.status).json(response);
		
		} catch(error) {

			return res.status(500).json({
				status: 500,
				error: {
					code: errors.internal_server_error.code,
					title: errors.internal_server_error.title,
					description: errors.internal_server_error.description,
					source: {
						pointer: __filename,
						line: getCurrentLine().line
					}
				}
			});
		
		}
		
    
	},
    
	async findById(req : Request, res : Response, next ?: NextFunction) {

		try {

			const response = await UserService.findById(req.params.id);

			return res.status(response.status).json(response);
		
		} catch(error) {

			console.log(error);

			return res.status(500).json({
				status: 500,
				error: {
					code: errors.internal_server_error.code,
					title: errors.internal_server_error.title,
					description: errors.internal_server_error.description,
					source: {
						pointer: __filename,
						line: getCurrentLine().line
					}
				}
			});
		
		}
	
	},

	async refreshOpenFinanceAvailableAccounts(req : Request, res : Response, next ?: NextFunction) {

		// Pegando as informações sobre o usuário.
		const customer = await AppDataSource.getRepository(User).findOne({
			where: {
				id: req.params.id
			}
		});

		// Getting all user accounts from open finance api.
		try {

			// Getting the open finance data about the customer.
			const response = await axios.get("https://challenge.hackathonbtg.com/accounts/v1/accounts", {
				headers: {
					organizationid:"69665991-da55-4aac-a1f2-32d23daba8fe",
					customerid: customer.cpf,
				}
			});

			const bankAccountData = {

				compe_code: response.data.data[0].compeCode,
				bank_name: response.data.data[0].organizationName,
				branch_code: response.data.data[0].branchCode,
				number: response.data.data[0].number,
				check_digit: response.data.data[0].checkDigit,
				customer

			};
			

			// Instacing a new bank account object.
			const bank_account = new BankAccount;

			// Saving the bank accounts in the database.
			const created_bank_account = await bank_account.store(bankAccountData);

			
			// Returning the created user with its account confirmation status.
			return res.status(200).json({
				status: 200, 
				success: {
					code: success.accounts_refreshed_successfully.code,
					title: success.accounts_refreshed_successfully.title,
					data: response.data.data
				}
			});

			
		} catch (error) {

			console.error(error);
			
		}
		  

	}

	// async getAll(req : Request, res : Response, next : NextFunction) {

	// 	return;
	
	// },


	// async update(req : Request, res : Response, next : NextFunction) {

	// 	return;

	// },

	// async destroy(req : Request, res : Response, next : NextFunction) {

	// 	return;

	// }

};