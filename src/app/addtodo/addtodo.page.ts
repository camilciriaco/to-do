import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import {
  Platform,
  NavParams,
  ModalController,
  ToastController,
  AlertController,
  LoadingController,
} from "@ionic/angular";

@Component({
  selector: 'app-addtodo',
  templateUrl: './addtodo.page.html',
  styleUrls: ['./addtodo.page.scss'],
})
export class AddtodoPage implements OnInit {

  title: any = "";
  desc: any = "";
  isCompleted: any;

  constructor(private platform: Platform,
    public toastCtrl: ToastController,
    private navParams: NavParams,
    private modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,) { }

  ngOnInit() {
    this.checkingNullTodoList();
  }

  addtodoList(){

    var status = this.isCompleted ? this.isCompleted = "Completed" : this.isCompleted = "Pending" ;

    let existingTodoList: any[] = [];
    const storedData = localStorage.getItem("allAddedToDoList");
    if (storedData !== null) {
      existingTodoList = JSON.parse(storedData);
    }

    var newId = existingTodoList[existingTodoList.length - 1]
      ? existingTodoList[existingTodoList.length - 1].id
      : 0;
    var list = {
      id: newId + 1,
      title: this.title,
      desc: this.desc,
      isCompleted: status,
    };

    localStorage.setItem("allAddedToDoList", JSON.stringify(list));
    existingTodoList.push(list);
    localStorage.setItem(
      "allAddedToDoList",
      JSON.stringify(existingTodoList)
    );
    this.presentAlertConfirm();
  }

  close() {
    this.modalCtrl.dismiss();
  }

  checkingNullTodoList() {
    let existingTodoList: any[] = [];
    const storedData = localStorage.getItem("allAddedToDoList");
    if (storedData !== null) {
      existingTodoList = JSON.parse(storedData);
    }
    console.log(existingTodoList);
    if (!localStorage.getItem("allAddedToDoList")) {
      localStorage.setItem("allAddedToDoList", "[]");
    }
  }

  async presentAlertConfirm() {
    const alert = await this.alertCtrl.create({
      message: "Saved!",
      buttons: [
        {
          text: "Ok",
          handler: () => {
            this.close();
          },
        },
      ],
    });

    await alert.present();
  }

  async alert(response: any) {
    const alert = await this.alertCtrl.create({
      message: response,
      buttons: ["OK"],
    });
    await alert.present();
  }

  async presentToast(response: any) {
    const toast = await this.toastCtrl.create({
      message: response,
      duration: 3000,
    });
    toast.present();
  }

}
