import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent implements OnInit {
  @Input()changable
  @Input()currentRate: number
  @Output()currentRateChange: EventEmitter<number> = new EventEmitter<number>();


  constructor() { }

  ngOnInit() {

  }

  rate(id){
    console.log('id ', id)  
    console.log('id keys', Object.keys(id))  
    this.currentRateChange.emit(this.currentRate) ;

  }
  

}
