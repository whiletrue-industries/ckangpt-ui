import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-claim-breaker',
  templateUrl: './claim-breaker.component.html',
  styleUrls: ['./claim-breaker.component.less']
})
export class ClaimBreakerComponent implements OnInit {
  @Input() claim: string = '';
  @Output() next = new EventEmitter<string[]>();

  working = false;
  found = -1;
  results: string[] = [];

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.working = true;
    this.api.breakClaim(this.claim).subscribe(results => {
      this.results = results;
      this.working = false;
      this.found = results.length;
      if (this.found > 0) {
        this.next.emit(results);
      }
    });
  }
}
