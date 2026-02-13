// src/components/QuestionTemplate.tsx
import React from 'react';
import * as styles from './styles/QuestionTemplate.css';

interface QuestionTemplateProps {
  questionId: string; // e.g., "Q1", "T01"
  basePath?: string;  // e.g., "psvtr-new-normalised"
  onAnswer: (answer: string) => void;
}

const QuestionTemplate: React.FC<QuestionTemplateProps> = ({ 
  questionId, 
  basePath = "psvtr-new-normalised", // Default
  onAnswer 
}) => {
  
  // --- PATH LOGIC ---
  const match = questionId.match(/([A-Z]+)(\d+)/);
  const prefix = match ? match[1] : 'Q';
  const number = match ? parseInt(match[2], 10) : 0;

  // Folder: T1 (No zero)
  const folderName = `${prefix}${number}`;
  // File: T01 (Padded zero)
  const fileNamePrefix = `${prefix}${number.toString().padStart(2, '0')}`;

  const getPath = (suffix: string) => 
    `/${basePath}/${folderName}/${fileNamePrefix}-${suffix}.png`;
  // ------------------

  const options = ['a', 'b', 'c', 'd', 'e'];

  return (
    <div className={styles.container}>
      
      {/* TOP ROW */}
      <div className={styles.row}>
        <img src={getPath('Q-FROM')} alt="Original" className={styles.shapeImage} />
        <span className={styles.connectorText}>IS ROTATED TO</span>
        <img src={getPath('Q-TO')} alt="Rotated" className={styles.shapeImage} />
      </div>

      <hr style={{ width: '60%', border: '0', borderTop: '1px solid #ccc', alignSelf: 'center' }} />

      {/* MIDDLE ROW */}
      <div className={styles.row}>
        <span className={styles.connectorText}>AS</span>
        <img src={getPath('A-FROM')} alt="Target" className={styles.shapeImage} />
        <span className={styles.connectorText}>IS ROTATED TO</span>
        <div style={{ textAlign: 'center', fontSize: '2rem', color: '#ccc' }}>?</div>
      </div>

      {/* BOTTOM ROW */}
      <div className={styles.optionsRow}>
        {options.map((opt) => (
          <button key={opt} className={styles.optionButton} onClick={() => onAnswer(opt)}>
            <span className={styles.letterLabel}>{opt.toUpperCase()}</span>
            <img 
              src={getPath(`A-TO-${opt}`)} 
              alt={`Option ${opt}`} 
              className={styles.shapeImage} 
            />
          </button>
        ))}
      </div>

    </div>
  );
};

export default QuestionTemplate;