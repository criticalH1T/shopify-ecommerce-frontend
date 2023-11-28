import { Component } from '@angular/core';

@Component({
  selector: 'app-our-story',
  templateUrl: './our-story.component.html',
  styleUrls: ['./our-story.component.scss']
})
export class OurStoryComponent {

  bannerContent =  {
    "image": "../../../assets/banner-image.png",
    "alt": "banner image",
    "text": "Our mission is to offer widespread, sustainable access to delicious plant-based nutrition."
  };

  gridItems: any[] = [
    {
      "image": "../../../assets/rec.png",
      "alt": "recycle",
      "title": "Bottled in recycled glass",
      "text": "We use glass bottles rather than porous plastic because it's better for you, better for the planet, and a pleasure to drink from. Don't you think?"
    },
    {
      "image": "../../../assets/plant-based.png",
      "alt": "plant based",
      "title": "Plant-based",
      "text": "All our drinks are made from plants. Placing plants at the center of our diet is a simple way to improve our health and our beloved environment."
    },
    {
      "image": "../../../assets/mwl.png",
      "alt": "made with love",
      "title": "Made with love",
      "text": "We’re intentional about our processes and our ingredients. Health, happiness, and loving care for the earth are always our highest priorities."
    }
  ];

  organicBannerContent: any = {
    "image": "../../../assets/organic-smoothie.jpg",
    "alt": "organic banner image",
    "title": "Always organic + non-GMO",
    "text": "We make our beverages exclusively from organic ingredients: they're non-GMO and grown without chemical fertilizers, pesticides, or herbicides, for healthy juices and a healthy planet."
  };

  freshnessContent: any = {
    "image" : "../../../assets/freshness.png",
    "alt" : "fresh juice",
    "title": "Freshness from farm to bottle",
    "text": "We’re on a mission to make healthy and sustainable the delicious new normal. Take a sip and join us."
  };

}
