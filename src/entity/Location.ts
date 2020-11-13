import {
    BaseEntity,
    Entity, 
    PrimaryGeneratedColumn, 
    Column,
} from "typeorm";

@Entity()
export class Location extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    mapId!: number;

    @Column()
    placeName!: string;

    @Column()
    addressName!: string;

    @Column({ nullable: true })
    placeDetail!: string;
}
