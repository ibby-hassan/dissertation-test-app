import { db } from "../firebase";
import { doc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { RESET_COUNT_KEY } from "./constants";
import { getDeviceType } from "./helpers";

export const initializeTestSession = async (
  userId: string,
  version: 'A' | 'B',
  testType: 'original' | 'custom' = 'original'
) => {
  const deviceType = getDeviceType();
  const userAgent = navigator.userAgent;
  const resetCount = parseInt(localStorage.getItem(RESET_COUNT_KEY) || '0', 10);
  const collectionName = testType === 'original' ? "test_sessions" : "custom_test_sessions";

  const baseSummary = {
    score_total: 0,      
    total_answered: 0,   
    count_skipped: 0,
    total_time_ms: 0,
    avg_time_total_ms: 0,
    reset_count: resetCount
  };

  const styleMetrics = testType === 'original' ? {
    score_shaded: 0,
    score_lined: 0,
    sum_time_shaded: 0,
    count_shaded: 0,
    sum_time_lined: 0,
    count_lined: 0,
    avg_time_shaded_ms: 0,
    avg_time_lined_ms: 0,
  } : {};

  const initialSummary = { ...baseSummary, ...styleMetrics };

  try {
    await setDoc(doc(db, collectionName, userId), {
      version,
      deviceType,
      userAgent,
      status: 'in_progress', 
      startedAt: serverTimestamp(),
      summary: initialSummary
    });
    console.log(`${testType} Session initialized: ${userId}`);
  } catch (e) {
    console.error("Error initializing session: ", e);
  }
};

export const finalizeTestSession = async (userId: string, testType: 'original' | 'custom' = 'original') => {
  try {
    const collectionName = testType === 'original' ? "test_sessions" : "custom_test_sessions";
    const sessionRef = doc(db, collectionName, userId);
    await updateDoc(sessionRef, {
      status: 'completed',
      completedAt: serverTimestamp()
    });
    console.log(`${testType} Session finalized for ${userId}`);
  } catch (e) {
    console.error("Error finalizing session: ", e);
  }
};