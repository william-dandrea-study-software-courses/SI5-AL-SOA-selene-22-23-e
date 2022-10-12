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
  app.use(
    "/survival_control",
    createProxyMiddleware({
      target: `http://${dependenciesConfig.survival_control_service_url_with_port}`,
      changeOrigin: true,
      pathRewrite: {
        [`^/survival-control`]: "",
      },
    })
  );

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

  app.use(
      "/space-craft",
      createProxyMiddleware({
          target: `http://${dependenciesConfig.space_craft_service_url_with_port}`,
          changeOrigin: true,
          pathRewrite: {
              [`^/space-craft`]: "",
          },
      })
  );

    app.use(
        "/spacesuit",
        createProxyMiddleware({
            target: `http://${dependenciesConfig.spacesuit_service_url_with_port}`,
            changeOrigin: true,
            pathRewrite: {
                [`^/spacesuit`]: "",
            },
        })
    );
    app.use(
        "/eva-mission",
        createProxyMiddleware({
            target: `http://${dependenciesConfig.eva_mission_service_url_with_port}`,
            changeOrigin: true,
            pathRewrite: {
                [`^/eva-mission`]: "",
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
