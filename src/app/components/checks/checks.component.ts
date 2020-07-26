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
  displayedColumns: string[] = ['position', 'name', 'country', 'result'];
  
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

  getPersons() {
		this._personService.getPersons().subscribe(
			response => {
				if(response.persons) {
          this.persons = response.persons;
//          this.getIndexAndColours();

          for(let i = 0; i < this.persons.length; i++) {
            if(!this.countries.includes(this.persons[i].country))
              this.countries.push(this.persons[i].country);
          }
          console.log(this.persons);
				}
			},
			error => {
				console.log(<any>error);
			}
		);
  }

}
