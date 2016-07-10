import {bootstrap}    from '@angular/platform-browser-dynamic';
import {AppComponent} from './app.component';
import {disableDeprecatedForms, provideForms} from '@angular/forms';
//import {HashLocationStrategy, LocationStrategy, ROUTER_PROVIDERS} from "@angular/router-deprecated";
//import {provide} from "@angular/core";

bootstrap(AppComponent,[
        disableDeprecatedForms(),
        provideForms()
    ]);
/*
 bootstrap(AppComponent, [
 ROUTER_PROVIDERS,
 provide(LocationStrategy, {useClass: HashLocationStrategy})
 ]).catch(err=>console.error(err));*/
