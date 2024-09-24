import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { SharedService } from '../demo/service/Shared_service/shared.service';
import { EnterpriseService } from '../demo/service/Enterprise_service/enterprise.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent implements OnInit{

    enterpriseName: string;
    logo:any ;
    

    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService, private sharedService : SharedService,private entrepriseService:EnterpriseService) { }

    ngOnInit() {
        this.enterpriseName = this.sharedService.getUserInfo('nom'); 
        this.logo=this.sharedService.getUserInfo('logo');  
       
    }

    exit(){
        this.sharedService.logOut()
    }

}
