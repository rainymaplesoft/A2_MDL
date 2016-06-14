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

    private handleError(error:Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
