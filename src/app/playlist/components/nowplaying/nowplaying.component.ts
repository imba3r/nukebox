import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nbx-nowplaying',
  templateUrl: './nowplaying.component.html',
  styleUrls: ['./nowplaying.component.scss']
})
export class NowplayingComponent implements OnInit {

  currentsong =  {
    title: 'currentsong'
  };

  constructor() { }

  ngOnInit() {
  }

}
