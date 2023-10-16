import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from 'src/app/core/services/product.service';
import { Product } from 'src/app/core/interfaces/product';
import { Category } from 'src/app/core/interfaces/category';
import { CutTextPipe } from 'src/app/core/pipe/cut-text.pipe';
import { CarouselModule } from 'ngx-owl-carousel-o';
  import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,CutTextPipe,CarouselModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private _ProductService:ProductService){}
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

 categoryOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
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
    navText: ['', ''],
    items:1,
    nav: false
  }
}
