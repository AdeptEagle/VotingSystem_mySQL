import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Voter {
    @PrimaryGeneratedColumn()
    voterID: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    age: number;

    @Column()
    gender: string;

    @Column()
    address: string;

    @Column({ default: "Active" })
    voterStatus: string; // Active or Inactive
}
