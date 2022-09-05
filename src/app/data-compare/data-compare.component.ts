import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  Validators,
} from '@angular/forms';
import { getDatabase, ref, onValue } from 'firebase/database';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-data-compare',
  templateUrl: './data-compare.component.html',
  styleUrls: ['./data-compare.component.css'],
})
export class DataCompareComponent implements OnInit {
  constructor() {}

  date_time = new FormGroup({
    date: new FormControl('', [Validators.required]),
    item: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {}

  obj: any = [];
  time: any = [];
  data: any = [];
  sum = 0;
  get_values() {
    let item = this.date_time.value.item;
    var date = new Date(this.date_time.value.date);
    let time = date.getTime();
    this.sum = this.sum + 1;

    const db = getDatabase();
    const url = ref(db, item + '/minutesdata/' + time);
    onValue(url, (snapshot) => {
      this.time.push(this.date_time.value.date);
      this.data.push(snapshot.val().value);
      this.obj.push({
        no: this.sum,
        time: time,
        load: item,
        data: snapshot.val().value,
      });
    });
    this.Show_graph(this.time, this.data);
  }

  graphinput: EChartsOption = {};
  Show_graph(time: any, data: any) {
    this.graphinput = {
      xAxis: {
        type: 'category',
        data: time,
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: data,
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)',
          },
        },
      ],
    };
  }
}
