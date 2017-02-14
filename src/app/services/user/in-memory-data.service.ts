import { InMemoryDbService } from 'angular2-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let Users = [
      {
        id: 'An0nym6',
        username: 'An0nym6',
        password: 'test',
        email: '0_0@liuren.link',
        userAvatarUrl: 'assets/images/user-avatar.jpg',
        totalCharacters: '9281',
        totalReading: '2.3k',
        totalLikes: '503',
        introduction: '',
        field: ''
      },
      { id: 'ShuQian',
        username: 'ShuQian',
        password: 'test',
        email: 'iamshuqian@gmail.com',
        userAvatarUrl: 'assets/images/user-avatar2.jpg',
        totalCharacters: '900',
        totalReading: '2k',
        totalLikes: '50',
        introduction: '',
        field: ''
      },
    ];
    return {Users};
  }
}
