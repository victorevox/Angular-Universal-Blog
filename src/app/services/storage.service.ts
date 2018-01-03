import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

  constructor() { }

  setItem(key: string, data: any) {
    if(this.hasLocalStorage()) {
      window.localStorage.setItem(key, data);
    }
  }

  getItem(key: string): any {
    if(this.hasLocalStorage()) {
      return window.localStorage.getItem(key)
    } else {
      return null;
    }
  }

  hasLocalStorage() {
    return (typeof window !== "undefined" && window.localStorage);
  }

  removeItem(key: string) {
    if(this.hasLocalStorage()) {
      window.localStorage.removeItem(key);
    }
  }

}
