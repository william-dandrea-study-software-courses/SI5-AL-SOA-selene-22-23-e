import {Injectable} from '@nestjs/common';
import {NeedsDto} from '../dto/status-life-modules.dto';
import {firstValueFrom} from "rxjs";
import {AxiosResponse} from "@nestjs/terminus/dist/health-indicator/http/axios.interfaces";
import {ConfigService} from "@nestjs/config";
import {HttpService} from "@nestjs/axios";
import {DependenciesConfig} from "../../shared/config/interfaces/dependencies-config.interface";

@Injectable()
export class NeedsControlServiceService {

  private _baseUrl: string;

  private _moduleLifePath = '/module/';

  constructor(private configService: ConfigService, private readonly httpService: HttpService) {
    // const dependenciesConfig = this.configService.get<DependenciesConfig>('dependencies');
    // this._baseUrl = `http://${dependenciesConfig.module_life_service_url_with_port}`;
    this._baseUrl = 'http://'+ process.env.MODULE_LIFE_SERVICE_URL_WITH_PORT;

  }

  async needsModules(): Promise<NeedsDto[]> {
    const retrieveModuleStatusResponse: AxiosResponse<NeedsDto[]> = await firstValueFrom(this.httpService.get(this._baseUrl+ this._moduleLifePath));
    return retrieveModuleStatusResponse.data;
  }

}
