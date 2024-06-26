import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { environment } from "../environments/environment";
import { NgxApcoreModule } from "@andrepenteado/ngx-apcore";
import { LOGOTIPO, MODULO } from "./etc/layout";
import { MENU } from "./etc/menu";
import { clientId, clientSecret } from "./etc/oauth2";
import { registerLocaleData } from "@angular/common";
import localePT from '@angular/common/locales/pt';

registerLocaleData(localePT);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxApcoreModule.forRoot({
      nomeSistema: MODULO,
      logotipoSistema: LOGOTIPO,
      urlBackendSistema: environment.backendURL,
      urlPortal: environment.portalURL,
      urlBackendPortal: environment.backendPortalURL,
      menu: MENU,
      clientId: clientId,
      redirectUri: environment.redirectUri,
      clientSecret: clientSecret,
      urlAuthorizationServer: environment.urlAuthorizationServer
    })
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "pt-BR" }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
