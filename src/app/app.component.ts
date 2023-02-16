import { Component, OnInit, VERSION } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import {
  Observable,
  of,
  from,
  Subscriber,
  Subscription,
  interval,
  iif,
  Subject,
  BehaviorSubject,
  ReplaySubject,
} from 'rxjs';
import { ajax } from 'rxjs/ajax';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  //  firstName: FormControl = new FormControl('');
  //   [[lastName: FormControl = new FormControl('');

  //   profileForm = new FormGroup({
  //     firstName: new FormControl('', [
  //       Validators.required,
  //       Validators.minLength(2),
  //     ]),
  //     lastName: new FormControl('', [forbiddenNameValidator('kosterec')]),
  //   });

  //   ngOnInit(): void {
  //     this.profileForm.patchValue({
  //       firstName: 'milos',
  //     });
  //   }

  //   onSubmit(): void {
  //     console.log('submit');
  //     console.warn(JSON.stringify(this.profileForm.value));
  //   }
  // }

  // export function forbiddenNameValidator(nameRe: String): ValidatorFn {
  //   return (control: AbstractControl): ValidationErrors | null => {
  //     const forbidden = nameRe === control.value;
  //     return forbidden ? { forbiddenName: { value: control.value } } : null;
  //   };

  // cislo: number = 66;
  // obs4$: Observable<number>;

  // ngOnInit(): void {
  //   console.log('OnInit');

  //   const obs1$ = new Observable((subscriber) => {
  //     console.log('Observable');
  //     subscriber.next(1);
  //     subscriber.next(this.cislo);

  //     try {
  //       throw new Error('Something went wrong');
  //     } catch (e) {
  //       console.log('chyba odchytena vnutri');
  //       subscriber.error(e);
  //     }

  //     // setTimeout(() => {
  //     //   subscriber.next(4);
  //     //   subscriber.next(567);
  //     // }, 2000);

  //     // const interval = setInterval(() => {
  //     //   subscriber.next(4);
  //     //   subscriber.next(567);
  //     // }, 2000);

  //     return function unsubscribe() {
  //       console.log('unsubscribe inter:');
  //       // clearInterval(interval);
  //     };

  //     // subscriber.complete();
  //   });

  //   const subs1: Subscription = obs1$.subscribe({
  //     next: (x: number) => {
  //       const a = x;
  //       console.log('next value a: ' + a);
  //     },
  //     error: (err: Error) => {
  //       console.log('error notification');
  //     },
  //     complete: () => console.log('obs completed'),
  //   });

  //   subs1.unsubscribe();

  //   // try {
  //   //   throw new Error('Something went wrong');
  //   // } catch (e) {
  //   //   console.log('chyba odchytena');
  //   // }

  //   console.log('bezi dalej');

  //   const subs2: Subscription = obs1$.subscribe(
  //     (x: number) => {
  //       const a = x;
  //       console.log('next value b: ' + a);
  //     },
  //     (err: Error) => {
  //       console.log('error notification');
  //     },
  //     () => console.log('obs completed')
  //   );

  //   this.obs4$ = new Observable((subscriber) => {
  //     subscriber.next(new Date().getTime());
  //     setTimeout(() => {
  //       subscriber.next(new Date().getTime());
  //     }, 3000);
  //   });

  //   this.obs4$.subscribe((x: number) => console.log('obs4 sub1: ' + x));
  //   this.obs4$.subscribe((x: number) => console.log('obs4 sub3: ' + x));
  // }

  // subs2.unsubscribe();

  count: number = 0;
  subj: Subject<number> = new Subject<number>();
  subjs: Subject<string> = new Subject<string>();

  ngOnInit(): void {
    console.log('on init');

    const obs1$: Observable<number> = new Observable<number>((subscriber) => {
      console.log('Observable1');
      const numbers: number[] = [1, 2, 3];
      numbers.map((no) => subscriber.next(no));
    });
    obs1$.subscribe((x: number) => console.log('obs1: ' + x));

    const obs2$: Observable<number> = Observable.create((subscriber) => {
      console.log('Observable2');
      const numbers: number[] = [1, 2, 3];
      numbers.map((no) => subscriber.next(no));
    });
    obs2$.subscribe((x: number) => console.log('obs2: ' + x));

    const obs3$: Observable<number> = of(1, 2, 3);
    console.log('Observable3');
    obs3$.subscribe((x: number) => console.log('obs3: ' + x));

    const obs4$: Observable<number> = from([1, 2, 3]);
    console.log('Observable4');
    obs4$.subscribe((x: number) => console.log('obs4: ' + x));

    const obs5$: Observable<number[]> = of([1, 2, 3], [4, 5, 6], [7, 8, 9]);
    console.log('Observable5');
    obs5$.subscribe((x: number[]) => console.log('obs5: ' + x));

    const obs6$ = interval(2000);
    // obs6$.subscribe((x:number) => console.log("obs6: " + x))

    const obs7$ = ajax('https://api.github.com/users?per_page=5');
    obs7$.subscribe({
      next: (value) => console.log(JSON.stringify(value.response)),
      error: (err) => console.log(err),
    });

    // let subscribeToFirst;
    // const firstOrSecond = iif(
    //   () => subscribeToFirst,
    //   of('first'),
    //   of('second')
    // );
    // subscribeToFirst = true;
    // firstOrSecond.subscribe((value) => console.log(value));
    // subscribeToFirst = false;
    // firstOrSecond.subscribe((value) => console.log(value));

    ///////////////////////////////  subjects  ////////////////////////////////
    this.subj.subscribe((x: number) => console.log('subj count: ' + x));
    this.subjs.subscribe((x: string) => console.log(x));

    const busbj: BehaviorSubject<number> = new BehaviorSubject<number>(1);
    busbj.subscribe((x: number) => console.log('busbj: ' + x));
    busbj.next(23);

    const rsubj: ReplaySubject<number> = new ReplaySubject<number>(3);
    rsubj.subscribe((x: number) => console.log('rsubj: ' + x));
    rsubj.next(23);
    rsubj.next(24);
    rsubj.next(25);
    rsubj.next(26);
    rsubj.next(27);
    rsubj.subscribe((x: number) => console.log('rsubj 2: ' + x));
  }

  clickCount(): void {
    this.count++;
    console.log('click count: ' + this.count);
    this.subj.next(new Date().getTime());
    this.subjs.next(new Date(new Date().getTime()).toString());
  }
}
