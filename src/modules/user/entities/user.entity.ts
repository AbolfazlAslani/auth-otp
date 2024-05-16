import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { otpEntity } from "./otp.entity";

@Entity("user")
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
    
    @Column()
    otpId : number;
    
    
    @OneToOne(() => otpEntity, (otp) => otp.user)
    @JoinColumn({name:"otpId"})
    otp : otpEntity;

}
