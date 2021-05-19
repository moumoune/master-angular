// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyB5kZR-uraPZdQVs97ArRde3weKwxHp1Hc",
    authDomain: "master-angular-v12.firebaseapp.com",
    projectId: "master-angular-v12",
    storageBucket: "master-angular-v12.appspot.com",
    messagingSenderId: "34695007551",
    appId: "1:34695007551:web:5a68488a034036833a178a",
    auth: {
      baseURL: 'https://www.googleapis.com/identitytoolkit/v3/relyingparty'
    },
    firestore: {
      baseURL : 
       'https://firestore.googleapis.com/v1/projects/master-angular-v12/databases/(default)/documents'
     }
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
