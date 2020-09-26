import {
    BaseEntity,
    Entity, 
    PrimaryGeneratedColumn, 
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";

export enum MatchType {
    SOCCER = "SOCCER",
    FUTSAL5 = "FUTSAL5", 
    FUTSAL6 = "FUTSAL6",
}

export enum MatchStatus {
    WAITING = "WAITING",
    CONFIRMED = "CONFIRMED",
    DENIED = "DENIED",
    CANCEL = "CANCEL",
}

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
}