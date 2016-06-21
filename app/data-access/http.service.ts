import {Injectable} from '@angular/core';
import {Http, Response} from "@angular/http";
import {Observable} from 'rxjs/Observable';

@Injectable()
export class HttpService {
    constructor(private _http:Http) {
    }

    getList<T>(url:string):Observable<T[]> {
        return this._http.get(url).map((response:Response)=><T[]>response.json())
            // for debug
            //.do(data=>console.log("All: " + JSON.stringify(data)))
            .catch(this.handleError);
    }

    // for local testing data only
    getById<T>(url:string,id:string,idName:string):Observable<T> {
        return this._http.get(url).map((response:Response)=>{
            let result = response.json();
            for(let item of result){
                if(item[idName]==id){
                    return <T>item;
                }
            }
            return null;
        })
        // for debug
        //.do(data=>console.log("All: " + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private handleError(error:Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
