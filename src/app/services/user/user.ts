export class User {
  id: number;
  // 基本信息
  username: string;
  password: string;
  email: string;
  userAvatarUrl: string;
  // 成就
  totalCharacters: string;  // 为了排版便利，在 service 中将大数转换为 k 或 m
  totalReading: string;
  totalLikes: string;
  // 详细信息
  introduction: string;
  field: string;

  constructor () {
    this.id = 0;
    this.username = '';
    this.password = '';
    this.email = '';
    this.userAvatarUrl = '';
    // 成就
    this.totalCharacters = '';  // 为了排版便利，在 service 中将大数转换为 k 或 m
    this.totalReading = '';
    this.totalLikes = '';
    // 详细信息
    this.introduction = '';
    this.field = '';
  }
}
