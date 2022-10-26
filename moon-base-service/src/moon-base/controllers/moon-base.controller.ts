import {
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Body,
} from "@nestjs/common";
import {
  ApiOkResponse,
  ApiCreatedResponse,
  ApiConflictResponse,
  ApiTags,
} from "@nestjs/swagger";
import { Kafka } from "kafkajs";
import { MoonBaseService } from "../services/moon-base.service";
import {NewMoonBaseDto} from "../dto/new-moon-base.dto";
import {MoonBaseDto} from "../dto/moon-base.dto";
import {MoonBaseAlreadyExistsException} from "../exceptions/module-already-exists.exception";
import {SupplyDto} from "../dto/supply.dto";

@ApiTags("moon-base")
@Controller("/moon-base")
export class MoonBaseController {
  private readonly logger = new Logger(MoonBaseController.name);

  private kafka = new Kafka({
    clientId: 'moon-base',
    brokers: ['kafka-service:9092']
  })

  constructor(private readonly moonBaseService: MoonBaseService) {
    this.event_dangerous_meteorite();
  }

  @Get("/needs")
  @ApiOkResponse({ type: SupplyDto, isArray: true })
  async getNeeds(): Promise<SupplyDto[]> {
    this.logger.log("Récupération des besoins de la base lunaire");
    return this.moonBaseService.getNeeds();
  }

  @Get("/inventory")
  @ApiOkResponse({ type: SupplyDto, isArray: true })
  async getInventory(): Promise<SupplyDto[]> {
    this.logger.log("Récuperation de l'inventaire de la base");
    return this.moonBaseService.getInventory();
  }

  @Get("/:moonBaseId")
  @ApiOkResponse()
  async getMoonBase(
    @Param("moonBaseId") moonBaseId: number
  ): Promise<MoonBaseDto> {
    this.logger.log("Récuperation de la base lunaire");
    return this.moonBaseService.getMoonBase(moonBaseId);
  }

  @Post("")
  @ApiCreatedResponse({
    description: "The moon base has been successfully added.",
    type: MoonBaseDto,
  })
  @ApiConflictResponse({
    type: MoonBaseAlreadyExistsException,
    description: "Id moon base already exists",
  })
  async postMoonBase(@Body() moonBaseDto: NewMoonBaseDto) {
    this.logger.log("Création d'une nouvelle base");
    return this.moonBaseService.postMoonBase(moonBaseDto);
  }

  @ApiOkResponse({ type: Boolean })
  @Post("/:moonBaseId/supply")
  async supplyMoonBase(@Body() supplies: SupplyDto[], @Param('moonBaseId') moonBaseId: number): Promise<any> {
    this.logger.log("Remplissage le stock de la base lunaire");
    return this.moonBaseService.fillStockBase(supplies, moonBaseId);
  }

  @ApiOkResponse({ type: Boolean })
  @Post("/pick")
  async pickStockMoonBase(@Body() needs: SupplyDto[], @Param('moonBaseId') moonBaseId: number): Promise<any> {
    this.logger.log("Suppression de provisions du stock de la base lunaire");
    return this.moonBaseService.pickStockMoonBase(needs, moonBaseId);
  }

  @Put("/:moonBaseId")
  @ApiOkResponse({
    description: "The moon base has been successfully updated.",
    type: MoonBaseDto,
  })
  async putMoonBase(
    @Param("moonBaseId") moonBaseId: number,
    @Body() moonBaseDto: NewMoonBaseDto
  ) {
    this.logger.log("Modification d'une la base lunaire");
    return this.moonBaseService.putMoonBase(moonBaseId, moonBaseDto);
  }

  @Put("/:moonBaseId/isolate")
  @ApiOkResponse({
    description: "The moon base has been successfully isolated",
    type: MoonBaseDto,
  })
  async isolateMoonBase(@Param("moonBaseId") moonBaseId: number) {
    this.logger.log("Isolement de la base lunaire");
    return this.moonBaseService.isolateMoonBase();
  }

  /*
  @MessageListener('dangerous-meteorite')
   */
  async event_dangerous_meteorite() {
    const consumer = this.kafka.consumer({ groupId: "moon-base-consumer" });
    // Consuming
    await consumer.connect();
    await consumer.subscribe({ topic: "dangerous-meteorite" });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        this.logger.log(
          "A dangerous meteorite has been detected, isolate moon base"
        );
        await this.moonBaseService.isolateMoonBase();
      },
    });
  }
}
