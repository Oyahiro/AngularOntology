// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false
};

export const SERVER_PREFIX: { [key: string]: string } = {
  '::api': 'http://localhost:8080',
};

export const classes = [
  'Aspirante',
  'Carrera',
  'Examen',
  'NotaExamen',
  'RegistroExamen',
  'Postulacion',
  'ResultadoPostulación',
  'Universidad'
];

export const relations = {
  Aspirante: ['RegistroExamen', 'Examen', 'Postulacion'],
  Carrera: ['Universidad'],
  Examen: ['NotaExamen', 'Aspirante'],
  NotaExamen: ['Examen'],
  RegistroExamen: ['Aspirante'],
  Postulacion: ['ResultadoPostulación', 'Universidad', 'Aspirante'],
  ResultadoPostulación: ['Postulacion'],
  Universidad: ['Carrera', 'Postulacion']
};

export const dataProperties = {
  Aspirante: ['nombreAspirante', 'apellidoAspirante', 'cedulaAspirante', 'telefonoAspirante', 'direccionAspirante'],
  Carrera: ['nombreCarrera', 'contactoCarrera', 'cantidadCupos'],
  Examen: ['fechaExamen', 'horaInicioExamen', 'horaFinExamen'],
  NotaExamen: ['calificacion', 'codigoNota'],
  RegistroExamen: ['codigoRegistro', 'fechaRegistro'],
  Postulacion: ['fechaPostulacion', 'horaInicioPostulacion', 'horaFinPostulacion'],
  ResultadoPostulación: ['cupoNumero', 'aceptaCupo'],
  Universidad: ['nombreUniversidad', 'teléfonoUniversidad', 'ciudadUniversidad']
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
