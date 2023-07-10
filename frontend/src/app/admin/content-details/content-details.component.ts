import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { SingleCourseObj } from 'src/app/models/content';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-content-details',
  templateUrl: './content-details.component.html',
  styleUrls: ['./content-details.component.scss'],
})
export class ContentDetailsComponent implements OnInit {
  public imgUrl = environment.apiUrl
  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService
  ) {}
  id: number = 0;
  isLoading: boolean = false;
  // SingleCourseObj  interface
  singleContent: any
  public img_url = environment.apiUrl ;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((res) => {
      this.id = res['id'];
    });
    this.getSingleContent(this.id);
  }

  /**
   * getSingleContent
   */
  public getSingleContent(id: number): void {
    this.isLoading = true;
    this.apiService.getSingleContent(id).subscribe((res) => {
      this.singleContent = res.data;
      console.log(this.singleContent);
      this.isLoading = false;
    });
  }
}
