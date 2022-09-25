import { Entity, Column, PrimaryColumn, CreateDateColumn, OneToOne, UpdateDateColumn, BeforeInsert, OneToMany, JoinColumn, ManyToOne } from "typeorm";
import { randomUUID } from "crypto";
import { AppDataSource } from "../data-source";
import { User } from "./User";
import { Product } from "./Product";
import { PaymentMethod } from "./PaymentMethod";

@Entity("contract")
export class Contract {

    @PrimaryColumn({type: "uuid", nullable: false})
	id: string;

	@Column({type: "varchar", nullable: true})
	transaction_hash: string;

	@Column({type: "date", nullable: true})
	request_date: Date;

	@Column({type: "date", nullable: true})
	confirm_date: Date;

	@Column({type: "int", nullable: true})
	duration_time_in_months?: number;

	@Column({type: "varchar", nullable: true})
	conditions: string;

	@CreateDateColumn({type: "timestamp", nullable: false})
	created_at?: Date;

	@UpdateDateColumn({type: "timestamp", nullable: false})
	updated_at?: Date;

	@ManyToOne(() => Product, product => product.contract, {nullable: false, createForeignKeyConstraints: true, onDelete: "CASCADE", onUpdate: "CASCADE"})
	product: Product;

	@ManyToOne(() => User, user => user.contract)
	user: User;

	@OneToOne(() => PaymentMethod, payment_method => payment_method.contract)
	payment_method;

	@BeforeInsert()
	setId() {

		this.id = randomUUID();
	
	}

	async store(data) {

		// Instacing a new contract object.
		let contract = new Contract;

		// Setting up its values.
		contract.transaction_hash = data.transaction_hash;
		contract.request_date = data.request_date;
		contract.confirm_date = data.confirm_date;
		contract.duration_time_in_months = data.duration_time_in_months;
		contract.conditions = data.conditions;

		// Saving the created user in the database.
		contract = await AppDataSource.getRepository(Contract).save(contract);

		// Returning the created user
		return contract;

	}

	async findById(id : string) {

		// Getting the user with the entered id.
		const data = await AppDataSource.getRepository(Contract).findOne({
			where: {
				id
			},
		});

		// Returning the found data.
		return data;

	}

}