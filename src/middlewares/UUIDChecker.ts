// Importing all required libraries.
import { Request, Response, NextFunction } from "express";

// Importing all required files.
import { isUUID } from "../helpers";
import getCurrentLine from "get-current-line";
import { errors } from "../api/constants/errors";

// Instacing the UUIDChecker middleware.
export async function UUIDChecker(req: Request, res: Response, next: NextFunction) {

	// Checking if the provided ID is an UUID.
	if(isUUID(req.params.id)) {

		next();
	
	} else {
	
		// Returning an error response if the provided id is'nt an UUID.
		res.status(400).json({
			status: 400,
			error: {
				code: errors.invalid_parameter_id_schema.code,
				title: errors.invalid_parameter_id_schema.title,
				description: errors.invalid_parameter_id_schema.description,
				source: {
					pointer: __filename,
					line: getCurrentLine().line
				}
			}
		});
	
	}

}