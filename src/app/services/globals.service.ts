import { Injectable, EventEmitter, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from "@angular/common";
import { StorageService } from './storage.service';

@Injectable()
export class GlobalsService {

    constructor(private _storageService: StorageService, @Inject(PLATFORM_ID) private platformId) {

    }

    isServer() {
        return isPlatformServer(this.platformId)
    }
    
    isBrowser() {
        return isPlatformBrowser(this.platformId)
    }

}