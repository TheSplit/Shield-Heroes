export class Vector2 {

   x: number;
   y: number; 

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  length() {
    return Math.sqrt(this.x*this.x + this.y*this.y);
  }

  normalize() {
    const len = this.length();
    if (len === 0) return new Vector2(0,0); 
    return new Vector2(this.x/len, this.y/len);
  }

  add(v: Vector2) {
    return new Vector2(this.x + v.x, this.y + v.y);
  }

  subtract(v: Vector2) {
    return new Vector2(this.x - v.x, this.y - v.y);
  }

  distanceTo(v: Vector2) {
    return Math.sqrt((this.x - v.x)**2 + (this.y - v.y)**2);
  }

  directionTo(v: Vector2, normalize: boolean = false): Vector2 {
    const dir = new Vector2(v.x - this.x, v.y - this.y);
    if(normalize) { return dir.normalize() } else { return dir; };
  }

    dot(v: Vector2): number {
    return this.x * v.x + this.y * v.y;
  } 

    angleBetween(a: Vector2, b: Vector2): number {
  const dot = a.dot(b);
  const lenA = a.length();
  const lenB = b.length();
  if (lenA === 0 || lenB === 0) return 0;
  const cosTheta = dot / (lenA * lenB);
  return Math.acos(Math.min(Math.max(cosTheta, -1), 1));
    } 
}