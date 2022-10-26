import { firstValueFrom } from "rxjs";
import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { ConfigService } from "@nestjs/config";

import { AxiosResponse } from '@nestjs/terminus/dist/health-indicator/http/axios.interfaces';
import {SupplyDto} from "../dto/supply.dto";

@Injectable()
export class ModuleLifeProxyService {
  private _baseUrl: string;
  private _moduleLifePath = "/module";

  constructor(
    private configService: ConfigService,
    private readonly httpService: HttpService
  ) {
    this._baseUrl = "http://" + process.env.MODULE_LIFE_SERVICE_URL_WITH_PORT;
  }

  async getModule(moduleId: number) {
    const url = `${this._baseUrl}${this._moduleLifePath}/${moduleId}`;
    try {
      const retrieveModuleCallResponse: AxiosResponse<any> =
        await firstValueFrom(this.httpService.get(url));
    } catch (exception) {
      throw exception;
    }
  }

  async getNeeds(): Promise<SupplyDto[]> {
    try {
        const retrieveModulesNeedsCallResponse: AxiosResponse<SupplyDto[]> = await firstValueFrom(this.httpService.get(`${this._baseUrl}${this._moduleLifePath}/needs`));
        return retrieveModulesNeedsCallResponse.data;
    }
    catch (exception) {
        throw exception;
    }
  }

  async getInventory(): Promise<SupplyDto[]> {
      try {
          const retrieveModulesInventoryCallResponse: AxiosResponse<SupplyDto[]> = await firstValueFrom(this.httpService.get(`${this._baseUrl}${this._moduleLifePath}/inventory`));
          return retrieveModulesInventoryCallResponse.data;
      } catch (exception) {
          throw exception;
      }
  }

  async isolate(moduleId: number) {
      try {
          const retrieveIsolateModuleCallResponse: AxiosResponse<any> = await firstValueFrom(this.httpService.put(`${this._baseUrl}${this._moduleLifePath}/${moduleId}/isolate`));
      } catch (exception) {
          throw exception;
      }
  }

}
