import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';
import { WishlistService } from 'src/app/core/services/wishlist.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterLinkActive],
  templateUrl: './nav-blank.component.html',
  styleUrls: ['./nav-blank.component.scss']
})
export class NavBlankComponent implements OnInit{ 
  constructor(private _Router:Router,private _CartService:CartService,private _Renderer2:Renderer2,private _WishlistService:WishlistService){}
  @ViewChild('navBar') navElement!:ElementRef;
  @HostListener('window:scroll')
  onScroll():void{
    console.log('hello scroll ');
    if(scrollY>300){
      this._Renderer2.addClass(this.navElement.nativeElement,'px-5')
      this._Renderer2.addClass(this.navElement.nativeElement,'shadow')

    }
    else{
      this._Renderer2.removeClass(this.navElement.nativeElement,'px-5')
      this._Renderer2.removeClass(this.navElement.nativeElement,'shadow')


    }
  }
  cartNum:number=0
  wishListNum:number=0;
  ngOnInit(): void {
    this._CartService.cartNumber.subscribe({
      next:(num)=>{
        console.log('number nav',num);
        this.cartNum=num;
      }
    });
    this._CartService.getCartUser().subscribe({
      next:(response)=>{
        this.cartNum=response.numOfCartItems;
      }
    });
    //Once you add or delete it reflects it immediatly
    this._WishlistService.wishListNumber.subscribe({
      next:(num)=>{
        this.wishListNum=num;      
      }
    });
    //To get the default number if default is = 3 then let it 3
    this._WishlistService.getWishList().subscribe({
      next:(response)=>{
        this.wishListNum=response.count;      
        console.log(response);
        
      }
    });
  }
  signOut():void{
    localStorage.removeItem('token');
    this._Router.navigate(['/login']);
  }
} 

