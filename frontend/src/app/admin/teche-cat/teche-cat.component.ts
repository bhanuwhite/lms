import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService, SortEvent } from 'primeng/api';
import { UserCatData, UserTechData } from 'src/app/models/track';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-teche-cat',
  templateUrl: './teche-cat.component.html',
  styleUrls: ['./teche-cat.component.scss'],
})
export class TecheCatComponent implements OnInit {
  public showPopup: boolean = false;
  public roleName!: string | null;
  public techForm!: FormGroup;
  public headerName!: string | null;
  public formValue: string = 'new';
  private Technologies: { tech: string }[] = [];
  public techData: UserTechData[] = [];
  private techList: string[] = [];
  private editId!: number;
  public categoryData: UserCatData[] = [];
  private categoryList: string[] = [];
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.techForm = this.fb.group({
      tech: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.pattern('^[a-zA-Z., ]+$'),
        ],
      ],
    });
  }
  ngOnInit(): void {
    this.routerName();
    this.getTech();
    this.getCategory();
  }

  private routerName(): void {
    this.router.paramMap.subscribe((param) => {
      this.roleName = param.get('technology');
      this.headerName = this.roleName;
    });
  }

  private getTech(): void {
    this.apiService.getTechnoogy().subscribe((res) => {
      this.techData = res.data;
      res.data.map((resObj: UserTechData) => {
        this.Technologies.push(resObj.attributes.technologies);
      });
      this.techList = res.data.map((res: UserTechData) => {
        return res.attributes.technologies.tech.toLowerCase();
      });
    });
  }

  private getCategory(): void {
    this.apiService.getCategory().subscribe((res) => {
      this.categoryData = res.data;
      this.categoryList = res.data.map((res: UserCatData) => {
        return res.attributes.categories.tech.toLowerCase();
      });
    });
  }

  public addTech(): void {
    this.techForm.reset();
    this.showPopup = true;
    this.formValue = 'new';
  }

  public addCat(): void {
    this.techForm.reset();
    this.showPopup = true;
    this.formValue = 'new';
  }
  public techSubmit(): void {
    const myValue = this.techForm.value.tech;
    if (this.techForm.valid) {
      try {
        if (this.headerName?.toLowerCase() === 'technology') {
          const postTech = {
            data: {
              technologies: {
                tech: this.techForm.value.tech,
              },
            },
          };
          if (this.formValue === 'new') {
            this.getTech();
            if (
              this.techList.includes(
                this.techForm.value.tech.toLowerCase().trim()
              )
            ) {
              this.messageService.add({
                severity: 'warn',
                summary: `${myValue} Technology already exists.`,
                life: 3000,
              });
              this.techForm.reset();
            } else {
              this.apiService.postTechnoogy(postTech).subscribe((res) => {
                this.getTech();
                this.techForm.reset();
                this.messageService.add({
                  severity: 'success',
                  summary: `${myValue} Technology added.`,
                  life: 3000,
                });
              });
            }
          } else {
            this.apiService
              .putTechnoogy(this.editId, postTech)
              .subscribe((res) => {
                this.getTech();
                this.messageService.add({
                  severity: 'success',
                  summary: 'Technology edit successfull',
                });
              });
          }
          this.showPopup = false;
        } else if (this.headerName?.toLowerCase() === 'category') {
          const postCat = {
            data: {
              categories: {
                tech: this.techForm.value.tech,
              },
            },
          };
          if (this.formValue === 'new') {
            this.getCategory();
            if (
              this.categoryList.includes(
                this.techForm.value.tech.toLowerCase().trim()
              )
            ) {
              this.messageService.add({
                severity: 'warn',
                summary: `${myValue} Category already exists.`,
                life: 4000,
              });
              this.techForm.reset();
            } else {
              this.apiService.postCategory(postCat).subscribe((res) => {
                this.getCategory();
                this.techForm.reset();
                this.messageService.add({
                  severity: 'success',
                  summary: `${myValue} Category added.`,
                  life: 3000,
                });
              });
            }
          } else if (this.formValue === 'edit') {
            this.apiService
              .putCategory(this.editId, postCat)
              .subscribe((res) => {
                this.getCategory();
                this.messageService.add({
                  severity: 'success',
                  summary: 'Category edited successfull.',
                });
              });
          }
          this.showPopup = false;
        }
      } catch (err: any) {
        console.warn(err);
      }
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Please enter valid data',
      });
    }
  }

  public editTech(id: number, name: string): void {
    if (this.headerName?.toLowerCase() === 'technology') {
      this.showPopup = true;
      this.formValue = 'edit';
      this.techForm = this.fb.group({
        tech: name,
      });
      this.editId = id;
    }
  }
  public deleteTech(item: UserTechData): void {
    this.confirmationService.confirm({
      message: `Do you want to delete this ${item.attributes.technologies.tech} technology ?`,
      header: 'Delete Confirmation',
      accept: () => {
        this.apiService.deleteTechnoogy(item.id).subscribe((res) => {
          this.getTech();
        });
        this.messageService.add({
          severity: 'success',
          summary: `${item.attributes.technologies.tech} technology Deleted.`,
        });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Cancelled' });
      },
    });
  }

  public editCategory(id: number, name: string): void {
    if (this.headerName?.toLowerCase() === 'category') {
      this.showPopup = true;
      this.formValue = 'edit';
      this.techForm = this.fb.group({
        tech: name,
      });
      this.editId = id;
    }
  }

  public deleteCat(item: UserCatData): void {
    this.confirmationService.confirm({
      message: `Do you want to delete this ${item.attributes.categories.tech} Category ?`,
      header: 'Delete Confirmation',
      accept: () => {
        this.apiService.deleteCategory(item.id).subscribe((res) => {
          this.getCategory();
        });
        this.messageService.add({
          severity: 'success',
          summary: `${item.attributes.categories.tech} category deleted.`,
        });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Cancelled' });
      },
    });
  }
  public cancelForm(): void {
    this.showPopup = false;
    this.techForm.reset();
  }
}
