import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from '../../services/users.service';

import { CommonModule } from '@angular/common';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-search-users',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './search-users.component.html',
  styleUrl: './search-users.component.css',
})
export class SearchUsersComponent implements OnInit {
  searchControl = new FormControl('');
  users = signal<string[]>([]);
  private readonly usersService = inject(UsersService);
  ngOnInit(): void {
    this.Search();
  }
  Search(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap((t) => {
          const term = (t ?? '').trim();
          if (term === '') {
            return of([]);
          }
          return this.usersService.searchUsers(term);
        })
      )
      .subscribe((result) => {
        this.users.set(result);
      });
  }
}
