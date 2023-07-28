import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService, SortEvent } from 'primeng/api';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-teche-cat',
  templateUrl: './teche-cat.component.html',
  styleUrls: ['./teche-cat.component.scss'],
})
export class TecheCatComponent implements OnInit {
  products: any;
  public showPopup: boolean = false;
  public roleName!: string | null;
  public techForm!: FormGroup;
  headerName!: string | null;
  public formValue: string = 'new';
  Technologies: { tech: string }[] = [];
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.techForm = this.fb.group({
      tech: '',
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

  public techData: any;
  private techList: string[] = [];

  private getTech(): void {
    this.apiService.getTechnoogy().subscribe((res) => {
      this.techData = res.data;
      res.data.map((resObj: any) => {
        this.Technologies.push(resObj.attributes.technologies);
      });
      this.techList = res.data.map((res: any) => {
        return res.attributes.technologies.tech.toLowerCase();
      });
    });
  }

  public categoryData: any;
  private categoryList: string[] = [];
  private getCategory(): void {
    this.apiService.getCategory().subscribe((res) => {
      this.categoryData = res.data;
      this.categoryList = res.data.map((res: any) => {
        return res.attributes.categories.tech.toLowerCase();
      });
    });
  }

  public addTech(): void {
    this.showPopup = true;
    this.formValue = 'new';
  }

  public addCat(): void {
    this.showPopup = true;
    this.formValue = 'new';
  }
  public techSubmit(): void {
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

          if (this.techList.includes(this.techForm.value.tech.toLowerCase())) {
            this.messageService.add({
              severity: 'warn',
              summary: `${this.techForm.value.tech} Technology already exists.`,
              life: 3000,
            });
            this.techForm.reset();
          } else {

            this.apiService.postTechnoogy(postTech).subscribe((res) => {
              this.getTech();
              this.techForm.reset();
              this.messageService.add({
                severity: 'success',
                summary: `${this.techForm.value.tech} Technology added.`,
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
            this.categoryList.includes(this.techForm.value.tech.toLowerCase())
          ) {

            this.messageService.add({
              severity: 'warn',
              summary: `${this.techForm.value.tech} Category already exists.`,
              life: 4000,
            });
            this.techForm.reset();
          } else {
            this.apiService.postCategory(postCat).subscribe((res) => {
              this.getCategory();
              this.techForm.reset();
              this.messageService.add({
                severity: 'success',
                summary: `${this.techForm.value.tech} Category added.`,
                life: 3000,
              });
            });
          }
        } else if (this.formValue === 'edit') {
          this.apiService.putCategory(this.editId, postCat).subscribe((res) => {
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
  public deleteTech(item: any): void {
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

  editId!: number;
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

  public deleteCat(item: any): void {
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
}
