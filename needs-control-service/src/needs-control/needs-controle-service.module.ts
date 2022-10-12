import { Module } from "@nestjs/common";
import { NeedsControlServiceController } from "./controllers/needs-control-service.controller";
import { NeedsControlService } from "./services/needs-control.service";
import { HttpModule } from "@nestjs/axios";
import { MongooseModule } from "@nestjs/mongoose";
import { Needs, NeedsSchema } from "./schemas/status-life-module.schema";

@Module({
  controllers: [NeedsControlServiceController],
  providers: [NeedsControlService],
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: Needs.name, schema: NeedsSchema }]),
  ],
})
export class NeedsControleServiceModule {}
