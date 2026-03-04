import { db } from "../firebase";
import { doc, setDoc, updateDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { CORRECT_ANSWERS, CUSTOM_CORRECT_ANSWERS } from "./constants";

export const submitQuestionAnswer = async (
  userId: string,
  questionId: string, 
  questionNumber: number,
  answer: string,
  timeTakenMs: number,
  style: 'lined' | 'shaded',
  testType: 'original' | 'custom' = 'original'
) => {
  const answerBank = testType === 'original' ? CORRECT_ANSWERS : CUSTOM_CORRECT_ANSWERS;
  const correctAnswer = answerBank[questionNumber];
  const isCorrect = answer.toLowerCase() === correctAnswer;
  const isSkipped = answer === "SKIPPED";

  const finalQuestionId = testType === 'original' 
    ? `Q${questionNumber.toString().padStart(2, '0')}` 
    : questionId; 

  const collectionName = testType === 'original' ? "test_sessions" : "custom_test_sessions";

  const payload = {
    questionId: finalQuestionId, 
    questionNumber,
    userAnswer: answer,
    correctAnswer,
    isCorrect,
    timeTakenMs,
    style,
    timestamp: serverTimestamp(),
  };

  try {
    const sessionRef = doc(db, collectionName, userId);
    const responseRef = doc(db, collectionName, userId, "responses", finalQuestionId);
    
    await setDoc(responseRef, payload);

    const sessionSnap = await getDoc(sessionRef);
    if (sessionSnap.exists()) {
      const data = sessionSnap.data();
      const s = data.summary || { 
        score_total: 0, total_answered: 0, count_skipped: 0, total_time_ms: 0, 
        score_shaded: 0, score_lined: 0, 
        sum_time_shaded: 0, count_shaded: 0, sum_time_lined: 0, count_lined: 0,
        reset_count: 0 
      };

      // -- UPDATE METRICS --
      s.total_time_ms = (s.total_time_ms || 0) + timeTakenMs;

      if (isSkipped) {
        s.count_skipped = (s.count_skipped || 0) + 1;
      } else {
        s.total_answered = (s.total_answered || 0) + 1;
        if (isCorrect) s.score_total = (s.score_total || 0) + 1;
      }

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

      await updateDoc(sessionRef, { summary: s });
    }

  } catch (e) {
    console.error("Error submitting answer: ", e);
  }
};