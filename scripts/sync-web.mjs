#!/usr/bin/env node
/**
 * Copies the static KiezQuiz web app into www/ for Capacitor.
 * Source: sibling folder ../KiezQuiz
 */
import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const appRoot = resolve(__dirname, '..');
const webSource = resolve(appRoot, '..', 'KiezQuiz');
const webTarget = join(appRoot, 'www');

const COPY_ITEMS = [
  'index.html',
  'manifest.webmanifest',
  'src',
  'icons',
];

if (!existsSync(webSource)) {
  console.error(`Web source not found: ${webSource}`);
  console.error('Expected KiezQuiz folder as sibling of KiezQuiz-App.');
  process.exit(1);
}

if (existsSync(webTarget)) {
  rmSync(webTarget, { recursive: true, force: true });
}
mkdirSync(webTarget, { recursive: true });

for (const item of COPY_ITEMS) {
  const from = join(webSource, item);
  const to = join(webTarget, item);
  if (!existsSync(from)) {
    console.warn(`Skipping missing item: ${item}`);
    continue;
  }
  cpSync(from, to, { recursive: true });
  console.log(`Copied ${item}`);
}

console.log(`\nWeb app synced to ${webTarget}`);
