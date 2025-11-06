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
    des_grupo: "Gestión de Roles",
    permisos: [
      { identificador:"crear_rol", valor: false, descripcion: "Crear Roles" },
      { identificador:"modificar_rol", valor: false, descripcion: "Modificar Roles" },
      { identificador:"eliminar_rol", valor: false, descripcion: "Eliminar Roles" },
      { identificador:"ver_roles", valor: false, descripcion: "Ver Roles" },
    ],
  },
  {
    grupo: "G_USERS",
    des_grupo: "Gestión de Usuarios",
    permisos: [
      { identificador:"crear_usuario", valor: false, descripcion: "Crear Usuarios" },
      { identificador:"modificar_usuario", valor: false, descripcion: "Modificar Usuarios" },
      { identificador:"eliminar_usuario", valor: false, descripcion: "Eliminar Usuarios" },
      { identificador:"ver_usuarios", valor: false, descripcion: "Ver Usuarios" },
    ],
  },
  {
    grupo: "G_ARCHIVOS",
    des_grupo: "Gestión de Archivos",
    permisos: [
      { identificador:"crear_archivo", valor: false, descripcion: "Crear Archivos" },
      { identificador:"eliminar_archivo", valor: false, descripcion: "Eliminar Archivos" },
      { identificador:"ver_archivo", valor: false, descripcion: "Ver Archivos" },
      
    ],
  },
];





//export default { Tipos_Documentos, Permisos };
