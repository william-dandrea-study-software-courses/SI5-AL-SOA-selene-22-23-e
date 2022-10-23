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
    "/rotation-mission",
    createProxyMiddleware({
      target: `http://${dependenciesConfig.resupply_service_service_url_with_port}`,
      changeOrigin: true,
      pathRewrite: {
        [`^/resupply`]: "",
      },
    })
  );

  app.use(
      "/spacesuit",
      createProxyMiddleware({
          target: `http://${dependenciesConfig.spacecraft_service_url_with_port}`,
          changeOrigin: true,
          pathRewrite: {
              [`^/spacecraft`]: "",
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
    app.use(
        "/meteorite-monitoring",
        createProxyMiddleware({
            target: `http://${dependenciesConfig.meteorite_monitoring_service_url_with_port}`,
            changeOrigin: true,
            pathRewrite: {
                [`^/meteorite-monitoring`]: "",
            },
        })
    );
    app.use(
        "/alert-notification",
        createProxyMiddleware({
            target: `http://${dependenciesConfig.alert_notification_service_url_with_port}`,
            changeOrigin: true,
            pathRewrite: {
                [`^/alert-notification`]: "",
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
