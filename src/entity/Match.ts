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
import { MatchStatus, MatchType } from "util/Enums";
import { MatchUserApplication } from "./MatchUserApplication";
import { Team } from "./Team";
import { User } from "./User";

@Entity()
export class Match extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ enum: MatchType })  
    type!: MatchType;

    @Column({ nullable: true })
    description!: string;

    @Column()
    startAt!: string;

    @Column()
    duration!: number;

    @Column()
    fee!: number;

    @Column({ nullable: true })
    phone!: string;

    @Column()
    quota!: number;

    @Column({ enum: MatchStatus })
    status!: MatchStatus;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;

    // Match N : 1 User
    @ManyToOne(type => User, user => user.matches)
    user!: User;

    // Match N : 1 Team
    @ManyToOne(type => Team, team => team.matches)
    team!: Team;

    // Match 1 : 1 Location

    // Match 1 : N MatchUserApplication
    @OneToMany(type => MatchUserApplication, matchUserApplication => matchUserApplication.match)
    matchUserApplications!: MatchUserApplication[];

    // Match 1 : N MatchTeamApplication

}