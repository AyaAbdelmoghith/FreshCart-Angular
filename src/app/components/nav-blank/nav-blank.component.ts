import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterLinkActive],
  templateUrl: './nav-blank.component.html',
  styleUrls: ['./nav-blank.component.scss']
})
export class NavBlankComponent implements OnInit{
  constructor(private _Router:Router,private _CartService:CartService){}
  cartNum:number=0
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
  }
  signOut():void{
    localStorage.removeItem('token');
    this._Router.navigate(['/login']);
  }
} 
