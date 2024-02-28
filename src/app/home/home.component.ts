import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingService } from './../../services/housing.service';
import { HousingLocation } from './../../interfaces/housinglocation';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HousingLocationComponent,
    RouterModule
  ],
  template: `
    <section>
    <form>
      <input type="text" placeholder="Filter by city" #filterInput>
      <button class="primary" type="button" (click)="filterResults(filterInput.value)"> Search </button>
    </form>
  </section>
  <section class="results">
    <app-housing-location
      *ngFor="let housingLocation of filteredLocationList" [housingLocation]="housingLocation">
    </app-housing-location>
  </section>
  `,
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  housingService: HousingService = inject(HousingService);
  housingLocationList: HousingLocation[] = [];
  filteredLocationList: HousingLocation[] = [];

  constructor(){
    this.housingService.getAllHousingLocations().then((housingLocationList: HousingLocation[]) => {
      this.housingLocationList = housingLocationList;
      this.filteredLocationList = housingLocationList;
    });
  }

  filterResults(textField: string) {
    if(!textField) {
      this.filteredLocationList = this.housingLocationList;
      return;
    }
    this.filteredLocationList = this.housingLocationList.filter(
      housingLocation => housingLocation?.city.toLowerCase().includes(textField.toLowerCase())
    );
  }
}
