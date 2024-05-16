import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn("increment")
    id: number;
    
    @Column()
    first_name : string;
    
    @Column()
    last_name : string
    
    @Column()
    mobile : string;
    
    @Column({default : false})
    mobile_verify : boolean;
    
    @CreateDateColumn()
    createdAt : Date;
    
    @UpdateDateColumn()
    updatedAt : Date;

}
