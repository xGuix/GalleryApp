import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../../services/housing.service';
import { HousingLocation } from '../../interfaces/housinglocation';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  template: `
    <article *ngIf="housingLocation">
      <img class="listing-photo" [src]="housingLocation.photo"
        alt="Exterior photo of {{ housingLocation.name }}"/>
      <section class="listing-description">
        <h2 class="listing-heading">{{ housingLocation.name }}</h2>
        <p class="listing-location">{{ housingLocation.city }}, {{ housingLocation.state }}</p>
      </section>
      <section class="listing-features">
        <h2 class="section-heading"> About this housing location </h2>
        <ul>
          <li>Units available: {{ housingLocation.availableUnits }}</li>
          <li>Does this location have wifi: {{ housingLocation.wifi ? "Yes" : "no" }}</li>
          <li>Does this location have laundry: {{ housingLocation.laundry ? "Yes":"no" }}</li>
        </ul>
      </section>
      <br/>
      <section class="listing-apply">
        <h2 class="section-heading">Apply now to live here</h2>
        <form [formGroup]="applyForm" (submit)="submitApplication()">
          <label for="first-name">First Name</label>
          <input id="first-name" type="text" formControlName="firstName">

          <label for="last-name">Last Name</label>
          <input id="last-name" type="text" formControlName="lastName">

          <label for="email">Email</label>
          <input id="email" type="email" formControlName="email">
          <button type="submit" class="primary"> Apply now </button>
        </form>
      </section>
    </article>
  `,
  styleUrl: './details.component.scss'
})
export class DetailsComponent {

  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  housingLocation: HousingLocation | undefined;
  applyForm= new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  });

  constructor() {}

  ngOnInit() {
    const housingLocationId = parseInt(this.route.snapshot.params['id'], 10);
    this.housingService.getHousingLocationById(housingLocationId).then(
      hl => {
        this.housingLocation = hl;
      }
    );
  }

  submitApplication(){
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? '',
    );
  }
}
