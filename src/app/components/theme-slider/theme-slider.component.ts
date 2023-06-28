import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-theme-slider',
  templateUrl: './theme-slider.component.html',
  styleUrls: ['./theme-slider.component.css']
})

export class ThemeSliderComponent {
  @Output() onToggle = new EventEmitter();

  onChange({checked}:any) {
    this.onToggle.emit(checked);
  }


}
