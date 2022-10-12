import { registerAs } from '@nestjs/config';

export default registerAs('dependencies', () => ({
  survival_control_service_url_with_port: process.env.SURVIVAL_CONTROL_SERVICE_URL_WITH_PORT,
  module_life_service_url_with_port: process.env.MODULE_LIFE_SERVICE_URL_WITH_PORT,
  needs_control_service_service_url_with_port: process.env.NEEDS_CONTROL_SERVICE_URL_WITH_PORT,
  resupply_service_service_url_with_port: process.env.RESUPPLY_CONTROL_SERVICE_URL_WITH_PORT,
  spacecraft_service_url_with_port: process.env.SPACECRAFT_SERVICE_URL_WITH_PORT,
  spacesuit_service_url_with_port: process.env.SPACESUIT_SERVICE_URL_WITH_PORT,
  eva_mission_service_url_with_port:process.env.EVA_MISSION_SERVICE_URL_WITH_PORT,
  meteorite_monitoring_service_url_with_port:process.env.METEORITE_MONITORING_SERVICE_URL_WITH_PORT,
  alert_notification_service_url_with_port:process.env.ALERT_NOTIFICATION_SERVICE_URL_WITH_PORT,
}));