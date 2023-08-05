import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

export type Claim = {
  quote: string;
  claim: string;
  geo: string;
  sources: string;
};

export type Dataset = {
  summary: string;
  description: string;
};

export type FoundDataset = {
  id: string;
  relevance: number;
  document: Dataset;
};

export type FindDatasetsResult = {
  relevant_datasets: FoundDataset[];
  need_more_context: boolean;
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  URL = 'https://ckangpt-api.uumpa.xyz';
  headers: any = {}

  constructor(private http: HttpClient) {
    this.headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa('gptckan:ckangpt')
    };
  }

  extractClaims(text: string) {
    return this.http.post<Claim[]>(`${this.URL}/extract_claims_from_text`, undefined, {params: {text}, headers: this.headers, withCredentials: true});
  }

  breakClaim(claim: string) {
    return this.http.post<string[]>(`${this.URL}/break_claim_to_subclaims`, undefined, {params: {claim}, headers: this.headers, withCredentials: true});
  }

  generateQueries(claims: string[]) {
    return this.http.post<string[]>(`${this.URL}/get_potential_dataset_names`, undefined, {params: {claims: claims.join('\n')}, headers: this.headers, withCredentials: true});
  }

  findDatasets(claim: string, queries: string[]) {
    return this.http.post<FindDatasetsResult>(`${this.URL}/find_datasets`, undefined, {params: {user_prompt: claim, db_queries: queries.join('\n')}, headers: this.headers, withCredentials: true}).pipe(
      map((result) => {
        if (result.relevant_datasets && result.relevant_datasets.length > 0) {
          result.relevant_datasets.sort((a: FoundDataset, b: FoundDataset) => b.relevance - a.relevance);
        }
        return result;
      })
    );
  }
}
