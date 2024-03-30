import { Component } from '@angular/core';

@Component({
  selector: 'core-section-toolbar',
  templateUrl: './toolbar.component.html',
  styles: ``
})
export class ToolbarComponent {

  tema() {
    const body=document.body as HTMLElement;
    body.setAttribute('data-bs-theme', 'dark');
  }
}
