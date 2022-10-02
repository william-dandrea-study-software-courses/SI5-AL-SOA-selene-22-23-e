import { registerAs } from '@nestjs/config';

export default registerAs('dependencies', () => ({
  module_life_service_url_with_port: process.env.MODULE_LIFE_SERVICE_URL_WITH_PORT,
  resupply_service_url_with_port: process.env.RESUPPLY_CONTROL_SERVICE_URL_WITH_PORT,
}));
