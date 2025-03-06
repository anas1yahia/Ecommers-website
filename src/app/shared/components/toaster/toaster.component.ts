
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ToasterService } from '../../../features/product/services/toaster-service.service';


@Component({
  selector: 'app-toaster',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.scss']
})
export class ToasterComponent {
  constructor(public toasterService: ToasterService) {}

  pauseToast(id: string): void {
    this.toasterService.pauseToast(id);
  }

  resumeToast(id: string): void {
    this.toasterService.resumeToast(id);
  }
}
