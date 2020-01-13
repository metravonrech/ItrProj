import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private url = 'http://localhost:3000';
  private socket;    

  constructor(private http: HttpClient) {
    this.socket = io(this.url);
  }

  public sendMessage(message) {
    console.log('mes ',  message);
    this.socket.emit('new-message', message);
  }

  public getMessages = () => {
    return Observable.create((observer) => {
        this.socket.on('new-message', (message) => {            
          observer.next(message);
        });
    });
}

public getOldComments(id){
  return this.http.get(environment.apiUrl + "/getOldComments", {params: new HttpParams().set('id', id)});
}


}
