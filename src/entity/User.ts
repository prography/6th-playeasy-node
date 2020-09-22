import {
    BaseEntity,
    Entity, 
    PrimaryGeneratedColumn, 
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";

export enum Level {
    LOW = "LOW",
    MIDDLE = "MEDIUM",
    HIGH = "HIGH",
}

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

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;
}
