import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './global';
//import { PersonForm } from '../models/personForm';

@Injectable()
export class PersonService {
	public url: string;

	constructor(
		private _http: HttpClient
	) {
		this.url = Global.url;
    }
    
    getPersons(): Observable<any> {
		let headers = new HttpHeaders().set("Content-Type", "application/json");

		return this._http.get(this.url + "covid/checks", {headers: headers});
    }

}