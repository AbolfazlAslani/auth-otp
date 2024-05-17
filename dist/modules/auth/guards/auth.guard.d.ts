import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Request } from "express";
import { AuthService } from "../auth.service";
export declare class authGuard implements CanActivate {
    private authService;
    constructor(authService: AuthService);
    canActivate(context: ExecutionContext): Promise<boolean>;
    protected extractToken(request: Request): string;
}
