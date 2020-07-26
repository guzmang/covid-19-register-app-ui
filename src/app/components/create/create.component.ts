import { Component, OnInit } from '@angular/core';
import { PersonForm } from '../../models/personForm';
import { PersonService } from '../../services/person.service';
import { Global } from '../../services/global';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [PersonService]
})
export class CreateComponent implements OnInit {

  public url: string;
  public title: string;
  public status: string;
  public errorText: string;

  public person: PersonForm;

	constructor(
		private _personService: PersonService
	) {
    this.url = Global.url;
    this.title = "Registrar persona";
		this.person = new PersonForm('', '', '', '', '');
	}

  ngOnInit(): void {
  }

  dnaIsWholeNumberAfterSqrt(dna) {
    let dnaLength = Math.sqrt(dna.length);
    return (dnaLength - Math.floor(dnaLength) === 0);
  }

  dnaBases(dna) {
    let regExp = /[ACGT]/g;
    let search = dna.match(regExp);
    return (search ? (dna.match(regExp).length === dna.length) : false);
  }

  onSubmit(form) {
    this.errorText = null;
    this.status = null;
    let people = this.person;

    if(people.name === '' || people.name === undefined || people.name === null) {
      this.errorText = 'El nombre es un campo obligatorio.';
      return;
    }

    if(people.country === '' || people.country === undefined || people.country === null) {
      this.errorText = 'El país es un campo obligatorio.';
      return;
    }

    if(people.dna === '' || people.dna === undefined || people.dna === null) {
      this.errorText = 'El ADN es un campo obligatorio.'
      return;
    }

    if ((typeof people.dna === 'string')) {
        people.dna = people.dna.toUpperCase();
        people.dna = people.dna.replace(/\n/g, '')
        people.dna = people.dna.replace(/\t/g, '')
        people.dna = people.dna.replace(/ /g, '')
    } else {
        this.errorText = 'El ADN debe ser de tipo String'
        return;
    }

    if(people.dna.length < 36) {
      this.errorText = 'El ADN debe tener una longitud mínima de 36 y respetar una secuencia NxN (Con un valor mínimo de N=6).'
      return;
    }

    if (!this.dnaIsWholeNumberAfterSqrt(people.dna)) {
      this.errorText = 'El ADN debe ser una secuencia NxN (Con un valor mínimo de N=6).'
      return;
    }

    if (!this.dnaBases(people.dna)) {
      this.errorText = 'ADN no valido. La base nitrogenada del ADN sólo puede contener: A, T, C y/o G (sin importar orden).';
      return;
    }
  
		this._personService.savePerson(this.person).subscribe(
			response => {
        this.status = 'success';
        form.reset();
			},
			error => {
        console.log(<any>error);
        this.status = 'failed';
			}
		);
  }
}
