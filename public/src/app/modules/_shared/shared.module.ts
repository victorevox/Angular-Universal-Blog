import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GlobalsService, AuthenticationService } from "./services";

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        CommonModule
    ],
    providers: [
        GlobalsService,
        AuthenticationService
    ]
})

export class SharedModule {}