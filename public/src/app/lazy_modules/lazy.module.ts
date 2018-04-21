import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { LazyComponent } from "./../components/lazy.component/lazy.component";

@NgModule({
  declarations: [LazyComponent],
  imports: [
    RouterModule.forChild([
      { path: '', component: LazyComponent, pathMatch: 'full' }
    ])
  ]
})
export class LazyModule {

}