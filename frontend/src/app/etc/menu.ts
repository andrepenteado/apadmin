export const MENU = [
  {
    id: 'empresa', texto: 'Empresas', icone: 'buildings', path: '/empresa/pesquisar', subMenus: [
      { texto: 'Pesquisar', path: '/empresa/pesquisar' },
      { texto: 'Incluir', path: '/empresa/cadastro' }
    ]
  },
  {
    id: 'unidadeadministrativa', texto: 'Unid. Administrativas', icone: 'building', path: '/unidade-administrativa/pesquisar', subMenus: [
      { texto: 'Pesquisar', path: '/unidade-administrativa/pesquisar' },
      { texto: 'Incluir', path: '/unidade-administrativa/cadastro' }
    ]
  },
  {
    id: 'cargo', texto: 'Cargos', icone: 'briefcase', path: '/cargo/pesquisar', subMenus: [
      { texto: 'Pesquisar', path: '/cargo/pesquisar' },
      { texto: 'Incluir', path: '/cargo/cadastro' }
    ]
  },
  {
    id: 'colaborador', texto: 'Colaboradores', icone: 'person-vcard', path: '/colaborador/pesquisar', subMenus: [
      { texto: 'Pesquisar', path: '/colaborador/pesquisar' },
      { texto: 'Incluir', path: '/colaborador/cadastro' }
    ]
  }
]
