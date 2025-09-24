import type { Gender } from '@prisma/client';
import chalk from 'chalk';
import { dunna } from 'dunna';
import { femalesNames, malesNames } from './data/names';

export function logSeedTable(name: string) {
  console.log(`Seeding ${chalk.cyan(name)}...`);
}

export function genGender(): Gender {
  return dunna.basic.choice(['Male', 'Female']);
}

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

export async function runInBatches<T>(
  tasks: Promise<T>[],
  batchSize = 5_000,
): Promise<T[]> {
  const results: T[] = [];

  for (let i = 0; i < tasks.length; i += batchSize) {
    const batch = tasks.slice(i, i + batchSize);
    const res = await Promise.all(batch);
    results.push(...res);

    console.log(
      `-> ${i + batchSize}/${tasks.length} (${Math.round(((i + batchSize) / tasks.length) * 100)}%)`,
    );
  }

  return results;
}
