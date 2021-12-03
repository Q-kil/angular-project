import { Component, Input, OnInit, ViewChild, ComponentFactoryResolver, OnDestroy, OnChanges } from '@angular/core';

import { AdDirective } from './ad.directive';
import { AdItem } from './ad-item';
import { AdComponent } from './ad.component';

console.log('AdDirective', AdDirective);
@Component({
  selector: 'app-ad-banner',
  template: `
              <div class="ad-banner-example">
                <h3>Advertisements</h3>
                <ng-template adHost></ng-template>
              </div>
            `
})
export class AdBannerComponent implements OnChanges, OnInit, OnDestroy {
  @Input() ads: AdItem[];
  currentAdIndex = -1;
  @ViewChild(AdDirective, {static: true}) adHost: AdDirective;
  interval: any;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnChanges(changes) {
    console.log('changes', changes);
  }

  ngOnInit() {
    this.loadComponent();
    this.getAds();
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  loadComponent() {
    this.currentAdIndex = (this.currentAdIndex + 1) % this.ads.length;
    const adItem = this.ads[this.currentAdIndex];

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);

    console.log('adhost', this.adHost);
    const viewContainerRef = this.adHost.viewContainerRef;

    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent<AdComponent>(componentFactory);
    componentRef.instance.data = adItem.data;
  }

  getAds() {
    this.interval = setInterval(() => {
      this.loadComponent();
    }, 3000);
  }
}
