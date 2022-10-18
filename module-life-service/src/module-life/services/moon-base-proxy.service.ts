import {firstValueFrom} from 'rxjs';
import {Injectable} from '@nestjs/common';
import {HttpService} from '@nestjs/axios';
import {ConfigService} from '@nestjs/config';

import { AxiosResponse } from '@nestjs/terminus/dist/health-indicator/http/axios.interfaces';
import {SupplyDto} from "../dto/supply.dto";

@Injectable()
export class MoonBaseProxyService {

    private _baseUrl: string;
    private _moonBasePath = '/moonBase';

    constructor(private configService: ConfigService, private readonly httpService: HttpService) {
        this._baseUrl = 'http://'+ process.env.MOON_BASE_SERVICE_URL_WITH_PORT;
    }

    async pickFromMoonBase(supply: SupplyDto) {
        try {
            const retrievePickFromMoonBaseCallResponse: AxiosResponse<any> = await firstValueFrom(this.httpService.post(`${this._baseUrl}${this._moduleLifePath}/pick`, supply));
        }
        catch (exception) {
            throw exception;
        }
    }

}