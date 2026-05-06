import { useEffect, useState } from "react";

export const useTelegram = () => {
  const [webApp, setWebApp] = useState<any>(null);

  useEffect(() => {
    // @ts-ignore — глобальный Telegram объект
    const app = window.Telegram?.WebApp;

    if (app) {
      app.expand();
      setWebApp(app);
    }
  }, []);

  return webApp;
};
