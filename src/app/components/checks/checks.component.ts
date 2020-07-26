import { Component, OnInit } from '@angular/core';
import { Person } from '../../models/person';
import { PersonService } from '../../services/person.service';
import { Global } from '../../services/global';

@Component({
  selector: 'app-checks',
  templateUrl: './checks.component.html',
  styleUrls: ['./checks.component.css'],
  providers: [PersonService]
})
export class ChecksComponent implements OnInit {

  selectedResult: string;
  selectedCountry: string;
  results: string[] = ['Sano', 'Infectado', 'Inmune'];
  countries: string[] = [];
  
  public url: string;
  public title: string;

	public persons: Person[];

  constructor(
    private _personService: PersonService
  ) { 
    this.url = Global.url;
    this.title = "Listado de análisis";
    this.selectedResult = 'Ninguno';
    this.selectedCountry = 'Ninguno';
  }

  ngOnInit(): void {
    this.getPersons();
  }

  getIndexAndColours(){
    this.persons.map((person, index) => {
      person.position = index + 1;
      if(person.result === 'healthy') {
        person.result = 'Sano';
        person.resultColor = 'Green';
      }
      if(person.result === 'infected') {
        person.result = 'Infectado';
        person.resultColor = 'Red';
      }
      if(person.result === 'immune') {
        person.result = 'Inmune';
        person.resultColor = 'Blue';
      }
      return person
    });
  }

  getPersons() {
		this._personService.getPersons().subscribe(
			response => {
				if(response.persons) {
          this.persons = response.persons;
          this.getIndexAndColours();

          for(let i = 0; i < this.persons.length; i++) {
            if(!this.countries.includes(this.persons[i].country))
              this.countries.push(this.persons[i].country);
          }

				}
			},
			error => {
				console.log(<any>error);
			}
		);
  }

  getResultsByFilter() {
    if(this.selectedCountry === 'Ninguno' && this.selectedResult === 'Ninguno') {
      this.getPersons();
      this.title = 'Listado de análisis'
      return;
    }

    let result;
    let country;
    switch(this.selectedResult) {
      case 'Sano': result = 'healthy';
                    break;
      case 'Infectado': result = 'infected';
                    break;
      case 'Inmune': result = 'immune';
                    break;
      default: result = '';
                    break;
    }

    (this.selectedCountry === 'Ninguno')? country = '' : country = this.selectedCountry;

    if(result === '' && country !== '') {
      this.title = `Listado de análisis (filtrado por País: ${this.selectedCountry})`;
    } else if(result !== '' && country === '') {
      this.title = `Listado de análisis (filtrado por Resultado: ${this.selectedResult})`;
    } else {
      this.title = `Listado de análisis (filtrado por País: ${this.selectedCountry} y Resultado: ${this.selectedResult})`;
    }

		this._personService.getResultsByFilter(country, result).subscribe(
			response => {
				if(response.persons) {
          this.persons = response.persons;
          this.getIndexAndColours();
				}
			},
			error => {
				console.log(<any>error);
			}
		);
  }
}
