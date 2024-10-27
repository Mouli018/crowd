import { Component } from '@angular/core';
import { AppComponent } from '../../app.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addprojects',
  templateUrl: './addprojects.component.html',
  styleUrl: './addprojects.component.css'
})
export class AddprojectsComponent {
  constructor(private http: HttpClient, private router: Router) { }

  getreq(event: Event, val: any) {
    event.preventDefault();

    // Ensure form is valid before sending the request
    if (!val.Title || !val.Summary || !val.Description || !val.Target_Amount) {
      console.error('Form is invalid');
      return;
    }

    console.log(val);
    val.fundcollected = 0;
    val.id = sessionStorage.getItem('id');
    const id: any = sessionStorage.getItem('id');
    const headers = new HttpHeaders({ "authorization": id });
    this.http.post<any>(AppComponent.rooturl + "/project/addproject", val, { headers: headers })
      .subscribe(
        response => {
          console.log('POST request successful:', response);
          window.location.href = "/profile";
        },
        error => {
          console.error('POST request failed:', error);
        }
      );
  }
}
