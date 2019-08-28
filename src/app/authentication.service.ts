import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  getData(data: string): Observable<any> {
    // console.log('https://api.pwnedpasswords.com/range/'+data);    
    return this.http.get('https://api.pwnedpasswords.com/range/'+data, {
      responseType: 'text',
    })
  }
}
