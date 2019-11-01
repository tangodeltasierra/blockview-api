import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { BlockService } from './block/block.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly blockService: BlockService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/latest')
  getLatest() {
    return this.blockService.findAll();
  }

  @Get('/block')
  getBlock(@Query('hash') hash?: string) {
    return this.blockService.findOne(hash);
  }
}
