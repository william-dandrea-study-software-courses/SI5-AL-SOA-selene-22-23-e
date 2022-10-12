import {Injectable} from '@nestjs/common';
import { Model} from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import {Alert, AlertDocument} from '../schemas/alert.schema';
import {AlertDto} from "../dto/alert.dto";

@Injectable()
export class AlertNotificationService {

  constructor(@InjectModel(Alert.name) private alertModel: Model<AlertDocument>) {}

  async getAlerts(): Promise<AlertDto[]> {
    return this.alertModel.find().then(alerts => {
      let response : AlertDto[]=[];
      alerts.forEach(evaMission => {
        let dto = new AlertDto();
        dto.id_alert = evaMission.id_alert;
        dto.message = evaMission.message;
        dto.type = evaMission.type;
        response.push(dto);
      })
      return response;
    });
  }

  async postAlert(alertDTO: AlertDto): Promise<AlertDto> {
    const alreadyExists = await this.alertModel.find({ id_alert: alertDTO.id_alert });
    return await this.alertModel.create(alertDTO);
  }
}