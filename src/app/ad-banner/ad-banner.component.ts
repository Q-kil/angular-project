import { AdDirective } from '../directives/ad.directive';
import { Component, ComponentFactoryResolver, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { AdComponent } from '../directives/ad.component';
import { AdItem } from '../directives/ad-item';

console.log('AdDirective', AdDirective);
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
export class AdBannerComponent implements OnInit, OnChanges {
  @Input() ads: AdItem[];
  currentAdIndex = -1;
  @ViewChild(AdDirective, {static: true}) adHost: AdDirective;
  interval: any;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnChanges(changes) {
    console.log('changes', changes);
  }

  ngOnInit(): void {
    this.loadComponent();
    this.getAds();
  }

  loadComponent() {
    this.currentAdIndex = (this.currentAdIndex + 1) % this.ads.length;
    const adItem = this.ads[this.currentAdIndex];

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);
    console.log('adhost', this.adHost);
    // const viewContainerRef = this.adHost.viewContainerRef;
    // viewContainerRef.clear();

    // const componentRef = viewContainerRef.createComponent<AdComponent>(componentFactory);
    // componentRef.instance.data = adItem.data;
  }

  getAds() {
    this.interval = setInterval(() => {
      this.loadComponent();
    }, 2000);
  }

}
