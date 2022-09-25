// Importing all require libraries.
import getCurrentLine from "get-current-line";

// Importing all required files.
import { IUser } from "./IUser";
import { isUUID } from "../../../helpers";
import { errors } from "../../constants/errors";
import { User } from "../../../database/entities/User";
import { AppDataSource } from "../../../database/data-source";
import { success } from "../../constants/success";

// Instacing a new user object.
const user = new User;

// Exporting the user service.
export const UserService = {

	// Instacing the create method.
	async store(data : IUser) {

		// Checking if user is already registered.
		if(await user.isUserAlreadyRegistered(data)) {

			// If user is already registered, returning an error response.
			return {
				status: 400,
				error: {
					code: errors.user_already_registered.code,
					title: errors.user_already_registered.title,
					description: errors.user_already_registered.description,
					source: {
						pointer: __filename,
						line: getCurrentLine().line
					}
				}
			};

		} else {

			// If user isn't already registered, creating the user in database.
			const created_user = await user.store(data);

			// Returning the created user with its account confirmation status.
			return {
				status: 201, 
				success: {
					code: success.user_created.code,
					title: success.user_created.title,
					data: await AppDataSource.getRepository(User).findOne({where: {id: created_user.id}, relations: ["account_confirmation_status","role"]})
				}
			};
		
		}

		
		
	},

	// Instancing the find by id method.
	async findById(id : string) {

		// Defining the user data variable.
		const data = await user.findById(id);
		
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

	},

};