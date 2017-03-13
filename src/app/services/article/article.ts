export class Comment {
  username: string;
  userAvatarUrl: string;
  message: string;
  time: Date;
  likes: string;

  constructor(username: string, userAvatarUrl: string, message: string,
              time: Date, likes: string) {
    this.username = username;
    this.userAvatarUrl = userAvatarUrl;
    this.message = message;
    this.time = time;
    this.likes = likes;
  }
}

export class Article {
  date: Date;
  image: string;
  title: string;
  synopsis: string;
  tagName: string[];
  contents: string;
  characters: Number;

  constructor(date: Date, image: string, title: string,
              synopsis: string, tagName: string[], contents: string, characters: Number) {
    this.date = date; this.image = image; this.title = title; this.synopsis = synopsis;
    this.tagName = tagName; this.contents = contents; this.characters = characters;
  }
}

export class Tag {
  tagName: string;
  number: number;

  constructor(tagName: string, number: number) {
    this.tagName = tagName;
    this.number = number;
  }
}
