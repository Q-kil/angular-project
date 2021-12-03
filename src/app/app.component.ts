import { Component, OnInit } from '@angular/core';
import { AdItem } from './ad-item';
import { AdService } from './ad.services';

@Component({
  selector: 'app-root',
  // templateUrl: './app.component.html',
  template: `
    <div>
      <app-ad-banner [ads]="ads"></app-ad-banner>
    </div>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'angular-project';
  ads: AdItem[];

  constructor(private adService: AdService) { }

  ngOnInit() {
    this.ads = this.adService.getAds();
    console.log('this.ads', this.ads);
  }
}
