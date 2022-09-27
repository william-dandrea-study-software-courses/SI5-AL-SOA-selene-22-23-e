import { Injectable } from '@nestjs/common';
import {SupplyOrderDTO} from '../dto/supply-order.dto';

@Injectable()
export class ResupplySupervisionService {
  constructor() {
    const i = 0;
  }

  async resupply(resupply : SupplyOrderDTO): Promise<any> {
    console.log(resupply)
    return Promise.resolve()
  }
}
