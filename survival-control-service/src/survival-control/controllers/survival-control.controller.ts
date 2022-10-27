import {Controller, Get, Logger, Param, Put} from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { Kafka } from "kafkajs"
import { SurvivalControlService } from "../services/survival-control.service";
import { ModuleLifeProxyService } from "../services/module-life-proxy.service";

import { ModuleDto } from '../dto/modules.dto';

@ApiTags("survival-control")
@Controller("/survival-control")
export class SurvivalControlController {
  private readonly logger = new Logger(SurvivalControlController.name);

  private kafka = new Kafka({
    clientId: 'spacecraft',
    brokers: ['kafka-service:9092']
  })

  private spacesuit_problems = new Set();
  
  constructor(
    private readonly survivalControlService: SurvivalControlService,
    private readonly moduleLifeProxyService: ModuleLifeProxyService,
  ) {
    this.event_spacesuit_problem_listener()
  }

  @ApiOkResponse({ type: Boolean })
  @Get("/supervision")
  async supervise(): Promise<ModuleDto[]> {
    this.logger.log("Récupération du statut de chacun des modules");
    return await this.moduleLifeProxyService.superviseModules();
  }

  @ApiOkResponse({ type: Boolean })
  @Put('/:moduleId/isolate')
  async isolateModule(@Param("moduleId") moduleId: number): Promise<string> {
    this.logger.log('Isolement d\'un module');
    return this.moduleLifeProxyService.isolateModule(moduleId);

  }


  @ApiOkResponse({ type: Boolean })
  @Get("/spacesuit-with-problem/")
  async getSpacesuitProblem(): Promise<any> {
    this.logger.log("Récupération des tenue ayant actuellement des problème");

    return [...this.spacesuit_problems];
  }

  /*
@MessageListener('problem-spacesuit')
*/
  async event_spacesuit_problem_listener(){
    const consumer = this.kafka.consumer({ groupId: 'survival-control-consumer' });
    // Consuming
    await consumer.connect()
    await consumer.subscribe({ topic: 'problem-spacesuit'})

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        this.logger.log("Spacesuit problem detected value: " + message.value.toLocaleString())
        this.logger.log("Spacesuit id : " + JSON.parse(message.value.toLocaleString())["spacesuit_id"])
        this.spacesuit_problems.add(JSON.parse(message.value.toLocaleString())["spacesuit_id"])
      },
    });
  }
}
