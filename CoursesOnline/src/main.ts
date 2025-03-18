import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { appConfig } from './app/app.config';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

bootstrapApplication(AppComponent, {
  providers: [
    ...appConfig.providers, 
    provideAnimations(), provideAnimationsAsync(), provideAnimationsAsync() ,
    
  ]
})
.catch((err) => console.error(err));
