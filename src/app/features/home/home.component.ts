import { Component, OnInit } from '@angular/core';
import { ListProductComponent } from "../product/components/list-product/list-product.component";
import { CategoryListComponent } from "../category/category-list/category-list.component";
import { MainSliderComponent } from "../main-slider/main-slider.component";
import { FotterComponent } from "../../shared/components/fotter/fotter.component";
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-home',
  imports: [ListProductComponent, MainSliderComponent, FotterComponent, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  searchTerm: string = '';
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['searchTerm'] || '';
    });
  }


}
