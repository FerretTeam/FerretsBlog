export class User {
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
}
