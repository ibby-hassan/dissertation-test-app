import { db } from "../firebase";
import { doc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { RESET_COUNT_KEY } from "./constants";
import { getDeviceType } from "./helpers";

export const initializeTestSession = async (
  userId: string,
  version: 'A' | 'B'
) => {
  const deviceType = getDeviceType();
  const userAgent = navigator.userAgent;

  // Get reset count from local storage
  const resetCount = parseInt(localStorage.getItem(RESET_COUNT_KEY) || '0', 10);

  try {
    await setDoc(doc(db, "test_sessions", userId), {
      version,
      deviceType,
      userAgent,
      status: 'in_progress', 
      startedAt: serverTimestamp(),
      summary: {
        score_total: 0,      
        total_answered: 0,   
        count_skipped: 0,
        total_time_ms: 0,
        score_shaded: 0,
        score_lined: 0,
        
        sum_time_shaded: 0,
        count_shaded: 0,
        sum_time_lined: 0,
        count_lined: 0,
        
        avg_time_total_ms: 0,
        avg_time_shaded_ms: 0,
        avg_time_lined_ms: 0,

        reset_count: resetCount
      }
    });
    console.log(`Session initialized: ${userId} (Resets: ${resetCount})`);
  } catch (e) {
    console.error("Error initializing session: ", e);
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