import { Meal } from "../../meals/entities/meal.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('meal_i18n')
export class I18nMeal{  
    @ManyToOne(() => Meal, { nullable: false, onDelete: 'CASCADE', primary:true })
    @JoinColumn({ name: 'id' })
    id: string

    @PrimaryColumn({type:'varchar', length: 5})
    locale: string;

    @Column()
    procedure_txt?: string;

    @Column()
    name: string;
    
    @CreateDateColumn()
    created_at: Date;
}