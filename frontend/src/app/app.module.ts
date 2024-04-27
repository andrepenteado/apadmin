import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http"
import { MENU } from "./etc/menu"
import { NgxApcoreModule } from "@andrepenteado/ngx-apcore"
import { Layout } from "./etc/layout"
import { SISTEMA_URL } from "./etc/routes"

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxApcoreModule.forRoot({
      NOME_SISTEMA: Layout.MODULO,
      LOGOTIPO_SISTEMA: Layout.LOGOTIPO,
      URL_BACKEND_SISTEMA: SISTEMA_URL.backendURL,
      URL_PORTAL: SISTEMA_URL.portalURL,
      PREFIXO_PERFIL: "ROLE_Admin_",
      MENU: MENU
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
