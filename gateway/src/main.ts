import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import { createProxyMiddleware } from "http-proxy-middleware";

import { DependenciesConfig } from "./shared/config/interfaces/dependencies-config.interface";

import { AppModule } from "./app.module";




async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  // Retrieve config service
  const configService = app.get(ConfigService);

  // Starts listening for shutdown hooks
  app.enableShutdownHooks();

  // Proxy endpoints
  const dependenciesConfig =
    configService.get<DependenciesConfig>("dependencies");
  console.log(dependenciesConfig.life_support_service_url_with_port);
  app.use(
    "/life-support",
    createProxyMiddleware({
      target: `http://${dependenciesConfig.life_support_service_url_with_port}`,
      changeOrigin: true,
      pathRewrite: {
        [`^/life-support`]: "",
      },
    })
  );

  console.log(dependenciesConfig.module_life_service_url_with_port);
  app.use(
    "/module-life",
    createProxyMiddleware({
      target: `http://${dependenciesConfig.module_life_service_url_with_port}`,
      changeOrigin: true,
      pathRewrite: {
        [`^/module-life`]: "",
      },
    })
  );
  app.use(
    "/needs-control",
    createProxyMiddleware({
      target: `http://${dependenciesConfig.needs_control_service_service_url_with_port}`,
      changeOrigin: true,
      pathRewrite: {
        [`^/needs-control`]: "",
      },
    })
  );
  app.use(
    "/resupply",
    createProxyMiddleware({
      target: `http://${dependenciesConfig.resupply_service_service_url_with_port}`,
      changeOrigin: true,
      pathRewrite: {
        [`^/resupply`]: "",
      },
    })
  );
  // Run the app
  const appPort = configService.get("app.port");
  await app.listen(appPort, () => {
    console.log("Listening on port " + appPort);
  });
}
bootstrap();
