import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.scss']
})
export class AllordersComponent {//implements OnInit
  // constructor(private _ActivatedRoute: ActivatedRoute, private _CartService: CartService,private _AuthService:AuthService) { }
  // userId: string | null='';//

  // allOrder:[]=[]
  //   ngOnInit(): void {
  //     this.getUserId();
  //     this.getAllOrder(this.userId);
  //   }
  //   getUserId(): void {
  //     this._AuthService.decodeUser()
  //     this.userId = this._AuthService.userId;
  //     console.log(this.userId);
  //   }
  //   getAllOrder(keyword:string|null): void {
  //     this._CartService.getUserOrders(keyword).subscribe({
  //       next: (resp) => {
  //         console.log(resp);
  //         this.allOrder=resp
  //       },
  //       error: (err) => {
  //         console.log(err);
  //       },
  //     });
  //   }
  }
