
export abstract class Block {
  static _nextId = 1;
  id: number;

  constructor() {
    this.id = Block._nextId++;
  }
}


