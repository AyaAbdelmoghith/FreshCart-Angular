import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/core/services/product.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-details' ,
  standalone: true,
  imports: [CommonModule,CarouselModule],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  constructor(private _ActivatedRoute:ActivatedRoute,private _ProductService:ProductService,private _CartService:CartService,
    private _ToasterService:ToastrService){}
  productId!:string|null;//
  productDetails:any=null;
  ngOnInit():void{
    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
        this.productId=params.get(`id`)
      }
    })
    this._ProductService.getProductDetails(this.productId).subscribe({
      next:({data})=>{
        this.productDetails=data;
        console.log(this.productDetails,"productDetails")
      }
    });
  }

  addProduct(id:any):void{
    this._CartService.addToCart(id).subscribe({
      next:(response)=> {
        console.log(response);
        this._ToasterService.success(response.message);
        this._CartService.cartNumber.next(response.numOfCartItems)
      }
    });
  }
  productDetailsOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true ,
    navSpeed: 700,
    navText: ['', ''],
    items:1,
    nav: false,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplaySpeed:1000,
  }
}
