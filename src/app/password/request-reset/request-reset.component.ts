import { Component, OnInit } from '@angular/core';
import {SnotifyService} from "ng-snotify";
import {JarwisService} from "../../services/jarwis.service";

@Component({
  selector: 'app-request-reset',
  templateUrl: './request-reset.component.html',
  styleUrls: ['./request-reset.component.css']
})
export class RequestResetComponent implements OnInit {
  public form = {
    email: null
  };
  isLoaded:boolean;
  constructor(
    private Jarvis: JarwisService,
    private notify: SnotifyService,
    private Notfiy:SnotifyService ) { }
  onSubmit() {
   this.isLoaded=true;
    this.Jarvis.sendPasswordResetLink(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.notify.error(error.error.error)
    );
  }

  handleResponse(res) {
    this.Notfiy.success(res.data,{timeout:0});
    this.form.email = null;
    this.isLoaded=false;
  }

  ngOnInit() {
  }

}
