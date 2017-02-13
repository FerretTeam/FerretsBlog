export class Article {
  id: number;
  date: string;
  image: string;
  title: string;
  synopsis: string;
  tagName: string;
  contents: string;
}

export class Tag {
  tagName: string;
  number: number;
  constructor(tagName: string, number: number) {
    this.tagName = tagName;
    this.number = number;
  }
}
