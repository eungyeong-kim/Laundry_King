// src/firebaseConfig.js

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Firebase 초기화
const firebaseConfig = {
  apiKey: "AIzaSyDAwiETDagsxiMnT4O7IAa7hMpoj6mXjd4",
  authDomain: "laundryking-5a8d5.firebaseapp.com",
  projectId: "laundryking-5a8d5",
  storageBucket: "laundryking-5a8d5.appspot.com",
  messagingSenderId: "619955335513",
  appId: "1:619955335513:web:240020c0b15b4ef0301c48"
};

// Firebase 앱 초기화
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Firebase 인증 가져오기
export const firebaseAuth = firebase.auth();

// Firestore 인스턴스 가져오기
const db = firebase.firestore();

export default db;
