import { Pipe, PipeTransform } from '@angular/core';
import { Restaurant } from '../interfaces/restaurant';

@Pipe({
  name: 'restaurantFilter',
  standalone: true,
})
export class RestaurantFilterPipe implements PipeTransform {
  transform(
    restaurants: Restaurant[],
    onlyOpen: boolean,
    search: string
  ): Restaurant[] {
    const weekDay = new Date().getDay();
    if (onlyOpen) {
      restaurants = restaurants.filter((r) =>
        r.daysOpen.includes('' + weekDay)
      );
    }
    return search
      ? restaurants.filter((r) =>
          r.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        )
      : restaurants;
  }
}
