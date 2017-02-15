export class Comment {
  username: string;
  userAvatarUrl: string;
  message: string;
  time: string;
  likes: number;

  constructor(username: string, userAvatarUrl: string, message: string,
              time: string, likes: number) {
    this.username = username;
    this.userAvatarUrl = userAvatarUrl;
    this.message = message;
    this.time = time;
    this.likes = likes;
  }
}

export class Article {
  id: number;
  date: string;
  image: string;
  title: string;
  synopsis: string;
  tagName: string;
  contents: string;
  comments: Comment[];

  constructor(id: number, date: string, image: string, title: string,
              synopsis: string, tagName: string, contents: string,
              comments: Comment[]) {
    this.id = id; this.date = date; this.image = image; this.title = title;
    this.synopsis = synopsis; this.tagName = tagName; this.contents = contents;
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
