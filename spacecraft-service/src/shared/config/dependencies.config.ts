import { registerAs } from '@nestjs/config';

export default registerAs('dependencies', () => ({
  resupply_service_url_with_port: process.env.RESUPPLY_CONTROL_SERVICE_URL_WITH_PORT,
}));