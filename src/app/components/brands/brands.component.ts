import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandsService } from 'src/app/core/services/brands.service';
import { Brands } from 'src/app/core/interfaces/brands';
import { CutTextPipe } from 'src/app/core/pipe/cut-text.pipe';
import { NgxPaginationModule } from 'ngx-pagination'
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [CommonModule,CutTextPipe,NgxPaginationModule,RouterLink],
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {
  constructor(private _BrandsService: BrandsService) { }
  brands: Brands[] = []
  limit: number = 0//limit
  currentPage: number = 1//
  total: number = 0;
  ngOnInit(): void {
    this._BrandsService.getAllBrands().subscribe({
      next: (response) => {
        this.brands = response.data;
        console.log('brands', response);
        this.limit = response.metadata.limit;
        this.currentPage = response.metadata.currentPage;
        this.total = response.results;
      },
    });
  }
  pageChanged(event: any): void {
    console.log(event);
    this._BrandsService.getAllBrands(event).subscribe({//put event because represnet the page number
      next: (response) => {
        console.log('brands', response.data);
        this.brands = response.data;
        this.limit = response.metadata.limit;
        this.currentPage = response.metadata.currentPage;
        this.total = response.results;      
      },
    });
  }
}
