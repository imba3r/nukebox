import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nbx-nowplaying',
  templateUrl: './nowplaying.component.html',
  styleUrls: ['./nowplaying.component.scss']
})
export class NowplayingComponent implements OnInit {

  currentsong =  {
    title: 'Surfing on Las Palmas',
    artist: 'DJ Dutch Guy',
    image: ''
  };

  constructor() { }

  ngOnInit() {
  }

}
