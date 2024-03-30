import { Component, OnInit } from '@angular/core';
import { Tutorial } from '../../models/tutorial.model';
import { TutorialService } from '../../services/tutorial.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-add-tutorial',
  templateUrl: './add-tutorial.component.html',
  styleUrls: ['./add-tutorial.component.css']
})
export class AddTutorialComponent implements OnInit {
  tutorial: Tutorial = {
    title: '',
    description: '',
    published: false,
    users: [] // Assuming your Tutorial model has this property now
  };
  submitted = false;
  users: any[] = []; // This should match the structure of your user data
  selectedUsers: any[] = []; // To hold selected user IDs

  constructor(
    private tutorialService: TutorialService,
    private userService: UserService // Assuming you have a service to fetch users
  ) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    // Implement this method based on how your UserService is structured
    this.userService.getAll().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (e) => console.error(e)
    });
  }

  saveTutorial(): void {
    // Update this method to include the selected users
    const data = {
      title: this.tutorial.title,
      description: this.tutorial.description,
      users: this.selectedUsers // Include the selected user IDs in the request
    };

    this.tutorialService.create(data).subscribe({
      next: (res) => {
        console.log(res);
        this.submitted = true;
      },
      error: (e) => console.error(e)
    });
  }

  newTutorial(): void {
    this.submitted = false;
    this.tutorial = {
      title: '',
      description: '',
      published: false,
      users: []
    };
    this.selectedUsers = []; // Reset selected users
  }
}
