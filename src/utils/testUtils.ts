import { db } from "../firebase";
import { doc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";

// --- CONSTANTS ---
export const STORAGE_KEY = 'psvtr_study_state';

// --- HELPERS ---

export const generateUserId = (username: string = 'Anonymous') => {
  const cleanName = username.trim().replace(/\s+/g, '-').toLowerCase();
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 6);
  
  return `${cleanName}-${timestamp}-${randomPart}`;
};

export const getSavedState = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (err) {
    console.error("Error loading state from local storage:", err);
  }
  return null;
};

export const getDeviceType = () => {
  const userAgent = navigator.userAgent;
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  const isSmallScreen = window.innerWidth <= 768;
  
  return isMobile || isSmallScreen ? 'mobile' : 'desktop';
};

// Answer Key
const CORRECT_ANSWERS: Record<number, string> = {
  1: 'b', 2: 'a', 3: 'a', 4: 'd', 5: 'b',
  6: 'c', 7: 'e', 8: 'e', 9: 'e', 10: 'd',
  11: 'e', 12: 'e', 13: 'b', 14: 'd', 15: 'c',
  16: 'e', 17: 'a', 18: 'a', 19: 'b', 20: 'b',
  21: 'a', 22: 'd', 23: 'd', 24: 'c', 25: 'd',
  26: 'c', 27: 'b', 28: 'e', 29: 'c', 30: 'e'
};

// --- FIREBASE LOGIC ---
export const initializeTestSession = async (
  userId: string,
  version: 'A' | 'B'
) => {
  const deviceType = getDeviceType();
  const userAgent = navigator.userAgent;

  try {
    await setDoc(doc(db, "test_sessions", userId), {
      version,
      deviceType,
      userAgent,
      status: 'in_progress', 
      startedAt: serverTimestamp(),
    });
    console.log(`Session initialized: ${userId}`);
  } catch (e) {
    console.error("Error initializing session: ", e);
  }
};

export const submitQuestionAnswer = async (
  userId: string,
  questionId: string, 
  questionNumber: number,
  answer: string,
  timeTakenMs: number,
  style: 'lined' | 'shaded'
) => {
  const correctAnswer = CORRECT_ANSWERS[questionNumber];
  const isCorrect = answer.toLowerCase() === correctAnswer;

  const paddedQuestionId = `Q${questionNumber.toString().padStart(2, '0')}`;

  const payload = {
    questionId: paddedQuestionId, 
    questionNumber,
    userAnswer: answer,
    correctAnswer,
    isCorrect,
    timeTakenMs,
    style,
    timestamp: serverTimestamp(),
  };

  try {
    const responseRef = doc(db, "test_sessions", userId, "responses", paddedQuestionId);
    await setDoc(responseRef, payload);
    console.log(`Submitted answer for ${paddedQuestionId} [${style}]`);
  } catch (e) {
    console.error("Error submitting answer: ", e);
  }
};

export const finalizeTestSession = async (userId: string) => {
  try {
    const sessionRef = doc(db, "test_sessions", userId);
    await updateDoc(sessionRef, {
      status: 'completed',
      completedAt: serverTimestamp()
    });
    console.log(`Session finalized for ${userId}`);
  } catch (e) {
    console.error("Error finalizing session: ", e);
  }
};