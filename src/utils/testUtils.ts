import { db } from "../firebase";
import { doc, setDoc, updateDoc, getDoc, serverTimestamp } from "firebase/firestore";

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
      // Initialize summary structure
      summary: {
        score_total: 0,      // Total Correct
        total_answered: 0,   // Total Answered (excluding skips)
        count_skipped: 0,
        total_time_ms: 0,
        score_shaded: 0,
        score_lined: 0,
        
        // Tracking sums/counts for averages
        sum_time_shaded: 0,
        count_shaded: 0,
        sum_time_lined: 0,
        count_lined: 0,
        
        // Display averages
        avg_time_total_ms: 0,
        avg_time_shaded_ms: 0,
        avg_time_lined_ms: 0
      }
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
  const isSkipped = answer === "SKIPPED";

  const paddedQuestionId = `Q${questionNumber.toString().padStart(2, '0')}`;

  // 1. Save individual response
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
    const sessionRef = doc(db, "test_sessions", userId);
    const responseRef = doc(db, "test_sessions", userId, "responses", paddedQuestionId);
    
    // Write response
    await setDoc(responseRef, payload);

    // 2. Fetch and Update Summary
    const sessionSnap = await getDoc(sessionRef);
    if (sessionSnap.exists()) {
      const data = sessionSnap.data();
      const s = data.summary || { 
        score_total: 0, total_answered: 0, count_skipped: 0, total_time_ms: 0, 
        score_shaded: 0, score_lined: 0, 
        sum_time_shaded: 0, count_shaded: 0, sum_time_lined: 0, count_lined: 0 
      };

      // -- UPDATE METRICS --
      
      // Time is always tracked (even for skips)
      s.total_time_ms = (s.total_time_ms || 0) + timeTakenMs;

      if (isSkipped) {
        s.count_skipped = (s.count_skipped || 0) + 1;
      } else {
        s.total_answered = (s.total_answered || 0) + 1;
        if (isCorrect) s.score_total = (s.score_total || 0) + 1;
      }

      // Style specific tracking (track time/count for everything to get accurate averages)
      if (style === 'shaded') {
        s.sum_time_shaded = (s.sum_time_shaded || 0) + timeTakenMs;
        s.count_shaded = (s.count_shaded || 0) + 1;
        if (isCorrect && !isSkipped) s.score_shaded = (s.score_shaded || 0) + 1;
      } else {
        s.sum_time_lined = (s.sum_time_lined || 0) + timeTakenMs;
        s.count_lined = (s.count_lined || 0) + 1;
        if (isCorrect && !isSkipped) s.score_lined = (s.score_lined || 0) + 1;
      }

      // -- RECALCULATE AVERAGES --
      const totalSeen = (s.total_answered || 0) + (s.count_skipped || 0);
      s.avg_time_total_ms = totalSeen > 0 ? Math.round(s.total_time_ms / totalSeen) : 0;
      
      s.avg_time_shaded_ms = s.count_shaded > 0 ? Math.round(s.sum_time_shaded / s.count_shaded) : 0;
      s.avg_time_lined_ms = s.count_lined > 0 ? Math.round(s.sum_time_lined / s.count_lined) : 0;

      // Write summary back
      await updateDoc(sessionRef, { summary: s });
      console.log(`Updated summary for ${paddedQuestionId}`);
    }

  } catch (e) {
    console.error("Error submitting answer: ", e);
  }
};

// Simplified Finalize - Summary is already up to date
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