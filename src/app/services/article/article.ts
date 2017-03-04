export class Comment {
  username: string;
  userAvatarUrl: string;
  message: string;
  time: string;
  likes: string;

  constructor(username: string, userAvatarUrl: string, message: string,
              time: string, likes: string) {
    this.username = username;
    this.userAvatarUrl = userAvatarUrl;
    this.message = message;
    this.time = time;
    this.likes = likes;
  }
}

export class Article {
  date: string;
  image: string;
  title: string;
  synopsis: string;
  tagName: string;
  contents: string;
  comments: Comment[];

  constructor(date: string, image: string, title: string,
              synopsis: string, tagName: string, contents: string,
              comments: Comment[]) {
    this.date = date; this.image = image; this.title = title; this.synopsis = synopsis;
    this.tagName = tagName; this.contents = contents;
    // 深拷贝 comments
    this.comments = [];
    for (let comment of comments) {
      let newComment = new Comment(comment.username, comment.userAvatarUrl,
                                   comment.message, comment.time, comment.likes);
      this.comments.push(newComment);
    }
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
