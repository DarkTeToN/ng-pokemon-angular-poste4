import { Directive, ElementRef, HostListener, Input } from "@angular/core";

@Directive({
    selector: '[pkmnBorderCard]'
})
export class BorderCardDirective {
    @Input('hightlightColor') hightlightColor: string;
    @Input('normalColor') normalColor: string;
    
    constructor(private el: ElementRef) {
        this.setBorder(this.normalColor);
        this.setHeight(180);
    }

    @HostListener('mouseenter') onMouseEnter() {
        this.setBorder(this.normalColor);
        // this.setHeight(360);
    }

    @HostListener('mouseleave') onMouseLeave() {
        this.setBorder(this.hightlightColor);
        // this.setHeight(180);
    }

    private setBorder(color: string) {
        this.el.nativeElement.style.border = 'solid 4px ' + color;
    }

    private setHeight(height: number) {
        this.el.nativeElement.style.height = height + 'px';
    }
}