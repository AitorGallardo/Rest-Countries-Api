import { Component, EventEmitter, Output, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-region-selector',
  templateUrl: './region-selector.component.html',
  styleUrls: ['./region-selector.component.css']
})
export class RegionSelectorComponent {

  @Output() onChangeSelect: EventEmitter<string> = new EventEmitter<string>();

  private selectorListener: () => void = () => null;
  private clickDocumentListener: () => void = () => null;

  constructor(private renderer: Renderer2) {

  }

  ngAfterViewInit(): void {

    const selector: HTMLSelectElement = document.querySelector('.custom-selector') as HTMLSelectElement;
    const select = <HTMLSelectElement>selector!.children[0];

    let dropDown: any = null;


    // We want default behaviour on mobile
    if (window.innerWidth >= 600) {

    }

    this.selectorListener = this.renderer.listen(selector, 'mousedown', (e: any) => {
      // It prevents from showing default selection options element
      e.preventDefault();

      if (dropDown) {
        dropDown.remove()
        dropDown = null;
        return;
      }

      // I need to use the Render2 service from Angular to correctly interact with the dom
      // and add the class defined in the scope of this component
      dropDown = this.renderer.createElement('ul');
      this.renderer.addClass(dropDown, 'selector-options');
      this.renderer.addClass(dropDown, 'theme-background');
      this.renderer.addClass(dropDown, 'theme-color');

      const select = <HTMLSelectElement>selector?.children[0];
      // To create a list item for each option in our selector with his content
      Array.from(select.children).forEach((option: any) => {
        // Checks if its the default option to not show it
        const isHidden = option.getAttribute('hidden')
        if(typeof isHidden === 'string') return;
  
        const dropDownOption = this.renderer.createElement('li');
        dropDownOption.textContent = option.textContent;


        this.renderer.listen(dropDownOption, 'mousedown', (e: any) => {
          console.log('dentro de la option',);
          // To prevent from trigger de outter selector event listener
          e.stopPropagation();
          select.value = option.value;
          selector!.value = option.value;
          // To dispach the change event 
          select.dispatchEvent(new Event('change'))
          selector?.dispatchEvent(new Event('change'))
          // To remove the drowpdown on select and option
          dropDown.remove()
          dropDown = null;
        })


        dropDown.appendChild(dropDownOption);
      });

      selector!.appendChild(dropDown);


    })

    // We handle click outside the selector to remove drowpdown
    this.clickDocumentListener = this.renderer.listen(document, 'click', (e: any) => {
      if (!selector?.contains(e.target)) {
        dropDown?.remove();
        dropDown = null;
      }
    })

  }
  ngOnDestroy(): void {
    this.selectorListener();
    this.clickDocumentListener();
  }

  onChange(target: any): void {
    const { value } = target;
    this.onChangeSelect.emit(value)
  }
}
