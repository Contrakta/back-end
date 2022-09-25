// Importing all required libraries.
import getCurrentLine from "get-current-line";
import { Request, Response, NextFunction } from "express";

// Importing all required files.
import { UserService } from "./UserService";
import { errors } from "../../constants/errors";

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