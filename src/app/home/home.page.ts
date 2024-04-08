import { Component, inject } from '@angular/core';
import { RefresherCustomEvent } from '@ionic/angular';
import { MessageComponent } from '../message/message.component';
import { OnInit, ViewChildren, ViewChild, ElementRef } from '@angular/core';
import { Platform, IonContent, MenuController, LoadingController, AlertController, NavController, ToastController, IonInfiniteScroll, ModalController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';

import { AddtodoPage } from '../addtodo/addtodo.page';


import { DataService, Message } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private data = inject(DataService);
  titleFiltered: any = [];
  title: any;
  isPending: any;
  isCompleted: any;
  all: any;
  statusFilter: any = [];
  status: any;
  todoList: any = [];
  todoListFilter: any = [];
  disablechkbox: any; 

  constructor( private router: Router, 
    public element: ElementRef, 
    public modalCtrl: ModalController, 
    private platform: Platform, 
    private navCtrl: NavController, 
   // public api: RestService, 
    private menu: MenuController, 
    public loadingCtrl: LoadingController, 
    public alertCtrl: AlertController, 
    public toastCtrl: ToastController) {}

  // refresh(ev: any) {
  //   setTimeout(() => {
  //     (ev as RefresherCustomEvent).detail.complete();
  //   }, 3000);
  // }

  // getMessages(): Message[] {
  //   return this.data.getMessages();
  // }

  ionViewWillEnter(){
    const storedData = localStorage.getItem("allAddedToDoList");
    if (storedData !== null) {
      this.todoList = JSON.parse(storedData);
      this.todoListFilter = JSON.parse(storedData);
    }
  }

  searchItems(searchTerm: any) {
    console.log(searchTerm);
    this.todoList = this.todoListFilter.filter((item: any) => {
      console.log(item.title.toLowerCase().includes(searchTerm.toLowerCase()));
      return (
        item.title.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
      );
    });
    console.log(this.todoList);
  }

  filterItems() {
    let status_filter: any ;
    console.log(this.isCompleted);
    console.log(this.isPending);

    if(this.isCompleted){
      this.isCompleted= "Completed";
      status_filter = "Completed";
    }
    if(this.isPending){
      this.isPending= "Pending";
      status_filter = "Pending";
    }

    console.log(this.isCompleted);
    console.log(this.isPending);
  //  // let status_filter = this.isCompleted ? this.isCompleted= "Completed" : "Pending";
  this.todoList = this.todoListFilter.filter((item: any) => {
    // Check if item and isCompleted property are defined
    if (item && item.isCompleted !== undefined) {
      const itemStatus = item.isCompleted.toString().toLowerCase();

      // Check if the item is either pending or completed based on this.isPending and this.isCompleted
      if ((this.isPending && itemStatus.includes('pending')) || (this.isCompleted && itemStatus.includes('completed'))) {
        return true; // Include item in the filtered list if it matches the conditions
      } else if(this.all){
        return true;
      }
      else {
        return false; // Exclude item if it doesn't match the conditions
      }
    } else {
      return false; // Exclude items with undefined isCompleted property
    }
  });
    console.log(this.todoList);
  }

  async addcontacts(){
    const modal = await this.modalCtrl.create({
      component: AddtodoPage,
      cssClass: 'modal_addlist',
      // componentProps: {
      //   track: track
      // }
    });

    modal.onDidDismiss().then(() => {
      // Call the method to do whatever in your home.ts
         console.log('Modal closed');
         const storedData = localStorage.getItem("allAddedToDoList");
        if (storedData !== null) {
          this.todoList = JSON.parse(storedData);
          this.todoListFilter = JSON.parse(storedData);
        }
  });

    await modal.present();
  }

  changeAll(){
    if(this.all){
      this.disablechkbox = true;
      this.isCompleted = false;
      this.isPending = false;
    }else{
      this.disablechkbox = false;
    }
  }


}
