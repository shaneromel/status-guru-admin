/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  rest_api:"http://localhost:3000",
  firebase:{
    apiKey: "AIzaSyAaRppvzkdPEhqK9TS_wMYqQ2juCdI60QY",
    authDomain: "status-guru-a3da8.firebaseapp.com",
    databaseURL: "https://status-guru-a3da8.firebaseio.com",
    projectId: "status-guru-a3da8",
    storageBucket: "status-guru-a3da8.appspot.com",
    messagingSenderId: "104690741527",
    appId: "1:104690741527:web:2440ee44012b7c00a5c752",
    measurementId: "G-Z5PQ7SNJN2"
  }
};
