import {HttpException, HttpStatus, Injectable, Logger} from "@nestjs/common";
import {Model} from "mongoose";
import {InjectModel, Prop} from "@nestjs/mongoose";
import {Kafka} from "kafkajs";
import {Spacesuit, SpacesuitDocument} from "../schemas/spacesuit.schema";

import {SpacesuitCreationDTO, SpacesuitDTO} from "../dto/spacesuit.dto";
import {SpacesuitAlreadyExistException} from "../exceptions/spacesuit-already-exist.exception";
import {SpacesuitVitals, SpacesuitVitalsDocument} from "../schemas/spacesuit-vitals.schema";
import {SpacesuitVitalsDto} from "../dto/spacesuit-vitals.dto";

@Injectable()
export class SpacesuitService {
    private readonly logger = new Logger(SpacesuitService.name);

    private kafka = new Kafka({
        clientId: "spacesuit",
        brokers: ["kafka-service:9092"],
    });

    constructor(
        @InjectModel(Spacesuit.name) private spacesuitModel: Model<SpacesuitDocument>,
        @InjectModel(SpacesuitVitals.name) private spacesuitVitalsModel: Model<SpacesuitVitalsDocument>
    ) {}

    async getSpacesuits(): Promise<Spacesuit[]> {
        return this.spacesuitModel.find().then((spacesuits) => {
            return spacesuits;
        });
    }

    async getSpacesuit(spacesuitId: number): Promise<SpacesuitDTO> {
        const spacesuit = await this.spacesuitModel.findOne({
            id_spacecraft: spacesuitId,
        });
        if (spacesuit === null) {
            throw new HttpException("spaceCraft not found", HttpStatus.NOT_FOUND);
        }
        return spacesuit;
    }

    async createSpacesuit(spacesuitCreationDTO: SpacesuitCreationDTO): Promise<Spacesuit> {
        const alreadyExists = await this.spacesuitModel.find({
            id_spacesuit: spacesuitCreationDTO.id_spacesuit,
        });
        if (alreadyExists.length > 0) {
            throw new SpacesuitAlreadyExistException(spacesuitCreationDTO.id_spacesuit);
        }

        const newSpaceSuit: Spacesuit = {
            id_spacesuit: spacesuitCreationDTO.id_spacesuit,
            id_astronaut: null,
            current_vitals: null,
        }

        return await this.spacesuitModel.create(newSpaceSuit);
    }

    async affectAstronautToSpacesuit(spacesuitId: number, id_astronaut: number) {
        const spacesuit = await this.spacesuitModel.findOne({id_spacesuit: spacesuitId}).exec();
        if (spacesuit === null) {
            throw new HttpException(`Any spacesuit with ID ${spacesuitId} found, please create the spacesuit before`, 400)
        }

        spacesuit.id_astronaut = id_astronaut;
        return await spacesuit.save();
    }

    async removeAstronautFromSpacesuit(spacesuitId: number, id_astronaut: number) {
        const spacesuit = await this.spacesuitModel.findOne({id_spacesuit: spacesuitId}).exec();
        if (spacesuit === null) {
            throw new HttpException(`Any spacesuit with ID ${spacesuitId} found, please create the spacesuit before`, 400)
        }

        spacesuit.id_astronaut = null;
        return await spacesuit.save();
    }

    async startMission(spacesuitId: number) {}

    async finishMission(spacesuitId: number) {}

    async updateVitals(spacesuitId: number, vitals: SpacesuitVitals) {
        const spacesuit = await this.spacesuitModel.findOne({id_spacesuit: spacesuitId}).exec();
        if (spacesuit === null) {
            throw new HttpException(`Any spacesuit with ID ${spacesuitId} found, please create the spacesuit before`, 400)
        }

        spacesuit.current_vitals = await this.spacesuitVitalsModel.create(vitals);
        const spacesuitResult = await spacesuit.save()

        await this.sendMessageToBus("spacesuits_topic", "spacesuit_metrics", spacesuitResult)

        return spacesuitResult;
    }




    /*
async editSpacesuit(spacesuitDTO: SpacesuitDTO, id_spacesuit: number): Promise<SpacesuitDTO> {
    const spacesuit = await this.spacesuitModel.findOne({id_spacesuit: id_spacesuit,});

    spacesuit.cardiac_rythm = spacesuitDTO.cardiac_rythm;
    spacesuit.o2_rate = spacesuitDTO.o2_rate;
    spacesuit.temperature = spacesuitDTO.temperature;
    spacesuit.pressure = spacesuitDTO.pressure;
    spacesuit.power = spacesuitDTO.power;


    if (spacesuit.o2_rate < 80 || spacesuit.temperature < 10 || spacesuit.power < 10) {
        await this.sendMessageToBus("problem-spacesuit", "spacesuit-problem", '{"o2_rate" :' + spacesuitDTO.o2_rate + ',"temperature" :' + spacesuitDTO.temperature + ',"power" :' + spacesuitDTO.power + ',"spacesuit_id":' + id_spacesuit + "}")
    }
    spacesuit.save();
    return spacesuit;
} */


    async sendMessageToBus(topic: string, key: string, message: any) {
        const producer = await this.kafka.producer();

        await producer.connect();
        await producer.send({
            topic: topic,
            messages: [
                {
                    key: key,
                    value: JSON.stringify(message),
                },
            ],
        });
        await producer.disconnect();
    }



}
