import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishlistService } from 'src/app/core/services/wishlist.service';
import { Product } from 'src/app/core/interfaces/product';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { CutTextPipe } from 'src/app/core/pipe/cut-text.pipe';
import { CartService } from 'src/app/core/services/cart.service';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, RouterLink, CutTextPipe],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  constructor(private _CartService: CartService,
    private _ToasterService: ToastrService, private _Renderer2: Renderer2,
    private _WishlistService: WishlistService) { }
  products: Product[] = [];
  wishListData: string[] = [];

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

  ngOnInit(): void {
    this._WishlistService.getWishList().subscribe({
      next: (response) => {
        this.products = response.data;
        const newData = response.data.map((item: any) => item._id)//returns array but diff format
        this.wishListData = newData;
      }
    })
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
        this._ToasterService.success(response.message);
        this.wishListData = response.data;
        //  this._WishlistService.wishListNumber.next(this.wishListData.length) 
        this._WishlistService.wishListNumber.next(response.data.length);

        //Show the remaining prod after removing porod from wishlist
        //1- by response
        /* this._WishlistService.getWishList().subscribe({
           next: (response) => {
             this.products = response.data;
           }
         });*/
        //Show the remaining prod after removing porod from wishlist
        //2- by filter
        const newProdData = this.products.filter((item: any) => this.wishListData.includes(item._id));
        console.log(newProdData, 'newProd');

        this.products = newProdData;
      }
    })
  }


}

