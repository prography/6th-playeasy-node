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
import { User } from "./User";

@Entity()
export class MatchUserApplication extends BaseEntity {
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
    
    // MatchUserApplication N : 1 User
    @ManyToOne(type => User, user => user.matchUserApplications)
    user!: User;

    // MatchUserApplication N : 1 Match

}
