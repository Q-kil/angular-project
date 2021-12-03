import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectionComponent } from './projection/projection.component';
import { AdBannerComponent } from './ad-banner.component';
import { HeroJobAdComponent } from './hero-job-ad.component';
import { HeroProfileComponent } from './hero-profile.component';
import { AdDirective } from './ad.directive';

@NgModule({
  declarations: [
    AppComponent,
    ProjectionComponent,
    AdBannerComponent,
    // HeroJobAdComponent,
    // HeroProfileComponent,
    AdDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    Greeter
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

class Greeter {
  greet(name: string) {
    return 'hello' + name;
  }
}