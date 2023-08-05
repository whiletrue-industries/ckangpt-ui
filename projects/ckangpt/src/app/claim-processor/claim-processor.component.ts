import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-claim-processor',
  templateUrl: './claim-processor.component.html',
  styleUrls: ['./claim-processor.component.less']
})
export class ClaimProcessorComponent {
  @Input() claim = '';

  subclaims: string[] = [];
  queries: string[] = [];
}
