import { Routes } from "@angular/router"
import { ErroProcessamentoComponent } from "../libs/core/pages/erro-processamento.component"
import { AcessoNegadoComponent } from "../libs/core/pages/acesso-negado.component"
import { PaginaInicialComponent } from "../libs/core/pages/pagina-inicial.component"

export const DECORATED_ROUTES: Routes = [

  { path: "", component: PaginaInicialComponent },

  { path: "pagina-inicial", component: PaginaInicialComponent },

  {
    path: "empresa",
    loadChildren: () => import("../modules/empresa/empresa.module").then((m) => m.EmpresaModule),
  },
  {
    path: "unidade-administrativa",
    loadChildren: () => import("../modules/unidade-administrativa/unidade-administrativa.module").then((m) => m.UnidadeAdministrativaModule),
  },
  {
    path: "cargo",
    loadChildren: () => import("../modules/cargo/cargo.module").then((m) => m.CargoModule),
  },
  {
    path: "colaborador",
    loadChildren: () => import("../modules/colaborador/colaborador.module").then((m) => m.ColaboradorModule),
  }

]

export const NO_DECORATED_ROUTES: Routes = [

  { path: "erro-processamento", component: ErroProcessamentoComponent },

  { path: "acesso-negado", component: AcessoNegadoComponent }

]

export const SISTEMA_URL = {

  backendURL:  window.location.protocol + '//' + window.location.host,

  portalURL: window.location.protocol + '//' + window.location.host.replace('admin.', 'portal.').replace('30003','30002')

};
