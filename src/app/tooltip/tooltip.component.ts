import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public static setTooltip(object: any,x: number,y: number, selected: string) {
    const el = document.getElementById('tooltip');
    if (object) {
      el.innerHTML = selected + " : " + object.properties[selected].toString();
      el.style.display = 'block';
      el.style.left = (x+30) + 'px';
      el.style.top = y + 'px';
    } else {
      el.style.display = 'none';
    }
  }

}
