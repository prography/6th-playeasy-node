import {
    BaseEntity,
    Entity, 
    PrimaryGeneratedColumn, 
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity()
export class Match extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()  // enum
    type!: string;

    @Column({ nullable: true })
    description!: number;

    @Column()
    startAt!: string;

    @Column()
    endAt!: string;

    @Column()
    fee!: number;

    @Column({ nullable: true })
    phone!: string;

    @Column()
    quota!: number;

    @Column()
    status!: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;
}