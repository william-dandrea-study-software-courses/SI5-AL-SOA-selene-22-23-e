import {Injectable, Logger} from '@nestjs/common';
import {RotationMissionDto} from '../dto/rotation-mission.dto';
import {SpacecraftIdDto} from "../dto/spacecraft-id.dto";
import {Kafka} from "kafkajs";
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import {RotationMission, RotationMissionDocument} from "../schemas/rotation-mission.schema";
import {RotationMissionNotExistException} from "../exceptions/rotation-mission-not-exist.exception";
import {SpacecraftDestroyed} from "../dto/event/spacecraft-destroyed";

@Injectable()
export class RotationMissionService {
  private readonly logger = new Logger(RotationMissionService.name);

  private kafka = new Kafka({
    clientId: 'rotation-mission',
    brokers: ['kafka-service:9092']
  })

  constructor(
      @InjectModel(RotationMission.name)
      private rotationMissionModel: Model<RotationMissionDocument>
  ) {}

  async retrieveRotationMissions(): Promise<RotationMissionDto[]> {
    return this.rotationMissionModel.find().lean();
  }

  async createMission(rotationMissionDto: RotationMissionDto): Promise<any> {
    return await this.rotationMissionModel.create(rotationMissionDto);
  }

  async affectSpacecraft(rotationMissionId: string, spacecraft_id_dto: SpacecraftIdDto){
    let rotationMission = await this.rotationMissionModel.findOne({_id: rotationMissionId});
    if(rotationMission === null){
      throw new RotationMissionNotExistException(rotationMissionId);
    }

    rotationMission.spacecraft_id = spacecraft_id_dto.spacecraft_id;
    await rotationMission.save()
    const producer = await this.kafka.producer()

    // Producing
    await producer.connect()
    await producer.send({
      topic: 'spacecraft-assigned',
      messages: [
        { value:'{ spacecraft_id:'+ rotationMission.spacecraft_id +', rotation_mission_id: '+ rotationMission._id +' }'},
      ],
    });
    await producer.disconnect();

    return rotationMission
  }


  async spacecraft_has_been_destroyed(spacecraftDestroyedEvent: SpacecraftDestroyed){
    let rotationMission = await this.rotationMissionModel.findOne({_id: spacecraftDestroyedEvent.rotationMission_id});
    if(rotationMission === null){
      throw new RotationMissionNotExistException(spacecraftDestroyedEvent.rotationMission_id);
    }
    const message = "{\"astronauts\":" + rotationMission.astronauts.toString() +"}";
    this.logger.log(message);
    this.emitKafkaEvent("rotation_failed", message);
    const impactedMissions = await this.rotationMissionModel.find({spacecraft_id: spacecraftDestroyedEvent.spacecraft_id});
    for(const mission of impactedMissions) {
      mission.spacecraft_id = null;
      mission.save();
    }
  }

  private async emitKafkaEvent(topic: string, message: string) {
    const producer = await this.kafka.producer();

    // Producing
    await producer.connect();
    this.logger.log("Send failed rotation Missino");
    await producer.send({
      topic: topic,
      messages: [
        { value: message },
      ],
    });
    await producer.disconnect();
  }
}
