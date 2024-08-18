import { Component, OnInit } from '@angular/core';
import {OrderSummary} from "../models/models";
import {AdminService} from "../services/admin.service";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  public _orderSummaries: OrderSummary[] = [];

  constructor(private adminService: AdminService) {}

  public ngOnInit(): void {
    this.adminService.getOrderSummaries()
      .subscribe(summaries => {
        this._orderSummaries = summaries;
      });
  }
}
