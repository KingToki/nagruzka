import { useEffect, useState } from 'react';
import { WebApp } from '@telegram-apps/sdk';

export const useTelegram = () => {
  const [webApp, setWebApp] = useState<WebApp | null>(null);

  useEffect(() => {
    const initWebApp = async () => {
      try {
        const { WebApp } = await import('@telegram-apps/sdk');
        const app = WebApp.initialize();
        setWebApp(app);
        
        // Expand the web app to full screen
        app.expand();
      } catch (error) {
        console.error('Failed to initialize Telegram WebApp:', error);
      }
    };

    initWebApp();
  }, []);

  return webApp;
};
