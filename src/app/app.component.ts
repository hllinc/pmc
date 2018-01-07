import {Component} from '@angular/core';
import {DataService} from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private dataService: DataService) {
  }

  login() {
    const param = {
      username: 'Linc6',
      password: '123'
    };
    this.dataService.postData('/login', param).subscribe(data => {
      console.log(data);
    });
  }
}
