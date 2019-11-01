import { Injectable, HttpService } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AxiosResponse } from 'axios';

@Injectable()
export class BlockService {
  private baseUrl = 'https://blockchain.info';

  constructor(private http: HttpService) {}

  findAll(): Observable<AxiosResponse<any>> {
    return this.http
      .get(`${this.baseUrl}/blocks?format=json`)
      .pipe(map(res => res.data));
  }

  findOne(hash: string): Observable<AxiosResponse<any>> {
    return this.http
      .get(`${this.baseUrl}/rawblock/${hash}`)
      .pipe(map(res => res.data));
  }
}
