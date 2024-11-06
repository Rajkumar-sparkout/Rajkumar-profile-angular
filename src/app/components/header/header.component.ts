import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  activeSection: string = '';

  ngOnInit(): void {
    this.updateActiveSection();
  }

  setActive(section: string) {
    this.activeSection = section;
  }

  // Detect the current section based on URL hash
  updateActiveSection() {
    this.activeSection = window.location.hash.substring(1);
  }

  // Listen for hash changes
  @HostListener('window:hashchange', ['$event'])
  onHashChange() {
    this.updateActiveSection();
  }

}
