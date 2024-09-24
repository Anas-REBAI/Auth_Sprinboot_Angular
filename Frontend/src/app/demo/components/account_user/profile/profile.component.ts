import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  
  selectedTab: string = 'profileInformation';
  
  changeTab(tabName: string) {
    this.selectedTab = tabName;
  }

}
