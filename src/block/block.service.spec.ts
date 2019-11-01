import { Test, TestingModule } from '@nestjs/testing';
import { BlockService } from './block.service';
import { HttpModule, HttpService } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { doesNotReject } from 'assert';

describe('BlockService', () => {
  let service: BlockService;
  let http: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [BlockService],
    }).compile();

    http = module.get<HttpService>(HttpService);
    service = new BlockService(http);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should fetch latest blocks', async done => {
    const result: AxiosResponse = {
      data: {},
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    };
    jest.spyOn(service, 'findAll').mockImplementation(() => of(result));
    await expect(service.findAll().toPromise()).resolves.toEqual(result);
    done();
  });

  it('should fetch block details', async done => {
    const result: AxiosResponse = {
      data: {},
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    };
    jest.spyOn(service, 'findOne').mockImplementation(() => of(result));
    await expect(service.findOne('hash-123').toPromise()).resolves.toEqual(
      result,
    );
    done();
  });
});
