import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import GraphemeSplitter from 'grapheme-splitter'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getRandomElement<T>(array: T[]): T {
  const randomIndex = Math.floor(Math.random() * array.length)
  return array[randomIndex]
}

export function getFirstGrapheme(text: string): string {
  const splitter = new GraphemeSplitter()
  const graphemes = splitter.splitGraphemes(text)
  return graphemes[0]
}

export function removeEmojiAtIndex(text: string, index: number): string {
  const splitter = new GraphemeSplitter()
  const graphemes = splitter.splitGraphemes(text);
  graphemes.splice(index, 1);
  return graphemes.join('');
}