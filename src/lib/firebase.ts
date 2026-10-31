/**
 * Firebase 초기화 및 Firestore/Auth 설정 모듈
 * 
 * ============================================================================
 * [Firestore 컬렉션 구조 안내]
 * 1. users 컬렉션 (경로: /users/{userId})
 *    - uid: string (Firebase Auth 고유 사용자 ID)
 *    - nickname: string (학생이 입력한 별칭)
 *    - displayName: string (별칭(UID끝4자리) 형식, 예: "민우(a1b2)")
 *    - email: string (구글 계정 이메일)
 *    - totalPracticeSeconds: number (누적 연습 시간(초))
 *    - totalKeyInputs: number (누적 총 타건 수)
 *    - totalWrongInputs: number (누적 오답 수)
 *    - isAdmin: boolean (관리자 여부)
 *    - createdAt: ISO String
 *    - updatedAt: ISO String
 * 
 * 2. practice_logs 컬렉션 (경로: /practice_logs/{logId})
 *    - userId: string (학생 UID)
 *    - userDisplay: string (학생 별칭(UID끝4자리))
 *    - durationSeconds: number (해당 세션 연습 시간(초))
 *    - totalInputs: number (세션 총 타건 수)
 *    - wrongInputs: number (세션 오답 수)
 *    - createdAt: ISO String
 * ============================================================================
 */

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, updateDoc, collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

// 관리자 계정 이메일 지정 (이 값을 변경하여 관리자를 지정할 수 있습니다)
export const ADMIN_EMAIL = 'kwangsoo60kim@gmail.com';

// Firebase 환경 변수 우선 설정 및 기본값 적용
const activeConfig = {
  ...firebaseConfig,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || firebaseConfig.projectId,
  appId: import.meta.env.VITE_FIREBASE_APP_ID || firebaseConfig.appId,
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || firebaseConfig.apiKey,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || firebaseConfig.authDomain,
  firestoreDatabaseId: import.meta.env.VITE_FIREBASE_DATABASE_ID || firebaseConfig.firestoreDatabaseId,
};

// Firebase 앱 초기화 (중복 방지)
const app = getApps().length > 0 ? getApp() : initializeApp(activeConfig);

// CRITICAL: firestoreDatabaseId를 지정하여 Firestore 초기화
export const db = getFirestore(app, activeConfig.firestoreDatabaseId);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Google 로그인 창 설정
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Firestore 에러 핸들러
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
    },
    operationType,
    path,
  };
  console.error('Firestore Error:', JSON.stringify(errInfo));
}

export {
  signInWithPopup,
  signOut,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  query,
  orderBy,
  limit,
  onSnapshot
};
