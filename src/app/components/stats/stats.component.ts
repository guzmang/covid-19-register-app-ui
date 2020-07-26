import { Component, OnInit } from '@angular/core';
import { Stats } from '../../models/stats';
import { PersonService } from '../../services/person.service';
import { Global } from '../../services/global';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css'],
  providers: [PersonService]
})
export class StatsComponent implements OnInit {

  public url: string;
  public title: string;
  
  public stats: Stats;

	constructor(
		private _personService: PersonService
	) {
	    this.url = Global.url;
      this.title = "Estadísticas";
      this.stats = {
        'ok': true,
        'healthy': 0,
        'infected': 0,
        'immune': 0
      }
	}

  ngOnInit(): void {
    this.getStats();
  }

  getStats() {
		this._personService.getStats().subscribe(
			response => {
				if(response) {
          this.stats = response;
				}
			},
			error => {
				console.log(<any>error);
			}
		);
  }
  
}
