import {
    BaseEntity,
    Entity, 
    PrimaryGeneratedColumn, 
    Column,
    CreateDateColumn,
    UpdateDateColumn, 
    ManyToOne, 
    OneToMany, 
    OneToOne, 
    JoinColumn
} from "typeorm";
import { MatchStatus, MatchType } from "util/Enums";
import { Location } from "./Location";
import { MatchApplication } from "./MatchApplication";
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
    startAt!: Date;

    @Column()
    endAt!: Date;

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

    // Match 1 : 1 Location
    @OneToOne(type => Location)
    @JoinColumn()
    location!: Location;

    // Match 1 : N MatchApplication
    @OneToMany(type => MatchApplication, matchApplication => matchApplication.match)
    matchApplications!: MatchApplication[];
}