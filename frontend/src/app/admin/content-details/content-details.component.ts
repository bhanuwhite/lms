import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { ContentResponse } from 'src/app/models/content';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-content-details',
  templateUrl: './content-details.component.html',
  styleUrls: ['./content-details.component.scss'],

})
export class ContentDetailsComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private apiService: ApiService) { }
  value: number = 0;
  id: number=0;
  isLoading:boolean= false;
  singleContent!: ContentResponse;

  ngOnInit(): void {
    this.value = 52;
    this.activatedRoute.params.subscribe(res => {
      this.id = res['id'];
      console.log(this.id);
    });
    this.getSingleContent(this.id);
  }

  /**
   * getSingleContent
   */
  public getSingleContent(id:number): void {
    this.isLoading = true;
    // const content:any = localStorage.getItem('contentData');
    // if (content) {
    //   this.singleContent = JSON.parse(content);
    //   console.log('singleContent', this.singleContent);
    //   this.isLoading = false;
    // }

    this.apiService.getSingleContent(id).subscribe(res => {
      console.log(res.data);
      this.singleContent= res.data;
      this.isLoading = false;
    });
  }




}
