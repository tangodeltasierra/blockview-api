import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlockService } from './block/block.service';
import { HttpModule } from '@nestjs/common';
import { of } from 'rxjs';
import { AxiosResponse } from 'axios';
import { map } from 'rxjs/operators';

describe('AppController', () => {
  let appController: AppController;
  let blockService: BlockService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [AppController],
      providers: [AppService, BlockService],
    }).compile();

    appController = app.get<AppController>(AppController);
    blockService = app.get<BlockService>(BlockService);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });

    it('should get Latest', async () => {
      const result: AxiosResponse = {
        data: {
          blocks: [
            {
              height: 601717,
              hash:
                '0000000000000000000bc5967ef819b69581199c64c89c07abfd59a4fc626c1d',
              time: 1572482952,
              main_chain: true,
            },
          ],
        },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      };
      jest.spyOn(blockService, 'findAll').mockImplementation(() => of(result));
      const data = await appController.getLatest().toPromise();
      expect(JSON.stringify(data.data).indexOf('blocks')).toBeGreaterThan(-1);
    });

    it('should get Block', () => {
      const result: AxiosResponse = {
        data: {
          blocks: [
            {
              height: 601717,
              hash:
                '0000000000000000000bc5967ef819b69581199c64c89c07abfd59a4fc626c1d',
              time: 1572482952,
              main_chain: true,
            },
          ],
        },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      };
      jest.spyOn(blockService, 'findOne').mockImplementation(() => of(result));

      const hash =
        '0000000000000000000bc5967ef819b69581199c64c89c07abfd59a4fc626c1d';
      appController
        .getBlock(hash)
        .pipe(
          map(data =>
            expect(JSON.stringify(data.data).indexOf(hash)).toBeGreaterThan(-1),
          ),
        )
        .subscribe();
    });
  });
});
