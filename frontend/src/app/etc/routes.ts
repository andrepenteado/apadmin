import { Routes } from "@angular/router"
import { AcessoNegadoComponent, ErroProcessamentoComponent, PaginaInicialComponent } from "@andrepenteado/ngx-apcore"

export const DECORATED_ROUTES: Routes = [

  { path: "", component: PaginaInicialComponent },

  {
    path: "pagina-inicial",
    component: PaginaInicialComponent
  },

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
