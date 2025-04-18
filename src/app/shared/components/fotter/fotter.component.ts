import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-fotter',
  imports: [CommonModule, TranslateModule],
  templateUrl: './fotter.component.html',
  styleUrl: './fotter.component.css',
  standalone: true
})
export class FotterComponent {
  currentYear = new Date().getFullYear();
}
