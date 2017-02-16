export class User {
  id: number;
  // 基本信息
  username: string;
  email: string;
  userAvatarUrl: string;
  // 成就
  totalCharacters: string;  // 为了排版便利，在 service 中将大数转换为 k 或 m
  totalReading: string;
  totalLikes: string;
  // 详细信息
  introduction: string;
  field: string;

  constructor (id:number, username: string, email: string, userAvatarUrl: string,
               totalCharacters: string, totalReading: string, totalLikes: string,
               introduction: string, field: string) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.userAvatarUrl = userAvatarUrl;
    // 成就
    this.totalCharacters = totalCharacters;  // 为了排版便利，在 service 中将大数转换为 k 或 m
    this.totalReading = totalReading;
    this.totalLikes = totalLikes;
    // 详细信息
    this.introduction = introduction;
    this.field = field;
  }
}
