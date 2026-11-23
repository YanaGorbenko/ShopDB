import { TWENTY_MINETES, TWO_DAYS } from '../constants/index.js';

export const setCookies = (session, res) => {
  // 👈 Проверяем, работаем мы локально или на сервере
  const isProduction = process.env.NODE_ENV === 'production';

  const options = {
    httpOnly: true,
    // 👈 На проде true (HTTPS), локально false (HTTP)
    secure: isProduction,
    // 👈 На проде 'none' (для Vercel), локально 'lax' (чтобы работало на localhost)
    sameSite: isProduction ? 'none' : 'lax',
    path: '/',
  };

  res.cookie('sessionId', session._id, { ...options, maxAge: TWO_DAYS });
  res.cookie('accessToken', session.accessToken, {
    ...options,
    maxAge: TWENTY_MINETES,
  });
  res.cookie('refreshToken', session.refreshToken, {
    ...options,
    maxAge: TWO_DAYS,
  });
};

export const clearCookies = res => {
  const isProduction = process.env.NODE_ENV === 'production';

  const options = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    path: '/',
  };

  res.clearCookie('sessionId', options);
  res.clearCookie('accessToken', options);
  res.clearCookie('refreshToken', options);
};
