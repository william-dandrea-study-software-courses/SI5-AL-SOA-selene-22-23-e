import {firstValueFrom} from 'rxjs';
import {Injectable} from '@nestjs/common';
import {HttpService} from '@nestjs/axios';
import {ConfigService} from '@nestjs/config';

import {SupplyDTO} from "../dto/supply.dto";

@Injectable()
export class MoonBaseProxyService {

    private _moonBaseBaseUrl: string;
    private _astronautBaseUrl: string;
    private _moonBasePath = '/moonBase';
    private _astronautPath = '/astronaut';

    constructor(private configService: ConfigService, private readonly httpService: HttpService) {
        this._moonBaseBaseUrl = 'http://'+ process.env.MOON_BASE_SERVICE_URL_WITH_PORT;
        this._astronautBaseUrl = 'http://'+ process.env.ASTRONAUT_SERVICE_URL_WITH_PORT;
    }

    async pickFromMoonBase(supplies: SupplyDTO[]) {
        try {
            await firstValueFrom(this.httpService.post(`${this._moonBaseBaseUrl}${this._moonBasePath}/pick`, supplies));
        }
        catch (exception) {
            throw exception;
        }
    }

    async secureAstronaut(astronautId: number) {
        try {
            await firstValueFrom(this.httpService.put(`${this._astronautBaseUrl}${this._astronautPath}/${astronautId}/secure`));
        }
        catch (exception) {
            throw exception;
        }
    }

}