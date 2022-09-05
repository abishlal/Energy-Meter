import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxGaugeModule } from 'ngx-gauge';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";

import { UserdataComponent } from './userdata/userdata.component';
import { ServiceComponent } from './service/service.component';
import { StaticsComponent } from './statics/statics.component';
import { DataCompareComponent } from './data-compare/data-compare.component';
import { LifespanComponent } from './lifespan/lifespan.component';

const firebaseConfig = {
  apiKey: "AIzaSyDBeLV0AEb2F1FynagrHJtmoZTmDTAUP_c",
  authDomain: "energymeterpro.firebaseapp.com",
  databaseURL: "https://energymeterpro-default-rtdb.firebaseio.com",
  projectId: "energymeterpro",
  storageBucket: "energymeterpro.appspot.com",
  messagingSenderId: "112641688067",
  appId: "1:112641688067:web:a191484432315bd6e8c436",
  measurementId: "G-CD47C09V5H"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserdataComponent,
    ServiceComponent,
    StaticsComponent,
    DataCompareComponent,
    LifespanComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,  
    NgxGaugeModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'), // or import('./path-to-my-custom-echarts')
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
