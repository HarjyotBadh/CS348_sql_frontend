import { Component, Input, OnInit } from '@angular/core';
import { TutorialService } from '../../services/tutorial.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Tutorial } from '../../models/tutorial.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-tutorial-details',
  templateUrl: './tutorial-details.component.html',
  styleUrls: ['./tutorial-details.component.css'],
})
export class TutorialDetailsComponent implements OnInit {
  @Input() viewMode = false;

  @Input() currentTutorial: Tutorial = {
    title: '',
    description: '',
    published: false,
    users: [], // Assuming your Tutorial model has this property now
  };

  message = '';
  users: any[] = []; // This should match the structure of your user data
  selectedUsers: any[] = []; // To hold selected user IDs

  constructor(
    private tutorialService: TutorialService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getTutorial(this.route.snapshot.params['id']);
      this.fetchAllUsers(); // Fetch all users to populate the selector
    }
  }

  getTutorial(id: string): void {
    this.tutorialService.get(id)
      .subscribe({
        next: (data: any) => {
          this.currentTutorial = data;
          // Directly assign if `data.users` is an array of IDs
          this.selectedUsers = data.users || [];
        },
        error: (e) => console.error(e)
      });
  }
  
  

  fetchAllUsers(): void {
    this.userService.getAll().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (e) => console.error(e),
    });
  }

  fetchUserDetails(userIds: number[]): void {
    // Clear the users array before fetching new details
    this.users = [];

    // Fetch details for each user ID
    userIds.forEach((userId) => {
      this.userService.getUserById(userId).subscribe({
        next: (userData) => {
          this.users.push(userData);
        },
        error: (e) => console.error(e),
      });
    });
  }

  updatePublished(status: boolean): void {
    const data = {
      title: this.currentTutorial.title,
      description: this.currentTutorial.description,
      published: status,
      users: this.selectedUsers,
    };

    this.message = '';

    this.tutorialService.update(this.currentTutorial.id, data).subscribe({
      next: (res) => {
        console.log(res);
        this.currentTutorial.published = status;
        this.message = res.message
          ? res.message
          : 'The status was updated successfully!';
      },
      error: (e) => console.error(e),
    });
  }

  updateTutorial(): void {
    // Prepare the data including the user IDs for update
    const updateData = {
      ...this.currentTutorial,
      users: this.selectedUsers,
    };

    this.tutorialService.update(this.currentTutorial.id, updateData).subscribe({
      next: (res) => {
        this.message = res.message
          ? res.message
          : 'Tutorial updated successfully!';
        console.log(res);
      },
      error: (e) => console.error(e),
    });
  }

  deleteTutorial(): void {
    this.tutorialService.delete(this.currentTutorial.id).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/tutorials']);
      },
      error: (e) => console.error(e),
    });
  }

  toggleUserSelection(userId: number): void {
    const index = this.selectedUsers.indexOf(userId);
    if (index > -1) {
      // If already selected, remove it
      this.selectedUsers.splice(index, 1);
    } else {
      // If not selected, add it
      this.selectedUsers.push(userId);
    }
  }
  
}

