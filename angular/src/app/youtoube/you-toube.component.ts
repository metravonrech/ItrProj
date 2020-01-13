import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-youtoube',
  template: `
    <youtube-player
      [videoId]="id"
      (ready)="savePlayer($event)"
      (change)="onStateChange($event)"
    ></youtube-player>
  `,
  styleUrls: ['./you-toube.component.css']
})
export class YouToubeComponent implements OnInit {

  @Input() id

  constructor() { }

  ngOnInit() {
    // console.log('iddddd ', this.id)
  }

  player: YT.Player;
  // private id: string = 'uSbqNboQRs0';
 
  savePlayer(player) {
    this.player = player;
    // console.log('player instance', player);
  }
  onStateChange(event) {
    // console.log('player state', event.data);
  }

}
