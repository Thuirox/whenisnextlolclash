
export function lerp(from: number, to: number, speed: number): number {
  const r = (1 - speed) * from + speed * to
  return Math.abs(from - to) < 0.001 ? to : r
}



export const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
