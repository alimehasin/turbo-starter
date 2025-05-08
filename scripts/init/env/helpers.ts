import { randomBytes } from 'node:crypto';
import { readdirSync, statSync } from 'node:fs';
import path, { join } from 'node:path';

export function searchEnvExampleFiles(
  dir: string,
  depth: number,
  maxDepth: number,
): string[] {
  if (depth > maxDepth) {
    return [];
  }

  const results: string[] = [];
  const entries = readdirSync(dir);

  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);

    if (stat.isDirectory() && entry === 'node_modules') {
      continue;
    }

    if (stat.isFile() && entry === '.env.example') {
      results.push(fullPath);
    } else if (stat.isDirectory()) {
      results.push(...searchEnvExampleFiles(fullPath, depth + 1, maxDepth));
    }
  }

  return results;
}

export function generateSecretKey(length = 16): string {
  return randomBytes(length).toString('hex');
}

export async function copyEnvFile(
  path: string,
  secrets: { old: string; new: string }[],
) {
  const srcFile = await Bun.file(path).text();

  let updatedContent = srcFile;

  for (const { old, new: newValue } of secrets) {
    const regex = new RegExp(old, 'g');
    updatedContent = updatedContent.replace(regex, newValue);
  }

  const dstFile = Bun.file(path.replace('.example', ''));
  await Bun.write(dstFile, updatedContent);
}

export function getRootDirName() {
  return path.basename(process.cwd());
}
