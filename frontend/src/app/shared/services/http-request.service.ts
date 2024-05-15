import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {
  baseURL = 'http://localhost:8000';

  constructor(private http: HttpClient) { }

  public getGadgets(): Observable<any> {
    return this.http.get(this.baseURL + '/gadgets')
  }

  public postGadgets(params: { name:string, img:string, price:number, quantity:number, availability:boolean }): Observable<any> {
    const {...data } = params;
    return this.http.post(this.baseURL + '/gadgets', data)
  }

  public updateGadgets(params: { id:string, name:string, img:string, price:number, quantity:number, availability:boolean }): Observable<any> {
    const { id, ...data } = params;
    return this.http.put(this.baseURL + `/gadgets/${id}`, data);
  }

  public deleteGadgets(id:string): Observable<any> {
    return this.http.delete(this.baseURL + `/gadgets/${id}`)
  }

  public getSold(): Observable<any> {
    return this.http.get(this.baseURL + '/sold')
  }

  public postSold(params: { name:string, img:string, price:number, quantity:number, availability:boolean }): Observable<any> {
    const {...data } = params;
    return this.http.post(this.baseURL + '/sold', data)
  }

  public postAISuggestion(params: { message: string }): Observable<any> {
    const data = { prompt: params.message };
    return this.http.post(this.baseURL + '/geminiai', data)
  }

  public signUp(forms: any): Observable<any> {
    return this.http.post(this.baseURL + '/user', forms);
  }

  public AuthUser(forms: any): Observable<any> {
    return this.http.post(this.baseURL + '/authUser', forms);
  }
}
