import { Entity, Column, PrimaryColumn, CreateDateColumn, OneToOne, UpdateDateColumn, BeforeInsert, OneToMany, JoinColumn, ManyToOne } from "typeorm";
import { randomUUID } from "crypto";
import { AppDataSource } from "../data-source";
import { IUser } from "../../api/useCases/User/IUser";

@Entity("user")
export class User {

    @PrimaryColumn({type: "uuid", nullable: false})
	id: string;

	@Column({type: "varchar", nullable: true})
	first_name?: string;

	@Column({type: "varchar", nullable: true})
	last_name?: string;

	@Column({type: "date", nullable: true})
	date_of_birth?: Date;

	@Column({type: "varchar", nullable: false})
	email_address: string;

	@Column({type: "varchar", nullable: true})
	phone_number?: string;

	@Column({type: "varchar", nullable: true})
	cpf?: string;

	@CreateDateColumn({type: "timestamp", nullable: false})
	created_at?: Date;

	@UpdateDateColumn({type: "timestamp", nullable: false})
	updated_at?: Date;

	@BeforeInsert()
	setId() {

		this.id = randomUUID();
	
	}

	async isUserAlreadyRegistered(data: IUser) {

		// Instacing a new user object.
		const user = new User;

		// Setting up the instancied user email address as the received email address.
		user.email_address = data.email_address;

		// Checking if user is already registered.
		const isUserAlreadyRegistered = await AppDataSource.getRepository(User).findOneBy({email_address: user.email_address});

		// Returning if user is already registered or not.
		return Boolean(isUserAlreadyRegistered);

	}

	async store(data : IUser) {

		// Instacing a new user object.
		let user = new User;

		// Setting up the instancied user email address as the received email address.
		user.email_address = data.email_address;


		// Saving the created user in the database.
		user = await AppDataSource.getRepository(User).save(user);

		// Returning the created user
		return user;

	}

	async findById(id : string) {

		// Getting the user with the entered id.
		const data = await AppDataSource.getRepository(User).findOne({
			where: {
				id
			},
		});

		// Returning the found data.
		return data;

	}

}