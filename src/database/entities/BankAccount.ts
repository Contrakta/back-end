import { Entity, Column, PrimaryColumn, CreateDateColumn, OneToOne, UpdateDateColumn, BeforeInsert, OneToMany, JoinColumn, ManyToOne } from "typeorm";
import { randomUUID } from "crypto";
import { AppDataSource } from "../data-source";
import { User } from "./User";
import { PaymentMethod } from "./PaymentMethod";

@Entity("bank_account")
export class BankAccount {

    @PrimaryColumn({type: "uuid", nullable: false})
	id: string;

	@Column({type: "varchar", nullable: true})
	compe_code: string;

	@Column({type: "varchar", nullable: true})
	bank_name: string;

	@Column({type: "varchar", nullable: true})
	branch_code: string;

	@Column({type: "varchar", nullable: true})
	number?: string;

	@Column({type: "varchar", nullable: false})
	check_digit: string;

	@CreateDateColumn({type: "timestamp", nullable: false})
	created_at?: Date;

	@UpdateDateColumn({type: "timestamp", nullable: false})
	updated_at?: Date;

	@ManyToOne(() => User, user => user.bank_account, {nullable: false, createForeignKeyConstraints: true, onDelete: "CASCADE", onUpdate: "CASCADE"})
	user: User;

	@OneToMany(() => PaymentMethod, payment_method => payment_method.bank_account)
	payment_method: PaymentMethod;

	@BeforeInsert()
	setId() {

		this.id = randomUUID();
	
	}

	async store(data) {

		// Instacing a new user object.
		let bank_account = new BankAccount;

		bank_account.compe_code = data.compe_code;
		bank_account.bank_name = data.bank_name;
		bank_account.branch_code = data.branch_code;
		bank_account.number = data.number;
		bank_account.check_digit = data.check_digit;
		bank_account.user = data.customer;

		// Saving the created user in the database.
		bank_account = await AppDataSource.getRepository(BankAccount).save(bank_account);

		// Returning the created user
		return bank_account;

	}

	async findById(id : string) {

		// Getting the user with the entered id.
		const data = await AppDataSource.getRepository(BankAccount).findOne({
			where: {
				id
			},
		});

		// Returning the found data.
		return data;

	}

}