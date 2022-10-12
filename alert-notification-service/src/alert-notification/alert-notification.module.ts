import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";

import {Alert, AlertSchema} from './schemas/alert.schema';

import { AlertNotificationController } from './controllers/alert-notification.controller';
import { AlertNotificationService } from './services/alert-notification.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Alert.name, schema: AlertSchema }])],
  controllers: [AlertNotificationController],
  providers: [AlertNotificationService],
})
export class AlertNotificationModule {}