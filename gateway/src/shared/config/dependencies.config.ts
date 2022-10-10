import { registerAs } from '@nestjs/config';

export default registerAs('dependencies', () => ({
  survival_control_service_url_with_port: process.env.SURVIVAL_CONTROL_SERVICE_URL_WITH_PORT,
  module_life_service_url_with_port: process.env.MODULE_LIFE_SERVICE_URL_WITH_PORT,
  needs_control_service_service_url_with_port: process.env.NEEDS_CONTROL_SERVICE_URL_WITH_PORT,
  resupply_service_service_url_with_port: process.env.RESUPPLY_CONTROL_SERVICE_URL_WITH_PORT,
  space_craft_service_url_with_port: process.env.SPACE_CRAFT_SERVICE_URL_WITH_PORT,
  spacesuit_service_url_with_port: process.env.SPACESUIT_SERVICE_URL_WITH_PORT,
  eva_mission_service_url_with_port:process.env.EVA_MISSION_SERVICE_URL_WITH_PORT
}));
