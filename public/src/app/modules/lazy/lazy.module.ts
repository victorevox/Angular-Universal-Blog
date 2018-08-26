import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { LazyComponent } from "./pages";
import { LazyRoutingModule } from './lazy-routing.module';

@NgModule({
  declarations: [LazyComponent],
  imports: [
    LazyRoutingModule
  ]
})
export class LazyModule {

}