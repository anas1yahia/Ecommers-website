import { Component } from '@angular/core';
import { ListProductComponent } from "../product/components/list-product/list-product.component";
import { CategoryListComponent } from "../category/category-list/category-list.component";
import { MainSliderComponent } from "../main-slider/main-slider.component";
import { FotterComponent } from "../../shared/components/fotter/fotter.component";


@Component({
  selector: 'app-home',
  imports: [ListProductComponent, CategoryListComponent, MainSliderComponent, FotterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
