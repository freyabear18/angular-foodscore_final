import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Restaurant } from '../interfaces/restaurant';
import { RestaurantCardComponent } from '../restaurant-card/restaurant-card.component';

@Component({
  selector: 'fs-restaurant-details',
  standalone: true,
  imports: [CommonModule, RestaurantCardComponent],
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.css'],
})
export class RestaurantDetailsComponent implements OnInit {
  restaurant!: Restaurant;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => (this.restaurant = data['restaurant']));
  }

  goBack() {
    this.router.navigate(['/restaurants']);
  }
}
