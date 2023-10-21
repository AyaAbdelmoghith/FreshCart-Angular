import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _HttpClient: HttpClient) { }
  baseUrl: string = `https://ecommerce.routemisr.com/api/v1/`;
  myToken:any={token:localStorage.getItem('token')}
  cartNumber:BehaviorSubject<number>=new BehaviorSubject(0);

  addToCart(prodId: string): Observable<any> {
    return this._HttpClient.post(this.baseUrl + `cart`, {
      productId: prodId//body (always before header)
    },
      {
        headers: this.myToken
      }
    )
  }
  getCartUser():Observable<any>{
    return this._HttpClient.get(this.baseUrl+`cart`,
    {
      headers:this.myToken
    }
    )
  }
  removeCartItem(prodId: string):Observable<any>{
    return this._HttpClient.delete(this.baseUrl+`cart/${prodId}`,
    {
      headers:this.myToken 
    }
    )
  }
  updateCartCount(periodId:string,countNum:number):Observable<any>{
    return this._HttpClient.put(this.baseUrl+`cart/${periodId}`,{
      count:countNum
    },
    {
      headers:this.myToken
    }
    )
  }
  clearCartUser():Observable<any>{
    return( this._HttpClient.delete(this.baseUrl+`cart`,{
      headers:this.myToken
    }))
  }
}
