import React, { useEffect, useState } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import * as styles from './styles/AdminPage.css';

interface TestStats {
  totalStarted: number;
  totalCompleted: number;
  
  // Versions
  versionA: { started: number; completed: number };
  versionB: { started: number; completed: number };
  
  // Time Stats
  avgTimePerTestMs: number;
  avgTimePerQuestionMs: number;
  
  // Score Stats
  avgScore: number;
  linedCorrect: number;
  linedTotal: number;
  shadedCorrect: number;
  shadedTotal: number;
}

const AdminPage: React.FC = () => {
  const [stats, setStats] = useState<TestStats | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "test_sessions"));
      
      const s: TestStats = {
        totalStarted: 0,
        totalCompleted: 0,
        versionA: { started: 0, completed: 0 },
        versionB: { started: 0, completed: 0 },
        avgTimePerTestMs: 0,
        avgTimePerQuestionMs: 0,
        avgScore: 0,
        linedCorrect: 0,
        linedTotal: 0,
        shadedCorrect: 0,
        shadedTotal: 0
      };

      let sumScore = 0;
      let sumTimeCompletedTests = 0;
      let sumTimeAllQuestions = 0;
      let sumQuestionsAnswered = 0;

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const summary = data.summary || {};
        
        s.totalStarted++;
        const isComplete = data.status === 'completed';

        // Version Splits
        if (data.version === 'A') {
          s.versionA.started++;
          if (isComplete) s.versionA.completed++;
        } else if (data.version === 'B') {
          s.versionB.started++;
          if (isComplete) s.versionB.completed++;
        }

        // Metrics from Summary
        if (summary) {
            // Aggregate Lined/Shaded stats (from all users, even incomplete)
            s.linedCorrect += (summary.score_lined || 0);
            s.linedTotal += (summary.count_lined || 0);
            s.shadedCorrect += (summary.score_shaded || 0);
            s.shadedTotal += (summary.count_shaded || 0);

            // Aggregate Time per Question (from all users)
            sumTimeAllQuestions += (summary.total_time_ms || 0);
            sumQuestionsAnswered += (summary.total_answered || 0);

            // Stats strictly for COMPLETED tests
            if (isComplete) {
                s.totalCompleted++;
                sumScore += (summary.score_total || 0);
                sumTimeCompletedTests += (summary.total_time_ms || 0);
            }
        }
      });

      // Calculate Averages
      if (s.totalCompleted > 0) {
          s.avgScore = sumScore / s.totalCompleted;
          s.avgTimePerTestMs = sumTimeCompletedTests / s.totalCompleted;
      }

      if (sumQuestionsAnswered > 0) {
          s.avgTimePerQuestionMs = sumTimeAllQuestions / sumQuestionsAnswered;
      }

      setStats(s);
    } catch (error) {
      console.error("Error fetching stats:", error);
      alert("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  // --- Helper to format time ---
  const formatTime = (ms: number) => {
    const seconds = Math.round(ms / 1000);
    if (seconds < 60) return `${seconds}s`;
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s}s`;
  };

  // --- Helper for Percentages ---
  const getPct = (num: number, total: number) => {
      if (total === 0) return '0%';
      return `${Math.round((num / total) * 100)}%`;
  };

  if (loading) return <div className={styles.container}><p style={{textAlign: 'center'}}>Loading data...</p></div>;
  if (!stats) return null;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span>Analytics Dashboard</span>
        <button className={styles.refreshButton} onClick={fetchStats}>Refresh</button>
      </div>

      <div className={styles.sectionTitle}>Overview</div>
      <div className={styles.grid}>
        <div className={styles.card}>
          <span className={styles.cardLabel}>Total Responses</span>
          <span className={styles.cardValue}>{stats.totalStarted}</span>
          <span className={styles.cardSubValue}>Started</span>
        </div>
        <div className={styles.card}>
          <span className={styles.cardLabel}>Completion Rate</span>
          <span className={`${styles.cardValue} ${styles.highlightGreen}`}>
            {getPct(stats.totalCompleted, stats.totalStarted)}
          </span>
          <span className={styles.cardSubValue}>{stats.totalCompleted} Completed</span>
        </div>
        <div className={styles.card}>
          <span className={styles.cardLabel}>Average Score</span>
          <span className={`${styles.cardValue} ${styles.highlightPurple}`}>
            {stats.avgScore.toFixed(1)}
          </span>
          <span className={styles.cardSubValue}>out of 30</span>
        </div>
      </div>

      <div className={styles.sectionTitle}>Time Metrics</div>
      <div className={styles.grid}>
        <div className={styles.card}>
            <span className={styles.cardLabel}>Avg Time (Test)</span>
            <span className={styles.cardValue}>{formatTime(stats.avgTimePerTestMs)}</span>
            <span className={styles.cardSubValue}>For completed tests</span>
        </div>
        <div className={styles.card}>
            <span className={styles.cardLabel}>Avg Time (Item)</span>
            <span className={styles.cardValue}>
                {(stats.avgTimePerQuestionMs / 1000).toFixed(1)}s
            </span>
            <span className={styles.cardSubValue}>Per question</span>
        </div>
      </div>

      <div className={styles.sectionTitle}>Performance by Style</div>
      <div className={styles.grid}>
        <div className={styles.card}>
            <span className={styles.cardLabel}>Lined Accuracy</span>
            <span className={`${styles.cardValue} ${styles.highlightBlue}`}>
                {getPct(stats.linedCorrect, stats.linedTotal)}
            </span>
            <span className={styles.cardSubValue}>{stats.linedCorrect}/{stats.linedTotal} Correct</span>
        </div>
        <div className={styles.card}>
            <span className={styles.cardLabel}>Shaded Accuracy</span>
            <span className={`${styles.cardValue} ${styles.highlightBlue}`}>
                {getPct(stats.shadedCorrect, stats.shadedTotal)}
            </span>
            <span className={styles.cardSubValue}>{stats.shadedCorrect}/{stats.shadedTotal} Correct</span>
        </div>
      </div>

      <div className={styles.sectionTitle}>Participant Distribution</div>
      <div className={styles.grid}>
        <div className={styles.card}>
          <span className={styles.cardLabel}>Version A</span>
          <span className={styles.cardValue}>{stats.versionA.completed}</span>
          <span className={styles.cardSubValue}>{stats.versionA.started} Started</span>
        </div>
        <div className={styles.card}>
          <span className={styles.cardLabel}>Version B</span>
          <span className={styles.cardValue}>{stats.versionB.completed}</span>
          <span className={styles.cardSubValue}>{stats.versionB.started} Started</span>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;