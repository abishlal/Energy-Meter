import { Component, OnInit } from '@angular/core';
import { getDatabase, set, ref, onValue } from 'firebase/database';
import { EChartsOption } from 'echarts';
import * as AOS from 'aos'

@Component({
  selector: 'app-userdata',
  templateUrl: './userdata.component.html',
  styleUrls: ['./userdata.component.css'],
})
export class UserdataComponent implements OnInit {

  power: any = {
    item1: [],
    item2: [],
  };

  item1_currentgauge: EChartsOption = {};
  item2_currentgauge: EChartsOption = {};
  item_voltagegauge: EChartsOption = {};
  powergraph: EChartsOption = {};
  switch1: any = 'sw1';
  switch2: any = 'sw2';
  total_power: any;
  total_cost: any;

  constructor() {
    this.get_power();
  }

  ngOnInit(): any {
    AOS.init();
    const db = getDatabase();
    const cur1 = ref(db, 'current/item1');
    let curdata1 = 0;
    onValue(cur1, (snapshot) => {
      curdata1 = snapshot.val();
      this.currentgauge1(curdata1);
    });
    const cur2 = ref(db, 'current/item2');
    let curdata2 = 0;
    onValue(cur2, (snapshot) => {
      curdata2 = snapshot.val();
      this.currentgauge2(curdata2);
    });
    const vol = ref(db, 'voltage');
    let voldata = 0;
    onValue(vol, (snapshot) => {
      voldata = snapshot.val();
      this.voltagegauge(voldata);
    });
  }

  //get power
  get_power() {
    const db = getDatabase();
    let total_data: any = [];
    let item_loads = ['Load 1', 'Load 2'];
    for (const key in this.power) {
      const pow = ref(db, 'Total_units/' + key + '/value');
      onValue(pow, (snapshot) => {
        this.power[key] = snapshot.val();
        total_data.push(snapshot.val());
        total_data = total_data.slice(total_data.length - 2, total_data.length);
        this.costcalculation(this.power);
        this.graphfun(item_loads,total_data);
      });
    
    }

    // this.costcalculation(total_data)
    // this.graphfun(item_loads, data);
  }

  voltagegauge(data: any) {
    this.item_voltagegauge = {
      series: [
        {
          type: 'gauge',
          min: 0,
          max: 250,
          progress: {
            show: true,
            width: 18,
          },
          axisLine: {
            lineStyle: {
              width: 18,
            },
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            length: 15,
            lineStyle: {
              width: 3,
              color: '#201785',
            },
          },
          axisLabel: {
            distance: 25,
            color: '#999',
            fontSize: 18,
          },
          anchor: {
            show: true,
            showAbove: true,
            size: 25,
            itemStyle: {
              borderWidth: 10,
            },
          },
          title: {
            show: false,
          },
          detail: {
            valueAnimation: true,
            fontSize: 30,
            offsetCenter: [0, '70%'],
            formatter: '{value} V',
            color: '#c2325d',
          },
          data: [
            {
              value: data,
            },
          ],
        },
      ],
    };
  }
  currentgauge1(data: any) {
    this.item1_currentgauge = {
      series: [
        {
          type: 'gauge',
          min: 0,
          max: 20,
          progress: {
            show: true,
            width: 18,
          },
          axisLine: {
            lineStyle: {
              width: 18,
            },
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            length: 15,
            lineStyle: {
              width: 3,
              color: '#201785',
            },
          },
          axisLabel: {
            distance: 25,
            color: '#999',
            fontSize: 18,
          },
          anchor: {
            show: true,
            showAbove: true,
            size: 25,
            itemStyle: {
              borderWidth: 10,
            },
          },
          title: {
            show: false,
          },
          detail: {
            valueAnimation: true,
            fontSize: 30,
            offsetCenter: [0, '70%'],
            formatter: '{value} A',
            color: '#c2325d',
          },
          data: [
            {
              value: data,
            },
          ],
        },
      ],
    };
  }
  currentgauge2(data: any) {
    this.item2_currentgauge = {
      series: [
        {
          type: 'gauge',
          min: 0,
          max: 20,
          progress: {
            show: true,
            width: 18,
          },
          axisLine: {
            lineStyle: {
              width: 18,
            },
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            length: 15,
            lineStyle: {
              width: 3,
              color: '#201785',
            },
          },
          axisLabel: {
            distance: 25,
            color: '#999',
            fontSize: 18,
          },
          anchor: {
            show: true,
            showAbove: true,
            size: 25,
            itemStyle: {
              borderWidth: 10,
            },
          },
          title: {
            show: false,
          },
          detail: {
            valueAnimation: true,
            fontSize: 30,
            offsetCenter: [0, '70%'],
            formatter: '{value} Amp',
            color: '#c2325d',
          },
          data: [
            {
              value: data,
            },
          ],
        },
      ],
    };
  }

  // power graph
  graphfun(item_loads: any, total_data: any) {
    this.powergraph = {
      xAxis: {
        type: 'category',
        data: ['load 1', 'load 2'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [this.power.item1, this.power.item2],
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)',
          },
        },
      ],
    };
  }

  //switch
  name = 'ng-toggle-button';
  config = {
    value: false,
    name: '',
    disabled: false,
    height: 75,
    width: 150,
    margin: 3,
    fontSize: 25,
    speed: 300,
    color: {
      checked: '#56C128',
      unchecked: '#dcdcdc',
    },
    switchColor: {
      checked: '#3366FF',
      unchecked: 'crimson',
    },
    labels: {
      unchecked: 'OFF',
      checked: 'ON',
    },
    checkedLabel: '',
    uncheckedLabel: '',
    fontColor: {
      checked: '#fafafa',
      unchecked: '#ffffff',
    },
    values: {
      checked: 1,
      unchecked: 0,
    },
  };

  //switch function
  isShowDiv = false;
  sw1 = false;
  sw2 = false;
 
  switch(data: any) {
    const db = getDatabase();
    if (data == 'sw1') {
      this.sw1 = !this.sw1;
      if (this.sw1) {
        set(ref(db, 'switching/item1'), {
          item1: 'ON',
        });
      } else {
        set(ref(db, 'switching/item1'), {
          item1: 'OFF',
        });
      }
    }
    if (data == 'sw2') {
      this.sw2 = !this.sw2;
      if (this.sw2) {
        set(ref(db, 'switching/item2'), {
          item2: 'ON',
        });
      } else {
        set(ref(db, 'switching/item2'), {
          item2: 'OFF',
        });
      }
    }
  
  }

  costcalculation(total_units: any) {
    let pow = (total_units.item1 + total_units.item2)/1000;

    if (pow >= 0 && pow <= 100) {
      this.total_cost = 0;
    } else if (pow > 100 && pow <= 200) {
      pow = pow - 100;
      this.total_cost = pow * 1.5 + 20;
    } else if (pow > 200 && pow <= 500) {
      this.total_cost = 200 + (pow - 200) * 3 + 30;
    } else if (pow > 500) {
      this.total_cost = 1730 + (pow - 500) * 3 + 50;
    }
  }
}
