import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { PrismaService } from "src/Prisma.Service";

@Module({
    controllers: [UserController],
    providers: [PrismaService]
})
export class UserModule { }