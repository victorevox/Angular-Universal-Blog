import { NgModule, Component, PLATFORM_ID, Inject } from '@angular/core'
import { isPlatformBrowser, isPlatformServer } from "@angular/common";
// import { Util } from "@app/classes/util";
import { Util } from "../../classes";
import { GlobalsService } from "./../../services";

@Component({
    selector: 'app-counter',
    template: `<h3>i'm Counter <small>It's great {{counter}}</small></h3>`
})
export class CounterComponent { 
    public counter: number = 0;
    
    constructor( private _globals: GlobalsService) {
        
        if ( this._globals.isBrowser() ) {
            setTimeout(()=> {
                setInterval(() => {
                    this.counter += 1;
                },500)
            },3000);
        }

    }

 }