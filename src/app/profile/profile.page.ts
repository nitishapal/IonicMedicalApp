import { Component, OnInit } from '@angular/core';
import { SMS } from '@ionic-native/sms/ngx';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
 contactList: Contact[] = [];
  constructor(private contact: Contacts, private sms: SMS, private callnumber: CallNumber) { }

  ngOnInit() {
  }
  loadContact(){
   const options = {
     filter: '',
     multiple: true,
     hasPhoneNumber: true
   };
   this.contact.find(['*'], options).then((contacts: Contact[]) => {
    this.contactList = contacts;
    console.log('this.contactList', this.contactList);
   });
  }
  sendSms(contact: Contact){
   this.sms.send(contact.phoneNumbers[0].value, 'this is my predefined message to you');
  }
  makeCall(contact: Contact){
    this.callnumber.callNumber(contact.phoneNumbers[0].value, true);
  }
  createContact(){
    const contact: Contact = this.contact.create();
    contact.name = new ContactName(null, 'Albus', 'Ape');
    contact.phoneNumbers = [new ContactField('mobile', '12345678')];
    contact.save().then((data) => {
      console.log('save contact');
    });
  }
}
