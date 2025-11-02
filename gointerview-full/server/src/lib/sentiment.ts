export function scoreSentiment(text: string): number {
  const t = text.toLowerCase();
  let score = 0;
  if (t.includes('great') || t.includes('good') || t.includes('excellent')) score += 0.3;
  if (t.includes('concern') || t.includes('bad') || t.includes('poor')) score -= 0.3;
  score += Math.min(0.4, Math.max(-0.4, (text.length % 100) / 250 - 0.2));
  return Math.max(-1, Math.min(1, score));
}
