// src/utils/testUtils.ts
import { db } from "../firebase";
import { doc, setDoc, collection, serverTimestamp } from "firebase/firestore";

// Answer Key
const CORRECT_ANSWERS: Record<number, string> = {
  1: 'b', 2: 'a', 3: 'a', 4: 'd', 5: 'b',
  6: 'c', 7: 'e', 8: 'e', 9: 'e', 10: 'd',
  11: 'e', 12: 'e', 13: 'b', 14: 'd', 15: 'c',
  16: 'e', 17: 'a', 18: 'a', 19: 'b', 20: 'b',
  21: 'a', 22: 'd', 23: 'd', 24: 'c', 25: 'd',
  26: 'c', 27: 'b', 28: 'e', 29: 'c', 30: 'e'
};

export const initializeTestSession = async (
  userId: string,
  username: string,
  version: 'A' | 'B'
) => {
  try {
    // UNCOMMENT TO ENABLE FIREBASE
    /*
    await setDoc(doc(db, "test_sessions", userId), {
      username,
      version,
      startedAt: serverTimestamp(),
    });
    console.log(`Session initialized for ${username} (${userId})`);
    */
    console.log(`[MOCK] Session initialized for ${username} (${userId}) - Version ${version}`);
  } catch (e) {
    console.error("Error initializing session: ", e);
  }
};

// Structure: test_sessions/{userId}/responses/{questionId}
export const submitQuestionAnswer = async (
  userId: string,
  questionId: string,
  questionNumber: number,
  answer: string,
  timeTakenMs: number
) => {
  const correctAnswer = CORRECT_ANSWERS[questionNumber];
  const isCorrect = answer.toLowerCase() === correctAnswer;

  const payload = {
    questionId,
    questionNumber,
    userAnswer: answer,
    correctAnswer,
    isCorrect,
    timeTakenMs,
    timestamp: serverTimestamp(),
  };

  try {
    // UNCOMMENT TO ENABLE FIREBASE
    /*
    const responseRef = doc(db, "test_sessions", userId, "responses", questionId);
    await setDoc(responseRef, payload);
    console.log(`Submitted answer for ${questionId}`);
    */
    console.log(`[MOCK] Submitted ${questionId}:`, payload);
  } catch (e) {
    console.error("Error submitting answer: ", e);
  }
};