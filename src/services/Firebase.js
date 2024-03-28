import { initializeApp } from "firebase/app";

export class Firebase {
  constructor() {
    this._app = initializeApp({
      apiKey: import.meta.env.VITE_API_KEY,
      authDomain: "task-manager-students.firebaseapp.com",
      projectId: "task-manager-students",
      storageBucket: "task-manager-students.appspot.com",
      messagingSenderId: "635966678775",
      appId: "1:635966678775:web:7353effcc8711faf6855f2",
    });
  }

  get app() {
    return this._app;
  }
}

export const firebaseService = new Firebase();
