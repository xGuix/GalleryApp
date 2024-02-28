import { Injectable } from '@angular/core';
import { HousingLocation } from '../interfaces/housinglocation';

@Injectable({
  providedIn: 'root'
})
export class HousingService {

  url = 'http://localhost:3000/locations';

  constructor() { }

  async getAllHousingLocations(): Promise <HousingLocation[]> {
    const data = await fetch(this.url);
    return await data.json() ?? [];
  }

  async getHousingLocationById(id: number): Promise <HousingLocation | undefined> {
    const data = await fetch(`${this.url}/?id=${id}`);
    const result: HousingLocation[] = await data.json();
    if(result.length > 0 ) {
      return result[0];
    } else {
      throw new Error("ID doesn't exist");
    }
  }

  submitApplication(firstName: string, lastName: string, email: string){
    console.log(firstName, lastName, email);
  }
}
