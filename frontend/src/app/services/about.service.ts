import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { AboutContent } from '../models/about-content';

function _window(): any {
  // return the global native browser window object
  return window;
}

@Injectable({
  providedIn: 'root',
})
export class AboutService {
  get nativeWindow(): any {
    return _window();
  }

  private aboutLms = '../../assets/data/about/aboutlms.json';
  constructor(private httpClientRef: HttpClient) {}
  //get aboutlms data
  getAboutLmsData(): Observable<AboutContent[]> {
    return this.httpClientRef.get<AboutContent[]>(this.aboutLms);
  }

  private cartLength = new BehaviorSubject<number>(0);
  userCart$ = this.cartLength.asObservable();
  public userCartLength(value: number): void {
    this.cartLength.next(value);
  }

  public progressValue = new BehaviorSubject<number>(0);
  watchCount$ = this.progressValue.asObservable();
  public watchCourseCount(value: number): void {
    this.progressValue.next(value);
  }



}
