import { Injectable } from "@nestjs/common";
import { firstValueFrom } from "rxjs";
import { AxiosResponse } from "@nestjs/terminus/dist/health-indicator/http/axios.interfaces";
import { ConfigService } from "@nestjs/config";
import { HttpService } from "@nestjs/axios";
import { DependenciesConfig } from "../../shared/config/interfaces/dependencies-config.interface";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Needs, NeedsDocument } from "../schemas/needs.schema";
import { NeedsDto } from "../dto/needs.dto";
import { SupplyOrderDto } from "../dto/supply-order.dto";

@Injectable()
export class NeedsControlService {
  private _baseUrlMoonBase: string;
  private _baseUrlResupply: string;

  constructor(
    private configService: ConfigService,
    private readonly httpService: HttpService,
    @InjectModel(Needs.name) private needsDocumentModel: Model<NeedsDocument>
  ) {
    this._baseUrlMoonBase =
      "http://" + process.env.MOON_BASE_SERVICE_URL_WITH_PORT;
    this._baseUrlResupply =
      "http://" + process.env.RESUPPLY_CONTROL_SERVICE_URL_WITH_PORT;
  }

  async needsModules(): Promise<NeedsDto[]> {
    const retrieveMoonBaseNeedsResponse: AxiosResponse<NeedsDto[]> =
      await firstValueFrom(
        this.httpService.get(this._baseUrlMoonBase + "/moon-base/needs")
      );
    return retrieveMoonBaseNeedsResponse.data;
  }

  async supplyOrderToSent(supplyOrderDTO: SupplyOrderDto): Promise<string> {
    const test: AxiosResponse = await firstValueFrom(
      this.httpService.post(
        this._baseUrlResupply + "/resupply/supply",
        supplyOrderDTO
      )
    );
    if (test.status != 200) {
      return "Commande échouée";
    }
    return "Commande passée";
  }




}
