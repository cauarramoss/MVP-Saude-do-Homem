import { Exclude } from "class-transformer";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;


    @Column()
    name: string;

    @Column({ unique: true })
    username: string;

    @Column()
    email: string;

    @Column()
    @Exclude({ toPlainOnly: true })
    password: string;

    @Column({ type: 'float', nullable: true })
    height: number;

    @Column({ type: 'float', nullable: true })
    weight: number;

    @Column({ type: 'integer', nullable: true })
    age: number;

}