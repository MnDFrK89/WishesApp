import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as actions from '../../store/wishes.actions';
import { ItemList } from 'src/app/models/item-list.model';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { getItems } from 'src/app/store/wishes.selectors';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  itemName: string;
  listId: string;
  items$: Observable<any>;
  suscrip: Subscription;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private alertCtrl: AlertController
  ) {
    this.listId = this.route.snapshot.paramMap.get('listId');
    this.items$ = this.store.select(getItems(this.listId));
  }

  public addItem() {
    if (this.itemName.length === 0) {
      return;
    }
    this.store.dispatch(
      actions.addItem({
        listId: this.listId,
        item: new ItemList(this.itemName),
      })
    );
    this.itemName = '';
  }

  public async deleteItem(id: string) {
    this.items$
      .pipe(
        map((res) => {
          if (res.ids.length === 0) {
            return true;
          } else {
            return false;
          }
        })
      )
      .subscribe(async (last) => {
        this.store.dispatch(
          actions.deleteItem({ itemId: id, listId: this.listId })
        );
        if (last) {
          const alert = await this.alertCtrl.create({
            cssClass: 'my-custom-class',
            header: 'Empty list, please add a task',
            buttons: [
              {
                text: 'Cancel',
                role: 'cancel',
                handler: () => {
                  this.store.dispatch(
                    actions.deleteList({ listId: this.listId })
                  );
                  if (this.router.url === `/tabs/tab2/add/${this.listId}`) {
                    this.router.navigateByUrl('/tabs/tab2');
                  } else {
                    this.router.navigateByUrl('/tabs/tab1');
                  }
                },
              },
              {
                text: 'Add',
                handler: () => {},
              },
            ],
          });
          alert.present();
        }
      })
      .unsubscribe();
  }

  public checkChanged(event, description) {
    this.store.dispatch(
      actions.updateItem({
        finishp: event.target.checked,
        desc: description,
        idList: this.listId,
      })
    );
    this.items$
      .pipe(
        map((res) => {
          let finished = true;
          Object.entries(res.entities).forEach(([key, value]: any) => {
            if (!value.finish) {
              finished = false;
              return finished;
            }
          });
          return finished;
        })
      )
      .subscribe((res) => {
        this.store.dispatch(
          actions.finishedList({ listId: this.listId, finished: res })
        );
      })
      .unsubscribe();
  }
  ngOnInit() {}
}
