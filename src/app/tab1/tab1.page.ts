import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { List } from '../models/list.model';
import * as actions from '../store/wishes.actions';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  constructor(
    private alertCtrl: AlertController,
    private router: Router,
    private store: Store,
  ) {}

  public async addList() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'New list',
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: 'List name',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel');
          },
        },
        {
          text: 'Create',
          handler: (data) => {
            if (data.title.length === 0) {
              return;
            } else {
              const lista = new List(data.title);
              this.store.dispatch(actions.createList({ list: lista }));
              this.router.navigateByUrl(`/tabs/tab1/add/${lista.id}`);
            }
          },
        },
      ],
    });
    alert.present();
  }
}
