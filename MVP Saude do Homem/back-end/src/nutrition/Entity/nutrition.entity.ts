import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('nutrition')
export class Nutrition {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  servingSize: string;

  @Column('float')
  calories: number;

  @Column('float')
  protein: number;

  @Column('float')
  carbs: number;

  @Column('float')
  fat: number;

  @Column('float')
  fiber: number;

  @Column('float')
  sugar: number;

  @Column('float')
  sodium: number;
}
