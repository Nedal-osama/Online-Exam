import { Component, OnInit } from '@angular/core';
import { SearchUsersComponent } from '../../../SearchUsersComponent/components/search-users/search-users.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-home',
  imports: [SearchUsersComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
    initFlowbite();
  }
}
