import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BasicService } from './basic.service';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(
    private http: HttpClient,
    private service: BasicService
  ) { }

  // private readonly baseUrl: string = 'https://crmnodeapi.herokuapp.com/'; // Staging baseUrl
  private readonly baseUrl: string = 'http://localhost:3000/'; // Localhost baseUrl

  private apiGet(apiName: string): Observable<any> {
    return this.http.get(this.baseUrl + apiName, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        token: `$tokenBearer ${this.service.storage('session-get', 'token')}`,
        dbid: `${this.service.storage('session-get', 'dbid')}`
      })
    });
  }

  private apiPost(apiName: string, dataInfo: any): Observable<any> {
    return this.http.post(this.baseUrl + apiName, dataInfo, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        token: `$tokenBearer ${this.service.storage('session-get', 'token')}`,
        dbid: `${this.service.storage('session-get', 'dbid')}`
      })
    });
  }

  get(apiName: string, callBack: (arg: any) => void) {
    if (window.navigator.onLine) {
      this.apiGet(apiName).subscribe(
        resp => callBack(resp),
        error => {
          this.service.showError(error.error.message);
          console.log(error);
        }
      );
    } else {
      this.service.tosterOpen('Check your Connection.', 'ok', 2000, ['offline']);
    }
  }

  post(apiName: string, data: any, callBack: (arg: any) => void) {
    if (window.navigator.onLine) {
      this.apiPost(apiName, data).subscribe(
        resp => callBack(resp),
        error => {
          this.service.showError(error.error.message);
          console.log(error);
        }
      );
    } else {
      this.service.tosterOpen('Check your Connection.', 'ok', 2000, ['offline']);
    }
  }

}
