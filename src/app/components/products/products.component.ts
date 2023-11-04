import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from 'src/app/core/services/product.service';
import { Product } from 'src/app/core/interfaces/product';
import { RouterLink } from '@angular/router';
import { CutTextPipe } from 'src/app/core/pipe/cut-text.pipe';
import { CartService } from 'src/app/core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination'
import { WishlistService } from 'src/app/core/services/wishlist.service';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterLink, CutTextPipe, NgxPaginationModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  constructor(
    private _ProductService: ProductService,
    private _CartService: CartService,
    private _ToasterService: ToastrService,
    private _Renderer2: Renderer2, private _WishlistService: WishlistService
  ) { }
  products: Product[] = []
  limit: number = 0//limit
  currentPage: number = 1//
  total: number = 0;

  wishListData: string[] = [];
  ngOnInit(): void {
    this._ProductService.getProducts().subscribe({
      next: (response) => {
        console.log('Product', response.data);
        this.products = response.data;
        this.limit = response.metadata.limit;
        this.currentPage = response.metadata.currentPage;
        this.total = response.results;
      },
    });

    this._WishlistService.getWishList().subscribe({
      next: (response) => {
        const newData = response.data.map((item: any) => item._id)//returns array but diff format
        this.wishListData = newData;
        console.log(response, 'd');
      }
    });
  }
  addProduct(id: any, element: HTMLButtonElement): void {
    this._Renderer2.setAttribute(element, 'disabled', 'true')
    this._CartService.addToCart(id).subscribe({
      next: (response) => {
        console.log(response);
        this._ToasterService.success(response.message);
        this._Renderer2.removeAttribute(element, 'disabled');
        this._CartService.cartNumber.next(response.numOfCartItems)
      },
      error: (error) => {
        this._Renderer2.removeAttribute(element, 'disabled')
      }
    });
  }
  pageChanged(event: any): void {
    console.log(event);
    this._ProductService.getProducts(event).subscribe({//put event because represnet the page number
      next: (response) => {
        console.log('Product', response.data);
        this.products = response.data;
        this.limit = response.metadata.limit;
        this.currentPage = response.metadata.currentPage;
        this.total = response.results;
      },
    });
  }
  addFav(prodId: string | undefined): void {
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
  removeFav(prodId: string | undefined): void {
    this._WishlistService.removeWishList(prodId).subscribe({
      next: (response) => {
        // console.log(this.wishListData.length,'removelen');
        // console.log(response.data.length,'resremovelen');
        // console.log(response,'response2');
        this._ToasterService.success(response.message);
        this.wishListData = response.data;
        //  this._WishlistService.wishListNumber.next(this.wishListData.length) 
        this._WishlistService.wishListNumber.next(response.data.length)
      }
    })
  }
}



