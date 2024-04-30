import { Component, OnInit } from '@angular/core';
import { Tutorial } from '../../models/tutorial.model';
import { TutorialService } from '../../services/tutorial.service';

@Component({
  selector: 'app-tutorials-list',
  templateUrl: './tutorials-list.component.html',
  styleUrls: ['./tutorials-list.component.css']
})
export class TutorialsListComponent implements OnInit {

  tutorials?: Tutorial[];
  currentTutorial: Tutorial = {};
  currentIndex = -1;
  title = '';
  isPublished: boolean = false; // New property for published status
  report: any = {};
  searchReport: boolean = false;

  constructor(private tutorialService: TutorialService) { }

  ngOnInit(): void {
    this.retrieveTutorials();
  }

  retrieveTutorials(): void {
    this.tutorialService.getAll()
      .subscribe({
        next: (data) => {
          this.tutorials = data || []; // Ensure tutorials is an array even if data is undefined
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveTutorials();
    this.currentTutorial = {};
    this.currentIndex = -1;
  }

  setActiveTutorial(tutorial: Tutorial, index: number): void {
    this.currentTutorial = tutorial;
    this.currentIndex = index;
  }

  removeAllTutorials(): void {
    this.tutorialService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }

  searchTitle(): void {
    this.currentTutorial = {};
    this.currentIndex = -1;
    this.searchReport = true;

    if (this.isPublished) {
      this.tutorialService.findByTitleAndPublished(this.title, this.isPublished)
    .subscribe({
      next: (response) => {
        this.tutorials = response.tutorials;
        this.report = response.report;
        console.log(response);
      },
      error: (e) => console.error(e)
    });
    } else {
      this.tutorialService.findByTitle(this.title)
      .subscribe({
        next: (response) => {
          this.tutorials = response.tutorials;
          this.report = response.report;
          console.log(response);
        },
        error: (e) => console.error(e)
      });
    }
  }

}