import { firstValueFrom } from 'rxjs';
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

import { ResupplyMissionDto } from '../dto/resupply-mission.dto';
import { AxiosResponse } from '@nestjs/terminus/dist/health-indicator/http/axios.interfaces';

@Injectable()
export class NeedsControlProxyService {
  private _baseUrl: string;

  private _needsControlPath = '/needs-control/';

  constructor(
    private configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this._baseUrl =
      'http://' + process.env.RESUPPLY_SERVICE_URL_WITH_PORT;
  }

  async superviseResupplyMissions(): Promise<ResupplyMissionDto[]> {
    const retrieveResupplyStatusResponse: AxiosResponse<
      ResupplyMissionDto[]
    > = await firstValueFrom(
      this.httpService.get(this._baseUrl + this._needsControlPath),
    );
    const resupplyStatus = retrieveResupplyStatusResponse.data;
    return resupplyStatus;
  }
}
