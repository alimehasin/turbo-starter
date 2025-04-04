import type { Gender } from '@prisma/client';
import { dunna } from 'dunna';
import { femalesNames, malesNames } from './constants';

export function genPhoneNumber(): string {
  const randomSection = (count: 3 | 4) => {
    let res = '';

    for (let i = 0; i < count; i += 1) {
      res += dunna.basic.integer();
    }

    return res;
  };

  const countryCode = '+964';
  const carrierCode = dunna.basic.choice(['75', '77', '78']);
  const firstPart = dunna.basic.integer({ max: 5 });
  const secondPart = randomSection(3);
  const thirdPart = randomSection(4);

  return `${countryCode}${carrierCode}${firstPart}${secondPart}${thirdPart}`;
}

export function genFullName(gender: Gender): string {
  return gender === 'Male'
    ? `${dunna.basic.choice(malesNames)} ${dunna.basic.choice(malesNames)} ${dunna.basic.choice(malesNames)}`
    : `${dunna.basic.choice(femalesNames)} ${dunna.basic.choice(malesNames)} ${dunna.basic.choice(malesNames)}`;
}
