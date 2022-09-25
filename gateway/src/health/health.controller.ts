import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
} from '@nestjs/terminus';
import { ConfigService } from '@nestjs/config';

import { DependenciesConfig } from '../shared/config/interfaces/dependencies-config.interface';

@Controller('health')
export class HealthController {
  private _lifeSupportServiceHealthCheckUrl: string;
  private _moduleLifeServiceHealthCheckUrl: string;
  private _needsControlServiceHealthCheckUrl: string;
  private _resupplyServiceHealthCheckUrl: string;

  constructor(
    private configService: ConfigService,
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
  ) {
    const dependenciesConfig = this.configService.get<DependenciesConfig>('dependencies');
    this._lifeSupportServiceHealthCheckUrl = `http://${dependenciesConfig.life_support_service_url_with_port}/health`;
    this._moduleLifeServiceHealthCheckUrl = `http://${dependenciesConfig.module_life_service_url_with_port}/health`;
    this._needsControlServiceHealthCheckUrl = `http://${dependenciesConfig.needs_control_service_service_url_with_port}/health`;
    this._resupplyServiceHealthCheckUrl = `http://${dependenciesConfig.resupply_service_service_url_with_port}/health`;
  }

  async checkIsHealthy(name, url) {
    try {
      return await this.http.responseCheck(name, url, (res) => ((<any>res.data)?.status === 'ok'));
    } catch(e) {
      return await this.http.pingCheck(name, url);
    }
  }

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      async () => this.checkIsHealthy('life-support-service', this._lifeSupportServiceHealthCheckUrl),
      async () => this.checkIsHealthy('module-life-service', this._moduleLifeServiceHealthCheckUrl),
      async () => this.checkIsHealthy('needs-control-service', this._needsControlServiceHealthCheckUrl),
      async () => this.checkIsHealthy('resupply-service', this._resupplyServiceHealthCheckUrl),
    ]);
  }
}
