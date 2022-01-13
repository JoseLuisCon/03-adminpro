import { Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartType , Color } from 'chart.js';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent {

  @Input() tituloGrafico: string ='Sin título';
  @Input() labels: string[] = [ 'Label 1', 'Label 2', 'Label 3' ];

public doughnutChartType: ChartType = 'doughnut';


// Doughnut
@Input('data') doughnutChartData: ChartData<'doughnut'> = {
  labels: this.labels,
  datasets: [{
    data: [ 1, 1, 1 ],
    backgroundColor: [
      '#6857E6',
      '#009FEE',
      '#F02059',

    ]
  },
  {
    data: [ 1, 1, 1 ],
    backgroundColor: [
      '#6857E6',
      '#009FEE',
      '#F02059',

    ]
  }
]
};






}
