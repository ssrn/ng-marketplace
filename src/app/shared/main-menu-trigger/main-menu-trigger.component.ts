import { Component, Renderer2 } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-main-menu-trigger',
  templateUrl: './main-menu-trigger.component.html',
  styleUrls: ['./main-menu-trigger.component.scss']
})
export class MainMenuTriggerComponent {
  isActive = false;

  constructor(private sharedService: SharedService, private renderer: Renderer2) { }

  handleToggle() {
    this.isActive = !this.isActive;
    this.sharedService.toggle();
    this.renderer.setAttribute(document.body, 'class', this.isActive ? 'fixed' : '');
  }
}
