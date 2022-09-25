import { Entity, Column, PrimaryColumn, CreateDateColumn, OneToOne, UpdateDateColumn, BeforeInsert, OneToMany, JoinColumn, ManyToOne } from "typeorm";
import { randomUUID } from "crypto";
import { AppDataSource } from "../data-source";
import { User } from "./User";
import { Contract } from "./Contract";

@Entity("product")
export class Product {

    @PrimaryColumn({type: "uuid", nullable: false})
	id: string;

	@Column({type: "varchar", nullable: true})
	segment: string;

	@Column({type: "varchar", nullable: true})
	plan: string;

	@Column({type: "varchar", nullable: true})
	description: string;

	@Column({type: "float", nullable: true})
	montly_price?: number;

	@CreateDateColumn({type: "timestamp", nullable: false})
	created_at?: Date;

	@UpdateDateColumn({type: "timestamp", nullable: false})
	updated_at?: Date;

	@OneToMany(() => Contract, contract => contract.product, {nullable: false, createForeignKeyConstraints: true, onDelete: "CASCADE", onUpdate: "CASCADE"})
	contract: Contract;

	@BeforeInsert()
	setId() {

		this.id = randomUUID();
	
	}

	async store(data) {

		// Instacing a new user object.
		let product = new Product;

		product.segment = data.segment;
		product.plan = data.plan;
		product.description = data.description;
		product.montly_price = data.montly_price;

		// Saving the created user in the database.
		product = await AppDataSource.getRepository(Product).save(product);

		// Returning the created user
		return product;

	}

	async findById(id : string) {

		// Getting the user with the entered id.
		const data = await AppDataSource.getRepository(Product).findOne({
			where: {
				id
			},
		});

		// Returning the found data.
		return data;

	}

}