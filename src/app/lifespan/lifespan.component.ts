import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NG_VALIDATORS, Validators } from '@angular/forms';
import { getDatabase,set, ref, onValue } from 'firebase/database';

@Component({
  selector: 'app-lifespan',
  templateUrl: './lifespan.component.html',
  styleUrls: ['./lifespan.component.css'],
})
export class LifespanComponent implements OnInit {

  total_data:any =[];
  item: any = ['item1', 'item2', 'item3'];
  constructor() {
    this.get_values();
  }

  power_date = new FormGroup({
    date: new FormControl('', [Validators.required]),
    item: new FormControl('', [Validators.required]),
    power:new FormControl('', [Validators.required])
  });

  ngOnInit(): void {}

  get_values() {
    const db = getDatabase();
    for (const item of this.item) {
      const current_url = ref(db, 'current/' + item);
      onValue(current_url, (snapshot) => {
        if(item == 'item1'){
          this.total_data[0].power_in = snapshot.val()*230
        }
        if(item == 'item2'){
          this.total_data[1].power_in = snapshot.val()*230
        }
      });


      const date_url = ref(db, 'lifespan/' + item + '/' + 'date');
      onValue(date_url, (snapshot) => {
        if(item == 'item1'){
          this.total_data[0].date = snapshot.val()
        }
        if(item == 'item2'){
          this.total_data[1].date = snapshot.val()
        }
      });

      var power:any =[];
      const power_url = ref(db, 'lifespan/' + item + '/' + 'power');
      onValue(power_url, (snapshot) => {
        if(item == 'item1'){
          this.total_data[0].power_out = snapshot.val()
        }
        if(item == 'item2'){
          this.total_data[1].power_out = snapshot.val()
        }
      });
    }

    for(let i =0; i<2; i++){
      this.total_data.push(
        {
          no: i+1,
          item:this.item[i]
        })
    }
  }

  submit_value(){
    console.log(this.power_date.value.date)
    let item = this.power_date.value.item
    let date = this.power_date.value.date
    let power = this.power_date.value.power
    const db = getDatabase();
    set(ref(db, 'lifespan/' + item + '/' ), {
      date: date,
      power: power
    });
  }
}
