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
  private _meteoriteMonitoringHealthCheckUrl: string;
  private _alertNotificationHealthCheckUrl: string;
  private _moonBaseHealthCheckUrl: string;
  private _astronautHealthCheckUrl: string;
  private _rotationMissionBaseHealthCheckUrl: string;

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
    this._spacecraftServiceHealthCheckUrl = `http://${dependenciesConfig.spacecraft_service_url_with_port}/health`;
    this._evaMissionServiceHealthCheckUrl = `http://${dependenciesConfig.eva_mission_service_url_with_port}/health`;
    this._meteoriteMonitoringHealthCheckUrl = `http://${dependenciesConfig.meteorite_monitoring_service_url_with_port}/health`;
    this._meteoriteMonitoringHealthCheckUrl = `http://${dependenciesConfig.meteorite_monitoring_service_url_with_port}/health`;
    this._alertNotificationHealthCheckUrl = `http://${dependenciesConfig.alert_notification_service_url_with_port}/health`;
    this._moonBaseHealthCheckUrl = `http://${dependenciesConfig.moon_base_service_url_with_port}/health`;
    this._astronautHealthCheckUrl = `http://${dependenciesConfig.astronaut_service_url_with_port}/health`;
    this._rotationMissionBaseHealthCheckUrl = `http://${dependenciesConfig.rotation_mission_service_url_with_port}/health`;
    console.log(this._survivalControlServiceHealthCheckUrl);
    console.log(this._moduleLifeServiceHealthCheckUrl);
    console.log(this._needsControlServiceHealthCheckUrl);
    console.log(this._resupplyServiceHealthCheckUrl);
    console.log(this._spacesuitServiceHealthCheckUrl);
    console.log(this._spacecraftServiceHealthCheckUrl);
    console.log(this._evaMissionServiceHealthCheckUrl);
    console.log(this._meteoriteMonitoringHealthCheckUrl);
    console.log(this._alertNotificationHealthCheckUrl);
    console.log(this._moonBaseHealthCheckUrl);
    console.log(this._astronautHealthCheckUrl);
    console.log(this._rotationMissionBaseHealthCheckUrl);
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
          "rotation-mission-service",
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
      async () =>
          this.checkIsHealthy(
              "meteorite-monitoring-service",
              this._meteoriteMonitoringHealthCheckUrl
          ),
      async () =>
          this.checkIsHealthy(
              "alert-notification-service",
              this._alertNotificationHealthCheckUrl
          ),
      async () =>
          this.checkIsHealthy(
              "moon-base-service",
              this._moonBaseHealthCheckUrl
          ),
      async () =>
          this.checkIsHealthy(
              "astronaut-service",
              this._astronautHealthCheckUrl
          ),
      async () =>
          this.checkIsHealthy(
              "rotation-mission-service",
              this._rotationMissionBaseHealthCheckUrl
          )
    ]);
  }
}
