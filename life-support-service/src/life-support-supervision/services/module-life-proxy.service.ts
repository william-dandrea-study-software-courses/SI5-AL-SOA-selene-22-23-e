import { firstValueFrom } from 'rxjs';
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

import { DependenciesConfig } from '../../shared/config/interfaces/dependencies-config.interface';

import {StatusLifeModuleDto} from "../dto/status-life-modules.dto";
import {AxiosResponse} from "@nestjs/terminus/dist/health-indicator/http/axios.interfaces";

@Injectable()
export class ModuleLifeProxyService {

    private _baseUrl: string;

    private _moduleLifePath = '/module/';

    constructor(private configService: ConfigService, private readonly httpService: HttpService) {
        const dependenciesConfig = this.configService.get<DependenciesConfig>('dependencies');
        //console.log(dependenciesConfig.module_life_service_url_with_port);
        //this._baseUrl = `http://${dependenciesConfig.module_life_service_url_with_port}`;
        this._baseUrl = 'http://'+ process.env.MODULE_LIFE_SERVICE_URL_WITH_PORT;
    }

    async superviseModules(): Promise<StatusLifeModuleDto[]> {
        const retrieveModuleStatusResponse: AxiosResponse<StatusLifeModuleDto[]> = await firstValueFrom(this.httpService.get(this._baseUrl+ this._moduleLifePath));
        const modulesStatus= retrieveModuleStatusResponse.data;
        console.log(modulesStatus);
        return modulesStatus;
    }

}







