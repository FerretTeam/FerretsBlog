export class Passport {
  username: string;
  encryptedPassword: string;

  constructor(username: string, encryptedPassword: string) {
    this.username = username;
    this.encryptedPassword = encryptedPassword;
  }
}
