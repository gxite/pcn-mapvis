import { Component, ElementRef, OnInit, Input} from '@angular/core';
import * as d3 from "d3"; 


@Component({
  selector: 'app-histogram',
  templateUrl: './histogram.component.html',
  styleUrls: ['./histogram.component.scss']
})
export class HistogramComponent implements OnInit {

  @Input() displayWidth;
  @Input() displayHeight;

  hostElement;

  svg;
  margin;
  width;
  height;

  //data = [110,120,130,130,15,16,1,230,160,350,230];
  //@Input() data;

  constructor(private elRef: ElementRef) {
    this.hostElement = this.elRef.nativeElement;
  }

  ngOnInit() {

    //d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/1_OneNum.csv").then(data=>this.build(data))
    //this.build(this.data);
  }

  build(data) {

    this.margin = {top: 10, right: 30, bottom: 30, left: 40};
    this.width = this.displayWidth - this.margin.left - this.margin.right;
    this.height = this.displayHeight - this.margin.top - this.margin.bottom;
    
    this.svg = d3.select(this.hostElement).append("svg")
      .attr("width", this.width + this.margin.left + this.margin.right)
      .attr("height", this.height + this.margin.top + this.margin.bottom)
    .append("g")
      .attr("transform",
        "translate(" + this.margin.left + "," + this.margin.top + ")");

    data.forEach(d=>d = +d);
    
    let x = d3.scaleLinear()
      .domain([0, 10])    
      .range([0, this.width]);

    this.svg.append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(x));

    let histogram = d3.histogram()
      .value(function(d) { return d; })   // I need to give the vector of value
      .domain(x.domain())  // then the domain of the graphic
      .thresholds(x.ticks(91)); // then the numbers of bins

    let bins = histogram(data);

    let y = d3.scaleLinear()
    .range([this.height, 0]);

    y.domain([0, d3.max(bins, d=>d.length)]);

    this.svg.append("g").call(d3.axisLeft(y));

    this.svg.selectAll("rect").data(bins)
    .enter()
      .append("rect")
        .attr("x", 1)
        .attr("transform", d=>"translate(" + x(d.x0) + "," + y(d.length) + ")")
        .attr("width", d=>x(d.x1) - x(d.x0) -1 )
        .attr("height", d=>this.height - y(d.length))
        .style("fill", "#69b3a2")
  }

  clear() {
    d3.select(this.hostElement).select("svg").remove();
  }


}
