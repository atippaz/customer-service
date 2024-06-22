import { Controller, Get, Res } from '@nestjs/common';
import { type Response } from 'express';
import { join } from 'node:path';
@Controller()
export class AppController {
  @Get()
  getHello(@Res() res: Response) {
    return res.sendFile(join(`${process.cwd()}/src/index.html`));
  }
}
