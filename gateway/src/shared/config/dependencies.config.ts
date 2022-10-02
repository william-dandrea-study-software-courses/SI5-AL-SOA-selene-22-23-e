import { registerAs } from '@nestjs/config';

export default registerAs('dependencies', () => ({
  life_support_service_url_with_port: process.env.LIFE_SUPPORT_SERVICE_URL_WITH_PORT,
  module_life_service_url_with_port: process.env.MODULE_LIFE_SERVICE_URL_WITH_PORT,
  needs_control_service_service_url_with_port: process.env.NEEDS_CONTROL_SERVICE_URL_WITH_PORT,
  resupply_service_service_url_with_port: process.env.RESUPPLY_CONTROL_SERVICE_URL_WITH_PORT,
}));
