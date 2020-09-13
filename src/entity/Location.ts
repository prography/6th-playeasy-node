import {
    BaseEntity,
    Entity, 
    PrimaryGeneratedColumn, 
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity()
export class Location extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    latitude!: number;

    @Column()
    longitude!: number;

    @Column()
    name!: string;

    @Column()
    address!: string;

    @Column()
    detail!: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;
}