import { Component , OnInit } from '@angular/core';
import { DataService } from './services/data.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  title = 'app';
  modalShow = false;
  message: boolean;
  constructor(private data: DataService) { }
  ngOnInit() {
      this.data.currentMessage.subscribe(message => this.message = message);
    }


}
