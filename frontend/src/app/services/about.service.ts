import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AboutContent } from '../models/about-content';
import { Content } from '../models/content';

@Injectable({
  providedIn: 'root'
})
export class AboutService {

  private aboutLms = '../../assets/data/about/aboutlms.json';
  constructor(private httpClientRef: HttpClient) { }
  //get aboutlms data
  getAboutLmsData(): Observable<AboutContent[]> {
    return this.httpClientRef.get<AboutContent[]>(this.aboutLms);
  }
}
