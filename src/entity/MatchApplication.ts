import {
    BaseEntity,
    Entity, 
    PrimaryGeneratedColumn, 
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity()
export class MatchApplication extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    quota!: number;

    @Column()
    status!: number;

    @Column()  // enum
    type!: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;
}