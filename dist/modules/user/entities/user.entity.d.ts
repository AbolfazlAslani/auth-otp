import { otpEntity } from "./otp.entity";
export declare class UserEntity {
    id: number;
    first_name: string;
    last_name: string;
    mobile: string;
    mobile_verify: boolean;
    createdAt: Date;
    updatedAt: Date;
    otpId: number;
    otp: otpEntity;
}
