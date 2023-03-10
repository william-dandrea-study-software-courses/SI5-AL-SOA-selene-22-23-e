import {firstValueFrom} from 'rxjs';
import {Injectable} from '@nestjs/common';
import {HttpService} from '@nestjs/axios';
import {ConfigService} from '@nestjs/config';

import { ModuleDto } from '../dto/modules.dto';
import { AxiosResponse } from '@nestjs/terminus/dist/health-indicator/http/axios.interfaces';

@Injectable()
export class ModuleLifeProxyService {

    private _baseUrl: string;
    private _moduleLifePath = '/module';

    constructor(private configService: ConfigService, private readonly httpService: HttpService) {
        // const dependenciesConfig = this.configService.get<DependenciesConfig>('dependencies');
        // this._baseUrl = `http://${dependenciesConfig.module_life_service_url_with_port}`;
        this._baseUrl = 'http://'+ process.env.MODULE_LIFE_SERVICE_URL_WITH_PORT;
    }

    async superviseModules(): Promise<ModuleDto[]> {
        const retrieveModuleStatusResponse: AxiosResponse<ModuleDto[]> = await firstValueFrom(this.httpService.get(`${this._baseUrl}${this._moduleLifePath}/vitals`));
        return retrieveModuleStatusResponse.data;
    }

    async isolateModule(moduleId:number): Promise<string> {
        try {
            const test: AxiosResponse = await firstValueFrom(
                this.httpService.put(`${this._baseUrl}${this._moduleLifePath}/${moduleId}/isolate`)
            );
            if (test.status != 200) {
                return "Isolement échoué";
            }
            return "Module isolé";        }
        catch (exception) {
            throw exception;
        }
    }
}
