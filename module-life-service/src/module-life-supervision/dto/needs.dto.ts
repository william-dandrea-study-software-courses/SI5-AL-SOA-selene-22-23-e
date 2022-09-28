import { IsNotEmpty, IsNumber } from 'class-validator';
import { LifeModule } from "../schemas/module.schema";

export class NeedsDto {

    constructor(x: LifeModule[]) {
        x.forEach(module =>{
            if(module.needsStatus) {
                this.quantity += 1;
            }
        })
    }

    @IsNotEmpty()
    @IsNumber()
    quantity: number = 0;
}
