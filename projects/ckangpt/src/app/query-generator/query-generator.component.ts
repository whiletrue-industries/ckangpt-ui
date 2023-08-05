import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-query-generator',
  templateUrl: './query-generator.component.html',
  styleUrls: ['./query-generator.component.less']
})
export class QueryGeneratorComponent {
  @Input() claims: string[] = [];
  @Output() next = new EventEmitter<string[]>();

  working = false;
  found = -1;
  results: string[] = [];

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.working = true;
    this.api.generateQueries(this.claims).subscribe(results => {
      this.results = results;
      this.working = false;
      this.found = results.length;
      if (this.found > 0) {
        this.next.emit(results);
      }
    });
  }
}
