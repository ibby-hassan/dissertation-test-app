import React from 'react';

interface ImagePreloaderProps {
  questionNum: number;
  basePath: string;
}

const ImagePreloader: React.FC<ImagePreloaderProps> = ({ questionNum, basePath }) => {
  if (questionNum > 30) return null;

  const prefix = 'Q';
  const folderName = `${prefix}${questionNum}`;
  const fileNamePrefix = `${prefix}${questionNum.toString().padStart(2, '0')}`;
  
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