import { Contract } from "../../../database/entities/Contract";
import { User } from "../../../database/entities/User";

export interface IProduct {

	id?: string;
	segment?: string;
	plan?: string;
	description?: string;
	montly_price?: number;
	legal?: string;
	created_at?: Date;
	updated_at?: Date;
	contract?: Contract;
    
}