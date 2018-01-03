import { NgModule, Component, PLATFORM_ID, Inject } from '@angular/core'
import { isPlatformBrowser, isPlatformServer } from "@angular/common";
import { setInterval, setTimeout } from 'timers';
// import { Util } from "@app/classes/util";
import { Util } from "../../classes";

@Component({
    selector: 'app-counter',
    template: `<h3>i'm Counter <small>It's great {{counter}}</small></h3>`
})
export class CounterComponent { 
    public counter: number = 0;
    
    constructor(@Inject(PLATFORM_ID) private platformId) {
        
        if ( isPlatformBrowser(this.platformId) ) {
            setTimeout(()=> {
                setInterval(() => {
                    this.counter += 1;
                },500)
            },3000);
        }

        console.log(isPlatformBrowser(this.platformId))
    }

 }