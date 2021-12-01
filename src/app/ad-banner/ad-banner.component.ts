import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ad-banner',
  template: `
            <div class="ad-banner-example">
              <h3>Advertisements</h3>
              <ng-template adHost></ng-template>
            </div>
          `,
  styleUrls: ['./ad-banner.component.scss']
})
export class AdBannerComponent implements OnInit {
  @Input() ads: AdItem[];

  constructor() { }

  ngOnInit(): void {
  }

}
