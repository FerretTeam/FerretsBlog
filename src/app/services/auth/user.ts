export class User {
  username: string;
  email: string;
  userAvatarUrl: string;
  totalCharacters: string;  // 为了排版便利，在 service 中将大数转换为 k 或 m
  totalReading: string;
  totalLikes: string;
}
