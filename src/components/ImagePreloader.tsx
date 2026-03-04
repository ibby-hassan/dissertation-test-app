import React from 'react';

interface ImagePreloaderProps {
  questionId: string;
  basePath: string;
}

const ImagePreloader: React.FC<ImagePreloaderProps> = ({ questionId, basePath }) => {
  if (!questionId) return null;

  let folderName = questionId;
  let fileNamePrefix = questionId;

  if (questionId.startsWith('Q') || questionId.startsWith('T')) {
    const match = questionId.match(/([A-Z]+)(\d+)/);
    if (match) {
      const prefix = match[1];
      const number = parseInt(match[2], 10);
      folderName = `${prefix}${number}`;
      fileNamePrefix = `${prefix}${number.toString().padStart(2, '0')}`;
    }
  }
  
  const suffixes = ['Q-FROM', 'Q-TO', 'A-FROM', 'A-TO-a', 'A-TO-b', 'A-TO-c', 'A-TO-d', 'A-TO-e'];

  return (
    <div style={{ display: 'none' }}>
      {suffixes.map(suffix => (
        <img 
          key={suffix}
          src={`/${basePath}/${folderName}/${fileNamePrefix}-${suffix}.png`}
          alt="preload"
        />
      ))}
    </div>
  );
};

export default ImagePreloader;