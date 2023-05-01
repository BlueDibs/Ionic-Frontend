import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { PrismaService } from "src/Prisma.Service";
import { PassportModule } from "@nestjs/passport";

@Module({
    imports: [],
    controllers: [UserController],
    providers: [PrismaService]
})
export class UserModule { }