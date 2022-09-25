import { Entity, Column, PrimaryColumn, CreateDateColumn, OneToOne, UpdateDateColumn, BeforeInsert, OneToMany, JoinColumn, ManyToOne } from "typeorm";
import { randomUUID } from "crypto";
import { AppDataSource } from "../data-source";
import { User } from "./User";
import { Contract } from "./Contract";
import { BankAccount } from "./BankAccount";

@Entity("payment_method")
export class PaymentMethod {

    @PrimaryColumn({type: "uuid", nullable: false})
	id: string;

	@Column({type: "float", nullable: true})
	percentage?: number;

	@Column({type: "float", nullable: true})
	value?: number;

	@CreateDateColumn({type: "timestamp", nullable: false})
	created_at?: Date;

	@UpdateDateColumn({type: "timestamp", nullable: false})
	updated_at?: Date;

	@ManyToOne(() => Contract, contract => contract.payment_method)
	contract?: Contract;

	@ManyToOne(() => BankAccount, bank_account => bank_account.payment_method)
	bank_account?: BankAccount;

	@BeforeInsert()
	setId() {

		this.id = randomUUID();
	
	}

	async store(data) {

		// Instacing a new payment method object.
		let payment_method = new PaymentMethod;

		// Setting up its values.
		payment_method.percentage = data.percentage;
		payment_method.value = data.value;

		// Saving the created user in the database.
		payment_method = await AppDataSource.getRepository(PaymentMethod).save(payment_method);

		// Returning the created user
		return payment_method;

	}

	async findById(id : string) {

		// Getting the user with the entered id.
		const data = await AppDataSource.getRepository(PaymentMethod).findOne({
			where: {
				id
			},
		});

		// Returning the found data.
		return data;

	}

}