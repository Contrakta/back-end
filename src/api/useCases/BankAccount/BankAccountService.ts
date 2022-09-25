// Importing all require libraries.
import getCurrentLine from "get-current-line";

// Importing all required files.
import { IBankAccount } from "./IBankAccount";
import { isUUID } from "../../../helpers";
import { errors } from "../../constants/errors";
import { User } from "../../../database/entities/User";
import { AppDataSource } from "../../../database/data-source";
import { success } from "../../constants/success";
import { BankAccount } from "../../../database/entities/BankAccount";

// Instacing a new bank account object.
const bank_account = new BankAccount;

// Exporting the user service.
export const BankAccountService = {

	// Instacing the create method.
	async store(data : IBankAccount) {

		// If user isn't already registered, creating the user in database.
		const created_bank_account = await bank_account.store(data);

		// Returning the created user with its account confirmation status.
		return {
			status: 201, 
			success: {
				code: success.bank_account_created.code,
				title: success.bank_account_created.title,
				data: await AppDataSource.getRepository(BankAccount).findOne({where: {id: created_bank_account.id}})
			}
		};
		
	},	

	// // Instancing the find by id method.
	// async findById(id : string) {

	// 	// Defining the user data variable.
	// 	const data = await user.findById(id);
		
	// 	// Returning success or error response depending on got data from database.
	// 	if(data) {

	// 		// Returning the got user data with its account confirmation status.
	// 		return {
	// 			status: 200, 
	// 			success: {
	// 				code: success.user_informations_grabbed.code,
	// 				title: success.user_informations_grabbed.title,
	// 				data: data
	// 			}
	// 		};

	// 	} else {

	// 		// If has no user with the provided id, returning an error response.
	// 		return {
	// 			status: 400,
	// 			error: {
	// 				code: errors.user_not_found.code,
	// 				title: errors.user_not_found.title,
	// 				description: errors.user_not_found.description,
	// 				source: {
	// 					pointer: __filename,
	// 					line: getCurrentLine().line
	// 				}
	// 			}
	// 		};

	// 	}

	// },

};