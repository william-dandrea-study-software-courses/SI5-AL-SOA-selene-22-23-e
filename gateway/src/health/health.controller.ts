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
  private _meteoriteMonitoringServiceHealthCheckUrl: string;
  private _alertNotificationServiceHealthCheckUrl: string;
  private _moonBaseServiceHealthCheckUrl: string;
  private _astronautServiceHealthCheckUrl: string;
  private _rotationMissionServiceHealthCheckUrl: string;
  private _spacesuitMonitoringServiceHealthCheckUrl: string;
  private _newsFormalisationServiceHealthCheckUrl: string;
  private _newsServiceHealthCheckUrl: string;

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
    this._meteoriteMonitoringServiceHealthCheckUrl = `http://${dependenciesConfig.meteorite_monitoring_service_url_with_port}/health`;
    this._alertNotificationServiceHealthCheckUrl = `http://${dependenciesConfig.alert_notification_service_url_with_port}/health`;
    this._moonBaseServiceHealthCheckUrl = `http://${dependenciesConfig.moon_base_service_url_with_port}/health`;
    this._astronautServiceHealthCheckUrl = `http://${dependenciesConfig.astronaut_service_url_with_port}/health`;
    this._rotationMissionServiceHealthCheckUrl = `http://${dependenciesConfig.rotation_mission_service_url_with_port}/health`;
    this._spacesuitMonitoringServiceHealthCheckUrl = `http://${dependenciesConfig.spacesuit_monitoring_service_url_with_port}/health`;
    this._newsFormalisationServiceHealthCheckUrl = `http://${dependenciesConfig.news_formalisation_service_url_with_port}/health`;
    this._newsServiceHealthCheckUrl = `http://${dependenciesConfig.news_service_url_with_port}/health`;
    console.log(this._survivalControlServiceHealthCheckUrl);
    console.log(this._moduleLifeServiceHealthCheckUrl);
    console.log(this._needsControlServiceHealthCheckUrl);
    console.log(this._resupplyServiceHealthCheckUrl);
    console.log(this._spacesuitServiceHealthCheckUrl);
    console.log(this._spacecraftServiceHealthCheckUrl);
    console.log(this._evaMissionServiceHealthCheckUrl);
    console.log(this._meteoriteMonitoringServiceHealthCheckUrl);
    console.log(this._alertNotificationServiceHealthCheckUrl);
    console.log(this._moonBaseServiceHealthCheckUrl);
    console.log(this._astronautServiceHealthCheckUrl);
    console.log(this._rotationMissionServiceHealthCheckUrl);
    console.log(this._spacesuitMonitoringServiceHealthCheckUrl);
    console.log(this._newsFormalisationServiceHealthCheckUrl);
    console.log(this._newsServiceHealthCheckUrl);
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
              this._meteoriteMonitoringServiceHealthCheckUrl
          ),
      async () =>
          this.checkIsHealthy(
              "alert-notification-service",
              this._alertNotificationServiceHealthCheckUrl
          ),
      async () =>
          this.checkIsHealthy(
              "moon-base-service",
              this._moonBaseServiceHealthCheckUrl
          ),
      async () =>
          this.checkIsHealthy(
              "astronaut-service",
              this._astronautServiceHealthCheckUrl
          ),
      async () =>
          this.checkIsHealthy(
              "rotation-mission-service",
              this._rotationMissionServiceHealthCheckUrl
          ),
      async () =>
          this.checkIsHealthy(
              "spacesuit-monitoring-service",
              this._spacesuitMonitoringServiceHealthCheckUrl
          ),
      async () =>
          this.checkIsHealthy(
              "news-formalisation-service",
              this._newsFormalisationServiceHealthCheckUrl
          ),
      async () =>
          this.checkIsHealthy(
              "news-service",
              this._newsServiceHealthCheckUrl
          )
    ]);
  }
}
