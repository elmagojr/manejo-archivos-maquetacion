export const Tipos_Documentos = [

    { codigo: 1, descripcion: 'Identificaciones' },
    { codigo: 2, descripcion: 'RTN' },
    { codigo: 3, descripcion: 'Contratos' },
    { codigo: 4, descripcion: 'Escrituras' },
    { codigo: 5, descripcion: 'Croquis' },
    { codigo: 6, descripcion: 'Otros documentos' }
];
export const PermisosBase = [
  {
    grupo: "G_ROLES",
    subgrupo: "Gestión de Roles",
    permisos: [
      { valor: false, descripcion: "crear_rol" },
      { valor: false, descripcion: "modificar_rol" },
      { valor: false, descripcion: "eliminar_rol" },
      { valor: false, descripcion: "ver_roles" },
    ],
  },
  {
    grupo: "G_USERS",
    subgrupo: "Gestión de Usuarios",
    permisos: [
      { valor: false, descripcion: "crear_usuario" },
      { valor: false, descripcion: "modificar_usuario" },
      { valor: false, descripcion: "eliminar_usuario" },
      { valor: false, descripcion: "ver_usuarios" },
    ],
  },
  {
    grupo: "G_ARCHIVOS",
    subgrupo: "Gestión de Archivos",
    permisos: [
      { valor: false, descripcion: "crear_archivo" },
      { valor: false, descripcion: "eliminar_archivo" },
      { valor: false, descripcion: "ver_archivo" },
    ],
  },
];

//export default { Tipos_Documentos, Permisos };
