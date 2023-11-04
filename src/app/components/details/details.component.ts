import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/core/services/product.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/core/services/cart.service';
import { WishlistService } from 'src/app/core/services/wishlist.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, CarouselModule],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  constructor(private _ActivatedRoute: ActivatedRoute, private _ProductService: ProductService, private _CartService: CartService,
    private _ToasterService: ToastrService,
    private _WishlistService: WishlistService) { }
  productId!: string | null;//
  productDetails: any = null;
  wishListData: string[] = [];
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.productId = params.get(`id`)
      }
    })
    this._ProductService.getProductDetails(this.productId).subscribe({
      next: ({ data }) => {
        this.productDetails = data;
        console.log(this.productDetails, "productDetails")
      }
    });
    this._WishlistService.getWishList().subscribe({
      next: (response) => {
        const newData = response.data.map((item: any) => item._id)//returns array but diff format
        this.wishListData = newData;
        console.log(response, 'd');
      }
    });
  }

  addProduct(id: any): void {
    this._CartService.addToCart(id).subscribe({
      next: (response) => {
        console.log(response);
        this._ToasterService.success(response.message);
        this._CartService.cartNumber.next(response.numOfCartItems)
      }
    });
  }
  addFav(prodId: any): void {
    this._WishlistService.addToWishList(prodId).subscribe({
      next: (response) => {
        console.log(response.data.length, 'addlen response ');
        console.log(this.wishListData.length, 'Addlen');
        console.log(response, 'response1');

        this._ToasterService.success(response.message);
        this.wishListData = response.data;
        // this._WishlistService.wishListNumber.next(this.wishListData.length) 
        this._WishlistService.wishListNumber.next(response.data.length)
      }
    })
  }
  removeFav(prodId: any): void {
    this._WishlistService.removeWishList(prodId).subscribe({
      next: (response) => {
        this._ToasterService.success(response.message);
        this.wishListData = response.data;
        //  this._WishlistService.wishListNumber.next(this.wishListData.length) 
        this._WishlistService.wishListNumber.next(response.data.length)
      }
    })
  }
  productDetailsOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: false,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplaySpeed: 1000,
  }
}
