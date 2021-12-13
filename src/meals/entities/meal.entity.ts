import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('meals')
export class Meal{  
    @PrimaryGeneratedColumn('uuid') 
    id: string

    @Column()
    procedure_txt: string;

    @Column({default: 'SYSTEM'})
    owner: string;

    @CreateDateColumn()
    created_at: Date;
}