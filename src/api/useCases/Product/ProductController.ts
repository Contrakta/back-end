// Importing all required libraries.
import getCurrentLine from "get-current-line";
import { Request, Response, NextFunction } from "express";

// Importing all required files.
import { errors } from "../../constants/errors";
import { AppDataSource } from "../../../database/data-source";
import { User } from "../../../database/entities/User";
import { ProductService } from "./ProductService";

// Instacing the user controller.
export const ProductController = {

	async store(req : Request, res : Response, next : NextFunction) {

		try {

			const response = await ProductService.store({
				segment: req.body.segment,
				plan: req.body.plan,
				description: req.body.description,
				montly_price: req.body.montly_price,
				legal: req.body.legal
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

	async buy(req : Request, res : Response, next : NextFunction) {

		try {

			const response = await ProductService.buy({
				product_id: req.params.product_id,
				customer_id: req.body.customer_id,
				payment_info: req.body.payment_info
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

	}
    
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