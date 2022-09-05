import { Component, OnInit } from '@angular/core';
import { getDatabase, set, ref, onValue, remove } from 'firebase/database';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css'],
})
export class ServiceComponent implements OnInit {
  current: any = {
    item1: [],
    item2: [],
  };

  dbvalues: any = {
    seconds: [],
    minutes: [],
    hours: [],
    days: [],
    weeks: [],
    month: [],
    year: [],
  };

  constructor() {
    this.get_values();

    setInterval(() => {
      this.updating_value();
    }, 1000);

    for (const mainkey in this.current) {
      this.get_db(mainkey, 'seconds', this.dbvalues, () =>
        this.datafun(mainkey, 'seconds', 'minutes', 60, this.dbvalues)
      );

      this.get_db(mainkey, 'minutes', this.dbvalues, () =>
        this.datafun(mainkey, 'minutes', 'hours', 60, this.dbvalues)
      );

      this.get_db(mainkey, 'hours', this.dbvalues, () =>
        this.datafun(mainkey, 'hours', 'days', 24, this.dbvalues)
      );

      this.get_db(mainkey, 'days', this.dbvalues, () =>
        this.datafun(mainkey, 'days', 'month', 30, this.dbvalues)
      );

      this.get_db(mainkey, 'month', this.dbvalues, () =>
        this.datafun(mainkey, 'month', 'year', 12, this.dbvalues)
      );
    }
  }

  ngOnInit(): void {}

  datafun(
    mainkey: any,
    fromkey: string,
    tokey: string,
    threshold: number,
    obj: any
  ) {
    const db = getDatabase();

    let seconds = [];
    let minutes = [];

    for (const ob in obj[fromkey]) {
      seconds.push(obj[fromkey][ob]);
    }

    if (seconds.length > threshold) {
      let sum = 0;
      for (const v of seconds.slice(0, threshold)) {
        sum += v.value;
      }
      minutes.push({
        time: seconds[threshold].time,
        value: sum,
      });
      for (const val of seconds.slice(0, threshold)) {
        const url = ref(db, mainkey + '/' + fromkey + '/' + val.time);
        remove(url);
      }
      seconds = seconds.slice(threshold, seconds.length);
    }

    for (const val of minutes) {
      set(ref(db, mainkey + '/' + tokey + '/' + val.time), {
        time: val.time,
        value: val.value,
      });
    }
    if (tokey == 'minutes') {
      for (const val of minutes) {
        let time: any = val.time / 10000;
        var times: any = time.toFixed(0) * 10000;

        set(ref(db, mainkey + '/minutesdata/' + times), {
          time: val.time,
          value: val.value,
        });
      }
    }
  }

  get_db(mainkey: any, key: string, obj: any, cb: any) {
    const db = getDatabase();
    const url = ref(db, mainkey + '/' + key);
    onValue(url, (snapshot) => {
      obj[key] = snapshot.val();
      cb();
    });
  }

  get_values() {
    const db = getDatabase();
    for (const key in this.current) {
      const cururl = ref(db, 'current/' + key);
      onValue(cururl, (snapshot) => {
        this.current[key].push(snapshot.val());
      });
    }
  }

  updating_value() {
    const db = getDatabase();
    let timestamp = new Date().getTime();

    for (const key in this.current) {
      let units_current = (this.current[key][0] * 230) / 3600;

      set(ref(db, key + '/' + 'seconds/' + timestamp), {
        value: units_current,
        time: timestamp,
      });

      this.update_units(key, units_current);
    }
  }

  update_units(key: any, units_current: any) {
    const db = getDatabase();
    let Total_units;
    const total_unit_url = ref(db, 'Total_units/' + key);
    onValue(total_unit_url, (snapshot) => {
      Total_units = snapshot.val().value;
    });
    set(ref(db, 'Total_units/' + key), {
      value: Total_units + units_current,
    });
  }
}
