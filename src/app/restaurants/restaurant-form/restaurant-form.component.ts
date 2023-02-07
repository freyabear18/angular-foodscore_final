import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { CanDeactivateComponent } from 'src/app/guards/leave-page.guard';
import { OneCheckedDirective } from 'src/app/shared/validators/one-checked.directive';
import { Restaurant } from '../interfaces/restaurant';
import { RestaurantsService } from '../services/restaurants.service';

@Component({
  selector: 'fs-restaurant-form',
  standalone: true,
  imports: [CommonModule, FormsModule, OneCheckedDirective],
  templateUrl: './restaurant-form.component.html',
  styleUrls: ['./restaurant-form.component.css'],
})
export class RestaurantFormComponent implements CanDeactivateComponent {
  daysOpen: boolean[] = new Array(7).fill(true);
  readonly days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  newRestaurant: Restaurant;
  saved = false;
  @ViewChild('restaurantForm') restaurantForm!: NgForm;


  constructor(
    private readonly restaurantsService: RestaurantsService,
    private readonly router: Router
  ) {
    this.newRestaurant = this.resetRestaurant();
  }

  canDeactivate() {
    return this.saved || this.restaurantForm.pristine || confirm("Do you really want to leave?. Changes will be lost");
  }

  resetRestaurant() {
    return {
      name: '',
      description: '',
      image: '',
      cuisine: '',
      daysOpen: [],
      phone: '',
    };
  }

  changeImage(fileInput: HTMLInputElement) {
    if (!fileInput.files || fileInput.files.length === 0) {
      return;
    }
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(fileInput.files[0]);
    reader.addEventListener('loadend', () => {
      this.newRestaurant.image = reader.result as string;
    });
  }

  addRestaurant() {
    this.newRestaurant.daysOpen = this.daysOpen
      .map((open, i) => (open ? String(i) : ''))
      .filter((day) => day !== '');

    this.restaurantsService.create(this.newRestaurant).subscribe({
      next: (r) => {
        this.saved = true;
        this.router.navigate(['/restaurants']);
      },
      error: (error) => console.error(error),
    });
  }

  validClasses(ngModel: NgModel, validClass: string, errorClass: string) {
    return {
      [validClass]: ngModel.touched && ngModel.valid,
      [errorClass]: ngModel.touched && ngModel.invalid,
    };
  }
}
