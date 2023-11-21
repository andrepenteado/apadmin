import { Routes } from "@angular/router";

export const content: Routes = [
  {
    path: "",
    loadChildren: () => import("../../modules/core/core.module").then((m) => m.CoreModule),
  },
  {
    path: "empresa",
    loadChildren: () => import("../../modules/empresa/empresa.module").then((m) => m.EmpresaModule),
  },
  {
    path: "unidade-administrativa",
    loadChildren: () => import("../../modules/unidade-administrativa/unidade-administrativa.module").then((m) => m.UnidadeAdministrativaModule),
  },
  {
    path: "colaborador",
    loadChildren: () => import("../../modules/colaborador/colaborador.module").then((m) => m.ColaboradorModule),
  }
];
