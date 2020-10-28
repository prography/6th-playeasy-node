import {
    BaseEntity,
    Entity, 
    PrimaryGeneratedColumn, 
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne
} from "typeorm";
import { ApplicationStatus, ApplicationType } from "util/Enums";
import { Match } from "./Match";
import { User } from "./User";

@Entity()
export class MatchApplication extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    quota!: number;

    @Column()
    type!: ApplicationType;
    
    @Column({ enum: ApplicationStatus })
    status!: ApplicationStatus;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;
    
    // MatchApplication N : 1 User
    @ManyToOne(type => User, user => user.matchApplications)
    user!: User;

    // MatchApplication N : 1 Match
    @ManyToOne(type => Match, match => match.matchApplications)
    match!: Match;
}
