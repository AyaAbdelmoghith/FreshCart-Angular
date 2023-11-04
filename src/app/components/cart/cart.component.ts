import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from 'src/app/core/services/cart.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{
   constructor(private _CartService:CartService,private _Renderer2:Renderer2){}
   cartDetails:any=null
   ngOnInit():void{
    this._CartService.getCartUser().subscribe({
      next: (response)=>{
        // console.log(response);
        this.cartDetails=response.data;
      },
    })
   }
   removeItem(id:string,element:HTMLButtonElement):void{
    this._Renderer2.setAttribute(element,'disabled','true')
    this._CartService.removeCartItem(id).subscribe({
       next:(response)=>{
        console.log(response);
        this.cartDetails=response.data;//to know that that there's change after delete it & the HTML will render. so that the user will be able to see the deleted items
        this._Renderer2.removeAttribute(element,'disabled');
        this._CartService.cartNumber.next(response.numOfCartItems)
         },
       error:(err)=>{
        this._Renderer2.removeAttribute(element,'disabled');
       }
    })
   }

   changeCount(count: number,id:string,btnCount1:HTMLButtonElement,btnCount2:HTMLButtonElement):void{
    console.log(count);
    if(count===0){
      this._CartService.removeCartItem(id).subscribe({
        next:(response)=>{
         console.log(response);
         this.cartDetails=response.data;//
   },
  })
    }
    else{
      this._Renderer2.setAttribute(btnCount1,'disabled','true');
      this._Renderer2.setAttribute(btnCount2,'disabled','true');
    this._CartService.updateCartCount(id,count).subscribe({
      next:(response)=>{
        console.log(response);
        this.cartDetails=response.data;
        this._Renderer2.removeAttribute(btnCount1,'disabled');
        this._Renderer2.removeAttribute(btnCount2,'disabled');
      },
      error:(err)=>{
        this._Renderer2.removeAttribute(btnCount1,'disabled');
        this._Renderer2.removeAttribute(btnCount2,'disabled');
      }
    })
  }
   }

   clearAllCart():void{
    this._CartService.clearCartUser().subscribe({
      next:(response)=>{
        if(response.message==='success')
        this.cartDetails=null;
        console.log(response,"clear");
        this._CartService.cartNumber.next(0)
       }
    })
   }
}
