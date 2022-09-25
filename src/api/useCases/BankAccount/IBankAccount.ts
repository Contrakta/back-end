import { User } from "../../../database/entities/User";

export interface IBankAccount {

	id?: string;
	compe_code?: string;
	bank_name?: string;
	branch_code?: string;
	number?: Date;
	check_digit?: string;
	created_at?: Date;
	updated_at?: Date;
	customer?: User;
    
}