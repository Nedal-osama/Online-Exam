import { Injectable } from '@angular/core';
import { delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  users = ['Nedal', 'Ahmed', 'Sara', 'Omar', 'Mohamed', 'Nada', 'Khaled', 'Salma'];
  searchUsers(term: string) {
    console.log('Searching for:', term);
    return of(this.users.filter((u) => u.toLowerCase().includes(term.toLowerCase()))).pipe(
      delay(500)
    );
  }
}
