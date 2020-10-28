import {
    BaseEntity,
    Entity, 
    PrimaryGeneratedColumn, 
    Column,
    CreateDateColumn,
    UpdateDateColumn, 
    ManyToOne, 
    OneToMany
} from "typeorm";
import { Level } from "util/Enums";
import { Match } from "./Match";
import { MatchApplication } from "./MatchApplication";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: true })
    name!: string;

    @Column({ nullable: true })
    age!: number;

    @Column()
    email!: string;

    @Column()
    socialType!: string;

    @Column({ nullable: true })
    phone!: string;

    @Column({ nullable: true, enum: Level })  
    level!: Level;

    @Column({ nullable: true })
    description!: string;

    @Column({ nullable: true })
    picture!: string;

    @Column({ nullable: true })
    teamName!: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;
    
    // user 1 : N Match
    @OneToMany(type => Match, match => match.user)
    matches!: Match[];

    // User 1 : N MatchUserApplication
    @OneToMany(type => MatchApplication, matchApplication => matchApplication.user)
    matchApplications!: MatchApplication[];
}
