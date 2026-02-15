import { STORAGE_KEY } from './constants';

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