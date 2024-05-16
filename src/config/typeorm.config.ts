import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

@Injectable()
export class TypeOrmConfig implements TypeOrmOptionsFactory{

    constructor(private configService : ConfigService){}
    createTypeOrmOptions(connectionName?: string): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    
        return {
            type:'postgres',
            database : this.configService.get("Db.database"),
            port: this.configService.get("Db.port"),
            username: this.configService.get('Db.username'),
            password: this.configService.get('Db.password'),
            host: this.configService.get('Db.host'),
            synchronize : true,
            autoLoadEntities:false,
            entities: [
                "dist/**/**/**/*.entity{.ts,.js}",
                "dist/**/**/*.entity{.ts,.js}"

            ]
       
        
        }
    }

}