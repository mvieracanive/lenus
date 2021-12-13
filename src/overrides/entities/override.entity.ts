import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('overrides')
export class OverridenMeals{   
    //@ManyToOne(() => Meal, { nullable: false, onDelete: 'CASCADE' })
    @PrimaryColumn()
    //@JoinColumn({ name: 'id_meal' })
    id: string

    @PrimaryColumn({type:'varchar', length: 5})
    locale: string;

    @PrimaryColumn()
    coach: string;

    @Column()
    procedure_txt: string;

    @Column()
    name: string;
    
    @CreateDateColumn()
    created_at: Date;
}