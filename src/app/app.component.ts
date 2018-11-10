import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyDBsYVV2Q-FaLloebnKvlHPVaCHvaZfvuY",
      authDomain: "ng-cook-book-38806.firebaseapp.com"
    });
  }
}