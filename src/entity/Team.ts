import {
    BaseEntity,
    Entity, 
    PrimaryGeneratedColumn, 
    Column,
    CreateDateColumn,
    UpdateDateColumn,, ManyToOne, OneToMany
} from "typeorm";
import { User } from "./User";

@Entity()
export class Team extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: true })
    name!: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;

    // Team 1 : N User


    // Team 1 : N Match
    // Team 1 : N MatchTeamApplication
}
