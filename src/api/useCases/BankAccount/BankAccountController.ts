// Importing all required libraries.
import getCurrentLine from "get-current-line";
import { Request, Response, NextFunction } from "express";

// Importing all required files.
// import { UserService } from "./UserService";
import { errors } from "../../constants/errors";
import { BankAccountService } from "./BankAccountService";
import axios from "axios";
import { AppDataSource } from "../../../database/data-source";
import { User } from "../../../database/entities/User";

// Instacing the user controller.
export const BankAccountController = {

	async store(req : Request, res : Response, next : NextFunction) {

		const customer = await AppDataSource.getRepository(User).findOneBy({id: req.body.customer_id});

		try {

			const response = await BankAccountService.store({
				compe_code: req.body.compe_code,
				bank_name: req.body.bank_name,
				branch_code: req.body.branch_code,
				number: req.body.number,
				check_digit: req.body.check_digit,
				customer
			});

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
    
	// async findById(req : Request, res : Response, next ?: NextFunction) {

	// 	try {

	// 		const response = await UserService.findById(req.params.id);

	// 		return res.status(response.status).json(response);
		
	// 	} catch(error) {

	// 		console.log(error);

	// 		return res.status(500).json({
	// 			status: 500,
	// 			error: {
	// 				code: errors.internal_server_error.code,
	// 				title: errors.internal_server_error.title,
	// 				description: errors.internal_server_error.description,
	// 				source: {
	// 					pointer: __filename,
	// 					line: getCurrentLine().line
	// 				}
	// 			}
	// 		});
		
	// 	}
	
	// },

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