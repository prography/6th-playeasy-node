import {
    BaseEntity,
    Entity, 
    PrimaryGeneratedColumn, 
    Column,
    CreateDateColumn,
    UpdateDateColumn, 
    ManyToOne
} from "typeorm";
import { ApplicationStatus } from "util/Enums";
import { Match } from "./Match";
import { Team } from "./Team";

@Entity()
export class MatchTeamApplication extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    quota!: number;
    
    @Column({ enum: ApplicationStatus })
    status!: ApplicationStatus;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;

    // MatchTeamApplication N : 1 Match
    @ManyToOne(type => Match, match => match.matchUserApplications)
    match!: Match;

    // MatchTeamApplication N : 1 Team
    @ManyToOne(type => Team, team => team.matchTeamApplications)
    team!: Team;
}
