import { Component } from '@angular/core';

import { ChartData, ChartType, Color } from 'chart.js';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [],
})
export class Grafica1Component {

  public labels: string[] = [
    'Denuncias 2 ',
    'Denuncias No autovías',
    'Denuncias travesías',
  ];

  // Doughnut
  public data: ChartData<'doughnut'> = {
    labels: this.labels,
    datasets: [
      {
        data: [2, 1, 3],
        backgroundColor: ['#6857E6', '#009FEE', '#F02059'],
      },
      {
        data: [200, 150, 50],
        backgroundColor: ['#6857E6', '#009FEE', '#F02059'],
      },
    ],
  };
}
