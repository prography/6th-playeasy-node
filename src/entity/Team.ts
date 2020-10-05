import {
    BaseEntity,
    Entity, 
    PrimaryGeneratedColumn, 
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany
} from "typeorm";
import { Match } from "./Match";
import { MatchTeamApplication } from "./MatchTeamApplication";
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
    @OneToMany(type => User, user => user.team)
    users!: User[];
    
    // Team 1 : N Match
    @OneToMany(type => Match, match => match.team)
    matches!: Match[];
    
    // Team 1 : N MatchTeamApplication
    @OneToMany(type => MatchTeamApplication, matchTeamApplication => matchTeamApplication.team)
    matchTeamApplications!: MatchTeamApplication[];
}
