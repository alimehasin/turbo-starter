import localFont from 'next/font/local';

export const roboto = localFont({
  display: 'swap',
  variable: '--font-roboto',
  src: [
    {
      path: './roboto-latin-400-normal.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './roboto-latin-500-normal.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './roboto-latin-700-normal.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
});
