import { Component, OnInit } from '@angular/core';
import { getDatabase, ref, onValue } from 'firebase/database';


@Component({
  selector: 'app-statics',
  templateUrl: './statics.component.html',
  styleUrls: ['./statics.component.css'],
})
export class StaticsComponent implements OnInit {
  mainkey: any = ['item1', 'item2'];
  graphurl: any = 'seconds';
  data: any = {};
  show_graph: any = [
    {
      item: {},
    },
    {
      item: {},
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  Show_values(index: number, mainkey: any, data: any) {
    let time = [];
    let value = [];
    let localTime;
    let graphinput;
    for (const key in data) {
      localTime = new Date(data[key].time).toLocaleString('en-GB');
      time.push(localTime);
      value.push(data[key].value);
    }
    time = time.slice(time.length - 10, time.length);
    value = value.slice(value.length - 10, value.length);

    graphinput = {
      val: mainkey,
      xAxis: {
        type: 'category',
        data: time,
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: value,
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)',
          },
        },
      ],
    };
    this.show_graph[index].item = graphinput;
  }

  get_values(url: any) {
    let val;
    let index: number;
    const db = getDatabase();
    this.graphurl = url;

    for (const mainkey of this.mainkey) {
      const urldb = ref(db, mainkey + '/' + url);
     
      onValue(urldb, (snapshot) => {

        val = snapshot.val();
        this.data[url] = val;
        index = this.mainkey.indexOf(mainkey);
        this.Show_values(index, mainkey, this.data[this.graphurl]);
      });
    }
  }
}
