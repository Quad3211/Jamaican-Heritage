import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent {
  values = [
    {
      icon: '🌿',
      title: 'Natural & Authentic',
      desc: 'Every product is sourced directly from Jamaican growers and makers.',
    },
    {
      icon: '🤝',
      title: 'Community First',
      desc: 'We support local communities and fair-trade partnerships.',
    },
    {
      icon: '🎨',
      title: 'Handcrafted Quality',
      desc: 'Artisan-made goods with attention to detail and cultural significance.',
    },
    {
      icon: '🌍',
      title: 'Global Reach',
      desc: 'Bringing the best of Jamaica to doorsteps worldwide.',
    },
  ];
}
