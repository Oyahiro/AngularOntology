import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {SERVER_PREFIX} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private readonly httpClient: HttpClient) {
  }

  public getResult(classes: any, properties: any): Observable<any> {
    const data = {
      classes,
      properties
    };
    return this.httpClient.post(SERVER_PREFIX['::api'] + '/execute', data)
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }
}
