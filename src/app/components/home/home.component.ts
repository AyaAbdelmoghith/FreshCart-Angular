import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from 'src/app/core/services/product.service';
import { Product } from 'src/app/core/interfaces/product';
import { Category } from 'src/app/core/interfaces/category';
import { CutTextPipe } from 'src/app/core/pipe/cut-text.pipe';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,CutTextPipe,CarouselModule,RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private _ProductService:ProductService,private _CartService:CartService,
    private _ToasterService:ToastrService, private _Renderer2:Renderer2){}
  products:Product[]=[];
  categories:Category[]=[];

  ngOnInit(): void {
        this._ProductService.getProducts().subscribe({
          next:(response)=>{
            this.products=response.data;
          }
        });
        this._ProductService.getCategories().subscribe({
          next:(response)=>{
            this.categories=response.data;
          }
        });

  }
  addProduct(id:any,element:HTMLButtonElement):void{
    this._Renderer2.setAttribute(element,'disabled','true')
    this._CartService.addToCart(id).subscribe({
      next:(response)=> {
        console.log(response);
        this._ToasterService.success(response.message);
        this._Renderer2.removeAttribute(element,'disabled');
        this._CartService.cartNumber.next(response.numOfCartItems) 
      },
      error:(error)=>{
        this._Renderer2.removeAttribute(element,'disabled')
      }
    });
  } 
 categoryOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplaySpeed: 1000,
    navText: ['', ''],
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 3
      },
      740: {
        items: 4
      },
      940: {
        items: 6
      }
    },
    nav: false
  }
  mainSliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    autoplay: true,
    autoplayTimeout: 7000,
    autoplaySpeed:1000,
    navText: ['', ''],
    items:1,
    nav: false
  }

}
