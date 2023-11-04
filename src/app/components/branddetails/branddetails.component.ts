import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Brands } from 'src/app/core/interfaces/brands';
import { BrandsService } from 'src/app/core/services/brands.service';

@Component({
  selector: 'app-branddetails',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './branddetails.component.html',
  styleUrls: ['./branddetails.component.scss']
})
export class BranddetailsComponent  implements OnInit{
  constructor(private _ActivatedRoute: ActivatedRoute, private _BrandsService: BrandsService) { }
  brandId: string | null='';//
  brandDetails:Brands={
    name: '',
    image: ''
  }//or categoryDetails:Category={} as Category
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.brandId = params.get(`id`)
      }
    });
    this._BrandsService.getBrandDetails(this.brandId).subscribe({
      next:(response)=>{
        this.brandDetails=response.data;
      }
    })
  }
}
