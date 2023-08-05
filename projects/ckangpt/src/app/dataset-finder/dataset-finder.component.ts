import { Component, Input } from '@angular/core';
import { ApiService, FoundDataset } from '../api.service';

@Component({
  selector: 'app-dataset-finder',
  templateUrl: './dataset-finder.component.html',
  styleUrls: ['./dataset-finder.component.less']
})
export class DatasetFinderComponent {

  @Input() claim: string = '';
  @Input() queries: string[] = [];

  working = false;
  found = -1;
  results: FoundDataset[] = [];

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.working = true;
    this.api.findDatasets(this.claim, this.queries).subscribe(result => {
      if (!result.need_more_context && result.relevant_datasets && result.relevant_datasets.length > 0) {
        this.results = result.relevant_datasets;
        this.working = false;
        this.found = this.results.length;
        if (this.found > 0) {
          // this.next.emit(results);
        }
      }
    });
  }

}
