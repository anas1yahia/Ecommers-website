import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from "./shared/components/nav-bar/nav-bar.component";
import { ToasterComponent } from "./shared/components/toaster/toaster.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBarComponent, ToasterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'app';
}
