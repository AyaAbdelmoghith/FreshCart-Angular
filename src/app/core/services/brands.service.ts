import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {
  constructor(private _HttpClient:HttpClient) { }
  baseUrl:string=`https://ecommerce.routemisr.com/api/v1/`;
  getAllBrands(pageNum:number=1):Observable<any>{
    return this._HttpClient.get(this.baseUrl+`brands?page=${pageNum}`);
  }
  getBrandDetails(id:string|null):Observable<any>{
    return this._HttpClient.get(this.baseUrl+`brands/${id}`);
  }
}