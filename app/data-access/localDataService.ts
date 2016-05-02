import {Injectable} from "angular2/core";
@Injectable()
export class LocalDataService {
    constructor() {
        if (typeof(Storage) === "undefined") {
            console.error("Web Storage is not supported!!")
        }
    }

    SetString(key:string, value:string):void {
        sessionStorage.setItem(key, value);
    }

    GetString(key:string):string {
        return sessionStorage.getItem(key);
    }

    SetJson(key:string, value:any):void {
        sessionStorage.setItem(key, JSON.stringify(value));
    }

    GetJson(key:string):any {
        return JSON.parse(sessionStorage.getItem(key));
    }

    SetNumber(key:string, value:number):void {
        sessionStorage.setItem(key, value.toString());
    }

    GetNumber(key:string):number {
        return Number(sessionStorage.getItem(key));
    }

    RemoveItem(key:string):void {
        sessionStorage.removeItem(key);
    }
}