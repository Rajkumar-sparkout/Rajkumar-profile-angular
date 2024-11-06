import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
import { HttpClient } from '@angular/common/http';

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HeaderComponent, FooterComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {

  public message: boolean = false;

  constructor(private http: HttpClient){}

  downloadResume() {
    const link = document.createElement('a');
    link.href = 'assets/files/Rajkumar - Resume.pdf';
    link.download = 'Rajkumar - Resume.pdf';
    link.click();
  }

  contact = new FormGroup({
    name : new FormControl("", Validators.required),
    email : new FormControl("", [Validators.required, Validators.email]),
    message : new FormControl("", Validators.required),
  });

  get contactFormControl() {
    return this.contact.controls;
  }

  get email() {
    return this.contact.get('email');
  }

  send(){
    const form = this.contact.value;

    this.http.post('https://api.emailjs.com/api/v1.0/email/send',
      { 
        lib_version: '4.4.1',
        service_id: 'service_ck3vyuf',
        template_id: 'template_8iu2wpp',
        template_params:  { ...form },
        user_id: 'CoW9OX0o5NGZ4bY1u'
      },
      { responseType: 'text' }
    ).subscribe(()=> {
      this.message = true;
      this.contact.reset();
      
      setTimeout(()=> {
        window.location.href = window.location.href;
      },2000)
    },
    (error)=> {
      console.log('FAILED...', (error as EmailJSResponseStatus).text);
    })

    // emailjs.send(
    //   'service_ck3vyuf',
    //   'template_8iu2wpp', 
    //   { ...form }, 
    //   { publicKey: 'CoW9OX0o5NGZ4bY1u' }
    // ).then(()=> {
    //   this.message = true;
    //   this.contact.reset();
    //   setTimeout(()=> {
    //     window.location.href = window.location.href;
    //   },2000)
    // },
    // (error)=> {
    //   console.log('FAILED...', (error as EmailJSResponseStatus).text);
    // });

  }

}
