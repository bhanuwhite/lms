import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environment/environment';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-content-details',
  templateUrl: './content-details.component.html',
  styleUrls: ['./content-details.component.scss'],
})
export class ContentDetailsComponent implements OnInit {
  public imgUrl = environment.apiUrl;
  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private sanitizer: DomSanitizer
  ) {}
  id: number = 0;
  isLoading: boolean = false;
  public techArr: string[] = [];
  singleContent: any;
  public img_url = environment.apiUrl;
  public courseIncludes: string[] = [];

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
      this.videoUrl = this.getSafeVideoUrl(res['data'].attributes.link);
      this.techArr = Object.values(this.singleContent.attributes.technologies);
      this.courseIncludes = this.singleContent.attributes.course_include.filter(
        (item: string) => item !== null
      );
      this.isLoading = false;
    });
  }
  public videoUrl!: SafeResourceUrl;
  extractVideoId(link: string): string {
    const regex =
      /youtu(?:\.be|be\.com)\/(?:.*v(?:\/|=)|(?:.*\/)?)([a-zA-Z0-9-_]+)/;
    const match = link?.match(regex);
    return match ? match[1] : '';
  }
  public getSafeVideoUrl(link: string): SafeResourceUrl {
    const videoId = this.extractVideoId(link);
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }
}
