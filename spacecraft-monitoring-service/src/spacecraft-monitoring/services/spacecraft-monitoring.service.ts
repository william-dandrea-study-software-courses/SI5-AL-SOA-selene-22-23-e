import {Injectable} from '@nestjs/common';
import { Model} from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import {News, NewsDocument} from '../schemas/news.schema';
import {NewsDto} from "../dto/news.dto";
import {Kafka} from "kafkajs";


@Injectable()
export class SpacecraftMonitoringService {

  private kafka = new Kafka({
    clientId: 'eva-mission',
    brokers: ['kafka-service:9092']
  })

  constructor(@InjectModel(News.name) private newsModel: Model<NewsDocument>) {}

  async getNews(): Promise<string[]> {
    return this.newsModel.find().then(news => {
      let response : string[]=[];
      news.forEach(newsActual => {
        response.push(newsActual.message);
      })
      return response;
    });
  }

  async addNews(message:string){
    return await this.newsModel.create({message:message});
  }

}