// Importing all required libraries.
import Joi from "joi";

// Defining a helper function.
function isUUID(id : string) {
	
	if(Joi.string().guid().validate(id).error) {

		return false;
	
	}

	return true;

}

export { isUUID };