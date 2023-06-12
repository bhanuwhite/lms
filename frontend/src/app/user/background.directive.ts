import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBackground]'
})
export class BackgroundDirective {
  @Input () isCorrect! : boolean;

  constructor(private el :ElementRef, private render :Renderer2) { }

  @HostListener('click') onClick(){
   setTimeout(() => {
    this.onChange();
   }, 100);
}

public onChange(){

  if(this.isCorrect === true){
    this.render.setStyle(this.el.nativeElement, 'border','2px solid rgb(34, 86, 143)');
       }
  // else{
  //   this.render.setStyle(this.el.nativeElement, 'background-color','rgb(236, 138, 138)');
  //    }
}
}
