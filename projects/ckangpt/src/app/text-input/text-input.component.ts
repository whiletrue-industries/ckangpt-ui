import { Component, EventEmitter, Output } from '@angular/core';
import { ApiService } from '../api.service';
import { map, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.less']
})
export class TextInputComponent {

  @Output() next = new EventEmitter<string[]>();

  working = false;
  found = -1;
  text = '' /*`Canada sets corn yield record, Ontario sets winter wheat record

  Farmers Forum staff

  OTTAWA — Canada’s 2022 crop season produced a record corn harvest and third-largest wheat harvest.

  But Ontario saw a winter wheat yield record for both soft red and soft white which cracked 100 bu/ac for the first time. Ontario corn and soybean yields were healthy but dipped below Ontario’s 2021 record yields.

  That’s according to the latest figures from Statistics Canada.

  Canadian grain corn production rose 4 % in 2022 to a record 14.5 million tonnes grown on 3.6 million acres, according to StatCan. Corn yields edged up 0.2 bushels per acre to 160.4 bu/ac.
  Ontario’s average corn yields did better than that, at 166 bu/ac, though down 5.3 % from 2021 because of drier conditions in the southwest.

  Ontario soybean acres also went up 5.2 % in 2022 but production still fell 2.1 % to 4-million tonnes. The increased acreage couldn’t fully offset a 7 % decline in soybean yields to 48 bu/ac.
  Nationally, soybean production increased 4.3 % to 6.5 million tonnes in 2022. A 0.7 % decrease in harvested area was offset by a 5 % increase in Canadian soybean yields.

  Ontario produced less winter wheat in 2022 than in 2021 — with just over 2.2 million tonnes harvested from 848,000 acres in 2022. The 2021 wheat crop weighed in at nearly 2.7 million tonnes on just over 1 million acres. Though a smaller crop than a year earlier, record yield performance was the story of Ontario’s 2022 winter wheat: StatCan recorded a whopping 96.5 bu/ac average for all three winter wheat types. Agricorp also reported record-range yields.
  `;*/

  constructor(private api: ApiService) { }

  analyze() {
    this.working = true;
    this.api.extractClaims(this.text).pipe(
      map(claims => claims.filter(claim => claim.geo === 'ON')),
      catchError(error => {
        console.error("HTTP Error occurred:", error);
        this.working = false;
        return of([]); // return an empty array or handle as needed
      })
    ).subscribe(claims => {
      this.found = claims.length;
      this.working = false;
      if (this.found > 0) {
        this.next.emit(claims.map(claim => claim.claim));
      }
    });
  }
}
