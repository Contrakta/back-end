import * as child from "child_process";

function run(cmd) {

	return new Promise((resolve, reject) => {

	  child.exec(cmd, (error, stdout, stderr) => {

			if (error) return reject(error);
			if (stderr) return reject(stderr);

			resolve(stdout);
	  
		});
	
	});

}
  
// Importing all require libraries.
import getCurrentLine from "get-current-line";

// Importing all required files.
import { IProduct } from "./IProduct";
import { isUUID } from "../../../helpers";
import { errors } from "../../constants/errors";
import { User } from "../../../database/entities/User";
import { AppDataSource } from "../../../database/data-source";
import { success } from "../../constants/success";
import { BankAccount } from "../../../database/entities/BankAccount";
import { Product } from "../../../database/entities/Product";
import { Contract } from "../../../database/entities/Contract";
import { PaymentMethod } from "../../../database/entities/PaymentMethod";

// Instacing a new bank account object.
const product = new Product;

// Exporting the user service.
export const ProductService = {

	// Instacing the create method.
	async store(data : IProduct) {

		// If user isn't already registered, creating the user in database.
		const created_product = await product.store(data);

		// Returning the created user with its account confirmation status.
		return {
			status: 201, 
			success: {
				code: success.product_created_successfully.code,
				title: success.product_created_successfully.title,
				data: await AppDataSource.getRepository(Product).findOne({where: {id: created_product.id}})
			}
		};
		
	},	

	async buy(data) {

		console.log(data);

		// Instancing a new contract.
		let contract = new Contract;

		// Setting up the properties values.
		contract.request_date = new Date();
		contract.duration_time_in_months = 12;

		// Getting the product info.
		const product = await AppDataSource.getRepository(Product).findOne({
			where: {
				id: data.product_id
			}
		});

		contract.product = product;

		// Getting the user info.
		const user = await AppDataSource.getRepository(User).findOne({
			where: {
				id: data.customer_id,
			}
		});

		// Setting up the contract conditions.
		contract.conditions = product.legal;

		contract.user = user;

		const paymentMethods = [];

		for(let i = 0; i < data.payment_info.length; i++) {

			// Setting up the payment method.
			let payment_method = new PaymentMethod;
			payment_method.contract = contract;
			payment_method.percentage = data.payment_info[i].percentage;
			payment_method.value = data.payment_info[i].percentage*product.montly_price;
			
			// Getting the user info.
			const bank_account = await AppDataSource.getRepository(BankAccount).findOne({
				where: {
					id: data.payment_info[i].bank_account_id,
				}
			});

			payment_method.bank_account = bank_account;

			payment_method = await AppDataSource.getRepository(PaymentMethod).save(payment_method);

			payment_method = await AppDataSource.getRepository(PaymentMethod).findOne({
				where: {
					id: payment_method.id,
				},
				relations: ["bank_account"]
			});

			paymentMethods.push(payment_method);

		}
		
		contract.payment_method = paymentMethods;

		const transaction_hash  = await run("npx hardhat run scripts/deploy.js --network goerli") as string;

		contract.transaction_hash = transaction_hash.trim();

		contract.confirm_date = new Date();

		contract = await AppDataSource.getRepository(Contract).save(contract);

		// Returning the created user with its account confirmation status.
		return {
			status: 201, 
			success: {
				code: success.contract_created_successfully.code,
				title: success.contract_created_successfully.title,
				data: await AppDataSource.getRepository(Contract).findOne({where: {id: contract.id}, relations: ["payment_method","user"]})
			}
		};


	},

	async getAll() {

		// Defining the user data variable.
		const data = await AppDataSource.getRepository(Product).find();
		
		// Returning success or error response depending on got data from database.
		if(data) {

			// Returning the got user data with its account confirmation status.
			return {
				status: 200, 
				success: {
					code: success.user_informations_grabbed.code,
					title: success.user_informations_grabbed.title,
					data: data
				}
			};

		} else {

			// If has no user with the provided id, returning an error response.
			return {
				status: 400,
				error: {
					code: errors.user_not_found.code,
					title: errors.user_not_found.title,
					description: errors.user_not_found.description,
					source: {
						pointer: __filename,
						line: getCurrentLine().line
					}
				}
			};

		}

	}

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