import {HttpException, HttpStatus} from '@nestjs/common';

export class SpacecraftAlreadyExistException extends HttpException {
    error: string;
    details: string;

    constructor(id_spacecraft: number) {
        super({'SpaceCraft already exist':`Space craft already exist for id : "${id_spacecraft}"`},HttpStatus.NOT_FOUND);
        this.error = 'SpaceCraft already exist';
        this.details = `Space craft already exist for id : "${id_spacecraft}"`;
    }
}
