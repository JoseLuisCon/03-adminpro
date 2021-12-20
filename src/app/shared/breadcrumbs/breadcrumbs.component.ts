import { isNull } from '@angular/compiler/src/output/output_ast';
import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd,  Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from "rxjs/operators";


@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy {

  public titulo: string = '';

  private subs$ : Subscription;

  constructor(private router: Router) {

    this.subs$ = this.getDataRuta().subscribe( ({titulo}) => {
      this.titulo = titulo;
      document.title = `AdminPro - ${titulo}`
  });

   }
  ngOnDestroy(): void {
   this.subs$.unsubscribe();
  }

getDataRuta(){
  return this.router.events
  .pipe(
    filter( event => event instanceof ActivationEnd),
    filter( (event:any) => event.snapshot.firstChild === null),
    map ( event => event.snapshot.data )

  )

}

}
