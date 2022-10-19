import {HttpException, HttpStatus} from '@nestjs/common';

export class AstronautAlreadyExistsException extends HttpException {
    error: string;
    details: string;

    constructor(id_astronaut: number) {
        super({'Astronaut already exists':`Astronaut already exist for id : "${id_astronaut}"`},HttpStatus.NOT_FOUND);
        this.error = 'Astronaut already exists';
        this.details = `Astronaut already exists for id : "${id_astronaut}"`;
    }
}
