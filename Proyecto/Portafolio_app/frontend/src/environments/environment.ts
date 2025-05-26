// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // URL de tu backend (Express, Cloud Function, etc.)
  apiUrl: 'http://localhost:3000/api',

  // Credenciales de Firebase (no son secretas, están en el cliente)
  firebase: {
    apiKey: "AIzaSyCFXl8sihWWrKRCnBi_heeQfJfrrDGOnFI",
    authDomain: "guardar-foto-d4a53.firebaseapp.com",
    projectId: "guardar-foto-d4a53",
    storageBucket: "guardar-foto-d4a53.firebasestorage.app",
    messagingSenderId: "621913189584",
    appId: "1:621913189584:web:94ad3d03301d6e59d1c2d5",
    measurementId: "G-678ZX5K4YC"       // opcional, sólo para analytics
  },
  adminUser: {
    email: 'bas.lisboa@duocuc.cl',
    password: 'bas1821.'
  }

}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
