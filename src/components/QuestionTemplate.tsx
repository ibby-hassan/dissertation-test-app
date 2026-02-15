// src/components/QuestionTemplate.tsx
import React, { useState, useEffect } from 'react';
import * as styles from './styles/QuestionTemplate.css';

interface QuestionTemplateProps {
  questionId: string;
  basePath?: string;
  onAnswer: (answer: string) => void;
  selectedAnswer?: string | null;
  onAllImagesLoaded?: () => void;
  readonly?: boolean; // NEW PROP
}

const QuestionTemplate: React.FC<QuestionTemplateProps> = ({ 
  questionId, 
  basePath = "psvtr-new-normalised", 
  onAnswer,
  selectedAnswer,
  onAllImagesLoaded,
  readonly = false
}) => {
  
  const TOTAL_IMAGES = 8;
  const [loadedCount, setLoadedCount] = useState(0);

  useEffect(() => {
    setLoadedCount(0);
  }, [questionId]);

  const handleImageLoad = () => {
    setLoadedCount(prev => {
      const newCount = prev + 1;
      if (newCount === TOTAL_IMAGES && onAllImagesLoaded) {
        onAllImagesLoaded();
      }
      return newCount;
    });
  };

  const match = questionId.match(/([A-Z]+)(\d+)/);
  const prefix = match ? match[1] : 'Q';
  const number = match ? parseInt(match[2], 10) : 0;

  const folderName = `${prefix}${number}`;
  const fileNamePrefix = `${prefix}${number.toString().padStart(2, '0')}`;

  const getPath = (suffix: string) => 
    `/${basePath}/${folderName}/${fileNamePrefix}-${suffix}.png`;

  const options = ['a', 'b', 'c', 'd', 'e'];

  return (
    <div className={styles.container}>
      
      <div className={styles.row}>
        <img 
          src={getPath('Q-FROM')} 
          className={styles.shapeImage} 
          alt="" 
          onLoad={handleImageLoad}
        />
        <span className={styles.connectorText}>IS ROTATED TO</span>
        <img 
          src={getPath('Q-TO')} 
          className={styles.shapeImage} 
          alt="" 
          onLoad={handleImageLoad}
        />
      </div>

      <hr style={{ width: '60%', border: '0', borderTop: '1px solid #e5e7eb', alignSelf: 'center' }} />

      <div className={styles.row}>
        <span className={styles.connectorText}>AS</span>
        <img 
          src={getPath('A-FROM')} 
          className={styles.shapeImage} 
          alt="" 
          onLoad={handleImageLoad}
        />
        <span className={styles.connectorText}>IS ROTATED TO</span>
        <div className={styles.questionMarkPlaceholder}>?</div>
      </div>

      <div className={styles.optionsRow}>
        {options.map((opt) => {
          const isSelected = selectedAnswer === opt;
          
          // Determine class based on readonly prop
          let buttonClass = styles.optionButton;
          if (readonly) {
            buttonClass = styles.readOnlyOptionButton;
          } else if (isSelected) {
            buttonClass = styles.selectedOptionButton;
          }

          return (
            <button 
              key={opt} 
              className={buttonClass} 
              onClick={() => !readonly && onAnswer(opt)}
              disabled={readonly}
            >
              <span className={styles.letterLabel}>{opt.toUpperCase()}</span>
              <img 
                src={getPath(`A-TO-${opt}`)} 
                className={styles.shapeImage} 
                alt={`Option ${opt}`}
                onLoad={handleImageLoad}
              />
            </button>
          );
        })}
      </div>

    </div>
  );
};

export default QuestionTemplate;