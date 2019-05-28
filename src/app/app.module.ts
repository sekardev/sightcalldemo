import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { SightcallComponent } from './sightcall/sightcall.component';
import { RecommentComponent } from './recomment/recomment.component';
import { BadgesPipe } from './badges.pipe';
import { CarouselComponent } from './carousel/carousel.component';
import { RecommendationsService } from 'src/app/services/recommendations.service';
import { DealerBlockService } from 'src/app/services/dealerblock.service';

@NgModule({
  declarations: [
    AppComponent,
    SightcallComponent,
    RecommentComponent,
    BadgesPipe,
    CarouselComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule
  ],
  providers: [RecommendationsService, DealerBlockService],
  bootstrap: [AppComponent]
})
export class AppModule { }
