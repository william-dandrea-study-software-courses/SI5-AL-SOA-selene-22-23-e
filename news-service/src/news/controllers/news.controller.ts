import {Controller, Get, Logger, Param, Post, Put} from "@nestjs/common";
import {
  ApiOkResponse,
  ApiTags,
} from "@nestjs/swagger";
import { NewsService } from "../services/news.service";
import {Kafka} from "kafkajs";

@ApiTags("news")
@Controller("/news")
export class NewsController {
  private readonly logger = new Logger(NewsController.name);

  private kafka = new Kafka({
    clientId: 'spacecraft',
    brokers: ['kafka-service:9092']
  })

  constructor(private newsService:NewsService) {
    this.event_news_listener()
  }

  async event_news_listener(){
    const consumer = this.kafka.consumer({ groupId: 'news-consumer' });
    // Consuming
    await consumer.connect()
    await consumer.subscribe({ topic: 'news'})

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        this.logger.log("Message received: " + message.value.toLocaleString())
        await this.newsService.addNews(message.value.toLocaleString());
      },
    });
  }

  @Get("")
  @ApiOkResponse()
  async getSuits(): Promise<string[]> {
    this.logger.log("Récuperation des messages reçu");
    return this.newsService.getNews();
  }

}
