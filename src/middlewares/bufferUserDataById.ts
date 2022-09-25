import { Request, Response, NextFunction } from "express";
import getCurrentLine from "get-current-line";
import { errors } from "../api/constants/errors";
import { User } from "../database/entities/User";

const user = new User;

export async function bufferUserDataById(req : Request, res : Response, next : NextFunction) {

	// Defining the user data variable.
	const data = await user.findById(req.params.id);
		
	// Proceeding to next middleware or send an error response depending on got data from database.
	if(data) {

		req.user = data;
		next();

	} else {

		// If has no user with the provided id, returning an error response.
		res.status(400).json({
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
		});

	}

}