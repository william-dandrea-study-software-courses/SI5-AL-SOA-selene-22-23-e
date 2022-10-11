import { Injectable } from "@nestjs/common";
import { firstValueFrom } from "rxjs";
import { AxiosResponse } from "@nestjs/terminus/dist/health-indicator/http/axios.interfaces";
import { ConfigService } from "@nestjs/config";
import { HttpService } from "@nestjs/axios";
import { DependenciesConfig } from "../../shared/config/interfaces/dependencies-config.interface";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Needs, NeedsDocument } from "../schemas/status-life-module.schema";
import { NeedsDto } from "../dto/needs.dto";
import { SupplyOrderDto } from "../dto/supply-order.dto";

@Injectable()
export class NeedsControlServiceService {
  private _baseUrlModule: string;
  private _baseUrlResupply: string;

  private _moduleLifePath = "/module/";

  constructor(
    private configService: ConfigService,
    private readonly httpService: HttpService,
    @InjectModel(Needs.name) private needsDocumentModel: Model<NeedsDocument>
  ) {
    this._baseUrlModule =
      "http://" + process.env.MODULE_LIFE_SERVICE_URL_WITH_PORT;
    this._baseUrlResupply =
      "http://" + process.env.RESUPPLY_CONTROL_SERVICE_URL_WITH_PORT;
  }

  async needsModules(): Promise<NeedsDto[]> {
    const retrieveModuleStatusResponse: AxiosResponse<NeedsDto[]> =
      await firstValueFrom(
        this.httpService.get(this._baseUrlModule + "/needs")
      );
    return retrieveModuleStatusResponse.data;
  }

  async supplyOrderToSent(supplyOrderDTO: SupplyOrderDto): Promise<string> {
    const test: AxiosResponse = await firstValueFrom(
      this.httpService.post(
        this._baseUrlResupply + "/resupply-supervision/supply",
        supplyOrderDTO
      )
    );
    if (test.status != 200) {
      return "Commande échouée";
    }
    return "Commande passée";
  }

  async initializeStock(): Promise<void> {
    await this.needsDocumentModel.remove({});
    await this.needsDocumentModel.insertMany([
      {
        stock: 0,
      },
    ]);
  }

  async stockBase(): Promise<Needs> {
    const response = await this.needsDocumentModel.findOne();
    return response;
  }

  async fillStockBase(quantity: NeedsDto): Promise<Needs> {
    const stockBase = await this.stockBase();
    const currentStock = stockBase.stock;
    const currentStockId = stockBase._id;

    await this.needsDocumentModel.updateOne(
      { _id: currentStockId },
      {
        $set: {
          stock: currentStock + quantity.quantity,
        },
      },
      { upsert: true }
    );

    return await this.stockBase();
  }

  async pickFromStockBase(quantity: NeedsDto): Promise<Needs> {
    const stockBase = await this.stockBase();
    const currentStock = stockBase.stock;
    const currentStockId = stockBase._id;

    await this.needsDocumentModel.updateOne(
        { _id: currentStockId },
        {
          $set: {
            stock: currentStock - quantity.quantity,
          },
        },
        { upsert: true }
    );

    return await this.stockBase();
  }
}
