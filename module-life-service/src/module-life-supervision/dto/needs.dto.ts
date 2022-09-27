import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';
import {StatusLifeModule} from "../schemas/status-life-module.schema";

export class NeedsDto {

    constructor(x: StatusLifeModule[]) {
        x.forEach(module =>{
            if(module.needs) {
                this.quantity += 1;
            }
        })
    }

    @IsNotEmpty()
    @IsNumber()
    quantity: number = 0;
}
