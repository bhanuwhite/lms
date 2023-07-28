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
  private getTech(): void {
    this.apiService.getTechnoogy().subscribe((res) => {
      this.techData = res.data;
      res.data.map((resObj: any) => {
        this.Technologies.push(resObj.attributes.technologies);
      });
    });
  }

  public categoryData: any;
  private getCategory(): void {
    this.apiService.getCategory().subscribe((res) => {
      this.categoryData = res.data;
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
        if (this.formValue == 'new') {
          this.apiService.postTechnoogy(postTech).subscribe((res) => {
            this.getTech();
            this.techForm.reset();
          });
        } else {
          this.apiService
            .putTechnoogy(this.editId, postTech)
            .subscribe((res) => {
              this.getTech();
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
          this.apiService.postCategory(postCat).subscribe((res) => {
            this.getCategory();
            this.techForm.reset();
          });
        } else if (this.formValue === 'edit') {
          this.apiService.putCategory(this.editId, postCat).subscribe((res) => {
            this.getCategory();
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
        this.messageService.add({ severity: 'success', summary: 'Deleted.' });
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
        this.messageService.add({ severity: 'success', summary: 'Deleted.' });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Cancelled' });
      },
    });
  }
}
