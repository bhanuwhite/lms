import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MegaMenuItem, MenuItem, MessageService } from 'primeng/api';
import { ApiService } from '../services/api.service';
import courseList from '../../assets/data/courseDetails.json';

import { TieredMenuModule } from 'primeng/tieredmenu';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [MessageService],
})
export class UserComponent implements OnInit {
  contentData!: any;
  currentRate:number=2;

 categories = [  { label: 'Category 1', children: [ {  label: 'Subcategory 1.1',        children: []
      },
      {
        label: 'Subcategory 1.2',
        children: []
      }
    ]
  },
  {
    label: 'Category 2',
    children: [
      {
        label: 'Subcategory 2.1',
        children: []
      },
      {
        label: 'Subcategory 2.2',
        children: []
      }
    ]
  }
];




  isLoading: boolean = false;
  public items: any;
  public courseList: {
    id: number;
    courseImage: string;
    courseTitle: string;
    author: string;
    rating: number;
    price: number;
  }[] = courseList;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private messageService: MessageService
  ) {}

public   item!: MenuItem[];



  ngOnInit(): void {
    this.iconMenu();
    this.getContent();



        this.item = [
            {
                label: 'Development',
                items: [
                    {
                        label: 'Web Development',
                        items: [
                            {
                                label: 'React Js',
                                routerLink: '/user/courseDetails'
                            },
                            {
                                label: 'Angular',
                                routerLink: '/user/courseDetails'
                            },
                            {
                                label: 'Java Script',
                                routerLink: '/user/courseDetails'
                            },
                            {
                                label: 'Python',
                                routerLink: '/user/courseDetails'
                            }
                        ]
                    },
                    {
                        label: 'Data Science',
                        items: [
                          {
                              label: 'Machine Learning',
                              routerLink: '/user/courseDetails'
                          },
                          {
                              label: 'Deep Learning',
                              routerLink: '/user/courseDetails'
                          },
                          {
                              label: 'Chat GPT',
                              routerLink: '/user/courseDetails'

                          },
                          {
                              label: 'AI',
                              routerLink: '/user/courseDetails'
                          }
                      ]
                    },
                    {
                        label: 'Programming Lunguages',
                        items: [
                          {
                              label: 'C',
                              routerLink: '/user/courseDetails'
                          },
                          {
                              label: 'C++',
                              routerLink: '/user/courseDetails'
                          },
                          {
                              label: 'C #',
                              routerLink: '/user/courseDetails'
                          },
                          {
                              label: 'JAVA',
                              routerLink: '/user/courseDetails'
                          }
                      ]
                    }
                ]
            },
            {
                label: 'Bussiness',
                items: [
                    {
                        label: 'Entreprenuership',
                        items: [
                          {
                              label: ' Entreprenuership Fundamentals',
                              routerLink: '/user/courseDetails'
                          },
                          {
                              label: 'Bussiness Fundamentals',
                              routerLink: '/user/courseDetails'
                          },
                          {
                              label: 'StartUp',
                              routerLink: '/user/courseDetails'
                          },
                          {
                              label: 'Online Business',
                              routerLink: '/user/courseDetails'
                          }
                      ]

                    },
                    {
                        label: 'Sales',
                        items: [
                          {
                              label: 'Sales Skills',
                              routerLink: '/user/courseDetails'
                          },
                          {
                              label: 'B2B Skills',
                              routerLink: '/user/courseDetails'
                          },
                          {
                              label: 'Linkdin',
                              routerLink: '/user/courseDetails'
                          },
                          {
                              label: 'Cold Email',
                              routerLink: '/user/courseDetails'
                          }
                      ]
                    },
                    {
                        label: 'Communication',
                        items: [
                          {
                              label: ' Communication Skills ',
                              routerLink: '/user/courseDetails'
                          },
                          {
                              label: 'Presentation Skills',
                              routerLink: '/user/courseDetails'
                          },
                          {
                              label: 'Writing',
                              routerLink: '/user/courseDetails'
                          },

                          {
                              label: 'Public Speaking',
                              routerLink: '/user/courseDetails'
                          }
                      ]
                    },
                    {
                        label: 'Management',
                        items: [
                          {
                              label: 'Product Management',
                              routerLink: '/user/courseDetails'
                          },
                          {
                              label: 'Mangement Skills',
                              routerLink: '/user/courseDetails'
                          },
                          {
                              label: 'LeaderShip',
                              routerLink: '/user/courseDetails'
                          },
                          {
                              label: 'Manager training',
                              routerLink: '/user/courseDetails'
                          }
                      ]
                    }
                ]
            },
            {
                label: 'Finance & Accounting',
                items: [
                    {
                        label: 'Finance',
                        items: [
                          {
                              label: 'Banking',
                              routerLink: '/user/courseDetails'
                          },
                          {
                              label: 'Personal Banking',
                              routerLink: '/user/courseDetails'
                          }
                      ]
                    },
                    {
                        label: 'Taxes',
                        items: [
                          {
                              label: 'Goods and Services ',
                              routerLink: '/user/courseDetails'
                          },
                          {
                              label: 'Accounting',
                              routerLink: '/user/courseDetails'
                          },
                          {
                              label: 'Tax Preparation',
                              routerLink: '/user/courseDetails'
                          }
                      ]


                    },
                    {
                        label: 'Compliance',
                        items: [
                          {
                              label: 'IFRS',
                              routerLink: '/user/courseDetails'
                          },
                          {
                              label: 'Fraud Analytics',
                              routerLink: '/user/courseDetails'
                          },
                          {
                              label: 'Criminology',
                              routerLink: '/user/courseDetails'
                          }
                      ]
                    }
                ]
            },
            {
                label: 'IT & Software',
                items: [
                    {
                        label: 'IT Certification',
                        items: [
                            {
                                label: 'AWS Certification',
                                routerLink: '/user/courseDetails'

                            },
                            {
                                label: 'Microsoft Certification',
                                routerLink: '/user/courseDetails'
                            }
                        ]
                    },
                    {
                        label: 'Network & Security',
                        items: [
                            {
                                label: 'Ethical Hacking',
                                routerLink: '/user/courseDetails'
                            },
                            {
                              label: 'Cyber Security',
                              routerLink: '/user/courseDetails'
                          }
                        ]
                    }
                ]
            }

        ];




    }

    public display:boolean=false;
public tieredMenu():void{

  this.display=true
}


  public iconMenu(): void {
    this.items = [
      {
        label: 'Action',
        items: [
          {
            label: 'Logout',
            icon: 'pi pi-sign-out mt-0 text-danger',
            command: () => {
              this.onLogout();
            },
          },
          {
            label: 'Change Password',
            icon: 'pi pi-key ',
            command: () => {},
          },
        ],
      },
    ];
  }

  public onLogout(): void {
    this.router.navigateByUrl('/login');
    localStorage.clear();
    location.reload();
  }

  public getContent(): void {
    this.isLoading = true;
    this.apiService.getContent().subscribe((res) => {
      try {
        this.contentData = res;
        console.log(this.contentData);
        this.isLoading = false;
      } catch (error) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Somethinng went to wrong !!',
        });
      }
    });
  }
 public courseDetails!:string
  openCourseDetails(course:{}){
      this.router.navigate(['user/courseDetails']);
      this.courseDetails =JSON.stringify(course)
      localStorage.setItem('courseDetails',this.courseDetails);
      console.log(this.courseDetails);

  }

  buyCourse(course:{}){
    this.courseDetails =JSON.stringify(course)
    localStorage.setItem('courseDetails',this.courseDetails);
    console.log(this.courseDetails);

    this.router.navigate(['user/payment']);
  }
}
