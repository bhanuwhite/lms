import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-content-details',
  templateUrl: './content-details.component.html',
  styleUrls: ['./content-details.component.scss'],
})
export class ContentDetailsComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService
  ) {}
  id: number = 0;
  isLoading: boolean = false;
  singleContent: any;
  userLearnings: { u_learn: string }[] = [];

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
      this.userLearnings = this.singleContent.attributes.user_learning;
      this.isLoading = false;
    });
  }
}
