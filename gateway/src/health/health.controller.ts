import { Controller, Get } from "@nestjs/common";
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
} from "@nestjs/terminus";
import { ConfigService } from "@nestjs/config";

import { DependenciesConfig } from "../shared/config/interfaces/dependencies-config.interface";

@Controller("health")
export class HealthController {
  private _survivalControlServiceHealthCheckUrl: string;
  private _moduleLifeServiceHealthCheckUrl: string;
  private _needsControlServiceHealthCheckUrl: string;
  private _resupplyServiceHealthCheckUrl: string;
  private _spacesuitServiceHealthCheckUrl: string;
  private _spacecraftServiceHealthCheckUrl: string;
  private _evaMissionServiceHealthCheckUrl: string;

  constructor(
    private configService: ConfigService,
    private health: HealthCheckService,
    private http: HttpHealthIndicator
  ) {
    const dependenciesConfig = this.configService.get<DependenciesConfig>("dependencies");
    this._survivalControlServiceHealthCheckUrl = `http://${dependenciesConfig.survival_control_service_url_with_port}/health`;
    this._moduleLifeServiceHealthCheckUrl = `http://${dependenciesConfig.module_life_service_url_with_port}/health`;
    this._needsControlServiceHealthCheckUrl = `http://${dependenciesConfig.needs_control_service_service_url_with_port}/health`;
    this._resupplyServiceHealthCheckUrl = `http://${dependenciesConfig.resupply_service_service_url_with_port}/health`;
    this._spacesuitServiceHealthCheckUrl = `http://${dependenciesConfig.spacesuit_service_url_with_port}/health`;
    this._spacecraftServiceHealthCheckUrl = `http://${dependenciesConfig.space_craft_service_url_with_port}/health`;
    this._evaMissionServiceHealthCheckUrl = `http://${dependenciesConfig.eva_mission_service_url_with_port}/health`;
  }

  async checkIsHealthy(name, url) {
    try {
      return await this.http.responseCheck(
        name,
        url,
        (res) => (<any>res.data)?.status === "ok"
      );
    } catch (e) {
      return await this.http.pingCheck(name, url);
    }
  }

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      async () =>
        this.checkIsHealthy(
          "survival-control-service",
          this._survivalControlServiceHealthCheckUrl
        ),
      async () =>
        this.checkIsHealthy(
          "module-life-service",
          this._moduleLifeServiceHealthCheckUrl
        ),
      async () =>
        this.checkIsHealthy(
          "needs-control-service",
          this._needsControlServiceHealthCheckUrl
        ),
      async () =>
        this.checkIsHealthy(
          "resupply-service",
          this._resupplyServiceHealthCheckUrl
        ),
      async () =>
        this.checkIsHealthy(
            "spacesuit-service",
            this._spacesuitServiceHealthCheckUrl
        ),
      async () =>
        this.checkIsHealthy(
            "spacecraft-service",
            this._spacecraftServiceHealthCheckUrl
        ),
      async () =>
        this.checkIsHealthy(
            "eva-mission-service",
            this._evaMissionServiceHealthCheckUrl
        ),
    ]);
  }
}
