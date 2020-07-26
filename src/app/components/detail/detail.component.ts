import { Component, OnInit } from '@angular/core';
import { PersonForm } from '../../models/personForm';
import { PersonService } from '../../services/person.service';
import { Global } from '../../services/global';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers: [PersonService]
})
export class DetailComponent implements OnInit {
	public url: string;
	public title: string;
	public person: PersonForm;

	constructor(
		private _personService: PersonService,
		private _route: ActivatedRoute
	) {
		this.url = Global.url;
	    this.title = "Detalle";
	}

	ngOnInit() {
		this._route.params.subscribe(params => {
			let id = params.id;

			this.getPersonById(id);
		});
	}

	getPersonById(id) {
		this._personService.getPersonById(id).subscribe(
			response => {
				let aux = response.person.dna;
				let dna = '';
				for(let i = 0; i < aux.length; i++) {
					dna = dna + aux[i];
				}
				let personDetail = response.person;
				personDetail.dna = dna;
				this.person = personDetail;
			},
			error => {
				console.log(<any>error);
				console.log("La persona con ese id no existe.");
			}
		);
	}

}
