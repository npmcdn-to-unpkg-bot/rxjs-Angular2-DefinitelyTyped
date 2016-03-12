declare module "rxjs/util/isFunction" {
  export function isFunction(x: any): x is Function;
}
declare module "rxjs/Observer" {
  export interface NextObserver<T> {
    isUnsubscribed?: boolean;
    next: (value: T) => void;
    error?: (err: any) => void;
    complete?: () => void;
  }
  export interface ErrorObserver<T> {
    isUnsubscribed?: boolean;
    next?: (value: T) => void;
    error: (err: any) => void;
    complete?: () => void;
  }
  export interface CompletionObserver<T> {
    isUnsubscribed?: boolean;
    next?: (value: T) => void;
    error?: (err: any) => void;
    complete: () => void;
  }
  export type PartialObserver<T> = NextObserver<T> | ErrorObserver<T> | CompletionObserver<T>;
  export interface Observer<T> {
    isUnsubscribed?: boolean;
    next: (value: T) => void;
    error: (err: any) => void;
    complete: () => void;
  }
  export const empty: Observer<any>;
}
declare module "rxjs/util/isArray" {
  export const isArray: (arg: any) => arg is any[];
}
declare module "rxjs/util/isObject" {
  export function isObject(x: any): x is Object;
}
declare module "rxjs/util/errorObject" {
  export var errorObject: any;
}
declare module "rxjs/util/tryCatch" {
  export function tryCatch<T extends Function>(fn: T): T;
}
declare module "rxjs/Subscription" {
  export class Subscription {
    static EMPTY: Subscription;
    isUnsubscribed: boolean;
    constructor(_unsubscribe?: () => void);
    unsubscribe(): void;
    add(subscription: Subscription | Function | void): void;
    remove(subscription: Subscription): void;
  }
  export class UnsubscriptionError extends Error {
    errors: any[];
    constructor(errors: any[]);
  }
}
declare module "rxjs/util/root" {
  export let root: any;
}
declare module "rxjs/util/SymbolShim" {
  export function polyfillSymbol(root: any): any;
  export function ensureFor(Symbol: any): void;
  export function ensureSymbol(root: any): any;
  export function symbolForPolyfill(key: any): string;
  export function ensureIterator(Symbol: any, root: any): void;
  export function ensureObservable(Symbol: any): void;
  export const SymbolShim: any;
}
declare module "rxjs/symbol/rxSubscriber" {
  /**
   * rxSubscriber symbol is a symbol for retrieving an "Rx safe" Observer from an object
   * "Rx safety" can be defined as an object that has all of the traits of an Rx Subscriber,
   * including the ability to add and remove subscriptions to the subscription chain and
   * guarantees involving event triggering (can't "next" after unsubscription, etc).
   */
  export const rxSubscriber: any;
}
declare module "rxjs/Subscriber" {
  import { Observer, PartialObserver } from "rxjs/Observer";
  import { Subscription } from "rxjs/Subscription";
  export class Subscriber<T> extends Subscription implements Observer<T> {
    static create<T>(next?: (x?: T) => void, error?: (e?: any) => void, complete?: () => void): Subscriber<T>;
    syncErrorValue: any;
    syncErrorThrown: boolean;
    syncErrorThrowable: boolean;
    protected isStopped: boolean;
    protected destination: PartialObserver<any>;
    constructor(destinationOrNext?: PartialObserver<any> | ((value: T) => void), error?: (e?: any) => void, complete?: () => void);
    next(value?: T): void;
    error(err?: any): void;
    complete(): void;
    unsubscribe(): void;
    protected _next(value: T): void;
    protected _error(err: any): void;
    protected _complete(): void;
  }
}
declare module "rxjs/OuterSubscriber" {
  import { Subscriber } from "rxjs/Subscriber";
  import { InnerSubscriber } from "rxjs/InnerSubscriber";
  export class OuterSubscriber<T, R> extends Subscriber<T> {
    notifyNext(outerValue: T, innerValue: R, outerIndex: number, innerIndex: number, innerSub: InnerSubscriber<T, R>): void;
    notifyError(error: any, innerSub: InnerSubscriber<T, R>): void;
    notifyComplete(innerSub: InnerSubscriber<T, R>): void;
  }
}
declare module "rxjs/InnerSubscriber" {
  import { Subscriber } from "rxjs/Subscriber";
  import { OuterSubscriber } from "rxjs/OuterSubscriber";
  export class InnerSubscriber<T, R> extends Subscriber<R> {
    private parent;
    private outerValue;
    private outerIndex;
    private index;
    constructor(parent: OuterSubscriber<T, R>, outerValue: T, outerIndex: number);
    protected _next(value: R): void;
    protected _error(error: any): void;
    protected _complete(): void;
  }
}
declare module "rxjs/Operator" {
  import { Subscriber } from "rxjs/Subscriber";
  export class Operator<T, R> {
    call(subscriber: Subscriber<R>): Subscriber<T>;
  }
}
declare module "rxjs/util/toSubscriber" {
  import { PartialObserver } from "rxjs/Observer";
  import { Subscriber } from "rxjs/Subscriber";
  export function toSubscriber<T>(nextOrObserver?: PartialObserver<T> | ((value: T) => void), error?: (error: any) => void, complete?: () => void): Subscriber<T>;
}
declare module "rxjs/observable/IfObservable" {
  import { Observable } from "rxjs/Observable";
  import { Subscriber } from "rxjs/Subscriber";
  import { Subscription } from "rxjs/Subscription";
  export class IfObservable<T, R> extends Observable<T> {
    private condition;
    private thenSource;
    private elseSource;
    static create<T, R>(condition: () => boolean, thenSource?: Observable<T>, elseSource?: Observable<R>): Observable<T | R>;
    constructor(condition: () => boolean, thenSource?: Observable<T>, elseSource?: Observable<R>);
    protected _subscribe(subscriber: Subscriber<T | R>): Subscription | Function | void;
  }
}
declare module "rxjs/scheduler/Action" {
  import { Subscription } from "rxjs/Subscription";
  import { Scheduler } from "rxjs/Scheduler";
  export interface Action extends Subscription {
    work: (state?: any) => void | Subscription;
    state?: any;
    delay?: number;
    schedule(state?: any, delay?: number): void;
    execute(): void;
    scheduler: Scheduler;
  }
}
declare module "rxjs/Scheduler" {
  import { Subscription } from "rxjs/Subscription";
  import { Action } from "rxjs/scheduler/Action";
  export interface Scheduler {
    now(): number;
    schedule<T>(work: (state?: T) => Subscription | void, delay?: number, state?: T): Subscription;
    flush(): void;
    active: boolean;
    actions: Action[];
    scheduledId: number;
  }
}
declare module "rxjs/observable/ErrorObservable" {
  import { Scheduler } from "rxjs/Scheduler";
  import { Observable } from "rxjs/Observable";
  import { Subscription } from "rxjs/Subscription";
  /**
   *
   */
  export class ErrorObservable extends Observable<any> {
    error: any;
    private scheduler;
    /**
     * @param error
     * @param scheduler
     * @return {ErrorObservable}
     * @static true
     * @name throw
     * @owner Observable
     */
    static create<T>(error: any, scheduler?: Scheduler): ErrorObservable;
    static dispatch({error, subscriber}: {
      error: any;
      subscriber: any;
    }): void;
    constructor(error: any, scheduler?: Scheduler);
    protected _subscribe(subscriber: any): Subscription | Function | void;
  }
}
declare module "rxjs/Observable" {
  import { PartialObserver } from "rxjs/Observer";
  import { Operator } from "rxjs/Operator";
  import { Subscriber } from "rxjs/Subscriber";
  import { Subscription } from "rxjs/Subscription";
  import { IfObservable } from "rxjs/observable/IfObservable";
  import { ErrorObservable } from "rxjs/observable/ErrorObservable";
  export type ObservableOrPromise<T> = Observable<T> | Promise<T>;
  export type ArrayOrIterator<T> = Iterator<T> | ArrayLike<T>;
  export type ObservableInput<T> = ObservableOrPromise<T> | ArrayOrIterator<T>;
  /**
   * A representation of any set of values over any amount of time. This the most basic building block
   * of RxJS.
   *
   * @class Observable<T>
   */
  export class Observable<T> {
    _isScalar: boolean;
    protected source: Observable<any>;
    protected operator: Operator<any, T>;
    /**
     * @constructor
     * @param {Function} subscribe the function that is  called when the Observable is
     * initially subscribed to. This function is given a Subscriber, to which new values
     * can be `next`ed, or an `error` method can be called to raise an error, or
     * `complete` can be called to notify of a successful completion.
     */
    constructor(subscribe?: <R>(subscriber: Subscriber<R>) => Subscription | Function | void);
    /**
     * Creates a new cold Observable by calling the Observable constructor
     * @static true
     * @owner Observable
     * @method create
     * @param {Function} subscribe? the subscriber function to be passed to the Observable constructor
     * @return {Observable} a new cold observable
     */
    static create: Function;
    /**
     * Creates a new Observable, with this Observable as the source, and the passed
     * operator defined as the new observable's operator.
     * @method lift
     * @param {Operator} operator the operator defining the operation to take on the observable
     * @return {Observable} a new observable with the Operator applied
     */
    lift<R>(operator: Operator<T, R>): Observable<R>;
    /**
     * Registers handlers for handling emitted values, error and completions from the observable, and
     *  executes the observable's subscriber function, which will take action to set up the underlying data stream
     * @method subscribe
     * @param {PartialObserver|Function} observerOrNext (optional) either an observer defining all functions to be called,
     *  or the first of three possible handlers, which is the handler for each value emitted from the observable.
     * @param {Function} error (optional) a handler for a terminal event resulting from an error. If no error handler is provided,
     *  the error will be thrown as unhandled
     * @param {Function} complete (optional) a handler for a terminal event resulting from successful completion.
     * @return {Subscription} a subscription reference to the registered handlers
     */
    subscribe(observerOrNext?: PartialObserver<T> | ((value: T) => void), error?: (error: any) => void, complete?: () => void): Subscription;
    /**
     * @method forEach
     * @param {Function} next a handler for each value emitted by the observable
     * @param {PromiseConstructor} [PromiseCtor] a constructor function used to instantiate the Promise
     * @return {Promise} a promise that either resolves on observable completion or
     *  rejects with the handled error
     */
    forEach(next: (value: T) => void, PromiseCtor?: typeof Promise): Promise<void>;
    protected _subscribe(subscriber: Subscriber<any>): Subscription | Function | void;
    static if: typeof IfObservable.create;
    static throw: typeof ErrorObservable.create;
  }
}
declare module "rxjs/Notification" {
  import { PartialObserver } from "rxjs/Observer";
  import { Observable } from "rxjs/Observable";
  export class Notification<T> {
    kind: string;
    value: T;
    exception: any;
    hasValue: boolean;
    constructor(kind: string, value?: T, exception?: any);
    observe(observer: PartialObserver<T>): any;
    do(next: (value: T) => void, error?: (err: any) => void, complete?: () => void): any;
    accept(nextOrObserver: PartialObserver<T> | ((value: T) => void), error?: (err: any) => void, complete?: () => void): any;
    toObservable(): Observable<T>;
    private static completeNotification;
    private static undefinedValueNotification;
    static createNext<T>(value: T): Notification<T>;
    static createError<T>(err?: any): Notification<T>;
    static createComplete(): Notification<any>;
  }
}
declare module "rxjs/subject/SubjectSubscription" {
  import { Subject } from "rxjs/Subject";
  import { Observer } from "rxjs/Observer";
  import { Subscription } from "rxjs/Subscription";
  export class SubjectSubscription extends Subscription {
    subject: Subject<any>;
    observer: Observer<any>;
    isUnsubscribed: boolean;
    constructor(subject: Subject<any>, observer: Observer<any>);
    unsubscribe(): void;
  }
}
declare module "rxjs/util/throwError" {
  export function throwError(e: any): void;
}
declare module "rxjs/util/ObjectUnsubscribedError" {
  /**
   * an error thrown when an action is invalid because the object
   * has been unsubscribed
   */
  export class ObjectUnsubscribedError extends Error {
    constructor();
  }
}
declare module "rxjs/Subject" {
  import { Operator } from "rxjs/Operator";
  import { Observer } from "rxjs/Observer";
  import { Observable } from "rxjs/Observable";
  import { Subscriber } from "rxjs/Subscriber";
  import { Subscription } from "rxjs/Subscription";
  export class Subject<T> extends Observable<T> implements Observer<T>, Subscription {
    protected destination: Observer<T>;
    protected source: Observable<T>;
    static create: Function;
    constructor(destination?: Observer<T>, source?: Observable<T>);
    observers: Observer<T>[];
    isUnsubscribed: boolean;
    protected isStopped: boolean;
    protected hasErrored: boolean;
    protected errorValue: any;
    protected dispatching: boolean;
    protected hasCompleted: boolean;
    lift<T, R>(operator: Operator<T, R>): Observable<T>;
    add(subscription: Subscription | Function | void): void;
    remove(subscription: Subscription): void;
    unsubscribe(): void;
    protected _subscribe(subscriber: Subscriber<T>): Subscription | Function | void;
    protected _unsubscribe(): void;
    next(value: T): void;
    error(err?: any): void;
    complete(): void;
    asObservable(): Observable<T>;
    protected _next(value: T): void;
    protected _finalNext(value: T): void;
    protected _error(err: any): void;
    protected _finalError(err: any): void;
    protected _complete(): void;
    protected _finalComplete(): void;
    private throwIfUnsubscribed();
  }
}
declare module "rxjs/subject/AsyncSubject" {
  import { Subject } from "rxjs/Subject";
  import { Subscriber } from "rxjs/Subscriber";
  import { Subscription } from "rxjs/Subscription";
  export class AsyncSubject<T> extends Subject<T> {
    value: T;
    hasNext: boolean;
    protected _subscribe(subscriber: Subscriber<any>): Subscription | Function | void;
    protected _next(value: T): void;
    protected _complete(): void;
  }
}
declare module "rxjs/observable/BoundCallbackObservable" {
  import { Observable } from "rxjs/Observable";
  import { Subscriber } from "rxjs/Subscriber";
  import { Subscription } from "rxjs/Subscription";
  import { Scheduler } from "rxjs/Scheduler";
  import { AsyncSubject } from "rxjs/subject/AsyncSubject";
  /**
   *
   */
  export class BoundCallbackObservable<T> extends Observable<T> {
    private callbackFunc;
    private selector;
    private args;
    scheduler: Scheduler;
    subject: AsyncSubject<T>;
    static create<R>(callbackFunc: (callback: (result: R) => any) => any, selector?: void, scheduler?: Scheduler): () => Observable<R>;
    static create<T, R>(callbackFunc: (v1: T, callback: (result: R) => any) => any, selector?: void, scheduler?: Scheduler): (v1: T) => Observable<R>;
    static create<T, T2, R>(callbackFunc: (v1: T, v2: T2, callback: (result: R) => any) => any, selector?: void, scheduler?: Scheduler): (v1: T, v2: T2) => Observable<R>;
    static create<T, T2, T3, R>(callbackFunc: (v1: T, v2: T2, v3: T3, callback: (result: R) => any) => any, selector?: void, scheduler?: Scheduler): (v1: T, v2: T2, v3: T3) => Observable<R>;
    static create<T, T2, T3, T4, R>(callbackFunc: (v1: T, v2: T2, v3: T3, v4: T4, callback: (result: R) => any) => any, selector?: void, scheduler?: Scheduler): (v1: T, v2: T2, v3: T3, v4: T4) => Observable<R>;
    static create<T, T2, T3, T4, T5, R>(callbackFunc: (v1: T, v2: T2, v3: T3, v4: T4, v5: T5, callback: (result: R) => any) => any, selector?: void, scheduler?: Scheduler): (v1: T, v2: T2, v3: T3, v4: T4, v5: T5) => Observable<R>;
    static create<T, T2, T3, T4, T5, T6, R>(callbackFunc: (v1: T, v2: T2, v3: T3, v4: T4, v5: T5, v6: T6, callback: (result: R) => any) => any, selector?: void, scheduler?: Scheduler): (v1: T, v2: T2, v3: T3, v4: T4, v5: T5, v6: T6) => Observable<R>;
    static create<R>(callbackFunc: (callback: (...args: any[]) => any) => any, selector: (...args: any[]) => R, scheduler?: Scheduler): () => Observable<R>;
    static create<T, R>(callbackFunc: (v1: T, callback: (...args: any[]) => any) => any, selector: (...args: any[]) => R, scheduler?: Scheduler): (v1: T) => Observable<R>;
    static create<T, T2, R>(callbackFunc: (v1: T, v2: T2, callback: (...args: any[]) => any) => any, selector: (...args: any[]) => R, scheduler?: Scheduler): (v1: T, v2: T2) => Observable<R>;
    static create<T, T2, T3, R>(callbackFunc: (v1: T, v2: T2, v3: T3, callback: (...args: any[]) => any) => any, selector: (...args: any[]) => R, scheduler?: Scheduler): (v1: T, v2: T2, v3: T3) => Observable<R>;
    static create<T, T2, T3, T4, R>(callbackFunc: (v1: T, v2: T2, v3: T3, v4: T4, callback: (...args: any[]) => any) => any, selector: (...args: any[]) => R, scheduler?: Scheduler): (v1: T, v2: T2, v3: T3, v4: T4) => Observable<R>;
    static create<T, T2, T3, T4, T5, R>(callbackFunc: (v1: T, v2: T2, v3: T3, v4: T4, v5: T5, callback: (...args: any[]) => any) => any, selector: (...args: any[]) => R, scheduler?: Scheduler): (v1: T, v2: T2, v3: T3, v4: T4, v5: T5) => Observable<R>;
    static create<T, T2, T3, T4, T5, T6, R>(callbackFunc: (v1: T, v2: T2, v3: T3, v4: T4, v5: T5, v6: T6, callback: (...args: any[]) => any) => any, selector: (...args: any[]) => R, scheduler?: Scheduler): (v1: T, v2: T2, v3: T3, v4: T4, v5: T5, v6: T6) => Observable<R>;
    static create<T>(callbackFunc: Function, selector?: void, scheduler?: Scheduler): (...args: any[]) => Observable<T>;
    static create<T>(callbackFunc: Function, selector?: (...args: any[]) => T, scheduler?: Scheduler): (...args: any[]) => Observable<T>;
    constructor(callbackFunc: Function, selector: Function, args: any[], scheduler: Scheduler);
    protected _subscribe(subscriber: Subscriber<T | T[]>): Subscription;
  }
}
declare module "rxjs/add/observable/bindCallback" {
  import { BoundCallbackObservable } from "rxjs/observable/BoundCallbackObservable";
  module "rxjs/Observable" {
    namespace Observable {
      let bindCallback: typeof BoundCallbackObservable.create;
    }
  }
}
declare module "rxjs/observable/BoundNodeCallbackObservable" {
  import { Observable } from "rxjs/Observable";
  import { Subscriber } from "rxjs/Subscriber";
  import { Subscription } from "rxjs/Subscription";
  import { Scheduler } from "rxjs/Scheduler";
  import { AsyncSubject } from "rxjs/subject/AsyncSubject";
  /**
   *
   */
  export class BoundNodeCallbackObservable<T> extends Observable<T> {
    private callbackFunc;
    private selector;
    private args;
    scheduler: Scheduler;
    subject: AsyncSubject<T>;
    static create<R>(callbackFunc: (callback: (err: any, result: R) => any) => any, selector?: void, scheduler?: Scheduler): () => Observable<R>;
    static create<T, R>(callbackFunc: (v1: T, callback: (err: any, result: R) => any) => any, selector?: void, scheduler?: Scheduler): (v1: T) => Observable<R>;
    static create<T, T2, R>(callbackFunc: (v1: T, v2: T2, callback: (err: any, result: R) => any) => any, selector?: void, scheduler?: Scheduler): (v1: T, v2: T2) => Observable<R>;
    static create<T, T2, T3, R>(callbackFunc: (v1: T, v2: T2, v3: T3, callback: (err: any, result: R) => any) => any, selector?: void, scheduler?: Scheduler): (v1: T, v2: T2, v3: T3) => Observable<R>;
    static create<T, T2, T3, T4, R>(callbackFunc: (v1: T, v2: T2, v3: T3, v4: T4, callback: (err: any, result: R) => any) => any, selector?: void, scheduler?: Scheduler): (v1: T, v2: T2, v3: T3, v4: T4) => Observable<R>;
    static create<T, T2, T3, T4, T5, R>(callbackFunc: (v1: T, v2: T2, v3: T3, v4: T4, v5: T5, callback: (err: any, result: R) => any) => any, selector?: void, scheduler?: Scheduler): (v1: T, v2: T2, v3: T3, v4: T4, v5: T5) => Observable<R>;
    static create<T, T2, T3, T4, T5, T6, R>(callbackFunc: (v1: T, v2: T2, v3: T3, v4: T4, v5: T5, v6: T6, callback: (err: any, result: R) => any) => any, selector?: void, scheduler?: Scheduler): (v1: T, v2: T2, v3: T3, v4: T4, v5: T5, v6: T6) => Observable<R>;
    static create<T>(callbackFunc: Function, selector?: void, scheduler?: Scheduler): (...args: any[]) => Observable<T>;
    static create<T>(callbackFunc: Function, selector?: (...args: any[]) => T, scheduler?: Scheduler): (...args: any[]) => Observable<T>;
    constructor(callbackFunc: Function, selector: Function, args: any[], scheduler: Scheduler);
    protected _subscribe(subscriber: Subscriber<T | T[]>): Subscription;
  }
}
declare module "rxjs/add/observable/bindNodeCallback" {
  import { BoundNodeCallbackObservable } from "rxjs/observable/BoundNodeCallbackObservable";
  module "rxjs/Observable" {
    namespace Observable {
      let bindNodeCallback: typeof BoundNodeCallbackObservable.create;
    }
  }
}
declare module "rxjs/observable/ScalarObservable" {
  import { Scheduler } from "rxjs/Scheduler";
  import { Observable } from "rxjs/Observable";
  import { Subscriber } from "rxjs/Subscriber";
  import { Subscription } from "rxjs/Subscription";
  export class ScalarObservable<T> extends Observable<T> {
    value: T;
    private scheduler;
    static create<T>(value: T, scheduler?: Scheduler): ScalarObservable<T>;
    static dispatch(state: any): void;
    _isScalar: boolean;
    constructor(value: T, scheduler?: Scheduler);
    protected _subscribe(subscriber: Subscriber<T>): Subscription | Function | void;
  }
}
declare module "rxjs/observable/EmptyObservable" {
  import { Scheduler } from "rxjs/Scheduler";
  import { Subscriber } from "rxjs/Subscriber";
  import { Observable } from "rxjs/Observable";
  import { Subscription } from "rxjs/Subscription";
  /**
   *
   */
  export class EmptyObservable<T> extends Observable<T> {
    private scheduler;
    /**
     * @param scheduler
     * @return {EmptyObservable<T>}
     * @static true
     * @name empty
     * @owner Observable
     */
    static create<T>(scheduler?: Scheduler): Observable<T>;
    static dispatch({subscriber}: {
      subscriber: any;
    }): void;
    constructor(scheduler?: Scheduler);
    protected _subscribe(subscriber: Subscriber<T>): Subscription | Function | void;
  }
}
declare module "rxjs/util/isScheduler" {
  import { Scheduler } from "rxjs/Scheduler";
  export function isScheduler<T>(value: any): value is Scheduler;
}
declare module "rxjs/observable/ArrayObservable" {
  import { Scheduler } from "rxjs/Scheduler";
  import { Observable } from "rxjs/Observable";
  import { Subscriber } from "rxjs/Subscriber";
  import { Subscription } from "rxjs/Subscription";
  /**
   *
   */
  export class ArrayObservable<T> extends Observable<T> {
    array: T[];
    scheduler: Scheduler;
    /**
     * @param array
     * @param scheduler
     * @return {ArrayObservable}
     * @static true
     * @name fromArray
     * @owner Observable
     */
    static create<T>(array: T[], scheduler?: Scheduler): ArrayObservable<T>;
    /**
     * @param array
     * @return {any}
     * @static true
     * @name of
     * @owner Observable
     */
    static of<T>(...array: Array<T | Scheduler>): Observable<T>;
    static dispatch(state: any): void;
    value: any;
    constructor(array: T[], scheduler?: Scheduler);
    protected _subscribe(subscriber: Subscriber<T>): Subscription | Function | void;
  }
}
declare module "rxjs/util/isPromise" {
  export function isPromise<T>(value: any | Promise<T>): value is Promise<T>;
}
declare module "rxjs/util/subscribeToResult" {
  import { Subscription } from "rxjs/Subscription";
  import { OuterSubscriber } from "rxjs/OuterSubscriber";
  export function subscribeToResult<T, R>(outerSubscriber: OuterSubscriber<T, R>, result: any, outerValue?: T, outerIndex?: number): Subscription;
}
declare module "rxjs/operator/combineLatest" {
  import { Observable, ObservableInput } from "rxjs/Observable";
  import { Scheduler } from "rxjs/Scheduler";
  import { Operator } from "rxjs/Operator";
  import { Subscriber } from "rxjs/Subscriber";
  import { OuterSubscriber } from "rxjs/OuterSubscriber";
  import { InnerSubscriber } from "rxjs/InnerSubscriber";
  /**
   * Combines the values from this observable with values from observables passed as arguments. This is done by subscribing
   * to each observable, in order, and collecting an array of each of the most recent values any time any of the observables
   * emits, then either taking that array and passing it as arguments to an option `project` function and emitting the return
   * value of that, or just emitting the array of recent values directly if there is no `project` function.
   * @param {...Observable} observables the observables to combine the source with
   * @param {function} [project] an optional function to project the values from the combined recent values into a new value for emission.
   * @return {Observable} an observable of other projected values from the most recent values from each observable, or an array of each of
   * the most recent values from each observable.
   * @method combineLatest
   * @owner Observable
   */
  export function combineLatest<T, R>(...observables: Array<ObservableInput<any> | Array<ObservableInput<any>> | ((...values: Array<any>) => R)>): Observable<R>;
  export interface CombineLatestSignature<T> {
    <R>(project: (v1: T) => R): Observable<R>;
    <T2, R>(v2: ObservableInput<T2>, project: (v1: T, v2: T2) => R): Observable<R>;
    <T2, T3, R>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, project: (v1: T, v2: T2, v3: T3) => R): Observable<R>;
    <T2, T3, T4, R>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, project: (v1: T, v2: T2, v3: T3, v4: T4) => R): Observable<R>;
    <T2, T3, T4, T5, R>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, project: (v1: T, v2: T2, v3: T3, v4: T4, v5: T5) => R): Observable<R>;
    <T2, T3, T4, T5, T6, R>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, v6: ObservableInput<T6>, project: (v1: T, v2: T2, v3: T3, v4: T4, v5: T5, v6: T6) => R): Observable<R>;
    <T2>(v2: ObservableInput<T2>): Observable<[T, T2]>;
    <T2, T3>(v2: ObservableInput<T2>, v3: ObservableInput<T3>): Observable<[T, T2, T3]>;
    <T2, T3, T4>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>): Observable<[T, T2, T3, T4]>;
    <T2, T3, T4, T5>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>): Observable<[T, T2, T3, T4, T5]>;
    <T2, T3, T4, T5, T6>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, v6: ObservableInput<T6>): Observable<[T, T2, T3, T4, T5, T6]>;
    <R>(...observables: Array<ObservableInput<any> | ((...values: Array<any>) => R)>): Observable<R>;
    <R>(array: ObservableInput<any>[]): Observable<R>;
    <R>(array: ObservableInput<any>[], project: (...values: Array<any>) => R): Observable<R>;
  }
  export function combineLatestStatic<T>(v1: ObservableInput<T>, scheduler?: Scheduler): Observable<[T]>;
  export function combineLatestStatic<T, T2>(v1: ObservableInput<T>, v2: ObservableInput<T2>, scheduler?: Scheduler): Observable<[T, T2]>;
  export function combineLatestStatic<T, T2, T3>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, scheduler?: Scheduler): Observable<[T, T2, T3]>;
  export function combineLatestStatic<T, T2, T3, T4>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, scheduler?: Scheduler): Observable<[T, T2, T3, T4]>;
  export function combineLatestStatic<T, T2, T3, T4, T5>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, scheduler?: Scheduler): Observable<[T, T2, T3, T4, T5]>;
  export function combineLatestStatic<T, T2, T3, T4, T5, T6>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, v6: ObservableInput<T6>, scheduler?: Scheduler): Observable<[T, T2, T3, T4, T5, T6]>;
  export function combineLatestStatic<T, R>(v1: ObservableInput<T>, project: (v1: T) => R, scheduler?: Scheduler): Observable<R>;
  export function combineLatestStatic<T, T2, R>(v1: ObservableInput<T>, v2: ObservableInput<T2>, project: (v1: T, v2: T2) => R, scheduler?: Scheduler): Observable<R>;
  export function combineLatestStatic<T, T2, T3, R>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, project: (v1: T, v2: T2, v3: T3) => R, scheduler?: Scheduler): Observable<R>;
  export function combineLatestStatic<T, T2, T3, T4, R>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, project: (v1: T, v2: T2, v3: T3, v4: T4) => R, scheduler?: Scheduler): Observable<R>;
  export function combineLatestStatic<T, T2, T3, T4, T5, R>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, project: (v1: T, v2: T2, v3: T3, v4: T4, v5: T5) => R, scheduler?: Scheduler): Observable<R>;
  export function combineLatestStatic<T, T2, T3, T4, T5, T6, R>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, v6: ObservableInput<T6>, project: (v1: T, v2: T2, v3: T3, v4: T4, v5: T5, v6: T6) => R, scheduler?: Scheduler): Observable<R>;
  export function combineLatestStatic<R>(...observables: Array<ObservableInput<any> | ((...values: Array<any>) => R) | Scheduler>): Observable<R>;
  export function combineLatestStatic<R>(array: ObservableInput<any>[], scheduler?: Scheduler): Observable<R>;
  export function combineLatestStatic<R>(array: ObservableInput<any>[], project: (...values: Array<any>) => R, scheduler?: Scheduler): Observable<R>;
  export class CombineLatestOperator<T, R> implements Operator<T, R> {
    private project;
    constructor(project?: (...values: Array<any>) => R);
    call(subscriber: Subscriber<R>): Subscriber<T>;
  }
  export class CombineLatestSubscriber<T, R> extends OuterSubscriber<T, R> {
    private project;
    private active;
    private values;
    private observables;
    private toRespond;
    constructor(destination: Subscriber<R>, project?: (...values: Array<any>) => R);
    protected _next(observable: any): void;
    protected _complete(): void;
    notifyComplete(unused: Subscriber<R>): void;
    notifyNext(outerValue: T, innerValue: R, outerIndex: number, innerIndex: number, innerSub: InnerSubscriber<T, R>): void;
    private _tryProject(values);
  }
}
declare module "rxjs/add/observable/combineLatest" {
  import { combineLatestStatic } from "rxjs/operator/combineLatest";
  module "rxjs/Observable" {
    namespace Observable {
      let combineLatest: typeof combineLatestStatic;
    }
  }
}
declare module "rxjs/operator/mergeAll" {
  import { Observable } from "rxjs/Observable";
  import { Operator } from "rxjs/Operator";
  import { Observer } from "rxjs/Observer";
  import { Subscription } from "rxjs/Subscription";
  import { OuterSubscriber } from "rxjs/OuterSubscriber";
  /**
   * @param concurrent
   * @return {Observable<R>|WebSocketSubject<Observable<any>>|Observable<Observable<any>>}
   * @method mergeAll
   * @owner Observable
   */
  export function mergeAll<T>(concurrent?: number): T;
  export interface MergeAllSignature<T> {
    (): T;
  }
  export class MergeAllOperator<T> implements Operator<Observable<T>, T> {
    private concurrent;
    constructor(concurrent: number);
    call(observer: Observer<T>): MergeAllSubscriber<T>;
  }
  export class MergeAllSubscriber<T> extends OuterSubscriber<Observable<T>, T> {
    private concurrent;
    private hasCompleted;
    private buffer;
    private active;
    constructor(destination: Observer<T>, concurrent: number);
    protected _next(observable: Observable<T>): void;
    protected _complete(): void;
    notifyComplete(innerSub: Subscription): void;
  }
}
declare module "rxjs/operator/concat" {
  import { Observable, ObservableInput } from "rxjs/Observable";
  import { Scheduler } from "rxjs/Scheduler";
  /**
   * Joins this observable with multiple other observables by subscribing to them one at a time, starting with the source,
   * and merging their results into the returned observable. Will wait for each observable to complete before moving
   * on to the next.
   * @params {...Observable} the observables to concatenate
   * @params {Scheduler} [scheduler] an optional scheduler to schedule each observable subscription on.
   * @return {Observable} All values of each passed observable merged into a single observable, in order, in serial fashion.
   * @method concat
   * @owner Observable
   */
  export function concat<T, R>(...observables: Array<ObservableInput<any> | Scheduler>): Observable<R>;
  export interface ConcatSignature<T> {
    (scheduler?: Scheduler): Observable<T>;
    <T2>(v2: ObservableInput<T2>, scheduler?: Scheduler): Observable<T | T2>;
    <T2, T3>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, scheduler?: Scheduler): Observable<T | T2 | T3>;
    <T2, T3, T4>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, scheduler?: Scheduler): Observable<T | T2 | T3 | T4>;
    <T2, T3, T4, T5>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, scheduler?: Scheduler): Observable<T | T2 | T3 | T4 | T5>;
    <T2, T3, T4, T5, T6>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, v6: ObservableInput<T6>, scheduler?: Scheduler): Observable<T | T2 | T3 | T4 | T5 | T6>;
    (...observables: Array<ObservableInput<T> | Scheduler>): Observable<T>;
    <R>(...observables: Array<ObservableInput<any> | Scheduler>): Observable<R>;
  }
  /**
   * Joins multiple observables together by subscribing to them one at a time and merging their results
   * into the returned observable. Will wait for each observable to complete before moving on to the next.
   * @params {...Observable} the observables to concatenate
   * @params {Scheduler} [scheduler] an optional scheduler to schedule each observable subscription on.
   * @return {Observable} All values of each passed observable merged into a single observable, in order, in serial fashion.
   * @static true
   * @name concat
   * @owner Observable
   */
  export function concatStatic<T>(v1: ObservableInput<T>, scheduler?: Scheduler): Observable<T>;
  export function concatStatic<T, T2>(v1: ObservableInput<T>, v2: ObservableInput<T2>, scheduler?: Scheduler): Observable<T | T2>;
  export function concatStatic<T, T2, T3>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, scheduler?: Scheduler): Observable<T | T2 | T3>;
  export function concatStatic<T, T2, T3, T4>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, scheduler?: Scheduler): Observable<T | T2 | T3 | T4>;
  export function concatStatic<T, T2, T3, T4, T5>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, scheduler?: Scheduler): Observable<T | T2 | T3 | T4 | T5>;
  export function concatStatic<T, T2, T3, T4, T5, T6>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, v6: ObservableInput<T6>, scheduler?: Scheduler): Observable<T | T2 | T3 | T4 | T5 | T6>;
  export function concatStatic<T>(...observables: (ObservableInput<T> | Scheduler)[]): Observable<T>;
  export function concatStatic<T, R>(...observables: (ObservableInput<any> | Scheduler)[]): Observable<R>;
}
declare module "rxjs/add/observable/concat" {
  import { concatStatic } from "rxjs/operator/concat";
  module "rxjs/Observable" {
    namespace Observable {
      let concat: typeof concatStatic;
    }
  }
}
declare module "rxjs/observable/DeferObservable" {
  import { Observable } from "rxjs/Observable";
  import { Subscriber } from "rxjs/Subscriber";
  /**
   *
   */
  export class DeferObservable<T> extends Observable<T> {
    private observableFactory;
    /**
     * @param observableFactory
     * @return {DeferObservable}
     * @static true
     * @name defer
     * @owner Observable
     */
    static create<T>(observableFactory: () => Observable<T>): Observable<T>;
    constructor(observableFactory: () => Observable<T>);
    protected _subscribe(subscriber: Subscriber<T>): void;
  }
}
declare module "rxjs/add/observable/defer" {
  import { DeferObservable } from "rxjs/observable/DeferObservable";
  module "rxjs/Observable" {
    namespace Observable {
      let defer: typeof DeferObservable.create;
    }
  }
}
declare module "rxjs/add/observable/empty" {
  import { EmptyObservable } from "rxjs/observable/EmptyObservable";
  module "rxjs/Observable" {
    namespace Observable {
      let empty: typeof EmptyObservable.create;
    }
  }
}
declare module "rxjs/observable/PromiseObservable" {
  import { Scheduler } from "rxjs/Scheduler";
  import { Observable } from "rxjs/Observable";
  import { Subscriber } from "rxjs/Subscriber";
  import { Subscription } from "rxjs/Subscription";
  /**
   *
   */
  export class PromiseObservable<T> extends Observable<T> {
    private promise;
    scheduler: Scheduler;
    value: T;
    /**
     * @param promise
     * @param scheduler
     * @return {PromiseObservable}
     * @static true
     * @name fromPromise
     * @owner Observable
     */
    static create<T>(promise: Promise<T>, scheduler?: Scheduler): Observable<T>;
    constructor(promise: Promise<T>, scheduler?: Scheduler);
    protected _subscribe(subscriber: Subscriber<T>): Subscription | Function | void;
  }
}
declare module "rxjs/observable/ForkJoinObservable" {
  import { Observable } from "rxjs/Observable";
  import { Subscriber } from "rxjs/Subscriber";
  /**
   *
   */
  export class ForkJoinObservable<T> extends Observable<T> {
    private sources;
    private resultSelector;
    constructor(sources: Array<Observable<any> | Promise<any>>, resultSelector?: (...values: Array<any>) => T);
    /**
     * @param sources
     * @return {any}
     * @static true
     * @name forkJoin
     * @owner Observable
     */
    static create<T>(...sources: Array<Observable<any> | Promise<any> | Array<Observable<any>> | ((...values: Array<any>) => any)>): Observable<T>;
    protected _subscribe(subscriber: Subscriber<any>): void;
  }
}
declare module "rxjs/add/observable/forkJoin" {
  import { ForkJoinObservable } from "rxjs/observable/ForkJoinObservable";
  module "rxjs/Observable" {
    namespace Observable {
      let forkJoin: typeof ForkJoinObservable.create;
    }
  }
}
declare module "rxjs/observable/IteratorObservable" {
  import { Scheduler } from "rxjs/Scheduler";
  import { Observable } from "rxjs/Observable";
  import { Subscription } from "rxjs/Subscription";
  import { Subscriber } from "rxjs/Subscriber";
  export class IteratorObservable<T> extends Observable<T> {
    private iterator;
    static create<T>(iterator: any, project?: ((x?: any, i?: number) => T) | any, thisArg?: any | Scheduler, scheduler?: Scheduler): IteratorObservable<{}>;
    static dispatch(state: any): void;
    private thisArg;
    private project;
    private scheduler;
    constructor(iterator: any, project?: ((x?: any, i?: number) => T) | any, thisArg?: any | Scheduler, scheduler?: Scheduler);
    protected _subscribe(subscriber: Subscriber<T>): Subscription | Function | void;
  }
}
declare module "rxjs/observable/ArrayLikeObservable" {
  import { Scheduler } from "rxjs/Scheduler";
  import { Observable } from "rxjs/Observable";
  import { Subscriber } from "rxjs/Subscriber";
  import { Subscription } from "rxjs/Subscription";
  export class ArrayLikeObservable<T> extends Observable<T> {
    private arrayLike;
    private scheduler;
    private mapFn;
    static create<T>(arrayLike: ArrayLike<T>, mapFn: (x: T, y: number) => T, thisArg: any, scheduler?: Scheduler): Observable<T>;
    static dispatch(state: any): void;
    private value;
    constructor(arrayLike: ArrayLike<T>, mapFn: (x: T, y: number) => T, thisArg: any, scheduler?: Scheduler);
    protected _subscribe(subscriber: Subscriber<T>): Subscription | Function | void;
  }
}
declare module "rxjs/operator/observeOn" {
  import { Observable } from "rxjs/Observable";
  import { Scheduler } from "rxjs/Scheduler";
  import { Operator } from "rxjs/Operator";
  import { Subscriber } from "rxjs/Subscriber";
  /**
   * @param scheduler
   * @param delay
   * @return {Observable<R>|WebSocketSubject<T>|Observable<T>}
   * @method observeOn
   * @owner Observable
   */
  export function observeOn<T>(scheduler: Scheduler, delay?: number): Observable<T>;
  export interface ObserveOnSignature<T> {
    (scheduler: Scheduler, delay?: number): Observable<T>;
  }
  export class ObserveOnOperator<T> implements Operator<T, T> {
    private scheduler;
    private delay;
    constructor(scheduler: Scheduler, delay?: number);
    call(subscriber: Subscriber<T>): Subscriber<T>;
  }
  export class ObserveOnSubscriber<T> extends Subscriber<T> {
    private scheduler;
    private delay;
    static dispatch({notification, destination}: {
      notification: any;
      destination: any;
    }): void;
    constructor(destination: Subscriber<T>, scheduler: Scheduler, delay?: number);
    private scheduleMessage(notification);
    protected _next(value: T): void;
    protected _error(err: any): void;
    protected _complete(): void;
  }
}
declare module "rxjs/observable/FromObservable" {
  import { Scheduler } from "rxjs/Scheduler";
  import { Observable, ObservableInput } from "rxjs/Observable";
  import { Subscriber } from "rxjs/Subscriber";
  /**
   *
   */
  export class FromObservable<T> extends Observable<T> {
    private ish;
    private scheduler;
    constructor(ish: ObservableInput<T>, scheduler: Scheduler);
    /**
     * @param ish
     * @param mapFnOrScheduler
     * @param thisArg
     * @param lastScheduler
     * @return {any}
     * @static true
     * @name from
     * @owner Observable
     */
    static create<T>(ish: any, mapFnOrScheduler?: Scheduler | ((x: any, y: number) => T), thisArg?: any, lastScheduler?: Scheduler): Observable<T>;
    protected _subscribe(subscriber: Subscriber<T>): any;
  }
}
declare module "rxjs/add/observable/from" {
  import { FromObservable } from "rxjs/observable/FromObservable";
  module "rxjs/Observable" {
    namespace Observable {
      let from: typeof FromObservable.create;
    }
  }
}
declare module "rxjs/add/observable/of" {
  import { ArrayObservable } from "rxjs/observable/ArrayObservable";
  module "rxjs/Observable" {
    namespace Observable {
      let of: typeof ArrayObservable.of;
    }
  }
}
declare module "rxjs/add/observable/fromArray" {
  import { ArrayObservable } from "rxjs/observable/ArrayObservable";
  import "rxjs/add/observable/of";
  module "rxjs/Observable" {
    namespace Observable {
      let fromArray: typeof ArrayObservable.create;
    }
  }
}
declare module "rxjs/observable/FromEventObservable" {
  import { Observable } from "rxjs/Observable";
  import { Subscriber } from "rxjs/Subscriber";
  export type NodeStyleEventEmmitter = {
    addListener: (eventName: string, handler: Function) => void;
    removeListener: (eventName: string, handler: Function) => void;
  };
  export type JQueryStyleEventEmitter = {
    on: (eventName: string, handler: Function) => void;
    off: (eventName: string, handler: Function) => void;
  };
  export type EventTargetLike = EventTarget | NodeStyleEventEmmitter | JQueryStyleEventEmitter | NodeList | HTMLCollection;
  /**
   *
   */
  export class FromEventObservable<T, R> extends Observable<T> {
    private sourceObj;
    private eventName;
    private selector;
    /**
     * @param sourceObj
     * @param eventName
     * @param selector
     * @return {FromEventObservable}
     * @static true
     * @name fromEvent
     * @owner Observable
     */
    static create<T>(sourceObj: EventTargetLike, eventName: string, selector?: (...args: Array<any>) => T): Observable<T>;
    constructor(sourceObj: EventTargetLike, eventName: string, selector?: (...args: Array<any>) => T);
    private static setupSubscription<T>(sourceObj, eventName, handler, subscriber);
    protected _subscribe(subscriber: Subscriber<T>): void;
  }
}
declare module "rxjs/add/observable/fromEvent" {
  import { FromEventObservable } from "rxjs/observable/FromEventObservable";
  module "rxjs/Observable" {
    namespace Observable {
      let fromEvent: typeof FromEventObservable.create;
    }
  }
}
declare module "rxjs/observable/FromEventPatternObservable" {
  import { Observable } from "rxjs/Observable";
  import { Subscriber } from "rxjs/Subscriber";
  /**
   *
   */
  export class FromEventPatternObservable<T, R> extends Observable<T> {
    private addHandler;
    private removeHandler;
    private selector;
    /**
     * @param addHandler
     * @param removeHandler
     * @param selector
     * @return {FromEventPatternObservable}
     * @static true
     * @name fromEventPattern
     * @owner Observable
     */
    static create<T>(addHandler: (handler: Function) => any, removeHandler: (handler: Function) => void, selector?: (...args: Array<any>) => T): FromEventPatternObservable<T, {}>;
    constructor(addHandler: (handler: Function) => any, removeHandler: (handler: Function) => void, selector?: (...args: Array<any>) => T);
    protected _subscribe(subscriber: Subscriber<T>): void;
  }
}
declare module "rxjs/add/observable/fromEventPattern" {
  import { FromEventPatternObservable } from "rxjs/observable/FromEventPatternObservable";
  module "rxjs/Observable" {
    namespace Observable {
      let fromEventPattern: typeof FromEventPatternObservable.create;
    }
  }
}
declare module "rxjs/add/observable/fromPromise" {
  import { PromiseObservable } from "rxjs/observable/PromiseObservable";
  module "rxjs/Observable" {
    namespace Observable {
      let fromPromise: typeof PromiseObservable.create;
    }
  }
}
declare module "rxjs/util/isNumeric" {
  export function isNumeric(val: any): val is number;
}
declare module "rxjs/scheduler/FutureAction" {
  import { Action } from "rxjs/scheduler/Action";
  import { Scheduler } from "rxjs/Scheduler";
  import { Subscription } from "rxjs/Subscription";
  export class FutureAction<T> extends Subscription implements Action {
    scheduler: Scheduler;
    work: (x?: T) => Subscription | void;
    id: number;
    state: T;
    delay: number;
    private pending;
    constructor(scheduler: Scheduler, work: (x?: T) => Subscription | void);
    execute(): void;
    schedule(state?: T, delay?: number): Action;
    protected _schedule(state?: T, delay?: number): Action;
    protected _unsubscribe(): void;
  }
}
declare module "rxjs/scheduler/QueueAction" {
  import { Action } from "rxjs/scheduler/Action";
  import { FutureAction } from "rxjs/scheduler/FutureAction";
  export class QueueAction<T> extends FutureAction<T> {
    protected _schedule(state?: T, delay?: number): Action;
  }
}
declare module "rxjs/scheduler/QueueScheduler" {
  import { Scheduler } from "rxjs/Scheduler";
  import { QueueAction } from "rxjs/scheduler/QueueAction";
  import { Subscription } from "rxjs/Subscription";
  import { Action } from "rxjs/scheduler/Action";
  export class QueueScheduler implements Scheduler {
    active: boolean;
    actions: QueueAction<any>[];
    scheduledId: number;
    now(): number;
    flush(): void;
    schedule<T>(work: (x?: T) => Subscription | void, delay?: number, state?: T): Subscription;
    scheduleNow<T>(work: (x?: T) => Subscription | void, state?: T): Action;
    scheduleLater<T>(work: (x?: T) => Subscription | void, delay: number, state?: T): Action;
  }
}
declare module "rxjs/scheduler/AsyncScheduler" {
  import { Action } from "rxjs/scheduler/Action";
  import { Subscription } from "rxjs/Subscription";
  import { QueueScheduler } from "rxjs/scheduler/QueueScheduler";
  export class AsyncScheduler extends QueueScheduler {
    scheduleNow<T>(work: (x?: any) => Subscription, state?: any): Action;
  }
}
declare module "rxjs/scheduler/async" {
  import { AsyncScheduler } from "rxjs/scheduler/AsyncScheduler";
  export const async: AsyncScheduler;
}
declare module "rxjs/observable/IntervalObservable" {
  import { Subscriber } from "rxjs/Subscriber";
  import { Scheduler } from "rxjs/Scheduler";
  import { Observable } from "rxjs/Observable";
  /**
   *
   */
  export class IntervalObservable extends Observable<number> {
    private period;
    private scheduler;
    /**
     * @param period
     * @param scheduler
     * @return {IntervalObservable}
     * @static true
     * @name interval
     * @owner Observable
     */
    static create(period?: number, scheduler?: Scheduler): Observable<number>;
    static dispatch(state: any): void;
    constructor(period?: number, scheduler?: Scheduler);
    protected _subscribe(subscriber: Subscriber<number>): void;
  }
}
declare module "rxjs/add/observable/interval" {
  import { IntervalObservable } from "rxjs/observable/IntervalObservable";
  module "rxjs/Observable" {
    namespace Observable {
      let interval: typeof IntervalObservable.create;
    }
  }
}
declare module "rxjs/operator/merge" {
  import { Observable, ObservableInput } from "rxjs/Observable";
  import { Scheduler } from "rxjs/Scheduler";
  /**
   * Creates a result Observable which emits values from every given input Observable.
   *
   * <img src="./img/merge.png" width="100%">
   *
   * @param {Observable} input Observables
   * @return {Observable} an Observable that emits items that are the result of every input Observable.
   * @method merge
   * @owner Observable
   */
  export function merge<T, R>(...observables: Array<ObservableInput<any> | Scheduler | number>): Observable<R>;
  export interface MergeSignature<T> {
    (scheduler?: Scheduler): Observable<T>;
    (concurrent?: number, scheduler?: Scheduler): Observable<T>;
    <T2>(v2: ObservableInput<T2>, scheduler?: Scheduler): Observable<T | T2>;
    <T2>(v2: ObservableInput<T2>, concurrent?: number, scheduler?: Scheduler): Observable<T | T2>;
    <T2, T3>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, scheduler?: Scheduler): Observable<T | T2 | T3>;
    <T2, T3>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, concurrent?: number, scheduler?: Scheduler): Observable<T | T2 | T3>;
    <T2, T3, T4>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, scheduler?: Scheduler): Observable<T | T2 | T3 | T4>;
    <T2, T3, T4>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, concurrent?: number, scheduler?: Scheduler): Observable<T | T2 | T3 | T4>;
    <T2, T3, T4, T5>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, scheduler?: Scheduler): Observable<T | T2 | T3 | T4 | T5>;
    <T2, T3, T4, T5>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, concurrent?: number, scheduler?: Scheduler): Observable<T | T2 | T3 | T4 | T5>;
    <T2, T3, T4, T5, T6>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, v6: ObservableInput<T6>, scheduler?: Scheduler): Observable<T | T2 | T3 | T4 | T5 | T6>;
    <T2, T3, T4, T5, T6>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, v6: ObservableInput<T6>, concurrent?: number, scheduler?: Scheduler): Observable<T | T2 | T3 | T4 | T5 | T6>;
    (...observables: Array<ObservableInput<T> | Scheduler | number>): Observable<T>;
    <R>(...observables: Array<ObservableInput<any> | Scheduler | number>): Observable<R>;
  }
  export function mergeStatic<T>(v1: ObservableInput<T>, scheduler?: Scheduler): Observable<T>;
  export function mergeStatic<T>(v1: ObservableInput<T>, concurrent?: number, scheduler?: Scheduler): Observable<T>;
  export function mergeStatic<T, T2>(v1: ObservableInput<T>, v2: ObservableInput<T2>, scheduler?: Scheduler): Observable<T | T2>;
  export function mergeStatic<T, T2>(v1: ObservableInput<T>, v2: ObservableInput<T2>, concurrent?: number, scheduler?: Scheduler): Observable<T | T2>;
  export function mergeStatic<T, T2, T3>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, scheduler?: Scheduler): Observable<T | T2 | T3>;
  export function mergeStatic<T, T2, T3>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, concurrent?: number, scheduler?: Scheduler): Observable<T | T2 | T3>;
  export function mergeStatic<T, T2, T3, T4>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, scheduler?: Scheduler): Observable<T | T2 | T3 | T4>;
  export function mergeStatic<T, T2, T3, T4>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, concurrent?: number, scheduler?: Scheduler): Observable<T | T2 | T3 | T4>;
  export function mergeStatic<T, T2, T3, T4, T5>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, scheduler?: Scheduler): Observable<T | T2 | T3 | T4 | T5>;
  export function mergeStatic<T, T2, T3, T4, T5>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, concurrent?: number, scheduler?: Scheduler): Observable<T | T2 | T3 | T4 | T5>;
  export function mergeStatic<T, T2, T3, T4, T5, T6>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, v6: ObservableInput<T6>, scheduler?: Scheduler): Observable<T | T2 | T3 | T4 | T5 | T6>;
  export function mergeStatic<T, T2, T3, T4, T5, T6>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, v6: ObservableInput<T6>, concurrent?: number, scheduler?: Scheduler): Observable<T | T2 | T3 | T4 | T5 | T6>;
  export function mergeStatic<T>(...observables: (ObservableInput<T> | Scheduler | number)[]): Observable<T>;
  export function mergeStatic<T, R>(...observables: (ObservableInput<any> | Scheduler | number)[]): Observable<R>;
}
declare module "rxjs/add/observable/merge" {
  import { mergeStatic } from "rxjs/operator/merge";
  module "rxjs/Observable" {
    namespace Observable {
      let merge: typeof mergeStatic;
    }
  }
}
declare module "rxjs/operator/race" {
  import { Observable } from "rxjs/Observable";
  import { Operator } from "rxjs/Operator";
  import { Subscriber } from "rxjs/Subscriber";
  import { OuterSubscriber } from "rxjs/OuterSubscriber";
  import { InnerSubscriber } from "rxjs/InnerSubscriber";
  /**
   * Returns an Observable that mirrors the first source Observable to emit an item
   * from the combination of this Observable and supplied Observables
   * @param {...Observables} ...observables sources used to race for which Observable emits first.
   * @return {Observable} an Observable that mirrors the output of the first Observable to emit an item.
   * @method race
   * @owner Observable
   */
  export function race<T>(...observables: Array<Observable<T> | Array<Observable<T>>>): Observable<T>;
  export interface RaceSignature<T> {
    (...observables: Array<Observable<T> | Array<Observable<T>>>): Observable<T>;
    <R>(...observables: Array<Observable<any> | Array<Observable<T>>>): Observable<R>;
  }
  /**
   * Returns an Observable that mirrors the first source Observable to emit an item.
   * @param {...Observables} ...observables sources used to race for which Observable emits first.
   * @return {Observable} an Observable that mirrors the output of the first Observable to emit an item.
   * @static true
   * @name race
   * @owner Observable
   */
  export function raceStatic<T>(...observables: Array<Observable<T> | Array<Observable<T>>>): Observable<T>;
  export class RaceOperator<T> implements Operator<T, T> {
    call(subscriber: Subscriber<T>): Subscriber<T>;
  }
  export class RaceSubscriber<T> extends OuterSubscriber<T, T> {
    private hasFirst;
    private observables;
    private subscriptions;
    constructor(destination: Subscriber<T>);
    protected _next(observable: any): void;
    protected _complete(): void;
    notifyNext(outerValue: T, innerValue: T, outerIndex: number, innerIndex: number, innerSub: InnerSubscriber<T, T>): void;
  }
}
declare module "rxjs/add/observable/race" {
  import { raceStatic } from "rxjs/operator/race";
  module "rxjs/Observable" {
    namespace Observable {
      let race: typeof raceStatic;
    }
  }
}
declare module "rxjs/util/noop" {
  export function noop(): void;
}
declare module "rxjs/observable/NeverObservable" {
  import { Observable } from "rxjs/Observable";
  import { Subscriber } from "rxjs/Subscriber";
  /**
   *
   */
  export class NeverObservable<T> extends Observable<T> {
    /**
     * @return {NeverObservable<T>}
     * @static true
     * @name never
     * @owner Observable
     */
    static create<T>(): NeverObservable<T>;
    constructor();
    protected _subscribe(subscriber: Subscriber<T>): void;
  }
}
declare module "rxjs/add/observable/never" {
  import { NeverObservable } from "rxjs/observable/NeverObservable";
  module "rxjs/Observable" {
    namespace Observable {
      let never: typeof NeverObservable.create;
    }
  }
}
declare module "rxjs/observable/RangeObservable" {
  import { Scheduler } from "rxjs/Scheduler";
  import { Observable } from "rxjs/Observable";
  import { Subscription } from "rxjs/Subscription";
  import { Subscriber } from "rxjs/Subscriber";
  /**
   *
   */
  export class RangeObservable extends Observable<number> {
    /**
     * @param start
     * @param end
     * @param scheduler
     * @return {RangeObservable}
     * @static true
     * @name range
     * @owner Observable
     */
    static create(start?: number, end?: number, scheduler?: Scheduler): Observable<number>;
    static dispatch(state: any): void;
    private start;
    private end;
    private scheduler;
    constructor(start: number, end: number, scheduler?: Scheduler);
    protected _subscribe(subscriber: Subscriber<number>): Subscription | Function | void;
  }
}
declare module "rxjs/add/observable/range" {
  import { RangeObservable } from "rxjs/observable/RangeObservable";
  module "rxjs/Observable" {
    namespace Observable {
      let range: typeof RangeObservable.create;
    }
  }
}
declare module "rxjs/add/observable/throw" {
}
declare module "rxjs/util/isDate" {
  export function isDate(value: any): value is Date;
}
declare module "rxjs/observable/TimerObservable" {
  import { Scheduler } from "rxjs/Scheduler";
  import { Observable } from "rxjs/Observable";
  import { Subscription } from "rxjs/Subscription";
  import { Subscriber } from "rxjs/Subscriber";
  /**
   *
   */
  export class TimerObservable extends Observable<number> {
    /**
     * @param dueTime
     * @param period
     * @param scheduler
     * @return {TimerObservable}
     * @static true
     * @name timer
     * @owner Observable
     */
    static create(dueTime?: number | Date, period?: number | Scheduler, scheduler?: Scheduler): Observable<number>;
    static dispatch(state: any): any;
    private period;
    private dueTime;
    private scheduler;
    constructor(dueTime?: number | Date, period?: number | Scheduler, scheduler?: Scheduler);
    protected _subscribe(subscriber: Subscriber<number>): Subscription | Function | void;
  }
}
declare module "rxjs/add/observable/timer" {
  import { TimerObservable } from "rxjs/observable/TimerObservable";
  module "rxjs/Observable" {
    namespace Observable {
      let timer: typeof TimerObservable.create;
    }
  }
}
declare module "rxjs/operator/zip" {
  import { Observable, ObservableInput } from "rxjs/Observable";
  import { Operator } from "rxjs/Operator";
  import { Subscriber } from "rxjs/Subscriber";
  /**
   * @param observables
   * @return {Observable<R>}
   * @method zip
   * @owner Observable
   */
  export function zipProto<R>(...observables: Array<ObservableInput<any> | ((...values: Array<any>) => R)>): Observable<R>;
  export interface ZipSignature<T> {
    <R>(project: (v1: T) => R): Observable<R>;
    <T2, R>(v2: ObservableInput<T2>, project: (v1: T, v2: T2) => R): Observable<R>;
    <T2, T3, R>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, project: (v1: T, v2: T2, v3: T3) => R): Observable<R>;
    <T2, T3, T4, R>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, project: (v1: T, v2: T2, v3: T3, v4: T4) => R): Observable<R>;
    <T2, T3, T4, T5, R>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, project: (v1: T, v2: T2, v3: T3, v4: T4, v5: T5) => R): Observable<R>;
    <T2, T3, T4, T5, T6, R>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, v6: ObservableInput<T6>, project: (v1: T, v2: T2, v3: T3, v4: T4, v5: T5, v6: T6) => R): Observable<R>;
    <T2>(v2: ObservableInput<T2>): Observable<[T, T2]>;
    <T2, T3>(v2: ObservableInput<T2>, v3: ObservableInput<T3>): Observable<[T, T2, T3]>;
    <T2, T3, T4>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>): Observable<[T, T2, T3, T4]>;
    <T2, T3, T4, T5>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>): Observable<[T, T2, T3, T4, T5]>;
    <T2, T3, T4, T5, T6>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, v6: ObservableInput<T6>): Observable<[T, T2, T3, T4, T5, T6]>;
    <R>(...observables: Array<ObservableInput<any> | ((...values: Array<any>) => R)>): Observable<R>;
    <R>(array: ObservableInput<any>[]): Observable<R>;
    <R>(array: ObservableInput<any>[], project: (...values: Array<any>) => R): Observable<R>;
  }
  export function zipStatic<T>(v1: ObservableInput<T>): Observable<[T]>;
  export function zipStatic<T, T2>(v1: ObservableInput<T>, v2: ObservableInput<T2>): Observable<[T, T2]>;
  export function zipStatic<T, T2, T3>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>): Observable<[T, T2, T3]>;
  export function zipStatic<T, T2, T3, T4>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>): Observable<[T, T2, T3, T4]>;
  export function zipStatic<T, T2, T3, T4, T5>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>): Observable<[T, T2, T3, T4, T5]>;
  export function zipStatic<T, T2, T3, T4, T5, T6>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, v6: ObservableInput<T6>): Observable<[T, T2, T3, T4, T5, T6]>;
  export function zipStatic<T, R>(v1: ObservableInput<T>, project: (v1: T) => R): Observable<R>;
  export function zipStatic<T, T2, R>(v1: ObservableInput<T>, v2: ObservableInput<T2>, project: (v1: T, v2: T2) => R): Observable<R>;
  export function zipStatic<T, T2, T3, R>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, project: (v1: T, v2: T2, v3: T3) => R): Observable<R>;
  export function zipStatic<T, T2, T3, T4, R>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, project: (v1: T, v2: T2, v3: T3, v4: T4) => R): Observable<R>;
  export function zipStatic<T, T2, T3, T4, T5, R>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, project: (v1: T, v2: T2, v3: T3, v4: T4, v5: T5) => R): Observable<R>;
  export function zipStatic<T, T2, T3, T4, T5, T6, R>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, v6: ObservableInput<T6>, project: (v1: T, v2: T2, v3: T3, v4: T4, v5: T5, v6: T6) => R): Observable<R>;
  export function zipStatic<R>(...observables: Array<ObservableInput<any> | ((...values: Array<any>) => R)>): Observable<R>;
  export function zipStatic<R>(array: ObservableInput<any>[]): Observable<R>;
  export function zipStatic<R>(array: ObservableInput<any>[], project: (...values: Array<any>) => R): Observable<R>;
  export class ZipOperator<T, R> implements Operator<T, R> {
    project: (...values: Array<any>) => R;
    constructor(project?: (...values: Array<any>) => R);
    call(subscriber: Subscriber<R>): Subscriber<T>;
  }
  export class ZipSubscriber<T, R> extends Subscriber<T> {
    private index;
    private values;
    private project;
    private iterators;
    private active;
    constructor(destination: Subscriber<R>, project?: (...values: Array<any>) => R, values?: any);
    protected _next(value: any): void;
    protected _complete(): void;
    notifyInactive(): void;
    checkIterators(): void;
    protected _tryProject(args: any[]): void;
  }
}
declare module "rxjs/add/observable/zip" {
  import { zipStatic } from "rxjs/operator/zip";
  module "rxjs/Observable" {
    namespace Observable {
      let zip: typeof zipStatic;
    }
  }
}
declare module "rxjs/operator/buffer" {
  import { Observable } from "rxjs/Observable";
  /**
   * Buffers the incoming observable values until the passed `closingNotifier`
   * emits a value, at which point it emits the buffer on the returned observable
   * and starts a new buffer internally, awaiting the next time `closingNotifier`
   * emits.
   *
   * <img src="./img/buffer.png" width="100%">
   *
   * @param {Observable<any>} closingNotifier an Observable that signals the
   * buffer to be emitted} from the returned observable.
   * @return {Observable<T[]>} an Observable of buffers, which are arrays of
   * values.
   * @method buffer
   * @owner Observable
   */
  export function buffer<T>(closingNotifier: Observable<any>): Observable<T[]>;
  export interface BufferSignature<T> {
    (closingNotifier: Observable<any>): Observable<T[]>;
  }
}
declare module "rxjs/add/operator/buffer" {
  import { BufferSignature } from "rxjs/operator/buffer";
  module "rxjs/Observable" {
    interface Observable<T> {
      buffer: BufferSignature<T>;
    }
  }
}
declare module "rxjs/operator/bufferCount" {
  import { Observable } from "rxjs/Observable";
  /**
   * Buffers a number of values from the source observable by `bufferSize` then
   * emits the buffer and clears it, and starts a new buffer each
   * `startBufferEvery` values. If `startBufferEvery` is not provided or is
   * `null`, then new buffers are started immediately at the start of the source
   * and when each buffer closes and is emitted.
   *
   * <img src="./img/bufferCount.png" width="100%">
   *
   * @param {number} bufferSize the maximum size of the buffer emitted.
   * @param {number} [startBufferEvery] optional interval at which to start a new
   * buffer. (e.g. if `startBufferEvery` is `2`, then a new buffer will be started
   * on every other value from the source.) A new buffer is started at the
   * beginning of the source by default.
   * @return {Observable<T[]>} an Observable of arrays of buffered values.
   * @method bufferCount
   * @owner Observable
   */
  export function bufferCount<T>(bufferSize: number, startBufferEvery?: number): Observable<T[]>;
  export interface BufferCountSignature<T> {
    (bufferSize: number, startBufferEvery?: number): Observable<T[]>;
  }
}
declare module "rxjs/add/operator/bufferCount" {
  import { BufferCountSignature } from "rxjs/operator/bufferCount";
  module "rxjs/Observable" {
    interface Observable<T> {
      bufferCount: BufferCountSignature<T>;
    }
  }
}
declare module "rxjs/operator/bufferTime" {
  import { Observable } from "rxjs/Observable";
  import { Scheduler } from "rxjs/Scheduler";
  /**
   * Buffers values from the source for a specific time period. Optionally allows
   * new buffers to be set up at an interval.
   *
   * <img src="./img/bufferTime.png" width="100%">
   *
   * @param {number} bufferTimeSpan the amount of time to fill each buffer for
   * before emitting them and clearing them.
   * @param {number} [bufferCreationInterval] the interval at which to start new
   * buffers.
   * @param {Scheduler} [scheduler] (optional, defaults to `async` scheduler) The
   * scheduler on which to schedule the intervals that determine buffer
   * boundaries.
   * @return {Observable<T[]>} an observable of arrays of buffered values.
   * @method bufferTime
   * @owner Observable
   */
  export function bufferTime<T>(bufferTimeSpan: number, bufferCreationInterval?: number, scheduler?: Scheduler): Observable<T[]>;
  export interface BufferTimeSignature<T> {
    (bufferTimeSpan: number, bufferCreationInterval?: number, scheduler?: Scheduler): Observable<T[]>;
  }
}
declare module "rxjs/add/operator/bufferTime" {
  import { BufferTimeSignature } from "rxjs/operator/bufferTime";
  module "rxjs/Observable" {
    interface Observable<T> {
      bufferTime: BufferTimeSignature<T>;
    }
  }
}
declare module "rxjs/operator/bufferToggle" {
  import { Observable } from "rxjs/Observable";
  /**
   * Buffers values from the source by opening the buffer via signals from an
   * Observable provided to `openings`, and closing and sending the buffers when
   * an Observable returned by the `closingSelector` emits.
   *
   * <img src="./img/bufferToggle.png" width="100%">
   *
   * @param {Observable<O>} openings An observable of notifications to start new
   * buffers.
   * @param {Function} closingSelector a function that takes the value emitted by
   * the `openings` observable and returns an Observable, which, when it emits,
   * signals that the associated buffer should be emitted and cleared.
   * @return {Observable<T[]>} an observable of arrays of buffered values.
   * @method bufferToggle
   * @owner Observable
   */
  export function bufferToggle<T, O>(openings: Observable<O>, closingSelector: (value: O) => Observable<any>): Observable<T[]>;
  export interface BufferToggleSignature<T> {
    <O>(openings: Observable<O>, closingSelector: (value: O) => Observable<any>): Observable<T[]>;
  }
}
declare module "rxjs/add/operator/bufferToggle" {
  import { BufferToggleSignature } from "rxjs/operator/bufferToggle";
  module "rxjs/Observable" {
    interface Observable<T> {
      bufferToggle: BufferToggleSignature<T>;
    }
  }
}
declare module "rxjs/operator/bufferWhen" {
  import { Observable } from "rxjs/Observable";
  /**
   * Opens a buffer immediately, then closes the buffer when the observable
   * returned by calling `closingSelector` emits a value. It that immediately
   * opens a new buffer and repeats the process.
   *
   * <img src="./img/bufferWhen.png" width="100%">
   *
   * @param {function} closingSelector a function that takes no arguments and
   * returns an Observable that signals buffer closure.
   * @return {Observable<T[]>} an observable of arrays of buffered values.
   * @method bufferWhen
   * @owner Observable
   */
  export function bufferWhen<T>(closingSelector: () => Observable<any>): Observable<T[]>;
  export interface BufferWhenSignature<T> {
    (closingSelector: () => Observable<any>): Observable<T[]>;
  }
}
declare module "rxjs/add/operator/bufferWhen" {
  import { BufferWhenSignature } from "rxjs/operator/bufferWhen";
  module "rxjs/Observable" {
    interface Observable<T> {
      bufferWhen: BufferWhenSignature<T>;
    }
  }
}
declare module "rxjs/scheduler/queue" {
  import { QueueScheduler } from "rxjs/scheduler/QueueScheduler";
  export const queue: QueueScheduler;
}
declare module "rxjs/subject/ReplaySubject" {
  import { Subject } from "rxjs/Subject";
  import { Scheduler } from "rxjs/Scheduler";
  import { Subscriber } from "rxjs/Subscriber";
  import { Subscription } from "rxjs/Subscription";
  export class ReplaySubject<T> extends Subject<T> {
    private events;
    private scheduler;
    private bufferSize;
    private _windowTime;
    constructor(bufferSize?: number, windowTime?: number, scheduler?: Scheduler);
    protected _next(value: T): void;
    protected _subscribe(subscriber: Subscriber<T>): Subscription | Function | void;
    private _getNow();
    private _trimBufferThenGetEvents(now);
  }
}
declare module "rxjs/observable/ConnectableObservable" {
  import { Subject } from "rxjs/Subject";
  import { Observable } from "rxjs/Observable";
  import { Subscriber } from "rxjs/Subscriber";
  import { Subscription } from "rxjs/Subscription";
  export class ConnectableObservable<T> extends Observable<T> {
    protected source: Observable<T>;
    protected subjectFactory: () => Subject<T>;
    protected subject: Subject<T>;
    protected subscription: Subscription;
    constructor(source: Observable<T>, subjectFactory: () => Subject<T>);
    protected _subscribe(subscriber: Subscriber<T>): Subscription;
    protected getSubject(): Subject<T>;
    connect(): Subscription;
    refCount(): Observable<T>;
    /**
     * This method is opened for `ConnectableSubscription`.
     * Not to call from others.
     */
    _closeSubscription(): void;
  }
}
declare module "rxjs/operator/multicast" {
  import { Subject } from "rxjs/Subject";
  import { ConnectableObservable } from "rxjs/observable/ConnectableObservable";
  /**
   * Returns an Observable that emits the results of invoking a specified selector on items
   * emitted by a ConnectableObservable that shares a single subscription to the underlying stream.
   *
   * <img src="./img/multicast.png" width="100%">
   *
   * @param {Function} selector - a function that can use the multicasted source stream
   * as many times as needed, without causing multiple subscriptions to the source stream.
   * Subscribers to the given source will receive all notifications of the source from the
   * time of the subscription forward.
   * @return {Observable} an Observable that emits the results of invoking the selector
   * on the items emitted by a `ConnectableObservable` that shares a single subscription to
   * the underlying stream.
   * @method multicast
   * @owner Observable
   */
  export function multicast<T>(subjectOrSubjectFactory: Subject<T> | (() => Subject<T>)): ConnectableObservable<T>;
  export type factoryOrValue<T> = T | (() => T);
  export interface MulticastSignature<T> {
    (subjectOrSubjectFactory: factoryOrValue<Subject<T>>): ConnectableObservable<T>;
  }
}
declare module "rxjs/operator/publishReplay" {
  import { Scheduler } from "rxjs/Scheduler";
  import { ConnectableObservable } from "rxjs/observable/ConnectableObservable";
  /**
   * @param bufferSize
   * @param windowTime
   * @param scheduler
   * @return {ConnectableObservable<T>}
   * @method publishReplay
   * @owner Observable
   */
  export function publishReplay<T>(bufferSize?: number, windowTime?: number, scheduler?: Scheduler): ConnectableObservable<T>;
  export interface PublishReplaySignature<T> {
    (bufferSize?: number, windowTime?: number, scheduler?: Scheduler): ConnectableObservable<T>;
  }
}
declare module "rxjs/operator/cache" {
  import { Observable } from "rxjs/Observable";
  import { Scheduler } from "rxjs/Scheduler";
  /**
   * @param bufferSize
   * @param windowTime
   * @param scheduler
   * @return {Observable<any>}
   * @method cache
   * @owner Observable
   */
  export function cache<T>(bufferSize?: number, windowTime?: number, scheduler?: Scheduler): Observable<T>;
  export interface CacheSignature<T> {
    (bufferSize?: number, windowTime?: number, scheduler?: Scheduler): Observable<T>;
  }
}
declare module "rxjs/add/operator/cache" {
  import { CacheSignature } from "rxjs/operator/cache";
  module "rxjs/Observable" {
    interface Observable<T> {
      cache: CacheSignature<T>;
    }
  }
}
declare module "rxjs/operator/catch" {
  import { Observable } from "rxjs/Observable";
  /**
   * Catches errors on the observable to be handled by returning a new observable or throwing an error.
   * @param {function} selector a function that takes as arguments `err`, which is the error, and `caught`, which
   *  is the source observable, in case you'd like to "retry" that observable by returning it again. Whatever observable
   *  is returned by the `selector` will be used to continue the observable chain.
   * @return {Observable} an observable that originates from either the source or the observable returned by the
   *  catch `selector` function.
   * @method catch
   * @owner Observable
   */
  export function _catch<T, R>(selector: (err: any, caught: Observable<T>) => Observable<R>): Observable<R>;
  export interface CatchSignature<T> {
    <R>(selector: (err: any, caught: Observable<T>) => Observable<R>): Observable<R>;
  }
}
declare module "rxjs/add/operator/catch" {
  import { CatchSignature } from "rxjs/operator/catch";
  module "rxjs/Observable" {
    interface Observable<T> {
      catch: CatchSignature<T>;
    }
  }
}
declare module "rxjs/operator/combineAll" {
  import { Observable } from "rxjs/Observable";
  /**
   * Takes an Observable of Observables, and collects all observables from it. Once the outer observable
   * completes, it subscribes to all collected observables and "combines" their values, such that:
   *  - every time an observable emits, the returned observable emits
   *  - when the returned observable emits, it emits all of the most recent values by:
   *    - if a `project` function is provided, it is called with each recent value from each observable in whatever order they arrived,
   *      and the result of the `project` function is what is emitted by the returned observable
   *    - if there is no `project` function, an array of all of the most recent values is emitted by the returned observable.
   * @param {function} [project] an optional function to map the most recent values from each observable into a new result. Takes each of the
   *   most recent values from each collected observable as arguments, in order.
   * @return {Observable} an observable of projected results or arrays of recent values.
   * @method combineAll
   * @owner Observable
   */
  export function combineAll<R>(project?: (...values: Array<any>) => R): Observable<R>;
  export interface CombineAllSignature<T> {
    (): Observable<T[]>;
    <R>(project?: (...values: Array<T>) => R): Observable<R>;
  }
}
declare module "rxjs/add/operator/combineAll" {
  import { CombineAllSignature } from "rxjs/operator/combineAll";
  module "rxjs/Observable" {
    interface Observable<T> {
      combineAll: CombineAllSignature<T>;
    }
  }
}
declare module "rxjs/add/operator/combineLatest" {
  import { CombineLatestSignature } from "rxjs/operator/combineLatest";
  module "rxjs/Observable" {
    interface Observable<T> {
      combineLatest: CombineLatestSignature<T>;
    }
  }
}
declare module "rxjs/add/operator/concat" {
  import { ConcatSignature } from "rxjs/operator/concat";
  module "rxjs/Observable" {
    interface Observable<T> {
      concat: ConcatSignature<T>;
    }
  }
}
declare module "rxjs/operator/concatAll" {
  /**
   * Joins every Observable emitted by the source (an Observable of Observables), in a serial
   * fashion. Subscribing to each one only when the previous one has completed, and merging
   * all of their values into the returned observable.
   *
   * __Warning:__ If the source Observable emits Observables quickly and endlessly, and the
   * Observables it emits generally complete slower than the source emits, you can run into
   * memory issues as the incoming observables collect in an unbounded buffer.
   *
   * @return {Observable} an observable of values merged from the incoming observables.
   * @method concatAll
   * @owner Observable
   */
  export function concatAll<T>(): T;
  export interface ConcatAllSignature<T> {
    (): T;
  }
}
declare module "rxjs/add/operator/concatAll" {
  import { ConcatAllSignature } from "rxjs/operator/concatAll";
  module "rxjs/Observable" {
    interface Observable<T> {
      concatAll: ConcatAllSignature<T>;
    }
  }
}
declare module "rxjs/operator/mergeMap" {
  import { Observable, ObservableInput } from "rxjs/Observable";
  import { Operator } from "rxjs/Operator";
  import { Subscriber } from "rxjs/Subscriber";
  import { Subscription } from "rxjs/Subscription";
  import { OuterSubscriber } from "rxjs/OuterSubscriber";
  import { InnerSubscriber } from "rxjs/InnerSubscriber";
  /**
   * Returns an Observable that emits items based on applying a function that you supply to each item emitted by the
   * source Observable, where that function returns an Observable, and then merging those resulting Observables and
   * emitting the results of this merger.
   *
   * <img src="./img/mergeMap.png" width="100%">
   *
   * @param {Function} a function that, when applied to an item emitted by the source Observable, returns an Observable.
   * @return {Observable} an Observable that emits the result of applying the transformation function to each item
   * emitted by the source Observable and merging the results of the Observables obtained from this transformation
   * @method mergeMap
   * @owner Observable
   */
  export function mergeMap<T, I, R>(project: (value: T, index: number) => ObservableInput<I>, resultSelector?: (outerValue: T, innerValue: I, outerIndex: number, innerIndex: number) => R | number, concurrent?: number): Observable<R>;
  export interface MergeMapSignature<T> {
    <R>(project: (value: T, index: number) => ObservableInput<R>, concurrent?: number): Observable<R>;
    <I, R>(project: (value: T, index: number) => ObservableInput<I>, resultSelector: (outerValue: T, innerValue: I, outerIndex: number, innerIndex: number) => R, concurrent?: number): Observable<R>;
  }
  export class MergeMapOperator<T, I, R> implements Operator<T, I> {
    private project;
    private resultSelector;
    private concurrent;
    constructor(project: (value: T, index: number) => ObservableInput<I>, resultSelector?: (outerValue: T, innerValue: I, outerIndex: number, innerIndex: number) => R, concurrent?: number);
    call(observer: Subscriber<I>): Subscriber<T>;
  }
  export class MergeMapSubscriber<T, I, R> extends OuterSubscriber<T, I> {
    private project;
    private resultSelector;
    private concurrent;
    private hasCompleted;
    private buffer;
    private active;
    protected index: number;
    constructor(destination: Subscriber<I>, project: (value: T, index: number) => ObservableInput<I>, resultSelector?: (outerValue: T, innerValue: I, outerIndex: number, innerIndex: number) => R, concurrent?: number);
    protected _next(value: any): void;
    protected _tryNext(value: any): void;
    private _innerSub(ish, value, index);
    protected _complete(): void;
    notifyNext(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number, innerSub: InnerSubscriber<T, I>): void;
    _notifyResultSelector(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): void;
    notifyComplete(innerSub: Subscription): void;
  }
}
declare module "rxjs/operator/concatMap" {
  import { Observable, ObservableInput } from "rxjs/Observable";
  /**
   * Maps values from the source observable into new Observables, then merges them in a serialized fashion,
   * waiting for each one to complete before merging the next.
   *
   * __Warning:__ if incoming values arrive endlessly and faster than the observables they're being mapped
   * to can complete, it will result in memory issues as created observables amass in an unbounded buffer
   * waiting for their turn to be subscribed to.
   *
   * @param {function} project a function to map incoming values into Observables to be concatenated. accepts
   * the `value` and the `index` as arguments.
   * @param {function} [resultSelector] an optional result selector that is applied to values before they're
   * merged into the returned observable. The arguments passed to this function are:
   * - `outerValue`: the value that came from the source
   * - `innerValue`: the value that came from the projected Observable
   * - `outerIndex`: the "index" of the value that came from the source
   * - `innerIndex`: the "index" of the value from the projected Observable
   * @return {Observable} an observable of values merged from the projected Observables as they were subscribed to,
   * one at a time. Optionally, these values may have been projected from a passed `projectResult` argument.
   * @method concatMap
   * @owner Observable
   */
  export function concatMap<T, I, R>(project: (value: T, index: number) => ObservableInput<I>, resultSelector?: (outerValue: T, innerValue: I, outerIndex: number, innerIndex: number) => R): any;
  export interface ConcatMapSignature<T> {
    <R>(project: (value: T, index: number) => ObservableInput<R>): Observable<R>;
    <I, R>(project: (value: T, index: number) => ObservableInput<I>, resultSelector: (outerValue: T, innerValue: I, outerIndex: number, innerIndex: number) => R): Observable<R>;
  }
}
declare module "rxjs/add/operator/concatMap" {
  import { ConcatMapSignature } from "rxjs/operator/concatMap";
  module "rxjs/Observable" {
    interface Observable<T> {
      concatMap: ConcatMapSignature<T>;
    }
  }
}
declare module "rxjs/operator/mergeMapTo" {
  import { Observable, ObservableInput, ObservableOrPromise } from "rxjs/Observable";
  import { Operator } from "rxjs/Operator";
  import { Subscriber } from "rxjs/Subscriber";
  import { Subscription } from "rxjs/Subscription";
  import { OuterSubscriber } from "rxjs/OuterSubscriber";
  import { InnerSubscriber } from "rxjs/InnerSubscriber";
  /**
   * @param observable
   * @param resultSelector
   * @param concurrent
   * @return {Observable<R>|WebSocketSubject<*>|Observable<*>}
   * @method mergeMapTo
   * @owner Observable
   */
  export function mergeMapTo<T, I, R>(observable: Observable<I>, resultSelector?: (outerValue: T, innerValue: I, outerIndex: number, innerIndex: number) => R | number, concurrent?: number): Observable<R>;
  export interface MergeMapToSignature<T> {
    <R>(observable: ObservableInput<R>, concurrent?: number): Observable<R>;
    <I, R>(observable: ObservableInput<I>, resultSelector: (outerValue: T, innerValue: I, outerIndex: number, innerIndex: number) => R, concurrent?: number): Observable<R>;
  }
  export class MergeMapToOperator<T, I, R> implements Operator<Observable<T>, R> {
    private ish;
    private resultSelector;
    private concurrent;
    constructor(ish: ObservableOrPromise<I>, resultSelector?: (outerValue: T, innerValue: I, outerIndex: number, innerIndex: number) => R, concurrent?: number);
    call(observer: Subscriber<R>): Subscriber<any>;
  }
  export class MergeMapToSubscriber<T, I, R> extends OuterSubscriber<T, I> {
    private ish;
    private resultSelector;
    private concurrent;
    private hasCompleted;
    private buffer;
    private active;
    protected index: number;
    constructor(destination: Subscriber<R>, ish: ObservableOrPromise<I>, resultSelector?: (outerValue: T, innerValue: I, outerIndex: number, innerIndex: number) => R, concurrent?: number);
    protected _next(value: any): void;
    private _innerSub(ish, destination, resultSelector, value, index);
    protected _complete(): void;
    notifyNext(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number, innerSub: InnerSubscriber<T, I>): void;
    private trySelectResult(outerValue, innerValue, outerIndex, innerIndex);
    notifyError(err: any): void;
    notifyComplete(innerSub: Subscription): void;
  }
}
declare module "rxjs/operator/concatMapTo" {
  import { Observable, ObservableInput } from "rxjs/Observable";
  /**
   * Maps values from the source to a specific observable, and merges them together in a serialized fashion.
   *
   * @param {Observable} observable the observable to map each source value to
   * @param {function} [resultSelector] an optional result selector that is applied to values before they're
   * merged into the returned observable. The arguments passed to this function are:
   * - `outerValue`: the value that came from the source
   * - `innerValue`: the value that came from the projected Observable
   * - `outerIndex`: the "index" of the value that came from the source
   * - `innerIndex`: the "index" of the value from the projected Observable
   * @return {Observable} an observable of values merged together by joining the passed observable
   * with itself, one after the other, for each value emitted from the source.
   * @method concatMapTo
   * @owner Observable
   */
  export function concatMapTo<T, I, R>(observable: Observable<I>, resultSelector?: (outerValue: T, innerValue: I, outerIndex: number, innerIndex: number) => R): Observable<R>;
  export interface ConcatMapToSignature<T> {
    <R>(observable: ObservableInput<R>): Observable<R>;
    <I, R>(observable: ObservableInput<I>, resultSelector: (outerValue: T, innerValue: I, outerIndex: number, innerIndex: number) => R): Observable<R>;
  }
}
declare module "rxjs/add/operator/concatMapTo" {
  import { ConcatMapToSignature } from "rxjs/operator/concatMapTo";
  module "rxjs/Observable" {
    interface Observable<T> {
      concatMapTo: ConcatMapToSignature<T>;
    }
  }
}
declare module "rxjs/operator/count" {
  import { Observable } from "rxjs/Observable";
  /**
   * Returns an observable of a single number that represents the number of items that either:
   * Match a provided predicate function, _or_ if a predicate is not provided, the number
   * represents the total count of all items in the source observable. The count is emitted
   * by the returned observable when the source observable completes.
   * @param {function} [predicate] a boolean function to select what values are to be counted.
   * it is provided with arguments of:
   *   - `value`: the value from the source observable
   *   - `index`: the "index" of the value from the source observable
   *   - `source`: the source observable instance itself.
   * @return {Observable} an observable of one number that represents the count as described
   * above
   * @method count
   * @owner Observable
   */
  export function count<T>(predicate?: (value: T, index: number, source: Observable<T>) => boolean): Observable<number>;
  export interface CountSignature<T> {
    (predicate?: (value: T, index: number, source: Observable<T>) => boolean): Observable<number>;
  }
}
declare module "rxjs/add/operator/count" {
  import { CountSignature } from "rxjs/operator/count";
  module "rxjs/Observable" {
    interface Observable<T> {
      count: CountSignature<T>;
    }
  }
}
declare module "rxjs/operator/dematerialize" {
  import { Observable } from "rxjs/Observable";
  /**
   * Returns an Observable that transforms Notification objects into the items or notifications they represent.
   * @return {Observable} an Observable that emits items and notifications embedded in Notification objects emitted by the source Observable.
   * @method dematerialize
   * @owner Observable
   */
  export function dematerialize<T>(): Observable<any>;
  export interface DematerializeSignature<T> {
    <R>(): Observable<R>;
  }
}
declare module "rxjs/add/operator/dematerialize" {
  import { DematerializeSignature } from "rxjs/operator/dematerialize";
  module "rxjs/Observable" {
    interface Observable<T> {
      dematerialize: DematerializeSignature<T>;
    }
  }
}
declare module "rxjs/operator/debounce" {
  import { Observable, ObservableOrPromise } from "rxjs/Observable";
  /**
   * Returns the source Observable delayed by the computed debounce duration,
   * with the duration lengthened if a new source item arrives before the delay
   * duration ends.
   * In practice, for each item emitted on the source, this operator holds the
   * latest item, waits for a silence as long as the `durationSelector` specifies,
   * and only then emits the latest source item on the result Observable.
   * @param {function} durationSelector function for computing the timeout duration for each item.
   * @return {Observable} an Observable the same as source Observable, but drops items.
   * @method debounce
   * @owner Observable
   */
  export function debounce<T>(durationSelector: (value: T) => ObservableOrPromise<number>): Observable<T>;
  export interface DebounceSignature<T> {
    (durationSelector: (value: T) => ObservableOrPromise<number>): Observable<T>;
  }
}
declare module "rxjs/add/operator/debounce" {
  import { DebounceSignature } from "rxjs/operator/debounce";
  module "rxjs/Observable" {
    interface Observable<T> {
      debounce: DebounceSignature<T>;
    }
  }
}
declare module "rxjs/operator/debounceTime" {
  import { Observable } from "rxjs/Observable";
  import { Scheduler } from "rxjs/Scheduler";
  /**
   * Returns the source Observable delayed by the computed debounce duration,
   * with the duration lengthened if a new source item arrives before the delay
   * duration ends.
   * In practice, for each item emitted on the source, this operator holds the
   * latest item, waits for a silence for the `dueTime` length, and only then
   * emits the latest source item on the result Observable.
   * Optionally takes a scheduler for manging timers.
   * @param {number} dueTime the timeout value for the window of time required to not drop the item.
   * @param {Scheduler} [scheduler] the Scheduler to use for managing the timers that handle the timeout for each item.
   * @return {Observable} an Observable the same as source Observable, but drops items.
   * @method debounceTime
   * @owner Observable
   */
  export function debounceTime<T>(dueTime: number, scheduler?: Scheduler): Observable<T>;
  export interface DebounceTimeSignature<T> {
    (dueTime: number, scheduler?: Scheduler): Observable<T>;
  }
}
declare module "rxjs/add/operator/debounceTime" {
  import { DebounceTimeSignature } from "rxjs/operator/debounceTime";
  module "rxjs/Observable" {
    interface Observable<T> {
      debounceTime: DebounceTimeSignature<T>;
    }
  }
}
declare module "rxjs/operator/defaultIfEmpty" {
  import { Observable } from "rxjs/Observable";
  /**
   * Returns an Observable that emits the elements of the source or a specified default value if empty.
   * @param {any} defaultValue the default value used if source is empty; defaults to null.
   * @return {Observable} an Observable of the items emitted by the where empty values are replaced by the specified default value or null.
   * @method defaultIfEmpty
   * @owner Observable
   */
  export function defaultIfEmpty<T, R>(defaultValue?: R): Observable<T | R>;
  export interface DefaultIfEmptySignature<T> {
    (defaultValue?: T): Observable<T>;
    <R>(defaultValue?: R): Observable<T | R>;
  }
}
declare module "rxjs/add/operator/defaultIfEmpty" {
  import { DefaultIfEmptySignature } from "rxjs/operator/defaultIfEmpty";
  module "rxjs/Observable" {
    interface Observable<T> {
      defaultIfEmpty: DefaultIfEmptySignature<T>;
    }
  }
}
declare module "rxjs/operator/delay" {
  import { Scheduler } from "rxjs/Scheduler";
  import { Observable } from "rxjs/Observable";
  /**
   * Returns an Observable that delays the emission of items from the source Observable
   * by a given timeout or until a given Date.
   * @param {number|Date} delay the timeout value or date until which the emission of the source items is delayed.
   * @param {Scheduler} [scheduler] the Scheduler to use for managing the timers that handle the timeout for each item.
   * @return {Observable} an Observable that delays the emissions of the source Observable by the specified timeout or Date.
   * @method delay
   * @owner Observable
   */
  export function delay<T>(delay: number | Date, scheduler?: Scheduler): Observable<T>;
  export interface DelaySignature<T> {
    (delay: number | Date, scheduler?: Scheduler): Observable<T>;
  }
}
declare module "rxjs/add/operator/delay" {
  import { DelaySignature } from "rxjs/operator/delay";
  module "rxjs/Observable" {
    interface Observable<T> {
      delay: DelaySignature<T>;
    }
  }
}
declare module "rxjs/operator/delayWhen" {
  import { Observable } from "rxjs/Observable";
  /**
   * Returns an Observable that delays the emission of items from the source Observable
   * by a subscription delay and a delay selector function for each element.
   * @param {Function} selector function to retrieve a sequence indicating the delay for each given element.
   * @param {Observable} sequence indicating the delay for the subscription to the source.
   * @return {Observable} an Observable that delays the emissions of the source Observable by the specified timeout or Date.
   * @method delayWhen
   * @owner Observable
   */
  export function delayWhen<T>(delayDurationSelector: (value: T) => Observable<any>, subscriptionDelay?: Observable<any>): Observable<T>;
  export interface DelayWhenSignature<T> {
    (delayDurationSelector: (value: T) => Observable<any>, subscriptionDelay?: Observable<any>): Observable<T>;
  }
}
declare module "rxjs/add/operator/delayWhen" {
  import { DelayWhenSignature } from "rxjs/operator/delayWhen";
  module "rxjs/Observable" {
    interface Observable<T> {
      delayWhen: DelayWhenSignature<T>;
    }
  }
}
declare module "rxjs/operator/distinctUntilChanged" {
  import { Observable } from "rxjs/Observable";
  /**
   * Returns an Observable that emits all items emitted by the source Observable that are distinct by comparison from the previous item.
   * If a comparator function is provided, then it will be called for each item to test for whether or not that value should be emitted.
   * If a comparator function is not provided, an equality check is used by default.
   * @param {function} [compare] optional comparison function called to test if an item is distinct from the previous item in the source.
   * @return {Observable} an Observable that emits items from the source Observable with distinct values.
   * @method distinctUntilChanged
   * @owner Observable
   */
  export function distinctUntilChanged<T, K>(compare?: (x: K, y: K) => boolean, keySelector?: (x: T) => K): Observable<T>;
  export interface DistinctUntilChangedSignature<T> {
    (compare?: (x: T, y: T) => boolean): Observable<T>;
    <K>(compare: (x: K, y: K) => boolean, keySelector: (x: T) => K): Observable<T>;
  }
}
declare module "rxjs/add/operator/distinctUntilChanged" {
  import { DistinctUntilChangedSignature } from "rxjs/operator/distinctUntilChanged";
  module "rxjs/Observable" {
    interface Observable<T> {
      distinctUntilChanged: DistinctUntilChangedSignature<T>;
    }
  }
}
declare module "rxjs/operator/do" {
  import { Observable } from "rxjs/Observable";
  import { PartialObserver } from "rxjs/Observer";
  /**
   * Returns a mirrored Observable of the source Observable, but modified so that the provided Observer is called
   * for every item emitted by the source.
   * This operator is useful for debugging your observables for the correct values or performing other side effects.
   * @param {Observer|function} [nextOrObserver] a normal observer callback or callback for onNext.
   * @param {function} [error] callback for errors in the source.
   * @param {function} [complete] callback for the completion of the source.
   * @reurns {Observable} a mirrored Observable with the specified Observer or callback attached for each item.
   * @method do
   * @owner Observable
   */
  export function _do<T>(nextOrObserver?: PartialObserver<T> | ((x: T) => void), error?: (e: any) => void, complete?: () => void): Observable<T>;
  export interface DoSignature<T> {
    (next: (x: T) => void, error?: (e: any) => void, complete?: () => void): Observable<T>;
    (observer: PartialObserver<T>): Observable<T>;
  }
}
declare module "rxjs/add/operator/do" {
  import { DoSignature } from "rxjs/operator/do";
  module "rxjs/Observable" {
    interface Observable<T> {
      do: DoSignature<T>;
    }
  }
}
declare module "rxjs/operator/expand" {
  import { Observable } from "rxjs/Observable";
  import { Scheduler } from "rxjs/Scheduler";
  import { Operator } from "rxjs/Operator";
  import { Subscriber } from "rxjs/Subscriber";
  import { Subscription } from "rxjs/Subscription";
  import { OuterSubscriber } from "rxjs/OuterSubscriber";
  import { InnerSubscriber } from "rxjs/InnerSubscriber";
  /**
   * Returns an Observable where for each item in the source Observable, the supplied function is applied to each item,
   * resulting in a new value to then be applied again with the function.
   * @param {function} project the function for projecting the next emitted item of the Observable.
   * @param {number} [concurrent] the max number of observables that can be created concurrently. defaults to infinity.
   * @param {Scheduler} [scheduler] The Scheduler to use for managing the expansions.
   * @return {Observable} an Observable containing the expansions of the source Observable.
   * @method expand
   * @owner Observable
   */
  export function expand<T, R>(project: (value: T, index: number) => Observable<R>, concurrent?: number, scheduler?: Scheduler): Observable<R>;
  export interface ExpandSignature<T> {
    (project: (value: T, index: number) => Observable<T>, concurrent?: number, scheduler?: Scheduler): Observable<T>;
    <R>(project: (value: T, index: number) => Observable<R>, concurrent?: number, scheduler?: Scheduler): Observable<R>;
  }
  export class ExpandOperator<T, R> implements Operator<T, R> {
    private project;
    private concurrent;
    private scheduler;
    constructor(project: (value: T, index: number) => Observable<R>, concurrent: number, scheduler: Scheduler);
    call(subscriber: Subscriber<R>): Subscriber<T>;
  }
  export class ExpandSubscriber<T, R> extends OuterSubscriber<T, R> {
    private project;
    private concurrent;
    private scheduler;
    private index;
    private active;
    private hasCompleted;
    private buffer;
    constructor(destination: Subscriber<R>, project: (value: T, index: number) => Observable<R>, concurrent: number, scheduler: Scheduler);
    private static dispatch({subscriber, result, value, index});
    protected _next(value: any): void;
    private subscribeToProjection(result, value, index);
    protected _complete(): void;
    notifyNext(outerValue: T, innerValue: R, outerIndex: number, innerIndex: number, innerSub: InnerSubscriber<T, R>): void;
    notifyComplete(innerSub: Subscription): void;
  }
}
declare module "rxjs/add/operator/expand" {
  import { ExpandSignature } from "rxjs/operator/expand";
  module "rxjs/Observable" {
    interface Observable<T> {
      expand: ExpandSignature<T>;
    }
  }
}
declare module "rxjs/operator/filter" {
  import { Observable } from "rxjs/Observable";
  /**
   * Similar to the well-known `Array.prototype.filter` method, this operator filters values down to a set
   * allowed by a `select` function
   *
   * @param {Function} select a function that is used to select the resulting values
   *  if it returns `true`, the value is emitted, if `false` the value is not passed to the resulting observable
   * @param {any} [thisArg] an optional argument to determine the value of `this` in the `select` function
   * @return {Observable} an observable of values allowed by the select function
   * @method filter
   * @owner Observable
   */
  export function filter<T>(select: (value: T, index: number) => boolean, thisArg?: any): Observable<T>;
  export interface FilterSignature<T> {
    (select: (value: T, index: number) => boolean, thisArg?: any): Observable<T>;
  }
}
declare module "rxjs/add/operator/filter" {
  import { FilterSignature } from "rxjs/operator/filter";
  module "rxjs/Observable" {
    interface Observable<T> {
      filter: FilterSignature<T>;
    }
  }
}
declare module "rxjs/operator/finally" {
  import { Observable } from "rxjs/Observable";
  /**
   * Returns an Observable that mirrors the source Observable, but will call a specified function when
   * the source terminates on complete or error.
   * @param {function} finallySelector function to be called when source terminates.
   * @return {Observable} an Observable that mirrors the source, but will call the specified function on termination.
   * @method finally
   * @owner Observable
   */
  export function _finally<T>(finallySelector: () => void): Observable<T>;
  export interface FinallySignature<T> {
    <T>(finallySelector: () => void): Observable<T>;
  }
}
declare module "rxjs/add/operator/finally" {
  import { FinallySignature } from "rxjs/operator/finally";
  module "rxjs/Observable" {
    interface Observable<T> {
      finally: FinallySignature<T>;
    }
  }
}
declare module "rxjs/util/EmptyError" {
  export class EmptyError extends Error {
    constructor();
  }
}
declare module "rxjs/operator/first" {
  import { Observable } from "rxjs/Observable";
  /**
   * Returns an Observable that emits the first item of the source Observable that matches the specified condition.
   * Throws an error if matching element is not found.
   * @param {function} predicate function called with each item to test for condition matching.
   * @return {Observable} an Observable of the first item that matches the condition.
   * @method first
   * @owner Observable
   */
  export function first<T, R>(predicate?: (value: T, index: number, source: Observable<T>) => boolean, resultSelector?: (value: T, index: number) => R, defaultValue?: R): Observable<T | R>;
  export interface FirstSignature<T> {
    (predicate?: (value: T, index: number, source: Observable<T>) => boolean): Observable<T>;
    (predicate: (value: T, index: number, source: Observable<T>) => boolean, resultSelector: void, defaultValue?: T): Observable<T>;
    <R>(predicate?: (value: T, index: number, source: Observable<T>) => boolean, resultSelector?: (value: T, index: number) => R, defaultValue?: R): Observable<R>;
  }
}
declare module "rxjs/add/operator/first" {
  import { FirstSignature } from "rxjs/operator/first";
  module "rxjs/Observable" {
    interface Observable<T> {
      first: FirstSignature<T>;
    }
  }
}
declare module "rxjs/util/MapPolyfill" {
  export class MapPolyfill {
    size: number;
    private _values;
    private _keys;
    get(key: any): any;
    set(key: any, value: any): this;
    delete(key: any): boolean;
    clear(): void;
    forEach(cb: Function, thisArg: any): void;
  }
}
declare module "rxjs/util/Map" {
  export const Map: any;
}
declare module "rxjs/util/FastMap" {
  export class FastMap {
    private values;
    delete(key: string): boolean;
    set(key: string, value: any): FastMap;
    get(key: string): any;
    forEach(cb: (value: any, key: any) => void, thisArg?: any): void;
    clear(): void;
  }
}
declare module "rxjs/operator/groupBy" {
  import { Subscriber } from "rxjs/Subscriber";
  import { Subscription } from "rxjs/Subscription";
  import { Observable } from "rxjs/Observable";
  import { Subject } from "rxjs/Subject";
  /**
   * Groups the items emitted by an Observable according to a specified criterion,
   * and emits these grouped items as `GroupedObservables`, one `GroupedObservable` per group.
   *
   * <img src="./img/groupBy.png" width="100%">
   *
   * @param {Function} keySelector - a function that extracts the key for each item
   * @param {Function} elementSelector - a function that extracts the return element for each item
   * @return {Observable} an Observable that emits GroupedObservables, each of which corresponds
   * to a unique key value and each of which emits those items from the source Observable that share
   * that key value.
   * @method groupBy
   * @owner Observable
   */
  export function groupBy<T, K, R>(keySelector: (value: T) => K, elementSelector?: (value: T) => R, durationSelector?: (grouped: GroupedObservable<K, R>) => Observable<any>): Observable<GroupedObservable<K, R>>;
  export interface GroupBySignature<T> {
    <K>(keySelector: (value: T) => K): Observable<GroupedObservable<K, T>>;
    <K>(keySelector: (value: T) => K, elementSelector: void, durationSelector: (grouped: GroupedObservable<K, T>) => Observable<any>): Observable<GroupedObservable<K, T>>;
    <K, R>(keySelector: (value: T) => K, elementSelector?: (value: T) => R, durationSelector?: (grouped: GroupedObservable<K, R>) => Observable<any>): Observable<GroupedObservable<K, R>>;
  }
  export interface RefCountSubscription {
    count: number;
    unsubscribe: () => void;
    isUnsubscribed: boolean;
    attemptedToUnsubscribe: boolean;
  }
  export class GroupedObservable<K, T> extends Observable<T> {
    key: K;
    private groupSubject;
    private refCountSubscription;
    constructor(key: K, groupSubject: Subject<T>, refCountSubscription?: RefCountSubscription);
    protected _subscribe(subscriber: Subscriber<T>): Subscription;
  }
}
declare module "rxjs/add/operator/groupBy" {
  import { GroupBySignature } from "rxjs/operator/groupBy";
  module "rxjs/Observable" {
    interface Observable<T> {
      groupBy: GroupBySignature<T>;
    }
  }
}
declare module "rxjs/operator/ignoreElements" {
  import { Observable } from "rxjs/Observable";
  /**
   * Ignores all items emitted by the source Observable and only passes calls of `complete` or `error`.
   *
   * <img src="./img/ignoreElements.png" width="100%">
   *
   * @return {Observable} an empty Observable that only calls `complete`
   * or `error`, based on which one is called by the source Observable.
   * @method ignoreElements
   * @owner Observable
   */
  export function ignoreElements<T>(): Observable<T>;
  export interface IgnoreElementsSignature<T> {
    (): Observable<T>;
  }
}
declare module "rxjs/add/operator/ignoreElements" {
  import { IgnoreElementsSignature } from "rxjs/operator/ignoreElements";
  module "rxjs/Observable" {
    interface Observable<T> {
      ignoreElements: IgnoreElementsSignature<T>;
    }
  }
}
declare module "rxjs/operator/inspect" {
  import { Observable, ObservableOrPromise } from "rxjs/Observable";
  /**
   * @param durationSelector
   * @return {Observable<R>|WebSocketSubject<T>|Observable<T>}
   * @method inspect
   * @owner Observable
   */
  export function inspect<T>(durationSelector: (value: T) => ObservableOrPromise<any>): Observable<T>;
  export interface InspectSignature<T> {
    (durationSelector: (value: T) => ObservableOrPromise<any>): Observable<T>;
  }
}
declare module "rxjs/add/operator/inspect" {
  import { InspectSignature } from "rxjs/operator/inspect";
  module "rxjs/Observable" {
    interface Observable<T> {
      inspect: InspectSignature<T>;
    }
  }
}
declare module "rxjs/operator/inspectTime" {
  import { Scheduler } from "rxjs/Scheduler";
  import { Observable } from "rxjs/Observable";
  /**
   * @param delay
   * @param scheduler
   * @return {Observable<R>|WebSocketSubject<T>|Observable<T>}
   * @method inspectTime
   * @owner Observable
   */
  export function inspectTime<T>(delay: number, scheduler?: Scheduler): Observable<T>;
  export interface InspectTimeSignature<T> {
    (delay: number, scheduler?: Scheduler): Observable<T>;
  }
}
declare module "rxjs/add/operator/inspectTime" {
  import { InspectTimeSignature } from "rxjs/operator/inspectTime";
  module "rxjs/Observable" {
    interface Observable<T> {
      inspectTime: InspectTimeSignature<T>;
    }
  }
}
declare module "rxjs/operator/last" {
  import { Observable } from "rxjs/Observable";
  /**
   * Returns an Observable that emits only the last item emitted by the source Observable.
   * It optionally takes a predicate function as a parameter, in which case, rather than emitting
   * the last item from the source Observable, the resulting Observable will emit the last item
   * from the source Observable that satisfies the predicate.
   *
   * <img src="./img/last.png" width="100%">
   *
   * @param {function} predicate - the condition any source emitted item has to satisfy.
   * @return {Observable} an Observable that emits only the last item satisfying the given condition
   * from the source, or an NoSuchElementException if no such items are emitted.
   * @throws - Throws if no items that match the predicate are emitted by the source Observable.
   * @method last
   * @owner Observable
   */
  export function last<T, R>(predicate?: (value: T, index: number, source: Observable<T>) => boolean, resultSelector?: (value: T, index: number) => R | void, defaultValue?: R): Observable<T | R>;
  export interface LastSignature<T> {
    (predicate?: (value: T, index: number, source: Observable<T>) => boolean): Observable<T>;
    (predicate: (value: T, index: number, source: Observable<T>) => boolean, resultSelector: void, defaultValue?: T): Observable<T>;
    <R>(predicate?: (value: T, index: number, source: Observable<T>) => boolean, resultSelector?: (value: T, index: number) => R, defaultValue?: R): Observable<R>;
  }
}
declare module "rxjs/add/operator/last" {
  import { LastSignature } from "rxjs/operator/last";
  module "rxjs/Observable" {
    interface Observable<T> {
      last: LastSignature<T>;
    }
  }
}
declare module "rxjs/operator/let" {
  import { Observable } from "rxjs/Observable";
  /**
   * @param func
   * @return {Observable<R>}
   * @method let
   * @owner Observable
   */
  export function letProto<T, R>(func: (selector: Observable<T>) => Observable<R>): Observable<R>;
  export interface LetSignature<T> {
    <R>(func: (selector: Observable<T>) => Observable<R>): Observable<R>;
  }
}
declare module "rxjs/add/operator/let" {
  import { LetSignature } from "rxjs/operator/let";
  module "rxjs/Observable" {
    interface Observable<T> {
      let: LetSignature<T>;
      letBind: LetSignature<T>;
    }
  }
}
declare module "rxjs/operator/every" {
  import { Observable } from "rxjs/Observable";
  /**
   * Returns an Observable that emits whether or not every item of the source satisfies the condition specified.
   * @param {function} predicate a function for determining if an item meets a specified condition.
   * @param {any} [thisArg] optional object to use for `this` in the callback
   * @return {Observable} an Observable of booleans that determines if all items of the source Observable meet the condition specified.
   * @method every
   * @owner Observable
   */
  export function every<T>(predicate: (value: T, index: number, source: Observable<T>) => boolean, thisArg?: any): Observable<boolean>;
  export interface EverySignature<T> {
    (predicate: (value: T, index: number, source: Observable<T>) => boolean, thisArg?: any): Observable<boolean>;
  }
}
declare module "rxjs/add/operator/every" {
  import { EverySignature } from "rxjs/operator/every";
  module "rxjs/Observable" {
    interface Observable<T> {
      every: EverySignature<T>;
    }
  }
}
declare module "rxjs/operator/map" {
  import { Observable } from "rxjs/Observable";
  /**
   * Similar to the well known `Array.prototype.map` function, this operator
   * applies a projection to each value and emits that projection in the returned observable
   *
   * <img src="./img/map.png" width="100%">
   *
   * @param {Function} project the function to create projection
   * @param {any} [thisArg] an optional argument to define what `this` is in the project function
   * @return {Observable} a observable of projected values
   * @method map
   * @owner Observable
   */
  export function map<T, R>(project: (value: T, index: number) => R, thisArg?: any): Observable<R>;
  export interface MapSignature<T> {
    <R>(project: (value: T, index: number) => R, thisArg?: any): Observable<R>;
  }
}
declare module "rxjs/add/operator/map" {
  import { MapSignature } from "rxjs/operator/map";
  module "rxjs/Observable" {
    interface Observable<T> {
      map: MapSignature<T>;
    }
  }
}
declare module "rxjs/operator/mapTo" {
  import { Observable } from "rxjs/Observable";
  /**
   * Maps every value to the same value every time.
   *
   * <img src="./img/mapTo.png" width="100%">
   *
   * @param {any} value the value to map each incoming value to
   * @return {Observable} an observable of the passed value that emits every time the source does
   * @method mapTo
   * @owner Observable
   */
  export function mapTo<T, R>(value: R): Observable<R>;
  export interface MapToSignature<T> {
    <R>(value: R): Observable<R>;
  }
}
declare module "rxjs/add/operator/mapTo" {
  import { MapToSignature } from "rxjs/operator/mapTo";
  module "rxjs/Observable" {
    interface Observable<T> {
      mapTo: MapToSignature<T>;
    }
  }
}
declare module "rxjs/operator/materialize" {
  import { Observable } from "rxjs/Observable";
  import { Notification } from "rxjs/Notification";
  /**
   * Returns an Observable that represents all of the emissions and notifications
   * from the source Observable into emissions marked with their original types
   * within a `Notification` objects.
   *
   * <img src="./img/materialize.png" width="100%">
   *
   * @scheduler materialize does not operate by default on a particular Scheduler.
   * @return {Observable} an Observable that emits items that are the result of
   * materializing the items and notifications of the source Observable.
   * @method materialize
   * @owner Observable
   */
  export function materialize<T>(): Observable<Notification<T>>;
  export interface MaterializeSignature<T> {
    (): Observable<Notification<T>>;
  }
}
declare module "rxjs/add/operator/materialize" {
  import { MaterializeSignature } from "rxjs/operator/materialize";
  module "rxjs/Observable" {
    interface Observable<T> {
      materialize: MaterializeSignature<T>;
    }
  }
}
declare module "rxjs/add/operator/merge" {
  import { MergeSignature } from "rxjs/operator/merge";
  module "rxjs/Observable" {
    interface Observable<T> {
      merge: MergeSignature<T>;
    }
  }
}
declare module "rxjs/add/operator/mergeAll" {
  import { MergeAllSignature } from "rxjs/operator/mergeAll";
  module "rxjs/Observable" {
    interface Observable<T> {
      mergeAll: MergeAllSignature<T>;
    }
  }
}
declare module "rxjs/add/operator/mergeMap" {
  import { MergeMapSignature } from "rxjs/operator/mergeMap";
  module "rxjs/Observable" {
    interface Observable<T> {
      flatMap: MergeMapSignature<T>;
      mergeMap: MergeMapSignature<T>;
    }
  }
}
declare module "rxjs/add/operator/mergeMapTo" {
  import { MergeMapToSignature } from "rxjs/operator/mergeMapTo";
  module "rxjs/Observable" {
    interface Observable<T> {
      flatMapTo: MergeMapToSignature<T>;
      mergeMapTo: MergeMapToSignature<T>;
    }
  }
}
declare module "rxjs/add/operator/multicast" {
  import { MulticastSignature } from "rxjs/operator/multicast";
  module "rxjs/Observable" {
    interface Observable<T> {
      multicast: MulticastSignature<T>;
    }
  }
}
declare module "rxjs/add/operator/observeOn" {
  import { ObserveOnSignature } from "rxjs/operator/observeOn";
  module "rxjs/Observable" {
    interface Observable<T> {
      observeOn: ObserveOnSignature<T>;
    }
  }
}
declare module "rxjs/util/not" {
  export function not(pred: Function, thisArg: any): Function;
}
declare module "rxjs/operator/partition" {
  import { Observable } from "rxjs/Observable";
  /**
   * @param predicate
   * @param thisArg
   * @return {Observable<T>[]}
   * @method partition
   * @owner Observable
   */
  export function partition<T>(predicate: (value: T) => boolean, thisArg?: any): [Observable<T>, Observable<T>];
  export interface PartitionSignature<T> {
    (predicate: (value: T) => boolean, thisArg?: any): [Observable<T>, Observable<T>];
  }
}
declare module "rxjs/add/operator/partition" {
  import { PartitionSignature } from "rxjs/operator/partition";
  module "rxjs/Observable" {
    interface Observable<T> {
      partition: PartitionSignature<T>;
    }
  }
}
declare module "rxjs/operator/pluck" {
  import { Observable } from "rxjs/Observable";
  /**
   * Retrieves the value of a specified nested property from all elements in
   * the Observable sequence. If a property can't be resolved, it will return
   * `undefined` for that value.
   *
   * @param {...args} properties the nested properties to pluck
   * @return {Observable} Returns a new Observable sequence of property values
   * @method pluck
   * @owner Observable
   */
  export function pluck<R>(...properties: string[]): Observable<R>;
  export interface PluckSignature<T> {
    <R>(...properties: string[]): Observable<R>;
  }
}
declare module "rxjs/add/operator/pluck" {
  import { PluckSignature } from "rxjs/operator/pluck";
  module "rxjs/Observable" {
    interface Observable<T> {
      pluck: PluckSignature<T>;
    }
  }
}
declare module "rxjs/operator/publish" {
  import { ConnectableObservable } from "rxjs/observable/ConnectableObservable";
  /**
   * Returns a ConnectableObservable, which is a variety of Observable that waits until its connect method is called
   * before it begins emitting items to those Observers that have subscribed to it.
   *
   * <img src="./img/publish.png" width="100%">
   *
   * @return a ConnectableObservable that upon connection causes the source Observable to emit items to its Observers.
   * @method publish
   * @owner Observable
   */
  export function publish<T>(): ConnectableObservable<T>;
  export interface PublishSignature<T> {
    (): ConnectableObservable<T>;
  }
}
declare module "rxjs/add/operator/publish" {
  import { PublishSignature } from "rxjs/operator/publish";
  module "rxjs/Observable" {
    interface Observable<T> {
      publish: PublishSignature<T>;
    }
  }
}
declare module "rxjs/subject/BehaviorSubject" {
  import { Subject } from "rxjs/Subject";
  import { Subscriber } from "rxjs/Subscriber";
  import { Subscription } from "rxjs/Subscription";
  export class BehaviorSubject<T> extends Subject<T> {
    private _value;
    constructor(_value: T);
    getValue(): T;
    value: T;
    protected _subscribe(subscriber: Subscriber<T>): Subscription | Function | void;
    protected _next(value: T): void;
    protected _error(err: any): void;
  }
}
declare module "rxjs/operator/publishBehavior" {
  import { ConnectableObservable } from "rxjs/observable/ConnectableObservable";
  /**
   * @param value
   * @return {ConnectableObservable<T>}
   * @method publishBehavior
   * @owner Observable
   */
  export function publishBehavior<T>(value: T): ConnectableObservable<T>;
  export interface PublishBehaviorSignature<T> {
    (value: T): ConnectableObservable<T>;
  }
}
declare module "rxjs/add/operator/publishBehavior" {
  import { PublishBehaviorSignature } from "rxjs/operator/publishBehavior";
  module "rxjs/Observable" {
    interface Observable<T> {
      publishBehavior: PublishBehaviorSignature<T>;
    }
  }
}
declare module "rxjs/add/operator/publishReplay" {
  import { PublishReplaySignature } from "rxjs/operator/publishReplay";
  module "rxjs/Observable" {
    interface Observable<T> {
      publishReplay: PublishReplaySignature<T>;
    }
  }
}
declare module "rxjs/operator/publishLast" {
  import { ConnectableObservable } from "rxjs/observable/ConnectableObservable";
  /**
   * @return {ConnectableObservable<T>}
   * @method publishLast
   * @owner Observable
   */
  export function publishLast<T>(): ConnectableObservable<T>;
  export interface PublishLastSignature<T> {
    (): ConnectableObservable<T>;
  }
}
declare module "rxjs/add/operator/publishLast" {
  import { PublishLastSignature } from "rxjs/operator/publishLast";
  module "rxjs/Observable" {
    interface Observable<T> {
      publishLast: PublishLastSignature<T>;
    }
  }
}
declare module "rxjs/add/operator/race" {
  import { RaceSignature } from "rxjs/operator/race";
  module "rxjs/Observable" {
    interface Observable<T> {
      race: RaceSignature<T>;
    }
  }
}
declare module "rxjs/operator/reduce" {
  import { Observable } from "rxjs/Observable";
  import { Operator } from "rxjs/Operator";
  import { Subscriber } from "rxjs/Subscriber";
  /**
   * Returns an Observable that applies a specified accumulator function to the first item emitted by a source Observable,
   * then feeds the result of that function along with the second item emitted by the source Observable into the same
   * function, and so on until all items have been emitted by the source Observable, and emits the final result from
   * the final call to your function as its sole item.
   * This technique, which is called "reduce" here, is sometimes called "aggregate," "fold," "accumulate," "compress," or
   * "inject" in other programming contexts.
   *
   * <img src="./img/reduce.png" width="100%">
   *
   * @param {initialValue} the initial (seed) accumulator value
   * @param {accumulator} an accumulator function to be invoked on each item emitted by the source Observable, the
   * result of which will be used in the next accumulator call.
   * @return {Observable} an Observable that emits a single item that is the result of accumulating the output from the
   * items emitted by the source Observable.
   * @method reduce
   * @owner Observable
   */
  export function reduce<T, R>(project: (acc: R, value: T) => R, seed?: R): Observable<R>;
  export interface ReduceSignature<T> {
    <R>(project: (acc: R, value: T) => R, seed?: R): Observable<R>;
  }
  export class ReduceOperator<T, R> implements Operator<T, R> {
    private project;
    private seed;
    constructor(project: (acc: R, value: T) => R, seed?: R);
    call(subscriber: Subscriber<R>): Subscriber<T>;
  }
  export class ReduceSubscriber<T, R> extends Subscriber<T> {
    acc: T | R;
    hasSeed: boolean;
    hasValue: boolean;
    project: (acc: R, value: T) => R;
    constructor(destination: Subscriber<R>, project: (acc: R, value: T) => R, seed?: R);
    protected _next(value: T): void;
    private _tryReduce(value);
    protected _complete(): void;
  }
}
declare module "rxjs/add/operator/reduce" {
  import { ReduceSignature } from "rxjs/operator/reduce";
  module "rxjs/Observable" {
    interface Observable<T> {
      reduce: ReduceSignature<T>;
    }
  }
}
declare module "rxjs/operator/repeat" {
  import { Observable } from "rxjs/Observable";
  /**
   * Returns an Observable that repeats the stream of items emitted by the source Observable at most count times,
   * on a particular Scheduler.
   *
   * <img src="./img/repeat.png" width="100%">
   *
   * @param {Scheduler} [scheduler] the Scheduler to emit the items on.
   * @param {number} [count] the number of times the source Observable items are repeated, a count of 0 will yield
   * an empty Observable.
   * @return {Observable} an Observable that repeats the stream of items emitted by the source Observable at most
   * count times.
   * @method repeat
   * @owner Observable
   */
  export function repeat<T>(count?: number): Observable<T>;
  export interface RepeatSignature<T> {
    (count?: number): Observable<T>;
  }
}
declare module "rxjs/add/operator/repeat" {
  import { RepeatSignature } from "rxjs/operator/repeat";
  module "rxjs/Observable" {
    interface Observable<T> {
      repeat: RepeatSignature<T>;
    }
  }
}
declare module "rxjs/operator/retry" {
  import { Observable } from "rxjs/Observable";
  /**
   * Returns an Observable that mirrors the source Observable, resubscribing to it if it calls `error` and the
   * predicate returns true for that specific exception and retry count.
   * If the source Observable calls `error`, this method will resubscribe to the source Observable for a maximum of
   * count resubscriptions (given as a number parameter) rather than propagating the `error` call.
   *
   * <img src="./img/retry.png" width="100%">
   *
   * Any and all items emitted by the source Observable will be emitted by the resulting Observable, even those emitted
   * during failed subscriptions. For example, if an Observable fails at first but emits [1, 2] then succeeds the second
   * time and emits: [1, 2, 3, 4, 5] then the complete stream of emissions and notifications
   * would be: [1, 2, 1, 2, 3, 4, 5, `complete`].
   * @param {number} number of retry attempts before failing.
   * @return {Observable} the source Observable modified with the retry logic.
   * @method retry
   * @owner Observable
   */
  export function retry<T>(count?: number): Observable<T>;
  export interface RetrySignature<T> {
    (count?: number): Observable<T>;
  }
}
declare module "rxjs/add/operator/retry" {
  import { RetrySignature } from "rxjs/operator/retry";
  module "rxjs/Observable" {
    interface Observable<T> {
      retry: RetrySignature<T>;
    }
  }
}
declare module "rxjs/operator/retryWhen" {
  import { Observable } from "rxjs/Observable";
  /**
   * Returns an Observable that emits the same values as the source observable with the exception of an `error`.
   * An `error` will cause the emission of the Throwable that cause the error to the Observable returned from
   * notificationHandler. If that Observable calls onComplete or `error` then retry will call `complete` or `error`
   * on the child subscription. Otherwise, this Observable will resubscribe to the source observable, on a particular
   * Scheduler.
   *
   * <img src="./img/retryWhen.png" width="100%">
   *
   * @param {notificationHandler} receives an Observable of notifications with which a user can `complete` or `error`,
   * aborting the retry.
   * @param {scheduler} the Scheduler on which to subscribe to the source Observable.
   * @return {Observable} the source Observable modified with retry logic.
   * @method retryWhen
   * @owner Observable
   */
  export function retryWhen<T>(notifier: (errors: Observable<any>) => Observable<any>): Observable<T>;
  export interface RetryWhenSignature<T> {
    (notifier: (errors: Observable<any>) => Observable<any>): Observable<T>;
  }
}
declare module "rxjs/add/operator/retryWhen" {
  import { RetryWhenSignature } from "rxjs/operator/retryWhen";
  module "rxjs/Observable" {
    interface Observable<T> {
      retryWhen: RetryWhenSignature<T>;
    }
  }
}
declare module "rxjs/operator/sample" {
  import { Observable } from "rxjs/Observable";
  /**
   * Returns an Observable that, when the specified sampler Observable emits an item or completes, it then emits the most
   * recently emitted item (if any) emitted by the source Observable since the previous emission from the sampler
   * Observable.
   *
   * <img src="./img/sample.png" width="100%">
   *
   * @param {Observable} sampler - the Observable to use for sampling the source Observable.
   * @return {Observable<T>} an Observable that emits the results of sampling the items emitted by this Observable
   * whenever the sampler Observable emits an item or completes.
   * @method sample
   * @owner Observable
   */
  export function sample<T>(notifier: Observable<any>): Observable<T>;
  export interface SampleSignature<T> {
    (notifier: Observable<any>): Observable<T>;
  }
}
declare module "rxjs/add/operator/sample" {
  import { SampleSignature } from "rxjs/operator/sample";
  module "rxjs/Observable" {
    interface Observable<T> {
      sample: SampleSignature<T>;
    }
  }
}
declare module "rxjs/operator/sampleTime" {
  import { Observable } from "rxjs/Observable";
  import { Scheduler } from "rxjs/Scheduler";
  /**
   * @param delay
   * @param scheduler
   * @return {Observable<R>|WebSocketSubject<T>|Observable<T>}
   * @method sampleTime
   * @owner Observable
   */
  export function sampleTime<T>(delay: number, scheduler?: Scheduler): Observable<T>;
  export interface SampleTimeSignature<T> {
    (delay: number, scheduler?: Scheduler): Observable<T>;
  }
}
declare module "rxjs/add/operator/sampleTime" {
  import { SampleTimeSignature } from "rxjs/operator/sampleTime";
  module "rxjs/Observable" {
    interface Observable<T> {
      sampleTime: SampleTimeSignature<T>;
    }
  }
}
declare module "rxjs/operator/scan" {
  import { Observable } from "rxjs/Observable";
  /**
   * Returns an Observable that applies a specified accumulator function to each item emitted by the source Observable.
   * If a seed value is specified, then that value will be used as the initial value for the accumulator.
   * If no seed value is specified, the first item of the source is used as the seed.
   * @param {function} accumulator The accumulator function called on each item.
   *
   * <img src="./img/scan.png" width="100%">
   *
   * @param {any} [seed] The initial accumulator value.
   * @return {Obervable} An observable of the accumulated values.
   * @method scan
   * @owner Observable
   */
  export function scan<T, R>(accumulator: (acc: R, value: T) => R, seed?: T | R): Observable<R>;
  export interface ScanSignature<T> {
    <R>(accumulator: (acc: R, value: T) => R, seed?: T | R): Observable<R>;
  }
}
declare module "rxjs/add/operator/scan" {
  import { ScanSignature } from "rxjs/operator/scan";
  module "rxjs/Observable" {
    interface Observable<T> {
      scan: ScanSignature<T>;
    }
  }
}
declare module "rxjs/operator/share" {
  import { Observable } from "rxjs/Observable";
  /**
   * Returns a new Observable that multicasts (shares) the original Observable. As long as there is at least one
   * Subscriber this Observable will be subscribed and emitting data. When all subscribers have unsubscribed it will
   * unsubscribe from the source Observable. Because the Observable is multicasting it makes the stream `hot`.
   * This is an alias for .publish().refCount().
   *
   * <img src="./img/share.png" width="100%">
   *
   * @return {Observable<T>} an Observable that upon connection causes the source Observable to emit items to its Observers
   * @method share
   * @owner Observable
   */
  export function share<T>(): Observable<T>;
  export interface ShareSignature<T> {
    (): Observable<T>;
  }
}
declare module "rxjs/add/operator/share" {
  import { ShareSignature } from "rxjs/operator/share";
  module "rxjs/Observable" {
    interface Observable<T> {
      share: ShareSignature<T>;
    }
  }
}
declare module "rxjs/operator/single" {
  import { Observable } from "rxjs/Observable";
  /**
   * Returns an Observable that emits the single item emitted by the source Observable that matches a specified
   * predicate, if that Observable emits one such item. If the source Observable emits more than one such item or no
   * such items, notify of an IllegalArgumentException or NoSuchElementException respectively.
   *
   * <img src="./img/single.png" width="100%">
   *
   * @param {Function} a predicate function to evaluate items emitted by the source Observable.
   * @return {Observable<T>} an Observable that emits the single item emitted by the source Observable that matches
   * the predicate.
   .
   * @method single
   * @owner Observable
   */
  export function single<T>(predicate?: (value: T, index: number, source: Observable<T>) => boolean): Observable<T>;
  export interface SingleSignature<T> {
    (predicate?: (value: T, index: number, source: Observable<T>) => boolean): Observable<T>;
  }
}
declare module "rxjs/add/operator/single" {
  import { SingleSignature } from "rxjs/operator/single";
  module "rxjs/Observable" {
    interface Observable<T> {
      single: SingleSignature<T>;
    }
  }
}
declare module "rxjs/operator/skip" {
  import { Observable } from "rxjs/Observable";
  /**
   * Returns an Observable that skips `n` items emitted by an Observable.
   *
   * <img src="./img/skip.png" width="100%">
   *
   * @param {Number} the `n` of times, items emitted by source Observable should be skipped.
   * @return {Observable} an Observable that skips values emitted by the source Observable.
   *
   * @method skip
   * @owner Observable
   */
  export function skip<T>(total: number): Observable<T>;
  export interface SkipSignature<T> {
    (total: number): Observable<T>;
  }
}
declare module "rxjs/add/operator/skip" {
  import { SkipSignature } from "rxjs/operator/skip";
  module "rxjs/Observable" {
    interface Observable<T> {
      skip: SkipSignature<T>;
    }
  }
}
declare module "rxjs/operator/skipUntil" {
  import { Observable } from "rxjs/Observable";
  /**
   * Returns an Observable that skips items emitted by the source Observable until a second Observable emits an item.
   *
   * <img src="./img/skipUntil.png" width="100%">
   *
   * @param {Observable} the second Observable that has to emit an item before the source Observable's elements begin to
   * be mirrored by the resulting Observable.
   * @return {Observable<T>} an Observable that skips items from the source Observable until the second Observable emits
   * an item, then emits the remaining items.
   * @method skipUntil
   * @owner Observable
   */
  export function skipUntil<T>(notifier: Observable<any>): Observable<T>;
  export interface SkipUntilSignature<T> {
    (notifier: Observable<any>): Observable<T>;
  }
}
declare module "rxjs/add/operator/skipUntil" {
  import { SkipUntilSignature } from "rxjs/operator/skipUntil";
  module "rxjs/Observable" {
    interface Observable<T> {
      skipUntil: SkipUntilSignature<T>;
    }
  }
}
declare module "rxjs/operator/skipWhile" {
  import { Observable } from "rxjs/Observable";
  /**
   * Returns an Observable that skips all items emitted by the source Observable as long as a specified condition holds
   * true, but emits all further source items as soon as the condition becomes false.
   *
   * <img src="./img/skipWhile.png" width="100%">
   *
   * @param {Function} predicate - a function to test each item emitted from the source Observable.
   * @return {Observable<T>} an Observable that begins emitting items emitted by the source Observable when the
   * specified predicate becomes false.
   * @method skipWhile
   * @owner Observable
   */
  export function skipWhile<T>(predicate: (value: T, index: number) => boolean): Observable<T>;
  export interface SkipWhileSignature<T> {
    (predicate: (value: T, index: number) => boolean): Observable<T>;
  }
}
declare module "rxjs/add/operator/skipWhile" {
  import { SkipWhileSignature } from "rxjs/operator/skipWhile";
  module "rxjs/Observable" {
    interface Observable<T> {
      skipWhile: SkipWhileSignature<T>;
    }
  }
}
declare module "rxjs/operator/startWith" {
  import { Scheduler } from "rxjs/Scheduler";
  import { Observable } from "rxjs/Observable";
  /**
   * Returns an Observable that emits the items in a specified Iterable before it begins to emit items emitted by the
   * source Observable.
   *
   * <img src="./img/startWith.png" width="100%">
   *
   * @param {Values} an Iterable that contains the items you want the modified Observable to emit first.
   * @return {Observable} an Observable that emits the items in the specified Iterable and then emits the items
   * emitted by the source Observable.
   * @method startWith
   * @owner Observable
   */
  export function startWith<T>(...array: Array<T | Scheduler>): Observable<T>;
  export interface StartWithSignature<T> {
    (v1: T, scheduler?: Scheduler): Observable<T>;
    (v1: T, v2: T, scheduler?: Scheduler): Observable<T>;
    (v1: T, v2: T, v3: T, scheduler?: Scheduler): Observable<T>;
    (v1: T, v2: T, v3: T, v4: T, scheduler?: Scheduler): Observable<T>;
    (v1: T, v2: T, v3: T, v4: T, v5: T, scheduler?: Scheduler): Observable<T>;
    (v1: T, v2: T, v3: T, v4: T, v5: T, v6: T, scheduler?: Scheduler): Observable<T>;
    (...array: Array<T | Scheduler>): Observable<T>;
  }
}
declare module "rxjs/add/operator/startWith" {
  import { StartWithSignature } from "rxjs/operator/startWith";
  module "rxjs/Observable" {
    interface Observable<T> {
      startWith: StartWithSignature<T>;
    }
  }
}
declare module "rxjs/util/Immediate" {
  export class ImmediateDefinition {
    private root;
    setImmediate: (cb: () => void) => number;
    clearImmediate: (handle: number) => void;
    private identify(o);
    tasksByHandle: any;
    nextHandle: number;
    currentlyRunningATask: boolean;
    constructor(root: any);
    canUseProcessNextTick(): boolean;
    canUseMessageChannel(): boolean;
    canUseReadyStateChange(): boolean;
    canUsePostMessage(): boolean;
    partiallyApplied(handler: any, ...args: any[]): () => void;
    addFromSetImmediateArguments(args: any[]): number;
    createProcessNextTickSetImmediate(): () => any;
    createPostMessageSetImmediate(): () => any;
    runIfPresent(handle: any): void;
    createMessageChannelSetImmediate(): () => any;
    createReadyStateChangeSetImmediate(): () => any;
    createSetTimeoutSetImmediate(): () => any;
  }
  export const Immediate: ImmediateDefinition;
}
declare module "rxjs/scheduler/AsapAction" {
  import { Action } from "rxjs/scheduler/Action";
  import { FutureAction } from "rxjs/scheduler/FutureAction";
  export class AsapAction<T> extends FutureAction<T> {
    protected _schedule(state?: T, delay?: number): Action;
    protected _unsubscribe(): void;
  }
}
declare module "rxjs/scheduler/AsapScheduler" {
  import { Action } from "rxjs/scheduler/Action";
  import { Subscription } from "rxjs/Subscription";
  import { QueueScheduler } from "rxjs/scheduler/QueueScheduler";
  export class AsapScheduler extends QueueScheduler {
    scheduleNow<T>(work: (x?: T) => Subscription, state?: T): Action;
  }
}
declare module "rxjs/scheduler/asap" {
  import { AsapScheduler } from "rxjs/scheduler/AsapScheduler";
  export const asap: AsapScheduler;
}
declare module "rxjs/observable/SubscribeOnObservable" {
  import { Scheduler } from "rxjs/Scheduler";
  import { Subscriber } from "rxjs/Subscriber";
  import { Subscription } from "rxjs/Subscription";
  import { Observable } from "rxjs/Observable";
  export class SubscribeOnObservable<T> extends Observable<T> {
    source: Observable<T>;
    private delayTime;
    private scheduler;
    static create<T>(source: Observable<T>, delay?: number, scheduler?: Scheduler): Observable<T>;
    static dispatch<T>({source, subscriber}: {
      source: any;
      subscriber: any;
    }): Subscription;
    constructor(source: Observable<T>, delayTime?: number, scheduler?: Scheduler);
    protected _subscribe(subscriber: Subscriber<T>): Subscription;
  }
}
declare module "rxjs/operator/subscribeOn" {
  import { Scheduler } from "rxjs/Scheduler";
  import { Observable } from "rxjs/Observable";
  /**
   * Asynchronously subscribes Observers to this Observable on the specified Scheduler.
   *
   * <img src="./img/subscribeOn.png" width="100%">
   *
   * @param {Scheduler} the Scheduler to perform subscription actions on.
   * @return {Observable<T>} the source Observable modified so that its subscriptions happen on the specified Scheduler
   .
   * @method subscribeOn
   * @owner Observable
   */
  export function subscribeOn<T>(scheduler: Scheduler, delay?: number): Observable<T>;
  export interface SubscribeOnSignature<T> {
    (scheduler: Scheduler, delay?: number): Observable<T>;
  }
}
declare module "rxjs/add/operator/subscribeOn" {
  import { SubscribeOnSignature } from "rxjs/operator/subscribeOn";
  module "rxjs/Observable" {
    interface Observable<T> {
      subscribeOn: SubscribeOnSignature<T>;
    }
  }
}
declare module "rxjs/operator/switch" {
  /**
   * Converts an Observable that emits Observables into an Observable that emits the items emitted by the most recently
   * emitted of those Observables.
   *
   * <img src="./img/switch.png" width="100%">
   *
   * Switch subscribes to an Observable that emits Observables. Each time it observes one of these emitted Observables,
   * the Observable returned by switchOnNext begins emitting the items emitted by that Observable. When a new Observable
   * is emitted, switchOnNext stops emitting items from the earlier-emitted Observable and begins emitting items from the
   * new one.
   *
   * @param {Function} a predicate function to evaluate items emitted by the source Observable.
   * @return {Observable<T>} an Observable that emits the items emitted by the Observable most recently emitted by the
   * source Observable.
   * @method switch
   * @owner Observable
   */
  export function _switch<T>(): T;
  export interface SwitchSignature<T> {
    (): T;
  }
}
declare module "rxjs/add/operator/switch" {
  import { SwitchSignature } from "rxjs/operator/switch";
  module "rxjs/Observable" {
    interface Observable<T> {
      switch: SwitchSignature<T>;
    }
  }
}
declare module "rxjs/operator/switchMap" {
  import { Observable, ObservableInput } from "rxjs/Observable";
  /**
   * Returns a new Observable by applying a function that you supply to each item emitted by the source Observable that
   * returns an Observable, and then emitting the items emitted by the most recently emitted of these Observables.
   *
   * <img src="./img/switchMap.png" width="100%">
   *
   * @param {Observable} a function that, when applied to an item emitted by the source Observable, returns an Observable.
   * @return {Observable} an Observable that emits the items emitted by the Observable returned from applying func to
   * the most recently emitted item emitted by the source Observable.
   * @method switchMap
   * @owner Observable
   */
  export function switchMap<T, I, R>(project: (value: T, index: number) => ObservableInput<I>, resultSelector?: (outerValue: T, innerValue: I, outerIndex: number, innerIndex: number) => R): Observable<R>;
  export interface SwitchMapSignature<T> {
    <R>(project: (value: T, index: number) => ObservableInput<R>): Observable<R>;
    <I, R>(project: (value: T, index: number) => ObservableInput<I>, resultSelector: (outerValue: T, innerValue: I, outerIndex: number, innerIndex: number) => R): Observable<R>;
  }
}
declare module "rxjs/add/operator/switchMap" {
  import { SwitchMapSignature } from "rxjs/operator/switchMap";
  module "rxjs/Observable" {
    interface Observable<T> {
      switchMap: SwitchMapSignature<T>;
    }
  }
}
declare module "rxjs/operator/switchMapTo" {
  import { Observable, ObservableInput } from "rxjs/Observable";
  /**
   * @param observable
   * @param resultSelector
   * @return {Observable<R>|WebSocketSubject<T>|Observable<T>}
   * @method switchMapTo
   * @owner Observable
   */
  export function switchMapTo<T, I, R>(observable: Observable<I>, resultSelector?: (outerValue: T, innerValue: I, outerIndex: number, innerIndex: number) => R): Observable<R>;
  export interface SwitchMapToSignature<T> {
    <R>(observable: ObservableInput<R>): Observable<R>;
    <I, R>(observable: ObservableInput<I>, resultSelector: (outerValue: T, innerValue: I, outerIndex: number, innerIndex: number) => R): Observable<R>;
  }
}
declare module "rxjs/add/operator/switchMapTo" {
  import { SwitchMapToSignature } from "rxjs/operator/switchMapTo";
  module "rxjs/Observable" {
    interface Observable<T> {
      switchMapTo: SwitchMapToSignature<T>;
    }
  }
}
declare module "rxjs/util/ArgumentOutOfRangeError" {
  export class ArgumentOutOfRangeError extends Error {
    constructor();
  }
}
declare module "rxjs/operator/take" {
  import { Observable } from "rxjs/Observable";
  /**
   * @param total
   * @return {any}
   * @method take
   * @owner Observable
   */
  export function take<T>(total: number): Observable<T>;
  export interface TakeSignature<T> {
    (total: number): Observable<T>;
  }
}
declare module "rxjs/add/operator/take" {
  import { TakeSignature } from "rxjs/operator/take";
  module "rxjs/Observable" {
    interface Observable<T> {
      take: TakeSignature<T>;
    }
  }
}
declare module "rxjs/operator/takeLast" {
  import { Observable } from "rxjs/Observable";
  /**
   * @param total
   * @return {any}
   * @method takeLast
   * @owner Observable
   */
  export function takeLast<T>(total: number): Observable<T>;
  export interface TakeLastSignature<T> {
    (total: number): Observable<T>;
  }
}
declare module "rxjs/add/operator/takeLast" {
  import { TakeLastSignature } from "rxjs/operator/takeLast";
  module "rxjs/Observable" {
    interface Observable<T> {
      takeLast: TakeLastSignature<T>;
    }
  }
}
declare module "rxjs/operator/takeUntil" {
  import { Observable } from "rxjs/Observable";
  /**
   * @param notifier
   * @return {Observable<R>|WebSocketSubject<T>|Observable<T>}
   * @method takeUntil
   * @owner Observable
   */
  export function takeUntil<T>(notifier: Observable<any>): Observable<T>;
  export interface TakeUntilSignature<T> {
    (notifier: Observable<any>): Observable<T>;
  }
}
declare module "rxjs/add/operator/takeUntil" {
  import { TakeUntilSignature } from "rxjs/operator/takeUntil";
  module "rxjs/Observable" {
    interface Observable<T> {
      takeUntil: TakeUntilSignature<T>;
    }
  }
}
declare module "rxjs/operator/takeWhile" {
  import { Observable } from "rxjs/Observable";
  /**
   * @param predicate
   * @return {Observable<R>|WebSocketSubject<T>|Observable<T>}
   * @method takeWhile
   * @owner Observable
   */
  export function takeWhile<T>(predicate: (value: T, index: number) => boolean): Observable<T>;
  export interface TakeWhileSignature<T> {
    (predicate: (value: T, index: number) => boolean): Observable<T>;
  }
}
declare module "rxjs/add/operator/takeWhile" {
  import { TakeWhileSignature } from "rxjs/operator/takeWhile";
  module "rxjs/Observable" {
    interface Observable<T> {
      takeWhile: TakeWhileSignature<T>;
    }
  }
}
declare module "rxjs/operator/throttle" {
  import { Observable, ObservableOrPromise } from "rxjs/Observable";
  /**
   * @param durationSelector
   * @return {Observable<R>|WebSocketSubject<T>|Observable<T>}
   * @method throttle
   * @owner Observable
   */
  export function throttle<T>(durationSelector: (value: T) => ObservableOrPromise<number>): Observable<T>;
  export interface ThrottleSignature<T> {
    (durationSelector: (value: T) => ObservableOrPromise<number>): Observable<T>;
  }
}
declare module "rxjs/add/operator/throttle" {
  import { ThrottleSignature } from "rxjs/operator/throttle";
  module "rxjs/Observable" {
    interface Observable<T> {
      throttle: ThrottleSignature<T>;
    }
  }
}
declare module "rxjs/operator/throttleTime" {
  import { Scheduler } from "rxjs/Scheduler";
  import { Observable } from "rxjs/Observable";
  /**
   * @param delay
   * @param scheduler
   * @return {Observable<R>|WebSocketSubject<T>|Observable<T>}
   * @method throttleTime
   * @owner Observable
   */
  export function throttleTime<T>(delay: number, scheduler?: Scheduler): Observable<T>;
  export interface ThrottleTimeSignature<T> {
    (dueTime: number, scheduler?: Scheduler): Observable<T>;
  }
}
declare module "rxjs/add/operator/throttleTime" {
  import { ThrottleTimeSignature } from "rxjs/operator/throttleTime";
  module "rxjs/Observable" {
    interface Observable<T> {
      throttleTime: ThrottleTimeSignature<T>;
    }
  }
}
declare module "rxjs/operator/timeout" {
  import { Scheduler } from "rxjs/Scheduler";
  import { Observable } from "rxjs/Observable";
  /**
   * @param due
   * @param errorToSend
   * @param scheduler
   * @return {Observable<R>|WebSocketSubject<T>|Observable<T>}
   * @method timeout
   * @owner Observable
   */
  export function timeout<T>(due: number | Date, errorToSend?: any, scheduler?: Scheduler): Observable<T>;
  export interface TimeoutSignature<T> {
    (due: number | Date, errorToSend?: any, scheduler?: Scheduler): Observable<T>;
  }
}
declare module "rxjs/add/operator/timeout" {
  import { TimeoutSignature } from "rxjs/operator/timeout";
  module "rxjs/Observable" {
    interface Observable<T> {
      timeout: TimeoutSignature<T>;
    }
  }
}
declare module "rxjs/operator/timeoutWith" {
  import { Scheduler } from "rxjs/Scheduler";
  import { Observable } from "rxjs/Observable";
  /**
   * @param due
   * @param withObservable
   * @param scheduler
   * @return {Observable<R>|WebSocketSubject<T>|Observable<T>}
   * @method timeoutWith
   * @owner Observable
   */
  export function timeoutWith<T, R>(due: number | Date, withObservable: Observable<R>, scheduler?: Scheduler): Observable<T | R>;
  export interface TimeoutWithSignature<T> {
    (due: number | Date, withObservable: Observable<T>, scheduler?: Scheduler): Observable<T>;
    <R>(due: number | Date, withObservable: Observable<R>, scheduler?: Scheduler): Observable<T | R>;
  }
}
declare module "rxjs/add/operator/timeoutWith" {
  import { TimeoutWithSignature } from "rxjs/operator/timeoutWith";
  module "rxjs/Observable" {
    interface Observable<T> {
      timeoutWith: TimeoutWithSignature<T>;
    }
  }
}
declare module "rxjs/operator/toArray" {
  import { Observable } from "rxjs/Observable";
  /**
   * @return {Observable<any[]>|WebSocketSubject<T>|Observable<T>}
   * @method toArray
   * @owner Observable
   */
  export function toArray<T>(): Observable<T[]>;
  export interface ToArraySignature<T> {
    (): Observable<T[]>;
  }
}
declare module "rxjs/add/operator/toArray" {
  import { ToArraySignature } from "rxjs/operator/toArray";
  module "rxjs/Observable" {
    interface Observable<T> {
      toArray: ToArraySignature<T>;
    }
  }
}
declare module "rxjs/operator/toPromise" {
  /**
   * @param PromiseCtor
   * @return {Promise<T>}
   * @method toPromise
   * @owner Observable
   */
  export function toPromise<T>(PromiseCtor?: typeof Promise): Promise<T>;
  export interface ToPromiseSignature<T> {
    (): Promise<T>;
    (PromiseCtor: typeof Promise): Promise<T>;
  }
}
declare module "rxjs/add/operator/toPromise" {
  import { ToPromiseSignature } from "rxjs/operator/toPromise";
  module "rxjs/Observable" {
    interface Observable<T> {
      toPromise: ToPromiseSignature<T>;
    }
  }
}
declare module "rxjs/operator/window" {
  import { Observable } from "rxjs/Observable";
  /**
   * @param closingNotifier
   * @return {Observable<Observable<any>>|WebSocketSubject<T>|Observable<T>}
   * @method window
   * @owner Observable
   */
  export function window<T>(closingNotifier: Observable<any>): Observable<Observable<T>>;
  export interface WindowSignature<T> {
    (closingNotifier: Observable<any>): Observable<Observable<T>>;
  }
}
declare module "rxjs/add/operator/window" {
  import { WindowSignature } from "rxjs/operator/window";
  module "rxjs/Observable" {
    interface Observable<T> {
      window: WindowSignature<T>;
    }
  }
}
declare module "rxjs/operator/windowCount" {
  import { Observable } from "rxjs/Observable";
  /**
   * @param windowSize
   * @param startWindowEvery
   * @return {Observable<Observable<any>>|WebSocketSubject<T>|Observable<T>}
   * @method windowCount
   * @owner Observable
   */
  export function windowCount<T>(windowSize: number, startWindowEvery?: number): Observable<Observable<T>>;
  export interface WindowCountSignature<T> {
    (windowSize: number, startWindowEvery?: number): Observable<Observable<T>>;
  }
}
declare module "rxjs/add/operator/windowCount" {
  import { WindowCountSignature } from "rxjs/operator/windowCount";
  module "rxjs/Observable" {
    interface Observable<T> {
      windowCount: WindowCountSignature<T>;
    }
  }
}
declare module "rxjs/operator/windowTime" {
  import { Observable } from "rxjs/Observable";
  import { Scheduler } from "rxjs/Scheduler";
  /**
   * @param windowTimeSpan
   * @param windowCreationInterval
   * @param scheduler
   * @return {Observable<Observable<any>>|WebSocketSubject<T>|Observable<T>}
   * @method windowTime
   * @owner Observable
   */
  export function windowTime<T>(windowTimeSpan: number, windowCreationInterval?: number, scheduler?: Scheduler): Observable<Observable<T>>;
  export interface WindowTimeSignature<T> {
    (windowTimeSpan: number, windowCreationInterval?: number, scheduler?: Scheduler): Observable<Observable<T>>;
  }
}
declare module "rxjs/add/operator/windowTime" {
  import { WindowTimeSignature } from "rxjs/operator/windowTime";
  module "rxjs/Observable" {
    interface Observable<T> {
      windowTime: WindowTimeSignature<T>;
    }
  }
}
declare module "rxjs/operator/windowToggle" {
  import { Observable } from "rxjs/Observable";
  /**
   * @param openings
   * @param closingSelector
   * @return {Observable<Observable<any>>|WebSocketSubject<T>|Observable<T>}
   * @method windowToggle
   * @owner Observable
   */
  export function windowToggle<T, O>(openings: Observable<O>, closingSelector: (openValue: O) => Observable<any>): Observable<Observable<T>>;
  export interface WindowToggleSignature<T> {
    <O>(openings: Observable<O>, closingSelector: (openValue: O) => Observable<any>): Observable<Observable<T>>;
  }
}
declare module "rxjs/add/operator/windowToggle" {
  import { WindowToggleSignature } from "rxjs/operator/windowToggle";
  module "rxjs/Observable" {
    interface Observable<T> {
      windowToggle: WindowToggleSignature<T>;
    }
  }
}
declare module "rxjs/operator/windowWhen" {
  import { Observable } from "rxjs/Observable";
  /**
   * @param closingSelector
   * @return {Observable<Observable<any>>|WebSocketSubject<T>|Observable<T>}
   * @method windowWhen
   * @owner Observable
   */
  export function windowWhen<T>(closingSelector: () => Observable<any>): Observable<Observable<T>>;
  export interface WindowWhenSignature<T> {
    (closingSelector: () => Observable<any>): Observable<Observable<T>>;
  }
}
declare module "rxjs/add/operator/windowWhen" {
  import { WindowWhenSignature } from "rxjs/operator/windowWhen";
  module "rxjs/Observable" {
    interface Observable<T> {
      windowWhen: WindowWhenSignature<T>;
    }
  }
}
declare module "rxjs/operator/withLatestFrom" {
  import { Observable, ObservableInput } from "rxjs/Observable";
  /**
   * @param {Observable} observables the observables to get the latest values from.
   * @param {Function} [project] optional projection function for merging values together. Receives all values in order
   *  of observables passed. (e.g. `a.withLatestFrom(b, c, (a1, b1, c1) => a1 + b1 + c1)`). If this is not passed, arrays
   *  will be returned.
   * @description merges each value from an observable with the latest values from the other passed observables.
   * All observables must emit at least one value before the resulting observable will emit
   *
   * #### example
   * ```
   * A.withLatestFrom(B, C)
   *
   *  A:     ----a-----------------b---------------c-----------|
   *  B:     ---d----------------e--------------f---------|
   *  C:     --x----------------y-------------z-------------|
   * result: ---([a,d,x])---------([b,e,y])--------([c,f,z])---|
   * ```
   * @method withLatestFrom
   * @owner Observable
   */
  export function withLatestFrom<T, R>(...args: Array<ObservableInput<any> | ((...values: Array<any>) => R)>): Observable<R>;
  export interface WithLatestFromSignature<T> {
    <R>(project: (v1: T) => R): Observable<R>;
    <T2, R>(v2: ObservableInput<T2>, project: (v1: T, v2: T2) => R): Observable<R>;
    <T2, T3, R>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, project: (v1: T, v2: T2, v3: T3) => R): Observable<R>;
    <T2, T3, T4, R>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, project: (v1: T, v2: T2, v3: T3, v4: T4) => R): Observable<R>;
    <T2, T3, T4, T5, R>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, project: (v1: T, v2: T2, v3: T3, v4: T4, v5: T5) => R): Observable<R>;
    <T2, T3, T4, T5, T6, R>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, v6: ObservableInput<T6>, project: (v1: T, v2: T2, v3: T3, v4: T4, v5: T5, v6: T6) => R): Observable<R>;
    <T2>(v2: ObservableInput<T2>): Observable<[T, T2]>;
    <T2, T3>(v2: ObservableInput<T2>, v3: ObservableInput<T3>): Observable<[T, T2, T3]>;
    <T2, T3, T4>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>): Observable<[T, T2, T3, T4]>;
    <T2, T3, T4, T5>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>): Observable<[T, T2, T3, T4, T5]>;
    <T2, T3, T4, T5, T6>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, v6: ObservableInput<T6>): Observable<[T, T2, T3, T4, T5, T6]>;
    <R>(...observables: Array<ObservableInput<any> | ((...values: Array<any>) => R)>): Observable<R>;
    <R>(array: ObservableInput<any>[]): Observable<R>;
    <R>(array: ObservableInput<any>[], project: (...values: Array<any>) => R): Observable<R>;
  }
}
declare module "rxjs/add/operator/withLatestFrom" {
  import { WithLatestFromSignature } from "rxjs/operator/withLatestFrom";
  module "rxjs/Observable" {
    interface Observable<T> {
      withLatestFrom: WithLatestFromSignature<T>;
    }
  }
}
declare module "rxjs/add/operator/zip" {
  import { ZipSignature } from "rxjs/operator/zip";
  module "rxjs/Observable" {
    interface Observable<T> {
      zip: ZipSignature<T>;
    }
  }
}
declare module "rxjs/operator/zipAll" {
  import { Observable } from "rxjs/Observable";
  /**
   * @param project
   * @return {Observable<R>|WebSocketSubject<T>|Observable<T>}
   * @method zipAll
   * @owner Observable
   */
  export function zipAll<T, R>(project?: (...values: Array<any>) => R): Observable<R>;
  export interface ZipAllSignature<T> {
    (): Observable<T[]>;
    <R>(project?: (...values: Array<T>) => R): Observable<R>;
  }
}
declare module "rxjs/add/operator/zipAll" {
  import { ZipAllSignature } from "rxjs/operator/zipAll";
  module "rxjs/Observable" {
    interface Observable<T> {
      zipAll: ZipAllSignature<T>;
    }
  }
}
declare module "rxjs/Rx" {
  export { Subject } from "rxjs/Subject";
  export { Observable } from "rxjs/Observable";
  import "rxjs/add/observable/bindCallback";
  import "rxjs/add/observable/bindNodeCallback";
  import "rxjs/add/observable/combineLatest";
  import "rxjs/add/observable/concat";
  import "rxjs/add/observable/defer";
  import "rxjs/add/observable/empty";
  import "rxjs/add/observable/forkJoin";
  import "rxjs/add/observable/from";
  import "rxjs/add/observable/fromArray";
  import "rxjs/add/observable/fromEvent";
  import "rxjs/add/observable/fromEventPattern";
  import "rxjs/add/observable/fromPromise";
  import "rxjs/add/observable/interval";
  import "rxjs/add/observable/merge";
  import "rxjs/add/observable/race";
  import "rxjs/add/observable/never";
  import "rxjs/add/observable/of";
  import "rxjs/add/observable/range";
  import "rxjs/add/observable/throw";
  import "rxjs/add/observable/timer";
  import "rxjs/add/observable/zip";
  import "rxjs/add/operator/buffer";
  import "rxjs/add/operator/bufferCount";
  import "rxjs/add/operator/bufferTime";
  import "rxjs/add/operator/bufferToggle";
  import "rxjs/add/operator/bufferWhen";
  import "rxjs/add/operator/cache";
  import "rxjs/add/operator/catch";
  import "rxjs/add/operator/combineAll";
  import "rxjs/add/operator/combineLatest";
  import "rxjs/add/operator/concat";
  import "rxjs/add/operator/concatAll";
  import "rxjs/add/operator/concatMap";
  import "rxjs/add/operator/concatMapTo";
  import "rxjs/add/operator/count";
  import "rxjs/add/operator/dematerialize";
  import "rxjs/add/operator/debounce";
  import "rxjs/add/operator/debounceTime";
  import "rxjs/add/operator/defaultIfEmpty";
  import "rxjs/add/operator/delay";
  import "rxjs/add/operator/delayWhen";
  import "rxjs/add/operator/distinctUntilChanged";
  import "rxjs/add/operator/do";
  import "rxjs/add/operator/expand";
  import "rxjs/add/operator/filter";
  import "rxjs/add/operator/finally";
  import "rxjs/add/operator/first";
  import "rxjs/add/operator/groupBy";
  import "rxjs/add/operator/ignoreElements";
  import "rxjs/add/operator/inspect";
  import "rxjs/add/operator/inspectTime";
  import "rxjs/add/operator/last";
  import "rxjs/add/operator/let";
  import "rxjs/add/operator/every";
  import "rxjs/add/operator/map";
  import "rxjs/add/operator/mapTo";
  import "rxjs/add/operator/materialize";
  import "rxjs/add/operator/merge";
  import "rxjs/add/operator/mergeAll";
  import "rxjs/add/operator/mergeMap";
  import "rxjs/add/operator/mergeMapTo";
  import "rxjs/add/operator/multicast";
  import "rxjs/add/operator/observeOn";
  import "rxjs/add/operator/partition";
  import "rxjs/add/operator/pluck";
  import "rxjs/add/operator/publish";
  import "rxjs/add/operator/publishBehavior";
  import "rxjs/add/operator/publishReplay";
  import "rxjs/add/operator/publishLast";
  import "rxjs/add/operator/race";
  import "rxjs/add/operator/reduce";
  import "rxjs/add/operator/repeat";
  import "rxjs/add/operator/retry";
  import "rxjs/add/operator/retryWhen";
  import "rxjs/add/operator/sample";
  import "rxjs/add/operator/sampleTime";
  import "rxjs/add/operator/scan";
  import "rxjs/add/operator/share";
  import "rxjs/add/operator/single";
  import "rxjs/add/operator/skip";
  import "rxjs/add/operator/skipUntil";
  import "rxjs/add/operator/skipWhile";
  import "rxjs/add/operator/startWith";
  import "rxjs/add/operator/subscribeOn";
  import "rxjs/add/operator/switch";
  import "rxjs/add/operator/switchMap";
  import "rxjs/add/operator/switchMapTo";
  import "rxjs/add/operator/take";
  import "rxjs/add/operator/takeLast";
  import "rxjs/add/operator/takeUntil";
  import "rxjs/add/operator/takeWhile";
  import "rxjs/add/operator/throttle";
  import "rxjs/add/operator/throttleTime";
  import "rxjs/add/operator/timeout";
  import "rxjs/add/operator/timeoutWith";
  import "rxjs/add/operator/toArray";
  import "rxjs/add/operator/toPromise";
  import "rxjs/add/operator/window";
  import "rxjs/add/operator/windowCount";
  import "rxjs/add/operator/windowTime";
  import "rxjs/add/operator/windowToggle";
  import "rxjs/add/operator/windowWhen";
  import "rxjs/add/operator/withLatestFrom";
  import "rxjs/add/operator/zip";
  import "rxjs/add/operator/zipAll";
  export { Operator } from "rxjs/Operator";
  export { Observer } from "rxjs/Observer";
  export { Subscription, UnsubscriptionError } from "rxjs/Subscription";
  export { Subscriber } from "rxjs/Subscriber";
  export { AsyncSubject } from "rxjs/subject/AsyncSubject";
  export { ReplaySubject } from "rxjs/subject/ReplaySubject";
  export { BehaviorSubject } from "rxjs/subject/BehaviorSubject";
  export { ConnectableObservable } from "rxjs/observable/ConnectableObservable";
  export { Notification } from "rxjs/Notification";
  export { EmptyError } from "rxjs/util/EmptyError";
  export { ArgumentOutOfRangeError } from "rxjs/util/ArgumentOutOfRangeError";
  export { ObjectUnsubscribedError } from "rxjs/util/ObjectUnsubscribedError";
  import { AsapScheduler } from "rxjs/scheduler/AsapScheduler";
  import { AsyncScheduler } from "rxjs/scheduler/AsyncScheduler";
  import { QueueScheduler } from "rxjs/scheduler/QueueScheduler";
  var Scheduler: {
    asap: AsapScheduler;
    async: AsyncScheduler;
    queue: QueueScheduler;
  };
  var Symbol: {
    rxSubscriber: any;
  };
  export { Scheduler, Symbol };
}
declare module "angular2/src/facade/lang" {
  export interface ZoneLike {
    fork(locals?: any): ZoneLike;
    run(fn: any, applyTo?: any, applyWith?: any): any;
  }
  export interface ZoneLikeConstructor {
    longStackTraceZone: {
      [key: string]: any;
    };
  }
  export interface BrowserNodeGlobal {
    Object: typeof Object;
    Array: typeof Array;
    Map: typeof Map;
    Set: typeof Set;
    Date: DateConstructor;
    RegExp: RegExpConstructor;
    JSON: typeof JSON;
    Math: any;
    assert(condition: any): void;
    Reflect: any;
    zone: ZoneLike;
    Zone: ZoneLikeConstructor;
    getAngularTestability: Function;
    getAllAngularTestabilities: Function;
    getAllAngularRootElements: Function;
    frameworkStabilizers: Array<Function>;
    setTimeout: Function;
    clearTimeout: Function;
    setInterval: Function;
    clearInterval: Function;
  }
  export const IS_DART: boolean;
  var _global: BrowserNodeGlobal;
  export { _global as global };
  export var Type: FunctionConstructor;
  /**
   * Runtime representation a type that a Component or other object is instances of.
   *
   * An example of a `Type` is `MyCustomComponent` class, which in JavaScript is be represented by
   * the `MyCustomComponent` constructor function.
   */
  export interface Type extends Function {
  }
  /**
   * Runtime representation of a type that is constructable (non-abstract).
   */
  export interface ConcreteType extends Type {
    new (...args: any[]): any;
  }
  export function getTypeNameForDebugging(type: Type): string;
  export var Math: any;
  export var Date: DateConstructor;
  export function lockMode(): void;
  /**
   * Disable Angular's development mode, which turns off assertions and other
   * checks within the framework.
   *
   * One important assertion this disables verifies that a change detection pass
   * does not result in additional changes to any bindings (also known as
   * unidirectional data flow).
   */
  export function enableProdMode(): void;
  export function assertionsEnabled(): boolean;
  export function CONST_EXPR<T>(expr: T): T;
  export function CONST(): ClassDecorator & PropertyDecorator;
  export function isPresent(obj: any): boolean;
  export function isBlank(obj: any): boolean;
  export function isString(obj: any): boolean;
  export function isFunction(obj: any): boolean;
  export function isType(obj: any): boolean;
  export function isStringMap(obj: any): boolean;
  export function isPromise(obj: any): boolean;
  export function isArray(obj: any): boolean;
  export function isNumber(obj: any): boolean;
  export function isDate(obj: any): boolean;
  export function noop(): void;
  export function stringify(token: any): string;
  export function serializeEnum(val: any): number;
  export function deserializeEnum(val: any, values: Map<number, any>): any;
  export function resolveEnumToken(enumValue: any, val: any): string;
  export class StringWrapper {
    static fromCharCode(code: number): string;
    static charCodeAt(s: string, index: number): number;
    static split(s: string, regExp: RegExp): string[];
    static equals(s: string, s2: string): boolean;
    static stripLeft(s: string, charVal: string): string;
    static stripRight(s: string, charVal: string): string;
    static replace(s: string, from: string, replace: string): string;
    static replaceAll(s: string, from: RegExp, replace: string): string;
    static slice<T>(s: string, from?: number, to?: number): string;
    static replaceAllMapped(s: string, from: RegExp, cb: Function): string;
    static contains(s: string, substr: string): boolean;
    static compare(a: string, b: string): number;
  }
  export class StringJoiner {
    parts: any[];
    constructor(parts?: any[]);
    add(part: string): void;
    toString(): string;
  }
  export class NumberParseError extends Error {
    message: string;
    name: string;
    constructor(message: string);
    toString(): string;
  }
  export class NumberWrapper {
    static toFixed(n: number, fractionDigits: number): string;
    static equal(a: number, b: number): boolean;
    static parseIntAutoRadix(text: string): number;
    static parseInt(text: string, radix: number): number;
    static parseFloat(text: string): number;
    static NaN: number;
    static isNaN(value: any): boolean;
    static isInteger(value: any): boolean;
  }
  export var RegExp: RegExpConstructor;
  export class RegExpWrapper {
    static create(regExpStr: string, flags?: string): RegExp;
    static firstMatch(regExp: RegExp, input: string): RegExpExecArray;
    static test(regExp: RegExp, input: string): boolean;
    static matcher(regExp: RegExp, input: string): {
      re: RegExp;
      input: string;
    };
  }
  export class RegExpMatcherWrapper {
    static next(matcher: {
      re: RegExp;
      input: string;
    }): RegExpExecArray;
  }
  export class FunctionWrapper {
    static apply(fn: Function, posArgs: any): any;
  }
  export function looseIdentical(a: any, b: any): boolean;
  export function getMapKey<T>(value: T): T;
  export function normalizeBlank(obj: Object): any;
  export function normalizeBool(obj: boolean): boolean;
  export function isJsObject(o: any): boolean;
  export function print(obj: Error | Object): void;
  export class Json {
    static parse(s: string): Object;
    static stringify(data: Object): string;
  }
  export class DateWrapper {
    static create(year: number, month?: number, day?: number, hour?: number, minutes?: number, seconds?: number, milliseconds?: number): Date;
    static fromISOString(str: string): Date;
    static fromMillis(ms: number): Date;
    static toMillis(date: Date): number;
    static now(): Date;
    static toJson(date: Date): string;
  }
  export function setValueOnPath(global: any, path: string, value: any): void;
  export function getSymbolIterator(): string | symbol;
  export function evalExpression(sourceUrl: string, expr: string, declarations: string, vars: {
    [key: string]: any;
  }): any;
  export function isPrimitive(obj: any): boolean;
  export function hasConstructor(value: Object, type: Type): boolean;
  export function bitWiseOr(values: number[]): number;
  export function bitWiseAnd(values: number[]): number;
}
declare module "angular2/src/facade/promise" {
  export class PromiseCompleter<R> {
    promise: Promise<R>;
    resolve: (value?: R | PromiseLike<R>) => void;
    reject: (error?: any, stackTrace?: string) => void;
    constructor();
  }
  export class PromiseWrapper {
    static resolve<T>(obj: T): Promise<T>;
    static reject(obj: any, _: any): Promise<any>;
    static catchError<T>(promise: Promise<T>, onError: (error: any) => T | PromiseLike<T>): Promise<T>;
    static all<T>(promises: (T | Promise<T>)[]): Promise<T[]>;
    static then<T, U>(promise: Promise<T>, success: (value: T) => U | PromiseLike<U>, rejection?: (error: any, stack?: any) => U | PromiseLike<U>): Promise<U>;
    static wrap<T>(computation: () => T): Promise<T>;
    static scheduleMicrotask(computation: () => any): void;
    static isPromise(obj: any): boolean;
    static completer<T>(): PromiseCompleter<T>;
  }
}
declare module "angular2/src/facade/async" {
  export { PromiseWrapper, PromiseCompleter } from "angular2/src/facade/promise";
  import { Observable } from "rxjs/Observable";
  import { Subject } from "rxjs/Subject";
  export { Observable } from "rxjs/Observable";
  export { Subject } from "rxjs/Subject";
  export class TimerWrapper {
    static setTimeout(fn: (...args: any[]) => void, millis: number): number;
    static clearTimeout(id: number): void;
    static setInterval(fn: (...args: any[]) => void, millis: number): number;
    static clearInterval(id: number): void;
  }
  export class ObservableWrapper {
    static subscribe<T>(emitter: any, onNext: (value: T) => void, onError?: (exception: any) => void, onComplete?: () => void): Object;
    static isObservable(obs: any): boolean;
    /**
     * Returns whether `obs` has any subscribers listening to events.
     */
    static hasSubscribers(obs: EventEmitter<any>): boolean;
    static dispose(subscription: any): void;
    /**
     * @deprecated - use callEmit() instead
     */
    static callNext(emitter: EventEmitter<any>, value: any): void;
    static callEmit(emitter: EventEmitter<any>, value: any): void;
    static callError(emitter: EventEmitter<any>, error: any): void;
    static callComplete(emitter: EventEmitter<any>): void;
    static fromPromise(promise: Promise<any>): Observable<any>;
    static toPromise(obj: Observable<any>): Promise<any>;
  }
  /**
   * Use by directives and components to emit custom Events.
   *
   * ### Examples
   *
   * In the following example, `Zippy` alternatively emits `open` and `close` events when its
   * title gets clicked:
   *
   * ```
   * @Component({
   *   selector: 'zippy',
   *   template: `
   *   <div class="zippy">
   *     <div (click)="toggle()">Toggle</div>
   *     <div [hidden]="!visible">
   *       <ng-content></ng-content>
   *     </div>
   *  </div>`})
   * export class Zippy {
   *   visible: boolean = true;
   *   @Output() open: EventEmitter<any> = new EventEmitter();
   *   @Output() close: EventEmitter<any> = new EventEmitter();
   *
   *   toggle() {
   *     this.visible = !this.visible;
   *     if (this.visible) {
   *       this.open.emit(null);
   *     } else {
   *       this.close.emit(null);
   *     }
   *   }
   * }
   * ```
   *
   * Use Rx.Observable but provides an adapter to make it work as specified here:
   * https://github.com/jhusain/observable-spec
   *
   * Once a reference implementation of the spec is available, switch to it.
   */
  export class EventEmitter<T> extends Subject<T> {
    /** @internal */
    _isAsync: boolean;
    /**
     * Creates an instance of [EventEmitter], which depending on [isAsync],
     * delivers events synchronously or asynchronously.
     */
    constructor(isAsync?: boolean);
    emit(value: T): void;
    /**
     * @deprecated - use .emit(value) instead
     */
    next(value: any): void;
    subscribe(generatorOrNext?: any, error?: any, complete?: any): any;
  }
}
declare module "angular2/src/core/di/metadata" {
  /**
   * A parameter metadata that specifies a dependency.
   *
   * ### Example ([live demo](http://plnkr.co/edit/6uHYJK?p=preview))
   *
   * ```typescript
   * class Engine {}
   *
   * @Injectable()
   * class Car {
   *   engine;
   *   constructor(@Inject("MyEngine") engine:Engine) {
   *     this.engine = engine;
   *   }
   * }
   *
   * var injector = Injector.resolveAndCreate([
   *  provide("MyEngine", {useClass: Engine}),
   *  Car
   * ]);
   *
   * expect(injector.get(Car).engine instanceof Engine).toBe(true);
   * ```
   *
   * When `@Inject()` is not present, {@link Injector} will use the type annotation of the parameter.
   *
   * ### Example
   *
   * ```typescript
   * class Engine {}
   *
   * @Injectable()
   * class Car {
   *   constructor(public engine: Engine) {} //same as constructor(@Inject(Engine) engine:Engine)
   * }
   *
   * var injector = Injector.resolveAndCreate([Engine, Car]);
   * expect(injector.get(Car).engine instanceof Engine).toBe(true);
   * ```
   */
  export class InjectMetadata {
    token: any;
    constructor(token: any);
    toString(): string;
  }
  /**
   * A parameter metadata that marks a dependency as optional. {@link Injector} provides `null` if
   * the dependency is not found.
   *
   * ### Example ([live demo](http://plnkr.co/edit/AsryOm?p=preview))
   *
   * ```typescript
   * class Engine {}
   *
   * @Injectable()
   * class Car {
   *   engine;
   *   constructor(@Optional() engine:Engine) {
   *     this.engine = engine;
   *   }
   * }
   *
   * var injector = Injector.resolveAndCreate([Car]);
   * expect(injector.get(Car).engine).toBeNull();
   * ```
   */
  export class OptionalMetadata {
    toString(): string;
  }
  /**
   * `DependencyMetadata` is used by the framework to extend DI.
   * This is internal to Angular and should not be used directly.
   */
  export class DependencyMetadata {
    token: any;
  }
  /**
   * A marker metadata that marks a class as available to {@link Injector} for creation.
   *
   * ### Example ([live demo](http://plnkr.co/edit/Wk4DMQ?p=preview))
   *
   * ```typescript
   * @Injectable()
   * class UsefulService {}
   *
   * @Injectable()
   * class NeedsService {
   *   constructor(public service:UsefulService) {}
   * }
   *
   * var injector = Injector.resolveAndCreate([NeedsService, UsefulService]);
   * expect(injector.get(NeedsService).service instanceof UsefulService).toBe(true);
   * ```
   * {@link Injector} will throw {@link NoAnnotationError} when trying to instantiate a class that
   * does not have `@Injectable` marker, as shown in the example below.
   *
   * ```typescript
   * class UsefulService {}
   *
   * class NeedsService {
   *   constructor(public service:UsefulService) {}
   * }
   *
   * var injector = Injector.resolveAndCreate([NeedsService, UsefulService]);
   * expect(() => injector.get(NeedsService)).toThrowError();
   * ```
   */
  export class InjectableMetadata {
    constructor();
  }
  /**
   * Specifies that an {@link Injector} should retrieve a dependency only from itself.
   *
   * ### Example ([live demo](http://plnkr.co/edit/NeagAg?p=preview))
   *
   * ```typescript
   * class Dependency {
   * }
   *
   * @Injectable()
   * class NeedsDependency {
   *   dependency;
   *   constructor(@Self() dependency:Dependency) {
   *     this.dependency = dependency;
   *   }
   * }
   *
   * var inj = Injector.resolveAndCreate([Dependency, NeedsDependency]);
   * var nd = inj.get(NeedsDependency);
   *
   * expect(nd.dependency instanceof Dependency).toBe(true);
   *
   * var inj = Injector.resolveAndCreate([Dependency]);
   * var child = inj.resolveAndCreateChild([NeedsDependency]);
   * expect(() => child.get(NeedsDependency)).toThrowError();
   * ```
   */
  export class SelfMetadata {
    toString(): string;
  }
  /**
   * Specifies that the dependency resolution should start from the parent injector.
   *
   * ### Example ([live demo](http://plnkr.co/edit/Wchdzb?p=preview))
   *
   * ```typescript
   * class Dependency {
   * }
   *
   * @Injectable()
   * class NeedsDependency {
   *   dependency;
   *   constructor(@SkipSelf() dependency:Dependency) {
   *     this.dependency = dependency;
   *   }
   * }
   *
   * var parent = Injector.resolveAndCreate([Dependency]);
   * var child = parent.resolveAndCreateChild([NeedsDependency]);
   * expect(child.get(NeedsDependency).dependency instanceof Depedency).toBe(true);
   *
   * var inj = Injector.resolveAndCreate([Dependency, NeedsDependency]);
   * expect(() => inj.get(NeedsDependency)).toThrowError();
   * ```
   */
  export class SkipSelfMetadata {
    toString(): string;
  }
  /**
   * Specifies that an injector should retrieve a dependency from any injector until reaching the
   * closest host.
   *
   * In Angular, a component element is automatically declared as a host for all the injectors in
   * its view.
   *
   * ### Example ([live demo](http://plnkr.co/edit/GX79pV?p=preview))
   *
   * In the following example `App` contains `ParentCmp`, which contains `ChildDirective`.
   * So `ParentCmp` is the host of `ChildDirective`.
   *
   * `ChildDirective` depends on two services: `HostService` and `OtherService`.
   * `HostService` is defined at `ParentCmp`, and `OtherService` is defined at `App`.
   *
   *```typescript
   * class OtherService {}
   * class HostService {}
   *
   * @Directive({
   *   selector: 'child-directive'
   * })
   * class ChildDirective {
   *   constructor(@Optional() @Host() os:OtherService, @Optional() @Host() hs:HostService){
   *     console.log("os is null", os);
   *     console.log("hs is NOT null", hs);
   *   }
   * }
   *
   * @Component({
   *   selector: 'parent-cmp',
   *   providers: [HostService],
   *   template: `
   *     Dir: <child-directive></child-directive>
   *   `,
   *   directives: [ChildDirective]
   * })
   * class ParentCmp {
   * }
   *
   * @Component({
   *   selector: 'app',
   *   providers: [OtherService],
   *   template: `
   *     Parent: <parent-cmp></parent-cmp>
   *   `,
   *   directives: [ParentCmp]
   * })
   * class App {
   * }
   *
   * bootstrap(App);
   *```
   */
  export class HostMetadata {
    toString(): string;
  }
}
declare module "angular2/src/core/util/decorators" {
  import { ConcreteType, Type } from "angular2/src/facade/lang";
  /**
   * Declares the interface to be used with {@link Class}.
   */
  export interface ClassDefinition {
    /**
     * Optional argument for specifying the superclass.
     */
    extends?: Type;
    /**
     * Required constructor function for a class.
     *
     * The function may be optionally wrapped in an `Array`, in which case additional parameter
     * annotations may be specified.
     * The number of arguments and the number of parameter annotations must match.
     *
     * See {@link Class} for example of usage.
     */
    constructor: Function | any[];
    /**
     * Other methods on the class. Note that values should have type 'Function' but TS requires
     * all properties to have a narrower type than the index signature.
     */
    [x: string]: Type | Function | any[];
  }
  /**
   * An interface implemented by all Angular type decorators, which allows them to be used as ES7
   * decorators as well as
   * Angular DSL syntax.
   *
   * DSL syntax:
   *
   * ```
   * var MyClass = ng
   *   .Component({...})
   *   .View({...})
   *   .Class({...});
   * ```
   *
   * ES7 syntax:
   *
   * ```
   * @ng.Component({...})
   * @ng.View({...})
   * class MyClass {...}
   * ```
   */
  export interface TypeDecorator {
    /**
     * Invoke as ES7 decorator.
     */
    <T extends Type>(type: T): T;
    (target: Object, propertyKey?: string | symbol, parameterIndex?: number): void;
    /**
     * Storage for the accumulated annotations so far used by the DSL syntax.
     *
     * Used by {@link Class} to annotate the generated class.
     */
    annotations: any[];
    /**
     * Generate a class from the definition and annotate it with {@link TypeDecorator#annotations}.
     */
    Class(obj: ClassDefinition): ConcreteType;
  }
  /**
   * Provides a way for expressing ES6 classes with parameter annotations in ES5.
   *
   * ## Basic Example
   *
   * ```
   * var Greeter = ng.Class({
   *   constructor: function(name) {
   *     this.name = name;
   *   },
   *
   *   greet: function() {
   *     alert('Hello ' + this.name + '!');
   *   }
   * });
   * ```
   *
   * is equivalent to ES6:
   *
   * ```
   * class Greeter {
   *   constructor(name) {
   *     this.name = name;
   *   }
   *
   *   greet() {
   *     alert('Hello ' + this.name + '!');
   *   }
   * }
   * ```
   *
   * or equivalent to ES5:
   *
   * ```
   * var Greeter = function (name) {
   *   this.name = name;
   * }
   *
   * Greeter.prototype.greet = function () {
   *   alert('Hello ' + this.name + '!');
   * }
   * ```
   *
   * ### Example with parameter annotations
   *
   * ```
   * var MyService = ng.Class({
   *   constructor: [String, [new Query(), QueryList], function(name, queryList) {
   *     ...
   *   }]
   * });
   * ```
   *
   * is equivalent to ES6:
   *
   * ```
   * class MyService {
   *   constructor(name: string, @Query() queryList: QueryList) {
   *     ...
   *   }
   * }
   * ```
   *
   * ### Example with inheritance
   *
   * ```
   * var Shape = ng.Class({
   *   constructor: (color) {
   *     this.color = color;
   *   }
   * });
   *
   * var Square = ng.Class({
   *   extends: Shape,
   *   constructor: function(color, size) {
   *     Shape.call(this, color);
   *     this.size = size;
   *   }
   * });
   * ```
   */
  export function Class(clsDef: ClassDefinition): ConcreteType;
  export function makeDecorator(annotationCls: any, chainFn?: (fn: Function) => void): (...args: any[]) => (cls: any) => any;
  export function makeParamDecorator(annotationCls: any): any;
  export function makePropDecorator(decoratorCls: any): any;
}
declare module "angular2/src/core/di/decorators" {
  import { InjectMetadata, OptionalMetadata, InjectableMetadata, SelfMetadata, HostMetadata, SkipSelfMetadata } from "angular2/src/core/di/metadata";
  /**
   * Factory for creating {@link InjectMetadata}.
   */
  export interface InjectFactory {
    (token: any): any;
    new (token: any): InjectMetadata;
  }
  /**
   * Factory for creating {@link OptionalMetadata}.
   */
  export interface OptionalFactory {
    (): any;
    new (): OptionalMetadata;
  }
  /**
   * Factory for creating {@link InjectableMetadata}.
   */
  export interface InjectableFactory {
    (): any;
    new (): InjectableMetadata;
  }
  /**
   * Factory for creating {@link SelfMetadata}.
   */
  export interface SelfFactory {
    (): any;
    new (): SelfMetadata;
  }
  /**
   * Factory for creating {@link HostMetadata}.
   */
  export interface HostFactory {
    (): any;
    new (): HostMetadata;
  }
  /**
   * Factory for creating {@link SkipSelfMetadata}.
   */
  export interface SkipSelfFactory {
    (): any;
    new (): SkipSelfMetadata;
  }
  /**
   * Factory for creating {@link InjectMetadata}.
   */
  export var Inject: InjectFactory;
  /**
   * Factory for creating {@link OptionalMetadata}.
   */
  export var Optional: OptionalFactory;
  /**
   * Factory for creating {@link InjectableMetadata}.
   */
  export var Injectable: InjectableFactory;
  /**
   * Factory for creating {@link SelfMetadata}.
   */
  export var Self: SelfFactory;
  /**
   * Factory for creating {@link HostMetadata}.
   */
  export var Host: HostFactory;
  /**
   * Factory for creating {@link SkipSelfMetadata}.
   */
  export var SkipSelf: SkipSelfFactory;
}
declare module "angular2/src/core/di/forward_ref" {
  import { Type } from "angular2/src/facade/lang";
  /**
   * An interface that a function passed into {@link forwardRef} has to implement.
   *
   * ### Example
   *
   * {@example core/di/ts/forward_ref/forward_ref.ts region='forward_ref_fn'}
   */
  export interface ForwardRefFn {
    (): any;
  }
  /**
   * Allows to refer to references which are not yet defined.
   *
   * For instance, `forwardRef` is used when the `token` which we need to refer to for the purposes of
   * DI is declared,
   * but not yet defined. It is also used when the `token` which we use when creating a query is not
   * yet defined.
   *
   * ### Example
   * {@example core/di/ts/forward_ref/forward_ref.ts region='forward_ref'}
   */
  export function forwardRef(forwardRefFn: ForwardRefFn): Type;
  /**
   * Lazily retrieves the reference value from a forwardRef.
   *
   * Acts as the identity function when given a non-forward-ref value.
   *
   * ### Example ([live demo](http://plnkr.co/edit/GU72mJrk1fiodChcmiDR?p=preview))
   *
   * ```typescript
   * var ref = forwardRef(() => "refValue");
   * expect(resolveForwardRef(ref)).toEqual("refValue");
   * expect(resolveForwardRef("regularValue")).toEqual("regularValue");
   * ```
   *
   * See: {@link forwardRef}
   */
  export function resolveForwardRef(type: any): any;
}
declare module "angular2/src/facade/collection" {
  export var Map: MapConstructor;
  export var Set: SetConstructor;
  export class MapWrapper {
    static clone<K, V>(m: Map<K, V>): Map<K, V>;
    static createFromStringMap<T>(stringMap: {
      [key: string]: T;
    }): Map<string, T>;
    static toStringMap<T>(m: Map<string, T>): {
      [key: string]: T;
    };
    static createFromPairs(pairs: any[]): Map<any, any>;
    static clearValues(m: Map<any, any>): void;
    static iterable<T>(m: T): T;
    static keys<K>(m: Map<K, any>): K[];
    static values<V>(m: Map<any, V>): V[];
  }
  /**
   * Wraps Javascript Objects
   */
  export class StringMapWrapper {
    static create(): {
      [k: string]: any;
    };
    static contains(map: {
      [key: string]: any;
    }, key: string): boolean;
    static get<V>(map: {
      [key: string]: V;
    }, key: string): V;
    static set<V>(map: {
      [key: string]: V;
    }, key: string, value: V): void;
    static keys(map: {
      [key: string]: any;
    }): string[];
    static isEmpty(map: {
      [key: string]: any;
    }): boolean;
    static delete(map: {
      [key: string]: any;
    }, key: string): void;
    static forEach<K, V>(map: {
      [key: string]: V;
    }, callback: Function): void;
    static merge<V>(m1: {
      [key: string]: V;
    }, m2: {
      [key: string]: V;
    }): {
        [key: string]: V;
      };
    static equals<V>(m1: {
      [key: string]: V;
    }, m2: {
      [key: string]: V;
    }): boolean;
  }
  /**
   * A boolean-valued function over a value, possibly including context information
   * regarding that value's position in an array.
   */
  export interface Predicate<T> {
    (value: T, index?: number, array?: T[]): boolean;
  }
  export class ListWrapper {
    static createFixedSize(size: number): any[];
    static createGrowableSize(size: number): any[];
    static clone<T>(array: T[]): T[];
    static createImmutable<T>(array: T[]): T[];
    static forEachWithIndex<T>(array: T[], fn: (t: T, n: number) => void): void;
    static first<T>(array: T[]): T;
    static last<T>(array: T[]): T;
    static indexOf<T>(array: T[], value: T, startIndex?: number): number;
    static contains<T>(list: T[], el: T): boolean;
    static reversed<T>(array: T[]): T[];
    static concat(a: any[], b: any[]): any[];
    static insert<T>(list: T[], index: number, value: T): void;
    static removeAt<T>(list: T[], index: number): T;
    static removeAll<T>(list: T[], items: T[]): void;
    static remove<T>(list: T[], el: T): boolean;
    static clear(list: any[]): void;
    static isEmpty(list: any[]): boolean;
    static fill(list: any[], value: any, start?: number, end?: number): void;
    static equals(a: any[], b: any[]): boolean;
    static slice<T>(l: T[], from?: number, to?: number): T[];
    static splice<T>(l: T[], from: number, length: number): T[];
    static sort<T>(l: T[], compareFn?: (a: T, b: T) => number): void;
    static toString<T>(l: T[]): string;
    static toJSON<T>(l: T[]): string;
    static maximum<T>(list: T[], predicate: (t: T) => number): T;
    static isImmutable(list: any[]): boolean;
  }
  export function isListLikeIterable(obj: any): boolean;
  export function areIterablesEqual(a: any, b: any, comparator: Function): boolean;
  export function iterateListLike(obj: any, fn: Function): void;
  export class SetWrapper {
    static createFromList<T>(lst: T[]): Set<T>;
    static has<T>(s: Set<T>, key: T): boolean;
    static delete<K>(m: Set<K>, k: K): void;
  }
}
declare module "angular2/src/facade/base_wrapped_exception" {
  /**
   * A base class for the WrappedException that can be used to identify
   * a WrappedException from ExceptionHandler without adding circular
   * dependency.
   */
  export class BaseWrappedException extends Error {
    constructor(message: string);
    wrapperMessage: string;
    wrapperStack: any;
    originalException: any;
    originalStack: any;
    context: any;
    message: string;
  }
}
declare module "angular2/src/facade/exception_handler" {
  /**
   * Provides a hook for centralized exception handling.
   *
   * The default implementation of `ExceptionHandler` prints error messages to the `Console`. To
   * intercept error handling,
   * write a custom exception handler that replaces this default as appropriate for your app.
   *
   * ### Example
   *
   * ```javascript
   *
   * class MyExceptionHandler implements ExceptionHandler {
   *   call(error, stackTrace = null, reason = null) {
   *     // do something with the exception
   *   }
   * }
   *
   * bootstrap(MyApp, [provide(ExceptionHandler, {useClass: MyExceptionHandler})])
   *
   * ```
   */
  export class ExceptionHandler {
    private _logger;
    private _rethrowException;
    constructor(_logger: any, _rethrowException?: boolean);
    static exceptionToString(exception: any, stackTrace?: any, reason?: string): string;
    call(exception: any, stackTrace?: any, reason?: string): void;
    /** @internal */
    _extractMessage(exception: any): string;
    /** @internal */
    _longStackTrace(stackTrace: any): any;
    /** @internal */
    _findContext(exception: any): any;
    /** @internal */
    _findOriginalException(exception: any): any;
    /** @internal */
    _findOriginalStack(exception: any): any;
  }
}
declare module "angular2/src/facade/exceptions" {
  import { BaseWrappedException } from "angular2/src/facade/base_wrapped_exception";
  export { ExceptionHandler } from "angular2/src/facade/exception_handler";
  export class BaseException extends Error {
    message: string;
    stack: any;
    constructor(message?: string);
    toString(): string;
  }
  /**
   * Wraps an exception and provides additional context or information.
   */
  export class WrappedException extends BaseWrappedException {
    private _wrapperMessage;
    private _originalException;
    private _originalStack;
    private _context;
    private _wrapperStack;
    constructor(_wrapperMessage: string, _originalException: any, _originalStack?: any, _context?: any);
    wrapperMessage: string;
    wrapperStack: any;
    originalException: any;
    originalStack: any;
    context: any;
    message: string;
    toString(): string;
  }
  export function makeTypeError(message?: string): Error;
  export function unimplemented(): any;
}
declare module "angular2/src/core/reflection/types" {
  export type SetterFn = (obj: any, value: any) => void;
  export type GetterFn = (obj: any) => any;
  export type MethodFn = (obj: any, args: any[]) => any;
}
declare module "angular2/src/core/reflection/platform_reflection_capabilities" {
  import { Type } from "angular2/src/facade/lang";
  import { GetterFn, SetterFn, MethodFn } from "angular2/src/core/reflection/types";
  export interface PlatformReflectionCapabilities {
    isReflectionEnabled(): boolean;
    factory(type: Type): Function;
    interfaces(type: Type): any[];
    parameters(type: any): any[][];
    annotations(type: any): any[];
    propMetadata(typeOrFunc: any): {
      [key: string]: any[];
    };
    getter(name: string): GetterFn;
    setter(name: string): SetterFn;
    method(name: string): MethodFn;
    importUri(type: Type): string;
  }
}
declare module "angular2/src/core/reflection/reflector" {
  import { Type } from "angular2/src/facade/lang";
  import { SetterFn, GetterFn, MethodFn } from "angular2/src/core/reflection/types";
  import { PlatformReflectionCapabilities } from "angular2/src/core/reflection/platform_reflection_capabilities";
  export { SetterFn, GetterFn, MethodFn } from "angular2/src/core/reflection/types";
  export { PlatformReflectionCapabilities } from "angular2/src/core/reflection/platform_reflection_capabilities";
  /**
   * Reflective information about a symbol, including annotations, interfaces, and other metadata.
   */
  export class ReflectionInfo {
    annotations: any[];
    parameters: any[][];
    factory: Function;
    interfaces: any[];
    propMetadata: {
      [key: string]: any[];
    };
    constructor(annotations?: any[], parameters?: any[][], factory?: Function, interfaces?: any[], propMetadata?: {
      [key: string]: any[];
    });
  }
  /**
   * Provides access to reflection data about symbols. Used internally by Angular
   * to power dependency injection and compilation.
   */
  export class Reflector {
    /** @internal */
    _injectableInfo: Map<any, ReflectionInfo>;
    /** @internal */
    _getters: Map<string, (obj: any) => any>;
    /** @internal */
    _setters: Map<string, (obj: any, value: any) => void>;
    /** @internal */
    _methods: Map<string, (obj: any, args: any[]) => any>;
    /** @internal */
    _usedKeys: Set<any>;
    reflectionCapabilities: PlatformReflectionCapabilities;
    constructor(reflectionCapabilities: PlatformReflectionCapabilities);
    isReflectionEnabled(): boolean;
    /**
     * Causes `this` reflector to track keys used to access
     * {@link ReflectionInfo} objects.
     */
    trackUsage(): void;
    /**
     * Lists types for which reflection information was not requested since
     * {@link #trackUsage} was called. This list could later be audited as
     * potential dead code.
     */
    listUnusedKeys(): any[];
    registerFunction(func: Function, funcInfo: ReflectionInfo): void;
    registerType(type: Type, typeInfo: ReflectionInfo): void;
    registerGetters(getters: {
      [key: string]: GetterFn;
    }): void;
    registerSetters(setters: {
      [key: string]: SetterFn;
    }): void;
    registerMethods(methods: {
      [key: string]: MethodFn;
    }): void;
    factory(type: Type): Function;
    parameters(typeOrFunc: any): any[][];
    annotations(typeOrFunc: any): any[];
    propMetadata(typeOrFunc: any): {
      [key: string]: any[];
    };
    interfaces(type: Type): any[];
    getter(name: string): GetterFn;
    setter(name: string): SetterFn;
    method(name: string): MethodFn;
    /** @internal */
    _getReflectionInfo(typeOrFunc: any): ReflectionInfo;
    /** @internal */
    _containsReflectionInfo(typeOrFunc: any): boolean;
    importUri(type: Type): string;
  }
}
declare module "angular2/src/core/reflection/reflection_capabilities" {
  import { Type, ConcreteType } from "angular2/src/facade/lang";
  import { GetterFn, SetterFn, MethodFn } from "angular2/src/core/reflection/types";
  import { PlatformReflectionCapabilities } from "angular2/src/core/reflection/platform_reflection_capabilities";
  export class ReflectionCapabilities implements PlatformReflectionCapabilities {
    private _reflect;
    constructor(reflect?: any);
    isReflectionEnabled(): boolean;
    factory(t: ConcreteType): Function;
    /** @internal */
    _zipTypesAndAnnotations(paramTypes: any, paramAnnotations: any): any[][];
    parameters(typeOrFunc: Type): any[][];
    annotations(typeOrFunc: Type): any[];
    propMetadata(typeOrFunc: any): {
      [key: string]: any[];
    };
    interfaces(type: Type): any[];
    getter(name: string): GetterFn;
    setter(name: string): SetterFn;
    method(name: string): MethodFn;
    importUri(type: Type): string;
  }
}
declare module "angular2/src/core/reflection/reflection" {
  import { Reflector } from "angular2/src/core/reflection/reflector";
  export { Reflector, ReflectionInfo } from "angular2/src/core/reflection/reflector";
  /**
   * The {@link Reflector} used internally in Angular to access metadata
   * about symbols.
   */
  export var reflector: Reflector;
}
declare module "angular2/src/core/di/key" {
  /**
   * A unique object used for retrieving items from the {@link Injector}.
   *
   * Keys have:
   * - a system-wide unique `id`.
   * - a `token`.
   *
   * `Key` is used internally by {@link Injector} because its system-wide unique `id` allows the
   * injector to store created objects in a more efficient way.
   *
   * `Key` should not be created directly. {@link Injector} creates keys automatically when resolving
   * providers.
   */
  export class Key {
    token: Object;
    id: number;
    /**
     * Private
     */
    constructor(token: Object, id: number);
    /**
     * Returns a stringified token.
     */
    displayName: string;
    /**
     * Retrieves a `Key` for a token.
     */
    static get(token: Object): Key;
    /**
     * @returns the number of keys registered in the system.
     */
    static numberOfKeys: number;
  }
  /**
   * @internal
   */
  export class KeyRegistry {
    private _allKeys;
    get(token: Object): Key;
    numberOfKeys: number;
  }
}
declare module "angular2/src/core/di/exceptions" {
  import { BaseException, WrappedException } from "angular2/src/facade/exceptions";
  import { Key } from "angular2/src/core/di/key";
  import { Injector } from "angular2/src/core/di/injector";
  /**
   * Base class for all errors arising from misconfigured providers.
   */
  export class AbstractProviderError extends BaseException {
    /** @internal */
    message: string;
    /** @internal */
    keys: Key[];
    /** @internal */
    injectors: Injector[];
    /** @internal */
    constructResolvingMessage: Function;
    constructor(injector: Injector, key: Key, constructResolvingMessage: Function);
    addKey(injector: Injector, key: Key): void;
    context: any;
  }
  /**
   * Thrown when trying to retrieve a dependency by `Key` from {@link Injector}, but the
   * {@link Injector} does not have a {@link Provider} for {@link Key}.
   *
   * ### Example ([live demo](http://plnkr.co/edit/vq8D3FRB9aGbnWJqtEPE?p=preview))
   *
   * ```typescript
   * class A {
   *   constructor(b:B) {}
   * }
   *
   * expect(() => Injector.resolveAndCreate([A])).toThrowError();
   * ```
   */
  export class NoProviderError extends AbstractProviderError {
    constructor(injector: Injector, key: Key);
  }
  /**
   * Thrown when dependencies form a cycle.
   *
   * ### Example ([live demo](http://plnkr.co/edit/wYQdNos0Tzql3ei1EV9j?p=info))
   *
   * ```typescript
   * var injector = Injector.resolveAndCreate([
   *   provide("one", {useFactory: (two) => "two", deps: [[new Inject("two")]]}),
   *   provide("two", {useFactory: (one) => "one", deps: [[new Inject("one")]]})
   * ]);
   *
   * expect(() => injector.get("one")).toThrowError();
   * ```
   *
   * Retrieving `A` or `B` throws a `CyclicDependencyError` as the graph above cannot be constructed.
   */
  export class CyclicDependencyError extends AbstractProviderError {
    constructor(injector: Injector, key: Key);
  }
  /**
   * Thrown when a constructing type returns with an Error.
   *
   * The `InstantiationError` class contains the original error plus the dependency graph which caused
   * this object to be instantiated.
   *
   * ### Example ([live demo](http://plnkr.co/edit/7aWYdcqTQsP0eNqEdUAf?p=preview))
   *
   * ```typescript
   * class A {
   *   constructor() {
   *     throw new Error('message');
   *   }
   * }
   *
   * var injector = Injector.resolveAndCreate([A]);
  
   * try {
   *   injector.get(A);
   * } catch (e) {
   *   expect(e instanceof InstantiationError).toBe(true);
   *   expect(e.originalException.message).toEqual("message");
   *   expect(e.originalStack).toBeDefined();
   * }
   * ```
   */
  export class InstantiationError extends WrappedException {
    /** @internal */
    keys: Key[];
    /** @internal */
    injectors: Injector[];
    constructor(injector: Injector, originalException: any, originalStack: any, key: Key);
    addKey(injector: Injector, key: Key): void;
    wrapperMessage: string;
    causeKey: Key;
    context: any;
  }
  /**
   * Thrown when an object other then {@link Provider} (or `Type`) is passed to {@link Injector}
   * creation.
   *
   * ### Example ([live demo](http://plnkr.co/edit/YatCFbPAMCL0JSSQ4mvH?p=preview))
   *
   * ```typescript
   * expect(() => Injector.resolveAndCreate(["not a type"])).toThrowError();
   * ```
   */
  export class InvalidProviderError extends BaseException {
    constructor(provider: any);
  }
  /**
   * Thrown when the class has no annotation information.
   *
   * Lack of annotation information prevents the {@link Injector} from determining which dependencies
   * need to be injected into the constructor.
   *
   * ### Example ([live demo](http://plnkr.co/edit/rHnZtlNS7vJOPQ6pcVkm?p=preview))
   *
   * ```typescript
   * class A {
   *   constructor(b) {}
   * }
   *
   * expect(() => Injector.resolveAndCreate([A])).toThrowError();
   * ```
   *
   * This error is also thrown when the class not marked with {@link Injectable} has parameter types.
   *
   * ```typescript
   * class B {}
   *
   * class A {
   *   constructor(b:B) {} // no information about the parameter types of A is available at runtime.
   * }
   *
   * expect(() => Injector.resolveAndCreate([A,B])).toThrowError();
   * ```
   */
  export class NoAnnotationError extends BaseException {
    constructor(typeOrFunc: any, params: any[][]);
    private static _genMessage(typeOrFunc, params);
  }
  /**
   * Thrown when getting an object by index.
   *
   * ### Example ([live demo](http://plnkr.co/edit/bRs0SX2OTQiJzqvjgl8P?p=preview))
   *
   * ```typescript
   * class A {}
   *
   * var injector = Injector.resolveAndCreate([A]);
   *
   * expect(() => injector.getAt(100)).toThrowError();
   * ```
   */
  export class OutOfBoundsError extends BaseException {
    constructor(index: any);
  }
  /**
   * Thrown when a multi provider and a regular provider are bound to the same token.
   *
   * ### Example
   *
   * ```typescript
   * expect(() => Injector.resolveAndCreate([
   *   new Provider("Strings", {useValue: "string1", multi: true}),
   *   new Provider("Strings", {useValue: "string2", multi: false})
   * ])).toThrowError();
   * ```
   */
  export class MixingMultiProvidersWithRegularProvidersError extends BaseException {
    constructor(provider1: any, provider2: any);
  }
}
declare module "angular2/src/core/di/provider" {
  import { Type } from "angular2/src/facade/lang";
  import { Key } from "angular2/src/core/di/key";
  /**
   * `Dependency` is used by the framework to extend DI.
   * This is internal to Angular and should not be used directly.
   */
  export class Dependency {
    key: Key;
    optional: boolean;
    lowerBoundVisibility: any;
    upperBoundVisibility: any;
    properties: any[];
    constructor(key: Key, optional: boolean, lowerBoundVisibility: any, upperBoundVisibility: any, properties: any[]);
    static fromKey(key: Key): Dependency;
  }
  /**
   * Describes how the {@link Injector} should instantiate a given token.
   *
   * See {@link provide}.
   *
   * ### Example ([live demo](http://plnkr.co/edit/GNAyj6K6PfYg2NBzgwZ5?p%3Dpreview&p=preview))
   *
   * ```javascript
   * var injector = Injector.resolveAndCreate([
   *   new Provider("message", { useValue: 'Hello' })
   * ]);
   *
   * expect(injector.get("message")).toEqual('Hello');
   * ```
   */
  export class Provider {
    /**
     * Token used when retrieving this provider. Usually, it is a type {@link Type}.
     */
    token: any;
    /**
     * Binds a DI token to an implementation class.
     *
     * ### Example ([live demo](http://plnkr.co/edit/RSTG86qgmoxCyj9SWPwY?p=preview))
     *
     * Because `useExisting` and `useClass` are often confused, the example contains
     * both use cases for easy comparison.
     *
     * ```typescript
     * class Vehicle {}
     *
     * class Car extends Vehicle {}
     *
     * var injectorClass = Injector.resolveAndCreate([
     *   Car,
     *   new Provider(Vehicle, { useClass: Car })
     * ]);
     * var injectorAlias = Injector.resolveAndCreate([
     *   Car,
     *   new Provider(Vehicle, { useExisting: Car })
     * ]);
     *
     * expect(injectorClass.get(Vehicle)).not.toBe(injectorClass.get(Car));
     * expect(injectorClass.get(Vehicle) instanceof Car).toBe(true);
     *
     * expect(injectorAlias.get(Vehicle)).toBe(injectorAlias.get(Car));
     * expect(injectorAlias.get(Vehicle) instanceof Car).toBe(true);
     * ```
     */
    useClass: Type;
    /**
     * Binds a DI token to a value.
     *
     * ### Example ([live demo](http://plnkr.co/edit/UFVsMVQIDe7l4waWziES?p=preview))
     *
     * ```javascript
     * var injector = Injector.resolveAndCreate([
     *   new Provider("message", { useValue: 'Hello' })
     * ]);
     *
     * expect(injector.get("message")).toEqual('Hello');
     * ```
     */
    useValue: any;
    /**
     * Binds a DI token to an existing token.
     *
     * {@link Injector} returns the same instance as if the provided token was used.
     * This is in contrast to `useClass` where a separate instance of `useClass` is returned.
     *
     * ### Example ([live demo](http://plnkr.co/edit/QsatsOJJ6P8T2fMe9gr8?p=preview))
     *
     * Because `useExisting` and `useClass` are often confused the example contains
     * both use cases for easy comparison.
     *
     * ```typescript
     * class Vehicle {}
     *
     * class Car extends Vehicle {}
     *
     * var injectorAlias = Injector.resolveAndCreate([
     *   Car,
     *   new Provider(Vehicle, { useExisting: Car })
     * ]);
     * var injectorClass = Injector.resolveAndCreate([
     *   Car,
     *   new Provider(Vehicle, { useClass: Car })
     * ]);
     *
     * expect(injectorAlias.get(Vehicle)).toBe(injectorAlias.get(Car));
     * expect(injectorAlias.get(Vehicle) instanceof Car).toBe(true);
     *
     * expect(injectorClass.get(Vehicle)).not.toBe(injectorClass.get(Car));
     * expect(injectorClass.get(Vehicle) instanceof Car).toBe(true);
     * ```
     */
    useExisting: any;
    /**
     * Binds a DI token to a function which computes the value.
     *
     * ### Example ([live demo](http://plnkr.co/edit/Scoxy0pJNqKGAPZY1VVC?p=preview))
     *
     * ```typescript
     * var injector = Injector.resolveAndCreate([
     *   new Provider(Number, { useFactory: () => { return 1+2; }}),
     *   new Provider(String, { useFactory: (value) => { return "Value: " + value; },
     *                       deps: [Number] })
     * ]);
     *
     * expect(injector.get(Number)).toEqual(3);
     * expect(injector.get(String)).toEqual('Value: 3');
     * ```
     *
     * Used in conjunction with dependencies.
     */
    useFactory: Function;
    /**
     * Specifies a set of dependencies
     * (as `token`s) which should be injected into the factory function.
     *
     * ### Example ([live demo](http://plnkr.co/edit/Scoxy0pJNqKGAPZY1VVC?p=preview))
     *
     * ```typescript
     * var injector = Injector.resolveAndCreate([
     *   new Provider(Number, { useFactory: () => { return 1+2; }}),
     *   new Provider(String, { useFactory: (value) => { return "Value: " + value; },
     *                       deps: [Number] })
     * ]);
     *
     * expect(injector.get(Number)).toEqual(3);
     * expect(injector.get(String)).toEqual('Value: 3');
     * ```
     *
     * Used in conjunction with `useFactory`.
     */
    dependencies: Object[];
    /** @internal */
    _multi: boolean;
    constructor(token: any, {useClass, useValue, useExisting, useFactory, deps, multi}: {
      useClass?: Type;
      useValue?: any;
      useExisting?: any;
      useFactory?: Function;
      deps?: Object[];
      multi?: boolean;
    });
    /**
     * Creates multiple providers matching the same token (a multi-provider).
     *
     * Multi-providers are used for creating pluggable service, where the system comes
     * with some default providers, and the user can register additional providers.
     * The combination of the default providers and the additional providers will be
     * used to drive the behavior of the system.
     *
     * ### Example
     *
     * ```typescript
     * var injector = Injector.resolveAndCreate([
     *   new Provider("Strings", { useValue: "String1", multi: true}),
     *   new Provider("Strings", { useValue: "String2", multi: true})
     * ]);
     *
     * expect(injector.get("Strings")).toEqual(["String1", "String2"]);
     * ```
     *
     * Multi-providers and regular providers cannot be mixed. The following
     * will throw an exception:
     *
     * ```typescript
     * var injector = Injector.resolveAndCreate([
     *   new Provider("Strings", { useValue: "String1", multi: true }),
     *   new Provider("Strings", { useValue: "String2"})
     * ]);
     * ```
     */
    multi: boolean;
  }
  /**
   * See {@link Provider} instead.
   *
   * @deprecated
   */
  export class Binding extends Provider {
    constructor(token: any, {toClass, toValue, toAlias, toFactory, deps, multi}: {
      toClass?: Type;
      toValue?: any;
      toAlias?: any;
      toFactory: Function;
      deps?: Object[];
      multi?: boolean;
    });
    /**
     * @deprecated
     */
    toClass: Type;
    /**
     * @deprecated
     */
    toAlias: any;
    /**
     * @deprecated
     */
    toFactory: Function;
    /**
     * @deprecated
     */
    toValue: any;
  }
  /**
   * An internal resolved representation of a {@link Provider} used by the {@link Injector}.
   *
   * It is usually created automatically by `Injector.resolveAndCreate`.
   *
   * It can be created manually, as follows:
   *
   * ### Example ([live demo](http://plnkr.co/edit/RfEnhh8kUEI0G3qsnIeT?p%3Dpreview&p=preview))
   *
   * ```typescript
   * var resolvedProviders = Injector.resolve([new Provider('message', {useValue: 'Hello'})]);
   * var injector = Injector.fromResolvedProviders(resolvedProviders);
   *
   * expect(injector.get('message')).toEqual('Hello');
   * ```
   */
  export interface ResolvedProvider {
    /**
     * A key, usually a `Type`.
     */
    key: Key;
    /**
     * Factory function which can return an instance of an object represented by a key.
     */
    resolvedFactories: ResolvedFactory[];
    /**
     * Indicates if the provider is a multi-provider or a regular provider.
     */
    multiProvider: boolean;
  }
  /**
   * See {@link ResolvedProvider} instead.
   *
   * @deprecated
   */
  export interface ResolvedBinding extends ResolvedProvider {
  }
  export class ResolvedProvider_ implements ResolvedBinding {
    key: Key;
    resolvedFactories: ResolvedFactory[];
    multiProvider: boolean;
    constructor(key: Key, resolvedFactories: ResolvedFactory[], multiProvider: boolean);
    resolvedFactory: ResolvedFactory;
  }
  /**
   * An internal resolved representation of a factory function created by resolving {@link Provider}.
   */
  export class ResolvedFactory {
    /**
     * Factory function which can return an instance of an object represented by a key.
     */
    factory: Function;
    /**
     * Arguments (dependencies) to the `factory` function.
     */
    dependencies: Dependency[];
    constructor(
      /**
       * Factory function which can return an instance of an object represented by a key.
       */
      factory: Function,
      /**
       * Arguments (dependencies) to the `factory` function.
       */
      dependencies: Dependency[]);
  }
  /**
   * Creates a {@link Provider}.
   *
   * To construct a {@link Provider}, bind a `token` to either a class, a value, a factory function,
   * or
   * to an existing `token`.
   * See {@link ProviderBuilder} for more details.
   *
   * The `token` is most commonly a class or {@link angular2/di/OpaqueToken}.
   *
   * @deprecated
   */
  export function bind(token: any): ProviderBuilder;
  /**
   * Creates a {@link Provider}.
   *
   * See {@link Provider} for more details.
   *
   * <!-- TODO: improve the docs -->
   */
  export function provide(token: any, {useClass, useValue, useExisting, useFactory, deps, multi}: {
    useClass?: Type;
    useValue?: any;
    useExisting?: any;
    useFactory?: Function;
    deps?: Object[];
    multi?: boolean;
  }): Provider;
  /**
   * Helper class for the {@link bind} function.
   */
  export class ProviderBuilder {
    token: any;
    constructor(token: any);
    /**
     * Binds a DI token to a class.
     *
     * ### Example ([live demo](http://plnkr.co/edit/ZpBCSYqv6e2ud5KXLdxQ?p=preview))
     *
     * Because `toAlias` and `toClass` are often confused, the example contains
     * both use cases for easy comparison.
     *
     * ```typescript
     * class Vehicle {}
     *
     * class Car extends Vehicle {}
     *
     * var injectorClass = Injector.resolveAndCreate([
     *   Car,
     *   provide(Vehicle, {useClass: Car})
     * ]);
     * var injectorAlias = Injector.resolveAndCreate([
     *   Car,
     *   provide(Vehicle, {useExisting: Car})
     * ]);
     *
     * expect(injectorClass.get(Vehicle)).not.toBe(injectorClass.get(Car));
     * expect(injectorClass.get(Vehicle) instanceof Car).toBe(true);
     *
     * expect(injectorAlias.get(Vehicle)).toBe(injectorAlias.get(Car));
     * expect(injectorAlias.get(Vehicle) instanceof Car).toBe(true);
     * ```
     */
    toClass(type: Type): Provider;
    /**
     * Binds a DI token to a value.
     *
     * ### Example ([live demo](http://plnkr.co/edit/G024PFHmDL0cJFgfZK8O?p=preview))
     *
     * ```typescript
     * var injector = Injector.resolveAndCreate([
     *   provide('message', {useValue: 'Hello'})
     * ]);
     *
     * expect(injector.get('message')).toEqual('Hello');
     * ```
     */
    toValue(value: any): Provider;
    /**
     * Binds a DI token to an existing token.
     *
     * Angular will return the same instance as if the provided token was used. (This is
     * in contrast to `useClass` where a separate instance of `useClass` will be returned.)
     *
     * ### Example ([live demo](http://plnkr.co/edit/uBaoF2pN5cfc5AfZapNw?p=preview))
     *
     * Because `toAlias` and `toClass` are often confused, the example contains
     * both use cases for easy comparison.
     *
     * ```typescript
     * class Vehicle {}
     *
     * class Car extends Vehicle {}
     *
     * var injectorAlias = Injector.resolveAndCreate([
     *   Car,
     *   provide(Vehicle, {useExisting: Car})
     * ]);
     * var injectorClass = Injector.resolveAndCreate([
     *   Car,
     *   provide(Vehicle, {useClass: Car})
     * ]);
     *
     * expect(injectorAlias.get(Vehicle)).toBe(injectorAlias.get(Car));
     * expect(injectorAlias.get(Vehicle) instanceof Car).toBe(true);
     *
     * expect(injectorClass.get(Vehicle)).not.toBe(injectorClass.get(Car));
     * expect(injectorClass.get(Vehicle) instanceof Car).toBe(true);
     * ```
     */
    toAlias(aliasToken: any): Provider;
    /**
     * Binds a DI token to a function which computes the value.
     *
     * ### Example ([live demo](http://plnkr.co/edit/OejNIfTT3zb1iBxaIYOb?p=preview))
     *
     * ```typescript
     * var injector = Injector.resolveAndCreate([
     *   provide(Number, {useFactory: () => { return 1+2; }}),
     *   provide(String, {useFactory: (v) => { return "Value: " + v; }, deps: [Number]})
     * ]);
     *
     * expect(injector.get(Number)).toEqual(3);
     * expect(injector.get(String)).toEqual('Value: 3');
     * ```
     */
    toFactory(factory: Function, dependencies?: any[]): Provider;
  }
  /**
   * Resolve a single provider.
   */
  export function resolveFactory(provider: Provider): ResolvedFactory;
  /**
   * Converts the {@link Provider} into {@link ResolvedProvider}.
   *
   * {@link Injector} internally only uses {@link ResolvedProvider}, {@link Provider} contains
   * convenience provider syntax.
   */
  export function resolveProvider(provider: Provider): ResolvedProvider;
  /**
   * Resolve a list of Providers.
   */
  export function resolveProviders(providers: Array<Type | Provider | any[]>): ResolvedProvider[];
  /**
   * Merges a list of ResolvedProviders into a list where
   * each key is contained exactly once and multi providers
   * have been merged.
   */
  export function mergeResolvedProviders(providers: ResolvedProvider[], normalizedProvidersMap: Map<number, ResolvedProvider>): Map<number, ResolvedProvider>;
}
declare module "angular2/src/core/di/injector" {
  import { ResolvedProvider, Provider, Dependency } from "angular2/src/core/di/provider";
  import { Type } from "angular2/src/facade/lang";
  import { Key } from "angular2/src/core/di/key";
  export const UNDEFINED: Object;
  /**
   * Visibility of a {@link Provider}.
   */
  export enum Visibility {
    /**
     * A `Public` {@link Provider} is only visible to regular (as opposed to host) child injectors.
     */
    Public = 0,
    /**
     * A `Private` {@link Provider} is only visible to host (as opposed to regular) child injectors.
     */
    Private = 1,
    /**
     * A `PublicAndPrivate` {@link Provider} is visible to both host and regular child injectors.
     */
    PublicAndPrivate = 2,
  }
  export interface ProtoInjectorStrategy {
    getProviderAtIndex(index: number): ResolvedProvider;
    createInjectorStrategy(inj: Injector): InjectorStrategy;
  }
  export class ProtoInjectorInlineStrategy implements ProtoInjectorStrategy {
    provider0: ResolvedProvider;
    provider1: ResolvedProvider;
    provider2: ResolvedProvider;
    provider3: ResolvedProvider;
    provider4: ResolvedProvider;
    provider5: ResolvedProvider;
    provider6: ResolvedProvider;
    provider7: ResolvedProvider;
    provider8: ResolvedProvider;
    provider9: ResolvedProvider;
    keyId0: number;
    keyId1: number;
    keyId2: number;
    keyId3: number;
    keyId4: number;
    keyId5: number;
    keyId6: number;
    keyId7: number;
    keyId8: number;
    keyId9: number;
    visibility0: Visibility;
    visibility1: Visibility;
    visibility2: Visibility;
    visibility3: Visibility;
    visibility4: Visibility;
    visibility5: Visibility;
    visibility6: Visibility;
    visibility7: Visibility;
    visibility8: Visibility;
    visibility9: Visibility;
    constructor(protoEI: ProtoInjector, bwv: ProviderWithVisibility[]);
    getProviderAtIndex(index: number): ResolvedProvider;
    createInjectorStrategy(injector: Injector): InjectorStrategy;
  }
  export class ProtoInjectorDynamicStrategy implements ProtoInjectorStrategy {
    providers: ResolvedProvider[];
    keyIds: number[];
    visibilities: Visibility[];
    constructor(protoInj: ProtoInjector, bwv: ProviderWithVisibility[]);
    getProviderAtIndex(index: number): ResolvedProvider;
    createInjectorStrategy(ei: Injector): InjectorStrategy;
  }
  export class ProtoInjector {
    static fromResolvedProviders(providers: ResolvedProvider[]): ProtoInjector;
    /** @internal */
    _strategy: ProtoInjectorStrategy;
    numberOfProviders: number;
    constructor(bwv: ProviderWithVisibility[]);
    getProviderAtIndex(index: number): ResolvedProvider;
  }
  export interface InjectorStrategy {
    getObjByKeyId(keyId: number, visibility: Visibility): any;
    getObjAtIndex(index: number): any;
    getMaxNumberOfObjects(): number;
    resetConstructionCounter(): void;
    instantiateProvider(provider: ResolvedProvider, visibility: Visibility): any;
  }
  export class InjectorInlineStrategy implements InjectorStrategy {
    injector: Injector;
    protoStrategy: ProtoInjectorInlineStrategy;
    obj0: any;
    obj1: any;
    obj2: any;
    obj3: any;
    obj4: any;
    obj5: any;
    obj6: any;
    obj7: any;
    obj8: any;
    obj9: any;
    constructor(injector: Injector, protoStrategy: ProtoInjectorInlineStrategy);
    resetConstructionCounter(): void;
    instantiateProvider(provider: ResolvedProvider, visibility: Visibility): any;
    getObjByKeyId(keyId: number, visibility: Visibility): any;
    getObjAtIndex(index: number): any;
    getMaxNumberOfObjects(): number;
  }
  export class InjectorDynamicStrategy implements InjectorStrategy {
    protoStrategy: ProtoInjectorDynamicStrategy;
    injector: Injector;
    objs: any[];
    constructor(protoStrategy: ProtoInjectorDynamicStrategy, injector: Injector);
    resetConstructionCounter(): void;
    instantiateProvider(provider: ResolvedProvider, visibility: Visibility): any;
    getObjByKeyId(keyId: number, visibility: Visibility): any;
    getObjAtIndex(index: number): any;
    getMaxNumberOfObjects(): number;
  }
  export class ProviderWithVisibility {
    provider: ResolvedProvider;
    visibility: Visibility;
    constructor(provider: ResolvedProvider, visibility: Visibility);
    getKeyId(): number;
  }
  /**
   * Used to provide dependencies that cannot be easily expressed as providers.
   */
  export interface DependencyProvider {
    getDependency(injector: Injector, provider: ResolvedProvider, dependency: Dependency): any;
  }
  /**
   * A dependency injection container used for instantiating objects and resolving dependencies.
   *
   * An `Injector` is a replacement for a `new` operator, which can automatically resolve the
   * constructor dependencies.
   *
   * In typical use, application code asks for the dependencies in the constructor and they are
   * resolved by the `Injector`.
   *
   * ### Example ([live demo](http://plnkr.co/edit/jzjec0?p=preview))
   *
   * The following example creates an `Injector` configured to create `Engine` and `Car`.
   *
   * ```typescript
   * @Injectable()
   * class Engine {
   * }
   *
   * @Injectable()
   * class Car {
   *   constructor(public engine:Engine) {}
   * }
   *
   * var injector = Injector.resolveAndCreate([Car, Engine]);
   * var car = injector.get(Car);
   * expect(car instanceof Car).toBe(true);
   * expect(car.engine instanceof Engine).toBe(true);
   * ```
   *
   * Notice, we don't use the `new` operator because we explicitly want to have the `Injector`
   * resolve all of the object's dependencies automatically.
   */
  export class Injector {
    private _isHostBoundary;
    private _depProvider;
    private _debugContext;
    /**
     * Turns an array of provider definitions into an array of resolved providers.
     *
     * A resolution is a process of flattening multiple nested arrays and converting individual
     * providers into an array of {@link ResolvedProvider}s.
     *
     * ### Example ([live demo](http://plnkr.co/edit/AiXTHi?p=preview))
     *
     * ```typescript
     * @Injectable()
     * class Engine {
     * }
     *
     * @Injectable()
     * class Car {
     *   constructor(public engine:Engine) {}
     * }
     *
     * var providers = Injector.resolve([Car, [[Engine]]]);
     *
     * expect(providers.length).toEqual(2);
     *
     * expect(providers[0] instanceof ResolvedProvider).toBe(true);
     * expect(providers[0].key.displayName).toBe("Car");
     * expect(providers[0].dependencies.length).toEqual(1);
     * expect(providers[0].factory).toBeDefined();
     *
     * expect(providers[1].key.displayName).toBe("Engine");
     * });
     * ```
     *
     * See {@link Injector#fromResolvedProviders} for more info.
     */
    static resolve(providers: Array<Type | Provider | any[]>): ResolvedProvider[];
    /**
     * Resolves an array of providers and creates an injector from those providers.
     *
     * The passed-in providers can be an array of `Type`, {@link Provider},
     * or a recursive array of more providers.
     *
     * ### Example ([live demo](http://plnkr.co/edit/ePOccA?p=preview))
     *
     * ```typescript
     * @Injectable()
     * class Engine {
     * }
     *
     * @Injectable()
     * class Car {
     *   constructor(public engine:Engine) {}
     * }
     *
     * var injector = Injector.resolveAndCreate([Car, Engine]);
     * expect(injector.get(Car) instanceof Car).toBe(true);
     * ```
     *
     * This function is slower than the corresponding `fromResolvedProviders`
     * because it needs to resolve the passed-in providers first.
     * See {@link Injector#resolve} and {@link Injector#fromResolvedProviders}.
     */
    static resolveAndCreate(providers: Array<Type | Provider | any[]>): Injector;
    /**
     * Creates an injector from previously resolved providers.
     *
     * This API is the recommended way to construct injectors in performance-sensitive parts.
     *
     * ### Example ([live demo](http://plnkr.co/edit/KrSMci?p=preview))
     *
     * ```typescript
     * @Injectable()
     * class Engine {
     * }
     *
     * @Injectable()
     * class Car {
     *   constructor(public engine:Engine) {}
     * }
     *
     * var providers = Injector.resolve([Car, Engine]);
     * var injector = Injector.fromResolvedProviders(providers);
     * expect(injector.get(Car) instanceof Car).toBe(true);
     * ```
     */
    static fromResolvedProviders(providers: ResolvedProvider[]): Injector;
    /**
     * @deprecated
     */
    static fromResolvedBindings(providers: ResolvedProvider[]): Injector;
    /** @internal */
    _strategy: InjectorStrategy;
    /** @internal */
    _constructionCounter: number;
    /** @internal */
    _proto: any;
    /** @internal */
    _parent: Injector;
    /**
     * Private
     */
    constructor(_proto: any, _parent?: Injector, _isHostBoundary?: boolean, _depProvider?: any, _debugContext?: Function);
    /**
     * Whether this injector is a boundary to a host.
     * @internal
     */
    hostBoundary: boolean;
    /**
     * @internal
     */
    debugContext(): any;
    /**
     * Retrieves an instance from the injector based on the provided token.
     * Throws {@link NoProviderError} if not found.
     *
     * ### Example ([live demo](http://plnkr.co/edit/HeXSHg?p=preview))
     *
     * ```typescript
     * var injector = Injector.resolveAndCreate([
     *   provide("validToken", {useValue: "Value"})
     * ]);
     * expect(injector.get("validToken")).toEqual("Value");
     * expect(() => injector.get("invalidToken")).toThrowError();
     * ```
     *
     * `Injector` returns itself when given `Injector` as a token.
     *
     * ```typescript
     * var injector = Injector.resolveAndCreate([]);
     * expect(injector.get(Injector)).toBe(injector);
     * ```
     */
    get(token: any): any;
    /**
     * Retrieves an instance from the injector based on the provided token.
     * Returns null if not found.
     *
     * ### Example ([live demo](http://plnkr.co/edit/tpEbEy?p=preview))
     *
     * ```typescript
     * var injector = Injector.resolveAndCreate([
     *   provide("validToken", {useValue: "Value"})
     * ]);
     * expect(injector.getOptional("validToken")).toEqual("Value");
     * expect(injector.getOptional("invalidToken")).toBe(null);
     * ```
     *
     * `Injector` returns itself when given `Injector` as a token.
     *
     * ```typescript
     * var injector = Injector.resolveAndCreate([]);
     * expect(injector.getOptional(Injector)).toBe(injector);
     * ```
     */
    getOptional(token: any): any;
    /**
     * @internal
     */
    getAt(index: number): any;
    /**
     * Parent of this injector.
     *
     * <!-- TODO: Add a link to the section of the user guide talking about hierarchical injection.
     * -->
     *
     * ### Example ([live demo](http://plnkr.co/edit/eosMGo?p=preview))
     *
     * ```typescript
     * var parent = Injector.resolveAndCreate([]);
     * var child = parent.resolveAndCreateChild([]);
     * expect(child.parent).toBe(parent);
     * ```
     */
    parent: Injector;
    /**
     * @internal
     * Internal. Do not use.
     * We return `any` not to export the InjectorStrategy type.
     */
    internalStrategy: any;
    /**
     * Resolves an array of providers and creates a child injector from those providers.
     *
     * <!-- TODO: Add a link to the section of the user guide talking about hierarchical injection.
     * -->
     *
     * The passed-in providers can be an array of `Type`, {@link Provider},
     * or a recursive array of more providers.
     *
     * ### Example ([live demo](http://plnkr.co/edit/opB3T4?p=preview))
     *
     * ```typescript
     * class ParentProvider {}
     * class ChildProvider {}
     *
     * var parent = Injector.resolveAndCreate([ParentProvider]);
     * var child = parent.resolveAndCreateChild([ChildProvider]);
     *
     * expect(child.get(ParentProvider) instanceof ParentProvider).toBe(true);
     * expect(child.get(ChildProvider) instanceof ChildProvider).toBe(true);
     * expect(child.get(ParentProvider)).toBe(parent.get(ParentProvider));
     * ```
     *
     * This function is slower than the corresponding `createChildFromResolved`
     * because it needs to resolve the passed-in providers first.
     * See {@link Injector#resolve} and {@link Injector#createChildFromResolved}.
     */
    resolveAndCreateChild(providers: Array<Type | Provider | any[]>): Injector;
    /**
     * Creates a child injector from previously resolved providers.
     *
     * <!-- TODO: Add a link to the section of the user guide talking about hierarchical injection.
     * -->
     *
     * This API is the recommended way to construct injectors in performance-sensitive parts.
     *
     * ### Example ([live demo](http://plnkr.co/edit/VhyfjN?p=preview))
     *
     * ```typescript
     * class ParentProvider {}
     * class ChildProvider {}
     *
     * var parentProviders = Injector.resolve([ParentProvider]);
     * var childProviders = Injector.resolve([ChildProvider]);
     *
     * var parent = Injector.fromResolvedProviders(parentProviders);
     * var child = parent.createChildFromResolved(childProviders);
     *
     * expect(child.get(ParentProvider) instanceof ParentProvider).toBe(true);
     * expect(child.get(ChildProvider) instanceof ChildProvider).toBe(true);
     * expect(child.get(ParentProvider)).toBe(parent.get(ParentProvider));
     * ```
     */
    createChildFromResolved(providers: ResolvedProvider[]): Injector;
    /**
     * Resolves a provider and instantiates an object in the context of the injector.
     *
     * The created object does not get cached by the injector.
     *
     * ### Example ([live demo](http://plnkr.co/edit/yvVXoB?p=preview))
     *
     * ```typescript
     * @Injectable()
     * class Engine {
     * }
     *
     * @Injectable()
     * class Car {
     *   constructor(public engine:Engine) {}
     * }
     *
     * var injector = Injector.resolveAndCreate([Engine]);
     *
     * var car = injector.resolveAndInstantiate(Car);
     * expect(car.engine).toBe(injector.get(Engine));
     * expect(car).not.toBe(injector.resolveAndInstantiate(Car));
     * ```
     */
    resolveAndInstantiate(provider: Type | Provider): any;
    /**
     * Instantiates an object using a resolved provider in the context of the injector.
     *
     * The created object does not get cached by the injector.
     *
     * ### Example ([live demo](http://plnkr.co/edit/ptCImQ?p=preview))
     *
     * ```typescript
     * @Injectable()
     * class Engine {
     * }
     *
     * @Injectable()
     * class Car {
     *   constructor(public engine:Engine) {}
     * }
     *
     * var injector = Injector.resolveAndCreate([Engine]);
     * var carProvider = Injector.resolve([Car])[0];
     * var car = injector.instantiateResolved(carProvider);
     * expect(car.engine).toBe(injector.get(Engine));
     * expect(car).not.toBe(injector.instantiateResolved(carProvider));
     * ```
     */
    instantiateResolved(provider: ResolvedProvider): any;
    /** @internal */
    _new(provider: ResolvedProvider, visibility: Visibility): any;
    private _instantiateProvider(provider, visibility);
    private _instantiate(provider, resolvedFactory, visibility);
    private _getByDependency(provider, dep, providerVisibility);
    private _getByKey(key, lowerBoundVisibility, upperBoundVisibility, optional, providerVisibility);
    /** @internal */
    _throwOrNull(key: Key, optional: boolean): any;
    /** @internal */
    _getByKeySelf(key: Key, optional: boolean, providerVisibility: Visibility): any;
    /** @internal */
    _getByKeyHost(key: Key, optional: boolean, providerVisibility: Visibility, lowerBoundVisibility: Object): any;
    /** @internal */
    _getPrivateDependency(key: Key, optional: boolean, inj: Injector): any;
    /** @internal */
    _getByKeyDefault(key: Key, optional: boolean, providerVisibility: Visibility, lowerBoundVisibility: Object): any;
    displayName: string;
    toString(): string;
  }
}
declare module "angular2/src/core/di/opaque_token" {
  /**
   * Creates a token that can be used in a DI Provider.
   *
   * ### Example ([live demo](http://plnkr.co/edit/Ys9ezXpj2Mnoy3Uc8KBp?p=preview))
   *
   * ```typescript
   * var t = new OpaqueToken("value");
   *
   * var injector = Injector.resolveAndCreate([
   *   provide(t, {useValue: "bindingValue"})
   * ]);
   *
   * expect(injector.get(t)).toEqual("bindingValue");
   * ```
   *
   * Using an `OpaqueToken` is preferable to using strings as tokens because of possible collisions
   * caused by multiple providers using the same string as two different tokens.
   *
   * Using an `OpaqueToken` is preferable to using an `Object` as tokens because it provides better
   * error messages.
   */
  export class OpaqueToken {
    private _desc;
    constructor(_desc: string);
    toString(): string;
  }
}
declare module "angular2/src/core/di" {
  /**
   * @module
   * @description
   * The `di` module provides dependency injection container services.
   */
  export { InjectMetadata, OptionalMetadata, InjectableMetadata, SelfMetadata, HostMetadata, SkipSelfMetadata, DependencyMetadata } from "angular2/src/core/di/metadata";
  export * from "angular2/src/core/di/decorators";
  export { forwardRef, resolveForwardRef, ForwardRefFn } from "angular2/src/core/di/forward_ref";
  export { Injector } from "angular2/src/core/di/injector";
  export { Binding, ProviderBuilder, ResolvedBinding, ResolvedFactory, Dependency, bind, Provider, ResolvedProvider, provide } from "angular2/src/core/di/provider";
  export { Key } from "angular2/src/core/di/key";
  export { NoProviderError, AbstractProviderError, CyclicDependencyError, InstantiationError, InvalidProviderError, NoAnnotationError, OutOfBoundsError } from "angular2/src/core/di/exceptions";
  export { OpaqueToken } from "angular2/src/core/di/opaque_token";
}
declare module "angular2/src/core/metadata/di" {
  import { Type } from "angular2/src/facade/lang";
  import { DependencyMetadata } from "angular2/src/core/di/metadata";
  /**
   * Specifies that a constant attribute value should be injected.
   *
   * The directive can inject constant string literals of host element attributes.
   *
   * ### Example
   *
   * Suppose we have an `<input>` element and want to know its `type`.
   *
   * ```html
   * <input type="text">
   * ```
   *
   * A decorator can inject string literal `text` like so:
   *
   * {@example core/ts/metadata/metadata.ts region='attributeMetadata'}
   */
  export class AttributeMetadata extends DependencyMetadata {
    attributeName: string;
    constructor(attributeName: string);
    token: AttributeMetadata;
    toString(): string;
  }
  /**
   * Declares an injectable parameter to be a live list of directives or variable
   * bindings from the content children of a directive.
   *
   * ### Example ([live demo](http://plnkr.co/edit/lY9m8HLy7z06vDoUaSN2?p=preview))
   *
   * Assume that `<tabs>` component would like to get a list its children `<pane>`
   * components as shown in this example:
   *
   * ```html
   * <tabs>
   *   <pane title="Overview">...</pane>
   *   <pane *ngFor="#o of objects" [title]="o.title">{{o.text}}</pane>
   * </tabs>
   * ```
   *
   * The preferred solution is to query for `Pane` directives using this decorator.
   *
   * ```javascript
   * @Component({
   *   selector: 'pane',
   *   inputs: ['title']
   * })
   * class Pane {
   *   title:string;
   * }
   *
   * @Component({
   *  selector: 'tabs',
   *  template: `
   *    <ul>
   *      <li *ngFor="#pane of panes">{{pane.title}}</li>
   *    </ul>
   *    <ng-content></ng-content>
   *  `
   * })
   * class Tabs {
   *   panes: QueryList<Pane>;
   *   constructor(@Query(Pane) panes:QueryList<Pane>) {
    *    this.panes = panes;
    *  }
   * }
   * ```
   *
   * A query can look for variable bindings by passing in a string with desired binding symbol.
   *
   * ### Example ([live demo](http://plnkr.co/edit/sT2j25cH1dURAyBRCKx1?p=preview))
   * ```html
   * <seeker>
   *   <div #findme>...</div>
   * </seeker>
   *
   * @Component({ selector: 'seeker' })
   * class Seeker {
   *   constructor(@Query('findme') elList: QueryList<ElementRef>) {...}
   * }
   * ```
   *
   * In this case the object that is injected depend on the type of the variable
   * binding. It can be an ElementRef, a directive or a component.
   *
   * Passing in a comma separated list of variable bindings will query for all of them.
   *
   * ```html
   * <seeker>
   *   <div #find-me>...</div>
   *   <div #find-me-too>...</div>
   * </seeker>
   *
   *  @Component({
   *   selector: 'seeker'
   * })
   * class Seeker {
   *   constructor(@Query('findMe, findMeToo') elList: QueryList<ElementRef>) {...}
   * }
   * ```
   *
   * Configure whether query looks for direct children or all descendants
   * of the querying element, by using the `descendants` parameter.
   * It is set to `false` by default.
   *
   * ### Example ([live demo](http://plnkr.co/edit/wtGeB977bv7qvA5FTYl9?p=preview))
   * ```html
   * <container #first>
   *   <item>a</item>
   *   <item>b</item>
   *   <container #second>
   *     <item>c</item>
   *   </container>
   * </container>
   * ```
   *
   * When querying for items, the first container will see only `a` and `b` by default,
   * but with `Query(TextDirective, {descendants: true})` it will see `c` too.
   *
   * The queried directives are kept in a depth-first pre-order with respect to their
   * positions in the DOM.
   *
   * Query does not look deep into any subcomponent views.
   *
   * Query is updated as part of the change-detection cycle. Since change detection
   * happens after construction of a directive, QueryList will always be empty when observed in the
   * constructor.
   *
   * The injected object is an unmodifiable live list.
   * See {@link QueryList} for more details.
   */
  export class QueryMetadata extends DependencyMetadata {
    private _selector;
    /**
     * whether we want to query only direct children (false) or all
     * children (true).
     */
    descendants: boolean;
    first: boolean;
    constructor(_selector: Type | string, {descendants, first}?: {
      descendants?: boolean;
      first?: boolean;
    });
    /**
     * always `false` to differentiate it with {@link ViewQueryMetadata}.
     */
    isViewQuery: boolean;
    /**
     * what this is querying for.
     */
    selector: any;
    /**
     * whether this is querying for a variable binding or a directive.
     */
    isVarBindingQuery: boolean;
    /**
     * returns a list of variable bindings this is querying for.
     * Only applicable if this is a variable bindings query.
     */
    varBindings: string[];
    toString(): string;
  }
  /**
   * Configures a content query.
   *
   * Content queries are set before the `ngAfterContentInit` callback is called.
   *
   * ### Example
   *
   * ```
   * @Directive({
   *   selector: 'someDir'
   * })
   * class SomeDir {
   *   @ContentChildren(ChildDirective) contentChildren: QueryList<ChildDirective>;
   *
   *   ngAfterContentInit() {
   *     // contentChildren is set
   *   }
   * }
   * ```
   */
  export class ContentChildrenMetadata extends QueryMetadata {
    constructor(_selector: Type | string, {descendants}?: {
      descendants?: boolean;
    });
  }
  /**
   * Configures a content query.
   *
   * Content queries are set before the `ngAfterContentInit` callback is called.
   *
   * ### Example
   *
   * ```
   * @Directive({
   *   selector: 'someDir'
   * })
   * class SomeDir {
   *   @ContentChild(ChildDirective) contentChild;
   *
   *   ngAfterContentInit() {
   *     // contentChild is set
   *   }
   * }
   * ```
   */
  export class ContentChildMetadata extends QueryMetadata {
    constructor(_selector: Type | string);
  }
  /**
   * Similar to {@link QueryMetadata}, but querying the component view, instead of
   * the content children.
   *
   * ### Example ([live demo](http://plnkr.co/edit/eNsFHDf7YjyM6IzKxM1j?p=preview))
   *
   * ```javascript
   * @Component({...})
   * @View({
   *   template: `
   *     <item> a </item>
   *     <item> b </item>
   *     <item> c </item>
   *   `
   * })
   * class MyComponent {
   *   shown: boolean;
   *
   *   constructor(private @Query(Item) items:QueryList<Item>) {
   *     items.changes.subscribe(() => console.log(items.length));
   *   }
   * }
   * ```
   *
   * Supports the same querying parameters as {@link QueryMetadata}, except
   * `descendants`. This always queries the whole view.
   *
   * As `shown` is flipped between true and false, items will contain zero of one
   * items.
   *
   * Specifies that a {@link QueryList} should be injected.
   *
   * The injected object is an iterable and observable live list.
   * See {@link QueryList} for more details.
   */
  export class ViewQueryMetadata extends QueryMetadata {
    constructor(_selector: Type | string, {descendants, first}?: {
      descendants?: boolean;
      first?: boolean;
    });
    /**
     * always `true` to differentiate it with {@link QueryMetadata}.
     */
    isViewQuery: boolean;
    toString(): string;
  }
  /**
   * Configures a view query.
   *
   * View queries are set before the `ngAfterViewInit` callback is called.
   *
   * ### Example
   *
   * ```
   * @Component({
   *   selector: 'someDir',
   *   templateUrl: 'someTemplate',
   *   directives: [ItemDirective]
   * })
   * class SomeDir {
   *   @ViewChildren(ItemDirective) viewChildren: QueryList<ItemDirective>;
   *
   *   ngAfterViewInit() {
   *     // viewChildren is set
   *   }
   * }
   * ```
   */
  export class ViewChildrenMetadata extends ViewQueryMetadata {
    constructor(_selector: Type | string);
  }
  /**
   * Configures a view query.
   *
   * View queries are set before the `ngAfterViewInit` callback is called.
   *
   * ### Example
   *
   * ```
   * @Component({
   *   selector: 'someDir',
   *   templateUrl: 'someTemplate',
   *   directives: [ItemDirective]
   * })
   * class SomeDir {
   *   @ViewChild(ItemDirective) viewChild:ItemDirective;
   *
   *   ngAfterViewInit() {
   *     // viewChild is set
   *   }
   * }
   * ```
   */
  export class ViewChildMetadata extends ViewQueryMetadata {
    constructor(_selector: Type | string);
  }
}
declare module "angular2/src/core/change_detection/parser/locals" {
  export class Locals {
    parent: Locals;
    current: Map<any, any>;
    constructor(parent: Locals, current: Map<any, any>);
    contains(name: string): boolean;
    get(name: string): any;
    set(name: string, value: any): void;
    clearLocalValues(): void;
  }
}
declare module "angular2/src/core/change_detection/parser/ast" {
  export class AST {
    visit(visitor: AstVisitor): any;
    toString(): string;
  }
  /**
   * Represents a quoted expression of the form:
   *
   * quote = prefix `:` uninterpretedExpression
   * prefix = identifier
   * uninterpretedExpression = arbitrary string
   *
   * A quoted expression is meant to be pre-processed by an AST transformer that
   * converts it into another AST that no longer contains quoted expressions.
   * It is meant to allow third-party developers to extend Angular template
   * expression language. The `uninterpretedExpression` part of the quote is
   * therefore not interpreted by the Angular's own expression parser.
   */
  export class Quote extends AST {
    prefix: string;
    uninterpretedExpression: string;
    location: any;
    constructor(prefix: string, uninterpretedExpression: string, location: any);
    visit(visitor: AstVisitor): any;
    toString(): string;
  }
  export class EmptyExpr extends AST {
    visit(visitor: AstVisitor): void;
  }
  export class ImplicitReceiver extends AST {
    visit(visitor: AstVisitor): any;
  }
  /**
   * Multiple expressions separated by a semicolon.
   */
  export class Chain extends AST {
    expressions: any[];
    constructor(expressions: any[]);
    visit(visitor: AstVisitor): any;
  }
  export class Conditional extends AST {
    condition: AST;
    trueExp: AST;
    falseExp: AST;
    constructor(condition: AST, trueExp: AST, falseExp: AST);
    visit(visitor: AstVisitor): any;
  }
  export class PropertyRead extends AST {
    receiver: AST;
    name: string;
    getter: Function;
    constructor(receiver: AST, name: string, getter: Function);
    visit(visitor: AstVisitor): any;
  }
  export class PropertyWrite extends AST {
    receiver: AST;
    name: string;
    setter: Function;
    value: AST;
    constructor(receiver: AST, name: string, setter: Function, value: AST);
    visit(visitor: AstVisitor): any;
  }
  export class SafePropertyRead extends AST {
    receiver: AST;
    name: string;
    getter: Function;
    constructor(receiver: AST, name: string, getter: Function);
    visit(visitor: AstVisitor): any;
  }
  export class KeyedRead extends AST {
    obj: AST;
    key: AST;
    constructor(obj: AST, key: AST);
    visit(visitor: AstVisitor): any;
  }
  export class KeyedWrite extends AST {
    obj: AST;
    key: AST;
    value: AST;
    constructor(obj: AST, key: AST, value: AST);
    visit(visitor: AstVisitor): any;
  }
  export class BindingPipe extends AST {
    exp: AST;
    name: string;
    args: any[];
    constructor(exp: AST, name: string, args: any[]);
    visit(visitor: AstVisitor): any;
  }
  export class LiteralPrimitive extends AST {
    value: any;
    constructor(value: any);
    visit(visitor: AstVisitor): any;
  }
  export class LiteralArray extends AST {
    expressions: any[];
    constructor(expressions: any[]);
    visit(visitor: AstVisitor): any;
  }
  export class LiteralMap extends AST {
    keys: any[];
    values: any[];
    constructor(keys: any[], values: any[]);
    visit(visitor: AstVisitor): any;
  }
  export class Interpolation extends AST {
    strings: any[];
    expressions: any[];
    constructor(strings: any[], expressions: any[]);
    visit(visitor: AstVisitor): any;
  }
  export class Binary extends AST {
    operation: string;
    left: AST;
    right: AST;
    constructor(operation: string, left: AST, right: AST);
    visit(visitor: AstVisitor): any;
  }
  export class PrefixNot extends AST {
    expression: AST;
    constructor(expression: AST);
    visit(visitor: AstVisitor): any;
  }
  export class MethodCall extends AST {
    receiver: AST;
    name: string;
    fn: Function;
    args: any[];
    constructor(receiver: AST, name: string, fn: Function, args: any[]);
    visit(visitor: AstVisitor): any;
  }
  export class SafeMethodCall extends AST {
    receiver: AST;
    name: string;
    fn: Function;
    args: any[];
    constructor(receiver: AST, name: string, fn: Function, args: any[]);
    visit(visitor: AstVisitor): any;
  }
  export class FunctionCall extends AST {
    target: AST;
    args: any[];
    constructor(target: AST, args: any[]);
    visit(visitor: AstVisitor): any;
  }
  export class ASTWithSource extends AST {
    ast: AST;
    source: string;
    location: string;
    constructor(ast: AST, source: string, location: string);
    visit(visitor: AstVisitor): any;
    toString(): string;
  }
  export class TemplateBinding {
    key: string;
    keyIsVar: boolean;
    name: string;
    expression: ASTWithSource;
    constructor(key: string, keyIsVar: boolean, name: string, expression: ASTWithSource);
  }
  export interface AstVisitor {
    visitBinary(ast: Binary): any;
    visitChain(ast: Chain): any;
    visitConditional(ast: Conditional): any;
    visitFunctionCall(ast: FunctionCall): any;
    visitImplicitReceiver(ast: ImplicitReceiver): any;
    visitInterpolation(ast: Interpolation): any;
    visitKeyedRead(ast: KeyedRead): any;
    visitKeyedWrite(ast: KeyedWrite): any;
    visitLiteralArray(ast: LiteralArray): any;
    visitLiteralMap(ast: LiteralMap): any;
    visitLiteralPrimitive(ast: LiteralPrimitive): any;
    visitMethodCall(ast: MethodCall): any;
    visitPipe(ast: BindingPipe): any;
    visitPrefixNot(ast: PrefixNot): any;
    visitPropertyRead(ast: PropertyRead): any;
    visitPropertyWrite(ast: PropertyWrite): any;
    visitQuote(ast: Quote): any;
    visitSafeMethodCall(ast: SafeMethodCall): any;
    visitSafePropertyRead(ast: SafePropertyRead): any;
  }
  export class RecursiveAstVisitor implements AstVisitor {
    visitBinary(ast: Binary): any;
    visitChain(ast: Chain): any;
    visitConditional(ast: Conditional): any;
    visitPipe(ast: BindingPipe): any;
    visitFunctionCall(ast: FunctionCall): any;
    visitImplicitReceiver(ast: ImplicitReceiver): any;
    visitInterpolation(ast: Interpolation): any;
    visitKeyedRead(ast: KeyedRead): any;
    visitKeyedWrite(ast: KeyedWrite): any;
    visitLiteralArray(ast: LiteralArray): any;
    visitLiteralMap(ast: LiteralMap): any;
    visitLiteralPrimitive(ast: LiteralPrimitive): any;
    visitMethodCall(ast: MethodCall): any;
    visitPrefixNot(ast: PrefixNot): any;
    visitPropertyRead(ast: PropertyRead): any;
    visitPropertyWrite(ast: PropertyWrite): any;
    visitSafePropertyRead(ast: SafePropertyRead): any;
    visitSafeMethodCall(ast: SafeMethodCall): any;
    visitAll(asts: AST[]): any;
    visitQuote(ast: Quote): any;
  }
  export class AstTransformer implements AstVisitor {
    visitImplicitReceiver(ast: ImplicitReceiver): AST;
    visitInterpolation(ast: Interpolation): AST;
    visitLiteralPrimitive(ast: LiteralPrimitive): AST;
    visitPropertyRead(ast: PropertyRead): AST;
    visitPropertyWrite(ast: PropertyWrite): AST;
    visitSafePropertyRead(ast: SafePropertyRead): AST;
    visitMethodCall(ast: MethodCall): AST;
    visitSafeMethodCall(ast: SafeMethodCall): AST;
    visitFunctionCall(ast: FunctionCall): AST;
    visitLiteralArray(ast: LiteralArray): AST;
    visitLiteralMap(ast: LiteralMap): AST;
    visitBinary(ast: Binary): AST;
    visitPrefixNot(ast: PrefixNot): AST;
    visitConditional(ast: Conditional): AST;
    visitPipe(ast: BindingPipe): AST;
    visitKeyedRead(ast: KeyedRead): AST;
    visitKeyedWrite(ast: KeyedWrite): AST;
    visitAll(asts: any[]): any[];
    visitChain(ast: Chain): AST;
    visitQuote(ast: Quote): AST;
  }
}
declare module "angular2/src/core/change_detection/constants" {
  /**
   * Describes the current state of the change detector.
   */
  export enum ChangeDetectorState {
    /**
     * `NeverChecked` means that the change detector has not been checked yet, and
     * initialization methods should be called during detection.
     */
    NeverChecked = 0,
    /**
     * `CheckedBefore` means that the change detector has successfully completed at least
     * one detection previously.
     */
    CheckedBefore = 1,
    /**
     * `Errored` means that the change detector encountered an error checking a binding
     * or calling a directive lifecycle method and is now in an inconsistent state. Change
     * detectors in this state will no longer detect changes.
     */
    Errored = 2,
  }
  /**
   * Describes within the change detector which strategy will be used the next time change
   * detection is triggered.
   */
  export enum ChangeDetectionStrategy {
    /**
     * `CheckedOnce` means that after calling detectChanges the mode of the change detector
     * will become `Checked`.
     */
    CheckOnce = 0,
    /**
     * `Checked` means that the change detector should be skipped until its mode changes to
     * `CheckOnce`.
     */
    Checked = 1,
    /**
     * `CheckAlways` means that after calling detectChanges the mode of the change detector
     * will remain `CheckAlways`.
     */
    CheckAlways = 2,
    /**
     * `Detached` means that the change detector sub tree is not a part of the main tree and
     * should be skipped.
     */
    Detached = 3,
    /**
     * `OnPush` means that the change detector's mode will be set to `CheckOnce` during hydration.
     */
    OnPush = 4,
    /**
     * `Default` means that the change detector's mode will be set to `CheckAlways` during hydration.
     */
    Default = 5,
  }
  /**
   * List of possible {@link ChangeDetectionStrategy} values.
   */
  export var CHANGE_DETECTION_STRATEGY_VALUES: ChangeDetectionStrategy[];
  /**
   * List of possible {@link ChangeDetectorState} values.
   */
  export var CHANGE_DETECTOR_STATE_VALUES: ChangeDetectorState[];
  export function isDefaultChangeDetectionStrategy(changeDetectionStrategy: ChangeDetectionStrategy): boolean;
}
declare module "angular2/src/core/change_detection/directive_record" {
  import { ChangeDetectionStrategy } from "angular2/src/core/change_detection/constants";
  export class DirectiveIndex {
    elementIndex: number;
    directiveIndex: number;
    constructor(elementIndex: number, directiveIndex: number);
    name: string;
  }
  export class DirectiveRecord {
    directiveIndex: DirectiveIndex;
    callAfterContentInit: boolean;
    callAfterContentChecked: boolean;
    callAfterViewInit: boolean;
    callAfterViewChecked: boolean;
    callOnChanges: boolean;
    callDoCheck: boolean;
    callOnInit: boolean;
    callOnDestroy: boolean;
    changeDetection: ChangeDetectionStrategy;
    outputs: string[][];
    constructor({directiveIndex, callAfterContentInit, callAfterContentChecked, callAfterViewInit, callAfterViewChecked, callOnChanges, callDoCheck, callOnInit, callOnDestroy, changeDetection, outputs}?: {
      directiveIndex?: DirectiveIndex;
      callAfterContentInit?: boolean;
      callAfterContentChecked?: boolean;
      callAfterViewInit?: boolean;
      callAfterViewChecked?: boolean;
      callOnChanges?: boolean;
      callDoCheck?: boolean;
      callOnInit?: boolean;
      callOnDestroy?: boolean;
      changeDetection?: ChangeDetectionStrategy;
      outputs?: string[][];
    });
    isDefaultChangeDetection(): boolean;
  }
}
declare module "angular2/src/core/change_detection/binding_record" {
  import { SetterFn } from "angular2/src/core/reflection/types";
  import { AST } from "angular2/src/core/change_detection/parser/ast";
  import { DirectiveIndex, DirectiveRecord } from "angular2/src/core/change_detection/directive_record";
  export class BindingTarget {
    mode: string;
    elementIndex: number;
    name: string;
    unit: string;
    debug: string;
    constructor(mode: string, elementIndex: number, name: string, unit: string, debug: string);
    isDirective(): boolean;
    isElementProperty(): boolean;
    isElementAttribute(): boolean;
    isElementClass(): boolean;
    isElementStyle(): boolean;
    isTextNode(): boolean;
  }
  export class BindingRecord {
    mode: string;
    target: BindingTarget;
    implicitReceiver: any;
    ast: AST;
    setter: SetterFn;
    lifecycleEvent: string;
    directiveRecord: DirectiveRecord;
    constructor(mode: string, target: BindingTarget, implicitReceiver: any, ast: AST, setter: SetterFn, lifecycleEvent: string, directiveRecord: DirectiveRecord);
    isDirectiveLifecycle(): boolean;
    callOnChanges(): boolean;
    isDefaultChangeDetection(): boolean;
    static createDirectiveDoCheck(directiveRecord: DirectiveRecord): BindingRecord;
    static createDirectiveOnInit(directiveRecord: DirectiveRecord): BindingRecord;
    static createDirectiveOnChanges(directiveRecord: DirectiveRecord): BindingRecord;
    static createForDirective(ast: AST, propertyName: string, setter: SetterFn, directiveRecord: DirectiveRecord): BindingRecord;
    static createForElementProperty(ast: AST, elementIndex: number, propertyName: string): BindingRecord;
    static createForElementAttribute(ast: AST, elementIndex: number, attributeName: string): BindingRecord;
    static createForElementClass(ast: AST, elementIndex: number, className: string): BindingRecord;
    static createForElementStyle(ast: AST, elementIndex: number, styleName: string, unit: string): BindingRecord;
    static createForHostProperty(directiveIndex: DirectiveIndex, ast: AST, propertyName: string): BindingRecord;
    static createForHostAttribute(directiveIndex: DirectiveIndex, ast: AST, attributeName: string): BindingRecord;
    static createForHostClass(directiveIndex: DirectiveIndex, ast: AST, className: string): BindingRecord;
    static createForHostStyle(directiveIndex: DirectiveIndex, ast: AST, styleName: string, unit: string): BindingRecord;
    static createForTextNode(ast: AST, elementIndex: number): BindingRecord;
    static createForEvent(ast: AST, eventName: string, elementIndex: number): BindingRecord;
    static createForHostEvent(ast: AST, eventName: string, directiveRecord: DirectiveRecord): BindingRecord;
  }
}
declare module "angular2/src/core/change_detection/interfaces" {
  import { Locals } from "angular2/src/core/change_detection/parser/locals";
  import { BindingTarget, BindingRecord } from "angular2/src/core/change_detection/binding_record";
  import { DirectiveRecord, DirectiveIndex } from "angular2/src/core/change_detection/directive_record";
  import { ChangeDetectionStrategy } from "angular2/src/core/change_detection/constants";
  import { ChangeDetectorRef } from "angular2/src/core/change_detection/change_detector_ref";
  export class DebugContext {
    element: any;
    componentElement: any;
    directive: any;
    context: any;
    locals: any;
    injector: any;
    constructor(element: any, componentElement: any, directive: any, context: any, locals: any, injector: any);
  }
  export interface ChangeDispatcher {
    getDebugContext(appElement: any, elementIndex: number, directiveIndex: number): DebugContext;
    notifyOnBinding(bindingTarget: BindingTarget, value: any): void;
    logBindingUpdate(bindingTarget: BindingTarget, value: any): void;
    notifyAfterContentChecked(): void;
    notifyAfterViewChecked(): void;
    notifyOnDestroy(): void;
    getDetectorFor(directiveIndex: DirectiveIndex): ChangeDetector;
    getDirectiveFor(directiveIndex: DirectiveIndex): any;
  }
  export interface ChangeDetector {
    parent: ChangeDetector;
    mode: ChangeDetectionStrategy;
    ref: ChangeDetectorRef;
    addContentChild(cd: ChangeDetector): void;
    addViewChild(cd: ChangeDetector): void;
    removeContentChild(cd: ChangeDetector): void;
    removeViewChild(cd: ChangeDetector): void;
    remove(): void;
    hydrate(context: any, locals: Locals, dispatcher: ChangeDispatcher, pipes: any): void;
    dehydrate(): void;
    markPathToRootAsCheckOnce(): void;
    handleEvent(eventName: string, elIndex: number, event: any): any;
    detectChanges(): void;
    checkNoChanges(): void;
    destroyRecursive(): void;
    markAsCheckOnce(): void;
  }
  export interface ProtoChangeDetector {
    instantiate(): ChangeDetector;
  }
  export class ChangeDetectorGenConfig {
    genDebugInfo: boolean;
    logBindingUpdate: boolean;
    useJit: boolean;
    constructor(genDebugInfo: boolean, logBindingUpdate: boolean, useJit: boolean);
  }
  export class ChangeDetectorDefinition {
    id: string;
    strategy: ChangeDetectionStrategy;
    variableNames: string[];
    bindingRecords: BindingRecord[];
    eventRecords: BindingRecord[];
    directiveRecords: DirectiveRecord[];
    genConfig: ChangeDetectorGenConfig;
    constructor(id: string, strategy: ChangeDetectionStrategy, variableNames: string[], bindingRecords: BindingRecord[], eventRecords: BindingRecord[], directiveRecords: DirectiveRecord[], genConfig: ChangeDetectorGenConfig);
  }
}
declare module "angular2/src/core/change_detection/change_detector_ref" {
  import { ChangeDetector } from "angular2/src/core/change_detection/interfaces";
  export abstract class ChangeDetectorRef {
    /**
     * Marks all {@link ChangeDetectionStrategy#OnPush} ancestors as to be checked.
     *
     * <!-- TODO: Add a link to a chapter on OnPush components -->
     *
     * ### Example ([live demo](http://plnkr.co/edit/GC512b?p=preview))
     *
     * ```typescript
     * @Component({
     *   selector: 'cmp',
     *   changeDetection: ChangeDetectionStrategy.OnPush,
     *   template: `Number of ticks: {{numberOfTicks}}`
     * })
     * class Cmp {
     *   numberOfTicks = 0;
     *
     *   constructor(ref: ChangeDetectorRef) {
     *     setInterval(() => {
     *       this.numberOfTicks ++
     *       // the following is required, otherwise the view will not be updated
     *       this.ref.markForCheck();
     *     }, 1000);
     *   }
     * }
     *
     * @Component({
     *   selector: 'app',
     *   changeDetection: ChangeDetectionStrategy.OnPush,
     *   template: `
     *     <cmp><cmp>
     *   `,
     *   directives: [Cmp]
     * })
     * class App {
     * }
     *
     * bootstrap(App);
     * ```
     */
    abstract markForCheck(): void;
    /**
     * Detaches the change detector from the change detector tree.
     *
     * The detached change detector will not be checked until it is reattached.
     *
     * This can also be used in combination with {@link ChangeDetectorRef#detectChanges} to implement
     * local change
     * detection checks.
     *
     * <!-- TODO: Add a link to a chapter on detach/reattach/local digest -->
     * <!-- TODO: Add a live demo once ref.detectChanges is merged into master -->
     *
     * ### Example
     *
     * The following example defines a component with a large list of readonly data.
     * Imagine the data changes constantly, many times per second. For performance reasons,
     * we want to check and update the list every five seconds. We can do that by detaching
     * the component's change detector and doing a local check every five seconds.
     *
     * ```typescript
     * class DataProvider {
     *   // in a real application the returned data will be different every time
     *   get data() {
     *     return [1,2,3,4,5];
     *   }
     * }
     *
     * @Component({
     *   selector: 'giant-list',
     *   template: `
     *     <li *ngFor="#d of dataProvider.data">Data {{d}}</lig>
     *   `,
     *   directives: [NgFor]
     * })
     * class GiantList {
     *   constructor(private ref: ChangeDetectorRef, private dataProvider:DataProvider) {
     *     ref.detach();
     *     setInterval(() => {
     *       this.ref.detectChanges();
     *     }, 5000);
     *   }
     * }
     *
     * @Component({
     *   selector: 'app',
     *   providers: [DataProvider],
     *   template: `
     *     <giant-list><giant-list>
     *   `,
     *   directives: [GiantList]
     * })
     * class App {
     * }
     *
     * bootstrap(App);
     * ```
     */
    abstract detach(): void;
    /**
     * Checks the change detector and its children.
     *
     * This can also be used in combination with {@link ChangeDetectorRef#detach} to implement local
     * change detection
     * checks.
     *
     * <!-- TODO: Add a link to a chapter on detach/reattach/local digest -->
     * <!-- TODO: Add a live demo once ref.detectChanges is merged into master -->
     *
     * ### Example
     *
     * The following example defines a component with a large list of readonly data.
     * Imagine, the data changes constantly, many times per second. For performance reasons,
     * we want to check and update the list every five seconds.
     *
     * We can do that by detaching the component's change detector and doing a local change detection
     * check
     * every five seconds.
     *
     * See {@link ChangeDetectorRef#detach} for more information.
     */
    abstract detectChanges(): void;
    /**
     * Checks the change detector and its children, and throws if any changes are detected.
     *
     * This is used in development mode to verify that running change detection doesn't introduce
     * other changes.
     */
    abstract checkNoChanges(): void;
    /**
     * Reattach the change detector to the change detector tree.
     *
     * This also marks OnPush ancestors as to be checked. This reattached change detector will be
     * checked during the next change detection run.
     *
     * <!-- TODO: Add a link to a chapter on detach/reattach/local digest -->
     *
     * ### Example ([live demo](http://plnkr.co/edit/aUhZha?p=preview))
     *
     * The following example creates a component displaying `live` data. The component will detach
     * its change detector from the main change detector tree when the component's live property
     * is set to false.
     *
     * ```typescript
     * class DataProvider {
     *   data = 1;
     *
     *   constructor() {
     *     setInterval(() => {
     *       this.data = this.data * 2;
     *     }, 500);
     *   }
     * }
     *
     * @Component({
     *   selector: 'live-data',
     *   inputs: ['live'],
     *   template: `Data: {{dataProvider.data}}`
     * })
     * class LiveData {
     *   constructor(private ref: ChangeDetectorRef, private dataProvider:DataProvider) {}
     *
     *   set live(value) {
     *     if (value)
     *       this.ref.reattach();
     *     else
     *       this.ref.detach();
     *   }
     * }
     *
     * @Component({
     *   selector: 'app',
     *   providers: [DataProvider],
     *   template: `
     *     Live Update: <input type="checkbox" [(ngModel)]="live">
     *     <live-data [live]="live"><live-data>
     *   `,
     *   directives: [LiveData, FORM_DIRECTIVES]
     * })
     * class App {
     *   live = true;
     * }
     *
     * bootstrap(App);
     * ```
     */
    abstract reattach(): void;
  }
  export class ChangeDetectorRef_ extends ChangeDetectorRef {
    private _cd;
    constructor(_cd: ChangeDetector);
    markForCheck(): void;
    detach(): void;
    detectChanges(): void;
    checkNoChanges(): void;
    reattach(): void;
  }
}
declare module "angular2/src/core/change_detection/differs/iterable_differs" {
  import { ChangeDetectorRef } from "angular2/src/core/change_detection/change_detector_ref";
  import { Provider } from "angular2/src/core/di";
  /**
   * A strategy for tracking changes over time to an iterable. Used for {@link NgFor} to
   * respond to changes in an iterable by effecting equivalent changes in the DOM.
   */
  export interface IterableDiffer {
    diff(object: any): any;
    onDestroy(): any;
  }
  /**
    * An optional function passed into {@link NgFor} that defines how to track
    * items in an iterable (e.g. by index or id)
   */
  export interface TrackByFn {
    (index: number, item: any): any;
  }
  /**
   * Provides a factory for {@link IterableDiffer}.
   */
  export interface IterableDifferFactory {
    supports(objects: any): boolean;
    create(cdRef: ChangeDetectorRef, trackByFn?: TrackByFn): IterableDiffer;
  }
  /**
   * A repository of different iterable diffing strategies used by NgFor, NgClass, and others.
   */
  export class IterableDiffers {
    factories: IterableDifferFactory[];
    constructor(factories: IterableDifferFactory[]);
    static create(factories: IterableDifferFactory[], parent?: IterableDiffers): IterableDiffers;
    /**
     * Takes an array of {@link IterableDifferFactory} and returns a provider used to extend the
     * inherited {@link IterableDiffers} instance with the provided factories and return a new
     * {@link IterableDiffers} instance.
     *
     * The following example shows how to extend an existing list of factories,
           * which will only be applied to the injector for this component and its children.
           * This step is all that's required to make a new {@link IterableDiffer} available.
     *
     * ### Example
     *
     * ```
     * @Component({
     *   viewProviders: [
     *     IterableDiffers.extend([new ImmutableListDiffer()])
     *   ]
     * })
     * ```
     */
    static extend(factories: IterableDifferFactory[]): Provider;
    find(iterable: any): IterableDifferFactory;
  }
}
declare module "angular2/src/core/change_detection/differs/default_iterable_differ" {
  import { ChangeDetectorRef } from "angular2/src/core/change_detection/change_detector_ref";
  import { IterableDiffer, IterableDifferFactory, TrackByFn } from "angular2/src/core/change_detection/differs/iterable_differs";
  export class DefaultIterableDifferFactory implements IterableDifferFactory {
    supports(obj: Object): boolean;
    create(cdRef: ChangeDetectorRef, trackByFn?: TrackByFn): DefaultIterableDiffer;
  }
  export class DefaultIterableDiffer implements IterableDiffer {
    private _trackByFn;
    private _length;
    private _collection;
    private _linkedRecords;
    private _unlinkedRecords;
    private _previousItHead;
    private _itHead;
    private _itTail;
    private _additionsHead;
    private _additionsTail;
    private _movesHead;
    private _movesTail;
    private _removalsHead;
    private _removalsTail;
    private _identityChangesHead;
    private _identityChangesTail;
    constructor(_trackByFn?: TrackByFn);
    collection: any;
    length: number;
    forEachItem(fn: Function): void;
    forEachPreviousItem(fn: Function): void;
    forEachAddedItem(fn: Function): void;
    forEachMovedItem(fn: Function): void;
    forEachRemovedItem(fn: Function): void;
    forEachIdentityChange(fn: Function): void;
    diff(collection: any): DefaultIterableDiffer;
    onDestroy(): void;
    check(collection: any): boolean;
    isDirty: boolean;
    /**
     * Reset the state of the change objects to show no changes. This means set previousKey to
     * currentKey, and clear all of the queues (additions, moves, removals).
     * Set the previousIndexes of moved and added items to their currentIndexes
     * Reset the list of additions, moves and removals
     *
     * @internal
     */
    _reset(): void;
    /**
     * This is the core function which handles differences between collections.
     *
     * - `record` is the record which we saw at this position last time. If null then it is a new
     *   item.
     * - `item` is the current item in the collection
     * - `index` is the position of the item in the collection
     *
     * @internal
     */
    _mismatch(record: CollectionChangeRecord, item: any, itemTrackBy: any, index: number): CollectionChangeRecord;
    /**
     * This check is only needed if an array contains duplicates. (Short circuit of nothing dirty)
     *
     * Use case: `[a, a]` => `[b, a, a]`
     *
     * If we did not have this check then the insertion of `b` would:
     *   1) evict first `a`
     *   2) insert `b` at `0` index.
     *   3) leave `a` at index `1` as is. <-- this is wrong!
     *   3) reinsert `a` at index 2. <-- this is wrong!
     *
     * The correct behavior is:
     *   1) evict first `a`
     *   2) insert `b` at `0` index.
     *   3) reinsert `a` at index 1.
     *   3) move `a` at from `1` to `2`.
     *
     *
     * Double check that we have not evicted a duplicate item. We need to check if the item type may
     * have already been removed:
     * The insertion of b will evict the first 'a'. If we don't reinsert it now it will be reinserted
     * at the end. Which will show up as the two 'a's switching position. This is incorrect, since a
     * better way to think of it is as insert of 'b' rather then switch 'a' with 'b' and then add 'a'
     * at the end.
     *
     * @internal
     */
    _verifyReinsertion(record: CollectionChangeRecord, item: any, itemTrackBy: any, index: number): CollectionChangeRecord;
    /**
     * Get rid of any excess {@link CollectionChangeRecord}s from the previous collection
     *
     * - `record` The first excess {@link CollectionChangeRecord}.
     *
     * @internal
     */
    _truncate(record: CollectionChangeRecord): void;
    /** @internal */
    _reinsertAfter(record: CollectionChangeRecord, prevRecord: CollectionChangeRecord, index: number): CollectionChangeRecord;
    /** @internal */
    _moveAfter(record: CollectionChangeRecord, prevRecord: CollectionChangeRecord, index: number): CollectionChangeRecord;
    /** @internal */
    _addAfter(record: CollectionChangeRecord, prevRecord: CollectionChangeRecord, index: number): CollectionChangeRecord;
    /** @internal */
    _insertAfter(record: CollectionChangeRecord, prevRecord: CollectionChangeRecord, index: number): CollectionChangeRecord;
    /** @internal */
    _remove(record: CollectionChangeRecord): CollectionChangeRecord;
    /** @internal */
    _unlink(record: CollectionChangeRecord): CollectionChangeRecord;
    /** @internal */
    _addToMoves(record: CollectionChangeRecord, toIndex: number): CollectionChangeRecord;
    /** @internal */
    _addToRemovals(record: CollectionChangeRecord): CollectionChangeRecord;
    /** @internal */
    _addIdentityChange(record: CollectionChangeRecord, item: any): CollectionChangeRecord;
    toString(): string;
  }
  export class CollectionChangeRecord {
    item: any;
    trackById: any;
    currentIndex: number;
    previousIndex: number;
    /** @internal */
    _nextPrevious: CollectionChangeRecord;
    /** @internal */
    _prev: CollectionChangeRecord;
    /** @internal */
    _next: CollectionChangeRecord;
    /** @internal */
    _prevDup: CollectionChangeRecord;
    /** @internal */
    _nextDup: CollectionChangeRecord;
    /** @internal */
    _prevRemoved: CollectionChangeRecord;
    /** @internal */
    _nextRemoved: CollectionChangeRecord;
    /** @internal */
    _nextAdded: CollectionChangeRecord;
    /** @internal */
    _nextMoved: CollectionChangeRecord;
    /** @internal */
    _nextIdentityChange: CollectionChangeRecord;
    constructor(item: any, trackById: any);
    toString(): string;
  }
}
declare module "angular2/src/core/change_detection/differs/keyvalue_differs" {
  import { ChangeDetectorRef } from "angular2/src/core/change_detection/change_detector_ref";
  import { Provider } from "angular2/src/core/di";
  /**
   * A differ that tracks changes made to an object over time.
   */
  export interface KeyValueDiffer {
    diff(object: any): any;
    onDestroy(): any;
  }
  /**
   * Provides a factory for {@link KeyValueDiffer}.
   */
  export interface KeyValueDifferFactory {
    supports(objects: any): boolean;
    create(cdRef: ChangeDetectorRef): KeyValueDiffer;
  }
  /**
   * A repository of different Map diffing strategies used by NgClass, NgStyle, and others.
   */
  export class KeyValueDiffers {
    factories: KeyValueDifferFactory[];
    constructor(factories: KeyValueDifferFactory[]);
    static create(factories: KeyValueDifferFactory[], parent?: KeyValueDiffers): KeyValueDiffers;
    /**
     * Takes an array of {@link KeyValueDifferFactory} and returns a provider used to extend the
     * inherited {@link KeyValueDiffers} instance with the provided factories and return a new
     * {@link KeyValueDiffers} instance.
     *
     * The following example shows how to extend an existing list of factories,
           * which will only be applied to the injector for this component and its children.
           * This step is all that's required to make a new {@link KeyValueDiffer} available.
     *
     * ### Example
     *
     * ```
     * @Component({
     *   viewProviders: [
     *     KeyValueDiffers.extend([new ImmutableMapDiffer()])
     *   ]
     * })
     * ```
     */
    static extend(factories: KeyValueDifferFactory[]): Provider;
    find(kv: Object): KeyValueDifferFactory;
  }
}
declare module "angular2/src/core/change_detection/differs/default_keyvalue_differ" {
  import { ChangeDetectorRef } from "angular2/src/core/change_detection/change_detector_ref";
  import { KeyValueDiffer, KeyValueDifferFactory } from "angular2/src/core/change_detection/differs/keyvalue_differs";
  export class DefaultKeyValueDifferFactory implements KeyValueDifferFactory {
    supports(obj: any): boolean;
    create(cdRef: ChangeDetectorRef): KeyValueDiffer;
  }
  export class DefaultKeyValueDiffer implements KeyValueDiffer {
    private _records;
    private _mapHead;
    private _previousMapHead;
    private _changesHead;
    private _changesTail;
    private _additionsHead;
    private _additionsTail;
    private _removalsHead;
    private _removalsTail;
    isDirty: boolean;
    forEachItem(fn: Function): void;
    forEachPreviousItem(fn: Function): void;
    forEachChangedItem(fn: Function): void;
    forEachAddedItem(fn: Function): void;
    forEachRemovedItem(fn: Function): void;
    diff(map: Map<any, any>): any;
    onDestroy(): void;
    check(map: Map<any, any>): boolean;
    /** @internal */
    _reset(): void;
    /** @internal */
    _truncate(lastRecord: KeyValueChangeRecord, record: KeyValueChangeRecord): void;
    /** @internal */
    _isInRemovals(record: KeyValueChangeRecord): boolean;
    /** @internal */
    _addToRemovals(record: KeyValueChangeRecord): void;
    /** @internal */
    _removeFromSeq(prev: KeyValueChangeRecord, record: KeyValueChangeRecord): void;
    /** @internal */
    _removeFromRemovals(record: KeyValueChangeRecord): void;
    /** @internal */
    _addToAdditions(record: KeyValueChangeRecord): void;
    /** @internal */
    _addToChanges(record: KeyValueChangeRecord): void;
    toString(): string;
    /** @internal */
    _forEach(obj: any, fn: Function): void;
  }
  export class KeyValueChangeRecord {
    key: any;
    previousValue: any;
    currentValue: any;
    /** @internal */
    _nextPrevious: KeyValueChangeRecord;
    /** @internal */
    _next: KeyValueChangeRecord;
    /** @internal */
    _nextAdded: KeyValueChangeRecord;
    /** @internal */
    _nextRemoved: KeyValueChangeRecord;
    /** @internal */
    _prevRemoved: KeyValueChangeRecord;
    /** @internal */
    _nextChanged: KeyValueChangeRecord;
    constructor(key: any);
    toString(): string;
  }
}
declare module "angular2/src/core/change_detection/parser/lexer" {
  import { BaseException } from "angular2/src/facade/exceptions";
  export enum TokenType {
    Character = 0,
    Identifier = 1,
    Keyword = 2,
    String = 3,
    Operator = 4,
    Number = 5,
  }
  export class Lexer {
    tokenize(text: string): any[];
  }
  export class Token {
    index: number;
    type: TokenType;
    numValue: number;
    strValue: string;
    constructor(index: number, type: TokenType, numValue: number, strValue: string);
    isCharacter(code: number): boolean;
    isNumber(): boolean;
    isString(): boolean;
    isOperator(operater: string): boolean;
    isIdentifier(): boolean;
    isKeyword(): boolean;
    isKeywordVar(): boolean;
    isKeywordNull(): boolean;
    isKeywordUndefined(): boolean;
    isKeywordTrue(): boolean;
    isKeywordFalse(): boolean;
    toNumber(): number;
    toString(): string;
  }
  export var EOF: Token;
  export const $EOF: number;
  export const $TAB: number;
  export const $LF: number;
  export const $VTAB: number;
  export const $FF: number;
  export const $CR: number;
  export const $SPACE: number;
  export const $BANG: number;
  export const $DQ: number;
  export const $HASH: number;
  export const $$: number;
  export const $PERCENT: number;
  export const $AMPERSAND: number;
  export const $SQ: number;
  export const $LPAREN: number;
  export const $RPAREN: number;
  export const $STAR: number;
  export const $PLUS: number;
  export const $COMMA: number;
  export const $MINUS: number;
  export const $PERIOD: number;
  export const $SLASH: number;
  export const $COLON: number;
  export const $SEMICOLON: number;
  export const $LT: number;
  export const $EQ: number;
  export const $GT: number;
  export const $QUESTION: number;
  export const $LBRACKET: number;
  export const $BACKSLASH: number;
  export const $RBRACKET: number;
  export const $LBRACE: number;
  export const $BAR: number;
  export const $RBRACE: number;
  export class ScannerError extends BaseException {
    message: any;
    constructor(message: any);
    toString(): string;
  }
  export function isIdentifier(input: string): boolean;
}
declare module "angular2/src/core/change_detection/parser/parser" {
  import { Lexer, Token } from "angular2/src/core/change_detection/parser/lexer";
  import { Reflector } from "angular2/src/core/reflection/reflection";
  import { AST, BindingPipe, LiteralMap, TemplateBinding, ASTWithSource } from "angular2/src/core/change_detection/parser/ast";
  export class Parser {
        /** @internal */ _lexer: Lexer;
    /** @internal */
    _reflector: Reflector;
    constructor(/** @internal */ _lexer: Lexer, providedReflector?: Reflector);
    parseAction(input: string, location: any): ASTWithSource;
    parseBinding(input: string, location: any): ASTWithSource;
    parseSimpleBinding(input: string, location: string): ASTWithSource;
    private _parseBindingAst(input, location);
    private _parseQuote(input, location);
    parseTemplateBindings(input: string, location: any): TemplateBinding[];
    parseInterpolation(input: string, location: any): ASTWithSource;
    wrapLiteralPrimitive(input: string, location: any): ASTWithSource;
    private _checkNoInterpolation(input, location);
    private _findInterpolationErrorColumn(parts, partInErrIdx);
  }
  export class _ParseAST {
    input: string;
    location: any;
    tokens: any[];
    reflector: Reflector;
    parseAction: boolean;
    index: number;
    constructor(input: string, location: any, tokens: any[], reflector: Reflector, parseAction: boolean);
    peek(offset: number): Token;
    next: Token;
    inputIndex: number;
    advance(): void;
    optionalCharacter(code: number): boolean;
    optionalKeywordVar(): boolean;
    peekKeywordVar(): boolean;
    expectCharacter(code: number): void;
    optionalOperator(op: string): boolean;
    expectOperator(operator: string): void;
    expectIdentifierOrKeyword(): string;
    expectIdentifierOrKeywordOrString(): string;
    parseChain(): AST;
    parsePipe(): AST;
    parseExpression(): AST;
    parseConditional(): AST;
    parseLogicalOr(): AST;
    parseLogicalAnd(): AST;
    parseEquality(): AST;
    parseRelational(): AST;
    parseAdditive(): AST;
    parseMultiplicative(): AST;
    parsePrefix(): AST;
    parseCallChain(): AST;
    parsePrimary(): AST;
    parseExpressionList(terminator: number): any[];
    parseLiteralMap(): LiteralMap;
    parseAccessMemberOrMethodCall(receiver: AST, isSafe?: boolean): AST;
    parseCallArguments(): BindingPipe[];
    parseBlockContent(): AST;
    /**
     * An identifier, a keyword, a string with an optional `-` inbetween.
     */
    expectTemplateBindingKey(): string;
    parseTemplateBindings(): any[];
    error(message: string, index?: number): void;
  }
}
declare module "angular2/src/core/change_detection/exceptions" {
  import { BaseException, WrappedException } from "angular2/src/facade/exceptions";
  /**
   * An error thrown if application changes model breaking the top-down data flow.
   *
   * This exception is only thrown in dev mode.
   *
   * <!-- TODO: Add a link once the dev mode option is configurable -->
   *
   * ### Example
   *
   * ```typescript
   * @Component({
   *   selector: 'parent',
   *   template: `
   *     <child [prop]="parentProp"></child>
   *   `,
   *   directives: [forwardRef(() => Child)]
   * })
   * class Parent {
   *   parentProp = "init";
   * }
   *
   * @Directive({selector: 'child', inputs: ['prop']})
   * class Child {
   *   constructor(public parent: Parent) {}
   *
   *   set prop(v) {
   *     // this updates the parent property, which is disallowed during change detection
   *     // this will result in ExpressionChangedAfterItHasBeenCheckedException
   *     this.parent.parentProp = "updated";
   *   }
   * }
   * ```
   */
  export class ExpressionChangedAfterItHasBeenCheckedException extends BaseException {
    constructor(exp: string, oldValue: any, currValue: any, context: any);
  }
  /**
   * Thrown when an expression evaluation raises an exception.
   *
   * This error wraps the original exception to attach additional contextual information that can
   * be useful for debugging.
   *
   * ### Example ([live demo](http://plnkr.co/edit/2Kywoz?p=preview))
   *
   * ```typescript
   * @Directive({selector: 'child', inputs: ['prop']})
   * class Child {
   *   prop;
   * }
   *
   * @Component({
   *   selector: 'app',
   *   template: `
   *     <child [prop]="field.first"></child>
   *   `,
   *   directives: [Child]
   * })
   * class App {
   *   field = null;
   * }
   *
   * bootstrap(App);
   * ```
   *
   * You can access the original exception and stack through the `originalException` and
   * `originalStack` properties.
   */
  export class ChangeDetectionError extends WrappedException {
    /**
     * Information about the expression that triggered the exception.
     */
    location: string;
    constructor(exp: string, originalException: any, originalStack: any, context: any);
  }
  /**
   * Thrown when change detector executes on dehydrated view.
   *
   * This error indicates a bug in the framework.
   *
   * This is an internal Angular error.
   */
  export class DehydratedException extends BaseException {
    constructor(details: string);
  }
  /**
   * Wraps an exception thrown by an event handler.
   */
  export class EventEvaluationError extends WrappedException {
    constructor(eventName: string, originalException: any, originalStack: any, context: any);
  }
  /**
   * Error context included when an event handler throws an exception.
   */
  export class EventEvaluationErrorContext {
    element: any;
    componentElement: any;
    context: any;
    locals: any;
    injector: any;
    constructor(element: any, componentElement: any, context: any, locals: any, injector: any);
  }
}
declare module "angular2/src/core/change_detection/proto_record" {
  import { BindingRecord } from "angular2/src/core/change_detection/binding_record";
  import { DirectiveIndex } from "angular2/src/core/change_detection/directive_record";
  export enum RecordType {
    Self = 0,
    Const = 1,
    PrimitiveOp = 2,
    PropertyRead = 3,
    PropertyWrite = 4,
    Local = 5,
    InvokeMethod = 6,
    InvokeClosure = 7,
    KeyedRead = 8,
    KeyedWrite = 9,
    Pipe = 10,
    Interpolate = 11,
    SafeProperty = 12,
    CollectionLiteral = 13,
    SafeMethodInvoke = 14,
    DirectiveLifecycle = 15,
    Chain = 16,
    SkipRecordsIf = 17,
    SkipRecordsIfNot = 18,
    SkipRecords = 19,
  }
  export class ProtoRecord {
    mode: RecordType;
    name: string;
    funcOrValue: any;
    args: any[];
    fixedArgs: any[];
    contextIndex: number;
    directiveIndex: DirectiveIndex;
    selfIndex: number;
    bindingRecord: BindingRecord;
    lastInBinding: boolean;
    lastInDirective: boolean;
    argumentToPureFunction: boolean;
    referencedBySelf: boolean;
    propertyBindingIndex: number;
    constructor(mode: RecordType, name: string, funcOrValue: any, args: any[], fixedArgs: any[], contextIndex: number, directiveIndex: DirectiveIndex, selfIndex: number, bindingRecord: BindingRecord, lastInBinding: boolean, lastInDirective: boolean, argumentToPureFunction: boolean, referencedBySelf: boolean, propertyBindingIndex: number);
    isPureFunction(): boolean;
    isUsedByOtherRecord(): boolean;
    shouldBeChecked(): boolean;
    isPipeRecord(): boolean;
    isConditionalSkipRecord(): boolean;
    isUnconditionalSkipRecord(): boolean;
    isSkipRecord(): boolean;
    isLifeCycleRecord(): boolean;
  }
}
declare module "angular2/src/core/change_detection/pipe_lifecycle_reflector" {
  export function implementsOnDestroy(pipe: any): boolean;
}
declare module "angular2/src/core/change_detection/pipe_transform" {
  /**
   * To create a Pipe, you must implement this interface.
   *
   * Angular invokes the `transform` method with the value of a binding
   * as the first argument, and any parameters as the second argument in list form.
   *
   * ## Syntax
   *
   * `value | pipeName[:arg0[:arg1...]]`
   *
   * ### Example ([live demo](http://plnkr.co/edit/f5oyIked9M2cKzvZNKHV?p=preview))
   *
   * The `RepeatPipe` below repeats the value as many times as indicated by the first argument:
   *
   * ```
   * import {Pipe, PipeTransform} from 'angular2/core';
   *
   * @Pipe({name: 'repeat'})
   * export class RepeatPipe implements PipeTransform {
   *   transform(value: any, args: any[] = []) {
   *     if (args.length == 0) {
   *       throw new Error('repeat pipe requires one argument');
   *     }
   *     let times: number = args[0];
   *     return value.repeat(times);
   *   }
   * }
   * ```
   *
   * Invoking `{{ 'ok' | repeat:3 }}` in a template produces `okokok`.
   *
   */
  export interface PipeTransform {
    transform(value: any, args: any[]): any;
  }
}
declare module "angular2/src/core/change_detection/pipes" {
  import { PipeTransform } from "angular2/src/core/change_detection/pipe_transform";
  export interface Pipes {
    get(name: string): SelectedPipe;
  }
  export class SelectedPipe {
    pipe: PipeTransform;
    pure: boolean;
    constructor(pipe: PipeTransform, pure: boolean);
  }
}
declare module "angular2/src/core/change_detection/change_detection_util" {
  import { ProtoRecord } from "angular2/src/core/change_detection/proto_record";
  import { ChangeDetectionStrategy } from "angular2/src/core/change_detection/constants";
  import { BindingTarget } from "angular2/src/core/change_detection/binding_record";
  import { DirectiveIndex } from "angular2/src/core/change_detection/directive_record";
  import { SelectedPipe } from "angular2/src/core/change_detection/pipes";
  /**
   * Indicates that the result of a {@link PipeMetadata} transformation has changed even though the
   * reference
   * has not changed.
   *
   * The wrapped value will be unwrapped by change detection, and the unwrapped value will be stored.
   *
   * Example:
   *
   * ```
   * if (this._latestValue === this._latestReturnedValue) {
   *    return this._latestReturnedValue;
   *  } else {
   *    this._latestReturnedValue = this._latestValue;
   *    return WrappedValue.wrap(this._latestValue); // this will force update
   *  }
   * ```
   */
  export class WrappedValue {
    wrapped: any;
    constructor(wrapped: any);
    static wrap(value: any): WrappedValue;
  }
  /**
   * Represents a basic change from a previous to a new value.
   */
  export class SimpleChange {
    previousValue: any;
    currentValue: any;
    constructor(previousValue: any, currentValue: any);
    /**
     * Check whether the new value is the first value assigned.
     */
    isFirstChange(): boolean;
  }
  export class ChangeDetectionUtil {
    static uninitialized: Object;
    static arrayFn0(): any[];
    static arrayFn1(a1: any): any[];
    static arrayFn2(a1: any, a2: any): any[];
    static arrayFn3(a1: any, a2: any, a3: any): any[];
    static arrayFn4(a1: any, a2: any, a3: any, a4: any): any[];
    static arrayFn5(a1: any, a2: any, a3: any, a4: any, a5: any): any[];
    static arrayFn6(a1: any, a2: any, a3: any, a4: any, a5: any, a6: any): any[];
    static arrayFn7(a1: any, a2: any, a3: any, a4: any, a5: any, a6: any, a7: any): any[];
    static arrayFn8(a1: any, a2: any, a3: any, a4: any, a5: any, a6: any, a7: any, a8: any): any[];
    static arrayFn9(a1: any, a2: any, a3: any, a4: any, a5: any, a6: any, a7: any, a8: any, a9: any): any[];
    static operation_negate(value: any): any;
    static operation_add(left: any, right: any): any;
    static operation_subtract(left: any, right: any): any;
    static operation_multiply(left: any, right: any): any;
    static operation_divide(left: any, right: any): any;
    static operation_remainder(left: any, right: any): any;
    static operation_equals(left: any, right: any): any;
    static operation_not_equals(left: any, right: any): any;
    static operation_identical(left: any, right: any): any;
    static operation_not_identical(left: any, right: any): any;
    static operation_less_then(left: any, right: any): any;
    static operation_greater_then(left: any, right: any): any;
    static operation_less_or_equals_then(left: any, right: any): any;
    static operation_greater_or_equals_then(left: any, right: any): any;
    static cond(cond: any, trueVal: any, falseVal: any): any;
    static mapFn(keys: any[]): any;
    static keyedAccess(obj: any, args: any): any;
    static unwrapValue(value: any): any;
    static changeDetectionMode(strategy: ChangeDetectionStrategy): ChangeDetectionStrategy;
    static simpleChange(previousValue: any, currentValue: any): SimpleChange;
    static isValueBlank(value: any): boolean;
    static s(value: any): string;
    static protoByIndex(protos: ProtoRecord[], selfIndex: number): ProtoRecord;
    static callPipeOnDestroy(selectedPipe: SelectedPipe): void;
    static bindingTarget(mode: string, elementIndex: number, name: string, unit: string, debug: string): BindingTarget;
    static directiveIndex(elementIndex: number, directiveIndex: number): DirectiveIndex;
    static looseNotIdentical(a: any, b: any): boolean;
    static devModeEqual(a: any, b: any): boolean;
  }
}
declare module "angular2/src/core/profile/wtf_impl" {
  /**
   * A scope function for the Web Tracing Framework (WTF).
   */
  export interface WtfScopeFn {
    (arg0?: any, arg1?: any): any;
  }
  export interface Range {
  }
  export interface Scope {
    (...args: any[]): any;
  }
  export function detectWTF(): boolean;
  export function createScope(signature: string, flags?: any): any;
  export function leave<T>(scope: Scope, returnValue?: T): T;
  export function startTimeRange(rangeType: string, action: string): Range;
  export function endTimeRange(range: Range): void;
}
declare module "angular2/src/core/profile/profile" {
  export { WtfScopeFn } from "angular2/src/core/profile/wtf_impl";
  import * as impl from "angular2/src/core/profile/wtf_impl";
  /**
   * True if WTF is enabled.
   */
  export var wtfEnabled: boolean;
  /**
   * Create trace scope.
   *
   * Scopes must be strictly nested and are analogous to stack frames, but
   * do not have to follow the stack frames. Instead it is recommended that they follow logical
   * nesting. You may want to use
   * [Event
   * Signatures](http://google.github.io/tracing-framework/instrumenting-code.html#custom-events)
   * as they are defined in WTF.
   *
   * Used to mark scope entry. The return value is used to leave the scope.
   *
   *     var myScope = wtfCreateScope('MyClass#myMethod(ascii someVal)');
   *
   *     someMethod() {
   *        var s = myScope('Foo'); // 'Foo' gets stored in tracing UI
   *        // DO SOME WORK HERE
   *        return wtfLeave(s, 123); // Return value 123
   *     }
   *
   * Note, adding try-finally block around the work to ensure that `wtfLeave` gets called can
   * negatively impact the performance of your application. For this reason we recommend that
   * you don't add them to ensure that `wtfLeave` gets called. In production `wtfLeave` is a noop and
   * so try-finally block has no value. When debugging perf issues, skipping `wtfLeave`, do to
   * exception, will produce incorrect trace, but presence of exception signifies logic error which
   * needs to be fixed before the app should be profiled. Add try-finally only when you expect that
   * an exception is expected during normal execution while profiling.
   *
   */
  export var wtfCreateScope: (signature: string, flags?: any) => impl.WtfScopeFn;
  /**
   * Used to mark end of Scope.
   *
   * - `scope` to end.
   * - `returnValue` (optional) to be passed to the WTF.
   *
   * Returns the `returnValue for easy chaining.
   */
  export var wtfLeave: <T>(scope: any, returnValue?: T) => T;
  /**
   * Used to mark Async start. Async are similar to scope but they don't have to be strictly nested.
   * The return value is used in the call to [endAsync]. Async ranges only work if WTF has been
   * enabled.
   *
   *     someMethod() {
   *        var s = wtfStartTimeRange('HTTP:GET', 'some.url');
   *        var future = new Future.delay(5).then((_) {
   *          wtfEndTimeRange(s);
   *        });
   *     }
   */
  export var wtfStartTimeRange: (rangeType: string, action: string) => any;
  /**
   * Ends a async time range operation.
   * [range] is the return value from [wtfStartTimeRange] Async ranges only work if WTF has been
   * enabled.
   */
  export var wtfEndTimeRange: (range: any) => void;
}
declare module "angular2/src/core/change_detection/abstract_change_detector" {
  import { ChangeDetectorRef } from "angular2/src/core/change_detection/change_detector_ref";
  import { DirectiveIndex } from "angular2/src/core/change_detection/directive_record";
  import { ChangeDetector, ChangeDispatcher } from "angular2/src/core/change_detection/interfaces";
  import { Pipes } from "angular2/src/core/change_detection/pipes";
  import { BindingTarget } from "angular2/src/core/change_detection/binding_record";
  import { Locals } from "angular2/src/core/change_detection/parser/locals";
  import { ChangeDetectionStrategy, ChangeDetectorState } from "angular2/src/core/change_detection/constants";
  export class AbstractChangeDetector<T> implements ChangeDetector {
    id: string;
    numberOfPropertyProtoRecords: number;
    bindingTargets: BindingTarget[];
    directiveIndices: DirectiveIndex[];
    strategy: ChangeDetectionStrategy;
    contentChildren: any[];
    viewChildren: any[];
    parent: ChangeDetector;
    ref: ChangeDetectorRef;
    state: ChangeDetectorState;
    context: T;
    locals: Locals;
    mode: ChangeDetectionStrategy;
    pipes: Pipes;
    propertyBindingIndex: number;
    outputSubscriptions: any[];
    dispatcher: ChangeDispatcher;
    constructor(id: string, numberOfPropertyProtoRecords: number, bindingTargets: BindingTarget[], directiveIndices: DirectiveIndex[], strategy: ChangeDetectionStrategy);
    addContentChild(cd: ChangeDetector): void;
    removeContentChild(cd: ChangeDetector): void;
    addViewChild(cd: ChangeDetector): void;
    removeViewChild(cd: ChangeDetector): void;
    remove(): void;
    handleEvent(eventName: string, elIndex: number, event: any): boolean;
    handleEventInternal(eventName: string, elIndex: number, locals: Locals): boolean;
    detectChanges(): void;
    checkNoChanges(): void;
    runDetectChanges(throwOnChange: boolean): void;
    detectChangesInRecords(throwOnChange: boolean): void;
    detectChangesInRecordsInternal(throwOnChange: boolean): void;
    hydrate(context: T, locals: Locals, dispatcher: ChangeDispatcher, pipes: Pipes): void;
    hydrateDirectives(dispatcher: ChangeDispatcher): void;
    dehydrate(): void;
    dehydrateDirectives(destroyPipes: boolean): void;
    hydrated(): boolean;
    destroyRecursive(): void;
    afterContentLifecycleCallbacks(): void;
    afterContentLifecycleCallbacksInternal(): void;
    afterViewLifecycleCallbacks(): void;
    afterViewLifecycleCallbacksInternal(): void;
    /** @internal */
    _detectChangesContentChildren(throwOnChange: boolean): void;
    /** @internal */
    _detectChangesInViewChildren(throwOnChange: boolean): void;
    markAsCheckOnce(): void;
    markPathToRootAsCheckOnce(): void;
    private _unsubscribeFromOutputs();
    getDirectiveFor(directives: any, index: number): any;
    getDetectorFor(directives: any, index: number): ChangeDetector;
    notifyDispatcher(value: any): void;
    logBindingUpdate(value: any): void;
    addChange(changes: {
      [key: string]: any;
    }, oldValue: any, newValue: any): {
        [key: string]: any;
      };
    private _throwError(exception, stack);
    throwOnChangeError(oldValue: any, newValue: any): void;
    throwDehydratedError(detail: string): void;
    private _currentBinding();
  }
}
declare module "angular2/src/core/change_detection/event_binding" {
  import { DirectiveIndex } from "angular2/src/core/change_detection/directive_record";
  import { ProtoRecord } from "angular2/src/core/change_detection/proto_record";
  export class EventBinding {
    eventName: string;
    elIndex: number;
    dirIndex: DirectiveIndex;
    records: ProtoRecord[];
    constructor(eventName: string, elIndex: number, dirIndex: DirectiveIndex, records: ProtoRecord[]);
  }
}
declare module "angular2/src/core/change_detection/dynamic_change_detector" {
  import { AbstractChangeDetector } from "angular2/src/core/change_detection/abstract_change_detector";
  import { EventBinding } from "angular2/src/core/change_detection/event_binding";
  import { BindingTarget } from "angular2/src/core/change_detection/binding_record";
  import { DirectiveRecord, DirectiveIndex } from "angular2/src/core/change_detection/directive_record";
  import { Locals } from "angular2/src/core/change_detection/parser/locals";
  import { ChangeDispatcher, ChangeDetectorGenConfig } from "angular2/src/core/change_detection/interfaces";
  import { ChangeDetectionStrategy } from "angular2/src/core/change_detection/constants";
  import { ProtoRecord } from "angular2/src/core/change_detection/proto_record";
  export class DynamicChangeDetector extends AbstractChangeDetector<any> {
    private _records;
    private _eventBindings;
    private _directiveRecords;
    private _genConfig;
    values: any[];
    changes: any[];
    localPipes: any[];
    prevContexts: any[];
    constructor(id: string, numberOfPropertyProtoRecords: number, propertyBindingTargets: BindingTarget[], directiveIndices: DirectiveIndex[], strategy: ChangeDetectionStrategy, _records: ProtoRecord[], _eventBindings: EventBinding[], _directiveRecords: DirectiveRecord[], _genConfig: ChangeDetectorGenConfig);
    handleEventInternal(eventName: string, elIndex: number, locals: Locals): boolean;
    /** @internal */
    _processEventBinding(eb: EventBinding, locals: Locals): any;
    private _computeSkipLength(protoIndex, proto, values);
    /** @internal */
    _markPathAsCheckOnce(proto: ProtoRecord): void;
    /** @internal */
    _matchingEventBindings(eventName: string, elIndex: number): EventBinding[];
    hydrateDirectives(dispatcher: ChangeDispatcher): void;
    private _createEventHandler(boundElementIndex, eventName);
    dehydrateDirectives(destroyPipes: boolean): void;
    /** @internal */
    _destroyPipes(): void;
    /** @internal */
    _destroyDirectives(): void;
    checkNoChanges(): void;
    detectChangesInRecordsInternal(throwOnChange: boolean): void;
    /** @internal */
    _firstInBinding(r: ProtoRecord): boolean;
    afterContentLifecycleCallbacksInternal(): void;
    afterViewLifecycleCallbacksInternal(): void;
    /** @internal */
    private _updateDirectiveOrElement(change, bindingRecord);
    /** @internal */
    private _addChange(bindingRecord, change, changes);
    /** @internal */
    private _getDirectiveFor(directiveIndex);
    /** @internal */
    private _getDetectorFor(directiveIndex);
    /** @internal */
    private _check(proto, throwOnChange, values, locals);
    /** @internal */
    private _referenceCheck(proto, throwOnChange, values, locals);
    private _calculateCurrValue(proto, values, locals);
    private _pipeCheck(proto, throwOnChange, values);
    private _pipeFor(proto, context);
    private _readContext(proto, values);
    private _readSelf(proto, values);
    private _writeSelf(proto, value, values);
    private _readPipe(proto);
    private _writePipe(proto, value);
    private _setChanged(proto, value);
    private _pureFuncAndArgsDidNotChange(proto);
    private _argsChanged(proto);
    private _argsOrContextChanged(proto);
    private _readArgs(proto, values);
  }
}
declare module "angular2/src/core/change_detection/coalesce" {
  import { ProtoRecord } from "angular2/src/core/change_detection/proto_record";
  /**
   * Removes "duplicate" records. It assumes that record evaluation does not have side-effects.
   *
   * Records that are not last in bindings are removed and all the indices of the records that depend
   * on them are updated.
   *
   * Records that are last in bindings CANNOT be removed, and instead are replaced with very cheap
   * SELF records.
   *
   * @internal
   */
  export function coalesce(srcRecords: ProtoRecord[]): ProtoRecord[];
}
declare module "angular2/src/core/change_detection/proto_change_detector" {
  import { ChangeDetector, ProtoChangeDetector, ChangeDetectorDefinition } from "angular2/src/core/change_detection/interfaces";
  import { BindingRecord, BindingTarget } from "angular2/src/core/change_detection/binding_record";
  import { DirectiveIndex } from "angular2/src/core/change_detection/directive_record";
  import { EventBinding } from "angular2/src/core/change_detection/event_binding";
  import { ProtoRecord } from "angular2/src/core/change_detection/proto_record";
  export class DynamicProtoChangeDetector implements ProtoChangeDetector {
    private _definition;
    /** @internal */
    _propertyBindingRecords: ProtoRecord[];
    /** @internal */
    _propertyBindingTargets: BindingTarget[];
    /** @internal */
    _eventBindingRecords: EventBinding[];
    /** @internal */
    _directiveIndices: DirectiveIndex[];
    constructor(_definition: ChangeDetectorDefinition);
    instantiate(): ChangeDetector;
  }
  export function createPropertyRecords(definition: ChangeDetectorDefinition): ProtoRecord[];
  export function createEventRecords(definition: ChangeDetectorDefinition): EventBinding[];
  export class ProtoRecordBuilder {
    records: ProtoRecord[];
    add(b: BindingRecord, variableNames: string[], bindingIndex: number): void;
    /** @internal */
    _setArgumentToPureFunction(startIndex: number): void;
    /** @internal */
    _appendRecords(b: BindingRecord, variableNames: string[], bindingIndex: number): void;
  }
}
declare module "angular2/src/core/change_detection/codegen_name_util" {
  import { DirectiveIndex } from "angular2/src/core/change_detection/directive_record";
  import { ProtoRecord } from "angular2/src/core/change_detection/proto_record";
  import { EventBinding } from "angular2/src/core/change_detection/event_binding";
  export const CONTEXT_ACCESSOR: string;
  export const CONTEXT_INDEX: number;
  /**
   * Returns `s` with all non-identifier characters removed.
   */
  export function sanitizeName(s: string): string;
  /**
   * Class responsible for providing field and local variable names for change detector classes.
   * Also provides some convenience functions, for example, declaring variables, destroying pipes,
   * and dehydrating the detector.
   */
  export class CodegenNameUtil {
    private _records;
    private _eventBindings;
    private _directiveRecords;
    private _utilName;
    /**
     * Record names sanitized for use as fields.
     * See [sanitizeName] for details.
     * @internal
     */
    _sanitizedNames: string[];
    /** @internal */
    _sanitizedEventNames: Map<EventBinding, string[]>;
    constructor(_records: ProtoRecord[], _eventBindings: EventBinding[], _directiveRecords: any[], _utilName: string);
    /** @internal */
    _addFieldPrefix(name: string): string;
    getDispatcherName(): string;
    getPipesAccessorName(): string;
    getProtosName(): string;
    getDirectivesAccessorName(): string;
    getLocalsAccessorName(): string;
    getStateName(): string;
    getModeName(): string;
    getPropertyBindingIndex(): string;
    getLocalName(idx: number): string;
    getEventLocalName(eb: EventBinding, idx: number): string;
    getChangeName(idx: number): string;
    /**
     * Generate a statement initializing local variables used when detecting changes.
     */
    genInitLocals(): string;
    /**
     * Generate a statement initializing local variables for event handlers.
     */
    genInitEventLocals(): string;
    getPreventDefaultAccesor(): string;
    getFieldCount(): number;
    getFieldName(idx: number): string;
    getAllFieldNames(): string[];
    /**
     * Generates statements which clear all fields so that the change detector is dehydrated.
     */
    genDehydrateFields(): string;
    /**
     * Generates statements destroying all pipe variables.
     */
    genPipeOnDestroy(): string;
    getPipeName(idx: number): string;
    getDirectiveName(d: DirectiveIndex): string;
    getDetectorName(d: DirectiveIndex): string;
  }
}
declare module "angular2/src/core/change_detection/codegen_facade" {
  /**
   * Converts `funcOrValue` to a string which can be used in generated code.
   */
  export function codify(obj: any): string;
  export function rawString(str: string): string;
  /**
   * Combine the strings of generated code into a single interpolated string.
   * Each element of `vals` is expected to be a string literal or a codegen'd
   * call to a method returning a string.
   */
  export function combineGeneratedStrings(vals: string[]): string;
}
declare module "angular2/src/core/change_detection/codegen_logic_util" {
  import { CodegenNameUtil } from "angular2/src/core/change_detection/codegen_name_util";
  import { ProtoRecord } from "angular2/src/core/change_detection/proto_record";
  import { BindingTarget } from "angular2/src/core/change_detection/binding_record";
  import { DirectiveRecord } from "angular2/src/core/change_detection/directive_record";
  /**
   * Class responsible for providing change detection logic for change detector classes.
   */
  export class CodegenLogicUtil {
    private _names;
    private _utilName;
    private _changeDetectorStateName;
    constructor(_names: CodegenNameUtil, _utilName: string, _changeDetectorStateName: string);
    /**
     * Generates a statement which updates the local variable representing `protoRec` with the current
     * value of the record. Used by property bindings.
     */
    genPropertyBindingEvalValue(protoRec: ProtoRecord): string;
    /**
     * Generates a statement which updates the local variable representing `protoRec` with the current
     * value of the record. Used by event bindings.
     */
    genEventBindingEvalValue(eventRecord: any, protoRec: ProtoRecord): string;
    private _genEvalValue(protoRec, getLocalName, localsAccessor);
    genPropertyBindingTargets(propertyBindingTargets: BindingTarget[], genDebugInfo: boolean): string;
    genDirectiveIndices(directiveRecords: DirectiveRecord[]): string;
    /** @internal */
    _genInterpolation(protoRec: ProtoRecord): string;
    genHydrateDirectives(directiveRecords: DirectiveRecord[]): string;
    genDirectivesOnDestroy(directiveRecords: DirectiveRecord[]): string;
    private _genEventHandler(boundElementIndex, eventName);
    private _genReadDirective(index);
    genHydrateDetectors(directiveRecords: DirectiveRecord[]): string;
    genContentLifecycleCallbacks(directiveRecords: DirectiveRecord[]): string[];
    genViewLifecycleCallbacks(directiveRecords: DirectiveRecord[]): string[];
  }
}
declare module "angular2/src/core/change_detection/change_detection_jit_generator" {
  import { ProtoRecord } from "angular2/src/core/change_detection/proto_record";
  import { EventBinding } from "angular2/src/core/change_detection/event_binding";
  import { ChangeDetectorDefinition } from "angular2/src/core/change_detection/interfaces";
  export class ChangeDetectorJITGenerator {
    private changeDetectionUtilVarName;
    private abstractChangeDetectorVarName;
    private changeDetectorStateVarName;
    private _logic;
    private _names;
    private _endOfBlockIdxs;
    private id;
    private changeDetectionStrategy;
    private records;
    private propertyBindingTargets;
    private eventBindings;
    private directiveRecords;
    private genConfig;
    typeName: string;
    constructor(definition: ChangeDetectorDefinition, changeDetectionUtilVarName: string, abstractChangeDetectorVarName: string, changeDetectorStateVarName: string);
    generate(): Function;
    generateSource(): string;
    /** @internal */
    _genPropertyBindingTargets(): string;
    /** @internal */
    _genDirectiveIndices(): string;
    /** @internal */
    _maybeGenHandleEventInternal(): string;
    /** @internal */
    _genEventBinding(eb: EventBinding): string;
    /** @internal */
    _genEventBindingEval(eb: EventBinding, r: ProtoRecord): string;
    /** @internal */
    _genMarkPathToRootAsCheckOnce(r: ProtoRecord): string;
    /** @internal */
    _genUpdatePreventDefault(eb: EventBinding, r: ProtoRecord): string;
    /** @internal */
    _maybeGenDehydrateDirectives(): string;
    /** @internal */
    _maybeGenHydrateDirectives(): string;
    /** @internal */
    _maybeGenAfterContentLifecycleCallbacks(): string;
    /** @internal */
    _maybeGenAfterViewLifecycleCallbacks(): string;
    /** @internal */
    _genAllRecords(rs: ProtoRecord[]): string;
    /** @internal */
    _genConditionalSkip(r: ProtoRecord, condition: string): string;
    /** @internal */
    _genUnconditionalSkip(r: ProtoRecord): string;
    /** @internal */
    _genEndOfSkipBlock(protoIndex: number): string;
    /** @internal */
    _genDirectiveLifecycle(r: ProtoRecord): string;
    /** @internal */
    _genPipeCheck(r: ProtoRecord): string;
    /** @internal */
    _genReferenceCheck(r: ProtoRecord): string;
    /** @internal */
    _genChangeMarker(r: ProtoRecord): string;
    /** @internal */
    _genUpdateDirectiveOrElement(r: ProtoRecord): string;
    /** @internal */
    _genThrowOnChangeCheck(oldValue: string, newValue: string): string;
    /** @internal */
    _genAddToChanges(r: ProtoRecord): string;
    /** @internal */
    _maybeFirstInBinding(r: ProtoRecord): string;
    /** @internal */
    _maybeGenLastInDirective(r: ProtoRecord): string;
    /** @internal */
    _genOnCheck(r: ProtoRecord): string;
    /** @internal */
    _genOnInit(r: ProtoRecord): string;
    /** @internal */
    _genOnChange(r: ProtoRecord): string;
    /** @internal */
    _genNotifyOnPushDetectors(r: ProtoRecord): string;
  }
}
declare module "angular2/src/core/change_detection/jit_proto_change_detector" {
  import { ProtoChangeDetector, ChangeDetector, ChangeDetectorDefinition } from "angular2/src/core/change_detection/interfaces";
  export class JitProtoChangeDetector implements ProtoChangeDetector {
    private definition;
    /** @internal */
    _factory: Function;
    constructor(definition: ChangeDetectorDefinition);
    static isSupported(): boolean;
    instantiate(): ChangeDetector;
    /** @internal */
    _createFactory(definition: ChangeDetectorDefinition): Function;
  }
}
declare module "angular2/src/core/change_detection/change_detection" {
  import { IterableDiffers, IterableDifferFactory } from "angular2/src/core/change_detection/differs/iterable_differs";
  import { KeyValueDiffers, KeyValueDifferFactory } from "angular2/src/core/change_detection/differs/keyvalue_differs";
  export { DefaultKeyValueDifferFactory, KeyValueChangeRecord } from "angular2/src/core/change_detection/differs/default_keyvalue_differ";
  export { DefaultIterableDifferFactory, CollectionChangeRecord } from "angular2/src/core/change_detection/differs/default_iterable_differ";
  export { ASTWithSource, AST, AstTransformer, PropertyRead, LiteralArray, ImplicitReceiver } from "angular2/src/core/change_detection/parser/ast";
  export { Lexer } from "angular2/src/core/change_detection/parser/lexer";
  export { Parser } from "angular2/src/core/change_detection/parser/parser";
  export { Locals } from "angular2/src/core/change_detection/parser/locals";
  export { DehydratedException, ExpressionChangedAfterItHasBeenCheckedException, ChangeDetectionError } from "angular2/src/core/change_detection/exceptions";
  export { ProtoChangeDetector, ChangeDetector, ChangeDispatcher, ChangeDetectorDefinition, DebugContext, ChangeDetectorGenConfig } from "angular2/src/core/change_detection/interfaces";
  export { ChangeDetectionStrategy, CHANGE_DETECTION_STRATEGY_VALUES } from "angular2/src/core/change_detection/constants";
  export { DynamicProtoChangeDetector } from "angular2/src/core/change_detection/proto_change_detector";
  export { JitProtoChangeDetector } from "angular2/src/core/change_detection/jit_proto_change_detector";
  export { BindingRecord, BindingTarget } from "angular2/src/core/change_detection/binding_record";
  export { DirectiveIndex, DirectiveRecord } from "angular2/src/core/change_detection/directive_record";
  export { DynamicChangeDetector } from "angular2/src/core/change_detection/dynamic_change_detector";
  export { ChangeDetectorRef } from "angular2/src/core/change_detection/change_detector_ref";
  export { IterableDiffers, IterableDiffer, IterableDifferFactory, TrackByFn } from "angular2/src/core/change_detection/differs/iterable_differs";
  export { KeyValueDiffers, KeyValueDiffer, KeyValueDifferFactory } from "angular2/src/core/change_detection/differs/keyvalue_differs";
  export { PipeTransform } from "angular2/src/core/change_detection/pipe_transform";
  export { WrappedValue, SimpleChange } from "angular2/src/core/change_detection/change_detection_util";
  /**
   * Structural diffing for `Object`s and `Map`s.
   */
  export const keyValDiff: KeyValueDifferFactory[];
  /**
   * Structural diffing for `Iterable` types such as `Array`s.
   */
  export const iterableDiff: IterableDifferFactory[];
  export const defaultIterableDiffers: IterableDiffers;
  export const defaultKeyValueDiffers: KeyValueDiffers;
}
declare module "angular2/src/core/change_detection" {
  /**
   * @module
   * @description
   * Change detection enables data binding in Angular.
   */
  export { ChangeDetectionStrategy, ExpressionChangedAfterItHasBeenCheckedException, ChangeDetectionError, ChangeDetectorRef, WrappedValue, SimpleChange, PipeTransform, IterableDiffers, IterableDiffer, IterableDifferFactory, KeyValueDiffers, KeyValueDiffer, KeyValueDifferFactory, CollectionChangeRecord, KeyValueChangeRecord, TrackByFn } from "angular2/src/core/change_detection/change_detection";
}
declare module "angular2/src/core/metadata/view" {
  import { Type } from "angular2/src/facade/lang";
  /**
   * Defines template and style encapsulation options available for Component's {@link View}.
   *
   * See {@link ViewMetadata#encapsulation}.
   */
  export enum ViewEncapsulation {
    /**
     * Emulate `Native` scoping of styles by adding an attribute containing surrogate id to the Host
     * Element and pre-processing the style rules provided via
     * {@link ViewMetadata#styles} or {@link ViewMetadata#stylesUrls}, and adding the new Host Element
     * attribute to all selectors.
     *
     * This is the default option.
     */
    Emulated = 0,
    /**
     * Use the native encapsulation mechanism of the renderer.
     *
     * For the DOM this means using [Shadow DOM](https://w3c.github.io/webcomponents/spec/shadow/) and
     * creating a ShadowRoot for Component's Host Element.
     */
    Native = 1,
    /**
     * Don't provide any template or style encapsulation.
     */
    None = 2,
  }
  export var VIEW_ENCAPSULATION_VALUES: ViewEncapsulation[];
  /**
   * Metadata properties available for configuring Views.
   *
   * Each Angular component requires a single `@Component` and at least one `@View` annotation. The
   * `@View` annotation specifies the HTML template to use, and lists the directives that are active
   * within the template.
   *
   * When a component is instantiated, the template is loaded into the component's shadow root, and
   * the expressions and statements in the template are evaluated against the component.
   *
   * For details on the `@Component` annotation, see {@link ComponentMetadata}.
   *
   * ### Example
   *
   * ```
   * @Component({
   *   selector: 'greet',
   *   template: 'Hello {{name}}!',
   *   directives: [GreetUser, Bold]
   * })
   * class Greet {
   *   name: string;
   *
   *   constructor() {
   *     this.name = 'World';
   *   }
   * }
   * ```
   */
  export class ViewMetadata {
    /**
     * Specifies a template URL for an Angular component.
     *
     * NOTE: Only one of `templateUrl` or `template` can be defined per View.
     *
     * <!-- TODO: what's the url relative to? -->
     */
    templateUrl: string;
    /**
     * Specifies an inline template for an Angular component.
     *
     * NOTE: Only one of `templateUrl` or `template` can be defined per View.
     */
    template: string;
    /**
     * Specifies stylesheet URLs for an Angular component.
     *
     * <!-- TODO: what's the url relative to? -->
     */
    styleUrls: string[];
    /**
     * Specifies an inline stylesheet for an Angular component.
     */
    styles: string[];
    /**
     * Specifies a list of directives that can be used within a template.
     *
     * Directives must be listed explicitly to provide proper component encapsulation.
     *
     * ### Example
     *
     * ```javascript
     * @Component({
     *   selector: 'my-component',
     *   directives: [NgFor]
     *   template: '
     *   <ul>
     *     <li *ngFor="#item of items">{{item}}</li>
     *   </ul>'
     * })
     * class MyComponent {
     * }
     * ```
     */
    directives: Array<Type | any[]>;
    pipes: Array<Type | any[]>;
    /**
     * Specify how the template and the styles should be encapsulated.
     * The default is {@link ViewEncapsulation#Emulated `ViewEncapsulation.Emulated`} if the view
     * has styles,
     * otherwise {@link ViewEncapsulation#None `ViewEncapsulation.None`}.
     */
    encapsulation: ViewEncapsulation;
    constructor({templateUrl, template, directives, pipes, encapsulation, styles, styleUrls}?: {
      templateUrl?: string;
      template?: string;
      directives?: Array<Type | any[]>;
      pipes?: Array<Type | any[]>;
      encapsulation?: ViewEncapsulation;
      styles?: string[];
      styleUrls?: string[];
    });
  }
}
declare module "angular2/src/core/metadata/directives" {
  import { Type } from "angular2/src/facade/lang";
  import { InjectableMetadata } from "angular2/src/core/di/metadata";
  import { ChangeDetectionStrategy } from "angular2/src/core/change_detection";
  import { ViewEncapsulation } from "angular2/src/core/metadata/view";
  /**
   * Directives allow you to attach behavior to elements in the DOM.
   *
   * {@link DirectiveMetadata}s with an embedded view are called {@link ComponentMetadata}s.
   *
   * A directive consists of a single directive annotation and a controller class. When the
   * directive's `selector` matches
   * elements in the DOM, the following steps occur:
   *
   * 1. For each directive, the `ElementInjector` attempts to resolve the directive's constructor
   * arguments.
   * 2. Angular instantiates directives for each matched element using `ElementInjector` in a
   * depth-first order,
   *    as declared in the HTML.
   *
   * ## Understanding How Injection Works
   *
   * There are three stages of injection resolution.
   * - *Pre-existing Injectors*:
   *   - The terminal {@link Injector} cannot resolve dependencies. It either throws an error or, if
   * the dependency was
   *     specified as `@Optional`, returns `null`.
   *   - The platform injector resolves browser singleton resources, such as: cookies, title,
   * location, and others.
   * - *Component Injectors*: Each component instance has its own {@link Injector}, and they follow
   * the same parent-child hierarchy
   *     as the component instances in the DOM.
   * - *Element Injectors*: Each component instance has a Shadow DOM. Within the Shadow DOM each
   * element has an `ElementInjector`
   *     which follow the same parent-child hierarchy as the DOM elements themselves.
   *
   * When a template is instantiated, it also must instantiate the corresponding directives in a
   * depth-first order. The
   * current `ElementInjector` resolves the constructor dependencies for each directive.
   *
   * Angular then resolves dependencies as follows, according to the order in which they appear in the
   * {@link ViewMetadata}:
   *
   * 1. Dependencies on the current element
   * 2. Dependencies on element injectors and their parents until it encounters a Shadow DOM boundary
   * 3. Dependencies on component injectors and their parents until it encounters the root component
   * 4. Dependencies on pre-existing injectors
   *
   *
   * The `ElementInjector` can inject other directives, element-specific special objects, or it can
   * delegate to the parent
   * injector.
   *
   * To inject other directives, declare the constructor parameter as:
   * - `directive:DirectiveType`: a directive on the current element only
   * - `@Host() directive:DirectiveType`: any directive that matches the type between the current
   * element and the
   *    Shadow DOM root.
   * - `@Query(DirectiveType) query:QueryList<DirectiveType>`: A live collection of direct child
   * directives.
   * - `@QueryDescendants(DirectiveType) query:QueryList<DirectiveType>`: A live collection of any
   * child directives.
   *
   * To inject element-specific special objects, declare the constructor parameter as:
   * - `element: ElementRef` to obtain a reference to logical element in the view.
   * - `viewContainer: ViewContainerRef` to control child template instantiation, for
   * {@link DirectiveMetadata} directives only
   * - `bindingPropagation: BindingPropagation` to control change detection in a more granular way.
   *
   * ### Example
   *
   * The following example demonstrates how dependency injection resolves constructor arguments in
   * practice.
   *
   *
   * Assume this HTML template:
   *
   * ```
   * <div dependency="1">
   *   <div dependency="2">
   *     <div dependency="3" my-directive>
   *       <div dependency="4">
   *         <div dependency="5"></div>
   *       </div>
   *       <div dependency="6"></div>
   *     </div>
   *   </div>
   * </div>
   * ```
   *
   * With the following `dependency` decorator and `SomeService` injectable class.
   *
   * ```
   * @Injectable()
   * class SomeService {
   * }
   *
   * @Directive({
   *   selector: '[dependency]',
   *   inputs: [
   *     'id: dependency'
   *   ]
   * })
   * class Dependency {
   *   id:string;
   * }
   * ```
   *
   * Let's step through the different ways in which `MyDirective` could be declared...
   *
   *
   * ### No injection
   *
   * Here the constructor is declared with no arguments, therefore nothing is injected into
   * `MyDirective`.
   *
   * ```
   * @Directive({ selector: '[my-directive]' })
   * class MyDirective {
   *   constructor() {
   *   }
   * }
   * ```
   *
   * This directive would be instantiated with no dependencies.
   *
   *
   * ### Component-level injection
   *
   * Directives can inject any injectable instance from the closest component injector or any of its
   * parents.
   *
   * Here, the constructor declares a parameter, `someService`, and injects the `SomeService` type
   * from the parent
   * component's injector.
   * ```
   * @Directive({ selector: '[my-directive]' })
   * class MyDirective {
   *   constructor(someService: SomeService) {
   *   }
   * }
   * ```
   *
   * This directive would be instantiated with a dependency on `SomeService`.
   *
   *
   * ### Injecting a directive from the current element
   *
   * Directives can inject other directives declared on the current element.
   *
   * ```
   * @Directive({ selector: '[my-directive]' })
   * class MyDirective {
   *   constructor(dependency: Dependency) {
   *     expect(dependency.id).toEqual(3);
   *   }
   * }
   * ```
   * This directive would be instantiated with `Dependency` declared at the same element, in this case
   * `dependency="3"`.
   *
   * ### Injecting a directive from any ancestor elements
   *
   * Directives can inject other directives declared on any ancestor element (in the current Shadow
   * DOM), i.e. on the current element, the
   * parent element, or its parents.
   * ```
   * @Directive({ selector: '[my-directive]' })
   * class MyDirective {
   *   constructor(@Host() dependency: Dependency) {
   *     expect(dependency.id).toEqual(2);
   *   }
   * }
   * ```
   *
   * `@Host` checks the current element, the parent, as well as its parents recursively. If
   * `dependency="2"` didn't
   * exist on the direct parent, this injection would
   * have returned
   * `dependency="1"`.
   *
   *
   * ### Injecting a live collection of direct child directives
   *
   *
   * A directive can also query for other child directives. Since parent directives are instantiated
   * before child directives, a directive can't simply inject the list of child directives. Instead,
   * the directive injects a {@link QueryList}, which updates its contents as children are added,
   * removed, or moved by a directive that uses a {@link ViewContainerRef} such as a `ngFor`, an
   * `ngIf`, or an `ngSwitch`.
   *
   * ```
   * @Directive({ selector: '[my-directive]' })
   * class MyDirective {
   *   constructor(@Query(Dependency) dependencies:QueryList<Dependency>) {
   *   }
   * }
   * ```
   *
   * This directive would be instantiated with a {@link QueryList} which contains `Dependency` 4 and
   * `Dependency` 6. Here, `Dependency` 5 would not be included, because it is not a direct child.
   *
   * ### Injecting a live collection of descendant directives
   *
   * By passing the descendant flag to `@Query` above, we can include the children of the child
   * elements.
   *
   * ```
   * @Directive({ selector: '[my-directive]' })
   * class MyDirective {
   *   constructor(@Query(Dependency, {descendants: true}) dependencies:QueryList<Dependency>) {
   *   }
   * }
   * ```
   *
   * This directive would be instantiated with a Query which would contain `Dependency` 4, 5 and 6.
   *
   * ### Optional injection
   *
   * The normal behavior of directives is to return an error when a specified dependency cannot be
   * resolved. If you
   * would like to inject `null` on unresolved dependency instead, you can annotate that dependency
   * with `@Optional()`.
   * This explicitly permits the author of a template to treat some of the surrounding directives as
   * optional.
   *
   * ```
   * @Directive({ selector: '[my-directive]' })
   * class MyDirective {
   *   constructor(@Optional() dependency:Dependency) {
   *   }
   * }
   * ```
   *
   * This directive would be instantiated with a `Dependency` directive found on the current element.
   * If none can be
   * found, the injector supplies `null` instead of throwing an error.
   *
   * ### Example
   *
   * Here we use a decorator directive to simply define basic tool-tip behavior.
   *
   * ```
   * @Directive({
   *   selector: '[tooltip]',
   *   inputs: [
   *     'text: tooltip'
   *   ],
   *   host: {
   *     '(mouseenter)': 'onMouseEnter()',
   *     '(mouseleave)': 'onMouseLeave()'
   *   }
   * })
   * class Tooltip{
   *   text:string;
   *   overlay:Overlay; // NOT YET IMPLEMENTED
   *   overlayManager:OverlayManager; // NOT YET IMPLEMENTED
   *
   *   constructor(overlayManager:OverlayManager) {
   *     this.overlay = overlay;
   *   }
   *
   *   onMouseEnter() {
   *     // exact signature to be determined
   *     this.overlay = this.overlayManager.open(text, ...);
   *   }
   *
   *   onMouseLeave() {
   *     this.overlay.close();
   *     this.overlay = null;
   *   }
   * }
   * ```
   * In our HTML template, we can then add this behavior to a `<div>` or any other element with the
   * `tooltip` selector,
   * like so:
   *
   * ```
   * <div tooltip="some text here"></div>
   * ```
   *
   * Directives can also control the instantiation, destruction, and positioning of inline template
   * elements:
   *
   * A directive uses a {@link ViewContainerRef} to instantiate, insert, move, and destroy views at
   * runtime.
   * The {@link ViewContainerRef} is created as a result of `<template>` element, and represents a
   * location in the current view
   * where these actions are performed.
   *
   * Views are always created as children of the current {@link ViewMetadata}, and as siblings of the
   * `<template>` element. Thus a
   * directive in a child view cannot inject the directive that created it.
   *
   * Since directives that create views via ViewContainers are common in Angular, and using the full
   * `<template>` element syntax is wordy, Angular
   * also supports a shorthand notation: `<li *foo="bar">` and `<li template="foo: bar">` are
   * equivalent.
   *
   * Thus,
   *
   * ```
   * <ul>
   *   <li *foo="bar" title="text"></li>
   * </ul>
   * ```
   *
   * Expands in use to:
   *
   * ```
   * <ul>
   *   <template [foo]="bar">
   *     <li title="text"></li>
   *   </template>
   * </ul>
   * ```
   *
   * Notice that although the shorthand places `*foo="bar"` within the `<li>` element, the binding for
   * the directive
   * controller is correctly instantiated on the `<template>` element rather than the `<li>` element.
   *
   * ## Lifecycle hooks
   *
   * When the directive class implements some {@link angular2/lifecycle_hooks} the callbacks are
   * called by the change detection at defined points in time during the life of the directive.
   *
   * ### Example
   *
   * Let's suppose we want to implement the `unless` behavior, to conditionally include a template.
   *
   * Here is a simple directive that triggers on an `unless` selector:
   *
   * ```
   * @Directive({
   *   selector: '[unless]',
   *   inputs: ['unless']
   * })
   * export class Unless {
   *   viewContainer: ViewContainerRef;
   *   templateRef: TemplateRef;
   *   prevCondition: boolean;
   *
   *   constructor(viewContainer: ViewContainerRef, templateRef: TemplateRef) {
   *     this.viewContainer = viewContainer;
   *     this.templateRef = templateRef;
   *     this.prevCondition = null;
   *   }
   *
   *   set unless(newCondition) {
   *     if (newCondition && (isBlank(this.prevCondition) || !this.prevCondition)) {
   *       this.prevCondition = true;
   *       this.viewContainer.clear();
   *     } else if (!newCondition && (isBlank(this.prevCondition) || this.prevCondition)) {
   *       this.prevCondition = false;
   *       this.viewContainer.create(this.templateRef);
   *     }
   *   }
   * }
   * ```
   *
   * We can then use this `unless` selector in a template:
   * ```
   * <ul>
   *   <li *unless="expr"></li>
   * </ul>
   * ```
   *
   * Once the directive instantiates the child view, the shorthand notation for the template expands
   * and the result is:
   *
   * ```
   * <ul>
   *   <template [unless]="exp">
   *     <li></li>
   *   </template>
   *   <li></li>
   * </ul>
   * ```
   *
   * Note also that although the `<li></li>` template still exists inside the `<template></template>`,
   * the instantiated
   * view occurs on the second `<li></li>` which is a sibling to the `<template>` element.
   */
  export class DirectiveMetadata extends InjectableMetadata {
    /**
     * The CSS selector that triggers the instantiation of a directive.
     *
     * Angular only allows directives to trigger on CSS selectors that do not cross element
     * boundaries.
     *
     * `selector` may be declared as one of the following:
     *
     * - `element-name`: select by element name.
     * - `.class`: select by class name.
     * - `[attribute]`: select by attribute name.
     * - `[attribute=value]`: select by attribute name and value.
     * - `:not(sub_selector)`: select only if the element does not match the `sub_selector`.
     * - `selector1, selector2`: select if either `selector1` or `selector2` matches.
     *
     *
     * ### Example
     *
     * Suppose we have a directive with an `input[type=text]` selector.
     *
     * And the following HTML:
     *
     * ```html
     * <form>
     *   <input type="text">
     *   <input type="radio">
     * <form>
     * ```
     *
     * The directive would only be instantiated on the `<input type="text">` element.
     *
     */
    selector: string;
    /**
     * Enumerates the set of data-bound input properties for a directive
     *
     * Angular automatically updates input properties during change detection.
     *
     * The `inputs` property defines a set of `directiveProperty` to `bindingProperty`
     * configuration:
     *
     * - `directiveProperty` specifies the component property where the value is written.
     * - `bindingProperty` specifies the DOM property where the value is read from.
     *
     * When `bindingProperty` is not provided, it is assumed to be equal to `directiveProperty`.
     *
     * ### Example ([live demo](http://plnkr.co/edit/ivhfXY?p=preview))
     *
     * The following example creates a component with two data-bound properties.
     *
     * ```typescript
     * @Component({
     *   selector: 'bank-account',
     *   inputs: ['bankName', 'id: account-id'],
     *   template: `
     *     Bank Name: {{bankName}}
     *     Account Id: {{id}}
     *   `
     * })
     * class BankAccount {
     *   bankName: string;
     *   id: string;
     *
     *   // this property is not bound, and won't be automatically updated by Angular
     *   normalizedBankName: string;
     * }
     *
     * @Component({
     *   selector: 'app',
     *   template: `
     *     <bank-account bank-name="RBC" account-id="4747"></bank-account>
     *   `,
     *   directives: [BankAccount]
     * })
     * class App {}
     *
     * bootstrap(App);
     * ```
     *
     */
    inputs: string[];
    properties: string[];
    private _inputs;
    private _properties;
    /**
     * Enumerates the set of event-bound output properties.
     *
     * When an output property emits an event, an event handler attached to that event
     * the template is invoked.
     *
     * The `outputs` property defines a set of `directiveProperty` to `bindingProperty`
     * configuration:
     *
     * - `directiveProperty` specifies the component property that emits events.
     * - `bindingProperty` specifies the DOM property the event handler is attached to.
     *
     * ### Example ([live demo](http://plnkr.co/edit/d5CNq7?p=preview))
     *
     * ```typescript
     * @Directive({
     *   selector: 'interval-dir',
     *   outputs: ['everySecond', 'five5Secs: everyFiveSeconds']
     * })
     * class IntervalDir {
     *   everySecond = new EventEmitter();
     *   five5Secs = new EventEmitter();
     *
     *   constructor() {
     *     setInterval(() => this.everySecond.emit("event"), 1000);
     *     setInterval(() => this.five5Secs.emit("event"), 5000);
     *   }
     * }
     *
     * @Component({
     *   selector: 'app',
     *   template: `
     *     <interval-dir (everySecond)="everySecond()" (everyFiveSeconds)="everyFiveSeconds()">
     *     </interval-dir>
     *   `,
     *   directives: [IntervalDir]
     * })
     * class App {
     *   everySecond() { console.log('second'); }
     *   everyFiveSeconds() { console.log('five seconds'); }
     * }
     * bootstrap(App);
     * ```
     *
     */
    outputs: string[];
    events: string[];
    private _outputs;
    private _events;
    /**
     * Specify the events, actions, properties and attributes related to the host element.
     *
     * ## Host Listeners
     *
     * Specifies which DOM events a directive listens to via a set of `(event)` to `method`
     * key-value pairs:
     *
     * - `event`: the DOM event that the directive listens to.
     * - `statement`: the statement to execute when the event occurs.
     * If the evaluation of the statement returns `false`, then `preventDefault`is applied on the DOM
     * event.
     *
     * To listen to global events, a target must be added to the event name.
     * The target can be `window`, `document` or `body`.
     *
     * When writing a directive event binding, you can also refer to the $event local variable.
     *
     * ### Example ([live demo](http://plnkr.co/edit/DlA5KU?p=preview))
     *
     * The following example declares a directive that attaches a click listener to the button and
     * counts clicks.
     *
     * ```typescript
     * @Directive({
     *   selector: 'button[counting]',
     *   host: {
     *     '(click)': 'onClick($event.target)'
     *   }
     * })
     * class CountClicks {
     *   numberOfClicks = 0;
     *
     *   onClick(btn) {
     *     console.log("button", btn, "number of clicks:", this.numberOfClicks++);
     *   }
     * }
     *
     * @Component({
     *   selector: 'app',
     *   template: `<button counting>Increment</button>`,
     *   directives: [CountClicks]
     * })
     * class App {}
     *
     * bootstrap(App);
     * ```
     *
     * ## Host Property Bindings
     *
     * Specifies which DOM properties a directive updates.
     *
     * Angular automatically checks host property bindings during change detection.
     * If a binding changes, it will update the host element of the directive.
     *
     * ### Example ([live demo](http://plnkr.co/edit/gNg0ED?p=preview))
     *
     * The following example creates a directive that sets the `valid` and `invalid` classes
     * on the DOM element that has ngModel directive on it.
     *
     * ```typescript
     * @Directive({
     *   selector: '[ngModel]',
     *   host: {
     *     '[class.valid]': 'valid',
     *     '[class.invalid]': 'invalid'
     *   }
     * })
     * class NgModelStatus {
     *   constructor(public control:NgModel) {}
     *   get valid { return this.control.valid; }
     *   get invalid { return this.control.invalid; }
     * }
     *
     * @Component({
     *   selector: 'app',
     *   template: `<input [(ngModel)]="prop">`,
     *   directives: [FORM_DIRECTIVES, NgModelStatus]
     * })
     * class App {
     *   prop;
     * }
     *
     * bootstrap(App);
     * ```
     *
     * ## Attributes
     *
     * Specifies static attributes that should be propagated to a host element.
     *
     * ### Example
     *
     * In this example using `my-button` directive (ex.: `<div my-button></div>`) on a host element
     * (here: `<div>` ) will ensure that this element will get the "button" role.
     *
     * ```typescript
     * @Directive({
     *   selector: '[my-button]',
     *   host: {
     *     'role': 'button'
     *   }
     * })
     * class MyButton {
     * }
     * ```
     */
    host: {
      [key: string]: string;
    };
    /**
     * Defines the set of injectable objects that are visible to a Directive and its light DOM
     * children.
     *
     * ## Simple Example
     *
     * Here is an example of a class that can be injected:
     *
     * ```
     * class Greeter {
     *    greet(name:string) {
     *      return 'Hello ' + name + '!';
     *    }
     * }
     *
     * @Directive({
     *   selector: 'greet',
     *   bindings: [
     *     Greeter
     *   ]
     * })
     * class HelloWorld {
     *   greeter:Greeter;
     *
     *   constructor(greeter:Greeter) {
     *     this.greeter = greeter;
     *   }
     * }
     * ```
     */
    providers: any[];
    /** @deprecated */
    bindings: any[];
    private _providers;
    private _bindings;
    /**
     * Defines the name that can be used in the template to assign this directive to a variable.
     *
     * ## Simple Example
     *
     * ```
     * @Directive({
     *   selector: 'child-dir',
     *   exportAs: 'child'
     * })
     * class ChildDir {
     * }
     *
     * @Component({
     *   selector: 'main',
     *   template: `<child-dir #c="child"></child-dir>`,
     *   directives: [ChildDir]
     * })
     * class MainComponent {
     * }
     *
     * ```
     */
    exportAs: string;
    /**
     * Configures the queries that will be injected into the directive.
     *
     * Content queries are set before the `ngAfterContentInit` callback is called.
     * View queries are set before the `ngAfterViewInit` callback is called.
     *
     * ### Example
     *
     * ```
     * @Component({
     *   selector: 'someDir',
     *   queries: {
     *     contentChildren: new ContentChildren(ChildDirective),
     *     viewChildren: new ViewChildren(ChildDirective)
     *   },
     *   template: '<child-directive></child-directive>',
     *   directives: [ChildDirective]
     * })
     * class SomeDir {
     *   contentChildren: QueryList<ChildDirective>,
     *   viewChildren: QueryList<ChildDirective>
     *
     *   ngAfterContentInit() {
     *     // contentChildren is set
     *   }
     *
     *   ngAfterViewInit() {
     *     // viewChildren is set
     *   }
     * }
     * ```
     */
    queries: {
      [key: string]: any;
    };
    constructor({selector, inputs, outputs, properties, events, host, bindings, providers, exportAs, queries}?: {
      selector?: string;
      inputs?: string[];
      outputs?: string[];
      properties?: string[];
      events?: string[];
      host?: {
        [key: string]: string;
      };
      providers?: any[];
            /** @deprecated */ bindings?: any[];
      exportAs?: string;
      queries?: {
        [key: string]: any;
      };
    });
  }
  /**
   * Declare reusable UI building blocks for an application.
   *
   * Each Angular component requires a single `@Component` annotation. The
   * `@Component`
   * annotation specifies when a component is instantiated, and which properties and hostListeners it
   * binds to.
   *
   * When a component is instantiated, Angular
   * - creates a shadow DOM for the component.
   * - loads the selected template into the shadow DOM.
   * - creates all the injectable objects configured with `providers` and `viewProviders`.
   *
   * All template expressions and statements are then evaluated against the component instance.
   *
   * For details on the `@View` annotation, see {@link ViewMetadata}.
   *
   * ## Lifecycle hooks
   *
   * When the component class implements some {@link angular2/lifecycle_hooks} the callbacks are
   * called by the change detection at defined points in time during the life of the component.
   *
   * ### Example
   *
   * {@example core/ts/metadata/metadata.ts region='component'}
   */
  export class ComponentMetadata extends DirectiveMetadata {
    /**
     * Defines the used change detection strategy.
     *
     * When a component is instantiated, Angular creates a change detector, which is responsible for
     * propagating the component's bindings.
     *
     * The `changeDetection` property defines, whether the change detection will be checked every time
     * or only when the component tells it to do so.
     */
    changeDetection: ChangeDetectionStrategy;
    /**
     * Defines the set of injectable objects that are visible to its view DOM children.
     *
     * ## Simple Example
     *
     * Here is an example of a class that can be injected:
     *
     * ```
     * class Greeter {
     *    greet(name:string) {
     *      return 'Hello ' + name + '!';
     *    }
     * }
     *
     * @Directive({
     *   selector: 'needs-greeter'
     * })
     * class NeedsGreeter {
     *   greeter:Greeter;
     *
     *   constructor(greeter:Greeter) {
     *     this.greeter = greeter;
     *   }
     * }
     *
     * @Component({
     *   selector: 'greet',
     *   viewProviders: [
     *     Greeter
     *   ],
     *   template: `<needs-greeter></needs-greeter>`,
     *   directives: [NeedsGreeter]
     * })
     * class HelloWorld {
     * }
     *
     * ```
     */
    viewProviders: any[];
    viewBindings: any[];
    private _viewProviders;
    private _viewBindings;
    /**
     * The module id of the module that contains the component.
     * Needed to be able to resolve relative urls for templates and styles.
     * In Dart, this can be determined automatically and does not need to be set.
     * In CommonJS, this can always be set to `module.id`.
     *
     * ## Simple Example
     *
     * ```
     * @Directive({
     *   selector: 'someDir',
     *   moduleId: module.id
     * })
     * class SomeDir {
     * }
     *
     * ```
     */
    moduleId: string;
    templateUrl: string;
    template: string;
    styleUrls: string[];
    styles: string[];
    directives: Array<Type | any[]>;
    pipes: Array<Type | any[]>;
    encapsulation: ViewEncapsulation;
    constructor({selector, inputs, outputs, properties, events, host, exportAs, moduleId, bindings, providers, viewBindings, viewProviders, changeDetection, queries, templateUrl, template, styleUrls, styles, directives, pipes, encapsulation}?: {
      selector?: string;
      inputs?: string[];
      outputs?: string[];
      properties?: string[];
      events?: string[];
      host?: {
        [key: string]: string;
      };
            /** @deprecated */ bindings?: any[];
      providers?: any[];
      exportAs?: string;
      moduleId?: string;
            /** @deprecated */ viewBindings?: any[];
      viewProviders?: any[];
      queries?: {
        [key: string]: any;
      };
      changeDetection?: ChangeDetectionStrategy;
      templateUrl?: string;
      template?: string;
      styleUrls?: string[];
      styles?: string[];
      directives?: Array<Type | any[]>;
      pipes?: Array<Type | any[]>;
      encapsulation?: ViewEncapsulation;
    });
  }
  /**
   * Declare reusable pipe function.
   *
   * A "pure" pipe is only re-evaluated when either the input or any of the arguments change.
   *
   * When not specified, pipes default to being pure.
   *
   * ### Example
   *
   * {@example core/ts/metadata/metadata.ts region='pipe'}
   */
  export class PipeMetadata extends InjectableMetadata {
    name: string;
    /** @internal */
    _pure: boolean;
    constructor({name, pure}: {
      name: string;
      pure?: boolean;
    });
    pure: boolean;
  }
  /**
   * Declares a data-bound input property.
   *
   * Angular automatically updates data-bound properties during change detection.
   *
   * `InputMetadata` takes an optional parameter that specifies the name
   * used when instantiating a component in the template. When not provided,
   * the name of the decorated property is used.
   *
   * ### Example
   *
   * The following example creates a component with two input properties.
   *
   * ```typescript
   * @Component({
   *   selector: 'bank-account',
   *   template: `
   *     Bank Name: {{bankName}}
   *     Account Id: {{id}}
   *   `
   * })
   * class BankAccount {
   *   @Input() bankName: string;
   *   @Input('account-id') id: string;
   *
   *   // this property is not bound, and won't be automatically updated by Angular
   *   normalizedBankName: string;
   * }
   *
   * @Component({
   *   selector: 'app',
   *   template: `
   *     <bank-account bank-name="RBC" account-id="4747"></bank-account>
   *   `,
   *   directives: [BankAccount]
   * })
   * class App {}
   *
   * bootstrap(App);
   * ```
   */
  export class InputMetadata {
    /**
     * Name used when instantiating a component in the template.
     */
    bindingPropertyName: string;
    constructor(
      /**
       * Name used when instantiating a component in the template.
       */
      bindingPropertyName?: string);
  }
  /**
   * Declares an event-bound output property.
   *
   * When an output property emits an event, an event handler attached to that event
   * the template is invoked.
   *
   * `OutputMetadata` takes an optional parameter that specifies the name
   * used when instantiating a component in the template. When not provided,
   * the name of the decorated property is used.
   *
   * ### Example
   *
   * ```typescript
   * @Directive({
   *   selector: 'interval-dir',
   * })
   * class IntervalDir {
   *   @Output() everySecond = new EventEmitter();
   *   @Output('everyFiveSeconds') five5Secs = new EventEmitter();
   *
   *   constructor() {
   *     setInterval(() => this.everySecond.emit("event"), 1000);
   *     setInterval(() => this.five5Secs.emit("event"), 5000);
   *   }
   * }
   *
   * @Component({
   *   selector: 'app',
   *   template: `
   *     <interval-dir (everySecond)="everySecond()" (everyFiveSeconds)="everyFiveSeconds()">
   *     </interval-dir>
   *   `,
   *   directives: [IntervalDir]
   * })
   * class App {
   *   everySecond() { console.log('second'); }
   *   everyFiveSeconds() { console.log('five seconds'); }
   * }
   * bootstrap(App);
   * ```
   */
  export class OutputMetadata {
    bindingPropertyName: string;
    constructor(bindingPropertyName?: string);
  }
  /**
   * Declares a host property binding.
   *
   * Angular automatically checks host property bindings during change detection.
   * If a binding changes, it will update the host element of the directive.
   *
   * `HostBindingMetadata` takes an optional parameter that specifies the property
   * name of the host element that will be updated. When not provided,
   * the class property name is used.
   *
   * ### Example
   *
   * The following example creates a directive that sets the `valid` and `invalid` classes
   * on the DOM element that has ngModel directive on it.
   *
   * ```typescript
   * @Directive({selector: '[ngModel]'})
   * class NgModelStatus {
   *   constructor(public control:NgModel) {}
   *   @HostBinding('class.valid') get valid { return this.control.valid; }
   *   @HostBinding('class.invalid') get invalid { return this.control.invalid; }
   * }
   *
   * @Component({
   *   selector: 'app',
   *   template: `<input [(ngModel)]="prop">`,
   *   directives: [FORM_DIRECTIVES, NgModelStatus]
   * })
   * class App {
   *   prop;
   * }
   *
   * bootstrap(App);
   * ```
   */
  export class HostBindingMetadata {
    hostPropertyName: string;
    constructor(hostPropertyName?: string);
  }
  /**
   * Declares a host listener.
   *
   * Angular will invoke the decorated method when the host element emits the specified event.
   *
   * If the decorated method returns `false`, then `preventDefault` is applied on the DOM
   * event.
   *
   * ### Example
   *
   * The following example declares a directive that attaches a click listener to the button and
   * counts clicks.
   *
   * ```typescript
   * @Directive({selector: 'button[counting]'})
   * class CountClicks {
   *   numberOfClicks = 0;
   *
   *   @HostListener('click', ['$event.target'])
   *   onClick(btn) {
   *     console.log("button", btn, "number of clicks:", this.numberOfClicks++);
   *   }
   * }
   *
   * @Component({
   *   selector: 'app',
   *   template: `<button counting>Increment</button>`,
   *   directives: [CountClicks]
   * })
   * class App {}
   *
   * bootstrap(App);
   * ```
   */
  export class HostListenerMetadata {
    eventName: string;
    args: string[];
    constructor(eventName: string, args?: string[]);
  }
}
declare module "angular2/src/core/metadata" {
  /**
   * This indirection is needed to free up Component, etc symbols in the public API
   * to be used by the decorator versions of these annotations.
   */
  export { QueryMetadata, ContentChildrenMetadata, ContentChildMetadata, ViewChildrenMetadata, ViewQueryMetadata, ViewChildMetadata, AttributeMetadata } from "angular2/src/core/metadata/di";
  export { ComponentMetadata, DirectiveMetadata, PipeMetadata, InputMetadata, OutputMetadata, HostBindingMetadata, HostListenerMetadata } from "angular2/src/core/metadata/directives";
  export { ViewMetadata, ViewEncapsulation } from "angular2/src/core/metadata/view";
  import { QueryMetadata, ContentChildrenMetadata, ViewChildrenMetadata, AttributeMetadata } from "angular2/src/core/metadata/di";
  import { ComponentMetadata, DirectiveMetadata } from "angular2/src/core/metadata/directives";
  import { ViewMetadata, ViewEncapsulation } from "angular2/src/core/metadata/view";
  import { ChangeDetectionStrategy } from "angular2/src/core/change_detection/change_detection";
  import { TypeDecorator } from "angular2/src/core/util/decorators";
  import { Type } from "angular2/src/facade/lang";
  /**
   * Interface for the {@link DirectiveMetadata} decorator function.
   *
   * See {@link DirectiveFactory}.
   */
  export interface DirectiveDecorator extends TypeDecorator {
  }
  /**
   * Interface for the {@link ComponentMetadata} decorator function.
   *
   * See {@link ComponentFactory}.
   */
  export interface ComponentDecorator extends TypeDecorator {
    /**
     * Chain {@link ViewMetadata} annotation.
     */
    View(obj: {
      templateUrl?: string;
      template?: string;
      directives?: Array<Type | any[]>;
      pipes?: Array<Type | any[]>;
      renderer?: string;
      styles?: string[];
      styleUrls?: string[];
    }): ViewDecorator;
  }
  /**
   * Interface for the {@link ViewMetadata} decorator function.
   *
   * See {@link ViewFactory}.
   */
  export interface ViewDecorator extends TypeDecorator {
    /**
     * Chain {@link ViewMetadata} annotation.
     */
    View(obj: {
      templateUrl?: string;
      template?: string;
      directives?: Array<Type | any[]>;
      pipes?: Array<Type | any[]>;
      renderer?: string;
      styles?: string[];
      styleUrls?: string[];
    }): ViewDecorator;
  }
  /**
   * {@link DirectiveMetadata} factory for creating annotations, decorators or DSL.
   *
   * ### Example as TypeScript Decorator
   *
   * {@example core/ts/metadata/metadata.ts region='directive'}
   *
   * ### Example as ES5 DSL
   *
   * ```
   * var MyDirective = ng
   *   .Directive({...})
   *   .Class({
   *     constructor: function() {
   *       ...
   *     }
   *   })
   * ```
   *
   * ### Example as ES5 annotation
   *
   * ```
   * var MyDirective = function() {
   *   ...
   * };
   *
   * MyDirective.annotations = [
   *   new ng.Directive({...})
   * ]
   * ```
   */
  export interface DirectiveFactory {
    (obj: {
      selector?: string;
      inputs?: string[];
      outputs?: string[];
      properties?: string[];
      events?: string[];
      host?: {
        [key: string]: string;
      };
      bindings?: any[];
      providers?: any[];
      exportAs?: string;
      queries?: {
        [key: string]: any;
      };
    }): DirectiveDecorator;
    new (obj: {
      selector?: string;
      inputs?: string[];
      outputs?: string[];
      properties?: string[];
      events?: string[];
      host?: {
        [key: string]: string;
      };
      bindings?: any[];
      providers?: any[];
      exportAs?: string;
      queries?: {
        [key: string]: any;
      };
    }): DirectiveMetadata;
  }
  /**
   * {@link ComponentMetadata} factory for creating annotations, decorators or DSL.
   *
   * ### Example as TypeScript Decorator
   *
   * {@example core/ts/metadata/metadata.ts region='component'}
   *
   * ### Example as ES5 DSL
   *
   * ```
   * var MyComponent = ng
   *   .Component({...})
   *   .Class({
   *     constructor: function() {
   *       ...
   *     }
   *   })
   * ```
   *
   * ### Example as ES5 annotation
   *
   * ```
   * var MyComponent = function() {
   *   ...
   * };
   *
   * MyComponent.annotations = [
   *   new ng.Component({...})
   * ]
   * ```
   */
  export interface ComponentFactory {
    (obj: {
      selector?: string;
      inputs?: string[];
      outputs?: string[];
      properties?: string[];
      events?: string[];
      host?: {
        [key: string]: string;
      };
      bindings?: any[];
      providers?: any[];
      exportAs?: string;
      moduleId?: string;
      queries?: {
        [key: string]: any;
      };
      viewBindings?: any[];
      viewProviders?: any[];
      changeDetection?: ChangeDetectionStrategy;
      templateUrl?: string;
      template?: string;
      styleUrls?: string[];
      styles?: string[];
      directives?: Array<Type | any[]>;
      pipes?: Array<Type | any[]>;
      encapsulation?: ViewEncapsulation;
    }): ComponentDecorator;
    new (obj: {
      selector?: string;
      inputs?: string[];
      outputs?: string[];
      properties?: string[];
      events?: string[];
      host?: {
        [key: string]: string;
      };
      bindings?: any[];
      providers?: any[];
      exportAs?: string;
      moduleId?: string;
      queries?: {
        [key: string]: any;
      };
      viewBindings?: any[];
      viewProviders?: any[];
      changeDetection?: ChangeDetectionStrategy;
      templateUrl?: string;
      template?: string;
      styleUrls?: string[];
      styles?: string[];
      directives?: Array<Type | any[]>;
      pipes?: Array<Type | any[]>;
      encapsulation?: ViewEncapsulation;
    }): ComponentMetadata;
  }
  /**
   * {@link ViewMetadata} factory for creating annotations, decorators or DSL.
   *
   * ### Example as TypeScript Decorator
   *
   * ```
   * import {Component, View} from "angular2/core";
   *
   * @Component({...})
   * @View({...})
   * class MyComponent {
   *   constructor() {
   *     ...
   *   }
   * }
   * ```
   *
   * ### Example as ES5 DSL
   *
   * ```
   * var MyComponent = ng
   *   .Component({...})
   *   .View({...})
   *   .Class({
   *     constructor: function() {
   *       ...
   *     }
   *   })
   * ```
   *
   * ### Example as ES5 annotation
   *
   * ```
   * var MyComponent = function() {
   *   ...
   * };
   *
   * MyComponent.annotations = [
   *   new ng.Component({...}),
   *   new ng.View({...})
   * ]
   * ```
   */
  export interface ViewFactory {
    (obj: {
      templateUrl?: string;
      template?: string;
      directives?: Array<Type | any[]>;
      pipes?: Array<Type | any[]>;
      encapsulation?: ViewEncapsulation;
      styles?: string[];
      styleUrls?: string[];
    }): ViewDecorator;
    new (obj: {
      templateUrl?: string;
      template?: string;
      directives?: Array<Type | any[]>;
      pipes?: Array<Type | any[]>;
      encapsulation?: ViewEncapsulation;
      styles?: string[];
      styleUrls?: string[];
    }): ViewMetadata;
  }
  /**
   * {@link AttributeMetadata} factory for creating annotations, decorators or DSL.
   *
   * ### Example as TypeScript Decorator
   *
   * {@example core/ts/metadata/metadata.ts region='attributeFactory'}
   *
   * ### Example as ES5 DSL
   *
   * ```
   * var MyComponent = ng
   *   .Component({...})
   *   .Class({
   *     constructor: [new ng.Attribute('title'), function(title) {
   *       ...
   *     }]
   *   })
   * ```
   *
   * ### Example as ES5 annotation
   *
   * ```
   * var MyComponent = function(title) {
   *   ...
   * };
   *
   * MyComponent.annotations = [
   *   new ng.Component({...})
   * ]
   * MyComponent.parameters = [
   *   [new ng.Attribute('title')]
   * ]
   * ```
   */
  export interface AttributeFactory {
    (name: string): TypeDecorator;
    new (name: string): AttributeMetadata;
  }
  /**
   * {@link QueryMetadata} factory for creating annotations, decorators or DSL.
   *
   * ### Example as TypeScript Decorator
   *
   * ```
   * import {Query, QueryList, Component} from "angular2/core";
   *
   * @Component({...})
   * class MyComponent {
   *   constructor(@Query(SomeType) queryList: QueryList<SomeType>) {
   *     ...
   *   }
   * }
   * ```
   *
   * ### Example as ES5 DSL
   *
   * ```
   * var MyComponent = ng
   *   .Component({...})
   *   .Class({
   *     constructor: [new ng.Query(SomeType), function(queryList) {
   *       ...
   *     }]
   *   })
   * ```
   *
   * ### Example as ES5 annotation
   *
   * ```
   * var MyComponent = function(queryList) {
   *   ...
   * };
   *
   * MyComponent.annotations = [
   *   new ng.Component({...})
   * ]
   * MyComponent.parameters = [
   *   [new ng.Query(SomeType)]
   * ]
   * ```
   */
  export interface QueryFactory {
    (selector: Type | string, {descendants}?: {
      descendants?: boolean;
    }): ParameterDecorator;
    new (selector: Type | string, {descendants}?: {
      descendants?: boolean;
    }): QueryMetadata;
  }
  /**
   * Factory for {@link ContentChildren}.
   */
  export interface ContentChildrenFactory {
    (selector: Type | string, {descendants}?: {
      descendants?: boolean;
    }): any;
    new (selector: Type | string, {descendants}?: {
      descendants?: boolean;
    }): ContentChildrenMetadata;
  }
  /**
   * Factory for {@link ContentChild}.
   */
  export interface ContentChildFactory {
    (selector: Type | string): any;
    new (selector: Type | string): ContentChildFactory;
  }
  /**
   * Factory for {@link ViewChildren}.
   */
  export interface ViewChildrenFactory {
    (selector: Type | string): any;
    new (selector: Type | string): ViewChildrenMetadata;
  }
  /**
   * Factory for {@link ViewChild}.
   */
  export interface ViewChildFactory {
    (selector: Type | string): any;
    new (selector: Type | string): ViewChildFactory;
  }
  /**
   * {@link PipeMetadata} factory for creating decorators.
   *
   * ### Example
   *
   * {@example core/ts/metadata/metadata.ts region='pipe'}
   */
  export interface PipeFactory {
    (obj: {
      name: string;
      pure?: boolean;
    }): any;
    new (obj: {
      name: string;
      pure?: boolean;
    }): any;
  }
  /**
   * {@link InputMetadata} factory for creating decorators.
   *
   * See {@link InputMetadata}.
   */
  export interface InputFactory {
    (bindingPropertyName?: string): any;
    new (bindingPropertyName?: string): any;
  }
  /**
   * {@link OutputMetadata} factory for creating decorators.
   *
   * See {@link OutputMetadata}.
   */
  export interface OutputFactory {
    (bindingPropertyName?: string): any;
    new (bindingPropertyName?: string): any;
  }
  /**
   * {@link HostBindingMetadata} factory function.
   */
  export interface HostBindingFactory {
    (hostPropertyName?: string): any;
    new (hostPropertyName?: string): any;
  }
  /**
   * {@link HostListenerMetadata} factory function.
   */
  export interface HostListenerFactory {
    (eventName: string, args?: string[]): any;
    new (eventName: string, args?: string[]): any;
  }
  /**
   * Declare reusable UI building blocks for an application.
   *
   * Each Angular component requires a single `@Component` and at least one `@View` annotation. The
   * `@Component`
   * annotation specifies when a component is instantiated, and which properties and hostListeners it
   * binds to.
   *
   * When a component is instantiated, Angular
   * - creates a shadow DOM for the component.
   * - loads the selected template into the shadow DOM.
   * - creates all the injectable objects configured with `providers` and `viewProviders`.
   *
   * All template expressions and statements are then evaluated against the component instance.
   *
   * For details on the `@View` annotation, see {@link ViewMetadata}.
   *
   * ## Lifecycle hooks
   *
   * When the component class implements some {@link angular2/lifecycle_hooks} the callbacks are
   * called by the change detection at defined points in time during the life of the component.
   *
   * ### Example
   *
   * {@example core/ts/metadata/metadata.ts region='component'}
   */
  export var Component: ComponentFactory;
  /**
   * Directives allow you to attach behavior to elements in the DOM.
   *
   * {@link DirectiveMetadata}s with an embedded view are called {@link ComponentMetadata}s.
   *
   * A directive consists of a single directive annotation and a controller class. When the
   * directive's `selector` matches
   * elements in the DOM, the following steps occur:
   *
   * 1. For each directive, the `ElementInjector` attempts to resolve the directive's constructor
   * arguments.
   * 2. Angular instantiates directives for each matched element using `ElementInjector` in a
   * depth-first order,
   *    as declared in the HTML.
   *
   * ## Understanding How Injection Works
   *
   * There are three stages of injection resolution.
   * - *Pre-existing Injectors*:
   *   - The terminal {@link Injector} cannot resolve dependencies. It either throws an error or, if
   * the dependency was
   *     specified as `@Optional`, returns `null`.
   *   - The platform injector resolves browser singleton resources, such as: cookies, title,
   * location, and others.
   * - *Component Injectors*: Each component instance has its own {@link Injector}, and they follow
   * the same parent-child hierarchy
   *     as the component instances in the DOM.
   * - *Element Injectors*: Each component instance has a Shadow DOM. Within the Shadow DOM each
   * element has an `ElementInjector`
   *     which follow the same parent-child hierarchy as the DOM elements themselves.
   *
   * When a template is instantiated, it also must instantiate the corresponding directives in a
   * depth-first order. The
   * current `ElementInjector` resolves the constructor dependencies for each directive.
   *
   * Angular then resolves dependencies as follows, according to the order in which they appear in the
   * {@link ViewMetadata}:
   *
   * 1. Dependencies on the current element
   * 2. Dependencies on element injectors and their parents until it encounters a Shadow DOM boundary
   * 3. Dependencies on component injectors and their parents until it encounters the root component
   * 4. Dependencies on pre-existing injectors
   *
   *
   * The `ElementInjector` can inject other directives, element-specific special objects, or it can
   * delegate to the parent
   * injector.
   *
   * To inject other directives, declare the constructor parameter as:
   * - `directive:DirectiveType`: a directive on the current element only
   * - `@Host() directive:DirectiveType`: any directive that matches the type between the current
   * element and the
   *    Shadow DOM root.
   * - `@Query(DirectiveType) query:QueryList<DirectiveType>`: A live collection of direct child
   * directives.
   * - `@QueryDescendants(DirectiveType) query:QueryList<DirectiveType>`: A live collection of any
   * child directives.
   *
   * To inject element-specific special objects, declare the constructor parameter as:
   * - `element: ElementRef` to obtain a reference to logical element in the view.
   * - `viewContainer: ViewContainerRef` to control child template instantiation, for
   * {@link DirectiveMetadata} directives only
   * - `bindingPropagation: BindingPropagation` to control change detection in a more granular way.
   *
   * ### Example
   *
   * The following example demonstrates how dependency injection resolves constructor arguments in
   * practice.
   *
   *
   * Assume this HTML template:
   *
   * ```
   * <div dependency="1">
   *   <div dependency="2">
   *     <div dependency="3" my-directive>
   *       <div dependency="4">
   *         <div dependency="5"></div>
   *       </div>
   *       <div dependency="6"></div>
   *     </div>
   *   </div>
   * </div>
   * ```
   *
   * With the following `dependency` decorator and `SomeService` injectable class.
   *
   * ```
   * @Injectable()
   * class SomeService {
   * }
   *
   * @Directive({
   *   selector: '[dependency]',
   *   inputs: [
   *     'id: dependency'
   *   ]
   * })
   * class Dependency {
   *   id:string;
   * }
   * ```
   *
   * Let's step through the different ways in which `MyDirective` could be declared...
   *
   *
   * ### No injection
   *
   * Here the constructor is declared with no arguments, therefore nothing is injected into
   * `MyDirective`.
   *
   * ```
   * @Directive({ selector: '[my-directive]' })
   * class MyDirective {
   *   constructor() {
   *   }
   * }
   * ```
   *
   * This directive would be instantiated with no dependencies.
   *
   *
   * ### Component-level injection
   *
   * Directives can inject any injectable instance from the closest component injector or any of its
   * parents.
   *
   * Here, the constructor declares a parameter, `someService`, and injects the `SomeService` type
   * from the parent
   * component's injector.
   * ```
   * @Directive({ selector: '[my-directive]' })
   * class MyDirective {
   *   constructor(someService: SomeService) {
   *   }
   * }
   * ```
   *
   * This directive would be instantiated with a dependency on `SomeService`.
   *
   *
   * ### Injecting a directive from the current element
   *
   * Directives can inject other directives declared on the current element.
   *
   * ```
   * @Directive({ selector: '[my-directive]' })
   * class MyDirective {
   *   constructor(dependency: Dependency) {
   *     expect(dependency.id).toEqual(3);
   *   }
   * }
   * ```
   * This directive would be instantiated with `Dependency` declared at the same element, in this case
   * `dependency="3"`.
   *
   * ### Injecting a directive from any ancestor elements
   *
   * Directives can inject other directives declared on any ancestor element (in the current Shadow
   * DOM), i.e. on the current element, the
   * parent element, or its parents.
   * ```
   * @Directive({ selector: '[my-directive]' })
   * class MyDirective {
   *   constructor(@Host() dependency: Dependency) {
   *     expect(dependency.id).toEqual(2);
   *   }
   * }
   * ```
   *
   * `@Host` checks the current element, the parent, as well as its parents recursively. If
   * `dependency="2"` didn't
   * exist on the direct parent, this injection would
   * have returned
   * `dependency="1"`.
   *
   *
   * ### Injecting a live collection of direct child directives
   *
   *
   * A directive can also query for other child directives. Since parent directives are instantiated
   * before child directives, a directive can't simply inject the list of child directives. Instead,
   * the directive injects a {@link QueryList}, which updates its contents as children are added,
   * removed, or moved by a directive that uses a {@link ViewContainerRef} such as a `ngFor`, an
   * `ngIf`, or an `ngSwitch`.
   *
   * ```
   * @Directive({ selector: '[my-directive]' })
   * class MyDirective {
   *   constructor(@Query(Dependency) dependencies:QueryList<Dependency>) {
   *   }
   * }
   * ```
   *
   * This directive would be instantiated with a {@link QueryList} which contains `Dependency` 4 and
   * 6. Here, `Dependency` 5 would not be included, because it is not a direct child.
   *
   * ### Injecting a live collection of descendant directives
   *
   * By passing the descendant flag to `@Query` above, we can include the children of the child
   * elements.
   *
   * ```
   * @Directive({ selector: '[my-directive]' })
   * class MyDirective {
   *   constructor(@Query(Dependency, {descendants: true}) dependencies:QueryList<Dependency>) {
   *   }
   * }
   * ```
   *
   * This directive would be instantiated with a Query which would contain `Dependency` 4, 5 and 6.
   *
   * ### Optional injection
   *
   * The normal behavior of directives is to return an error when a specified dependency cannot be
   * resolved. If you
   * would like to inject `null` on unresolved dependency instead, you can annotate that dependency
   * with `@Optional()`.
   * This explicitly permits the author of a template to treat some of the surrounding directives as
   * optional.
   *
   * ```
   * @Directive({ selector: '[my-directive]' })
   * class MyDirective {
   *   constructor(@Optional() dependency:Dependency) {
   *   }
   * }
   * ```
   *
   * This directive would be instantiated with a `Dependency` directive found on the current element.
   * If none can be
   * found, the injector supplies `null` instead of throwing an error.
   *
   * ### Example
   *
   * Here we use a decorator directive to simply define basic tool-tip behavior.
   *
   * ```
   * @Directive({
   *   selector: '[tooltip]',
   *   inputs: [
   *     'text: tooltip'
   *   ],
   *   host: {
   *     '(mouseenter)': 'onMouseEnter()',
   *     '(mouseleave)': 'onMouseLeave()'
   *   }
   * })
   * class Tooltip{
   *   text:string;
   *   overlay:Overlay; // NOT YET IMPLEMENTED
   *   overlayManager:OverlayManager; // NOT YET IMPLEMENTED
   *
   *   constructor(overlayManager:OverlayManager) {
   *     this.overlay = overlay;
   *   }
   *
   *   onMouseEnter() {
   *     // exact signature to be determined
   *     this.overlay = this.overlayManager.open(text, ...);
   *   }
   *
   *   onMouseLeave() {
   *     this.overlay.close();
   *     this.overlay = null;
   *   }
   * }
   * ```
   * In our HTML template, we can then add this behavior to a `<div>` or any other element with the
   * `tooltip` selector,
   * like so:
   *
   * ```
   * <div tooltip="some text here"></div>
   * ```
   *
   * Directives can also control the instantiation, destruction, and positioning of inline template
   * elements:
   *
   * A directive uses a {@link ViewContainerRef} to instantiate, insert, move, and destroy views at
   * runtime.
   * The {@link ViewContainerRef} is created as a result of `<template>` element, and represents a
   * location in the current view
   * where these actions are performed.
   *
   * Views are always created as children of the current {@link ViewMetadata}, and as siblings of the
   * `<template>` element. Thus a
   * directive in a child view cannot inject the directive that created it.
   *
   * Since directives that create views via ViewContainers are common in Angular, and using the full
   * `<template>` element syntax is wordy, Angular
   * also supports a shorthand notation: `<li *foo="bar">` and `<li template="foo: bar">` are
   * equivalent.
   *
   * Thus,
   *
   * ```
   * <ul>
   *   <li *foo="bar" title="text"></li>
   * </ul>
   * ```
   *
   * Expands in use to:
   *
   * ```
   * <ul>
   *   <template [foo]="bar">
   *     <li title="text"></li>
   *   </template>
   * </ul>
   * ```
   *
   * Notice that although the shorthand places `*foo="bar"` within the `<li>` element, the binding for
   * the directive
   * controller is correctly instantiated on the `<template>` element rather than the `<li>` element.
   *
   * ## Lifecycle hooks
   *
   * When the directive class implements some {@link angular2/lifecycle_hooks} the callbacks are
   * called by the change detection at defined points in time during the life of the directive.
   *
   * ### Example
   *
   * Let's suppose we want to implement the `unless` behavior, to conditionally include a template.
   *
   * Here is a simple directive that triggers on an `unless` selector:
   *
   * ```
   * @Directive({
   *   selector: '[unless]',
   *   inputs: ['unless']
   * })
   * export class Unless {
   *   viewContainer: ViewContainerRef;
   *   templateRef: TemplateRef;
   *   prevCondition: boolean;
   *
   *   constructor(viewContainer: ViewContainerRef, templateRef: TemplateRef) {
   *     this.viewContainer = viewContainer;
   *     this.templateRef = templateRef;
   *     this.prevCondition = null;
   *   }
   *
   *   set unless(newCondition) {
   *     if (newCondition && (isBlank(this.prevCondition) || !this.prevCondition)) {
   *       this.prevCondition = true;
   *       this.viewContainer.clear();
   *     } else if (!newCondition && (isBlank(this.prevCondition) || this.prevCondition)) {
   *       this.prevCondition = false;
   *       this.viewContainer.create(this.templateRef);
   *     }
   *   }
   * }
   * ```
   *
   * We can then use this `unless` selector in a template:
   * ```
   * <ul>
   *   <li *unless="expr"></li>
   * </ul>
   * ```
   *
   * Once the directive instantiates the child view, the shorthand notation for the template expands
   * and the result is:
   *
   * ```
   * <ul>
   *   <template [unless]="exp">
   *     <li></li>
   *   </template>
   *   <li></li>
   * </ul>
   * ```
   *
   * Note also that although the `<li></li>` template still exists inside the `<template></template>`,
   * the instantiated
   * view occurs on the second `<li></li>` which is a sibling to the `<template>` element.
   */
  export var Directive: DirectiveFactory;
  /**
   * Metadata properties available for configuring Views.
   *
   * Each Angular component requires a single `@Component` and at least one `@View` annotation. The
   * `@View` annotation specifies the HTML template to use, and lists the directives that are active
   * within the template.
   *
   * When a component is instantiated, the template is loaded into the component's shadow root, and
   * the expressions and statements in the template are evaluated against the component.
   *
   * For details on the `@Component` annotation, see {@link ComponentMetadata}.
   *
   * ### Example
   *
   * ```
   * @Component({
   *   selector: 'greet',
   *   template: 'Hello {{name}}!',
   *   directives: [GreetUser, Bold]
   * })
   * class Greet {
   *   name: string;
   *
   *   constructor() {
   *     this.name = 'World';
   *   }
   * }
   * ```
   */
  export var View: ViewFactory;
  /**
   * Specifies that a constant attribute value should be injected.
   *
   * The directive can inject constant string literals of host element attributes.
   *
   * ### Example
   *
   * Suppose we have an `<input>` element and want to know its `type`.
   *
   * ```html
   * <input type="text">
   * ```
   *
   * A decorator can inject string literal `text` like so:
   *
   * {@example core/ts/metadata/metadata.ts region='attributeMetadata'}
   */
  export var Attribute: AttributeFactory;
  /**
   * Declares an injectable parameter to be a live list of directives or variable
   * bindings from the content children of a directive.
   *
   * ### Example ([live demo](http://plnkr.co/edit/lY9m8HLy7z06vDoUaSN2?p=preview))
   *
   * Assume that `<tabs>` component would like to get a list its children `<pane>`
   * components as shown in this example:
   *
   * ```html
   * <tabs>
   *   <pane title="Overview">...</pane>
   *   <pane *ngFor="#o of objects" [title]="o.title">{{o.text}}</pane>
   * </tabs>
   * ```
   *
   * The preferred solution is to query for `Pane` directives using this decorator.
   *
   * ```javascript
   * @Component({
   *   selector: 'pane',
   *   inputs: ['title']
   * })
   * class Pane {
   *   title:string;
   * }
   *
   * @Component({
   *  selector: 'tabs',
   *  template: `
   *    <ul>
   *      <li *ngFor="#pane of panes">{{pane.title}}</li>
   *    </ul>
   *    <ng-content></ng-content>
   *  `
   * })
   * class Tabs {
   *   panes: QueryList<Pane>;
   *   constructor(@Query(Pane) panes:QueryList<Pane>) {
   *     this.panes = panes;
   *   }
   * }
   * ```
   *
   * A query can look for variable bindings by passing in a string with desired binding symbol.
   *
   * ### Example ([live demo](http://plnkr.co/edit/sT2j25cH1dURAyBRCKx1?p=preview))
   * ```html
   * <seeker>
   *   <div #findme>...</div>
   * </seeker>
   *
   * @Component({ selector: 'foo' })
   * class seeker {
   *   constructor(@Query('findme') elList: QueryList<ElementRef>) {...}
   * }
   * ```
   *
   * In this case the object that is injected depend on the type of the variable
   * binding. It can be an ElementRef, a directive or a component.
   *
   * Passing in a comma separated list of variable bindings will query for all of them.
   *
   * ```html
   * <seeker>
   *   <div #findMe>...</div>
   *   <div #findMeToo>...</div>
   * </seeker>
   *
   *  @Component({
   *   selector: 'foo'
   * })
   * class Seeker {
   *   constructor(@Query('findMe, findMeToo') elList: QueryList<ElementRef>) {...}
   * }
   * ```
   *
   * Configure whether query looks for direct children or all descendants
   * of the querying element, by using the `descendants` parameter.
   * It is set to `false` by default.
   *
   * ### Example ([live demo](http://plnkr.co/edit/wtGeB977bv7qvA5FTYl9?p=preview))
   * ```html
   * <container #first>
   *   <item>a</item>
   *   <item>b</item>
   *   <container #second>
   *     <item>c</item>
   *   </container>
   * </container>
   * ```
   *
   * When querying for items, the first container will see only `a` and `b` by default,
   * but with `Query(TextDirective, {descendants: true})` it will see `c` too.
   *
   * The queried directives are kept in a depth-first pre-order with respect to their
   * positions in the DOM.
   *
   * Query does not look deep into any subcomponent views.
   *
   * Query is updated as part of the change-detection cycle. Since change detection
   * happens after construction of a directive, QueryList will always be empty when observed in the
   * constructor.
   *
   * The injected object is an unmodifiable live list.
   * See {@link QueryList} for more details.
   */
  export var Query: QueryFactory;
  /**
   * Configures a content query.
   *
   * Content queries are set before the `ngAfterContentInit` callback is called.
   *
   * ### Example
   *
   * ```
   * @Directive({
   *   selector: 'someDir'
   * })
   * class SomeDir {
   *   @ContentChildren(ChildDirective) contentChildren: QueryList<ChildDirective>;
   *
   *   ngAfterContentInit() {
   *     // contentChildren is set
   *   }
   * }
   * ```
   */
  export var ContentChildren: ContentChildrenFactory;
  /**
   * Configures a content query.
   *
   * Content queries are set before the `ngAfterContentInit` callback is called.
   *
   * ### Example
   *
   * ```
   * @Directive({
   *   selector: 'someDir'
   * })
   * class SomeDir {
   *   @ContentChild(ChildDirective) contentChild;
   *
   *   ngAfterContentInit() {
   *     // contentChild is set
   *   }
   * }
   * ```
   */
  export var ContentChild: ContentChildFactory;
  /**
   * Configures a view query.
   *
   * View queries are set before the `ngAfterViewInit` callback is called.
   *
   * ### Example
   *
   * ```
   * @Component({
   *   selector: 'someDir',
   *   templateUrl: 'someTemplate',
   *   directives: [ItemDirective]
   * })
   * class SomeDir {
   *   @ViewChildren(ItemDirective) viewChildren: QueryList<ItemDirective>;
   *
   *   ngAfterViewInit() {
   *     // viewChildren is set
   *   }
   * }
   * ```
   */
  export var ViewChildren: ViewChildrenFactory;
  /**
   * Configures a view query.
   *
   * View queries are set before the `ngAfterViewInit` callback is called.
   *
   * ### Example
   *
   * ```
   * @Component({
   *   selector: 'someDir',
   *   templateUrl: 'someTemplate',
   *   directives: [ItemDirective]
   * })
   * class SomeDir {
   *   @ViewChild(ItemDirective) viewChild:ItemDirective;
   *
   *   ngAfterViewInit() {
   *     // viewChild is set
   *   }
   * }
   * ```
   */
  export var ViewChild: ViewChildFactory;
  /**
   * Similar to {@link QueryMetadata}, but querying the component view, instead of
   * the content children.
   *
   * ### Example ([live demo](http://plnkr.co/edit/eNsFHDf7YjyM6IzKxM1j?p=preview))
   *
   * ```javascript
   * @Component({...})
   * @View({
   *   template: `
   *     <item> a </item>
   *     <item> b </item>
   *     <item> c </item>
   *   `
   * })
   * class MyComponent {
   *   shown: boolean;
   *
   *   constructor(private @Query(Item) items:QueryList<Item>) {
   *     items.changes.subscribe(() => console.log(items.length));
   *   }
   * }
   * ```
   *
   * Supports the same querying parameters as {@link QueryMetadata}, except
   * `descendants`. This always queries the whole view.
   *
   * As `shown` is flipped between true and false, items will contain zero of one
   * items.
   *
   * Specifies that a {@link QueryList} should be injected.
   *
   * The injected object is an iterable and observable live list.
   * See {@link QueryList} for more details.
   */
  export var ViewQuery: QueryFactory;
  /**
   * Declare reusable pipe function.
   *
   * ### Example
   *
   * {@example core/ts/metadata/metadata.ts region='pipe'}
   */
  export var Pipe: PipeFactory;
  /**
   * Declares a data-bound input property.
   *
   * Angular automatically updates data-bound properties during change detection.
   *
   * `InputMetadata` takes an optional parameter that specifies the name
   * used when instantiating a component in the template. When not provided,
   * the name of the decorated property is used.
   *
   * ### Example
   *
   * The following example creates a component with two input properties.
   *
   * ```typescript
   * @Component({
   *   selector: 'bank-account',
   *   template: `
   *     Bank Name: {{bankName}}
   *     Account Id: {{id}}
   *   `
   * })
   * class BankAccount {
   *   @Input() bankName: string;
   *   @Input('account-id') id: string;
   *
   *   // this property is not bound, and won't be automatically updated by Angular
   *   normalizedBankName: string;
   * }
   *
   * @Component({
   *   selector: 'app',
   *   template: `
   *     <bank-account bank-name="RBC" account-id="4747"></bank-account>
   *   `,
   *   directives: [BankAccount]
   * })
   * class App {}
   *
   * bootstrap(App);
   * ```
   */
  export var Input: InputFactory;
  /**
   * Declares an event-bound output property.
   *
   * When an output property emits an event, an event handler attached to that event
   * the template is invoked.
   *
   * `OutputMetadata` takes an optional parameter that specifies the name
   * used when instantiating a component in the template. When not provided,
   * the name of the decorated property is used.
   *
   * ### Example
   *
   * ```typescript
   * @Directive({
   *   selector: 'interval-dir',
   * })
   * class IntervalDir {
   *   @Output() everySecond = new EventEmitter();
   *   @Output('everyFiveSeconds') five5Secs = new EventEmitter();
   *
   *   constructor() {
   *     setInterval(() => this.everySecond.emit("event"), 1000);
   *     setInterval(() => this.five5Secs.emit("event"), 5000);
   *   }
   * }
   *
   * @Component({
   *   selector: 'app',
   *   template: `
   *     <interval-dir (everySecond)="everySecond()" (everyFiveSeconds)="everyFiveSeconds()">
   *     </interval-dir>
   *   `,
   *   directives: [IntervalDir]
   * })
   * class App {
   *   everySecond() { console.log('second'); }
   *   everyFiveSeconds() { console.log('five seconds'); }
   * }
   * bootstrap(App);
   * ```
   */
  export var Output: OutputFactory;
  /**
   * Declares a host property binding.
   *
   * Angular automatically checks host property bindings during change detection.
   * If a binding changes, it will update the host element of the directive.
   *
   * `HostBindingMetadata` takes an optional parameter that specifies the property
   * name of the host element that will be updated. When not provided,
   * the class property name is used.
   *
   * ### Example
   *
   * The following example creates a directive that sets the `valid` and `invalid` classes
   * on the DOM element that has ngModel directive on it.
   *
   * ```typescript
   * @Directive({selector: '[ngModel]'})
   * class NgModelStatus {
   *   constructor(public control:NgModel) {}
   *   @HostBinding('[class.valid]') get valid { return this.control.valid; }
   *   @HostBinding('[class.invalid]') get invalid { return this.control.invalid; }
   * }
   *
   * @Component({
   *   selector: 'app',
   *   template: `<input [(ngModel)]="prop">`,
   *   directives: [FORM_DIRECTIVES, NgModelStatus]
   * })
   * class App {
   *   prop;
   * }
   *
   * bootstrap(App);
   * ```
   */
  export var HostBinding: HostBindingFactory;
  /**
   * Declares a host listener.
   *
   * Angular will invoke the decorated method when the host element emits the specified event.
   *
   * If the decorated method returns `false`, then `preventDefault` is applied on the DOM
   * event.
   *
   * ### Example
   *
   * The following example declares a directive that attaches a click listener to the button and
   * counts clicks.
   *
   * ```typescript
   * @Directive({selector: 'button[counting]'})
   * class CountClicks {
   *   numberOfClicks = 0;
   *
   *   @HostListener('click', ['$event.target'])
   *   onClick(btn) {
   *     console.log("button", btn, "number of clicks:", this.numberOfClicks++);
   *   }
   * }
   *
   * @Component({
   *   selector: 'app',
   *   template: `<button counting>Increment</button>`,
   *   directives: [CountClicks]
   * })
   * class App {}
   *
   * bootstrap(App);
   * ```
   */
  export var HostListener: HostListenerFactory;
}
declare module "angular2/src/core/util" {
  export { Class, ClassDefinition, TypeDecorator } from "angular2/src/core/util/decorators";
}
declare module "angular2/src/core/prod_mode" {
  export { enableProdMode } from "angular2/src/facade/lang";
}
declare module "angular2/src/facade/facade" {
  export { ConcreteType, Type } from "angular2/src/facade/lang";
  export { EventEmitter } from "angular2/src/facade/async";
  export { WrappedException } from "angular2/src/facade/exceptions";
  export { ExceptionHandler } from "angular2/src/facade/exception_handler";
}
declare module "angular2/src/core/zone/ng_zone" {
  import { ZoneLike } from "angular2/src/facade/lang";
  import { EventEmitter } from "angular2/src/facade/async";
  import { WtfScopeFn } from "angular2/src/core/profile/profile";
  export interface NgZoneZone extends ZoneLike {
    /** @internal */
    _innerZone: boolean;
  }
  /**
   * Interface for a function with zero arguments.
   */
  export interface ZeroArgFunction {
    (): void;
  }
  /**
   * Function type for an error handler, which takes an error and a stack trace.
   */
  export interface ErrorHandlingFn {
    (error: any, stackTrace: any): void;
  }
  /**
   * Stores error information; delivered via [NgZone.onError] stream.
   */
  export class NgZoneError {
    error: any;
    stackTrace: any;
    constructor(error: any, stackTrace: any);
  }
  /**
   * An injectable service for executing work inside or outside of the Angular zone.
   *
   * The most common use of this service is to optimize performance when starting a work consisting of
   * one or more asynchronous tasks that don't require UI updates or error handling to be handled by
   * Angular. Such tasks can be kicked off via {@link #runOutsideAngular} and if needed, these tasks
   * can reenter the Angular zone via {@link #run}.
   *
   * <!-- TODO: add/fix links to:
   *   - docs explaining zones and the use of zones in Angular and change-detection
   *   - link to runOutsideAngular/run (throughout this file!)
   *   -->
   *
   * ### Example ([live demo](http://plnkr.co/edit/lY9m8HLy7z06vDoUaSN2?p=preview))
   * ```
   * import {Component, View, NgZone} from 'angular2/core';
   * import {NgIf} from 'angular2/common';
   *
   * @Component({
   *   selector: 'ng-zone-demo'.
   *   template: `
   *     <h2>Demo: NgZone</h2>
   *
   *     <p>Progress: {{progress}}%</p>
   *     <p *ngIf="progress >= 100">Done processing {{label}} of Angular zone!</p>
   *
   *     <button (click)="processWithinAngularZone()">Process within Angular zone</button>
   *     <button (click)="processOutsideOfAngularZone()">Process outside of Angular zone</button>
   *   `,
   *   directives: [NgIf]
   * })
   * export class NgZoneDemo {
   *   progress: number = 0;
   *   label: string;
   *
   *   constructor(private _ngZone: NgZone) {}
   *
   *   // Loop inside the Angular zone
   *   // so the UI DOES refresh after each setTimeout cycle
   *   processWithinAngularZone() {
   *     this.label = 'inside';
   *     this.progress = 0;
   *     this._increaseProgress(() => console.log('Inside Done!'));
   *   }
   *
   *   // Loop outside of the Angular zone
   *   // so the UI DOES NOT refresh after each setTimeout cycle
   *   processOutsideOfAngularZone() {
   *     this.label = 'outside';
   *     this.progress = 0;
   *     this._ngZone.runOutsideAngular(() => {
   *       this._increaseProgress(() => {
   *       // reenter the Angular zone and display done
   *       this._ngZone.run(() => {console.log('Outside Done!') });
   *     }}));
   *   }
   *
   *
   *   _increaseProgress(doneCallback: () => void) {
   *     this.progress += 1;
   *     console.log(`Current progress: ${this.progress}%`);
   *
   *     if (this.progress < 100) {
   *       window.setTimeout(() => this._increaseProgress(doneCallback)), 10)
   *     } else {
   *       doneCallback();
   *     }
   *   }
   * }
   * ```
   */
  export class NgZone {
    /** @internal */
    _runScope: WtfScopeFn;
    /** @internal */
    _microtaskScope: WtfScopeFn;
    /** @internal */
    _mountZone: any;
    /** @internal */
    _innerZone: any;
    /** @internal */
    _onTurnStart: ZeroArgFunction;
    /** @internal */
    _onTurnDone: ZeroArgFunction;
    /** @internal */
    _onEventDone: ZeroArgFunction;
    /** @internal */
    _onErrorHandler: ErrorHandlingFn;
    /** @internal */
    _onTurnStartEvents: EventEmitter<any>;
    /** @internal */
    _onTurnDoneEvents: EventEmitter<any>;
    /** @internal */
    _onEventDoneEvents: EventEmitter<any>;
    /** @internal */
    _onErrorEvents: EventEmitter<any>;
    /** @internal */
    _pendingMicrotasks: number;
    /** @internal */
    _hasExecutedCodeInInnerZone: boolean;
    /** @internal */
    _nestedRun: number;
    /** @internal */
    _disabled: boolean;
    /** @internal */
    _inVmTurnDone: boolean;
    /** @internal */
    _pendingTimeouts: number[];
    /**
     * @param {bool} enableLongStackTrace whether to enable long stack trace. They should only be
     *               enabled in development mode as they significantly impact perf.
     */
    constructor({enableLongStackTrace}: {
      enableLongStackTrace: any;
    });
    /**
     * Sets the zone hook that is called just before a browser task that is handled by Angular
     * executes.
     *
     * The hook is called once per browser task that is handled by Angular.
     *
     * Setting the hook overrides any previously set hook.
     *
     * @deprecated this API will be removed in the future. Use `onTurnStart` instead.
     */
    overrideOnTurnStart(onTurnStartHook: ZeroArgFunction): void;
    /**
     * Notifies subscribers just before Angular event turn starts.
     *
     * Emits an event once per browser task that is handled by Angular.
     */
    onTurnStart: any;
    /** @internal */
    _notifyOnTurnStart(parentRun: any): void;
    /**
     * Sets the zone hook that is called immediately after Angular zone is done processing the current
     * task and any microtasks scheduled from that task.
     *
     * This is where we typically do change-detection.
     *
     * The hook is called once per browser task that is handled by Angular.
     *
     * Setting the hook overrides any previously set hook.
     *
     * @deprecated this API will be removed in the future. Use `onTurnDone` instead.
     */
    overrideOnTurnDone(onTurnDoneHook: ZeroArgFunction): void;
    /**
     * Notifies subscribers immediately after Angular zone is done processing
     * the current turn and any microtasks scheduled from that turn.
     *
     * Used by Angular as a signal to kick off change-detection.
     */
    onTurnDone: EventEmitter<any>;
    /** @internal */
    _notifyOnTurnDone(parentRun: any): void;
    /**
     * Sets the zone hook that is called immediately after the `onTurnDone` callback is called and any
     * microstasks scheduled from within that callback are drained.
     *
     * `onEventDoneFn` is executed outside Angular zone, which means that we will no longer attempt to
     * sync the UI with any model changes that occur within this callback.
     *
     * This hook is useful for validating application state (e.g. in a test).
     *
     * Setting the hook overrides any previously set hook.
     *
     * @deprecated this API will be removed in the future. Use `onEventDone` instead.
     */
    overrideOnEventDone(onEventDoneFn: ZeroArgFunction, opt_waitForAsync?: boolean): void;
    /**
     * Notifies subscribers immediately after the final `onTurnDone` callback
     * before ending VM event.
     *
     * This event is useful for validating application state (e.g. in a test).
     */
    onEventDone: EventEmitter<any>;
    /** @internal */
    _notifyOnEventDone(): void;
    /**
     * Whether there are any outstanding microtasks.
     */
    hasPendingMicrotasks: boolean;
    /**
     * Whether there are any outstanding timers.
     */
    hasPendingTimers: boolean;
    /**
     * Whether there are any outstanding asynchronous tasks of any kind that are
     * scheduled to run within Angular zone.
     *
     * Useful as a signal of UI stability. For example, when a test reaches a
     * point when [hasPendingAsyncTasks] is `false` it might be a good time to run
     * test expectations.
     */
    hasPendingAsyncTasks: boolean;
    /**
     * Sets the zone hook that is called when an error is thrown in the Angular zone.
     *
     * Setting the hook overrides any previously set hook.
     *
     * @deprecated this API will be removed in the future. Use `onError` instead.
     */
    overrideOnErrorHandler(errorHandler: ErrorHandlingFn): void;
    onError: EventEmitter<any>;
    /**
     * Executes the `fn` function synchronously within the Angular zone and returns value returned by
     * the function.
     *
     * Running functions via `run` allows you to reenter Angular zone from a task that was executed
     * outside of the Angular zone (typically started via {@link #runOutsideAngular}).
     *
     * Any future tasks or microtasks scheduled from within this function will continue executing from
     * within the Angular zone.
     */
    run(fn: () => any): any;
    /**
     * Executes the `fn` function synchronously in Angular's parent zone and returns value returned by
     * the function.
     *
     * Running functions via `runOutsideAngular` allows you to escape Angular's zone and do work that
     * doesn't trigger Angular change-detection or is subject to Angular's error handling.
     *
     * Any future tasks or microtasks scheduled from within this function will continue executing from
     * outside of the Angular zone.
     *
     * Use {@link #run} to reenter the Angular zone and do work that updates the application model.
     */
    runOutsideAngular(fn: () => any): any;
    /** @internal */
    _createInnerZone(zone: any, enableLongStackTrace: any): any;
    /** @internal */
    _notifyOnError(zone: any, e: any): void;
  }
}
declare module "angular2/src/core/application_tokens" {
  import { OpaqueToken, Provider } from "angular2/src/core/di";
  /**
   *  @internal
   */
  export const APP_COMPONENT_REF_PROMISE: OpaqueToken;
  /**
   * An {@link angular2/di/OpaqueToken} representing the application root type in the {@link
   * Injector}.
   *
   * ```
   * @Component(...)
   * class MyApp {
   *   ...
   * }
   *
   * bootstrap(MyApp).then((appRef:ApplicationRef) {
   *   expect(appRef.injector.get(appComponentTypeToken)).toEqual(MyApp);
   * });
   *
   * ```
   */
  export const APP_COMPONENT: OpaqueToken;
  /**
   * A DI Token representing a unique string id assigned to the application by Angular and used
   * primarily for prefixing application attributes and CSS styles when
   * {@link ViewEncapsulation#Emulated} is being used.
   *
   * If you need to avoid randomly generated value to be used as an application id, you can provide
   * a custom value via a DI provider <!-- TODO: provider --> configuring the root {@link Injector}
   * using this token.
   */
  export const APP_ID: OpaqueToken;
  /**
   * Providers that will generate a random APP_ID_TOKEN.
   */
  export const APP_ID_RANDOM_PROVIDER: Provider;
  /**
   * A function that will be executed when a platform is initialized.
   */
  export const PLATFORM_INITIALIZER: OpaqueToken;
  /**
   * A function that will be executed when an application is initialized.
   */
  export const APP_INITIALIZER: OpaqueToken;
  /**
   * A token which indicates the root directory of the application
   */
  export const PACKAGE_ROOT_URL: OpaqueToken;
}
declare module "angular2/src/core/testability/testability" {
  import { NgZone } from "angular2/src/core/zone/ng_zone";
  /**
   * The Testability service provides testing hooks that can be accessed from
   * the browser and by services such as Protractor. Each bootstrapped Angular
   * application on the page will have an instance of Testability.
   */
  export class Testability {
    /** @internal */
    _pendingCount: number;
    /**
     * Whether any work was done since the last 'whenStable' callback. This is
     * useful to detect if this could have potentially destabilized another
     * component while it is stabilizing.
     * @internal
     */
    _didWork: boolean;
    /** @internal */
    _callbacks: Function[];
    /** @internal */
    _isAngularEventPending: boolean;
    constructor(_ngZone: NgZone);
    /** @internal */
    _watchAngularEvents(_ngZone: NgZone): void;
    increasePendingRequestCount(): number;
    decreasePendingRequestCount(): number;
    isStable(): boolean;
    /** @internal */
    _runCallbacksIfReady(): void;
    whenStable(callback: Function): void;
    getPendingRequestCount(): number;
    isAngularEventPending(): boolean;
    findBindings(using: any, provider: string, exactMatch: boolean): any[];
    findProviders(using: any, provider: string, exactMatch: boolean): any[];
  }
  /**
   * A global registry of {@link Testability} instances for specific elements.
   */
  export class TestabilityRegistry {
    /** @internal */
    _applications: Map<any, Testability>;
    constructor();
    registerApplication(token: any, testability: Testability): void;
    getTestability(elem: any): Testability;
    getAllTestabilities(): Testability[];
    getAllRootElements(): any[];
    findTestabilityInTree(elem: Node, findInAncestors?: boolean): Testability;
  }
  /**
   * Adapter interface for retrieving the `Testability` service associated for a
   * particular context.
   */
  export interface GetTestability {
    addToWindow(registry: TestabilityRegistry): void;
    findTestabilityInTree(registry: TestabilityRegistry, elem: any, findInAncestors: boolean): Testability;
  }
  /**
   * Set the {@link GetTestability} implementation used by the Angular testing framework.
   */
  export function setTestabilityGetter(getter: GetTestability): void;
}
declare module "angular2/src/core/linker/view_type" {
  export enum ViewType {
    HOST = 0,
    COMPONENT = 1,
    EMBEDDED = 2,
  }
}
declare module "angular2/src/core/linker/element_ref" {
  import { AppElement } from "angular2/src/core/linker/element";
  /**
   * Represents a location in a View that has an injection, change-detection and render context
   * associated with it.
   *
   * An `ElementRef` is created for each element in the Template that contains a Directive, Component
   * or data-binding.
   *
   * An `ElementRef` is backed by a render-specific element. In the browser, this is usually a DOM
   * element.
   */
  export abstract class ElementRef {
    /**
     * The underlying native element or `null` if direct access to native elements is not supported
     * (e.g. when the application runs in a web worker).
     *
     * <div class="callout is-critical">
     *   <header>Use with caution</header>
     *   <p>
     *    Use this API as the last resort when direct access to DOM is needed. Use templating and
     *    data-binding provided by Angular instead. Alternatively you take a look at {@link Renderer}
     *    which provides API that can safely be used even when direct access to native elements is not
     *    supported.
     *   </p>
     *   <p>
     *    Relying on direct DOM access creates tight coupling between your application and rendering
     *    layers which will make it impossible to separate the two and deploy your application into a
     *    web worker.
     *   </p>
     * </div>
     */
    nativeElement: any;
  }
  export class ElementRef_ implements ElementRef {
    private _appElement;
    constructor(_appElement: AppElement);
    internalElement: AppElement;
    nativeElement: any;
  }
}
declare module "angular2/src/core/linker/template_ref" {
  import { ElementRef, ElementRef_ } from "angular2/src/core/linker/element_ref";
  /**
   * Represents an Embedded Template that can be used to instantiate Embedded Views.
   *
   * You can access a `TemplateRef`, in two ways. Via a directive placed on a `<template>` element (or
   * directive prefixed with `*`) and have the `TemplateRef` for this Embedded View injected into the
   * constructor of the directive using the `TemplateRef` Token. Alternatively you can query for the
   * `TemplateRef` from a Component or a Directive via {@link Query}.
   *
   * To instantiate Embedded Views based on a Template, use
   * {@link ViewContainerRef#createEmbeddedView}, which will create the View and attach it to the
   * View Container.
   */
  export abstract class TemplateRef {
    /**
     * The location in the View where the Embedded View logically belongs to.
     *
     * The data-binding and injection contexts of Embedded Views created from this `TemplateRef`
     * inherit from the contexts of this location.
     *
     * Typically new Embedded Views are attached to the View Container of this location, but in
     * advanced use-cases, the View can be attached to a different container while keeping the
     * data-binding and injection context from the original location.
     *
     */
    elementRef: ElementRef;
  }
  export class TemplateRef_ extends TemplateRef {
    private _elementRef;
    constructor(_elementRef: ElementRef_);
    elementRef: ElementRef_;
  }
}
declare module "angular2/src/core/linker/view_container_ref" {
  import { ResolvedProvider } from "angular2/src/core/di";
  import { AppElement } from "angular2/src/core/linker/element";
  import { ElementRef, ElementRef_ } from "angular2/src/core/linker/element_ref";
  import { TemplateRef } from "angular2/src/core/linker/template_ref";
  import { EmbeddedViewRef, HostViewRef, HostViewFactoryRef, ViewRef } from "angular2/src/core/linker/view_ref";
  /**
   * Represents a container where one or more Views can be attached.
   *
   * The container can contain two kinds of Views. Host Views, created by instantiating a
   * {@link Component} via {@link #createHostView}, and Embedded Views, created by instantiating an
   * {@link TemplateRef Embedded Template} via {@link #createEmbeddedView}.
   *
   * The location of the View Container within the containing View is specified by the Anchor
   * `element`. Each View Container can have only one Anchor Element and each Anchor Element can only
   * have a single View Container.
   *
   * Root elements of Views attached to this container become siblings of the Anchor Element in
   * the Rendered View.
   *
   * To access a `ViewContainerRef` of an Element, you can either place a {@link Directive} injected
   * with `ViewContainerRef` on the Element, or you obtain it via
   * {@link AppViewManager#getViewContainer}.
   *
   * <!-- TODO(i): we are also considering ElementRef#viewContainer api -->
   */
  export abstract class ViewContainerRef {
    /**
     * Anchor element that specifies the location of this container in the containing View.
     * <!-- TODO: rename to anchorElement -->
     */
    element: ElementRef;
    /**
     * Destroys all Views in this container.
     */
    clear(): void;
    /**
     * Returns the {@link ViewRef} for the View located in this container at the specified index.
     */
    abstract get(index: number): ViewRef;
    /**
     * Returns the number of Views currently attached to this container.
     */
    length: number;
    /**
     * Instantiates an Embedded View based on the {@link TemplateRef `templateRef`} and inserts it
     * into this container at the specified `index`.
     *
     * If `index` is not specified, the new View will be inserted as the last View in the container.
     *
     * Returns the {@link ViewRef} for the newly created View.
     */
    abstract createEmbeddedView(templateRef: TemplateRef, index?: number): EmbeddedViewRef;
    /**
     * Instantiates a single {@link Component} and inserts its Host View into this container at the
     * specified `index`.
     *
     * The component is instantiated using its {@link ProtoViewRef `protoView`} which can be
     * obtained via {@link Compiler#compileInHost}.
     *
     * If `index` is not specified, the new View will be inserted as the last View in the container.
     *
     * You can optionally specify `dynamicallyCreatedProviders`, which configure the {@link Injector}
     * that will be created for the Host View.
     *
     * Returns the {@link HostViewRef} of the Host View created for the newly instantiated Component.
     */
    abstract createHostView(hostViewFactoryRef: HostViewFactoryRef, index?: number, dynamicallyCreatedProviders?: ResolvedProvider[], projectableNodes?: any[][]): HostViewRef;
    /**
     * Inserts a View identified by a {@link ViewRef} into the container at the specified `index`.
     *
     * If `index` is not specified, the new View will be inserted as the last View in the container.
     *
     * Returns the inserted {@link ViewRef}.
     */
    abstract insert(viewRef: EmbeddedViewRef, index?: number): EmbeddedViewRef;
    /**
     * Returns the index of the View, specified via {@link ViewRef}, within the current container or
     * `-1` if this container doesn't contain the View.
     */
    abstract indexOf(viewRef: ViewRef): number;
    /**
     * Destroys a View attached to this container at the specified `index`.
     *
     * If `index` is not specified, the last View in the container will be removed.
     */
    abstract remove(index?: number): void;
    /**
     * Use along with {@link #insert} to move a View within the current container.
     *
     * If the `index` param is omitted, the last {@link ViewRef} is detached.
     */
    abstract detach(index?: number): EmbeddedViewRef;
  }
  export class ViewContainerRef_ extends ViewContainerRef {
    private _element;
    constructor(_element: AppElement);
    get(index: number): EmbeddedViewRef;
    length: number;
    element: ElementRef_;
    createEmbeddedView(templateRef: TemplateRef, index?: number): EmbeddedViewRef;
    createHostView(hostViewFactoryRef: HostViewFactoryRef, index?: number, dynamicallyCreatedProviders?: ResolvedProvider[], projectableNodes?: any[][]): HostViewRef;
    insert(viewRef: ViewRef, index?: number): EmbeddedViewRef;
    indexOf(viewRef: ViewRef): number;
    remove(index?: number): void;
    detach(index?: number): EmbeddedViewRef;
  }
}
declare module "angular2/src/core/render/api" {
  import { ViewEncapsulation } from "angular2/src/core/metadata/view";
  import { Injector } from "angular2/src/core/di";
  export class RenderComponentType {
    id: string;
    encapsulation: ViewEncapsulation;
    styles: Array<string | any[]>;
    constructor(id: string, encapsulation: ViewEncapsulation, styles: Array<string | any[]>);
  }
  export class RenderDebugInfo {
    injector: Injector;
    component: any;
    providerTokens: any[];
    locals: Map<string, any>;
    constructor(injector: Injector, component: any, providerTokens: any[], locals: Map<string, any>);
  }
  export interface ParentRenderer {
    renderComponent(componentType: RenderComponentType): Renderer;
  }
  export abstract class Renderer implements ParentRenderer {
    abstract renderComponent(componentType: RenderComponentType): Renderer;
    abstract selectRootElement(selector: string): any;
    abstract createElement(parentElement: any, name: string): any;
    abstract createViewRoot(hostElement: any): any;
    abstract createTemplateAnchor(parentElement: any): any;
    abstract createText(parentElement: any, value: string): any;
    abstract projectNodes(parentElement: any, nodes: any[]): any;
    abstract attachViewAfter(node: any, viewRootNodes: any[]): any;
    abstract detachView(viewRootNodes: any[]): any;
    abstract destroyView(hostElement: any, viewAllNodes: any[]): any;
    abstract listen(renderElement: any, name: string, callback: Function): Function;
    abstract listenGlobal(target: string, name: string, callback: Function): Function;
    abstract setElementProperty(renderElement: any, propertyName: string, propertyValue: any): any;
    abstract setElementAttribute(renderElement: any, attributeName: string, attributeValue: string): any;
    /**
     * Used only in debug mode to serialize property changes to comment nodes,
     * such as <template> placeholders.
     */
    abstract setBindingDebugInfo(renderElement: any, propertyName: string, propertyValue: string): any;
    abstract setElementDebugInfo(renderElement: any, info: RenderDebugInfo): any;
    abstract setElementClass(renderElement: any, className: string, isAdd: boolean): any;
    abstract setElementStyle(renderElement: any, styleName: string, styleValue: string): any;
    abstract invokeElementMethod(renderElement: any, methodName: string, args: any[]): any;
    abstract setText(renderNode: any, text: string): any;
  }
  /**
   * Injectable service that provides a low-level interface for modifying the UI.
   *
   * Use this service to bypass Angular's templating and make custom UI changes that can't be
   * expressed declaratively. For example if you need to set a property or an attribute whose name is
   * not statically known, use {@link #setElementProperty} or {@link #setElementAttribute}
   * respectively.
   *
   * If you are implementing a custom renderer, you must implement this interface.
   *
   * The default Renderer implementation is `DomRenderer`. Also available is `WebWorkerRenderer`.
   */
  export abstract class RootRenderer implements ParentRenderer {
    abstract renderComponent(componentType: RenderComponentType): Renderer;
  }
}
declare module "angular2/src/core/linker/query_list" {
  import { Observable } from "angular2/src/facade/async";
  /**
   * An unmodifiable list of items that Angular keeps up to date when the state
   * of the application changes.
   *
   * The type of object that {@link QueryMetadata} and {@link ViewQueryMetadata} provide.
   *
   * Implements an iterable interface, therefore it can be used in both ES6
   * javascript `for (var i of items)` loops as well as in Angular templates with
   * `*ngFor="#i of myList"`.
   *
   * Changes can be observed by subscribing to the changes `Observable`.
   *
   * NOTE: In the future this class will implement an `Observable` interface.
   *
   * ### Example ([live demo](http://plnkr.co/edit/RX8sJnQYl9FWuSCWme5z?p=preview))
   * ```typescript
   * @Component({...})
   * class Container {
   *   constructor(@Query(Item) items: QueryList<Item>) {
   *     items.changes.subscribe(_ => console.log(items.length));
   *   }
   * }
   * ```
   */
  export class QueryList<T> {
    private _results;
    private _emitter;
    changes: Observable<any>;
    length: number;
    first: T;
    last: T;
    /**
     * returns a new array with the passed in function applied to each element.
     */
    map<U>(fn: (item: T) => U): U[];
    /**
     * returns a filtered array.
     */
    filter(fn: (item: T) => boolean): T[];
    /**
     * returns a reduced value.
     */
    reduce<U>(fn: (acc: U, item: T) => U, init: U): U;
    /**
     * executes function for each element in a query.
     */
    forEach(fn: (item: T) => void): void;
    /**
     * converts QueryList into an array
     */
    toArray(): T[];
    toString(): string;
    /**
     * @internal
     */
    reset(res: T[]): void;
    /** @internal */
    notifyOnChanges(): void;
  }
}
declare module "angular2/src/core/linker/interfaces" {
  import { SimpleChange } from "angular2/src/core/change_detection/change_detection_util";
  export enum LifecycleHooks {
    OnInit = 0,
    OnDestroy = 1,
    DoCheck = 2,
    OnChanges = 3,
    AfterContentInit = 4,
    AfterContentChecked = 5,
    AfterViewInit = 6,
    AfterViewChecked = 7,
  }
  /**
   * @internal
   */
  export var LIFECYCLE_HOOKS_VALUES: LifecycleHooks[];
  /**
   * Lifecycle hooks are guaranteed to be called in the following order:
   * - `OnChanges` (if any bindings have changed),
   * - `OnInit` (after the first check only),
   * - `DoCheck`,
   * - `AfterContentInit`,
   * - `AfterContentChecked`,
   * - `AfterViewInit`,
   * - `AfterViewChecked`,
   * - `OnDestroy` (at the very end before destruction)
   */
  /**
   * Implement this interface to get notified when any data-bound property of your directive changes.
   *
   * `ngOnChanges` is called right after the data-bound properties have been checked and before view
   * and content children are checked if at least one of them has changed.
   *
   * The `changes` parameter contains an entry for each of the changed data-bound property. The key is
   * the property name and the value is an instance of {@link SimpleChange}.
   *
   * ### Example ([live example](http://plnkr.co/edit/AHrB6opLqHDBPkt4KpdT?p=preview)):
   *
   * ```typescript
   * @Component({
   *   selector: 'my-cmp',
   *   template: `<p>myProp = {{myProp}}</p>`
   * })
   * class MyComponent implements OnChanges {
   *   @Input() myProp: any;
   *
   *   ngOnChanges(changes: {[propName: string]: SimpleChange}) {
   *     console.log('ngOnChanges - myProp = ' + changes['myProp'].currentValue);
   *   }
   * }
   *
   * @Component({
   *   selector: 'app',
   *   template: `
   *     <button (click)="value = value + 1">Change MyComponent</button>
   *     <my-cmp [my-prop]="value"></my-cmp>`,
   *   directives: [MyComponent]
   * })
   * export class App {
   *   value = 0;
   * }
   *
   * bootstrap(App).catch(err => console.error(err));
   * ```
   */
  export interface OnChanges {
    ngOnChanges(changes: {
      [key: string]: SimpleChange;
    }): any;
  }
  /**
   * Implement this interface to execute custom initialization logic after your directive's
   * data-bound properties have been initialized.
   *
   * `ngOnInit` is called right after the directive's data-bound properties have been checked for the
   * first time, and before any of its children have been checked. It is invoked only once when the
   * directive is instantiated.
   *
   * ### Example ([live example](http://plnkr.co/edit/1MBypRryXd64v4pV03Yn?p=preview))
   *
   * ```typescript
   * @Component({
   *   selector: 'my-cmp',
   *   template: `<p>my-component</p>`
   * })
   * class MyComponent implements OnInit, OnDestroy {
   *   ngOnInit() {
   *     console.log('ngOnInit');
   *   }
   *
   *   ngOnDestroy() {
   *     console.log('ngOnDestroy');
   *   }
   * }
   *
   * @Component({
   *   selector: 'app',
   *   template: `
   *     <button (click)="hasChild = !hasChild">
   *       {{hasChild ? 'Destroy' : 'Create'}} MyComponent
   *     </button>
   *     <my-cmp *ngIf="hasChild"></my-cmp>`,
   *   directives: [MyComponent, NgIf]
   * })
   * export class App {
   *   hasChild = true;
   * }
   *
   * bootstrap(App).catch(err => console.error(err));
   *  ```
   */
  export interface OnInit {
    ngOnInit(): any;
  }
  /**
   * Implement this interface to override the default change detection algorithm for your directive.
   *
   * `ngDoCheck` gets called to check the changes in the directives instead of the default algorithm.
   *
   * The default change detection algorithm looks for differences by comparing bound-property values
   * by reference across change detection runs. When `DoCheck` is implemented, the default algorithm
   * is disabled and `ngDoCheck` is responsible for checking for changes.
   *
   * Implementing this interface allows improving performance by using insights about the component,
   * its implementation and data types of its properties.
   *
   * Note that a directive should not implement both `DoCheck` and {@link OnChanges} at the same time.
   * `ngOnChanges` would not be called when a directive implements `DoCheck`. Reaction to the changes
   * have to be handled from within the `ngDoCheck` callback.
   *
   * Use {@link KeyValueDiffers} and {@link IterableDiffers} to add your custom check mechanisms.
   *
   * ### Example ([live demo](http://plnkr.co/edit/QpnIlF0CR2i5bcYbHEUJ?p=preview))
   *
   * In the following example `ngDoCheck` uses an {@link IterableDiffers} to detect the updates to the
   * array `list`:
   *
   * ```typescript
   * @Component({
   *   selector: 'custom-check',
   *   template: `
   *     <p>Changes:</p>
   *     <ul>
   *       <li *ngFor="#line of logs">{{line}}</li>
   *     </ul>`,
   *   directives: [NgFor]
   * })
   * class CustomCheckComponent implements DoCheck {
   *   @Input() list: any[];
   *   differ: any;
   *   logs = [];
   *
   *   constructor(differs: IterableDiffers) {
   *     this.differ = differs.find([]).create(null);
   *   }
   *
   *   ngDoCheck() {
   *     var changes = this.differ.diff(this.list);
   *
   *     if (changes) {
   *       changes.forEachAddedItem(r => this.logs.push('added ' + r.item));
   *       changes.forEachRemovedItem(r => this.logs.push('removed ' + r.item))
   *     }
   *   }
   * }
   *
   * @Component({
   *   selector: 'app',
   *   template: `
   *     <button (click)="list.push(list.length)">Push</button>
   *     <button (click)="list.pop()">Pop</button>
   *     <custom-check [list]="list"></custom-check>`,
   *   directives: [CustomCheckComponent]
   * })
   * export class App {
   *   list = [];
   * }
   * ```
   */
  export interface DoCheck {
    ngDoCheck(): any;
  }
  /**
   * Implement this interface to get notified when your directive is destroyed.
   *
   * `ngOnDestroy` callback is typically used for any custom cleanup that needs to occur when the
   * instance is destroyed
   *
   * ### Example ([live example](http://plnkr.co/edit/1MBypRryXd64v4pV03Yn?p=preview))
   *
   * ```typesript
   * @Component({
   *   selector: 'my-cmp',
   *   template: `<p>my-component</p>`
   * })
   * class MyComponent implements OnInit, OnDestroy {
   *   ngOnInit() {
   *     console.log('ngOnInit');
   *   }
   *
   *   ngOnDestroy() {
   *     console.log('ngOnDestroy');
   *   }
   * }
   *
   * @Component({
   *   selector: 'app',
   *   template: `
   *     <button (click)="hasChild = !hasChild">
   *       {{hasChild ? 'Destroy' : 'Create'}} MyComponent
   *     </button>
   *     <my-cmp *ngIf="hasChild"></my-cmp>`,
   *   directives: [MyComponent, NgIf]
   * })
   * export class App {
   *   hasChild = true;
   * }
   *
   * bootstrap(App).catch(err => console.error(err));
   * ```
   *
   *
   * To create a stateful Pipe, you should implement this interface and set the `pure`
   * parameter to `false` in the {@link PipeMetadata}.
   *
   * A stateful pipe may produce different output, given the same input. It is
   * likely that a stateful pipe may contain state that should be cleaned up when
   * a binding is destroyed. For example, a subscription to a stream of data may need to
   * be disposed, or an interval may need to be cleared.
   *
   * ### Example ([live demo](http://plnkr.co/edit/i8pm5brO4sPaLxBx56MR?p=preview))
   *
   * In this example, a pipe is created to countdown its input value, updating it every
   * 50ms. Because it maintains an internal interval, it automatically clears
   * the interval when the binding is destroyed or the countdown completes.
   *
   * ```
   * import {OnDestroy, Pipe, PipeTransform} from 'angular2/core'
   * @Pipe({name: 'countdown', pure: false})
   * class CountDown implements PipeTransform, OnDestroy {
   *   remainingTime:Number;
   *   interval:SetInterval;
   *   ngOnDestroy() {
   *     if (this.interval) {
   *       clearInterval(this.interval);
   *     }
   *   }
   *   transform(value: any, args: any[] = []) {
   *     if (!parseInt(value, 10)) return null;
   *     if (typeof this.remainingTime !== 'number') {
   *       this.remainingTime = parseInt(value, 10);
   *     }
   *     if (!this.interval) {
   *       this.interval = setInterval(() => {
   *         this.remainingTime-=50;
   *         if (this.remainingTime <= 0) {
   *           this.remainingTime = 0;
   *           clearInterval(this.interval);
   *           delete this.interval;
   *         }
   *       }, 50);
   *     }
   *     return this.remainingTime;
   *   }
   * }
   * ```
   *
   * Invoking `{{ 10000 | countdown }}` would cause the value to be decremented by 50,
   * every 50ms, until it reaches 0.
   *
   */
  export interface OnDestroy {
    ngOnDestroy(): any;
  }
  /**
   * Implement this interface to get notified when your directive's content has been fully
   * initialized.
   *
   * ### Example ([live demo](http://plnkr.co/edit/plamXUpsLQbIXpViZhUO?p=preview))
   *
   * ```typescript
   * @Component({
   *   selector: 'child-cmp',
   *   template: `{{where}} child`
   * })
   * class ChildComponent {
   *   @Input() where: string;
   * }
   *
   * @Component({
   *   selector: 'parent-cmp',
   *   template: `<ng-content></ng-content>`
   * })
   * class ParentComponent implements AfterContentInit {
   *   @ContentChild(ChildComponent) contentChild: ChildComponent;
   *
   *   constructor() {
   *     // contentChild is not initialized yet
   *     console.log(this.getMessage(this.contentChild));
   *   }
   *
   *   ngAfterContentInit() {
   *     // contentChild is updated after the content has been checked
   *     console.log('AfterContentInit: ' + this.getMessage(this.contentChild));
   *   }
   *
   *   private getMessage(cmp: ChildComponent): string {
   *     return cmp ? cmp.where + ' child' : 'no child';
   *   }
   * }
   *
   * @Component({
   *   selector: 'app',
   *   template: `
   *     <parent-cmp>
   *       <child-cmp where="content"></child-cmp>
   *     </parent-cmp>`,
   *   directives: [ParentComponent, ChildComponent]
   * })
   * export class App {
   * }
   *
   * bootstrap(App).catch(err => console.error(err));
   * ```
   */
  export interface AfterContentInit {
    ngAfterContentInit(): any;
  }
  /**
   * Implement this interface to get notified after every check of your directive's content.
   *
   * ### Example ([live demo](http://plnkr.co/edit/tGdrytNEKQnecIPkD7NU?p=preview))
   *
   * ```typescript
   * @Component({selector: 'child-cmp', template: `{{where}} child`})
   * class ChildComponent {
   *   @Input() where: string;
   * }
   *
   * @Component({selector: 'parent-cmp', template: `<ng-content></ng-content>`})
   * class ParentComponent implements AfterContentChecked {
   *   @ContentChild(ChildComponent) contentChild: ChildComponent;
   *
   *   constructor() {
   *     // contentChild is not initialized yet
   *     console.log(this.getMessage(this.contentChild));
   *   }
   *
   *   ngAfterContentChecked() {
   *     // contentChild is updated after the content has been checked
   *     console.log('AfterContentChecked: ' + this.getMessage(this.contentChild));
   *   }
   *
   *   private getMessage(cmp: ChildComponent): string {
   *     return cmp ? cmp.where + ' child' : 'no child';
   *   }
   * }
   *
   * @Component({
   *   selector: 'app',
   *   template: `
   *     <parent-cmp>
   *       <button (click)="hasContent = !hasContent">Toggle content child</button>
   *       <child-cmp *ngIf="hasContent" where="content"></child-cmp>
   *     </parent-cmp>`,
   *   directives: [NgIf, ParentComponent, ChildComponent]
   * })
   * export class App {
   *   hasContent = true;
   * }
   *
   * bootstrap(App).catch(err => console.error(err));
   * ```
   */
  export interface AfterContentChecked {
    ngAfterContentChecked(): any;
  }
  /**
   * Implement this interface to get notified when your component's view has been fully initialized.
   *
   * ### Example ([live demo](http://plnkr.co/edit/LhTKVMEM0fkJgyp4CI1W?p=preview))
   *
   * ```typescript
   * @Component({selector: 'child-cmp', template: `{{where}} child`})
   * class ChildComponent {
   *   @Input() where: string;
   * }
   *
   * @Component({
   *   selector: 'parent-cmp',
   *   template: `<child-cmp where="view"></child-cmp>`,
   *   directives: [ChildComponent]
   * })
   * class ParentComponent implements AfterViewInit {
   *   @ViewChild(ChildComponent) viewChild: ChildComponent;
   *
   *   constructor() {
   *     // viewChild is not initialized yet
   *     console.log(this.getMessage(this.viewChild));
   *   }
   *
   *   ngAfterViewInit() {
   *     // viewChild is updated after the view has been initialized
   *     console.log('ngAfterViewInit: ' + this.getMessage(this.viewChild));
   *   }
   *
   *   private getMessage(cmp: ChildComponent): string {
   *     return cmp ? cmp.where + ' child' : 'no child';
   *   }
   * }
   *
   * @Component({
   *   selector: 'app',
   *   template: `<parent-cmp></parent-cmp>`,
   *   directives: [ParentComponent]
   * })
   * export class App {
   * }
   *
   * bootstrap(App).catch(err => console.error(err));
   * ```
   */
  export interface AfterViewInit {
    ngAfterViewInit(): any;
  }
  /**
   * Implement this interface to get notified after every check of your component's view.
   *
   * ### Example ([live demo](http://plnkr.co/edit/0qDGHcPQkc25CXhTNzKU?p=preview))
   *
   * ```typescript
   * @Component({selector: 'child-cmp', template: `{{where}} child`})
   * class ChildComponent {
   *   @Input() where: string;
   * }
   *
   * @Component({
   *   selector: 'parent-cmp',
   *   template: `
   *     <button (click)="showView = !showView">Toggle view child</button>
   *     <child-cmp *ngIf="showView" where="view"></child-cmp>`,
   *   directives: [NgIf, ChildComponent]
   * })
   * class ParentComponent implements AfterViewChecked {
   *   @ViewChild(ChildComponent) viewChild: ChildComponent;
   *   showView = true;
   *
   *   constructor() {
   *     // viewChild is not initialized yet
   *     console.log(this.getMessage(this.viewChild));
   *   }
   *
   *   ngAfterViewChecked() {
   *     // viewChild is updated after the view has been checked
   *     console.log('AfterViewChecked: ' + this.getMessage(this.viewChild));
   *   }
   *
   *   private getMessage(cmp: ChildComponent): string {
   *     return cmp ? cmp.where + ' child' : 'no child';
   *   }
   * }
   *
   * @Component({
   *   selector: 'app',
   *   template: `<parent-cmp></parent-cmp>`,
   *   directives: [ParentComponent]
   * })
   * export class App {
   * }
   *
   * bootstrap(App).catch(err => console.error(err));
   * ```
   */
  export interface AfterViewChecked {
    ngAfterViewChecked(): any;
  }
}
declare module "angular2/src/core/pipes/pipe_provider" {
  import { Type } from "angular2/src/facade/lang";
  import { ResolvedFactory, ResolvedProvider_ } from "angular2/src/core/di/provider";
  import { Key } from "angular2/src/core/di";
  import { PipeMetadata } from "angular2/src/core/metadata/directives";
  export class PipeProvider extends ResolvedProvider_ {
    name: string;
    pure: boolean;
    constructor(name: string, pure: boolean, key: Key, resolvedFactories: ResolvedFactory[], multiBinding: boolean);
    static createFromType(type: Type, metadata: PipeMetadata): PipeProvider;
  }
}
declare module "angular2/src/core/linker/directive_resolver" {
  import { Type } from "angular2/src/facade/lang";
  import { DirectiveMetadata } from "angular2/src/core/metadata";
  export class DirectiveResolver {
    /**
     * Return {@link DirectiveMetadata} for a given `Type`.
     */
    resolve(type: Type): DirectiveMetadata;
    private _mergeWithPropertyMetadata(dm, propertyMetadata, directiveType);
    private _merge(dm, inputs, outputs, host, queries, directiveType);
  }
  export var CODEGEN_DIRECTIVE_RESOLVER: DirectiveResolver;
}
declare module "angular2/src/core/linker/pipe_resolver" {
  import { Type } from "angular2/src/facade/lang";
  import { PipeMetadata } from "angular2/src/core/metadata";
  /**
   * Resolve a `Type` for {@link PipeMetadata}.
   *
   * This interface can be overridden by the application developer to create custom behavior.
   *
   * See {@link Compiler}
   */
  export class PipeResolver {
    /**
     * Return {@link PipeMetadata} for a given `Type`.
     */
    resolve(type: Type): PipeMetadata;
  }
  export var CODEGEN_PIPE_RESOLVER: PipeResolver;
}
declare module "angular2/src/core/linker/resolved_metadata_cache" {
  import { Type } from "angular2/src/facade/lang";
  import { DirectiveProvider } from "angular2/src/core/linker/element";
  import { DirectiveResolver } from "angular2/src/core/linker/directive_resolver";
  import { PipeProvider } from "angular2/src/core/pipes/pipe_provider";
  import { PipeResolver } from "angular2/src/core/linker/pipe_resolver";
  export class ResolvedMetadataCache {
    private _directiveResolver;
    private _pipeResolver;
    private _directiveCache;
    private _pipeCache;
    constructor(_directiveResolver: DirectiveResolver, _pipeResolver: PipeResolver);
    getResolvedDirectiveMetadata(type: Type): DirectiveProvider;
    getResolvedPipeMetadata(type: Type): PipeProvider;
  }
  export var CODEGEN_RESOLVED_METADATA_CACHE: ResolvedMetadataCache;
}
declare module "angular2/src/core/linker/element" {
  import { Type } from "angular2/src/facade/lang";
  import { Injector, Key, Dependency, ResolvedProvider } from "angular2/src/core/di";
  import { ProtoInjector, ProviderWithVisibility, DependencyProvider } from "angular2/src/core/di/injector";
  import { ResolvedProvider_ } from "angular2/src/core/di/provider";
  import { QueryMetadata } from "angular2/src/core/metadata/di";
  import { AppView } from "angular2/src/core/linker/view";
  import { ViewType } from "angular2/src/core/linker/view_type";
  import { ElementRef_ } from "angular2/src/core/linker/element_ref";
  import { ViewContainerRef } from "angular2/src/core/linker/view_container_ref";
  import { ElementRef } from "angular2/src/core/linker/element_ref";
  import { TemplateRef } from "angular2/src/core/linker/template_ref";
  import { DirectiveMetadata } from "angular2/src/core/metadata/directives";
  import { QueryList } from "angular2/src/core/linker/query_list";
  import { SetterFn } from "angular2/src/core/reflection/types";
  import { AfterViewChecked } from "angular2/src/core/linker/interfaces";
  import { ResolvedMetadataCache } from "angular2/src/core/linker/resolved_metadata_cache";
  export class StaticKeys {
    templateRefId: number;
    viewContainerId: number;
    changeDetectorRefId: number;
    elementRefId: number;
    rendererId: number;
    constructor();
    static instance(): StaticKeys;
  }
  export class DirectiveDependency extends Dependency {
    attributeName: string;
    queryDecorator: QueryMetadata;
    constructor(key: Key, optional: boolean, lowerBoundVisibility: Object, upperBoundVisibility: Object, properties: any[], attributeName: string, queryDecorator: QueryMetadata);
    /** @internal */
    _verify(): void;
    static createFrom(d: Dependency): DirectiveDependency;
    /** @internal */
    static _attributeName(properties: any[]): string;
    /** @internal */
    static _query(properties: any[]): QueryMetadata;
  }
  export class DirectiveProvider extends ResolvedProvider_ {
    isComponent: boolean;
    providers: ResolvedProvider[];
    viewProviders: ResolvedProvider[];
    queries: QueryMetadataWithSetter[];
    constructor(key: Key, factory: Function, deps: Dependency[], isComponent: boolean, providers: ResolvedProvider[], viewProviders: ResolvedProvider[], queries: QueryMetadataWithSetter[]);
    displayName: string;
    static createFromType(type: Type, meta: DirectiveMetadata): DirectiveProvider;
  }
  export class QueryMetadataWithSetter {
    setter: SetterFn;
    metadata: QueryMetadata;
    constructor(setter: SetterFn, metadata: QueryMetadata);
  }
  export class AppProtoElement {
    firstProviderIsComponent: boolean;
    index: number;
    attributes: {
      [key: string]: string;
    };
    protoQueryRefs: ProtoQueryRef[];
    directiveVariableBindings: {
      [key: string]: number;
    };
    protoInjector: ProtoInjector;
    static create(metadataCache: ResolvedMetadataCache, index: number, attributes: {
      [key: string]: string;
    }, directiveTypes: Type[], directiveVariableBindings: {
      [key: string]: number;
    }): AppProtoElement;
    constructor(firstProviderIsComponent: boolean, index: number, attributes: {
      [key: string]: string;
    }, pwvs: ProviderWithVisibility[], protoQueryRefs: ProtoQueryRef[], directiveVariableBindings: {
      [key: string]: number;
    });
    getProviderAtIndex(index: number): any;
  }
  export class InjectorWithHostBoundary {
    injector: Injector;
    hostInjectorBoundary: boolean;
    constructor(injector: Injector, hostInjectorBoundary: boolean);
  }
  export class AppElement implements DependencyProvider, ElementRef, AfterViewChecked {
    proto: AppProtoElement;
    parentView: AppView;
    parent: AppElement;
    nativeElement: any;
    embeddedViewFactory: Function;
    static getViewParentInjector(parentViewType: ViewType, containerAppElement: AppElement, imperativelyCreatedProviders: ResolvedProvider[], rootInjector: Injector): InjectorWithHostBoundary;
    nestedViews: AppView[];
    componentView: AppView;
    private _queryStrategy;
    private _injector;
    private _strategy;
    ref: ElementRef_;
    constructor(proto: AppProtoElement, parentView: AppView, parent: AppElement, nativeElement: any, embeddedViewFactory: Function);
    attachComponentView(componentView: AppView): void;
    private _debugContext();
    hasVariableBinding(name: string): boolean;
    getVariableBinding(name: string): any;
    get(token: any): any;
    hasDirective(type: Type): boolean;
    getComponent(): any;
    getInjector(): Injector;
    getElementRef(): ElementRef;
    getViewContainerRef(): ViewContainerRef;
    getTemplateRef(): TemplateRef;
    getDependency(injector: Injector, provider: ResolvedProvider, dep: Dependency): any;
    private _buildAttribute(dep);
    addDirectivesMatchingQuery(query: QueryMetadata, list: any[]): void;
    private _buildQueryStrategy();
    getDirectiveAtIndex(index: number): any;
    ngAfterViewChecked(): void;
    ngAfterContentChecked(): void;
    traverseAndSetQueriesAsDirty(): void;
    private _setQueriesAsDirty();
  }
  export class ProtoQueryRef {
    dirIndex: number;
    setter: SetterFn;
    query: QueryMetadata;
    constructor(dirIndex: number, setter: SetterFn, query: QueryMetadata);
    usesPropertySyntax: boolean;
  }
  export class QueryRef {
    protoQueryRef: ProtoQueryRef;
    private originator;
    list: QueryList<any>;
    dirty: boolean;
    constructor(protoQueryRef: ProtoQueryRef, originator: AppElement);
    isViewQuery: boolean;
    update(): void;
    private _update();
    private _visit(inj, aggregator);
    private _visitInjector(inj, aggregator);
    private _visitViewContainerViews(views, aggregator);
    private _visitView(view, aggregator);
    private _aggregateVariableBinding(inj, aggregator);
    private _aggregateDirective(inj, aggregator);
  }
}
declare module "angular2/src/core/pipes/pipes" {
  import { Injector } from "angular2/src/core/di";
  import { PipeProvider } from "angular2/src/core/pipes/pipe_provider";
  import * as cd from "angular2/src/core/change_detection/pipes";
  export class ProtoPipes {
    /**
    * Map of {@link PipeMetadata} names to {@link PipeMetadata} implementations.
    */
    config: {
      [key: string]: PipeProvider;
    };
    static fromProviders(providers: PipeProvider[]): ProtoPipes;
    constructor(
      /**
      * Map of {@link PipeMetadata} names to {@link PipeMetadata} implementations.
      */
      config: {
        [key: string]: PipeProvider;
      });
    get(name: string): PipeProvider;
  }
  export class Pipes implements cd.Pipes {
    proto: ProtoPipes;
    injector: Injector;
    /** @internal */
    _config: {
      [key: string]: cd.SelectedPipe;
    };
    constructor(proto: ProtoPipes, injector: Injector);
    get(name: string): cd.SelectedPipe;
  }
}
declare module "angular2/src/core/render/util" {
  export function camelCaseToDashCase(input: string): string;
  export function dashCaseToCamelCase(input: string): string;
}
declare module "angular2/src/core/linker/view_manager" {
  import { Injector, ResolvedProvider } from "angular2/src/core/di";
  import { AppView } from "angular2/src/core/linker/view";
  import { ElementRef } from "angular2/src/core/linker/element_ref";
  import { HostViewFactoryRef, EmbeddedViewRef, HostViewRef, ViewRef } from "angular2/src/core/linker/view_ref";
  import { ViewContainerRef } from "angular2/src/core/linker/view_container_ref";
  import { TemplateRef } from "angular2/src/core/linker/template_ref";
  import { RootRenderer, RenderComponentType } from "angular2/src/core/render/api";
  import { WtfScopeFn } from "angular2/src/core/profile/profile";
  import { ViewEncapsulation } from "angular2/src/core/metadata/view";
  /**
   * Service exposing low level API for creating, moving and destroying Views.
   *
   * Most applications should use higher-level abstractions like {@link DynamicComponentLoader} and
   * {@link ViewContainerRef} instead.
   */
  export abstract class AppViewManager {
    /**
     * Returns a {@link ViewContainerRef} of the View Container at the specified location.
     */
    abstract getViewContainer(location: ElementRef): ViewContainerRef;
    /**
     * Returns the {@link ElementRef} that makes up the specified Host View.
     */
    abstract getHostElement(hostViewRef: HostViewRef): ElementRef;
    /**
     * Searches the Component View of the Component specified via `hostLocation` and returns the
     * {@link ElementRef} for the Element identified via a Variable Name `variableName`.
     *
     * Throws an exception if the specified `hostLocation` is not a Host Element of a Component, or if
     * variable `variableName` couldn't be found in the Component View of this Component.
     */
    abstract getNamedElementInComponentView(hostLocation: ElementRef, variableName: string): ElementRef;
    /**
     * Returns the component instance for the provided Host Element.
     */
    abstract getComponent(hostLocation: ElementRef): any;
    /**
     * Creates an instance of a Component and attaches it to the first element in the global View
     * (usually DOM Document) that matches the component's selector or `overrideSelector`.
     *
     * This as a low-level way to bootstrap an application and upgrade an existing Element to a
     * Host Element. Most applications should use {@link DynamicComponentLoader#loadAsRoot} instead.
     *
     * The Component and its View are created based on the `hostProtoComponentRef` which can be
     * obtained
     * by compiling the component with {@link Compiler#compileInHost}.
     *
     * Use {@link AppViewManager#destroyRootHostView} to destroy the created Component and it's Host
     * View.
     *
     * ### Example
     *
     * ```
     * @ng.Component({
     *   selector: 'child-component'
     * })
     * @ng.View({
     *   template: 'Child'
     * })
     * class ChildComponent {
     *
     * }
     *
     * @ng.Component({
     *   selector: 'my-app'
     * })
     * @ng.View({
     *   template: `
     *     Parent (<some-component></some-component>)
     *   `
     * })
     * class MyApp implements OnDestroy {
     *   viewRef: ng.ViewRef;
     *
     *   constructor(public appViewManager: ng.AppViewManager, compiler: ng.Compiler) {
     *     compiler.compileInHost(ChildComponent).then((protoView: ng.ProtoComponentRef) => {
     *       this.viewRef = appViewManager.createRootHostView(protoView, 'some-component', null);
     *     })
     *   }
     *
     *   ngOnDestroy() {
     *     this.appViewManager.destroyRootHostView(this.viewRef);
     *     this.viewRef = null;
     *   }
     * }
     *
     * ng.bootstrap(MyApp);
     * ```
     */
    abstract createRootHostView(hostViewFactoryRef: HostViewFactoryRef, overrideSelector: string, injector: Injector, projectableNodes?: any[][]): HostViewRef;
    /**
     * Destroys the Host View created via {@link AppViewManager#createRootHostView}.
     *
     * Along with the Host View, the Component Instance as well as all nested View and Components are
     * destroyed as well.
     */
    abstract destroyRootHostView(hostViewRef: HostViewRef): any;
    /**
     * Instantiates an Embedded View based on the {@link TemplateRef `templateRef`} and inserts it
     * into the View Container specified via `viewContainerLocation` at the specified `index`.
     *
     * Returns the {@link ViewRef} for the newly created View.
     *
     * This as a low-level way to create and attach an Embedded via to a View Container. Most
     * applications should used {@link ViewContainerRef#createEmbeddedView} instead.
     *
     * Use {@link AppViewManager#destroyViewInContainer} to destroy the created Embedded View.
     */
    abstract createEmbeddedViewInContainer(viewContainerLocation: ElementRef, index: number, templateRef: TemplateRef): EmbeddedViewRef;
    /**
     * Instantiates a single {@link Component} and inserts its Host View into the View Container
     * found at `viewContainerLocation`. Within the container, the view will be inserted at position
     * specified via `index`.
     *
     * The component is instantiated using its {@link ProtoViewRef `protoViewRef`} which can be
     * obtained via {@link Compiler#compileInHost}.
     *
     * You can optionally specify `dynamicallyCreatedProviders`, which configure the {@link Injector}
     * that will be created for the Host View.
     *
     * Returns the {@link HostViewRef} of the Host View created for the newly instantiated Component.
     *
     * Use {@link AppViewManager#destroyViewInContainer} to destroy the created Host View.
     */
    abstract createHostViewInContainer(viewContainerLocation: ElementRef, index: number, hostViewFactoryRef: HostViewFactoryRef, dynamicallyCreatedProviders: ResolvedProvider[], projectableNodes: any[][]): HostViewRef;
    /**
     * Destroys an Embedded or Host View attached to a View Container at the specified `index`.
     *
     * The View Container is located via `viewContainerLocation`.
     */
    abstract destroyViewInContainer(viewContainerLocation: ElementRef, index: number): any;
    /**
     *
     * See {@link AppViewManager#detachViewInContainer}.
     */
    abstract attachViewInContainer(viewContainerLocation: ElementRef, index: number, viewRef: EmbeddedViewRef): EmbeddedViewRef;
    /**
     * See {@link AppViewManager#attachViewInContainer}.
     */
    abstract detachViewInContainer(viewContainerLocation: ElementRef, index: number): EmbeddedViewRef;
  }
  export class AppViewManager_ extends AppViewManager {
    private _renderer;
    private _appId;
    private _nextCompTypeId;
    constructor(_renderer: RootRenderer, _appId: string);
    getViewContainer(location: ElementRef): ViewContainerRef;
    getHostElement(hostViewRef: ViewRef): ElementRef;
    getNamedElementInComponentView(hostLocation: ElementRef, variableName: string): ElementRef;
    getComponent(hostLocation: ElementRef): any;
    /** @internal */
    _createRootHostViewScope: WtfScopeFn;
    createRootHostView(hostViewFactoryRef: HostViewFactoryRef, overrideSelector: string, injector: Injector, projectableNodes?: any[][]): HostViewRef;
    /** @internal */
    _destroyRootHostViewScope: WtfScopeFn;
    destroyRootHostView(hostViewRef: ViewRef): void;
    /** @internal */
    _createEmbeddedViewInContainerScope: WtfScopeFn;
    createEmbeddedViewInContainer(viewContainerLocation: ElementRef, index: number, templateRef: TemplateRef): EmbeddedViewRef;
    /** @internal */
    _createHostViewInContainerScope: WtfScopeFn;
    createHostViewInContainer(viewContainerLocation: ElementRef, index: number, hostViewFactoryRef: HostViewFactoryRef, dynamicallyCreatedProviders: ResolvedProvider[], projectableNodes: any[][]): HostViewRef;
    /** @internal */
    _destroyViewInContainerScope: WtfScopeFn;
    destroyViewInContainer(viewContainerLocation: ElementRef, index: number): void;
    /** @internal */
    _attachViewInContainerScope: WtfScopeFn;
    attachViewInContainer(viewContainerLocation: ElementRef, index: number, viewRef: ViewRef): EmbeddedViewRef;
    /** @internal */
    _detachViewInContainerScope: WtfScopeFn;
    detachViewInContainer(viewContainerLocation: ElementRef, index: number): EmbeddedViewRef;
    /** @internal */
    onViewCreated(view: AppView): void;
    /** @internal */
    onViewDestroyed(view: AppView): void;
    /** @internal */
    createRenderComponentType(encapsulation: ViewEncapsulation, styles: Array<string | any[]>): RenderComponentType;
    private _attachViewToContainer(view, vcAppElement, viewIndex);
    private _detachViewInContainer(vcAppElement, viewIndex);
  }
}
declare module "angular2/src/core/linker/view" {
  import { ChangeDetector, ChangeDispatcher, DirectiveIndex, BindingTarget, Locals, ChangeDetectorRef } from "angular2/src/core/change_detection/change_detection";
  import { ResolvedProvider, Injector } from "angular2/src/core/di";
  import { DebugContext } from "angular2/src/core/change_detection/interfaces";
  import { AppElement } from "angular2/src/core/linker/element";
  import { Type } from "angular2/src/facade/lang";
  import { Renderer } from "angular2/src/core/render/api";
  import { ViewRef_ } from "angular2/src/core/linker/view_ref";
  import { ProtoPipes } from "angular2/src/core/pipes/pipes";
  export { DebugContext } from "angular2/src/core/change_detection/interfaces";
  import { Pipes } from "angular2/src/core/pipes/pipes";
  import { AppViewManager_ } from "angular2/src/core/linker/view_manager";
  import { ResolvedMetadataCache } from "angular2/src/core/linker/resolved_metadata_cache";
  import { ViewType } from "angular2/src/core/linker/view_type";
  /**
   * Cost of making objects: http://jsperf.com/instantiate-size-of-object
   *
   */
  export class AppView implements ChangeDispatcher {
    proto: AppProtoView;
    renderer: Renderer;
    viewManager: AppViewManager_;
    projectableNodes: Array<any | any[]>;
    containerAppElement: AppElement;
    changeDetector: ChangeDetector;
    ref: ViewRef_;
    rootNodesOrAppElements: any[];
    allNodes: any[];
    disposables: Function[];
    appElements: AppElement[];
    /**
     * The context against which data-binding expressions in this view are evaluated against.
     * This is always a component instance.
     */
    context: any;
    /**
     * Variables, local to this view, that can be used in binding expressions (in addition to the
     * context). This is used for thing like `<video #player>` or
     * `<li template="for #item of items">`, where "player" and "item" are locals, respectively.
     */
    locals: Locals;
    pipes: Pipes;
    parentInjector: Injector;
    /**
     * Whether root injectors of this view
     * have a hostBoundary.
     */
    hostInjectorBoundary: boolean;
    destroyed: boolean;
    constructor(proto: AppProtoView, renderer: Renderer, viewManager: AppViewManager_, projectableNodes: Array<any | any[]>, containerAppElement: AppElement, imperativelyCreatedProviders: ResolvedProvider[], rootInjector: Injector, changeDetector: ChangeDetector);
    init(rootNodesOrAppElements: any[], allNodes: any[], disposables: Function[], appElements: AppElement[]): void;
    destroy(): void;
    notifyOnDestroy(): void;
    changeDetectorRef: ChangeDetectorRef;
    flatRootNodes: any[];
    hasLocal(contextName: string): boolean;
    setLocal(contextName: string, value: any): void;
    notifyOnBinding(b: BindingTarget, currentValue: any): void;
    logBindingUpdate(b: BindingTarget, value: any): void;
    notifyAfterContentChecked(): void;
    notifyAfterViewChecked(): void;
    getDebugContext(appElement: AppElement, elementIndex: number, directiveIndex: number): DebugContext;
    getDirectiveFor(directive: DirectiveIndex): any;
    getDetectorFor(directive: DirectiveIndex): ChangeDetector;
    /**
     * Triggers the event handlers for the element and the directives.
     *
     * This method is intended to be called from directive EventEmitters.
     *
     * @param {string} eventName
     * @param {*} eventObj
     * @param {number} boundElementIndex
     * @return false if preventDefault must be applied to the DOM event
     */
    triggerEventHandlers(eventName: string, eventObj: Event, boundElementIndex: number): boolean;
  }
  /**
   *
   */
  export class AppProtoView {
    type: ViewType;
    protoPipes: ProtoPipes;
    templateVariableBindings: {
      [key: string]: string;
    };
    static create(metadataCache: ResolvedMetadataCache, type: ViewType, pipes: Type[], templateVariableBindings: {
      [key: string]: string;
    }): AppProtoView;
    constructor(type: ViewType, protoPipes: ProtoPipes, templateVariableBindings: {
      [key: string]: string;
    });
  }
  export class HostViewFactory {
    selector: string;
    viewFactory: Function;
    constructor(selector: string, viewFactory: Function);
  }
  export function flattenNestedViewRenderNodes(nodes: any[]): any[];
  export function findLastRenderNode(node: any): any;
  export function checkSlotCount(componentName: string, expectedSlotCount: number, projectableNodes: any[][]): void;
}
declare module "angular2/src/core/linker/view_ref" {
  import { ChangeDetectorRef } from "angular2/src/core/change_detection/change_detector_ref";
  import { AppView, HostViewFactory } from "angular2/src/core/linker/view";
  export abstract class ViewRef {
    /**
     * @internal
     */
    changeDetectorRef: ChangeDetectorRef;
    destroyed: boolean;
  }
  /**
   * Represents a View containing a single Element that is the Host Element of a {@link Component}
   * instance.
   *
   * A Host View is created for every dynamically created Component that was compiled on its own (as
   * opposed to as a part of another Component's Template) via {@link Compiler#compileInHost} or one
   * of the higher-level APIs: {@link AppViewManager#createRootHostView},
   * {@link AppViewManager#createHostViewInContainer}, {@link ViewContainerRef#createHostView}.
   */
  export abstract class HostViewRef extends ViewRef {
    rootNodes: any[];
  }
  /**
   * Represents an Angular View.
   *
   * <!-- TODO: move the next two paragraphs to the dev guide -->
   * A View is a fundamental building block of the application UI. It is the smallest grouping of
   * Elements which are created and destroyed together.
   *
   * Properties of elements in a View can change, but the structure (number and order) of elements in
   * a View cannot. Changing the structure of Elements can only be done by inserting, moving or
   * removing nested Views via a {@link ViewContainerRef}. Each View can contain many View Containers.
   * <!-- /TODO -->
   *
   * ### Example
   *
   * Given this template...
   *
   * ```
   * Count: {{items.length}}
   * <ul>
   *   <li *ngFor="var item of items">{{item}}</li>
   * </ul>
   * ```
   *
   * ... we have two {@link ProtoViewRef}s:
   *
   * Outer {@link ProtoViewRef}:
   * ```
   * Count: {{items.length}}
   * <ul>
   *   <template ngFor var-item [ngForOf]="items"></template>
   * </ul>
   * ```
   *
   * Inner {@link ProtoViewRef}:
   * ```
   *   <li>{{item}}</li>
   * ```
   *
   * Notice that the original template is broken down into two separate {@link ProtoViewRef}s.
   *
   * The outer/inner {@link ProtoViewRef}s are then assembled into views like so:
   *
   * ```
   * <!-- ViewRef: outer-0 -->
   * Count: 2
   * <ul>
   *   <template view-container-ref></template>
   *   <!-- ViewRef: inner-1 --><li>first</li><!-- /ViewRef: inner-1 -->
   *   <!-- ViewRef: inner-2 --><li>second</li><!-- /ViewRef: inner-2 -->
   * </ul>
   * <!-- /ViewRef: outer-0 -->
   * ```
   */
  export abstract class EmbeddedViewRef extends ViewRef {
    /**
     * Sets `value` of local variable called `variableName` in this View.
     */
    abstract setLocal(variableName: string, value: any): void;
    /**
     * Checks whether this view has a local variable called `variableName`.
     */
    abstract hasLocal(variableName: string): boolean;
    rootNodes: any[];
  }
  export class ViewRef_ implements EmbeddedViewRef, HostViewRef {
    private _view;
    constructor(_view: AppView);
    internalView: AppView;
    /**
     * Return `ChangeDetectorRef`
     */
    changeDetectorRef: ChangeDetectorRef;
    rootNodes: any[];
    setLocal(variableName: string, value: any): void;
    hasLocal(variableName: string): boolean;
    destroyed: boolean;
  }
  export abstract class HostViewFactoryRef {
  }
  export class HostViewFactoryRef_ implements HostViewFactoryRef {
    private _hostViewFactory;
    constructor(_hostViewFactory: HostViewFactory);
    internalHostViewFactory: HostViewFactory;
  }
}
declare module "angular2/src/core/linker/compiler" {
  import { HostViewFactoryRef } from "angular2/src/core/linker/view_ref";
  import { Type } from "angular2/src/facade/lang";
  import { HostViewFactoryRef_ } from "angular2/src/core/linker/view_ref";
  /**
   * Low-level service for compiling {@link Component}s into {@link ProtoViewRef ProtoViews}s, which
   * can later be used to create and render a Component instance.
   *
   * Most applications should instead use higher-level {@link DynamicComponentLoader} service, which
   * both compiles and instantiates a Component.
   */
  export abstract class Compiler {
    abstract compileInHost(componentType: Type): Promise<HostViewFactoryRef>;
    abstract clearCache(): any;
  }
  export class Compiler_ extends Compiler {
    compileInHost(componentType: Type): Promise<HostViewFactoryRef_>;
    clearCache(): void;
  }
}
declare module "angular2/src/core/linker/dynamic_component_loader" {
  import { Injector, ResolvedProvider } from "angular2/src/core/di";
  import { Compiler } from "angular2/src/core/linker/compiler";
  import { Type } from "angular2/src/facade/lang";
  import { AppViewManager } from "angular2/src/core/linker/view_manager";
  import { ElementRef } from "angular2/src/core/linker/element_ref";
  import { HostViewRef } from "angular2/src/core/linker/view_ref";
  /**
   * Represents an instance of a Component created via {@link DynamicComponentLoader}.
   *
   * `ComponentRef` provides access to the Component Instance as well other objects related to this
   * Component Instance and allows you to destroy the Component Instance via the {@link #dispose}
   * method.
   */
  export abstract class ComponentRef {
    /**
     * The injector provided {@link DynamicComponentLoader#loadAsRoot}.
     *
     * TODO(i): this api is useless and should be replaced by an injector retrieved from
     *     the HostElementRef, which is currently not possible.
     */
    injector: Injector;
    /**
     * Location of the Host Element of this Component Instance.
     */
    location: ElementRef;
    /**
     * The instance of the Component.
     */
    instance: any;
    /**
     * The user defined component type, represented via the constructor function.
     *
     * <!-- TODO: customize wording for Dart docs -->
     */
    componentType: Type;
    /**
     * The {@link ViewRef} of the Host View of this Component instance.
     */
    hostView: HostViewRef;
    /**
     * @internal
     *
     * The instance of the component.
     *
     * TODO(i): this api should be removed
     */
    hostComponent: any;
    /**
     * Destroys the component instance and all of the data structures associated with it.
     *
     * TODO(i): rename to destroy to be consistent with AppViewManager and ViewContainerRef
     */
    abstract dispose(): any;
  }
  export class ComponentRef_ extends ComponentRef {
    private _dispose;
    /**
     * TODO(i): refactor into public/private fields
     */
    constructor(location: ElementRef, instance: any, componentType: Type, injector: Injector, _dispose: () => void);
    /**
     * @internal
     *
     * Returns the type of this Component instance.
     *
     * TODO(i): this api should be removed
     */
    hostComponentType: Type;
    dispose(): void;
  }
  /**
   * Service for instantiating a Component and attaching it to a View at a specified location.
   */
  export abstract class DynamicComponentLoader {
    /**
     * Creates an instance of a Component `type` and attaches it to the first element in the
     * platform-specific global view that matches the component's selector.
     *
     * In a browser the platform-specific global view is the main DOM Document.
     *
     * If needed, the component's selector can be overridden via `overrideSelector`.
     *
     * You can optionally provide `injector` and this {@link Injector} will be used to instantiate the
     * Component.
     *
     * To be notified when this Component instance is destroyed, you can also optionally provide
     * `onDispose` callback.
     *
     * Returns a promise for the {@link ComponentRef} representing the newly created Component.
     *
     * ### Example
     *
     * ```
     * @Component({
     *   selector: 'child-component',
     *   template: 'Child'
     * })
     * class ChildComponent {
     * }
     *
     * @Component({
     *   selector: 'my-app',
     *   template: 'Parent (<child id="child"></child>)'
     * })
     * class MyApp {
     *   constructor(dcl: DynamicComponentLoader, injector: Injector) {
     *     dcl.loadAsRoot(ChildComponent, '#child', injector);
     *   }
     * }
     *
     * bootstrap(MyApp);
     * ```
     *
     * Resulting DOM:
     *
     * ```
     * <my-app>
     *   Parent (
     *     <child id="child">Child</child>
     *   )
     * </my-app>
     * ```
     */
    abstract loadAsRoot(type: Type, overrideSelector: string, injector: Injector, onDispose?: () => void, projectableNodes?: any[][]): Promise<ComponentRef>;
    /**
     * Creates an instance of a Component and attaches it to a View Container located inside of the
     * Component View of another Component instance.
     *
     * The targeted Component Instance is specified via its `hostLocation` {@link ElementRef}. The
     * location within the Component View of this Component Instance is specified via `anchorName`
     * Template Variable Name.
     *
     * You can optionally provide `providers` to configure the {@link Injector} provisioned for this
     * Component Instance.
     *
     * Returns a promise for the {@link ComponentRef} representing the newly created Component.
     *
     * ### Example
     *
     * ```
     * @Component({
     *   selector: 'child-component',
     *   template: 'Child'
     * })
     * class ChildComponent {
     * }
     *
     * @Component({
     *   selector: 'my-app',
     *   template: 'Parent (<div #child></div>)'
     * })
     * class MyApp {
     *   constructor(dcl: DynamicComponentLoader, elementRef: ElementRef) {
     *     dcl.loadIntoLocation(ChildComponent, elementRef, 'child');
     *   }
     * }
     *
     * bootstrap(MyApp);
     * ```
     *
     * Resulting DOM:
     *
     * ```
     * <my-app>
     *    Parent (
     *      <div #child="" class="ng-binding"></div>
     *      <child-component class="ng-binding">Child</child-component>
     *    )
     * </my-app>
     * ```
     */
    abstract loadIntoLocation(type: Type, hostLocation: ElementRef, anchorName: string, providers?: ResolvedProvider[], projectableNodes?: any[][]): Promise<ComponentRef>;
    /**
     * Creates an instance of a Component and attaches it to the View Container found at the
     * `location` specified as {@link ElementRef}.
     *
     * You can optionally provide `providers` to configure the {@link Injector} provisioned for this
     * Component Instance.
     *
     * Returns a promise for the {@link ComponentRef} representing the newly created Component.
     *
     *
     * ### Example
     *
     * ```
     * @Component({
     *   selector: 'child-component',
     *   template: 'Child'
     * })
     * class ChildComponent {
     * }
     *
     * @Component({
     *   selector: 'my-app',
     *   template: 'Parent'
     * })
     * class MyApp {
     *   constructor(dcl: DynamicComponentLoader, elementRef: ElementRef) {
     *     dcl.loadNextToLocation(ChildComponent, elementRef);
     *   }
     * }
     *
     * bootstrap(MyApp);
     * ```
     *
     * Resulting DOM:
     *
     * ```
     * <my-app>Parent</my-app>
     * <child-component>Child</child-component>
     * ```
     */
    abstract loadNextToLocation(type: Type, location: ElementRef, providers?: ResolvedProvider[], projectableNodes?: any[][]): Promise<ComponentRef>;
  }
  export class DynamicComponentLoader_ extends DynamicComponentLoader {
    private _compiler;
    private _viewManager;
    constructor(_compiler: Compiler, _viewManager: AppViewManager);
    loadAsRoot(type: Type, overrideSelector: string, injector: Injector, onDispose?: () => void, projectableNodes?: any[][]): Promise<ComponentRef>;
    loadIntoLocation(type: Type, hostLocation: ElementRef, anchorName: string, providers?: ResolvedProvider[], projectableNodes?: any[][]): Promise<ComponentRef>;
    loadNextToLocation(type: Type, location: ElementRef, providers?: ResolvedProvider[], projectableNodes?: any[][]): Promise<ComponentRef>;
  }
}
declare module "angular2/src/core/console" {
  export class Console {
    log(message: string): void;
  }
}
declare module "angular2/src/core/application_ref" {
  import { NgZone } from "angular2/src/core/zone/ng_zone";
  import { Type } from "angular2/src/facade/lang";
  import { Provider, Injector } from "angular2/src/core/di";
  import { ComponentRef } from "angular2/src/core/linker/dynamic_component_loader";
  import { WtfScopeFn } from "angular2/src/core/profile/profile";
  import { ChangeDetectorRef } from "angular2/src/core/change_detection/change_detector_ref";
  /**
   * Create an Angular zone.
   */
  export function createNgZone(): NgZone;
  /**
   * Initialize the Angular 'platform' on the page.
   *
   * See {@link PlatformRef} for details on the Angular platform.
   *
   * It is also possible to specify providers to be made in the new platform. These providers
   * will be shared between all applications on the page. For example, an abstraction for
   * the browser cookie jar should be bound at the platform level, because there is only one
   * cookie jar regardless of how many applications on the page will be accessing it.
   *
   * The platform function can be called multiple times as long as the same list of providers
   * is passed into each call. If the platform function is called with a different set of
   * provides, Angular will throw an exception.
   */
  export function platform(providers?: Array<Type | Provider | any[]>): PlatformRef;
  /**
   * Dispose the existing platform.
   */
  export function disposePlatform(): void;
  /**
   * The Angular platform is the entry point for Angular on a web page. Each page
   * has exactly one platform, and services (such as reflection) which are common
   * to every Angular application running on the page are bound in its scope.
   *
   * A page's platform is initialized implicitly when {@link bootstrap}() is called, or
   * explicitly by calling {@link platform}().
   */
  export abstract class PlatformRef {
    /**
     * Register a listener to be called when the platform is disposed.
     */
    abstract registerDisposeListener(dispose: () => void): void;
    /**
     * Retrieve the platform {@link Injector}, which is the parent injector for
     * every Angular application on the page and provides singleton providers.
     */
    injector: Injector;
    /**
     * Instantiate a new Angular application on the page.
     *
     * ### What is an application?
     *
     * Each Angular application has its own zone, change detection, compiler,
     * renderer, and other framework components. An application hosts one or more
     * root components, which can be initialized via `ApplicationRef.bootstrap()`.
     *
     * ### Application Providers
     *
     * Angular applications require numerous providers to be properly instantiated.
     * When using `application()` to create a new app on the page, these providers
     * must be provided. Fortunately, there are helper functions to configure
     * typical providers, as shown in the example below.
     *
     * ### Example
     *
     * {@example core/ts/platform/platform.ts region='longform'}
     * ### See Also
     *
     * See the {@link bootstrap} documentation for more details.
     */
    abstract application(providers: Array<Type | Provider | any[]>): ApplicationRef;
    /**
     * Instantiate a new Angular application on the page, using providers which
     * are only available asynchronously. One such use case is to initialize an
     * application running in a web worker.
     *
     * ### Usage
     *
     * `bindingFn` is a function that will be called in the new application's zone.
     * It should return a `Promise` to a list of providers to be used for the
     * new application. Once this promise resolves, the application will be
     * constructed in the same manner as a normal `application()`.
     */
    abstract asyncApplication(bindingFn: (zone: NgZone) => Promise<Array<Type | Provider | any[]>>, providers?: Array<Type | Provider | any[]>): Promise<ApplicationRef>;
    /**
     * Destroy the Angular platform and all Angular applications on the page.
     */
    abstract dispose(): void;
  }
  export class PlatformRef_ extends PlatformRef {
    private _injector;
    private _dispose;
    /** @internal */
    _applications: ApplicationRef[];
    /** @internal */
    _disposeListeners: Function[];
    constructor(_injector: Injector, _dispose: () => void);
    registerDisposeListener(dispose: () => void): void;
    injector: Injector;
    application(providers: Array<Type | Provider | any[]>): ApplicationRef;
    asyncApplication(bindingFn: (zone: NgZone) => Promise<Array<Type | Provider | any[]>>, additionalProviders?: Array<Type | Provider | any[]>): Promise<ApplicationRef>;
    private _initApp(zone, providers);
    dispose(): void;
    /** @internal */
    _applicationDisposed(app: ApplicationRef): void;
  }
  /**
   * A reference to an Angular application running on a page.
   *
   * For more about Angular applications, see the documentation for {@link bootstrap}.
   */
  export abstract class ApplicationRef {
    /**
     * Register a listener to be called each time `bootstrap()` is called to bootstrap
     * a new root component.
     */
    abstract registerBootstrapListener(listener: (ref: ComponentRef) => void): void;
    /**
     * Register a listener to be called when the application is disposed.
     */
    abstract registerDisposeListener(dispose: () => void): void;
    /**
     * Bootstrap a new component at the root level of the application.
     *
     * ### Bootstrap process
     *
     * When bootstrapping a new root component into an application, Angular mounts the
     * specified application component onto DOM elements identified by the [componentType]'s
     * selector and kicks off automatic change detection to finish initializing the component.
     *
     * ### Optional Providers
     *
     * Providers for the given component can optionally be overridden via the `providers`
     * parameter. These providers will only apply for the root component being added and any
     * child components under it.
     *
     * ### Example
     * {@example core/ts/platform/platform.ts region='longform'}
     */
    abstract bootstrap(componentType: Type, providers?: Array<Type | Provider | any[]>): Promise<ComponentRef>;
    /**
     * Retrieve the application {@link Injector}.
     */
    injector: Injector;
    /**
     * Retrieve the application {@link NgZone}.
     */
    zone: NgZone;
    /**
     * Dispose of this application and all of its components.
     */
    abstract dispose(): void;
    /**
     * Invoke this method to explicitly process change detection and its side-effects.
     *
     * In development mode, `tick()` also performs a second change detection cycle to ensure that no
     * further changes are detected. If additional changes are picked up during this second cycle,
     * bindings in the app have side-effects that cannot be resolved in a single change detection
     * pass.
     * In this case, Angular throws an error, since an Angular application can only have one change
     * detection pass during which all change detection must complete.
     */
    abstract tick(): void;
    /**
     * Get a list of component types registered to this application.
     */
    componentTypes: Type[];
  }
  export class ApplicationRef_ extends ApplicationRef {
    private _platform;
    private _zone;
    private _injector;
    /** @internal */
    static _tickScope: WtfScopeFn;
    /** @internal */
    private _bootstrapListeners;
    /** @internal */
    private _disposeListeners;
    /** @internal */
    private _rootComponents;
    /** @internal */
    private _rootComponentTypes;
    /** @internal */
    private _changeDetectorRefs;
    /** @internal */
    private _runningTick;
    /** @internal */
    private _enforceNoNewChanges;
    constructor(_platform: PlatformRef_, _zone: NgZone, _injector: Injector);
    registerBootstrapListener(listener: (ref: ComponentRef) => void): void;
    registerDisposeListener(dispose: () => void): void;
    registerChangeDetector(changeDetector: ChangeDetectorRef): void;
    unregisterChangeDetector(changeDetector: ChangeDetectorRef): void;
    bootstrap(componentType: Type, providers?: Array<Type | Provider | any[]>): Promise<ComponentRef>;
    /** @internal */
    _loadComponent(componentRef: ComponentRef): void;
    /** @internal */
    _unloadComponent(componentRef: ComponentRef): void;
    injector: Injector;
    zone: NgZone;
    tick(): void;
    dispose(): void;
    componentTypes: Type[];
  }
}
declare module "angular2/src/core/zone" {
  export { NgZone, ZeroArgFunction, ErrorHandlingFn, NgZoneError } from "angular2/src/core/zone/ng_zone";
}
declare module "angular2/src/core/render" {
  export { RootRenderer, Renderer, RenderComponentType } from "angular2/src/core/render/api";
}
declare module "angular2/src/core/linker/view_resolver" {
  import { ViewMetadata } from "angular2/src/core/metadata/view";
  import { Type } from "angular2/src/facade/lang";
  /**
   * Resolves types to {@link ViewMetadata}.
   */
  export class ViewResolver {
    /** @internal */
    _cache: Map<Type, ViewMetadata>;
    resolve(component: Type): ViewMetadata;
    /** @internal */
    _resolve(component: Type): ViewMetadata;
    /** @internal */
    _throwMixingViewAndComponent(propertyName: string, component: Type): void;
  }
}
declare module "angular2/src/core/linker" {
  export { AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnChanges, OnDestroy, OnInit, DoCheck } from "angular2/src/core/linker/interfaces";
  export { DirectiveResolver } from "angular2/src/core/linker/directive_resolver";
  export { ViewResolver } from "angular2/src/core/linker/view_resolver";
  export { Compiler } from "angular2/src/core/linker/compiler";
  export { AppViewManager } from "angular2/src/core/linker/view_manager";
  export { QueryList } from "angular2/src/core/linker/query_list";
  export { DynamicComponentLoader } from "angular2/src/core/linker/dynamic_component_loader";
  export { ElementRef } from "angular2/src/core/linker/element_ref";
  export { TemplateRef } from "angular2/src/core/linker/template_ref";
  export { EmbeddedViewRef, HostViewRef, ViewRef, HostViewFactoryRef } from "angular2/src/core/linker/view_ref";
  export { ViewContainerRef } from "angular2/src/core/linker/view_container_ref";
  export { ComponentRef } from "angular2/src/core/linker/dynamic_component_loader";
}
declare module "angular2/src/core/debug/debug_node" {
  import { Predicate } from "angular2/src/facade/collection";
  import { Injector } from "angular2/src/core/di";
  import { RenderDebugInfo } from "angular2/src/core/render/api";
  export class EventListener {
    name: string;
    callback: Function;
    constructor(name: string, callback: Function);
  }
  export class DebugNode {
    nativeNode: any;
    listeners: EventListener[];
    parent: DebugElement;
    providerTokens: any[];
    locals: Map<string, any>;
    injector: Injector;
    componentInstance: any;
    constructor(nativeNode: any, parent: DebugNode);
    setDebugInfo(info: RenderDebugInfo): void;
    inject(token: any): any;
    getLocal(name: string): any;
  }
  export class DebugElement extends DebugNode {
    name: string;
    properties: Map<string, any>;
    attributes: Map<string, any>;
    childNodes: DebugNode[];
    nativeElement: any;
    constructor(nativeNode: any, parent: any);
    addChild(child: DebugNode): void;
    removeChild(child: DebugNode): void;
    insertChildrenAfter(child: DebugNode, newChildren: DebugNode[]): void;
    query(predicate: Predicate<DebugElement>): DebugElement;
    queryAll(predicate: Predicate<DebugElement>): DebugElement[];
    queryAllNodes(predicate: Predicate<DebugNode>): DebugNode[];
    children: DebugElement[];
    triggerEventHandler(eventName: string, eventObj: Event): void;
  }
  export function asNativeElements(debugEls: DebugElement[]): any;
  export function getDebugNode(nativeNode: any): DebugNode;
  export function getAllDebugNodes(): DebugNode[];
  export function indexDebugNode(node: DebugNode): void;
  export function removeDebugNodeFromIndex(node: DebugNode): void;
}
declare module "angular2/src/core/platform_directives_and_pipes" {
  import { OpaqueToken } from "angular2/src/core/di";
  /**
   * A token that can be provided when bootstraping an application to make an array of directives
   * available in every component of the application.
   *
   * ### Example
   *
   * ```typescript
   * import {PLATFORM_DIRECTIVES} from 'angular2/core';
   * import {OtherDirective} from './myDirectives';
   *
   * @Component({
   *   selector: 'my-component',
   *   template: `
   *     <!-- can use other directive even though the component does not list it in `directives` -->
   *     <other-directive></other-directive>
   *   `
   * })
   * export class MyComponent {
   *   ...
   * }
   *
   * bootstrap(MyComponent, [provide(PLATFORM_DIRECTIVES, {useValue: [OtherDirective], multi:true})]);
   * ```
   */
  export const PLATFORM_DIRECTIVES: OpaqueToken;
  /**
   * A token that can be provided when bootstraping an application to make an array of pipes
   * available in every component of the application.
   *
   * ### Example
   *
   * ```typescript
   * import {PLATFORM_PIPES} from 'angular2/core';
   * import {OtherPipe} from './myPipe';
   *
   * @Component({
   *   selector: 'my-component',
   *   template: `
   *     {{123 | other-pipe}}
   *   `
   * })
   * export class MyComponent {
   *   ...
   * }
   *
   * bootstrap(MyComponent, [provide(PLATFORM_PIPES, {useValue: [OtherPipe], multi:true})]);
   * ```
   */
  export const PLATFORM_PIPES: OpaqueToken;
}
declare module "angular2/src/core/platform_common_providers" {
  import { Type } from "angular2/src/facade/lang";
  import { Provider } from "angular2/src/core/di";
  /**
   * A default set of providers which should be included in any Angular platform.
   */
  export const PLATFORM_COMMON_PROVIDERS: Array<Type | Provider | any[]>;
}
declare module "angular2/src/core/application_common_providers" {
  import { Type } from "angular2/src/facade/lang";
  import { Provider } from "angular2/src/core/di";
  /**
   * A default set of providers which should be included in any Angular
   * application, regardless of the platform it runs onto.
   */
  export const APPLICATION_COMMON_PROVIDERS: Array<Type | Provider | any[]>;
}
declare module "angular2/core" {
  /**
   * @module
   * @description
   * Starting point to import all public core APIs.
   */
  export * from "angular2/src/core/metadata";
  export * from "angular2/src/core/util";
  export * from "angular2/src/core/prod_mode";
  export * from "angular2/src/core/di";
  export * from "angular2/src/facade/facade";
  export { enableProdMode } from "angular2/src/facade/lang";
  export { platform, createNgZone, PlatformRef, ApplicationRef } from "angular2/src/core/application_ref";
  export { APP_ID, APP_COMPONENT, APP_INITIALIZER, PACKAGE_ROOT_URL, PLATFORM_INITIALIZER } from "angular2/src/core/application_tokens";
  export * from "angular2/src/core/zone";
  export * from "angular2/src/core/render";
  export * from "angular2/src/core/linker";
  export { DebugElement, DebugNode, asNativeElements } from "angular2/src/core/debug/debug_node";
  export * from "angular2/src/core/testability/testability";
  export * from "angular2/src/core/change_detection";
  export * from "angular2/src/core/platform_directives_and_pipes";
  export * from "angular2/src/core/platform_common_providers";
  export * from "angular2/src/core/application_common_providers";
  export * from "angular2/src/core/reflection/reflection";
}
declare module "angular2/src/common/pipes/invalid_pipe_argument_exception" {
  import { Type } from "angular2/src/facade/lang";
  import { BaseException } from "angular2/src/facade/exceptions";
  export class InvalidPipeArgumentException extends BaseException {
    constructor(type: Type, value: Object);
  }
}
declare module "angular2/src/common/pipes/async_pipe" {
  import { Observable, EventEmitter } from "angular2/src/facade/async";
  import { ChangeDetectorRef, OnDestroy, PipeTransform } from "angular2/core";
  /**
   * The `async` pipe subscribes to an Observable or Promise and returns the latest value it has
   * emitted.
   * When a new value is emitted, the `async` pipe marks the component to be checked for changes.
   *
   * ### Example
   *
   * This example binds a `Promise` to the view. Clicking the `Resolve` button resolves the
   * promise.
   *
   * {@example core/pipes/ts/async_pipe/async_pipe_example.ts region='AsyncPipe'}
   *
   * It's also possible to use `async` with Observables. The example below binds the `time` Observable
   * to the view. Every 500ms, the `time` Observable updates the view with the current time.
   *
   * ```typescript
   * ```
   */
  export class AsyncPipe implements PipeTransform, OnDestroy {
    /** @internal */
    _latestValue: Object;
    /** @internal */
    _latestReturnedValue: Object;
    /** @internal */
    _subscription: Object;
    /** @internal */
    _obj: Observable<any> | Promise<any> | EventEmitter<any>;
    private _strategy;
    /** @internal */
    _ref: ChangeDetectorRef;
    constructor(_ref: ChangeDetectorRef);
    ngOnDestroy(): void;
    transform(obj: Observable<any> | Promise<any> | EventEmitter<any>, args?: any[]): any;
    /** @internal */
    _subscribe(obj: Observable<any> | Promise<any> | EventEmitter<any>): void;
    /** @internal */
    _selectStrategy(obj: Observable<any> | Promise<any> | EventEmitter<any>): any;
    /** @internal */
    _dispose(): void;
    /** @internal */
    _updateLatestValue(async: any, value: Object): void;
  }
}
declare module "angular2/src/facade/intl" {
  export enum NumberFormatStyle {
    Decimal = 0,
    Percent = 1,
    Currency = 2,
  }
  export class NumberFormatter {
    static format(num: number, locale: string, style: NumberFormatStyle, {minimumIntegerDigits, minimumFractionDigits, maximumFractionDigits, currency, currencyAsSymbol}?: {
      minimumIntegerDigits?: number;
      minimumFractionDigits?: number;
      maximumFractionDigits?: number;
      currency?: string;
      currencyAsSymbol?: boolean;
    }): string;
  }
  export class DateFormatter {
    static format(date: Date, locale: string, pattern: string): string;
  }
}
declare module "angular2/src/common/pipes/date_pipe" {
  import { PipeTransform } from "angular2/core";
  /**
   * Formats a date value to a string based on the requested format.
   *
   * WARNINGS:
   * - this pipe is marked as pure hence it will not be re-evaluated when the input is mutated.
   *   Instead users should treat the date as an immutable object and change the reference when the
   *   pipe needs to re-run (this is to avoid reformatting the date on every change detection run
   *   which would be an expensive operation).
   * - this pipe uses the Internationalization API. Therefore it is only reliable in Chrome and Opera
   *   browsers.
   *
   * ## Usage
   *
   *     expression | date[:format]
   *
   * where `expression` is a date object or a number (milliseconds since UTC epoch) and
   * `format` indicates which date/time components to include:
   *
   *  | Component | Symbol | Short Form   | Long Form         | Numeric   | 2-digit   |
   *  |-----------|:------:|--------------|-------------------|-----------|-----------|
   *  | era       |   G    | G (AD)       | GGGG (Anno Domini)| -         | -         |
   *  | year      |   y    | -            | -                 | y (2015)  | yy (15)   |
   *  | month     |   M    | MMM (Sep)    | MMMM (September)  | M (9)     | MM (09)   |
   *  | day       |   d    | -            | -                 | d (3)     | dd (03)   |
   *  | weekday   |   E    | EEE (Sun)    | EEEE (Sunday)     | -         | -         |
   *  | hour      |   j    | -            | -                 | j (13)    | jj (13)   |
   *  | hour12    |   h    | -            | -                 | h (1 PM)  | hh (01 PM)|
   *  | hour24    |   H    | -            | -                 | H (13)    | HH (13)   |
   *  | minute    |   m    | -            | -                 | m (5)     | mm (05)   |
   *  | second    |   s    | -            | -                 | s (9)     | ss (09)   |
   *  | timezone  |   z    | -            | z (Pacific Standard Time)| -  | -         |
   *  | timezone  |   Z    | Z (GMT-8:00) | -                 | -         | -         |
   *
   * In javascript, only the components specified will be respected (not the ordering,
   * punctuations, ...) and details of the formatting will be dependent on the locale.
   * On the other hand in Dart version, you can also include quoted text as well as some extra
   * date/time components such as quarter. For more information see:
   * https://api.dartlang.org/apidocs/channels/stable/dartdoc-viewer/intl/intl.DateFormat.
   *
   * `format` can also be one of the following predefined formats:
   *
   *  - `'medium'`: equivalent to `'yMMMdjms'` (e.g. Sep 3, 2010, 12:05:08 PM for en-US)
   *  - `'short'`: equivalent to `'yMdjm'` (e.g. 9/3/2010, 12:05 PM for en-US)
   *  - `'fullDate'`: equivalent to `'yMMMMEEEEd'` (e.g. Friday, September 3, 2010 for en-US)
   *  - `'longDate'`: equivalent to `'yMMMMd'` (e.g. September 3, 2010)
   *  - `'mediumDate'`: equivalent to `'yMMMd'` (e.g. Sep 3, 2010 for en-US)
   *  - `'shortDate'`: equivalent to `'yMd'` (e.g. 9/3/2010 for en-US)
   *  - `'mediumTime'`: equivalent to `'jms'` (e.g. 12:05:08 PM for en-US)
   *  - `'shortTime'`: equivalent to `'jm'` (e.g. 12:05 PM for en-US)
   *
   * Timezone of the formatted text will be the local system timezone of the end-users machine.
   *
   * ### Examples
   *
   * Assuming `dateObj` is (year: 2015, month: 6, day: 15, hour: 21, minute: 43, second: 11)
   * in the _local_ time and locale is 'en-US':
   *
   * ```
   *     {{ dateObj | date }}               // output is 'Jun 15, 2015'
   *     {{ dateObj | date:'medium' }}      // output is 'Jun 15, 2015, 9:43:11 PM'
   *     {{ dateObj | date:'shortTime' }}   // output is '9:43 PM'
   *     {{ dateObj | date:'mmss' }}        // output is '43:11'
   * ```
   *
   * {@example core/pipes/ts/date_pipe/date_pipe_example.ts region='DatePipe'}
   */
  export class DatePipe implements PipeTransform {
    /** @internal */
    static _ALIASES: {
      [key: string]: String;
    };
    transform(value: any, args: any[]): string;
    supports(obj: any): boolean;
  }
}
declare module "angular2/src/common/pipes/json_pipe" {
  import { PipeTransform } from "angular2/core";
  /**
   * Transforms any input value using `JSON.stringify`. Useful for debugging.
   *
   * ### Example
   * {@example core/pipes/ts/json_pipe/json_pipe_example.ts region='JsonPipe'}
   */
  export class JsonPipe implements PipeTransform {
    transform(value: any, args?: any[]): string;
  }
}
declare module "angular2/src/common/pipes/slice_pipe" {
  import { PipeTransform } from "angular2/core";
  /**
   * Creates a new List or String containing only a subset (slice) of the
   * elements.
   *
   * The starting index of the subset to return is specified by the `start` parameter.
   *
   * The ending index of the subset to return is specified by the optional `end` parameter.
   *
   * ### Usage
   *
   *     expression | slice:start[:end]
   *
   * All behavior is based on the expected behavior of the JavaScript API
   * Array.prototype.slice() and String.prototype.slice()
   *
   * Where the input expression is a [List] or [String], and `start` is:
   *
   * - **a positive integer**: return the item at _start_ index and all items after
   * in the list or string expression.
   * - **a negative integer**: return the item at _start_ index from the end and all items after
   * in the list or string expression.
   * - **`|start|` greater than the size of the expression**: return an empty list or string.
   * - **`|start|` negative greater than the size of the expression**: return entire list or
   * string expression.
   *
   * and where `end` is:
   *
   * - **omitted**: return all items until the end of the input
   * - **a positive integer**: return all items before _end_ index of the list or string
   * expression.
   * - **a negative integer**: return all items before _end_ index from the end of the list
   * or string expression.
   *
   * When operating on a [List], the returned list is always a copy even when all
   * the elements are being returned.
   *
   * ## List Example
   *
   * This `ngFor` example:
   *
   * {@example core/pipes/ts/slice_pipe/slice_pipe_example.ts region='SlicePipe_list'}
   *
   * produces the following:
   *
   *     <li>b</li>
   *     <li>c</li>
   *
   * ## String Examples
   *
   * {@example core/pipes/ts/slice_pipe/slice_pipe_example.ts region='SlicePipe_string'}
   */
  export class SlicePipe implements PipeTransform {
    transform(value: any, args?: any[]): any;
    private supports(obj);
  }
}
declare module "angular2/src/common/pipes/lowercase_pipe" {
  import { PipeTransform } from "angular2/core";
  /**
   * Transforms text to lowercase.
   *
   * ### Example
   *
   * {@example core/pipes/ts/lowerupper_pipe/lowerupper_pipe_example.ts region='LowerUpperPipe'}
   */
  export class LowerCasePipe implements PipeTransform {
    transform(value: string, args?: any[]): string;
  }
}
declare module "angular2/src/common/pipes/number_pipe" {
  import { NumberFormatStyle } from "angular2/src/facade/intl";
  import { PipeTransform } from "angular2/core";
  /**
   * Internal base class for numeric pipes.
   */
  export class NumberPipe {
    /** @internal */
    static _format(value: number, style: NumberFormatStyle, digits: string, currency?: string, currencyAsSymbol?: boolean): string;
  }
  /**
   * WARNING: this pipe uses the Internationalization API.
   * Therefore it is only reliable in Chrome and Opera browsers.
   *
   * Formats a number as local text. i.e. group sizing and separator and other locale-specific
   * configurations are based on the active locale.
   *
   * ### Usage
   *
   *     expression | number[:digitInfo]
   *
   * where `expression` is a number and `digitInfo` has the following format:
   *
   *     {minIntegerDigits}.{minFractionDigits}-{maxFractionDigits}
   *
   * - minIntegerDigits is the minimum number of integer digits to use. Defaults to 1.
   * - minFractionDigits is the minimum number of digits after fraction. Defaults to 0.
   * - maxFractionDigits is the maximum number of digits after fraction. Defaults to 3.
   *
   * For more information on the acceptable range for each of these numbers and other
   * details see your native internationalization library.
   *
   * ### Example
   *
   * {@example core/pipes/ts/number_pipe/number_pipe_example.ts region='NumberPipe'}
   */
  export class DecimalPipe extends NumberPipe implements PipeTransform {
    transform(value: any, args: any[]): string;
  }
  /**
   * WARNING: this pipe uses the Internationalization API.
   * Therefore it is only reliable in Chrome and Opera browsers.
   *
   * Formats a number as local percent.
   *
   * ### Usage
   *
   *     expression | percent[:digitInfo]
   *
   * For more information about `digitInfo` see {@link DecimalPipe}
   *
   * ### Example
   *
   * {@example core/pipes/ts/number_pipe/number_pipe_example.ts region='PercentPipe'}
   */
  export class PercentPipe extends NumberPipe implements PipeTransform {
    transform(value: any, args: any[]): string;
  }
  /**
   * WARNING: this pipe uses the Internationalization API.
   * Therefore it is only reliable in Chrome and Opera browsers.
   *
   * Formats a number as local currency.
   *
   * ### Usage
   *
   *     expression | currency[:currencyCode[:symbolDisplay[:digitInfo]]]
   *
   * where `currencyCode` is the ISO 4217 currency code, such as "USD" for the US dollar and
   * "EUR" for the euro. `symbolDisplay` is a boolean indicating whether to use the currency
   * symbol (e.g. $) or the currency code (e.g. USD) in the output. The default for this value
   * is `false`.
   * For more information about `digitInfo` see {@link DecimalPipe}
   *
   * ### Example
   *
   * {@example core/pipes/ts/number_pipe/number_pipe_example.ts region='CurrencyPipe'}
   */
  export class CurrencyPipe extends NumberPipe implements PipeTransform {
    transform(value: any, args: any[]): string;
  }
}
declare module "angular2/src/common/pipes/uppercase_pipe" {
  import { PipeTransform } from "angular2/core";
  /**
   * Implements uppercase transforms to text.
   *
   * ### Example
   *
   * {@example core/pipes/ts/lowerupper_pipe/lowerupper_pipe_example.ts region='LowerUpperPipe'}
   */
  export class UpperCasePipe implements PipeTransform {
    transform(value: string, args?: any[]): string;
  }
}
declare module "angular2/src/common/pipes/replace_pipe" {
  import { PipeTransform } from "angular2/core";
  /**
   * Creates a new String with some or all of the matches of a pattern replaced by
   * a replacement.
   *
   * The pattern to be matched is specified by the 'pattern' parameter.
   *
   * The replacement to be set is specified by the 'replacement' parameter.
   *
   * An optional 'flags' parameter can be set.
   *
   * ### Usage
   *
   *     expression | replace:pattern:replacement
   *
   * All behavior is based on the expected behavior of the JavaScript API
   * String.prototype.replace() function.
   *
   * Where the input expression is a [String] or [Number] (to be treated as a string),
   * the `pattern` is a [String] or [RegExp],
   * the 'replacement' is a [String] or [Function].
   *
   * --Note--: The 'pattern' parameter will be converted to a RegExp instance. Make sure to escape the
   * string properly if you are matching for regular expression special characters like parenthesis,
   * brackets etc.
   */
  export class ReplacePipe implements PipeTransform {
    transform(value: any, args: any[]): any;
    private _supportedInput(input);
    private _supportedPattern(pattern);
    private _supportedReplacement(replacement);
  }
}
declare module "angular2/src/common/pipes/i18n_plural_pipe" {
  import { PipeTransform } from "angular2/core";
  /**
   *
   *  Maps a value to a string that pluralizes the value properly.
   *
   *  ## Usage
   *
   *  expression | i18nPlural:mapping
   *
   *  where `expression` is a number and `mapping` is an object that indicates the proper text for
   *  when the `expression` evaluates to 0, 1, or some other number.  You can interpolate the actual
   *  value into the text using the `#` sign.
   *
   *  ## Example
   *
   *  ```
   *  <div>
   *    {{ messages.length | i18nPlural: messageMapping }}
   *  </div>
   *
   *  class MyApp {
   *    messages: any[];
   *    messageMapping: any = {
   *      '=0': 'No messages.',
   *      '=1': 'One message.',
   *      'other': '# messages.'
   *    }
   *    ...
   *  }
   *  ```
   *
   */
  export class I18nPluralPipe implements PipeTransform {
    transform(value: number, args?: any[]): string;
  }
}
declare module "angular2/src/common/pipes/i18n_select_pipe" {
  import { PipeTransform } from "angular2/core";
  /**
   *
   *  Generic selector that displays the string that matches the current value.
   *
   *  ## Usage
   *
   *  expression | i18nSelect:mapping
   *
   *  where `mapping` is an object that indicates the text that should be displayed
   *  for different values of the provided `expression`.
   *
   *  ## Example
   *
   *  ```
   *  <div>
   *    {{ gender | i18nSelect: inviteMap }}
   *  </div>
   *
   *  class MyApp {
   *    gender: string = 'male';
   *    inviteMap: any = {
   *      'male': 'Invite her.',
   *      'female': 'Invite him.',
   *      'other': 'Invite them.'
   *    }
   *    ...
   *  }
   *  ```
   */
  export class I18nSelectPipe implements PipeTransform {
    transform(value: string, args?: any[]): string;
  }
}
declare module "angular2/src/common/pipes/common_pipes" {
  /**
   * @module
   * @description
   * This module provides a set of common Pipes.
   */
  import { AsyncPipe } from "angular2/src/common/pipes/async_pipe";
  import { UpperCasePipe } from "angular2/src/common/pipes/uppercase_pipe";
  import { SlicePipe } from "angular2/src/common/pipes/slice_pipe";
  import { ReplacePipe } from "angular2/src/common/pipes/replace_pipe";
  /**
   * A collection of Angular core pipes that are likely to be used in each and every
   * application.
   *
   * This collection can be used to quickly enumerate all the built-in pipes in the `pipes`
   * property of the `@Component` or `@View` decorators.
   */
  export const COMMON_PIPES: (typeof AsyncPipe | typeof UpperCasePipe | typeof SlicePipe | typeof ReplacePipe)[];
}
declare module "angular2/src/common/pipes" {
  /**
   * @module
   * @description
   * This module provides a set of common Pipes.
   */
  export { AsyncPipe } from "angular2/src/common/pipes/async_pipe";
  export { DatePipe } from "angular2/src/common/pipes/date_pipe";
  export { JsonPipe } from "angular2/src/common/pipes/json_pipe";
  export { SlicePipe } from "angular2/src/common/pipes/slice_pipe";
  export { LowerCasePipe } from "angular2/src/common/pipes/lowercase_pipe";
  export { NumberPipe, DecimalPipe, PercentPipe, CurrencyPipe } from "angular2/src/common/pipes/number_pipe";
  export { UpperCasePipe } from "angular2/src/common/pipes/uppercase_pipe";
  export { ReplacePipe } from "angular2/src/common/pipes/replace_pipe";
  export { I18nPluralPipe } from "angular2/src/common/pipes/i18n_plural_pipe";
  export { I18nSelectPipe } from "angular2/src/common/pipes/i18n_select_pipe";
  export { COMMON_PIPES } from "angular2/src/common/pipes/common_pipes";
}
declare module "angular2/src/common/directives/ng_class" {
  import { DoCheck, OnDestroy, ElementRef, IterableDiffers, KeyValueDiffers, Renderer } from "angular2/core";
  /**
   * The `NgClass` directive conditionally adds and removes CSS classes on an HTML element based on
   * an expression's evaluation result.
   *
   * The result of an expression evaluation is interpreted differently depending on type of
   * the expression evaluation result:
   * - `string` - all the CSS classes listed in a string (space delimited) are added
   * - `Array` - all the CSS classes (Array elements) are added
   * - `Object` - each key corresponds to a CSS class name while values are interpreted as expressions
   * evaluating to `Boolean`. If a given expression evaluates to `true` a corresponding CSS class
   * is added - otherwise it is removed.
   *
   * While the `NgClass` directive can interpret expressions evaluating to `string`, `Array`
   * or `Object`, the `Object`-based version is the most often used and has an advantage of keeping
   * all the CSS class names in a template.
   *
   * ### Example ([live demo](http://plnkr.co/edit/a4YdtmWywhJ33uqfpPPn?p=preview)):
   *
   * ```
   * import {Component} from 'angular2/core';
   * import {NgClass} from 'angular2/common';
   *
   * @Component({
   *   selector: 'toggle-button',
   *   inputs: ['isDisabled'],
   *   template: `
   *      <div class="button" [ngClass]="{active: isOn, disabled: isDisabled}"
   *          (click)="toggle(!isOn)">
   *          Click me!
   *      </div>`,
   *   styles: [`
   *     .button {
   *       width: 120px;
   *       border: medium solid black;
   *     }
   *
   *     .active {
   *       background-color: red;
   *    }
   *
   *     .disabled {
   *       color: gray;
   *       border: medium solid gray;
   *     }
   *   `]
   *   directives: [NgClass]
   * })
   * class ToggleButton {
   *   isOn = false;
   *   isDisabled = false;
   *
   *   toggle(newState) {
   *     if (!this.isDisabled) {
   *       this.isOn = newState;
   *     }
   *   }
   * }
   * ```
   */
  export class NgClass implements DoCheck, OnDestroy {
    private _iterableDiffers;
    private _keyValueDiffers;
    private _ngEl;
    private _renderer;
    private _iterableDiffer;
    private _keyValueDiffer;
    private _initialClasses;
    private _rawClass;
    constructor(_iterableDiffers: IterableDiffers, _keyValueDiffers: KeyValueDiffers, _ngEl: ElementRef, _renderer: Renderer);
    initialClasses: string;
    rawClass: string | string[] | Set<string> | {
      [key: string]: any;
    };
    ngDoCheck(): void;
    ngOnDestroy(): void;
    private _cleanupClasses(rawClassVal);
    private _applyKeyValueChanges(changes);
    private _applyIterableChanges(changes);
    private _applyInitialClasses(isCleanup);
    private _applyClasses(rawClassVal, isCleanup);
    private _toggleClass(className, enabled);
  }
}
declare module "angular2/src/common/directives/ng_for" {
  import { DoCheck, ChangeDetectorRef, IterableDiffers, ViewContainerRef, TemplateRef, TrackByFn } from "angular2/core";
  /**
   * The `NgFor` directive instantiates a template once per item from an iterable. The context for
   * each instantiated template inherits from the outer context with the given loop variable set
   * to the current item from the iterable.
   *
   * # Local Variables
   *
   * `NgFor` provides several exported values that can be aliased to local variables:
   *
   * * `index` will be set to the current loop iteration for each template context.
   * * `last` will be set to a boolean value indicating whether the item is the last one in the
   *   iteration.
   * * `even` will be set to a boolean value indicating whether this item has an even index.
   * * `odd` will be set to a boolean value indicating whether this item has an odd index.
   *
   * # Change Propagation
   *
   * When the contents of the iterator changes, `NgFor` makes the corresponding changes to the DOM:
   *
   * * When an item is added, a new instance of the template is added to the DOM.
   * * When an item is removed, its template instance is removed from the DOM.
   * * When items are reordered, their respective templates are reordered in the DOM.
   * * Otherwise, the DOM element for that item will remain the same.
   *
   * Angular uses object identity to track insertions and deletions within the iterator and reproduce
   * those changes in the DOM. This has important implications for animations and any stateful
   * controls
   * (such as `<input>` elements which accept user input) that are present. Inserted rows can be
   * animated in, deleted rows can be animated out, and unchanged rows retain any unsaved state such
   * as user input.
   *
   * It is possible for the identities of elements in the iterator to change while the data does not.
   * This can happen, for example, if the iterator produced from an RPC to the server, and that
   * RPC is re-run. Even if the data hasn't changed, the second response will produce objects with
   * different identities, and Angular will tear down the entire DOM and rebuild it (as if all old
   * elements were deleted and all new elements inserted). This is an expensive operation and should
   * be avoided if possible.
   *
   * # Syntax
   *
   * - `<li *ngFor="#item of items; #i = index">...</li>`
   * - `<li template="ngFor #item of items; #i = index">...</li>`
   * - `<template ngFor #item [ngForOf]="items" #i="index"><li>...</li></template>`
   *
   * ### Example
   *
   * See a [live demo](http://plnkr.co/edit/KVuXxDp0qinGDyo307QW?p=preview) for a more detailed
   * example.
   */
  export class NgFor implements DoCheck {
    private _viewContainer;
    private _templateRef;
    private _iterableDiffers;
    private _cdr;
    /** @internal */
    _ngForOf: any;
    _ngForTrackBy: TrackByFn;
    private _differ;
    constructor(_viewContainer: ViewContainerRef, _templateRef: TemplateRef, _iterableDiffers: IterableDiffers, _cdr: ChangeDetectorRef);
    ngForOf: any;
    ngForTemplate: TemplateRef;
    ngForTrackBy: TrackByFn;
    ngDoCheck(): void;
    private _applyChanges(changes);
    private _perViewChange(view, record);
    private _bulkRemove(tuples);
    private _bulkInsert(tuples);
  }
}
declare module "angular2/src/common/directives/ng_if" {
  import { ViewContainerRef, TemplateRef } from "angular2/core";
  /**
   * Removes or recreates a portion of the DOM tree based on an {expression}.
   *
   * If the expression assigned to `ngIf` evaluates to a false value then the element
   * is removed from the DOM, otherwise a clone of the element is reinserted into the DOM.
   *
   * ### Example ([live demo](http://plnkr.co/edit/fe0kgemFBtmQOY31b4tw?p=preview)):
   *
   * ```
   * <div *ngIf="errorCount > 0" class="error">
   *   <!-- Error message displayed when the errorCount property on the current context is greater
   * than 0. -->
   *   {{errorCount}} errors detected
   * </div>
   * ```
   *
   * ### Syntax
   *
   * - `<div *ngIf="condition">...</div>`
   * - `<div template="ngIf condition">...</div>`
   * - `<template [ngIf]="condition"><div>...</div></template>`
   */
  export class NgIf {
    private _viewContainer;
    private _templateRef;
    private _prevCondition;
    constructor(_viewContainer: ViewContainerRef, _templateRef: TemplateRef);
    ngIf: any;
  }
}
declare module "angular2/src/common/directives/ng_style" {
  import { DoCheck, KeyValueDiffer, KeyValueDiffers, ElementRef, Renderer } from "angular2/core";
  /**
   * The `NgStyle` directive changes styles based on a result of expression evaluation.
   *
   * An expression assigned to the `ngStyle` property must evaluate to an object and the
   * corresponding element styles are updated based on changes to this object. Style names to update
   * are taken from the object's keys, and values - from the corresponding object's values.
   *
   * ### Syntax
   *
   * - `<div [ngStyle]="{'font-style': style}"></div>`
   * - `<div [ngStyle]="styleExp"></div>` - here the `styleExp` must evaluate to an object
   *
   * ### Example ([live demo](http://plnkr.co/edit/YamGS6GkUh9GqWNQhCyM?p=preview)):
   *
   * ```
   * import {Component} from 'angular2/core';
   * import {NgStyle} from 'angular2/common';
   *
   * @Component({
   *  selector: 'ngStyle-example',
   *  template: `
   *    <h1 [ngStyle]="{'font-style': style, 'font-size': size, 'font-weight': weight}">
   *      Change style of this text!
   *    </h1>
   *
   *    <hr>
   *
   *    <label>Italic: <input type="checkbox" (change)="changeStyle($event)"></label>
   *    <label>Bold: <input type="checkbox" (change)="changeWeight($event)"></label>
   *    <label>Size: <input type="text" [value]="size" (change)="size = $event.target.value"></label>
   *  `,
   *  directives: [NgStyle]
   * })
   * export class NgStyleExample {
   *    style = 'normal';
   *    weight = 'normal';
   *    size = '20px';
   *
   *    changeStyle($event: any) {
   *      this.style = $event.target.checked ? 'italic' : 'normal';
   *    }
   *
   *    changeWeight($event: any) {
   *      this.weight = $event.target.checked ? 'bold' : 'normal';
   *    }
   * }
   * ```
   *
   * In this example the `font-style`, `font-size` and `font-weight` styles will be updated
   * based on the `style` property's value changes.
   */
  export class NgStyle implements DoCheck {
    private _differs;
    private _ngEl;
    private _renderer;
    /** @internal */
    _rawStyle: {
      [key: string]: string;
    };
    /** @internal */
    _differ: KeyValueDiffer;
    constructor(_differs: KeyValueDiffers, _ngEl: ElementRef, _renderer: Renderer);
    rawStyle: {
      [key: string]: string;
    };
    ngDoCheck(): void;
    private _applyChanges(changes);
    private _setStyle(name, val);
  }
}
declare module "angular2/src/common/directives/ng_switch" {
  import { ViewContainerRef, TemplateRef } from "angular2/core";
  /** @internal */
  export class SwitchView {
    private _viewContainerRef;
    private _templateRef;
    constructor(_viewContainerRef: ViewContainerRef, _templateRef: TemplateRef);
    create(): void;
    destroy(): void;
  }
  /**
   * Adds or removes DOM sub-trees when their match expressions match the switch expression.
   *
   * Elements within `NgSwitch` but without `NgSwitchWhen` or `NgSwitchDefault` directives will be
   * preserved at the location as specified in the template.
   *
   * `NgSwitch` simply inserts nested elements based on which match expression matches the value
   * obtained from the evaluated switch expression. In other words, you define a container element
   * (where you place the directive with a switch expression on the
   * **`[ngSwitch]="..."` attribute**), define any inner elements inside of the directive and
   * place a `[ngSwitchWhen]` attribute per element.
   *
   * The `ngSwitchWhen` property is used to inform `NgSwitch` which element to display when the
   * expression is evaluated. If a matching expression is not found via a `ngSwitchWhen` property
   * then an element with the `ngSwitchDefault` attribute is displayed.
   *
   * ### Example ([live demo](http://plnkr.co/edit/DQMTII95CbuqWrl3lYAs?p=preview))
   *
   * ```typescript
   * @Component({selector: 'app'})
   * @View({
   *   template: `
   *     <p>Value = {{value}}</p>
   *     <button (click)="inc()">Increment</button>
   *
   *     <div [ngSwitch]="value">
   *       <p *ngSwitchWhen="'init'">increment to start</p>
   *       <p *ngSwitchWhen="0">0, increment again</p>
   *       <p *ngSwitchWhen="1">1, increment again</p>
   *       <p *ngSwitchWhen="2">2, stop incrementing</p>
   *       <p *ngSwitchDefault>&gt; 2, STOP!</p>
   *     </div>
   *
   *     <!-- alternate syntax -->
   *
   *     <p [ngSwitch]="value">
   *       <template ngSwitchWhen="init">increment to start</template>
   *       <template [ngSwitchWhen]="0">0, increment again</template>
   *       <template [ngSwitchWhen]="1">1, increment again</template>
   *       <template [ngSwitchWhen]="2">2, stop incrementing</template>
   *       <template ngSwitchDefault>&gt; 2, STOP!</template>
   *     </p>
   *   `,
   *   directives: [NgSwitch, NgSwitchWhen, NgSwitchDefault]
   * })
   * export class App {
   *   value = 'init';
   *
   *   inc() {
   *     this.value = this.value === 'init' ? 0 : this.value + 1;
   *   }
   * }
   *
   * bootstrap(App).catch(err => console.error(err));
   * ```
   */
  export class NgSwitch {
    private _switchValue;
    private _useDefault;
    private _valueViews;
    private _activeViews;
    ngSwitch: any;
    /** @internal */
    _onWhenValueChanged(oldWhen: any, newWhen: any, view: SwitchView): void;
    /** @internal */
    _emptyAllActiveViews(): void;
    /** @internal */
    _activateViews(views: SwitchView[]): void;
    /** @internal */
    _registerView(value: any, view: SwitchView): void;
    /** @internal */
    _deregisterView(value: any, view: SwitchView): void;
  }
  /**
   * Insert the sub-tree when the `ngSwitchWhen` expression evaluates to the same value as the
   * enclosing switch expression.
   *
   * If multiple match expression match the switch expression value, all of them are displayed.
   *
   * See {@link NgSwitch} for more details and example.
   */
  export class NgSwitchWhen {
    /** @internal */
    _value: any;
    /** @internal */
    _view: SwitchView;
    private _switch;
    constructor(viewContainer: ViewContainerRef, templateRef: TemplateRef, ngSwitch: NgSwitch);
    ngSwitchWhen: any;
  }
  /**
   * Default case statements are displayed when no match expression matches the switch expression
   * value.
   *
   * See {@link NgSwitch} for more details and example.
   */
  export class NgSwitchDefault {
    constructor(viewContainer: ViewContainerRef, templateRef: TemplateRef, sswitch: NgSwitch);
  }
}
declare module "angular2/src/common/directives/ng_plural" {
  import { ViewContainerRef, TemplateRef, QueryList, AfterContentInit } from "angular2/core";
  import { SwitchView } from "angular2/src/common/directives/ng_switch";
  export abstract class NgLocalization {
    abstract getPluralCategory(value: any): string;
  }
  /**
   * `ngPlural` is an i18n directive that displays DOM sub-trees that match the switch expression
   * value, or failing that, DOM sub-trees that match the switch expression's pluralization category.
   *
   * To use this directive, you must provide an extension of `NgLocalization` that maps values to
   * category names. You then define a container element that sets the `[ngPlural]` attribute to a
   * switch expression.
   *    - Inner elements defined with an `[ngPluralCase]` attribute will display based on their
   * expression.
   *    - If `[ngPluralCase]` is set to a value starting with `=`, it will only display if the value
   * matches the switch expression exactly.
   *    - Otherwise, the view will be treated as a "category match", and will only display if exact
   * value matches aren't found and the value maps to its category using the `getPluralCategory`
   * function provided.
   *
   * If no matching views are found for a switch expression, inner elements marked
   * `[ngPluralCase]="other"` will be displayed.
   *
   * ```typescript
   * class MyLocalization extends NgLocalization {
   *    getPluralCategory(value: any) {
   *       if(value < 5) {
   *          return 'few';
   *       }
   *    }
   * }
   *
   * @Component({
   *    selector: 'app',
   *    providers: [provide(NgLocalization, {useClass: MyLocalization})]
   * })
   * @View({
   *   template: `
   *     <p>Value = {{value}}</p>
   *     <button (click)="inc()">Increment</button>
   *
   *     <div [ngPlural]="value">
   *       <template ngPluralCase="=0">there is nothing</template>
   *       <template ngPluralCase="=1">there is one</template>
   *       <template ngPluralCase="few">there are a few</template>
   *       <template ngPluralCase="other">there is some number</template>
   *     </div>
   *   `,
   *   directives: [NgPlural, NgPluralCase]
   * })
   * export class App {
   *   value = 'init';
   *
   *   inc() {
   *     this.value = this.value === 'init' ? 0 : this.value + 1;
   *   }
   * }
   *
   * ```
   */
  export class NgPluralCase {
    value: string;
    _view: SwitchView;
    constructor(value: string, template: TemplateRef, viewContainer: ViewContainerRef);
  }
  export class NgPlural implements AfterContentInit {
    private _localization;
    private _switchValue;
    private _activeView;
    private _caseViews;
    cases: QueryList<NgPluralCase>;
    constructor(_localization: NgLocalization);
    ngPlural: number;
    ngAfterContentInit(): void;
    /** @internal */
    _updateView(): void;
    /** @internal */
    _clearViews(): void;
    /** @internal */
    _activateView(view: SwitchView): void;
    /** @internal */
    _getCategoryView(value: number): SwitchView;
    /** @internal */
    _isValueView(pluralCase: NgPluralCase): boolean;
    /** @internal */
    _formatValue(pluralCase: NgPluralCase): any;
    /** @internal */
    _stripValue(value: string): number;
  }
}
declare module "angular2/src/common/directives/observable_list_diff" {
  /**
   * This module exists in Dart, but not in Typescript. This exported symbol
   * is only here to help Typescript think this is a module.
   */
  export var workaround_empty_observable_list_diff: any;
}
declare module "angular2/src/common/directives/core_directives" {
  import { Type } from "angular2/src/facade/lang";
  /**
   * A collection of Angular core directives that are likely to be used in each and every Angular
   * application.
   *
   * This collection can be used to quickly enumerate all the built-in directives in the `directives`
   * property of the `@View` annotation.
   *
   * ### Example ([live demo](http://plnkr.co/edit/yakGwpCdUkg0qfzX5m8g?p=preview))
   *
   * Instead of writing:
   *
   * ```typescript
   * import {NgClass, NgIf, NgFor, NgSwitch, NgSwitchWhen, NgSwitchDefault} from 'angular2/common';
   * import {OtherDirective} from './myDirectives';
   *
   * @Component({
   *   selector: 'my-component',
   *   templateUrl: 'myComponent.html',
   *   directives: [NgClass, NgIf, NgFor, NgSwitch, NgSwitchWhen, NgSwitchDefault, OtherDirective]
   * })
   * export class MyComponent {
   *   ...
   * }
   * ```
   * one could import all the core directives at once:
   *
   * ```typescript
   * import {CORE_DIRECTIVES} from 'angular2/common';
   * import {OtherDirective} from './myDirectives';
   *
   * @Component({
   *   selector: 'my-component',
   *   templateUrl: 'myComponent.html',
   *   directives: [CORE_DIRECTIVES, OtherDirective]
   * })
   * export class MyComponent {
   *   ...
   * }
   * ```
   */
  export const CORE_DIRECTIVES: Type[];
}
declare module "angular2/src/common/directives" {
  /**
   * @module
   * @description
   * Common directives shipped with Angular.
   */
  export { NgClass } from "angular2/src/common/directives/ng_class";
  export { NgFor } from "angular2/src/common/directives/ng_for";
  export { NgIf } from "angular2/src/common/directives/ng_if";
  export { NgStyle } from "angular2/src/common/directives/ng_style";
  export { NgSwitch, NgSwitchWhen, NgSwitchDefault } from "angular2/src/common/directives/ng_switch";
  export { NgPlural, NgPluralCase, NgLocalization } from "angular2/src/common/directives/ng_plural";
  export * from "angular2/src/common/directives/observable_list_diff";
  export { CORE_DIRECTIVES } from "angular2/src/common/directives/core_directives";
}
declare module "angular2/src/common/forms/validators" {
  import { OpaqueToken } from "angular2/core";
  import * as modelModule from "angular2/src/common/forms/model";
  import { ValidatorFn, AsyncValidatorFn } from "angular2/src/common/forms/directives/validators";
  /**
   * Providers for validators to be used for {@link Control}s in a form.
   *
   * Provide this using `multi: true` to add validators.
   *
   * ### Example
   *
   * {@example core/forms/ts/ng_validators/ng_validators.ts region='ng_validators'}
   */
  export const NG_VALIDATORS: OpaqueToken;
  /**
   * Providers for asynchronous validators to be used for {@link Control}s
   * in a form.
   *
   * Provide this using `multi: true` to add validators.
   *
   * See {@link NG_VALIDATORS} for more details.
   */
  export const NG_ASYNC_VALIDATORS: OpaqueToken;
  /**
   * Provides a set of validators used by form controls.
   *
   * A validator is a function that processes a {@link Control} or collection of
   * controls and returns a map of errors. A null map means that validation has passed.
   *
   * ### Example
   *
   * ```typescript
   * var loginControl = new Control("", Validators.required)
   * ```
   */
  export class Validators {
    /**
     * Validator that requires controls to have a non-empty value.
     */
    static required(control: modelModule.AbstractControl): {
      [key: string]: boolean;
    };
    /**
     * Validator that requires controls to have a value of a minimum length.
     */
    static minLength(minLength: number): ValidatorFn;
    /**
     * Validator that requires controls to have a value of a maximum length.
     */
    static maxLength(maxLength: number): ValidatorFn;
    /**
     * Validator that requires a control to match a regex to its value.
     */
    static pattern(pattern: string): ValidatorFn;
    /**
     * No-op validator.
     */
    static nullValidator(c: modelModule.AbstractControl): {
      [key: string]: boolean;
    };
    /**
     * Compose multiple validators into a single function that returns the union
     * of the individual error maps.
     */
    static compose(validators: ValidatorFn[]): ValidatorFn;
    static composeAsync(validators: AsyncValidatorFn[]): AsyncValidatorFn;
  }
}
declare module "angular2/src/common/forms/directives/validators" {
  import { AbstractControl } from "angular2/src/common/forms/model";
  import * as modelModule from "angular2/src/common/forms/model";
  /**
   * An interface that can be implemented by classes that can act as validators.
   *
   * ## Usage
   *
   * ```typescript
   * @Directive({
   *   selector: '[custom-validator]',
   *   providers: [provide(NG_VALIDATORS, {useExisting: CustomValidatorDirective, multi: true})]
   * })
   * class CustomValidatorDirective implements Validator {
   *   validate(c: Control): {[key: string]: any} {
   *     return {"custom": true};
   *   }
   * }
   * ```
   */
  export interface Validator {
    validate(c: modelModule.AbstractControl): {
      [key: string]: any;
    };
  }
  /**
   * A Directive that adds the `required` validator to any controls marked with the
   * `required` attribute, via the {@link NG_VALIDATORS} binding.
   *
   * ### Example
   *
   * ```
   * <input ngControl="fullName" required>
   * ```
   */
  export class RequiredValidator {
  }
  export interface ValidatorFn {
    (c: AbstractControl): {
      [key: string]: any;
    };
  }
  export interface AsyncValidatorFn {
    (c: AbstractControl): any;
  }
  /**
   * A directive which installs the {@link MinLengthValidator} for any `ngControl`,
   * `ngFormControl`, or control with `ngModel` that also has a `minlength` attribute.
   */
  export class MinLengthValidator implements Validator {
    private _validator;
    constructor(minLength: string);
    validate(c: AbstractControl): {
      [key: string]: any;
    };
  }
  /**
   * A directive which installs the {@link MaxLengthValidator} for any `ngControl, `ngFormControl`,
   * or control with `ngModel` that also has a `maxlength` attribute.
   */
  export class MaxLengthValidator implements Validator {
    private _validator;
    constructor(maxLength: string);
    validate(c: AbstractControl): {
      [key: string]: any;
    };
  }
  export class PatternValidator implements Validator {
    private _validator;
    constructor(pattern: string);
    validate(c: AbstractControl): {
      [key: string]: any;
    };
  }
}
declare module "angular2/src/common/forms/model" {
  import { Observable } from "angular2/src/facade/async";
  import { ValidatorFn, AsyncValidatorFn } from "angular2/src/common/forms/directives/validators";
  /**
   * Indicates that a Control is valid, i.e. that no errors exist in the input value.
   */
  export const VALID: string;
  /**
   * Indicates that a Control is invalid, i.e. that an error exists in the input value.
   */
  export const INVALID: string;
  /**
   * Indicates that a Control is pending, i.e. that async validation is occurring and
   * errors are not yet available for the input value.
   */
  export const PENDING: string;
  export function isControl(control: Object): boolean;
  /**
   *
   */
  export abstract class AbstractControl {
    validator: ValidatorFn;
    asyncValidator: AsyncValidatorFn;
    /** @internal */
    _value: any;
    private _valueChanges;
    private _statusChanges;
    private _status;
    private _errors;
    private _pristine;
    private _touched;
    private _parent;
    private _asyncValidationSubscription;
    constructor(validator: ValidatorFn, asyncValidator: AsyncValidatorFn);
    value: any;
    status: string;
    valid: boolean;
    /**
     * Returns the errors of this control.
     */
    errors: {
      [key: string]: any;
    };
    pristine: boolean;
    dirty: boolean;
    touched: boolean;
    untouched: boolean;
    valueChanges: Observable<any>;
    statusChanges: Observable<any>;
    pending: boolean;
    markAsTouched(): void;
    markAsDirty({onlySelf}?: {
      onlySelf?: boolean;
    }): void;
    markAsPending({onlySelf}?: {
      onlySelf?: boolean;
    }): void;
    setParent(parent: ControlGroup | ControlArray): void;
    updateValueAndValidity({onlySelf, emitEvent}?: {
      onlySelf?: boolean;
      emitEvent?: boolean;
    }): void;
    private _runValidator();
    private _runAsyncValidator(emitEvent);
    private _cancelExistingSubscription();
    /**
     * Sets errors on a control.
     *
     * This is used when validations are run not automatically, but manually by the user.
     *
     * Calling `setErrors` will also update the validity of the parent control.
     *
     * ## Usage
     *
     * ```
     * var login = new Control("someLogin");
     * login.setErrors({
     *   "notUnique": true
     * });
     *
     * expect(login.valid).toEqual(false);
     * expect(login.errors).toEqual({"notUnique": true});
     *
     * login.updateValue("someOtherLogin");
     *
     * expect(login.valid).toEqual(true);
     * ```
     */
    setErrors(errors: {
      [key: string]: any;
    }, {emitEvent}?: {
      emitEvent?: boolean;
    }): void;
    find(path: Array<string | number> | string): AbstractControl;
    getError(errorCode: string, path?: string[]): any;
    hasError(errorCode: string, path?: string[]): boolean;
    root: AbstractControl;
    /** @internal */
    _updateControlsErrors(): void;
    /** @internal */
    _initObservables(): void;
    private _calculateStatus();
    /** @internal */
    abstract _updateValue(): void;
    /** @internal */
    abstract _anyControlsHaveStatus(status: string): boolean;
  }
  /**
   * Defines a part of a form that cannot be divided into other controls. `Control`s have values and
   * validation state, which is determined by an optional validation function.
   *
   * `Control` is one of the three fundamental building blocks used to define forms in Angular, along
   * with {@link ControlGroup} and {@link ControlArray}.
   *
   * ## Usage
   *
   * By default, a `Control` is created for every `<input>` or other form component.
   * With {@link NgFormControl} or {@link NgFormModel} an existing {@link Control} can be
   * bound to a DOM element instead. This `Control` can be configured with a custom
   * validation function.
   *
   * ### Example ([live demo](http://plnkr.co/edit/23DESOpbNnBpBHZt1BR4?p=preview))
   */
  export class Control extends AbstractControl {
    /** @internal */
    _onChange: Function;
    constructor(value?: any, validator?: ValidatorFn, asyncValidator?: AsyncValidatorFn);
    /**
     * Set the value of the control to `value`.
     *
     * If `onlySelf` is `true`, this change will only affect the validation of this `Control`
     * and not its parent component. If `emitEvent` is `true`, this change will cause a
     * `valueChanges` event on the `Control` to be emitted. Both of these options default to
     * `false`.
     *
     * If `emitModelToViewChange` is `true`, the view will be notified about the new value
     * via an `onChange` event. This is the default behavior if `emitModelToViewChange` is not
     * specified.
     */
    updateValue(value: any, {onlySelf, emitEvent, emitModelToViewChange}?: {
      onlySelf?: boolean;
      emitEvent?: boolean;
      emitModelToViewChange?: boolean;
    }): void;
    /**
     * @internal
     */
    _updateValue(): void;
    /**
     * @internal
     */
    _anyControlsHaveStatus(status: string): boolean;
    /**
     * Register a listener for change events.
     */
    registerOnChange(fn: Function): void;
  }
  /**
   * Defines a part of a form, of fixed length, that can contain other controls.
   *
   * A `ControlGroup` aggregates the values and errors of each {@link Control} in the group. Thus, if
   * one of the controls in a group is invalid, the entire group is invalid. Similarly, if a control
   * changes its value, the entire group changes as well.
   *
   * `ControlGroup` is one of the three fundamental building blocks used to define forms in Angular,
   * along with {@link Control} and {@link ControlArray}. {@link ControlArray} can also contain other
   * controls, but is of variable length.
   *
   * ### Example ([live demo](http://plnkr.co/edit/23DESOpbNnBpBHZt1BR4?p=preview))
   */
  export class ControlGroup extends AbstractControl {
    controls: {
      [key: string]: AbstractControl;
    };
    private _optionals;
    constructor(controls: {
      [key: string]: AbstractControl;
    }, optionals?: {
      [key: string]: boolean;
    }, validator?: ValidatorFn, asyncValidator?: AsyncValidatorFn);
    /**
     * Add a control to this group.
     */
    addControl(name: string, control: AbstractControl): void;
    /**
     * Remove a control from this group.
     */
    removeControl(name: string): void;
    /**
     * Mark the named control as non-optional.
     */
    include(controlName: string): void;
    /**
     * Mark the named control as optional.
     */
    exclude(controlName: string): void;
    /**
     * Check whether there is a control with the given name in the group.
     */
    contains(controlName: string): boolean;
    /** @internal */
    _setParentForControls(): void;
    /** @internal */
    _updateValue(): void;
    /** @internal */
    _anyControlsHaveStatus(status: string): boolean;
    /** @internal */
    _reduceValue(): any;
    /** @internal */
    _reduceChildren(initValue: any, fn: Function): any;
    /** @internal */
    _included(controlName: string): boolean;
  }
  /**
   * Defines a part of a form, of variable length, that can contain other controls.
   *
   * A `ControlArray` aggregates the values and errors of each {@link Control} in the group. Thus, if
   * one of the controls in a group is invalid, the entire group is invalid. Similarly, if a control
   * changes its value, the entire group changes as well.
   *
   * `ControlArray` is one of the three fundamental building blocks used to define forms in Angular,
   * along with {@link Control} and {@link ControlGroup}. {@link ControlGroup} can also contain
   * other controls, but is of fixed length.
   *
   * ## Adding or removing controls
   *
   * To change the controls in the array, use the `push`, `insert`, or `removeAt` methods
   * in `ControlArray` itself. These methods ensure the controls are properly tracked in the
   * form's hierarchy. Do not modify the array of `AbstractControl`s used to instantiate
   * the `ControlArray` directly, as that will result in strange and unexpected behavior such
   * as broken change detection.
   *
   * ### Example ([live demo](http://plnkr.co/edit/23DESOpbNnBpBHZt1BR4?p=preview))
   */
  export class ControlArray extends AbstractControl {
    controls: AbstractControl[];
    constructor(controls: AbstractControl[], validator?: ValidatorFn, asyncValidator?: AsyncValidatorFn);
    /**
     * Get the {@link AbstractControl} at the given `index` in the array.
     */
    at(index: number): AbstractControl;
    /**
     * Insert a new {@link AbstractControl} at the end of the array.
     */
    push(control: AbstractControl): void;
    /**
     * Insert a new {@link AbstractControl} at the given `index` in the array.
     */
    insert(index: number, control: AbstractControl): void;
    /**
     * Remove the control at the given `index` in the array.
     */
    removeAt(index: number): void;
    /**
     * Length of the control array.
     */
    length: number;
    /** @internal */
    _updateValue(): void;
    /** @internal */
    _anyControlsHaveStatus(status: string): boolean;
    /** @internal */
    _setParentForControls(): void;
  }
}
declare module "angular2/src/common/forms/directives/abstract_control_directive" {
  import { AbstractControl } from "angular2/src/common/forms/model";
  /**
   * Base class for control directives.
   *
   * Only used internally in the forms module.
   */
  export abstract class AbstractControlDirective {
    control: AbstractControl;
    value: any;
    valid: boolean;
    errors: {
      [key: string]: any;
    };
    pristine: boolean;
    dirty: boolean;
    touched: boolean;
    untouched: boolean;
    path: string[];
  }
}
declare module "angular2/src/common/forms/directives/control_value_accessor" {
  import { OpaqueToken } from "angular2/core";
  /**
   * A bridge between a control and a native element.
   *
   * A `ControlValueAccessor` abstracts the operations of writing a new value to a
   * DOM element representing an input control.
   *
   * Please see {@link DefaultValueAccessor} for more information.
   */
  export interface ControlValueAccessor {
    /**
     * Write a new value to the element.
     */
    writeValue(obj: any): void;
    /**
     * Set the function to be called when the control receives a change event.
     */
    registerOnChange(fn: any): void;
    /**
     * Set the function to be called when the control receives a touch event.
     */
    registerOnTouched(fn: any): void;
  }
  /**
   * Used to provide a {@link ControlValueAccessor} for form controls.
   *
   * See {@link DefaultValueAccessor} for how to implement one.
   */
  export const NG_VALUE_ACCESSOR: OpaqueToken;
}
declare module "angular2/src/common/forms/directives/ng_control" {
  import { ControlValueAccessor } from "angular2/src/common/forms/directives/control_value_accessor";
  import { AbstractControlDirective } from "angular2/src/common/forms/directives/abstract_control_directive";
  import { AsyncValidatorFn, ValidatorFn } from "angular2/src/common/forms/directives/validators";
  /**
   * A base class that all control directive extend.
   * It binds a {@link Control} object to a DOM element.
   *
   * Used internally by Angular forms.
   */
  export abstract class NgControl extends AbstractControlDirective {
    name: string;
    valueAccessor: ControlValueAccessor;
    validator: ValidatorFn;
    asyncValidator: AsyncValidatorFn;
    abstract viewToModelUpdate(newValue: any): void;
  }
}
declare module "angular2/src/common/forms/directives/control_container" {
  import { Form } from "angular2/src/common/forms/directives/form_interface";
  import { AbstractControlDirective } from "angular2/src/common/forms/directives/abstract_control_directive";
  /**
   * A directive that contains multiple {@link NgControl}s.
   *
   * Only used by the forms module.
   */
  export class ControlContainer extends AbstractControlDirective {
    name: string;
    /**
     * Get the form to which this container belongs.
     */
    formDirective: Form;
    /**
     * Get the path to this container.
     */
    path: string[];
  }
}
declare module "angular2/src/common/forms/directives/default_value_accessor" {
  import { ElementRef, Renderer } from "angular2/core";
  import { ControlValueAccessor } from "angular2/src/common/forms/directives/control_value_accessor";
  /**
   * The default accessor for writing a value and listening to changes that is used by the
   * {@link NgModel}, {@link NgFormControl}, and {@link NgControlName} directives.
   *
   *  ### Example
   *  ```
   *  <input type="text" ngControl="searchQuery">
   *  ```
   */
  export class DefaultValueAccessor implements ControlValueAccessor {
    private _renderer;
    private _elementRef;
    onChange: (_: any) => void;
    onTouched: () => void;
    constructor(_renderer: Renderer, _elementRef: ElementRef);
    writeValue(value: any): void;
    registerOnChange(fn: (_: any) => void): void;
    registerOnTouched(fn: () => void): void;
  }
}
declare module "angular2/src/common/forms/directives/number_value_accessor" {
  import { ElementRef, Renderer } from "angular2/core";
  import { ControlValueAccessor } from "angular2/src/common/forms/directives/control_value_accessor";
  /**
   * The accessor for writing a number value and listening to changes that is used by the
   * {@link NgModel}, {@link NgFormControl}, and {@link NgControlName} directives.
   *
   *  ### Example
   *  ```
   *  <input type="number" [(ngModel)]="age">
   *  ```
   */
  export class NumberValueAccessor implements ControlValueAccessor {
    private _renderer;
    private _elementRef;
    onChange: (_: any) => void;
    onTouched: () => void;
    constructor(_renderer: Renderer, _elementRef: ElementRef);
    writeValue(value: number): void;
    registerOnChange(fn: (_: number) => void): void;
    registerOnTouched(fn: () => void): void;
  }
}
declare module "angular2/src/common/forms/directives/checkbox_value_accessor" {
  import { Renderer, ElementRef } from "angular2/core";
  import { ControlValueAccessor } from "angular2/src/common/forms/directives/control_value_accessor";
  /**
   * The accessor for writing a value and listening to changes on a checkbox input element.
   *
   *  ### Example
   *  ```
   *  <input type="checkbox" ngControl="rememberLogin">
   *  ```
   */
  export class CheckboxControlValueAccessor implements ControlValueAccessor {
    private _renderer;
    private _elementRef;
    onChange: (_: any) => void;
    onTouched: () => void;
    constructor(_renderer: Renderer, _elementRef: ElementRef);
    writeValue(value: any): void;
    registerOnChange(fn: (_: any) => {}): void;
    registerOnTouched(fn: () => {}): void;
  }
}
declare module "angular2/src/common/forms/directives/select_control_value_accessor" {
  import { Renderer, ElementRef, QueryList } from "angular2/core";
  import { ControlValueAccessor } from "angular2/src/common/forms/directives/control_value_accessor";
  /**
   * Marks `<option>` as dynamic, so Angular can be notified when options change.
   *
   * ### Example
   *
   * ```
   * <select ngControl="city">
   *   <option *ngFor="#c of cities" [value]="c"></option>
   * </select>
   * ```
   */
  export class NgSelectOption {
  }
  /**
   * The accessor for writing a value and listening to changes on a select element.
   */
  export class SelectControlValueAccessor implements ControlValueAccessor {
    private _renderer;
    private _elementRef;
    value: string;
    onChange: (_: any) => void;
    onTouched: () => void;
    constructor(_renderer: Renderer, _elementRef: ElementRef, query: QueryList<NgSelectOption>);
    writeValue(value: any): void;
    registerOnChange(fn: () => any): void;
    registerOnTouched(fn: () => any): void;
    private _updateValueWhenListOfOptionsChanges(query);
  }
}
declare module "angular2/src/common/forms/directives/radio_control_value_accessor" {
  import { ElementRef, Renderer, OnInit, OnDestroy, Injector } from "angular2/core";
  import { ControlValueAccessor } from "angular2/src/common/forms/directives/control_value_accessor";
  import { NgControl } from "angular2/src/common/forms/directives/ng_control";
  /**
   * Internal class used by Angular to uncheck radio buttons with the matching name.
   */
  export class RadioControlRegistry {
    private _accessors;
    add(control: NgControl, accessor: RadioControlValueAccessor): void;
    remove(accessor: RadioControlValueAccessor): void;
    select(accessor: RadioControlValueAccessor): void;
  }
  /**
   * The value provided by the forms API for radio buttons.
   */
  export class RadioButtonState {
    checked: boolean;
    value: string;
    constructor(checked: boolean, value: string);
  }
  /**
   * The accessor for writing a radio control value and listening to changes that is used by the
   * {@link NgModel}, {@link NgFormControl}, and {@link NgControlName} directives.
   *
   *  ### Example
   *  ```
   *  @Component({
   *    template: `
   *      <input type="radio" name="food" [(ngModel)]="foodChicken">
   *      <input type="radio" name="food" [(ngModel)]="foodFish">
   *    `
   *  })
   *  class FoodCmp {
   *    foodChicken = new RadioButtonState(true, "chicken");
   *    foodFish = new RadioButtonState(false, "fish");
   *  }
   *  ```
   */
  export class RadioControlValueAccessor implements ControlValueAccessor, OnDestroy, OnInit {
    private _renderer;
    private _elementRef;
    private _registry;
    private _injector;
    _state: RadioButtonState;
    _control: NgControl;
    name: string;
    _fn: Function;
    onChange: () => void;
    onTouched: () => void;
    constructor(_renderer: Renderer, _elementRef: ElementRef, _registry: RadioControlRegistry, _injector: Injector);
    ngOnInit(): void;
    ngOnDestroy(): void;
    writeValue(value: any): void;
    registerOnChange(fn: (_: any) => {}): void;
    fireUncheck(): void;
    registerOnTouched(fn: () => {}): void;
  }
}
declare module "angular2/src/common/forms/directives/normalize_validator" {
  import { Validator, ValidatorFn, AsyncValidatorFn } from "angular2/src/common/forms/directives/validators";
  export function normalizeValidator(validator: ValidatorFn | Validator): ValidatorFn;
  export function normalizeAsyncValidator(validator: AsyncValidatorFn | Validator): AsyncValidatorFn;
}
declare module "angular2/src/common/forms/directives/shared" {
  import { ControlContainer } from "angular2/src/common/forms/directives/control_container";
  import { NgControl } from "angular2/src/common/forms/directives/ng_control";
  import { NgControlGroup } from "angular2/src/common/forms/directives/ng_control_group";
  import { Control, ControlGroup } from "angular2/src/common/forms/model";
  import { ControlValueAccessor } from "angular2/src/common/forms/directives/control_value_accessor";
  import { ValidatorFn, AsyncValidatorFn } from "angular2/src/common/forms/directives/validators";
  export function controlPath(name: string, parent: ControlContainer): string[];
  export function setUpControl(control: Control, dir: NgControl): void;
  export function setUpControlGroup(control: ControlGroup, dir: NgControlGroup): void;
  export function composeValidators(validators: any[]): ValidatorFn;
  export function composeAsyncValidators(validators: any[]): AsyncValidatorFn;
  export function isPropertyUpdated(changes: {
    [key: string]: any;
  }, viewModel: any): boolean;
  export function selectValueAccessor(dir: NgControl, valueAccessors: ControlValueAccessor[]): ControlValueAccessor;
}
declare module "angular2/src/common/forms/directives/ng_control_group" {
  import { OnInit, OnDestroy } from "angular2/core";
  import { ControlContainer } from "angular2/src/common/forms/directives/control_container";
  import { ControlGroup } from "angular2/src/common/forms/model";
  import { Form } from "angular2/src/common/forms/directives/form_interface";
  import { AsyncValidatorFn, ValidatorFn } from "angular2/src/common/forms/directives/validators";
  /**
   * Creates and binds a control group to a DOM element.
   *
   * This directive can only be used as a child of {@link NgForm} or {@link NgFormModel}.
   *
   * ### Example ([live demo](http://plnkr.co/edit/7EJ11uGeaggViYM6T5nq?p=preview))
   *
   * ```typescript
   * @Component({
   *   selector: 'my-app',
   *   directives: [FORM_DIRECTIVES],
   * })
   * @View({
   *   template: `
   *     <div>
   *       <h2>Angular2 Control &amp; ControlGroup Example</h2>
   *       <form #f="ngForm">
   *         <div ngControlGroup="name" #cg-name="form">
   *           <h3>Enter your name:</h3>
   *           <p>First: <input ngControl="first" required></p>
   *           <p>Middle: <input ngControl="middle"></p>
   *           <p>Last: <input ngControl="last" required></p>
   *         </div>
   *         <h3>Name value:</h3>
   *         <pre>{{valueOf(cgName)}}</pre>
   *         <p>Name is {{cgName?.control?.valid ? "valid" : "invalid"}}</p>
   *         <h3>What's your favorite food?</h3>
   *         <p><input ngControl="food"></p>
   *         <h3>Form value</h3>
   *         <pre>{{valueOf(f)}}</pre>
   *       </form>
   *     </div>
   *   `,
   *   directives: [FORM_DIRECTIVES]
   * })
   * export class App {
   *   valueOf(cg: NgControlGroup): string {
   *     if (cg.control == null) {
   *       return null;
   *     }
   *     return JSON.stringify(cg.control.value, null, 2);
   *   }
   * }
   * ```
   *
   * This example declares a control group for a user's name. The value and validation state of
   * this group can be accessed separately from the overall form.
   */
  export class NgControlGroup extends ControlContainer implements OnInit, OnDestroy {
    private _validators;
    private _asyncValidators;
    /** @internal */
    _parent: ControlContainer;
    constructor(parent: ControlContainer, _validators: any[], _asyncValidators: any[]);
    ngOnInit(): void;
    ngOnDestroy(): void;
    /**
     * Get the {@link ControlGroup} backing this binding.
     */
    control: ControlGroup;
    /**
     * Get the path to this control group.
     */
    path: string[];
    /**
     * Get the {@link Form} to which this group belongs.
     */
    formDirective: Form;
    validator: ValidatorFn;
    asyncValidator: AsyncValidatorFn;
  }
}
declare module "angular2/src/common/forms/directives/form_interface" {
  import { NgControl } from "angular2/src/common/forms/directives/ng_control";
  import { NgControlGroup } from "angular2/src/common/forms/directives/ng_control_group";
  import { Control, ControlGroup } from "angular2/src/common/forms/model";
  /**
   * An interface that {@link NgFormModel} and {@link NgForm} implement.
   *
   * Only used by the forms module.
   */
  export interface Form {
    /**
     * Add a control to this form.
     */
    addControl(dir: NgControl): void;
    /**
     * Remove a control from this form.
     */
    removeControl(dir: NgControl): void;
    /**
     * Look up the {@link Control} associated with a particular {@link NgControl}.
     */
    getControl(dir: NgControl): Control;
    /**
     * Add a group of controls to this form.
     */
    addControlGroup(dir: NgControlGroup): void;
    /**
     * Remove a group of controls from this form.
     */
    removeControlGroup(dir: NgControlGroup): void;
    /**
     * Look up the {@link ControlGroup} associated with a particular {@link NgControlGroup}.
     */
    getControlGroup(dir: NgControlGroup): ControlGroup;
    /**
     * Update the model for a particular control with a new value.
     */
    updateModel(dir: NgControl, value: any): void;
  }
}
declare module "angular2/src/common/forms/directives/ng_control_name" {
  import { EventEmitter } from "angular2/src/facade/async";
  import { OnChanges, OnDestroy, SimpleChange } from "angular2/core";
  import { ControlContainer } from "angular2/src/common/forms/directives/control_container";
  import { NgControl } from "angular2/src/common/forms/directives/ng_control";
  import { ControlValueAccessor } from "angular2/src/common/forms/directives/control_value_accessor";
  import { Control } from "angular2/src/common/forms/model";
  import { ValidatorFn, AsyncValidatorFn } from "angular2/src/common/forms/directives/validators";
  /**
   * Creates and binds a control with a specified name to a DOM element.
   *
   * This directive can only be used as a child of {@link NgForm} or {@link NgFormModel}.
  
   * ### Example
   *
   * In this example, we create the login and password controls.
   * We can work with each control separately: check its validity, get its value, listen to its
   * changes.
   *
   *  ```
   * @Component({
   *      selector: "login-comp",
   *      directives: [FORM_DIRECTIVES],
   *      template: `
   *        <form #f="ngForm" (submit)='onLogIn(f.value)'>
   *          Login <input type='text' ngControl='login' #l="form">
   *          <div *ngIf="!l.valid">Login is invalid</div>
   *
   *          Password <input type='password' ngControl='password'>
   *          <button type='submit'>Log in!</button>
   *        </form>
   *      `})
   * class LoginComp {
   *  onLogIn(value): void {
   *    // value === {login: 'some login', password: 'some password'}
   *  }
   * }
   *  ```
   *
   * We can also use ngModel to bind a domain model to the form.
   *
   *  ```
   * @Component({
   *      selector: "login-comp",
   *      directives: [FORM_DIRECTIVES],
   *      template: `
   *        <form (submit)='onLogIn()'>
   *          Login <input type='text' ngControl='login' [(ngModel)]="credentials.login">
   *          Password <input type='password' ngControl='password'
   *                          [(ngModel)]="credentials.password">
   *          <button type='submit'>Log in!</button>
   *        </form>
   *      `})
   * class LoginComp {
   *  credentials: {login:string, password:string};
   *
   *  onLogIn(): void {
   *    // this.credentials.login === "some login"
   *    // this.credentials.password === "some password"
   *  }
   * }
   *  ```
   */
  export class NgControlName extends NgControl implements OnChanges, OnDestroy {
    private _parent;
    private _validators;
    private _asyncValidators;
    /** @internal */
    update: EventEmitter<{}>;
    model: any;
    viewModel: any;
    private _added;
    constructor(_parent: ControlContainer, _validators: any[], _asyncValidators: any[], valueAccessors: ControlValueAccessor[]);
    ngOnChanges(changes: {
      [key: string]: SimpleChange;
    }): void;
    ngOnDestroy(): void;
    viewToModelUpdate(newValue: any): void;
    path: string[];
    formDirective: any;
    validator: ValidatorFn;
    asyncValidator: AsyncValidatorFn;
    control: Control;
  }
}
declare module "angular2/src/common/forms/directives/ng_form_control" {
  import { EventEmitter } from "angular2/src/facade/async";
  import { OnChanges, SimpleChange } from "angular2/core";
  import { NgControl } from "angular2/src/common/forms/directives/ng_control";
  import { Control } from "angular2/src/common/forms/model";
  import { ControlValueAccessor } from "angular2/src/common/forms/directives/control_value_accessor";
  import { ValidatorFn, AsyncValidatorFn } from "angular2/src/common/forms/directives/validators";
  /**
   * Binds an existing {@link Control} to a DOM element.
   *
   * ### Example ([live demo](http://plnkr.co/edit/jcQlZ2tTh22BZZ2ucNAT?p=preview))
   *
   * In this example, we bind the control to an input element. When the value of the input element
   * changes, the value of the control will reflect that change. Likewise, if the value of the
   * control changes, the input element reflects that change.
   *
   *  ```typescript
   * @Component({
   *   selector: 'my-app',
   *   template: `
   *     <div>
   *       <h2>NgFormControl Example</h2>
   *       <form>
   *         <p>Element with existing control: <input type="text"
   * [ngFormControl]="loginControl"></p>
   *         <p>Value of existing control: {{loginControl.value}}</p>
   *       </form>
   *     </div>
   *   `,
   *   directives: [CORE_DIRECTIVES, FORM_DIRECTIVES]
   * })
   * export class App {
   *   loginControl: Control = new Control('');
   * }
   *  ```
   *
   * ###ngModel
   *
   * We can also use `ngModel` to bind a domain model to the form.
   *
   * ### Example ([live demo](http://plnkr.co/edit/yHMLuHO7DNgT8XvtjTDH?p=preview))
   *
   *  ```typescript
   * @Component({
   *      selector: "login-comp",
   *      directives: [FORM_DIRECTIVES],
   *      template: "<input type='text' [ngFormControl]='loginControl' [(ngModel)]='login'>"
   *      })
   * class LoginComp {
   *  loginControl: Control = new Control('');
   *  login:string;
   * }
   *  ```
   */
  export class NgFormControl extends NgControl implements OnChanges {
    private _validators;
    private _asyncValidators;
    form: Control;
    update: EventEmitter<{}>;
    model: any;
    viewModel: any;
    constructor(_validators: any[], _asyncValidators: any[], valueAccessors: ControlValueAccessor[]);
    ngOnChanges(changes: {
      [key: string]: SimpleChange;
    }): void;
    path: string[];
    validator: ValidatorFn;
    asyncValidator: AsyncValidatorFn;
    control: Control;
    viewToModelUpdate(newValue: any): void;
    private _isControlChanged(changes);
  }
}
declare module "angular2/src/common/forms/directives/ng_model" {
  import { EventEmitter } from "angular2/src/facade/async";
  import { OnChanges, SimpleChange } from "angular2/core";
  import { ControlValueAccessor } from "angular2/src/common/forms/directives/control_value_accessor";
  import { NgControl } from "angular2/src/common/forms/directives/ng_control";
  import { Control } from "angular2/src/common/forms/model";
  import { ValidatorFn, AsyncValidatorFn } from "angular2/src/common/forms/directives/validators";
  /**
   * Binds a domain model to a form control.
   *
   * ### Usage
   *
   * `ngModel` binds an existing domain model to a form control. For a
   * two-way binding, use `[(ngModel)]` to ensure the model updates in
   * both directions.
   *
   * ### Example ([live demo](http://plnkr.co/edit/R3UX5qDaUqFO2VYR0UzH?p=preview))
   *  ```typescript
   * @Component({
   *      selector: "search-comp",
   *      directives: [FORM_DIRECTIVES],
   *      template: `<input type='text' [(ngModel)]="searchQuery">`
   *      })
   * class SearchComp {
   *  searchQuery: string;
   * }
   *  ```
   */
  export class NgModel extends NgControl implements OnChanges {
    private _validators;
    private _asyncValidators;
    /** @internal */
    _control: Control;
    /** @internal */
    _added: boolean;
    update: EventEmitter<{}>;
    model: any;
    viewModel: any;
    constructor(_validators: any[], _asyncValidators: any[], valueAccessors: ControlValueAccessor[]);
    ngOnChanges(changes: {
      [key: string]: SimpleChange;
    }): void;
    control: Control;
    path: string[];
    validator: ValidatorFn;
    asyncValidator: AsyncValidatorFn;
    viewToModelUpdate(newValue: any): void;
  }
}
declare module "angular2/src/common/forms/directives/ng_form_model" {
  import { EventEmitter } from "angular2/src/facade/async";
  import { SimpleChange, OnChanges } from "angular2/core";
  import { NgControl } from "angular2/src/common/forms/directives/ng_control";
  import { NgControlGroup } from "angular2/src/common/forms/directives/ng_control_group";
  import { ControlContainer } from "angular2/src/common/forms/directives/control_container";
  import { Form } from "angular2/src/common/forms/directives/form_interface";
  import { Control, ControlGroup } from "angular2/src/common/forms/model";
  /**
   * Binds an existing control group to a DOM element.
   *
   * ### Example ([live demo](http://plnkr.co/edit/jqrVirudY8anJxTMUjTP?p=preview))
   *
   * In this example, we bind the control group to the form element, and we bind the login and
   * password controls to the login and password elements.
   *
   *  ```typescript
   * @Component({
   *   selector: 'my-app',
   *   template: `
   *     <div>
   *       <h2>NgFormModel Example</h2>
   *       <form [ngFormModel]="loginForm">
   *         <p>Login: <input type="text" ngControl="login"></p>
   *         <p>Password: <input type="password" ngControl="password"></p>
   *       </form>
   *       <p>Value:</p>
   *       <pre>{{value}}</pre>
   *     </div>
   *   `,
   *   directives: [FORM_DIRECTIVES]
   * })
   * export class App {
   *   loginForm: ControlGroup;
   *
   *   constructor() {
   *     this.loginForm = new ControlGroup({
   *       login: new Control(""),
   *       password: new Control("")
   *     });
   *   }
   *
   *   get value(): string {
   *     return JSON.stringify(this.loginForm.value, null, 2);
   *   }
   * }
   *  ```
   *
   * We can also use ngModel to bind a domain model to the form.
   *
   *  ```typescript
   * @Component({
   *      selector: "login-comp",
   *      directives: [FORM_DIRECTIVES],
   *      template: `
   *        <form [ngFormModel]='loginForm'>
   *          Login <input type='text' ngControl='login' [(ngModel)]='credentials.login'>
   *          Password <input type='password' ngControl='password'
   *                          [(ngModel)]='credentials.password'>
   *          <button (click)="onLogin()">Login</button>
   *        </form>`
   *      })
   * class LoginComp {
   *  credentials: {login: string, password: string};
   *  loginForm: ControlGroup;
   *
   *  constructor() {
   *    this.loginForm = new ControlGroup({
   *      login: new Control(""),
   *      password: new Control("")
   *    });
   *  }
   *
   *  onLogin(): void {
   *    // this.credentials.login === 'some login'
   *    // this.credentials.password === 'some password'
   *  }
   * }
   *  ```
   */
  export class NgFormModel extends ControlContainer implements Form, OnChanges {
    private _validators;
    private _asyncValidators;
    form: ControlGroup;
    directives: NgControl[];
    ngSubmit: EventEmitter<{}>;
    constructor(_validators: any[], _asyncValidators: any[]);
    ngOnChanges(changes: {
      [key: string]: SimpleChange;
    }): void;
    formDirective: Form;
    control: ControlGroup;
    path: string[];
    addControl(dir: NgControl): void;
    getControl(dir: NgControl): Control;
    removeControl(dir: NgControl): void;
    addControlGroup(dir: NgControlGroup): void;
    removeControlGroup(dir: NgControlGroup): void;
    getControlGroup(dir: NgControlGroup): ControlGroup;
    updateModel(dir: NgControl, value: any): void;
    onSubmit(): boolean;
    /** @internal */
    _updateDomValue(): void;
  }
}
declare module "angular2/src/common/forms/directives/ng_form" {
  import { EventEmitter } from "angular2/src/facade/async";
  import { NgControl } from "angular2/src/common/forms/directives/ng_control";
  import { Form } from "angular2/src/common/forms/directives/form_interface";
  import { NgControlGroup } from "angular2/src/common/forms/directives/ng_control_group";
  import { ControlContainer } from "angular2/src/common/forms/directives/control_container";
  import { AbstractControl, ControlGroup, Control } from "angular2/src/common/forms/model";
  /**
   * If `NgForm` is bound in a component, `<form>` elements in that component will be
   * upgraded to use the Angular form system.
   *
   * ### Typical Use
   *
   * Include `FORM_DIRECTIVES` in the `directives` section of a {@link View} annotation
   * to use `NgForm` and its associated controls.
   *
   * ### Structure
   *
   * An Angular form is a collection of `Control`s in some hierarchy.
   * `Control`s can be at the top level or can be organized in `ControlGroup`s
   * or `ControlArray`s. This hierarchy is reflected in the form's `value`, a
   * JSON object that mirrors the form structure.
   *
   * ### Submission
   *
   * The `ngSubmit` event signals when the user triggers a form submission.
   *
   * ### Example ([live demo](http://plnkr.co/edit/ltdgYj4P0iY64AR71EpL?p=preview))
   *
   *  ```typescript
   * @Component({
   *   selector: 'my-app',
   *   template: `
   *     <div>
   *       <p>Submit the form to see the data object Angular builds</p>
   *       <h2>NgForm demo</h2>
   *       <form #f="ngForm" (ngSubmit)="onSubmit(f.value)">
   *         <h3>Control group: credentials</h3>
   *         <div ngControlGroup="credentials">
   *           <p>Login: <input type="text" ngControl="login"></p>
   *           <p>Password: <input type="password" ngControl="password"></p>
   *         </div>
   *         <h3>Control group: person</h3>
   *         <div ngControlGroup="person">
   *           <p>First name: <input type="text" ngControl="firstName"></p>
   *           <p>Last name: <input type="text" ngControl="lastName"></p>
   *         </div>
   *         <button type="submit">Submit Form</button>
   *       <p>Form data submitted:</p>
   *       </form>
   *       <pre>{{data}}</pre>
   *     </div>
   * `,
   *   directives: [CORE_DIRECTIVES, FORM_DIRECTIVES]
   * })
   * export class App {
   *   constructor() {}
   *
   *   data: string;
   *
   *   onSubmit(data) {
   *     this.data = JSON.stringify(data, null, 2);
   *   }
   * }
   *  ```
   */
  export class NgForm extends ControlContainer implements Form {
    form: ControlGroup;
    ngSubmit: EventEmitter<{}>;
    constructor(validators: any[], asyncValidators: any[]);
    formDirective: Form;
    control: ControlGroup;
    path: string[];
    controls: {
      [key: string]: AbstractControl;
    };
    addControl(dir: NgControl): void;
    getControl(dir: NgControl): Control;
    removeControl(dir: NgControl): void;
    addControlGroup(dir: NgControlGroup): void;
    removeControlGroup(dir: NgControlGroup): void;
    getControlGroup(dir: NgControlGroup): ControlGroup;
    updateModel(dir: NgControl, value: any): void;
    onSubmit(): boolean;
    /** @internal */
    _findContainer(path: string[]): ControlGroup;
  }
}
declare module "angular2/src/common/forms/directives/ng_control_status" {
  import { NgControl } from "angular2/src/common/forms/directives/ng_control";
  /**
   * Directive automatically applied to Angular forms that sets CSS classes
   * based on control status (valid/invalid/dirty/etc).
   */
  export class NgControlStatus {
    private _cd;
    constructor(cd: NgControl);
    ngClassUntouched: boolean;
    ngClassTouched: boolean;
    ngClassPristine: boolean;
    ngClassDirty: boolean;
    ngClassValid: boolean;
    ngClassInvalid: boolean;
  }
}
declare module "angular2/src/common/forms/directives" {
  import { Type } from "angular2/src/facade/lang";
  export { NgControlName } from "angular2/src/common/forms/directives/ng_control_name";
  export { NgFormControl } from "angular2/src/common/forms/directives/ng_form_control";
  export { NgModel } from "angular2/src/common/forms/directives/ng_model";
  export { NgControlGroup } from "angular2/src/common/forms/directives/ng_control_group";
  export { NgFormModel } from "angular2/src/common/forms/directives/ng_form_model";
  export { NgForm } from "angular2/src/common/forms/directives/ng_form";
  export { DefaultValueAccessor } from "angular2/src/common/forms/directives/default_value_accessor";
  export { CheckboxControlValueAccessor } from "angular2/src/common/forms/directives/checkbox_value_accessor";
  export { RadioControlValueAccessor, RadioButtonState } from "angular2/src/common/forms/directives/radio_control_value_accessor";
  export { NumberValueAccessor } from "angular2/src/common/forms/directives/number_value_accessor";
  export { NgControlStatus } from "angular2/src/common/forms/directives/ng_control_status";
  export { SelectControlValueAccessor, NgSelectOption } from "angular2/src/common/forms/directives/select_control_value_accessor";
  export { RequiredValidator, MinLengthValidator, MaxLengthValidator, PatternValidator } from "angular2/src/common/forms/directives/validators";
  export { NgControl } from "angular2/src/common/forms/directives/ng_control";
  export { ControlValueAccessor } from "angular2/src/common/forms/directives/control_value_accessor";
  /**
   *
   * A list of all the form directives used as part of a `@View` annotation.
   *
   *  This is a shorthand for importing them each individually.
   *
   * ### Example
   *
   * ```typescript
   * @Component({
   *   selector: 'my-app',
   *   directives: [FORM_DIRECTIVES]
   * })
   * class MyApp {}
   * ```
   */
  export const FORM_DIRECTIVES: Type[];
}
declare module "angular2/src/common/forms/form_builder" {
  import * as modelModule from "angular2/src/common/forms/model";
  import { ValidatorFn, AsyncValidatorFn } from "angular2/src/common/forms/directives/validators";
  /**
   * Creates a form object from a user-specified configuration.
   *
   * ### Example ([live demo](http://plnkr.co/edit/ENgZo8EuIECZNensZCVr?p=preview))
   *
   * ```typescript
   * @Component({
   *   selector: 'my-app',
   *   viewBindings: [FORM_BINDINGS]
   *   template: `
   *     <form [ngFormModel]="loginForm">
   *       <p>Login <input ngControl="login"></p>
   *       <div ngControlGroup="passwordRetry">
   *         <p>Password <input type="password" ngControl="password"></p>
   *         <p>Confirm password <input type="password" ngControl="passwordConfirmation"></p>
   *       </div>
   *     </form>
   *     <h3>Form value:</h3>
   *     <pre>{{value}}</pre>
   *   `,
   *   directives: [FORM_DIRECTIVES]
   * })
   * export class App {
   *   loginForm: ControlGroup;
   *
   *   constructor(builder: FormBuilder) {
   *     this.loginForm = builder.group({
   *       login: ["", Validators.required],
   *       passwordRetry: builder.group({
   *         password: ["", Validators.required],
   *         passwordConfirmation: ["", Validators.required, asyncValidator]
   *       })
   *     });
   *   }
   *
   *   get value(): string {
   *     return JSON.stringify(this.loginForm.value, null, 2);
   *   }
   * }
   * ```
   */
  export class FormBuilder {
    /**
     * Construct a new {@link ControlGroup} with the given map of configuration.
     * Valid keys for the `extra` parameter map are `optionals` and `validator`.
     *
     * See the {@link ControlGroup} constructor for more details.
     */
    group(controlsConfig: {
      [key: string]: any;
    }, extra?: {
      [key: string]: any;
    }): modelModule.ControlGroup;
    /**
     * Construct a new {@link Control} with the given `value`,`validator`, and `asyncValidator`.
     */
    control(value: Object, validator?: ValidatorFn, asyncValidator?: AsyncValidatorFn): modelModule.Control;
    /**
     * Construct an array of {@link Control}s from the given `controlsConfig` array of
     * configuration, with the given optional `validator` and `asyncValidator`.
     */
    array(controlsConfig: any[], validator?: ValidatorFn, asyncValidator?: AsyncValidatorFn): modelModule.ControlArray;
    /** @internal */
    _reduceControls(controlsConfig: {
      [k: string]: any;
    }): {
        [key: string]: modelModule.AbstractControl;
      };
    /** @internal */
    _createControl(controlConfig: any): modelModule.AbstractControl;
  }
}
declare module "angular2/src/common/forms" {
  /**
   * @module
   * @description
   * This module is used for handling user input, by defining and building a {@link ControlGroup} that
   * consists of
   * {@link Control} objects, and mapping them onto the DOM. {@link Control} objects can then be used
   * to read information
   * from the form DOM elements.
   *
   * This module is not included in the `angular2` module; you must import the forms module
   * explicitly.
   *
   */
  export { AbstractControl, Control, ControlGroup, ControlArray } from "angular2/src/common/forms/model";
  export { AbstractControlDirective } from "angular2/src/common/forms/directives/abstract_control_directive";
  export { Form } from "angular2/src/common/forms/directives/form_interface";
  export { ControlContainer } from "angular2/src/common/forms/directives/control_container";
  export { NgControlName } from "angular2/src/common/forms/directives/ng_control_name";
  export { NgFormControl } from "angular2/src/common/forms/directives/ng_form_control";
  export { NgModel } from "angular2/src/common/forms/directives/ng_model";
  export { NgControl } from "angular2/src/common/forms/directives/ng_control";
  export { NgControlGroup } from "angular2/src/common/forms/directives/ng_control_group";
  export { NgFormModel } from "angular2/src/common/forms/directives/ng_form_model";
  export { NgForm } from "angular2/src/common/forms/directives/ng_form";
  export { ControlValueAccessor, NG_VALUE_ACCESSOR } from "angular2/src/common/forms/directives/control_value_accessor";
  export { DefaultValueAccessor } from "angular2/src/common/forms/directives/default_value_accessor";
  export { NgControlStatus } from "angular2/src/common/forms/directives/ng_control_status";
  export { CheckboxControlValueAccessor } from "angular2/src/common/forms/directives/checkbox_value_accessor";
  export { NgSelectOption, SelectControlValueAccessor } from "angular2/src/common/forms/directives/select_control_value_accessor";
  export { FORM_DIRECTIVES, RadioButtonState } from "angular2/src/common/forms/directives";
  export { NG_VALIDATORS, NG_ASYNC_VALIDATORS, Validators } from "angular2/src/common/forms/validators";
  export { RequiredValidator, MinLengthValidator, MaxLengthValidator, PatternValidator, Validator } from "angular2/src/common/forms/directives/validators";
  export { FormBuilder } from "angular2/src/common/forms/form_builder";
  import { Type } from "angular2/src/facade/lang";
  /**
   * Shorthand set of providers used for building Angular forms.
   *
   * ### Example
   *
   * ```typescript
   * bootstrap(MyApp, [FORM_PROVIDERS]);
   * ```
   */
  export const FORM_PROVIDERS: Type[];
  /**
   * See {@link FORM_PROVIDERS} instead.
   *
   * @deprecated
   */
  export const FORM_BINDINGS: Type[];
}
declare module "angular2/src/common/common_directives" {
  import { Type } from "angular2/src/facade/lang";
  /**
   * A collection of Angular core directives that are likely to be used in each and every Angular
   * application. This includes core directives (e.g., NgIf and NgFor), and forms directives (e.g.,
   * NgModel).
   *
   * This collection can be used to quickly enumerate all the built-in directives in the `directives`
   * property of the `@Component` or `@View` decorators.
   *
   * ### Example
   *
   * Instead of writing:
   *
   * ```typescript
   * import {NgClass, NgIf, NgFor, NgSwitch, NgSwitchWhen, NgSwitchDefault, NgModel, NgForm} from
   * 'angular2/common';
   * import {OtherDirective} from './myDirectives';
   *
   * @Component({
   *   selector: 'my-component',
   *   templateUrl: 'myComponent.html',
   *   directives: [NgClass, NgIf, NgFor, NgSwitch, NgSwitchWhen, NgSwitchDefault, NgModel, NgForm,
   * OtherDirective]
   * })
   * export class MyComponent {
   *   ...
   * }
   * ```
   * one could import all the common directives at once:
   *
   * ```typescript
   * import {COMMON_DIRECTIVES} from 'angular2/common';
   * import {OtherDirective} from './myDirectives';
   *
   * @Component({
   *   selector: 'my-component',
   *   templateUrl: 'myComponent.html',
   *   directives: [COMMON_DIRECTIVES, OtherDirective]
   * })
   * export class MyComponent {
   *   ...
   * }
   * ```
   */
  export const COMMON_DIRECTIVES: Type[][];
}
declare module "angular2/common" {
  export * from "angular2/src/common/pipes";
  export * from "angular2/src/common/directives";
  export * from "angular2/src/common/forms";
  export * from "angular2/src/common/common_directives";
}
declare module "angular2/src/compiler/url_resolver" {
  import { Provider } from "angular2/src/core/di";
  /**
   * Create a {@link UrlResolver} with no package prefix.
   */
  export function createWithoutPackagePrefix(): UrlResolver;
  /**
   * A default provider for {@link PACKAGE_ROOT_URL} that maps to '/'.
   */
  export var DEFAULT_PACKAGE_URL_PROVIDER: Provider;
  /**
   * Used by the {@link Compiler} when resolving HTML and CSS template URLs.
   *
   * This class can be overridden by the application developer to create custom behavior.
   *
   * See {@link Compiler}
   *
   * ## Example
   *
   * {@example compiler/ts/url_resolver/url_resolver.ts region='url_resolver'}
   */
  export class UrlResolver {
    private _packagePrefix;
    constructor(packagePrefix?: string);
    /**
     * Resolves the `url` given the `baseUrl`:
     * - when the `url` is null, the `baseUrl` is returned,
     * - if `url` is relative ('path/to/here', './path/to/here'), the resolved url is a combination of
     * `baseUrl` and `url`,
     * - if `url` is absolute (it has a scheme: 'http://', 'https://' or start with '/'), the `url` is
     * returned as is (ignoring the `baseUrl`)
     *
     * @param {string} baseUrl
     * @param {string} url
     * @returns {string} the resolved URL
     */
    resolve(baseUrl: string, url: string): string;
  }
  /**
   * Extract the scheme of a URL.
   */
  export function getUrlScheme(url: string): string;
}
declare module "angular2/src/compiler/xhr" {
  /**
   * An interface for retrieving documents by URL that the compiler uses
   * to load templates.
   */
  export class XHR {
    get(url: string): Promise<string>;
  }
}
declare module "angular2/src/compiler/selector" {
  /**
   * A css selector contains an element name,
   * css classes and attribute/value pairs with the purpose
   * of selecting subsets out of them.
   */
  export class CssSelector {
    element: string;
    classNames: string[];
    attrs: string[];
    notSelectors: CssSelector[];
    static parse(selector: string): CssSelector[];
    isElementSelector(): boolean;
    setElement(element?: string): void;
    /** Gets a template string for an element that matches the selector. */
    getMatchingElementTemplate(): string;
    addAttribute(name: string, value?: string): void;
    addClassName(name: string): void;
    toString(): string;
  }
  /**
   * Reads a list of CssSelectors and allows to calculate which ones
   * are contained in a given CssSelector.
   */
  export class SelectorMatcher {
    static createNotMatcher(notSelectors: CssSelector[]): SelectorMatcher;
    private _elementMap;
    private _elementPartialMap;
    private _classMap;
    private _classPartialMap;
    private _attrValueMap;
    private _attrValuePartialMap;
    private _listContexts;
    addSelectables(cssSelectors: CssSelector[], callbackCtxt?: any): void;
    /**
     * Add an object that can be found later on by calling `match`.
     * @param cssSelector A css selector
     * @param callbackCtxt An opaque object that will be given to the callback of the `match` function
     */
    private _addSelectable(cssSelector, callbackCtxt, listContext);
    private _addTerminal(map, name, selectable);
    private _addPartial(map, name);
    /**
     * Find the objects that have been added via `addSelectable`
     * whose css selector is contained in the given css selector.
     * @param cssSelector A css selector
     * @param matchedCallback This callback will be called with the object handed into `addSelectable`
     * @return boolean true if a match was found
    */
    match(cssSelector: CssSelector, matchedCallback: (c: CssSelector, a: any) => void): boolean;
    /** @internal */
    _matchTerminal(map: Map<string, SelectorContext[]>, name: any, cssSelector: CssSelector, matchedCallback: (c: CssSelector, a: any) => void): boolean;
    /** @internal */
    _matchPartial(map: Map<string, SelectorMatcher>, name: any, cssSelector: CssSelector, matchedCallback: any): boolean;
  }
  export class SelectorListContext {
    selectors: CssSelector[];
    alreadyMatched: boolean;
    constructor(selectors: CssSelector[]);
  }
  export class SelectorContext {
    selector: CssSelector;
    cbContext: any;
    listContext: SelectorListContext;
    notSelectors: CssSelector[];
    constructor(selector: CssSelector, cbContext: any, listContext: SelectorListContext);
    finalize(cssSelector: CssSelector, callback: (c: CssSelector, a: any) => void): boolean;
  }
}
declare module "angular2/src/compiler/util" {
  export var MODULE_SUFFIX: string;
  export var CONST_VAR: string;
  export function camelCaseToDashCase(input: string): string;
  export function dashCaseToCamelCase(input: string): string;
  export function escapeSingleQuoteString(input: string): string;
  export function escapeDoubleQuoteString(input: string): string;
  export function codeGenExportVariable(name: string): string;
  export function codeGenConstConstructorCall(name: string): string;
  export function codeGenValueFn(params: string[], value: string, fnName?: string): string;
  export function codeGenFnHeader(params: string[], fnName?: string): string;
  export function codeGenToString(expr: string): string;
  export function splitAtColon(input: string, defaultValues: string[]): string[];
  export class Statement {
    statement: string;
    constructor(statement: string);
  }
  export class Expression {
    expression: string;
    isArray: boolean;
    constructor(expression: string, isArray?: boolean);
  }
  export function escapeValue(value: any): string;
  export function codeGenArray(data: any[]): string;
  export function codeGenFlatArray(values: any[]): string;
  export function codeGenStringMap(keyValueArray: any[][]): string;
  export function addAll(source: any[], target: any[]): void;
  export function flattenArray(source: any[], target: any[]): any[];
}
declare module "angular2/src/compiler/directive_metadata" {
  import { Type } from "angular2/src/facade/lang";
  import { ChangeDetectionStrategy } from "angular2/src/core/change_detection/change_detection";
  import { ViewEncapsulation } from "angular2/src/core/metadata/view";
  import { LifecycleHooks } from "angular2/src/core/linker/interfaces";
  export abstract class CompileMetadataWithIdentifier {
    static fromJson(data: {
      [key: string]: any;
    }): CompileMetadataWithIdentifier;
    abstract toJson(): {
      [key: string]: any;
    };
    identifier: CompileIdentifierMetadata;
  }
  export abstract class CompileMetadataWithType extends CompileMetadataWithIdentifier {
    static fromJson(data: {
      [key: string]: any;
    }): CompileMetadataWithType;
    abstract toJson(): {
      [key: string]: any;
    };
    type: CompileTypeMetadata;
    identifier: CompileIdentifierMetadata;
  }
  export class CompileIdentifierMetadata implements CompileMetadataWithIdentifier {
    runtime: any;
    name: string;
    prefix: string;
    moduleUrl: string;
    constConstructor: boolean;
    constructor({runtime, name, moduleUrl, prefix, constConstructor}?: {
      runtime?: any;
      name?: string;
      moduleUrl?: string;
      prefix?: string;
      constConstructor?: boolean;
    });
    static fromJson(data: {
      [key: string]: any;
    }): CompileIdentifierMetadata;
    toJson(): {
      [key: string]: any;
    };
    identifier: CompileIdentifierMetadata;
  }
  export class CompileDiDependencyMetadata {
    isAttribute: boolean;
    isSelf: boolean;
    isHost: boolean;
    isSkipSelf: boolean;
    isOptional: boolean;
    query: CompileQueryMetadata;
    viewQuery: CompileQueryMetadata;
    token: CompileIdentifierMetadata | string;
    constructor({isAttribute, isSelf, isHost, isSkipSelf, isOptional, query, viewQuery, token}?: {
      isAttribute?: boolean;
      isSelf?: boolean;
      isHost?: boolean;
      isSkipSelf?: boolean;
      isOptional?: boolean;
      query?: CompileQueryMetadata;
      viewQuery?: CompileQueryMetadata;
      token?: CompileIdentifierMetadata | string;
    });
    static fromJson(data: {
      [key: string]: any;
    }): CompileDiDependencyMetadata;
    toJson(): {
      [key: string]: any;
    };
  }
  export class CompileProviderMetadata {
    token: CompileIdentifierMetadata | string;
    useClass: CompileTypeMetadata;
    useValue: any;
    useExisting: CompileIdentifierMetadata | string;
    useFactory: CompileFactoryMetadata;
    deps: CompileDiDependencyMetadata[];
    multi: boolean;
    constructor({token, useClass, useValue, useExisting, useFactory, deps, multi}: {
      token?: CompileIdentifierMetadata | string;
      useClass?: CompileTypeMetadata;
      useValue?: any;
      useExisting?: CompileIdentifierMetadata | string;
      useFactory?: CompileFactoryMetadata;
      deps?: CompileDiDependencyMetadata[];
      multi?: boolean;
    });
    static fromJson(data: {
      [key: string]: any;
    }): CompileProviderMetadata;
    toJson(): {
      [key: string]: any;
    };
  }
  export class CompileFactoryMetadata implements CompileIdentifierMetadata {
    runtime: Function;
    name: string;
    prefix: string;
    moduleUrl: string;
    constConstructor: boolean;
    diDeps: CompileDiDependencyMetadata[];
    constructor({runtime, name, moduleUrl, constConstructor, diDeps}: {
      runtime?: Function;
      name?: string;
      moduleUrl?: string;
      constConstructor?: boolean;
      diDeps?: CompileDiDependencyMetadata[];
    });
    identifier: CompileIdentifierMetadata;
    toJson(): any;
  }
  /**
   * Metadata regarding compilation of a type.
   */
  export class CompileTypeMetadata implements CompileIdentifierMetadata, CompileMetadataWithType {
    runtime: Type;
    name: string;
    prefix: string;
    moduleUrl: string;
    isHost: boolean;
    constConstructor: boolean;
    diDeps: CompileDiDependencyMetadata[];
    constructor({runtime, name, moduleUrl, prefix, isHost, constConstructor, diDeps}?: {
      runtime?: Type;
      name?: string;
      moduleUrl?: string;
      prefix?: string;
      isHost?: boolean;
      constConstructor?: boolean;
      diDeps?: CompileDiDependencyMetadata[];
    });
    static fromJson(data: {
      [key: string]: any;
    }): CompileTypeMetadata;
    identifier: CompileIdentifierMetadata;
    type: CompileTypeMetadata;
    toJson(): {
      [key: string]: any;
    };
  }
  export class CompileQueryMetadata {
    selectors: Array<CompileIdentifierMetadata | string>;
    descendants: boolean;
    first: boolean;
    propertyName: string;
    constructor({selectors, descendants, first, propertyName}?: {
      selectors?: Array<CompileIdentifierMetadata | string>;
      descendants?: boolean;
      first?: boolean;
      propertyName?: string;
    });
    static fromJson(data: {
      [key: string]: any;
    }): CompileQueryMetadata;
    toJson(): {
      [key: string]: any;
    };
  }
  /**
   * Metadata regarding compilation of a template.
   */
  export class CompileTemplateMetadata {
    encapsulation: ViewEncapsulation;
    template: string;
    templateUrl: string;
    styles: string[];
    styleUrls: string[];
    ngContentSelectors: string[];
    constructor({encapsulation, template, templateUrl, styles, styleUrls, ngContentSelectors}?: {
      encapsulation?: ViewEncapsulation;
      template?: string;
      templateUrl?: string;
      styles?: string[];
      styleUrls?: string[];
      ngContentSelectors?: string[];
    });
    static fromJson(data: {
      [key: string]: any;
    }): CompileTemplateMetadata;
    toJson(): {
      [key: string]: any;
    };
  }
  /**
   * Metadata regarding compilation of a directive.
   */
  export class CompileDirectiveMetadata implements CompileMetadataWithType {
    static create({type, isComponent, dynamicLoadable, selector, exportAs, changeDetection, inputs, outputs, host, lifecycleHooks, providers, viewProviders, queries, viewQueries, template}?: {
      type?: CompileTypeMetadata;
      isComponent?: boolean;
      dynamicLoadable?: boolean;
      selector?: string;
      exportAs?: string;
      changeDetection?: ChangeDetectionStrategy;
      inputs?: string[];
      outputs?: string[];
      host?: {
        [key: string]: string;
      };
      lifecycleHooks?: LifecycleHooks[];
      providers?: Array<CompileProviderMetadata | CompileTypeMetadata | any[]>;
      viewProviders?: Array<CompileProviderMetadata | CompileTypeMetadata | any[]>;
      queries?: CompileQueryMetadata[];
      viewQueries?: CompileQueryMetadata[];
      template?: CompileTemplateMetadata;
    }): CompileDirectiveMetadata;
    type: CompileTypeMetadata;
    isComponent: boolean;
    dynamicLoadable: boolean;
    selector: string;
    exportAs: string;
    changeDetection: ChangeDetectionStrategy;
    inputs: {
      [key: string]: string;
    };
    outputs: {
      [key: string]: string;
    };
    hostListeners: {
      [key: string]: string;
    };
    hostProperties: {
      [key: string]: string;
    };
    hostAttributes: {
      [key: string]: string;
    };
    lifecycleHooks: LifecycleHooks[];
    providers: Array<CompileProviderMetadata | CompileTypeMetadata | any[]>;
    viewProviders: Array<CompileProviderMetadata | CompileTypeMetadata | any[]>;
    queries: CompileQueryMetadata[];
    viewQueries: CompileQueryMetadata[];
    template: CompileTemplateMetadata;
    constructor({type, isComponent, dynamicLoadable, selector, exportAs, changeDetection, inputs, outputs, hostListeners, hostProperties, hostAttributes, lifecycleHooks, providers, viewProviders, queries, viewQueries, template}?: {
      type?: CompileTypeMetadata;
      isComponent?: boolean;
      dynamicLoadable?: boolean;
      selector?: string;
      exportAs?: string;
      changeDetection?: ChangeDetectionStrategy;
      inputs?: {
        [key: string]: string;
      };
      outputs?: {
        [key: string]: string;
      };
      hostListeners?: {
        [key: string]: string;
      };
      hostProperties?: {
        [key: string]: string;
      };
      hostAttributes?: {
        [key: string]: string;
      };
      lifecycleHooks?: LifecycleHooks[];
      providers?: Array<CompileProviderMetadata | CompileTypeMetadata | any[]>;
      viewProviders?: Array<CompileProviderMetadata | CompileTypeMetadata | any[]>;
      queries?: CompileQueryMetadata[];
      viewQueries?: CompileQueryMetadata[];
      template?: CompileTemplateMetadata;
    });
    identifier: CompileIdentifierMetadata;
    static fromJson(data: {
      [key: string]: any;
    }): CompileDirectiveMetadata;
    toJson(): {
      [key: string]: any;
    };
  }
  /**
   * Construct {@link CompileDirectiveMetadata} from {@link ComponentTypeMetadata} and a selector.
   */
  export function createHostComponentMeta(componentType: CompileTypeMetadata, componentSelector: string): CompileDirectiveMetadata;
  export class CompilePipeMetadata implements CompileMetadataWithType {
    type: CompileTypeMetadata;
    name: string;
    pure: boolean;
    constructor({type, name, pure}?: {
      type?: CompileTypeMetadata;
      name?: string;
      pure?: boolean;
    });
    identifier: CompileIdentifierMetadata;
    static fromJson(data: {
      [key: string]: any;
    }): CompilePipeMetadata;
    toJson(): {
      [key: string]: any;
    };
  }
}
declare module "angular2/src/compiler/parse_util" {
  export class ParseLocation {
    file: ParseSourceFile;
    offset: number;
    line: number;
    col: number;
    constructor(file: ParseSourceFile, offset: number, line: number, col: number);
    toString(): string;
  }
  export class ParseSourceFile {
    content: string;
    url: string;
    constructor(content: string, url: string);
  }
  export class ParseSourceSpan {
    start: ParseLocation;
    end: ParseLocation;
    constructor(start: ParseLocation, end: ParseLocation);
    toString(): string;
  }
  export abstract class ParseError {
    span: ParseSourceSpan;
    msg: string;
    constructor(span: ParseSourceSpan, msg: string);
    toString(): string;
  }
}
declare module "angular2/src/compiler/template_ast" {
  import { AST } from "angular2/src/core/change_detection/change_detection";
  import { CompileDirectiveMetadata } from "angular2/src/compiler/directive_metadata";
  import { ParseSourceSpan } from "angular2/src/compiler/parse_util";
  /**
   * An Abstract Syntax Tree node representing part of a parsed Angular template.
   */
  export interface TemplateAst {
    /**
     * The source span from which this node was parsed.
     */
    sourceSpan: ParseSourceSpan;
    /**
     * Visit this node and possibly transform it.
     */
    visit(visitor: TemplateAstVisitor, context: any): any;
  }
  /**
   * A segment of text within the template.
   */
  export class TextAst implements TemplateAst {
    value: string;
    ngContentIndex: number;
    sourceSpan: ParseSourceSpan;
    constructor(value: string, ngContentIndex: number, sourceSpan: ParseSourceSpan);
    visit(visitor: TemplateAstVisitor, context: any): any;
  }
  /**
   * A bound expression within the text of a template.
   */
  export class BoundTextAst implements TemplateAst {
    value: AST;
    ngContentIndex: number;
    sourceSpan: ParseSourceSpan;
    constructor(value: AST, ngContentIndex: number, sourceSpan: ParseSourceSpan);
    visit(visitor: TemplateAstVisitor, context: any): any;
  }
  /**
   * A plain attribute on an element.
   */
  export class AttrAst implements TemplateAst {
    name: string;
    value: string;
    sourceSpan: ParseSourceSpan;
    constructor(name: string, value: string, sourceSpan: ParseSourceSpan);
    visit(visitor: TemplateAstVisitor, context: any): any;
  }
  /**
   * A binding for an element property (e.g. `[property]="expression"`).
   */
  export class BoundElementPropertyAst implements TemplateAst {
    name: string;
    type: PropertyBindingType;
    value: AST;
    unit: string;
    sourceSpan: ParseSourceSpan;
    constructor(name: string, type: PropertyBindingType, value: AST, unit: string, sourceSpan: ParseSourceSpan);
    visit(visitor: TemplateAstVisitor, context: any): any;
  }
  /**
   * A binding for an element event (e.g. `(event)="handler()"`).
   */
  export class BoundEventAst implements TemplateAst {
    name: string;
    target: string;
    handler: AST;
    sourceSpan: ParseSourceSpan;
    constructor(name: string, target: string, handler: AST, sourceSpan: ParseSourceSpan);
    visit(visitor: TemplateAstVisitor, context: any): any;
    fullName: string;
  }
  /**
   * A variable declaration on an element (e.g. `#var="expression"`).
   */
  export class VariableAst implements TemplateAst {
    name: string;
    value: string;
    sourceSpan: ParseSourceSpan;
    constructor(name: string, value: string, sourceSpan: ParseSourceSpan);
    visit(visitor: TemplateAstVisitor, context: any): any;
  }
  /**
   * An element declaration in a template.
   */
  export class ElementAst implements TemplateAst {
    name: string;
    attrs: AttrAst[];
    inputs: BoundElementPropertyAst[];
    outputs: BoundEventAst[];
    exportAsVars: VariableAst[];
    directives: DirectiveAst[];
    children: TemplateAst[];
    ngContentIndex: number;
    sourceSpan: ParseSourceSpan;
    constructor(name: string, attrs: AttrAst[], inputs: BoundElementPropertyAst[], outputs: BoundEventAst[], exportAsVars: VariableAst[], directives: DirectiveAst[], children: TemplateAst[], ngContentIndex: number, sourceSpan: ParseSourceSpan);
    visit(visitor: TemplateAstVisitor, context: any): any;
    /**
     * Whether the element has any active bindings (inputs, outputs, vars, or directives).
     */
    isBound(): boolean;
    /**
     * Get the component associated with this element, if any.
     */
    getComponent(): CompileDirectiveMetadata;
  }
  /**
   * A `<template>` element included in an Angular template.
   */
  export class EmbeddedTemplateAst implements TemplateAst {
    attrs: AttrAst[];
    outputs: BoundEventAst[];
    vars: VariableAst[];
    directives: DirectiveAst[];
    children: TemplateAst[];
    ngContentIndex: number;
    sourceSpan: ParseSourceSpan;
    constructor(attrs: AttrAst[], outputs: BoundEventAst[], vars: VariableAst[], directives: DirectiveAst[], children: TemplateAst[], ngContentIndex: number, sourceSpan: ParseSourceSpan);
    visit(visitor: TemplateAstVisitor, context: any): any;
  }
  /**
   * A directive property with a bound value (e.g. `*ngIf="condition").
   */
  export class BoundDirectivePropertyAst implements TemplateAst {
    directiveName: string;
    templateName: string;
    value: AST;
    sourceSpan: ParseSourceSpan;
    constructor(directiveName: string, templateName: string, value: AST, sourceSpan: ParseSourceSpan);
    visit(visitor: TemplateAstVisitor, context: any): any;
  }
  /**
   * A directive declared on an element.
   */
  export class DirectiveAst implements TemplateAst {
    directive: CompileDirectiveMetadata;
    inputs: BoundDirectivePropertyAst[];
    hostProperties: BoundElementPropertyAst[];
    hostEvents: BoundEventAst[];
    exportAsVars: VariableAst[];
    sourceSpan: ParseSourceSpan;
    constructor(directive: CompileDirectiveMetadata, inputs: BoundDirectivePropertyAst[], hostProperties: BoundElementPropertyAst[], hostEvents: BoundEventAst[], exportAsVars: VariableAst[], sourceSpan: ParseSourceSpan);
    visit(visitor: TemplateAstVisitor, context: any): any;
  }
  /**
   * Position where content is to be projected (instance of `<ng-content>` in a template).
   */
  export class NgContentAst implements TemplateAst {
    index: number;
    ngContentIndex: number;
    sourceSpan: ParseSourceSpan;
    constructor(index: number, ngContentIndex: number, sourceSpan: ParseSourceSpan);
    visit(visitor: TemplateAstVisitor, context: any): any;
  }
  /**
   * Enumeration of types of property bindings.
   */
  export enum PropertyBindingType {
    /**
     * A normal binding to a property (e.g. `[property]="expression"`).
     */
    Property = 0,
    /**
     * A binding to an element attribute (e.g. `[attr.name]="expression"`).
     */
    Attribute = 1,
    /**
     * A binding to a CSS class (e.g. `[class.name]="condition"`).
     */
    Class = 2,
    /**
     * A binding to a style rule (e.g. `[style.rule]="expression"`).
     */
    Style = 3,
  }
  /**
   * A visitor for {@link TemplateAst} trees that will process each node.
   */
  export interface TemplateAstVisitor {
    visitNgContent(ast: NgContentAst, context: any): any;
    visitEmbeddedTemplate(ast: EmbeddedTemplateAst, context: any): any;
    visitElement(ast: ElementAst, context: any): any;
    visitVariable(ast: VariableAst, context: any): any;
    visitEvent(ast: BoundEventAst, context: any): any;
    visitElementProperty(ast: BoundElementPropertyAst, context: any): any;
    visitAttr(ast: AttrAst, context: any): any;
    visitBoundText(ast: BoundTextAst, context: any): any;
    visitText(ast: TextAst, context: any): any;
    visitDirective(ast: DirectiveAst, context: any): any;
    visitDirectiveProperty(ast: BoundDirectivePropertyAst, context: any): any;
  }
  /**
   * Visit every node in a list of {@link TemplateAst}s with the given {@link TemplateAstVisitor}.
   */
  export function templateVisitAll(visitor: TemplateAstVisitor, asts: TemplateAst[], context?: any): any[];
}
declare module "angular2/src/compiler/source_module" {
  export function moduleRef(moduleUrl: any): string;
  /**
   * Represents generated source code with module references. Internal to the Angular compiler.
   */
  export class SourceModule {
    moduleUrl: string;
    sourceWithModuleRefs: string;
    static getSourceWithoutImports(sourceWithModuleRefs: string): string;
    constructor(moduleUrl: string, sourceWithModuleRefs: string);
    getSourceWithImports(): SourceWithImports;
  }
  export class SourceExpression {
    declarations: string[];
    expression: string;
    constructor(declarations: string[], expression: string);
  }
  export class SourceExpressions {
    declarations: string[];
    expressions: string[];
    constructor(declarations: string[], expressions: string[]);
  }
  /**
   * Represents generated source code with imports. Internal to the Angular compiler.
   */
  export class SourceWithImports {
    source: string;
    imports: string[][];
    constructor(source: string, imports: string[][]);
  }
}
declare module "angular2/src/compiler/change_definition_factory" {
  import { ChangeDetectionStrategy, ChangeDetectorDefinition, ChangeDetectorGenConfig } from "angular2/src/core/change_detection/change_detection";
  import { CompileTypeMetadata } from "angular2/src/compiler/directive_metadata";
  import { TemplateAst } from "angular2/src/compiler/template_ast";
  export function createChangeDetectorDefinitions(componentType: CompileTypeMetadata, componentStrategy: ChangeDetectionStrategy, genConfig: ChangeDetectorGenConfig, parsedTemplate: TemplateAst[]): ChangeDetectorDefinition[];
}
declare module "angular2/src/transform/template_compiler/change_detector_codegen" {
  import { ChangeDetectorDefinition } from "angular2/src/core/change_detection/change_detection";
  export class Codegen {
    constructor(moduleAlias: string);
    generate(typeName: string, changeDetectorTypeName: string, def: ChangeDetectorDefinition): void;
    toString(): string;
  }
}
declare module "angular2/src/compiler/change_detector_compiler" {
  import { CompileTypeMetadata } from "angular2/src/compiler/directive_metadata";
  import { SourceExpressions } from "angular2/src/compiler/source_module";
  import { AbstractChangeDetector } from "angular2/src/core/change_detection/abstract_change_detector";
  import { ChangeDetectionUtil } from "angular2/src/core/change_detection/change_detection_util";
  import { ChangeDetectorState } from "angular2/src/core/change_detection/constants";
  import { ChangeDetectorGenConfig, ChangeDetectionStrategy } from "angular2/src/core/change_detection/change_detection";
  import { TemplateAst } from "angular2/src/compiler/template_ast";
  export const CHANGE_DETECTION_JIT_IMPORTS: {
    'AbstractChangeDetector': typeof AbstractChangeDetector;
    'ChangeDetectionUtil': typeof ChangeDetectionUtil;
    'ChangeDetectorState': typeof ChangeDetectorState;
  };
  export class ChangeDetectionCompiler {
    private _genConfig;
    constructor(_genConfig: ChangeDetectorGenConfig);
    compileComponentRuntime(componentType: CompileTypeMetadata, strategy: ChangeDetectionStrategy, parsedTemplate: TemplateAst[]): Function[];
    private _createChangeDetectorFactory(definition);
    compileComponentCodeGen(componentType: CompileTypeMetadata, strategy: ChangeDetectionStrategy, parsedTemplate: TemplateAst[]): SourceExpressions;
  }
}
declare module "angular2/src/compiler/shadow_css" {
  /**
   * This file is a port of shadowCSS from webcomponents.js to TypeScript.
   *
   * Please make sure to keep to edits in sync with the source file.
   *
   * Source:
   * https://github.com/webcomponents/webcomponentsjs/blob/4efecd7e0e/src/ShadowCSS/ShadowCSS.js
   *
   * The original file level comment is reproduced below
   */
  export class ShadowCss {
    strictStyling: boolean;
    constructor();
    shimCssText(cssText: string, selector: string, hostSelector?: string): string;
    private _insertDirectives(cssText);
    private _insertPolyfillDirectivesInCssText(cssText);
    private _insertPolyfillRulesInCssText(cssText);
    private _scopeCssText(cssText, scopeSelector, hostSelector);
    private _extractUnscopedRulesFromCssText(cssText);
    private _convertColonHost(cssText);
    private _convertColonHostContext(cssText);
    private _convertColonRule(cssText, regExp, partReplacer);
    private _colonHostContextPartReplacer(host, part, suffix);
    private _colonHostPartReplacer(host, part, suffix);
    private _convertShadowDOMSelectors(cssText);
    private _scopeSelectors(cssText, scopeSelector, hostSelector);
    private _scopeSelector(selector, scopeSelector, hostSelector, strict);
    private _selectorNeedsScoping(selector, scopeSelector);
    private _makeScopeMatcher(scopeSelector);
    private _applySelectorScope(selector, scopeSelector, hostSelector);
    private _applySimpleSelectorScope(selector, scopeSelector, hostSelector);
    private _applyStrictSelectorScope(selector, scopeSelector);
    private _insertPolyfillHostInCssText(selector);
  }
  export class CssRule {
    selector: string;
    content: string;
    constructor(selector: string, content: string);
  }
  export function processRules(input: string, ruleCallback: Function): string;
}
declare module "angular2/src/compiler/style_url_resolver" {
  import { UrlResolver } from "angular2/src/compiler/url_resolver";
  export class StyleWithImports {
    style: string;
    styleUrls: string[];
    constructor(style: string, styleUrls: string[]);
  }
  export function isStyleUrlResolvable(url: string): boolean;
  /**
   * Rewrites stylesheets by resolving and removing the @import urls that
   * are either relative or don't have a `package:` scheme
   */
  export function extractStyleUrls(resolver: UrlResolver, baseUrl: string, cssText: string): StyleWithImports;
}
declare module "angular2/src/compiler/style_compiler" {
  import { CompileTemplateMetadata } from "angular2/src/compiler/directive_metadata";
  import { SourceModule, SourceExpression } from "angular2/src/compiler/source_module";
  import { XHR } from "angular2/src/compiler/xhr";
  import { UrlResolver } from "angular2/src/compiler/url_resolver";
  export class StyleCompiler {
    private _xhr;
    private _urlResolver;
    private _styleCache;
    private _shadowCss;
    constructor(_xhr: XHR, _urlResolver: UrlResolver);
    compileComponentRuntime(template: CompileTemplateMetadata): Promise<Array<string | any[]>>;
    compileComponentCodeGen(template: CompileTemplateMetadata): SourceExpression;
    compileStylesheetCodeGen(stylesheetUrl: string, cssText: string): SourceModule[];
    clearCache(): void;
    private _loadStyles(plainStyles, absUrls, encapsulate);
    private _styleCodeGen(plainStyles, absUrls, shim);
    private _styleModule(stylesheetUrl, shim, expression);
    private _shimIfNeeded(style, shim);
    private _createModuleUrl(stylesheetUrl, shim);
  }
}
declare module "angular2/src/compiler/proto_view_compiler" {
  import { TemplateAst, BoundEventAst } from "angular2/src/compiler/template_ast";
  import { CompileDirectiveMetadata, CompilePipeMetadata } from "angular2/src/compiler/directive_metadata";
  import { AppProtoView } from "angular2/src/core/linker/view";
  import { ViewType } from "angular2/src/core/linker/view_type";
  import { AppProtoElement } from "angular2/src/core/linker/element";
  import { ResolvedMetadataCache } from "angular2/src/core/linker/resolved_metadata_cache";
  import { Expression } from "angular2/src/compiler/util";
  export const PROTO_VIEW_JIT_IMPORTS: {
    'AppProtoView': typeof AppProtoView;
    'AppProtoElement': typeof AppProtoElement;
    'ViewType': typeof ViewType;
  };
  export var APP_VIEW_MODULE_REF: string;
  export var VIEW_TYPE_MODULE_REF: string;
  export var APP_EL_MODULE_REF: string;
  export var METADATA_MODULE_REF: string;
  export class ProtoViewCompiler {
    constructor();
    compileProtoViewRuntime(metadataCache: ResolvedMetadataCache, component: CompileDirectiveMetadata, template: TemplateAst[], pipes: CompilePipeMetadata[]): CompileProtoViews<AppProtoView, AppProtoElement, any>;
    compileProtoViewCodeGen(resolvedMetadataCacheExpr: Expression, component: CompileDirectiveMetadata, template: TemplateAst[], pipes: CompilePipeMetadata[]): CompileProtoViews<Expression, Expression, string>;
  }
  export class CompileProtoViews<APP_PROTO_VIEW, APP_PROTO_EL, STATEMENT> {
    declarations: STATEMENT[];
    protoViews: CompileProtoView<APP_PROTO_VIEW, APP_PROTO_EL>[];
    constructor(declarations: STATEMENT[], protoViews: CompileProtoView<APP_PROTO_VIEW, APP_PROTO_EL>[]);
  }
  export class CompileProtoView<APP_PROTO_VIEW, APP_PROTO_EL> {
    embeddedTemplateIndex: number;
    protoElements: CompileProtoElement<APP_PROTO_EL>[];
    protoView: APP_PROTO_VIEW;
    constructor(embeddedTemplateIndex: number, protoElements: CompileProtoElement<APP_PROTO_EL>[], protoView: APP_PROTO_VIEW);
  }
  export class CompileProtoElement<APP_PROTO_EL> {
    boundElementIndex: any;
    attrNameAndValues: string[][];
    variableNameAndValues: string[][];
    renderEvents: BoundEventAst[];
    directives: CompileDirectiveMetadata[];
    embeddedTemplateIndex: number;
    appProtoEl: APP_PROTO_EL;
    constructor(boundElementIndex: any, attrNameAndValues: string[][], variableNameAndValues: string[][], renderEvents: BoundEventAst[], directives: CompileDirectiveMetadata[], embeddedTemplateIndex: number, appProtoEl: APP_PROTO_EL);
  }
}
declare module "angular2/src/compiler/view_compiler" {
  import { TemplateAst } from "angular2/src/compiler/template_ast";
  import { CompileDirectiveMetadata } from "angular2/src/compiler/directive_metadata";
  import { SourceExpressions, SourceExpression } from "angular2/src/compiler/source_module";
  import { AppProtoView, AppView } from "angular2/src/core/linker/view";
  import { AppProtoElement, AppElement } from "angular2/src/core/linker/element";
  import { Expression } from "angular2/src/compiler/util";
  import { CompileProtoView } from "angular2/src/compiler/proto_view_compiler";
  export const VIEW_JIT_IMPORTS: {
    'AppView': typeof AppView;
    'AppElement': typeof AppElement;
    'flattenNestedViewRenderNodes': (nodes: any[]) => any[];
    'checkSlotCount': (componentName: string, expectedSlotCount: number, projectableNodes: any[][]) => void;
  };
  export class ViewCompiler {
    constructor();
    compileComponentRuntime(component: CompileDirectiveMetadata, template: TemplateAst[], styles: Array<string | any[]>, protoViews: CompileProtoView<AppProtoView, AppProtoElement>[], changeDetectorFactories: Function[], componentViewFactory: Function): Function;
    compileComponentCodeGen(component: CompileDirectiveMetadata, template: TemplateAst[], styles: SourceExpression, protoViews: CompileProtoView<Expression, Expression>[], changeDetectorFactoryExpressions: SourceExpressions, componentViewFactory: Function): SourceExpression;
  }
}
declare module "angular2/src/compiler/html_ast" {
  import { ParseSourceSpan } from "angular2/src/compiler/parse_util";
  export interface HtmlAst {
    sourceSpan: ParseSourceSpan;
    visit(visitor: HtmlAstVisitor, context: any): any;
  }
  export class HtmlTextAst implements HtmlAst {
    value: string;
    sourceSpan: ParseSourceSpan;
    constructor(value: string, sourceSpan: ParseSourceSpan);
    visit(visitor: HtmlAstVisitor, context: any): any;
  }
  export class HtmlAttrAst implements HtmlAst {
    name: string;
    value: string;
    sourceSpan: ParseSourceSpan;
    constructor(name: string, value: string, sourceSpan: ParseSourceSpan);
    visit(visitor: HtmlAstVisitor, context: any): any;
  }
  export class HtmlElementAst implements HtmlAst {
    name: string;
    attrs: HtmlAttrAst[];
    children: HtmlAst[];
    sourceSpan: ParseSourceSpan;
    constructor(name: string, attrs: HtmlAttrAst[], children: HtmlAst[], sourceSpan: ParseSourceSpan);
    visit(visitor: HtmlAstVisitor, context: any): any;
  }
  export interface HtmlAstVisitor {
    visitElement(ast: HtmlElementAst, context: any): any;
    visitAttr(ast: HtmlAttrAst, context: any): any;
    visitText(ast: HtmlTextAst, context: any): any;
  }
  export function htmlVisitAll(visitor: HtmlAstVisitor, asts: HtmlAst[], context?: any): any[];
}
declare module "angular2/src/compiler/html_tags" {
  export const NAMED_ENTITIES: {
    'Aacute': string;
    'aacute': string;
    'Acirc': string;
    'acirc': string;
    'acute': string;
    'AElig': string;
    'aelig': string;
    'Agrave': string;
    'agrave': string;
    'alefsym': string;
    'Alpha': string;
    'alpha': string;
    'amp': string;
    'and': string;
    'ang': string;
    'apos': string;
    'Aring': string;
    'aring': string;
    'asymp': string;
    'Atilde': string;
    'atilde': string;
    'Auml': string;
    'auml': string;
    'bdquo': string;
    'Beta': string;
    'beta': string;
    'brvbar': string;
    'bull': string;
    'cap': string;
    'Ccedil': string;
    'ccedil': string;
    'cedil': string;
    'cent': string;
    'Chi': string;
    'chi': string;
    'circ': string;
    'clubs': string;
    'cong': string;
    'copy': string;
    'crarr': string;
    'cup': string;
    'curren': string;
    'dagger': string;
    'Dagger': string;
    'darr': string;
    'dArr': string;
    'deg': string;
    'Delta': string;
    'delta': string;
    'diams': string;
    'divide': string;
    'Eacute': string;
    'eacute': string;
    'Ecirc': string;
    'ecirc': string;
    'Egrave': string;
    'egrave': string;
    'empty': string;
    'emsp': string;
    'ensp': string;
    'Epsilon': string;
    'epsilon': string;
    'equiv': string;
    'Eta': string;
    'eta': string;
    'ETH': string;
    'eth': string;
    'Euml': string;
    'euml': string;
    'euro': string;
    'exist': string;
    'fnof': string;
    'forall': string;
    'frac12': string;
    'frac14': string;
    'frac34': string;
    'frasl': string;
    'Gamma': string;
    'gamma': string;
    'ge': string;
    'gt': string;
    'harr': string;
    'hArr': string;
    'hearts': string;
    'hellip': string;
    'Iacute': string;
    'iacute': string;
    'Icirc': string;
    'icirc': string;
    'iexcl': string;
    'Igrave': string;
    'igrave': string;
    'image': string;
    'infin': string;
    'int': string;
    'Iota': string;
    'iota': string;
    'iquest': string;
    'isin': string;
    'Iuml': string;
    'iuml': string;
    'Kappa': string;
    'kappa': string;
    'Lambda': string;
    'lambda': string;
    'lang': string;
    'laquo': string;
    'larr': string;
    'lArr': string;
    'lceil': string;
    'ldquo': string;
    'le': string;
    'lfloor': string;
    'lowast': string;
    'loz': string;
    'lrm': string;
    'lsaquo': string;
    'lsquo': string;
    'lt': string;
    'macr': string;
    'mdash': string;
    'micro': string;
    'middot': string;
    'minus': string;
    'Mu': string;
    'mu': string;
    'nabla': string;
    'nbsp': string;
    'ndash': string;
    'ne': string;
    'ni': string;
    'not': string;
    'notin': string;
    'nsub': string;
    'Ntilde': string;
    'ntilde': string;
    'Nu': string;
    'nu': string;
    'Oacute': string;
    'oacute': string;
    'Ocirc': string;
    'ocirc': string;
    'OElig': string;
    'oelig': string;
    'Ograve': string;
    'ograve': string;
    'oline': string;
    'Omega': string;
    'omega': string;
    'Omicron': string;
    'omicron': string;
    'oplus': string;
    'or': string;
    'ordf': string;
    'ordm': string;
    'Oslash': string;
    'oslash': string;
    'Otilde': string;
    'otilde': string;
    'otimes': string;
    'Ouml': string;
    'ouml': string;
    'para': string;
    'permil': string;
    'perp': string;
    'Phi': string;
    'phi': string;
    'Pi': string;
    'pi': string;
    'piv': string;
    'plusmn': string;
    'pound': string;
    'prime': string;
    'Prime': string;
    'prod': string;
    'prop': string;
    'Psi': string;
    'psi': string;
    'quot': string;
    'radic': string;
    'rang': string;
    'raquo': string;
    'rarr': string;
    'rArr': string;
    'rceil': string;
    'rdquo': string;
    'real': string;
    'reg': string;
    'rfloor': string;
    'Rho': string;
    'rho': string;
    'rlm': string;
    'rsaquo': string;
    'rsquo': string;
    'sbquo': string;
    'Scaron': string;
    'scaron': string;
    'sdot': string;
    'sect': string;
    'shy': string;
    'Sigma': string;
    'sigma': string;
    'sigmaf': string;
    'sim': string;
    'spades': string;
    'sub': string;
    'sube': string;
    'sum': string;
    'sup': string;
    'sup1': string;
    'sup2': string;
    'sup3': string;
    'supe': string;
    'szlig': string;
    'Tau': string;
    'tau': string;
    'there4': string;
    'Theta': string;
    'theta': string;
    'thetasym': string;
    'thinsp': string;
    'THORN': string;
    'thorn': string;
    'tilde': string;
    'times': string;
    'trade': string;
    'Uacute': string;
    'uacute': string;
    'uarr': string;
    'uArr': string;
    'Ucirc': string;
    'ucirc': string;
    'Ugrave': string;
    'ugrave': string;
    'uml': string;
    'upsih': string;
    'Upsilon': string;
    'upsilon': string;
    'Uuml': string;
    'uuml': string;
    'weierp': string;
    'Xi': string;
    'xi': string;
    'Yacute': string;
    'yacute': string;
    'yen': string;
    'yuml': string;
    'Yuml': string;
    'Zeta': string;
    'zeta': string;
    'zwj': string;
    'zwnj': string;
  };
  export enum HtmlTagContentType {
    RAW_TEXT = 0,
    ESCAPABLE_RAW_TEXT = 1,
    PARSABLE_DATA = 2,
  }
  export class HtmlTagDefinition {
    private closedByChildren;
    closedByParent: boolean;
    requiredParents: {
      [key: string]: boolean;
    };
    parentToAdd: string;
    implicitNamespacePrefix: string;
    contentType: HtmlTagContentType;
    isVoid: boolean;
    ignoreFirstLf: boolean;
    constructor({closedByChildren, requiredParents, implicitNamespacePrefix, contentType, closedByParent, isVoid, ignoreFirstLf}?: {
      closedByChildren?: string[];
      closedByParent?: boolean;
      requiredParents?: string[];
      implicitNamespacePrefix?: string;
      contentType?: HtmlTagContentType;
      isVoid?: boolean;
      ignoreFirstLf?: boolean;
    });
    requireExtraParent(currentParent: string): boolean;
    isClosedByChild(name: string): boolean;
  }
  export function getHtmlTagDefinition(tagName: string): HtmlTagDefinition;
  export function splitNsName(elementName: string): string[];
  export function getNsPrefix(elementName: string): string;
  export function mergeNsAndName(prefix: string, localName: string): string;
}
declare module "angular2/src/compiler/html_lexer" {
  import { ParseError, ParseSourceSpan } from "angular2/src/compiler/parse_util";
  export enum HtmlTokenType {
    TAG_OPEN_START = 0,
    TAG_OPEN_END = 1,
    TAG_OPEN_END_VOID = 2,
    TAG_CLOSE = 3,
    TEXT = 4,
    ESCAPABLE_RAW_TEXT = 5,
    RAW_TEXT = 6,
    COMMENT_START = 7,
    COMMENT_END = 8,
    CDATA_START = 9,
    CDATA_END = 10,
    ATTR_NAME = 11,
    ATTR_VALUE = 12,
    DOC_TYPE = 13,
    EOF = 14,
  }
  export class HtmlToken {
    type: HtmlTokenType;
    parts: string[];
    sourceSpan: ParseSourceSpan;
    constructor(type: HtmlTokenType, parts: string[], sourceSpan: ParseSourceSpan);
  }
  export class HtmlTokenError extends ParseError {
    tokenType: HtmlTokenType;
    constructor(errorMsg: string, tokenType: HtmlTokenType, span: ParseSourceSpan);
  }
  export class HtmlTokenizeResult {
    tokens: HtmlToken[];
    errors: HtmlTokenError[];
    constructor(tokens: HtmlToken[], errors: HtmlTokenError[]);
  }
  export function tokenizeHtml(sourceContent: string, sourceUrl: string): HtmlTokenizeResult;
}
declare module "angular2/src/compiler/html_parser" {
  import { HtmlAst } from "angular2/src/compiler/html_ast";
  import { ParseError, ParseSourceSpan } from "angular2/src/compiler/parse_util";
  export class HtmlTreeError extends ParseError {
    elementName: string;
    static create(elementName: string, span: ParseSourceSpan, msg: string): HtmlTreeError;
    constructor(elementName: string, span: ParseSourceSpan, msg: string);
  }
  export class HtmlParseTreeResult {
    rootNodes: HtmlAst[];
    errors: ParseError[];
    constructor(rootNodes: HtmlAst[], errors: ParseError[]);
  }
  export class HtmlParser {
    parse(sourceContent: string, sourceUrl: string): HtmlParseTreeResult;
  }
}
declare module "angular2/src/compiler/schema/element_schema_registry" {
  export class ElementSchemaRegistry {
    hasProperty(tagName: string, propName: string): boolean;
    getMappedPropName(propName: string): string;
  }
}
declare module "angular2/src/compiler/template_preparser" {
  import { HtmlElementAst } from "angular2/src/compiler/html_ast";
  export function preparseElement(ast: HtmlElementAst): PreparsedElement;
  export enum PreparsedElementType {
    NG_CONTENT = 0,
    STYLE = 1,
    STYLESHEET = 2,
    SCRIPT = 3,
    OTHER = 4,
  }
  export class PreparsedElement {
    type: PreparsedElementType;
    selectAttr: string;
    hrefAttr: string;
    nonBindable: boolean;
    constructor(type: PreparsedElementType, selectAttr: string, hrefAttr: string, nonBindable: boolean);
  }
}
declare module "angular2/src/compiler/template_parser" {
  import { OpaqueToken } from "angular2/core";
  import { Parser } from "angular2/src/core/change_detection/change_detection";
  import { CompileDirectiveMetadata, CompilePipeMetadata } from "angular2/src/compiler/directive_metadata";
  import { HtmlParser } from "angular2/src/compiler/html_parser";
  import { ParseSourceSpan, ParseError } from "angular2/src/compiler/parse_util";
  import { RecursiveAstVisitor, BindingPipe } from "angular2/src/core/change_detection/parser/ast";
  import { TemplateAst, TemplateAstVisitor } from "angular2/src/compiler/template_ast";
  import { ElementSchemaRegistry } from "angular2/src/compiler/schema/element_schema_registry";
  /**
   * Provides an array of {@link TemplateAstVisitor}s which will be used to transform
   * parsed templates before compilation is invoked, allowing custom expression syntax
   * and other advanced transformations.
   *
   * This is currently an internal-only feature and not meant for general use.
   */
  export const TEMPLATE_TRANSFORMS: OpaqueToken;
  export class TemplateParseError extends ParseError {
    constructor(message: string, span: ParseSourceSpan);
  }
  export class TemplateParser {
    private _exprParser;
    private _schemaRegistry;
    private _htmlParser;
    transforms: TemplateAstVisitor[];
    constructor(_exprParser: Parser, _schemaRegistry: ElementSchemaRegistry, _htmlParser: HtmlParser, transforms: TemplateAstVisitor[]);
    parse(template: string, directives: CompileDirectiveMetadata[], pipes: CompilePipeMetadata[], templateUrl: string): TemplateAst[];
  }
  export function splitClasses(classAttrValue: string): string[];
  export class PipeCollector extends RecursiveAstVisitor {
    pipes: Set<string>;
    visitPipe(ast: BindingPipe): any;
  }
}
declare module "angular2/src/compiler/template_normalizer" {
  import { CompileTypeMetadata, CompileTemplateMetadata } from "angular2/src/compiler/directive_metadata";
  import { XHR } from "angular2/src/compiler/xhr";
  import { UrlResolver } from "angular2/src/compiler/url_resolver";
  import { HtmlParser } from "angular2/src/compiler/html_parser";
  export class TemplateNormalizer {
    private _xhr;
    private _urlResolver;
    private _htmlParser;
    constructor(_xhr: XHR, _urlResolver: UrlResolver, _htmlParser: HtmlParser);
    normalizeTemplate(directiveType: CompileTypeMetadata, template: CompileTemplateMetadata): Promise<CompileTemplateMetadata>;
    normalizeLoadedTemplate(directiveType: CompileTypeMetadata, templateMeta: CompileTemplateMetadata, template: string, templateAbsUrl: string): CompileTemplateMetadata;
  }
}
declare module "angular2/src/core/linker/directive_lifecycle_reflector" {
  import { LifecycleHooks } from "angular2/src/core/linker/interfaces";
  export function hasLifecycleHook(lcInterface: LifecycleHooks, token: any): boolean;
}
declare module "angular2/src/compiler/runtime_metadata" {
  import { Type } from "angular2/src/facade/lang";
  import * as cpl from "angular2/src/compiler/directive_metadata";
  import { DirectiveResolver } from "angular2/src/core/linker/directive_resolver";
  import { PipeResolver } from "angular2/src/core/linker/pipe_resolver";
  import { ViewResolver } from "angular2/src/core/linker/view_resolver";
  export class RuntimeMetadataResolver {
    private _directiveResolver;
    private _pipeResolver;
    private _viewResolver;
    private _platformDirectives;
    private _platformPipes;
    private _directiveCache;
    private _pipeCache;
    constructor(_directiveResolver: DirectiveResolver, _pipeResolver: PipeResolver, _viewResolver: ViewResolver, _platformDirectives: Type[], _platformPipes: Type[]);
    getDirectiveMetadata(directiveType: Type): cpl.CompileDirectiveMetadata;
    getPipeMetadata(pipeType: Type): cpl.CompilePipeMetadata;
    getViewDirectivesMetadata(component: Type): cpl.CompileDirectiveMetadata[];
    getViewPipesMetadata(component: Type): cpl.CompilePipeMetadata[];
  }
}
declare module "angular2/src/compiler/template_compiler" {
  import { Type } from "angular2/src/facade/lang";
  import { CompileDirectiveMetadata, CompilePipeMetadata } from "angular2/src/compiler/directive_metadata";
  import { SourceModule } from "angular2/src/compiler/source_module";
  import { ChangeDetectionCompiler } from "angular2/src/compiler/change_detector_compiler";
  import { StyleCompiler } from "angular2/src/compiler/style_compiler";
  import { ViewCompiler } from "angular2/src/compiler/view_compiler";
  import { ProtoViewCompiler } from "angular2/src/compiler/proto_view_compiler";
  import { TemplateParser } from "angular2/src/compiler/template_parser";
  import { TemplateNormalizer } from "angular2/src/compiler/template_normalizer";
  import { RuntimeMetadataResolver } from "angular2/src/compiler/runtime_metadata";
  import { HostViewFactory } from "angular2/src/core/linker/view";
  import { ChangeDetectorGenConfig } from "angular2/src/core/change_detection/change_detection";
  import { ResolvedMetadataCache } from "angular2/src/core/linker/resolved_metadata_cache";
  export var METADATA_CACHE_MODULE_REF: string;
  /**
   * An internal module of the Angular compiler that begins with component types,
   * extracts templates, and eventually produces a compiled version of the component
   * ready for linking into an application.
   */
  export class TemplateCompiler {
    private _runtimeMetadataResolver;
    private _templateNormalizer;
    private _templateParser;
    private _styleCompiler;
    private _cdCompiler;
    private _protoViewCompiler;
    private _viewCompiler;
    private _resolvedMetadataCache;
    private _genConfig;
    private _hostCacheKeys;
    private _compiledTemplateCache;
    private _compiledTemplateDone;
    constructor(_runtimeMetadataResolver: RuntimeMetadataResolver, _templateNormalizer: TemplateNormalizer, _templateParser: TemplateParser, _styleCompiler: StyleCompiler, _cdCompiler: ChangeDetectionCompiler, _protoViewCompiler: ProtoViewCompiler, _viewCompiler: ViewCompiler, _resolvedMetadataCache: ResolvedMetadataCache, _genConfig: ChangeDetectorGenConfig);
    normalizeDirectiveMetadata(directive: CompileDirectiveMetadata): Promise<CompileDirectiveMetadata>;
    compileHostComponentRuntime(type: Type): Promise<HostViewFactory>;
    clearCache(): void;
    compileTemplatesCodeGen(components: NormalizedComponentWithViewDirectives[]): SourceModule;
    compileStylesheetCodeGen(stylesheetUrl: string, cssText: string): SourceModule[];
    private _compileComponentRuntime(cacheKey, compMeta, viewDirectives, pipes, compilingComponentsPath);
    private _compileNestedComponentRuntime(childComponentDir, parentCompilingComponentsPath, childPromises);
    private _createViewFactoryRuntime(compMeta, parsedTemplate, directives, styles, pipes);
    private _getNestedComponentViewFactory(compMeta);
    private _compileComponentCodeGen(compMeta, directives, pipes, targetDeclarations);
    private _createViewFactoryCodeGen(resolvedMetadataCacheExpr, compMeta, styleExpr, parsedTemplate, pipes, targetDeclarations);
  }
  export class NormalizedComponentWithViewDirectives {
    component: CompileDirectiveMetadata;
    directives: CompileDirectiveMetadata[];
    pipes: CompilePipeMetadata[];
    constructor(component: CompileDirectiveMetadata, directives: CompileDirectiveMetadata[], pipes: CompilePipeMetadata[]);
  }
}
declare module "angular2/src/compiler/runtime_compiler" {
  import { Compiler, Compiler_ } from "angular2/src/core/linker/compiler";
  import { HostViewFactoryRef, HostViewFactoryRef_ } from "angular2/src/core/linker/view_ref";
  import { TemplateCompiler } from "angular2/src/compiler/template_compiler";
  import { Type } from "angular2/src/facade/lang";
  export abstract class RuntimeCompiler extends Compiler {
    abstract compileInHost(componentType: Type): Promise<HostViewFactoryRef>;
    abstract clearCache(): any;
  }
  export class RuntimeCompiler_ extends Compiler_ implements RuntimeCompiler {
    private _templateCompiler;
    constructor(_templateCompiler: TemplateCompiler);
    compileInHost(componentType: Type): Promise<HostViewFactoryRef_>;
    clearCache(): void;
  }
}
declare module "angular2/src/platform/dom/dom_adapter" {
  import { Type } from "angular2/src/facade/lang";
  export var DOM: DomAdapter;
  export function setRootDomAdapter(adapter: DomAdapter): void;
  /**
   * Provides DOM operations in an environment-agnostic way.
   */
  export abstract class DomAdapter {
    abstract hasProperty(element: any, name: string): boolean;
    abstract setProperty(el: Element, name: string, value: any): any;
    abstract getProperty(el: Element, name: string): any;
    abstract invoke(el: Element, methodName: string, args: any[]): any;
    abstract logError(error: any): any;
    abstract log(error: any): any;
    abstract logGroup(error: any): any;
    abstract logGroupEnd(): any;
    /** @deprecated */
    abstract getXHR(): Type;
    /**
     * Maps attribute names to their corresponding property names for cases
     * where attribute name doesn't match property name.
     */
    attrToPropMap: {
      [key: string]: string;
    };
    /** @internal */
    _attrToPropMap: {
      [key: string]: string;
    };
    abstract parse(templateHtml: string): any;
    abstract query(selector: string): any;
    abstract querySelector(el: any, selector: string): HTMLElement;
    abstract querySelectorAll(el: any, selector: string): any[];
    abstract on(el: any, evt: any, listener: any): any;
    abstract onAndCancel(el: any, evt: any, listener: any): Function;
    abstract dispatchEvent(el: any, evt: any): any;
    abstract createMouseEvent(eventType: any): any;
    abstract createEvent(eventType: string): any;
    abstract preventDefault(evt: any): any;
    abstract isPrevented(evt: any): boolean;
    abstract getInnerHTML(el: any): string;
    abstract getOuterHTML(el: any): string;
    abstract nodeName(node: any): string;
    abstract nodeValue(node: any): string;
    abstract type(node: any): string;
    abstract content(node: any): any;
    abstract firstChild(el: any): Node;
    abstract nextSibling(el: any): Node;
    abstract parentElement(el: any): Node;
    abstract childNodes(el: any): Node[];
    abstract childNodesAsList(el: any): Node[];
    abstract clearNodes(el: any): any;
    abstract appendChild(el: any, node: any): any;
    abstract removeChild(el: any, node: any): any;
    abstract replaceChild(el: any, newNode: any, oldNode: any): any;
    abstract remove(el: any): Node;
    abstract insertBefore(el: any, node: any): any;
    abstract insertAllBefore(el: any, nodes: any): any;
    abstract insertAfter(el: any, node: any): any;
    abstract setInnerHTML(el: any, value: any): any;
    abstract getText(el: any): string;
    abstract setText(el: any, value: string): any;
    abstract getValue(el: any): string;
    abstract setValue(el: any, value: string): any;
    abstract getChecked(el: any): boolean;
    abstract setChecked(el: any, value: boolean): any;
    abstract createComment(text: string): any;
    abstract createTemplate(html: any): HTMLElement;
    abstract createElement(tagName: any, doc?: any): HTMLElement;
    abstract createElementNS(ns: string, tagName: string, doc?: any): Element;
    abstract createTextNode(text: string, doc?: any): Text;
    abstract createScriptTag(attrName: string, attrValue: string, doc?: any): HTMLElement;
    abstract createStyleElement(css: string, doc?: any): HTMLStyleElement;
    abstract createShadowRoot(el: any): any;
    abstract getShadowRoot(el: any): any;
    abstract getHost(el: any): any;
    abstract getDistributedNodes(el: any): Node[];
    abstract clone(node: Node): Node;
    abstract getElementsByClassName(element: any, name: string): HTMLElement[];
    abstract getElementsByTagName(element: any, name: string): HTMLElement[];
    abstract classList(element: any): any[];
    abstract addClass(element: any, className: string): any;
    abstract removeClass(element: any, className: string): any;
    abstract hasClass(element: any, className: string): boolean;
    abstract setStyle(element: any, styleName: string, styleValue: string): any;
    abstract removeStyle(element: any, styleName: string): any;
    abstract getStyle(element: any, styleName: string): string;
    abstract hasStyle(element: any, styleName: string, styleValue?: string): boolean;
    abstract tagName(element: any): string;
    abstract attributeMap(element: any): Map<string, string>;
    abstract hasAttribute(element: any, attribute: string): boolean;
    abstract hasAttributeNS(element: any, ns: string, attribute: string): boolean;
    abstract getAttribute(element: any, attribute: string): string;
    abstract getAttributeNS(element: any, ns: string, attribute: string): string;
    abstract setAttribute(element: any, name: string, value: string): any;
    abstract setAttributeNS(element: any, ns: string, name: string, value: string): any;
    abstract removeAttribute(element: any, attribute: string): any;
    abstract removeAttributeNS(element: any, ns: string, attribute: string): any;
    abstract templateAwareRoot(el: any): any;
    abstract createHtmlDocument(): HTMLDocument;
    abstract defaultDoc(): HTMLDocument;
    abstract getBoundingClientRect(el: any): any;
    abstract getTitle(): string;
    abstract setTitle(newTitle: string): any;
    abstract elementMatches(n: any, selector: string): boolean;
    abstract isTemplateElement(el: any): boolean;
    abstract isTextNode(node: any): boolean;
    abstract isCommentNode(node: any): boolean;
    abstract isElementNode(node: any): boolean;
    abstract hasShadowRoot(node: any): boolean;
    abstract isShadowRoot(node: any): boolean;
    abstract importIntoDoc(node: Node): Node;
    abstract adoptNode(node: Node): Node;
    abstract getHref(element: any): string;
    abstract getEventKey(event: any): string;
    abstract resolveAndSetHref(element: any, baseUrl: string, href: string): any;
    abstract supportsDOMEvents(): boolean;
    abstract supportsNativeShadowDOM(): boolean;
    abstract getGlobalEventTarget(target: string): any;
    abstract getHistory(): History;
    abstract getLocation(): Location;
    abstract getBaseHref(): string;
    abstract resetBaseElement(): void;
    abstract getUserAgent(): string;
    abstract setData(element: any, name: string, value: string): any;
    abstract getComputedStyle(element: any): any;
    abstract getData(element: any, name: string): string;
    abstract setGlobalVar(name: string, value: any): any;
    abstract requestAnimationFrame(callback: any): number;
    abstract cancelAnimationFrame(id: any): any;
    abstract performanceNow(): number;
    abstract getAnimationPrefix(): string;
    abstract getTransitionEnd(): string;
    abstract supportsAnimation(): boolean;
  }
}
declare module "angular2/src/compiler/schema/dom_element_schema_registry" {
  import { ElementSchemaRegistry } from "angular2/src/compiler/schema/element_schema_registry";
  export class DomElementSchemaRegistry extends ElementSchemaRegistry {
    private _protoElements;
    private _getProtoElement(tagName);
    hasProperty(tagName: string, propName: string): boolean;
    getMappedPropName(propName: string): string;
  }
}
declare module "angular2/src/compiler/compiler" {
  export { TemplateCompiler } from "angular2/src/compiler/template_compiler";
  export { CompileDirectiveMetadata, CompileTypeMetadata, CompileTemplateMetadata } from "angular2/src/compiler/directive_metadata";
  export { SourceModule, SourceWithImports } from "angular2/src/compiler/source_module";
  export { PLATFORM_DIRECTIVES, PLATFORM_PIPES } from "angular2/src/core/platform_directives_and_pipes";
  export * from "angular2/src/compiler/template_ast";
  export { TEMPLATE_TRANSFORMS } from "angular2/src/compiler/template_parser";
  import { Type } from "angular2/src/facade/lang";
  import { Provider } from "angular2/src/core/di";
  /**
   * A set of providers that provide `RuntimeCompiler` and its dependencies to use for
   * template compilation.
   */
  export const COMPILER_PROVIDERS: Array<Type | Provider | any[]>;
}
declare module "angular2/compiler" {
  /**
   * @module
   * @description
   * Starting point to import all compiler APIs.
   */
  export * from "angular2/src/compiler/url_resolver";
  export * from "angular2/src/compiler/xhr";
  export * from "angular2/src/compiler/compiler";
}
declare module "angular2/src/http/enums" {
  /**
   * Supported http methods.
   */
  export enum RequestMethod {
    Get = 0,
    Post = 1,
    Put = 2,
    Delete = 3,
    Options = 4,
    Head = 5,
    Patch = 6,
  }
  /**
   * All possible states in which a connection can be, based on
   * [States](http://www.w3.org/TR/XMLHttpRequest/#states) from the `XMLHttpRequest` spec, but with an
   * additional "CANCELLED" state.
   */
  export enum ReadyState {
    Unsent = 0,
    Open = 1,
    HeadersReceived = 2,
    Loading = 3,
    Done = 4,
    Cancelled = 5,
  }
  /**
   * Acceptable response types to be associated with a {@link Response}, based on
   * [ResponseType](https://fetch.spec.whatwg.org/#responsetype) from the Fetch spec.
   */
  export enum ResponseType {
    Basic = 0,
    Cors = 1,
    Default = 2,
    Error = 3,
    Opaque = 4,
  }
}
declare module "angular2/src/http/headers" {
  /**
   * Polyfill for [Headers](https://developer.mozilla.org/en-US/docs/Web/API/Headers/Headers), as
   * specified in the [Fetch Spec](https://fetch.spec.whatwg.org/#headers-class).
   *
   * The only known difference between this `Headers` implementation and the spec is the
   * lack of an `entries` method.
   *
   * ### Example ([live demo](http://plnkr.co/edit/MTdwT6?p=preview))
   *
   * ```
   * import {Headers} from 'angular2/http';
   *
   * var firstHeaders = new Headers();
   * firstHeaders.append('Content-Type', 'image/jpeg');
   * console.log(firstHeaders.get('Content-Type')) //'image/jpeg'
   *
   * // Create headers from Plain Old JavaScript Object
   * var secondHeaders = new Headers({
   *   'X-My-Custom-Header': 'Angular'
   * });
   * console.log(secondHeaders.get('X-My-Custom-Header')); //'Angular'
   *
   * var thirdHeaders = new Headers(secondHeaders);
   * console.log(thirdHeaders.get('X-My-Custom-Header')); //'Angular'
   * ```
   */
  export class Headers {
    /** @internal */
    _headersMap: Map<string, string[]>;
    constructor(headers?: Headers | {
      [key: string]: any;
    });
    /**
     * Returns a new Headers instance from the given DOMString of Response Headers
     */
    static fromResponseHeaderString(headersString: string): Headers;
    /**
     * Appends a header to existing list of header values for a given header name.
     */
    append(name: string, value: string): void;
    /**
     * Deletes all header values for the given name.
     */
    delete(name: string): void;
    forEach(fn: (values: string[], name: string, headers: Map<string, string[]>) => void): void;
    /**
     * Returns first header that matches given name.
     */
    get(header: string): string;
    /**
     * Check for existence of header by given name.
     */
    has(header: string): boolean;
    /**
     * Provides names of set headers
     */
    keys(): string[];
    /**
     * Sets or overrides header value for given name.
     */
    set(header: string, value: string | string[]): void;
    /**
     * Returns values of all headers.
     */
    values(): string[][];
    /**
     * Returns string of all headers.
     */
    toJSON(): {
      [key: string]: any;
    };
    /**
     * Returns list of header values for a given name.
     */
    getAll(header: string): string[];
    /**
     * This method is not implemented.
     */
    entries(): void;
  }
}
declare module "angular2/src/http/base_response_options" {
  import { Headers } from "angular2/src/http/headers";
  import { ResponseType } from "angular2/src/http/enums";
  import { ResponseOptionsArgs } from "angular2/src/http/interfaces";
  /**
   * Creates a response options object to be optionally provided when instantiating a
   * {@link Response}.
   *
   * This class is based on the `ResponseInit` description in the [Fetch
   * Spec](https://fetch.spec.whatwg.org/#responseinit).
   *
   * All values are null by default. Typical defaults can be found in the
   * {@link BaseResponseOptions} class, which sub-classes `ResponseOptions`.
   *
   * This class may be used in tests to build {@link Response Responses} for
   * mock responses (see {@link MockBackend}).
   *
   * ### Example ([live demo](http://plnkr.co/edit/P9Jkk8e8cz6NVzbcxEsD?p=preview))
   *
   * ```typescript
   * import {ResponseOptions, Response} from 'angular2/http';
   *
   * var options = new ResponseOptions({
   *   body: '{"name":"Jeff"}'
   * });
   * var res = new Response(options);
   *
   * console.log('res.json():', res.json()); // Object {name: "Jeff"}
   * ```
   */
  export class ResponseOptions {
    /**
     * String or Object representing the body of the {@link Response}.
     */
    body: string | Object;
    /**
     * Http {@link http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html status code}
     * associated with the response.
     */
    status: number;
    /**
     * Response {@link Headers headers}
     */
    headers: Headers;
    /**
     * @internal
     */
    statusText: string;
    /**
     * @internal
     */
    type: ResponseType;
    url: string;
    constructor({body, status, headers, statusText, type, url}?: ResponseOptionsArgs);
    /**
     * Creates a copy of the `ResponseOptions` instance, using the optional input as values to
     * override
     * existing values. This method will not change the values of the instance on which it is being
     * called.
     *
     * This may be useful when sharing a base `ResponseOptions` object inside tests,
     * where certain properties may change from test to test.
     *
     * ### Example ([live demo](http://plnkr.co/edit/1lXquqFfgduTFBWjNoRE?p=preview))
     *
     * ```typescript
     * import {ResponseOptions, Response} from 'angular2/http';
     *
     * var options = new ResponseOptions({
     *   body: {name: 'Jeff'}
     * });
     * var res = new Response(options.merge({
     *   url: 'https://google.com'
     * }));
     * console.log('options.url:', options.url); // null
     * console.log('res.json():', res.json()); // Object {name: "Jeff"}
     * console.log('res.url:', res.url); // https://google.com
     * ```
     */
    merge(options?: ResponseOptionsArgs): ResponseOptions;
  }
  /**
   * Subclass of {@link ResponseOptions}, with default values.
   *
   * Default values:
   *  * status: 200
   *  * headers: empty {@link Headers} object
   *
   * This class could be extended and bound to the {@link ResponseOptions} class
   * when configuring an {@link Injector}, in order to override the default options
   * used by {@link Http} to create {@link Response Responses}.
   *
   * ### Example ([live demo](http://plnkr.co/edit/qv8DLT?p=preview))
   *
   * ```typescript
   * import {provide} from 'angular2/core';
   * import {bootstrap} from 'angular2/platform/browser';
   * import {HTTP_PROVIDERS, Headers, Http, BaseResponseOptions, ResponseOptions} from
   * 'angular2/http';
   * import {App} from './myapp';
   *
   * class MyOptions extends BaseResponseOptions {
   *   headers:Headers = new Headers({network: 'github'});
   * }
   *
   * bootstrap(App, [HTTP_PROVIDERS, provide(ResponseOptions, {useClass: MyOptions})]);
   * ```
   *
   * The options could also be extended when manually creating a {@link Response}
   * object.
   *
   * ### Example ([live demo](http://plnkr.co/edit/VngosOWiaExEtbstDoix?p=preview))
   *
   * ```
   * import {BaseResponseOptions, Response} from 'angular2/http';
   *
   * var options = new BaseResponseOptions();
   * var res = new Response(options.merge({
   *   body: 'Angular2',
   *   headers: new Headers({framework: 'angular'})
   * }));
   * console.log('res.headers.get("framework"):', res.headers.get('framework')); // angular
   * console.log('res.text():', res.text()); // Angular2;
   * ```
   */
  export class BaseResponseOptions extends ResponseOptions {
    constructor();
  }
}
declare module "angular2/src/http/static_response" {
  import { ResponseType } from "angular2/src/http/enums";
  import { Headers } from "angular2/src/http/headers";
  import { ResponseOptions } from "angular2/src/http/base_response_options";
  /**
   * Creates `Response` instances from provided values.
   *
   * Though this object isn't
   * usually instantiated by end-users, it is the primary object interacted with when it comes time to
   * add data to a view.
   *
   * ### Example
   *
   * ```
   * http.request('my-friends.txt').subscribe(response => this.friends = response.text());
   * ```
   *
   * The Response's interface is inspired by the Response constructor defined in the [Fetch
   * Spec](https://fetch.spec.whatwg.org/#response-class), but is considered a static value whose body
   * can be accessed many times. There are other differences in the implementation, but this is the
   * most significant.
   */
  export class Response {
    /**
     * One of "basic", "cors", "default", "error, or "opaque".
     *
     * Defaults to "default".
     */
    type: ResponseType;
    /**
     * True if the response's status is within 200-299
     */
    ok: boolean;
    /**
     * URL of response.
     *
     * Defaults to empty string.
     */
    url: string;
    /**
     * Status code returned by server.
     *
     * Defaults to 200.
     */
    status: number;
    /**
     * Text representing the corresponding reason phrase to the `status`, as defined in [ietf rfc 2616
     * section 6.1.1](https://tools.ietf.org/html/rfc2616#section-6.1.1)
     *
     * Defaults to "OK"
     */
    statusText: string;
    /**
     * Non-standard property
     *
     * Denotes how many of the response body's bytes have been loaded, for example if the response is
     * the result of a progress event.
     */
    bytesLoaded: number;
    /**
     * Non-standard property
     *
     * Denotes how many bytes are expected in the final response body.
     */
    totalBytes: number;
    /**
     * Headers object based on the `Headers` class in the [Fetch
     * Spec](https://fetch.spec.whatwg.org/#headers-class).
     */
    headers: Headers;
    private _body;
    constructor(responseOptions: ResponseOptions);
    /**
     * Not yet implemented
     */
    blob(): any;
    /**
     * Attempts to return body as parsed `JSON` object, or raises an exception.
     */
    json(): any;
    /**
     * Returns the body as a string, presuming `toString()` can be called on the response body.
     */
    text(): string;
    /**
     * Not yet implemented
     */
    arrayBuffer(): any;
  }
}
declare module "angular2/src/http/http_utils" {
  import { RequestMethod } from "angular2/src/http/enums";
  export function normalizeMethodName(method: string | RequestMethod): RequestMethod;
  export const isSuccess: (status: number) => boolean;
  export function getResponseURL(xhr: any): string;
  export { isJsObject } from "angular2/src/facade/lang";
}
declare module "angular2/src/http/static_request" {
  import { RequestMethod } from "angular2/src/http/enums";
  import { RequestArgs } from "angular2/src/http/interfaces";
  import { Headers } from "angular2/src/http/headers";
  /**
   * Creates `Request` instances from provided values.
   *
   * The Request's interface is inspired by the Request constructor defined in the [Fetch
   * Spec](https://fetch.spec.whatwg.org/#request-class),
   * but is considered a static value whose body can be accessed many times. There are other
   * differences in the implementation, but this is the most significant.
   *
   * `Request` instances are typically created by higher-level classes, like {@link Http} and
   * {@link Jsonp}, but it may occasionally be useful to explicitly create `Request` instances.
   * One such example is when creating services that wrap higher-level services, like {@link Http},
   * where it may be useful to generate a `Request` with arbitrary headers and search params.
   *
   * ```typescript
   * import {Injectable, Injector} from 'angular2/core';
   * import {HTTP_PROVIDERS, Http, Request, RequestMethod} from 'angular2/http';
   *
   * @Injectable()
   * class AutoAuthenticator {
   *   constructor(public http:Http) {}
   *   request(url:string) {
   *     return this.http.request(new Request({
   *       method: RequestMethod.Get,
   *       url: url,
   *       search: 'password=123'
   *     }));
   *   }
   * }
   *
   * var injector = Injector.resolveAndCreate([HTTP_PROVIDERS, AutoAuthenticator]);
   * var authenticator = injector.get(AutoAuthenticator);
   * authenticator.request('people.json').subscribe(res => {
   *   //URL should have included '?password=123'
   *   console.log('people', res.json());
   * });
   * ```
   */
  export class Request {
    /**
     * Http method with which to perform the request.
     */
    method: RequestMethod;
    /**
     * {@link Headers} instance
     */
    headers: Headers;
    /** Url of the remote resource */
    url: string;
    private _body;
    constructor(requestOptions: RequestArgs);
    /**
     * Returns the request's body as string, assuming that body exists. If body is undefined, return
     * empty
     * string.
     */
    text(): String;
  }
}
declare module "angular2/src/http/url_search_params" {
  /**
   * Map-like representation of url search parameters, based on
   * [URLSearchParams](https://url.spec.whatwg.org/#urlsearchparams) in the url living standard,
   * with several extensions for merging URLSearchParams objects:
   *   - setAll()
   *   - appendAll()
   *   - replaceAll()
   */
  export class URLSearchParams {
    rawParams: string;
    paramsMap: Map<string, string[]>;
    constructor(rawParams?: string);
    clone(): URLSearchParams;
    has(param: string): boolean;
    get(param: string): string;
    getAll(param: string): string[];
    set(param: string, val: string): void;
    setAll(searchParams: URLSearchParams): void;
    append(param: string, val: string): void;
    appendAll(searchParams: URLSearchParams): void;
    replaceAll(searchParams: URLSearchParams): void;
    toString(): string;
    delete(param: string): void;
  }
}
declare module "angular2/src/http/interfaces" {
  import { ReadyState, RequestMethod, ResponseType } from "angular2/src/http/enums";
  import { Headers } from "angular2/src/http/headers";
  import { Request } from "angular2/src/http/static_request";
  import { URLSearchParams } from "angular2/src/http/url_search_params";
  /**
   * Abstract class from which real backends are derived.
   *
   * The primary purpose of a `ConnectionBackend` is to create new connections to fulfill a given
   * {@link Request}.
   */
  export abstract class ConnectionBackend {
    abstract createConnection(request: any): Connection;
  }
  /**
   * Abstract class from which real connections are derived.
   */
  export abstract class Connection {
    readyState: ReadyState;
    request: Request;
    response: any;
  }
  /**
   * Interface for options to construct a RequestOptions, based on
   * [RequestInit](https://fetch.spec.whatwg.org/#requestinit) from the Fetch spec.
   */
  export interface RequestOptionsArgs {
    url?: string;
    method?: string | RequestMethod;
    search?: string | URLSearchParams;
    headers?: Headers;
    body?: string;
  }
  /**
   * Required structure when constructing new Request();
   */
  export interface RequestArgs extends RequestOptionsArgs {
    url: string;
  }
  /**
   * Interface for options to construct a Response, based on
   * [ResponseInit](https://fetch.spec.whatwg.org/#responseinit) from the Fetch spec.
   */
  export type ResponseOptionsArgs = {
    body?: string | Object | FormData;
    status?: number;
    statusText?: string;
    headers?: Headers;
    type?: ResponseType;
    url?: string;
  };
}
declare module "angular2/src/http/base_request_options" {
  import { Headers } from "angular2/src/http/headers";
  import { RequestMethod } from "angular2/src/http/enums";
  import { RequestOptionsArgs } from "angular2/src/http/interfaces";
  import { URLSearchParams } from "angular2/src/http/url_search_params";
  /**
   * Creates a request options object to be optionally provided when instantiating a
   * {@link Request}.
   *
   * This class is based on the `RequestInit` description in the [Fetch
   * Spec](https://fetch.spec.whatwg.org/#requestinit).
   *
   * All values are null by default. Typical defaults can be found in the {@link BaseRequestOptions}
   * class, which sub-classes `RequestOptions`.
   *
   * ### Example ([live demo](http://plnkr.co/edit/7Wvi3lfLq41aQPKlxB4O?p=preview))
   *
   * ```typescript
   * import {RequestOptions, Request, RequestMethod} from 'angular2/http';
   *
   * var options = new RequestOptions({
   *   method: RequestMethod.Post,
   *   url: 'https://google.com'
   * });
   * var req = new Request(options);
   * console.log('req.method:', RequestMethod[req.method]); // Post
   * console.log('options.url:', options.url); // https://google.com
   * ```
   */
  export class RequestOptions {
    /**
     * Http method with which to execute a {@link Request}.
     * Acceptable methods are defined in the {@link RequestMethod} enum.
     */
    method: RequestMethod | string;
    /**
     * {@link Headers} to be attached to a {@link Request}.
     */
    headers: Headers;
    /**
     * Body to be used when creating a {@link Request}.
     */
    body: string;
    /**
     * Url with which to perform a {@link Request}.
     */
    url: string;
    /**
     * Search parameters to be included in a {@link Request}.
     */
    search: URLSearchParams;
    constructor({method, headers, body, url, search}?: RequestOptionsArgs);
    /**
     * Creates a copy of the `RequestOptions` instance, using the optional input as values to override
     * existing values. This method will not change the values of the instance on which it is being
     * called.
     *
     * Note that `headers` and `search` will override existing values completely if present in
     * the `options` object. If these values should be merged, it should be done prior to calling
     * `merge` on the `RequestOptions` instance.
     *
     * ### Example ([live demo](http://plnkr.co/edit/6w8XA8YTkDRcPYpdB9dk?p=preview))
     *
     * ```typescript
     * import {RequestOptions, Request, RequestMethod} from 'angular2/http';
     *
     * var options = new RequestOptions({
     *   method: RequestMethod.Post
     * });
     * var req = new Request(options.merge({
     *   url: 'https://google.com'
     * }));
     * console.log('req.method:', RequestMethod[req.method]); // Post
     * console.log('options.url:', options.url); // null
     * console.log('req.url:', req.url); // https://google.com
     * ```
     */
    merge(options?: RequestOptionsArgs): RequestOptions;
  }
  /**
   * Subclass of {@link RequestOptions}, with default values.
   *
   * Default values:
   *  * method: {@link RequestMethod RequestMethod.Get}
   *  * headers: empty {@link Headers} object
   *
   * This class could be extended and bound to the {@link RequestOptions} class
   * when configuring an {@link Injector}, in order to override the default options
   * used by {@link Http} to create and send {@link Request Requests}.
   *
   * ### Example ([live demo](http://plnkr.co/edit/LEKVSx?p=preview))
   *
   * ```typescript
   * import {provide} from 'angular2/core';
   * import {bootstrap} from 'angular2/platform/browser';
   * import {HTTP_PROVIDERS, Http, BaseRequestOptions, RequestOptions} from 'angular2/http';
   * import {App} from './myapp';
   *
   * class MyOptions extends BaseRequestOptions {
   *   search: string = 'coreTeam=true';
   * }
   *
   * bootstrap(App, [HTTP_PROVIDERS, provide(RequestOptions, {useClass: MyOptions})]);
   * ```
   *
   * The options could also be extended when manually creating a {@link Request}
   * object.
   *
   * ### Example ([live demo](http://plnkr.co/edit/oyBoEvNtDhOSfi9YxaVb?p=preview))
   *
   * ```
   * import {BaseRequestOptions, Request, RequestMethod} from 'angular2/http';
   *
   * var options = new BaseRequestOptions();
   * var req = new Request(options.merge({
   *   method: RequestMethod.Post,
   *   url: 'https://google.com'
   * }));
   * console.log('req.method:', RequestMethod[req.method]); // Post
   * console.log('options.url:', options.url); // null
   * console.log('req.url:', req.url); // https://google.com
   * ```
   */
  export class BaseRequestOptions extends RequestOptions {
    constructor();
  }
}
declare module "angular2/src/http/http" {
  import { RequestOptionsArgs, ConnectionBackend } from "angular2/src/http/interfaces";
  import { Request } from "angular2/src/http/static_request";
  import { Response } from "angular2/src/http/static_response";
  import { RequestOptions } from "angular2/src/http/base_request_options";
  import { Observable } from "rxjs/Observable";
  /**
   * Performs http requests using `XMLHttpRequest` as the default backend.
   *
   * `Http` is available as an injectable class, with methods to perform http requests. Calling
   * `request` returns an `Observable` which will emit a single {@link Response} when a
   * response is received.
   *
   * ### Example
   *
   * ```typescript
   * import {Http, HTTP_PROVIDERS} from 'angular2/http';
   * @Component({
   *   selector: 'http-app',
   *   viewProviders: [HTTP_PROVIDERS],
   *   templateUrl: 'people.html'
   * })
   * class PeopleComponent {
   *   constructor(http: Http) {
   *     http.get('people.json')
   *       // Call map on the response observable to get the parsed people object
   *       .map(res => res.json())
   *       // Subscribe to the observable to get the parsed people object and attach it to the
   *       // component
   *       .subscribe(people => this.people = people);
   *   }
   * }
   * ```
   *
   *
   * ### Example
   *
   * ```
   * http.get('people.json').observer({next: (value) => this.people = value});
   * ```
   *
   * The default construct used to perform requests, `XMLHttpRequest`, is abstracted as a "Backend" (
   * {@link XHRBackend} in this case), which could be mocked with dependency injection by replacing
   * the {@link XHRBackend} provider, as in the following example:
   *
   * ### Example
   *
   * ```typescript
   * import {BaseRequestOptions, Http} from 'angular2/http';
   * import {MockBackend} from 'angular2/http/testing';
   * var injector = Injector.resolveAndCreate([
   *   BaseRequestOptions,
   *   MockBackend,
   *   provide(Http, {useFactory:
   *       function(backend, defaultOptions) {
   *         return new Http(backend, defaultOptions);
   *       },
   *       deps: [MockBackend, BaseRequestOptions]})
   * ]);
   * var http = injector.get(Http);
   * http.get('request-from-mock-backend.json').subscribe((res:Response) => doSomething(res));
   * ```
   *
   **/
  export class Http {
    protected _backend: ConnectionBackend;
    protected _defaultOptions: RequestOptions;
    constructor(_backend: ConnectionBackend, _defaultOptions: RequestOptions);
    /**
     * Performs any type of http request. First argument is required, and can either be a url or
     * a {@link Request} instance. If the first argument is a url, an optional {@link RequestOptions}
     * object can be provided as the 2nd argument. The options object will be merged with the values
     * of {@link BaseRequestOptions} before performing the request.
     */
    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response>;
    /**
     * Performs a request with `get` http method.
     */
    get(url: string, options?: RequestOptionsArgs): Observable<Response>;
    /**
     * Performs a request with `post` http method.
     */
    post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response>;
    /**
     * Performs a request with `put` http method.
     */
    put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response>;
    /**
     * Performs a request with `delete` http method.
     */
    delete(url: string, options?: RequestOptionsArgs): Observable<Response>;
    /**
     * Performs a request with `patch` http method.
     */
    patch(url: string, body: string, options?: RequestOptionsArgs): Observable<Response>;
    /**
     * Performs a request with `head` http method.
     */
    head(url: string, options?: RequestOptionsArgs): Observable<Response>;
  }
  export class Jsonp extends Http {
    constructor(backend: ConnectionBackend, defaultOptions: RequestOptions);
    /**
     * Performs any type of http request. First argument is required, and can either be a url or
     * a {@link Request} instance. If the first argument is a url, an optional {@link RequestOptions}
     * object can be provided as the 2nd argument. The options object will be merged with the values
     * of {@link BaseRequestOptions} before performing the request.
     */
    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response>;
  }
}
declare module "angular2/src/http/backends/browser_xhr" {
  /**
   * A backend for http that uses the `XMLHttpRequest` browser API.
   *
   * Take care not to evaluate this in non-browser contexts.
   */
  export class BrowserXhr {
    constructor();
    build(): any;
  }
}
declare module "angular2/src/http/backends/xhr_backend" {
  import { ConnectionBackend, Connection } from "angular2/src/http/interfaces";
  import { ReadyState } from "angular2/src/http/enums";
  import { Request } from "angular2/src/http/static_request";
  import { Response } from "angular2/src/http/static_response";
  import { ResponseOptions } from "angular2/src/http/base_response_options";
  import { BrowserXhr } from "angular2/src/http/backends/browser_xhr";
  import { Observable } from "rxjs/Observable";
  /**
  * Creates connections using `XMLHttpRequest`. Given a fully-qualified
  * request, an `XHRConnection` will immediately create an `XMLHttpRequest` object and send the
  * request.
  *
  * This class would typically not be created or interacted with directly inside applications, though
  * the {@link MockConnection} may be interacted with in tests.
  */
  export class XHRConnection implements Connection {
    request: Request;
    /**
     * Response {@link EventEmitter} which emits a single {@link Response} value on load event of
     * `XMLHttpRequest`.
     */
    response: Observable<Response>;
    readyState: ReadyState;
    constructor(req: Request, browserXHR: BrowserXhr, baseResponseOptions?: ResponseOptions);
  }
  /**
   * Creates {@link XHRConnection} instances.
   *
   * This class would typically not be used by end users, but could be
   * overridden if a different backend implementation should be used,
   * such as in a node backend.
   *
   * ### Example
   *
   * ```
   * import {Http, MyNodeBackend, HTTP_PROVIDERS, BaseRequestOptions} from 'angular2/http';
   * @Component({
   *   viewProviders: [
   *     HTTP_PROVIDERS,
   *     provide(Http, {useFactory: (backend, options) => {
   *       return new Http(backend, options);
   *     }, deps: [MyNodeBackend, BaseRequestOptions]})]
   * })
   * class MyComponent {
   *   constructor(http:Http) {
   *     http.request('people.json').subscribe(res => this.people = res.json());
   *   }
   * }
   * ```
   *
   **/
  export class XHRBackend implements ConnectionBackend {
    private _browserXHR;
    private _baseResponseOptions;
    constructor(_browserXHR: BrowserXhr, _baseResponseOptions: ResponseOptions);
    createConnection(request: Request): XHRConnection;
  }
}
declare module "angular2/src/http/backends/browser_jsonp" {
  export const JSONP_HOME: string;
  export class BrowserJsonp {
    build(url: string): any;
    nextRequestID(): string;
    requestCallback(id: string): string;
    exposeConnection(id: string, connection: any): void;
    removeConnection(id: string): void;
    send(node: any): void;
    cleanup(node: any): void;
  }
}
declare module "angular2/src/http/backends/jsonp_backend" {
  import { ConnectionBackend, Connection } from "angular2/src/http/interfaces";
  import { ReadyState } from "angular2/src/http/enums";
  import { Request } from "angular2/src/http/static_request";
  import { Response } from "angular2/src/http/static_response";
  import { ResponseOptions } from "angular2/src/http/base_response_options";
  import { BrowserJsonp } from "angular2/src/http/backends/browser_jsonp";
  import { Observable } from "rxjs/Observable";
  /**
   * Abstract base class for an in-flight JSONP request.
   */
  export abstract class JSONPConnection implements Connection {
    /**
     * The {@link ReadyState} of this request.
     */
    readyState: ReadyState;
    /**
     * The outgoing HTTP request.
     */
    request: Request;
    /**
     * An observable that completes with the response, when the request is finished.
     */
    response: Observable<Response>;
    /**
     * Callback called when the JSONP request completes, to notify the application
     * of the new data.
     */
    abstract finished(data?: any): void;
  }
  export class JSONPConnection_ extends JSONPConnection {
    private _dom;
    private baseResponseOptions;
    private _id;
    private _script;
    private _responseData;
    private _finished;
    constructor(req: Request, _dom: BrowserJsonp, baseResponseOptions?: ResponseOptions);
    finished(data?: any): void;
  }
  /**
   * A {@link ConnectionBackend} that uses the JSONP strategy of making requests.
   */
  export abstract class JSONPBackend extends ConnectionBackend {
  }
  export class JSONPBackend_ extends JSONPBackend {
    private _browserJSONP;
    private _baseResponseOptions;
    constructor(_browserJSONP: BrowserJsonp, _baseResponseOptions: ResponseOptions);
    createConnection(request: Request): JSONPConnection;
  }
}
declare module "angular2/http" {
  export { Request } from "angular2/src/http/static_request";
  export { Response } from "angular2/src/http/static_response";
  export { RequestOptionsArgs, ResponseOptionsArgs, Connection, ConnectionBackend } from "angular2/src/http/interfaces";
  export { BrowserXhr } from "angular2/src/http/backends/browser_xhr";
  export { BaseRequestOptions, RequestOptions } from "angular2/src/http/base_request_options";
  export { BaseResponseOptions, ResponseOptions } from "angular2/src/http/base_response_options";
  export { XHRBackend, XHRConnection } from "angular2/src/http/backends/xhr_backend";
  export { JSONPBackend, JSONPConnection } from "angular2/src/http/backends/jsonp_backend";
  export { Http, Jsonp } from "angular2/src/http/http";
  export { Headers } from "angular2/src/http/headers";
  export { ResponseType, ReadyState, RequestMethod } from "angular2/src/http/enums";
  export { URLSearchParams } from "angular2/src/http/url_search_params";
  /**
   * Provides a basic set of injectables to use the {@link Http} service in any application.
   *
   * The `HTTP_PROVIDERS` should be included either in a component's injector,
   * or in the root injector when bootstrapping an application.
   *
   * ### Example ([live demo](http://plnkr.co/edit/snj7Nv?p=preview))
   *
   * ```
   * import {Component} from 'angular2/core';
   * import {bootstrap} from 'angular2/platform/browser';
   * import {NgFor} from 'angular2/common';
   * import {HTTP_PROVIDERS, Http} from 'angular2/http';
   *
   * @Component({
   *   selector: 'app',
   *   providers: [HTTP_PROVIDERS],
   *   template: `
   *     <div>
   *       <h1>People</h1>
   *       <ul>
   *         <li *ngFor="#person of people">
   *           {{person.name}}
   *         </li>
   *       </ul>
   *     </div>
   *   `,
   *   directives: [NgFor]
   * })
   * export class App {
   *   people: Object[];
   *   constructor(http:Http) {
   *     http.get('people.json').subscribe(res => {
   *       this.people = res.json();
   *     });
   *   }
   *   active:boolean = false;
   *   toggleActiveState() {
   *     this.active = !this.active;
   *   }
   * }
   *
   * bootstrap(App)
   *   .catch(err => console.error(err));
   * ```
   *
   * The primary public API included in `HTTP_PROVIDERS` is the {@link Http} class.
   * However, other providers required by `Http` are included,
   * which may be beneficial to override in certain cases.
   *
   * The providers included in `HTTP_PROVIDERS` include:
   *  * {@link Http}
   *  * {@link XHRBackend}
   *  * `BrowserXHR` - Private factory to create `XMLHttpRequest` instances
   *  * {@link RequestOptions} - Bound to {@link BaseRequestOptions} class
   *  * {@link ResponseOptions} - Bound to {@link BaseResponseOptions} class
   *
   * There may be cases where it makes sense to extend the base request options,
   * such as to add a search string to be appended to all URLs.
   * To accomplish this, a new provider for {@link RequestOptions} should
   * be added in the same injector as `HTTP_PROVIDERS`.
   *
   * ### Example ([live demo](http://plnkr.co/edit/aCMEXi?p=preview))
   *
   * ```
   * import {provide} from 'angular2/core';
   * import {bootstrap} from 'angular2/platform/browser';
   * import {HTTP_PROVIDERS, BaseRequestOptions, RequestOptions} from 'angular2/http';
   *
   * class MyOptions extends BaseRequestOptions {
   *   search: string = 'coreTeam=true';
   * }
   *
   * bootstrap(App, [HTTP_PROVIDERS, provide(RequestOptions, {useClass: MyOptions})])
   *   .catch(err => console.error(err));
   * ```
   *
   * Likewise, to use a mock backend for unit tests, the {@link XHRBackend}
   * provider should be bound to {@link MockBackend}.
   *
   * ### Example ([live demo](http://plnkr.co/edit/7LWALD?p=preview))
   *
   * ```
   * import {provide} from 'angular2/core';
   * import {bootstrap} from 'angular2/platform/browser';
   * import {HTTP_PROVIDERS, Http, Response, XHRBackend} from 'angular2/http';
   * import {MockBackend} from 'angular2/http/testing';
   *
   * var people = [{name: 'Jeff'}, {name: 'Tobias'}];
   *
   * var injector = Injector.resolveAndCreate([
   *   HTTP_PROVIDERS,
   *   MockBackend,
   *   provide(XHRBackend, {useExisting: MockBackend})
   * ]);
   * var http = injector.get(Http);
   * var backend = injector.get(MockBackend);
   *
   * // Listen for any new requests
   * backend.connections.observer({
   *   next: connection => {
   *     var response = new Response({body: people});
   *     setTimeout(() => {
   *       // Send a response to the request
   *       connection.mockRespond(response);
   *     });
   *   }
   * });
   *
   * http.get('people.json').observer({
   *   next: res => {
   *     // Response came from mock backend
   *     console.log('first person', res.json()[0].name);
   *   }
   * });
   * ```
   */
  export const HTTP_PROVIDERS: any[];
  /**
   * See {@link HTTP_PROVIDERS} instead.
   *
   * @deprecated
   */
  export const HTTP_BINDINGS: any[];
  /**
   * Provides a basic set of providers to use the {@link Jsonp} service in any application.
   *
   * The `JSONP_PROVIDERS` should be included either in a component's injector,
   * or in the root injector when bootstrapping an application.
   *
   * ### Example ([live demo](http://plnkr.co/edit/vmeN4F?p=preview))
   *
   * ```
   * import {Component} from 'angular2/core';
   * import {NgFor} from 'angular2/common';
   * import {JSONP_PROVIDERS, Jsonp} from 'angular2/http';
   *
   * @Component({
   *   selector: 'app',
   *   providers: [JSONP_PROVIDERS],
   *   template: `
   *     <div>
   *       <h1>People</h1>
   *       <ul>
   *         <li *ngFor="#person of people">
   *           {{person.name}}
   *         </li>
   *       </ul>
   *     </div>
   *   `,
   *   directives: [NgFor]
   * })
   * export class App {
   *   people: Array<Object>;
   *   constructor(jsonp:Jsonp) {
   *     jsonp.request('people.json').subscribe(res => {
   *       this.people = res.json();
   *     })
   *   }
   * }
   * ```
   *
   * The primary public API included in `JSONP_PROVIDERS` is the {@link Jsonp} class.
   * However, other providers required by `Jsonp` are included,
   * which may be beneficial to override in certain cases.
   *
   * The providers included in `JSONP_PROVIDERS` include:
   *  * {@link Jsonp}
   *  * {@link JSONPBackend}
   *  * `BrowserJsonp` - Private factory
   *  * {@link RequestOptions} - Bound to {@link BaseRequestOptions} class
   *  * {@link ResponseOptions} - Bound to {@link BaseResponseOptions} class
   *
   * There may be cases where it makes sense to extend the base request options,
   * such as to add a search string to be appended to all URLs.
   * To accomplish this, a new provider for {@link RequestOptions} should
   * be added in the same injector as `JSONP_PROVIDERS`.
   *
   * ### Example ([live demo](http://plnkr.co/edit/TFug7x?p=preview))
   *
   * ```
   * import {provide} from 'angular2/core';
   * import {bootstrap} from 'angular2/platform/browser';
   * import {JSONP_PROVIDERS, BaseRequestOptions, RequestOptions} from 'angular2/http';
   *
   * class MyOptions extends BaseRequestOptions {
   *   search: string = 'coreTeam=true';
   * }
   *
   * bootstrap(App, [JSONP_PROVIDERS, provide(RequestOptions, {useClass: MyOptions})])
   *   .catch(err => console.error(err));
   * ```
   *
   * Likewise, to use a mock backend for unit tests, the {@link JSONPBackend}
   * provider should be bound to {@link MockBackend}.
   *
   * ### Example ([live demo](http://plnkr.co/edit/HDqZWL?p=preview))
   *
   * ```
   * import {provide, Injector} from 'angular2/core';
   * import {JSONP_PROVIDERS, Jsonp, Response, JSONPBackend} from 'angular2/http';
   * import {MockBackend} from 'angular2/http/testing';
   *
   * var people = [{name: 'Jeff'}, {name: 'Tobias'}];
   * var injector = Injector.resolveAndCreate([
   *   JSONP_PROVIDERS,
   *   MockBackend,
   *   provide(JSONPBackend, {useExisting: MockBackend})
   * ]);
   * var jsonp = injector.get(Jsonp);
   * var backend = injector.get(MockBackend);
   *
   * // Listen for any new requests
   * backend.connections.observer({
   *   next: connection => {
   *     var response = new Response({body: people});
   *     setTimeout(() => {
   *       // Send a response to the request
   *       connection.mockRespond(response);
   *     });
   *   }
   * });
  
   * jsonp.get('people.json').observer({
   *   next: res => {
   *     // Response came from mock backend
   *     console.log('first person', res.json()[0].name);
   *   }
   * });
   * ```
   */
  export const JSONP_PROVIDERS: any[];
  /**
   * See {@link JSONP_PROVIDERS} instead.
   *
   * @deprecated
   */
  export const JSON_BINDINGS: any[];
}
declare module "angular2/instrumentation" {
  export { wtfCreateScope, wtfLeave, wtfStartTimeRange, wtfEndTimeRange, WtfScopeFn } from "angular2/src/core/profile/profile";
}
declare module "angular2/src/router/url_parser" {
  export function convertUrlParamsToArray(urlParams: {
    [key: string]: any;
  }): string[];
  export function serializeParams(urlParams: {
    [key: string]: any;
  }, joiner?: string): string;
  /**
   * This class represents a parsed URL
   */
  export class Url {
    path: string;
    child: Url;
    auxiliary: Url[];
    params: {
      [key: string]: any;
    };
    constructor(path: string, child?: Url, auxiliary?: Url[], params?: {
      [key: string]: any;
    });
    toString(): string;
    segmentToString(): string;
    /** @internal */
    _auxToString(): string;
    private _matrixParamsToString();
    /** @internal */
    _childString(): string;
  }
  export class RootUrl extends Url {
    constructor(path: string, child?: Url, auxiliary?: Url[], params?: {
      [key: string]: any;
    });
    toString(): string;
    segmentToString(): string;
    private _queryParamsToString();
  }
  export function pathSegmentsToUrl(pathSegments: string[]): Url;
  export class UrlParser {
    private _remaining;
    peekStartsWith(str: string): boolean;
    capture(str: string): void;
    parse(url: string): Url;
    parseRoot(): RootUrl;
    parseSegment(): Url;
    parseQueryParams(): {
      [key: string]: any;
    };
    parseMatrixParams(): {
      [key: string]: any;
    };
    parseParam(params: {
      [key: string]: any;
    }): void;
    parseAuxiliaryRoutes(): Url[];
  }
  export var parser: UrlParser;
}
declare module "angular2/src/router/rules/route_paths/route_path" {
  import { Url } from "angular2/src/router/url_parser";
  export class MatchedUrl {
    urlPath: string;
    urlParams: string[];
    allParams: {
      [key: string]: any;
    };
    auxiliary: Url[];
    rest: Url;
    constructor(urlPath: string, urlParams: string[], allParams: {
      [key: string]: any;
    }, auxiliary: Url[], rest: Url);
  }
  export class GeneratedUrl {
    urlPath: string;
    urlParams: {
      [key: string]: any;
    };
    constructor(urlPath: string, urlParams: {
      [key: string]: any;
    });
  }
  export interface RoutePath {
    specificity: string;
    terminal: boolean;
    hash: string;
    matchUrl(url: Url): MatchedUrl;
    generateUrl(params: {
      [key: string]: any;
    }): GeneratedUrl;
    toString(): string;
  }
}
declare module "angular2/src/router/rules/route_paths/regex_route_path" {
  import { Url } from "angular2/src/router/url_parser";
  import { RoutePath, GeneratedUrl, MatchedUrl } from "angular2/src/router/rules/route_paths/route_path";
  export interface RegexSerializer {
    (params: {
      [key: string]: any;
    }): GeneratedUrl;
  }
  export class RegexRoutePath implements RoutePath {
    private _reString;
    private _serializer;
    hash: string;
    terminal: boolean;
    specificity: string;
    private _regex;
    constructor(_reString: string, _serializer: RegexSerializer);
    matchUrl(url: Url): MatchedUrl;
    generateUrl(params: {
      [key: string]: any;
    }): GeneratedUrl;
    toString(): string;
  }
}
declare module "angular2/src/router/route_definition" {
  import { Type } from "angular2/src/facade/lang";
  import { RegexSerializer } from "angular2/src/router/rules/route_paths/regex_route_path";
  /**
   * `RouteDefinition` defines a route within a {@link RouteConfig} decorator.
   *
   * Supported keys:
   * - `path` or `aux` (requires exactly one of these)
   * - `component`, `loader`,  `redirectTo` (requires exactly one of these)
   * - `name` or `as` (optional) (requires exactly one of these)
   * - `data` (optional)
   *
   * See also {@link Route}, {@link AsyncRoute}, {@link AuxRoute}, and {@link Redirect}.
   */
  export interface RouteDefinition {
    path?: string;
    aux?: string;
    regex?: string;
    serializer?: RegexSerializer;
    component?: Type | ComponentDefinition;
    loader?: () => Promise<Type>;
    redirectTo?: any[];
    as?: string;
    name?: string;
    data?: any;
    useAsDefault?: boolean;
  }
  /**
   * Represents either a component type (`type` is `component`) or a loader function
   * (`type` is `loader`).
   *
   * See also {@link RouteDefinition}.
   */
  export interface ComponentDefinition {
    type: string;
    loader?: () => Promise<Type>;
    component?: Type;
  }
}
declare module "angular2/src/router/route_config/route_config_impl" {
  import { Type } from "angular2/src/facade/lang";
  import { RouteDefinition } from "angular2/src/router/route_definition";
  import { RegexSerializer } from "angular2/src/router/rules/route_paths/regex_route_path";
  export { RouteDefinition } from "angular2/src/router/route_definition";
  /**
   * The `RouteConfig` decorator defines routes for a given component.
   *
   * It takes an array of {@link RouteDefinition}s.
   */
  export class RouteConfig {
    configs: RouteDefinition[];
    constructor(configs: RouteDefinition[]);
  }
  export abstract class AbstractRoute implements RouteDefinition {
    name: string;
    useAsDefault: boolean;
    path: string;
    regex: string;
    serializer: RegexSerializer;
    data: {
      [key: string]: any;
    };
    constructor({name, useAsDefault, path, regex, serializer, data}: RouteDefinition);
  }
  /**
   * `Route` is a type of {@link RouteDefinition} used to route a path to a component.
   *
   * It has the following properties:
   * - `path` is a string that uses the route matcher DSL.
   * - `component` a component type.
   * - `name` is an optional `CamelCase` string representing the name of the route.
   * - `data` is an optional property of any type representing arbitrary route metadata for the given
   * route. It is injectable via {@link RouteData}.
   * - `useAsDefault` is a boolean value. If `true`, the child route will be navigated to if no child
   * route is specified during the navigation.
   *
   * ### Example
   * ```
   * import {RouteConfig, Route} from 'angular2/router';
   *
   * @RouteConfig([
   *   new Route({path: '/home', component: HomeCmp, name: 'HomeCmp' })
   * ])
   * class MyApp {}
   * ```
   */
  export class Route extends AbstractRoute {
    component: any;
    aux: string;
    constructor({name, useAsDefault, path, regex, serializer, data, component}: RouteDefinition);
  }
  /**
   * `AuxRoute` is a type of {@link RouteDefinition} used to define an auxiliary route.
   *
   * It takes an object with the following properties:
   * - `path` is a string that uses the route matcher DSL.
   * - `component` a component type.
   * - `name` is an optional `CamelCase` string representing the name of the route.
   * - `data` is an optional property of any type representing arbitrary route metadata for the given
   * route. It is injectable via {@link RouteData}.
   *
   * ### Example
   * ```
   * import {RouteConfig, AuxRoute} from 'angular2/router';
   *
   * @RouteConfig([
   *   new AuxRoute({path: '/home', component: HomeCmp})
   * ])
   * class MyApp {}
   * ```
   */
  export class AuxRoute extends AbstractRoute {
    component: any;
    constructor({name, useAsDefault, path, regex, serializer, data, component}: RouteDefinition);
  }
  /**
   * `AsyncRoute` is a type of {@link RouteDefinition} used to route a path to an asynchronously
   * loaded component.
   *
   * It has the following properties:
   * - `path` is a string that uses the route matcher DSL.
   * - `loader` is a function that returns a promise that resolves to a component.
   * - `name` is an optional `CamelCase` string representing the name of the route.
   * - `data` is an optional property of any type representing arbitrary route metadata for the given
   * route. It is injectable via {@link RouteData}.
   * - `useAsDefault` is a boolean value. If `true`, the child route will be navigated to if no child
   * route is specified during the navigation.
   *
   * ### Example
   * ```
   * import {RouteConfig, AsyncRoute} from 'angular2/router';
   *
   * @RouteConfig([
   *   new AsyncRoute({path: '/home', loader: () => Promise.resolve(MyLoadedCmp), name:
   * 'MyLoadedCmp'})
   * ])
   * class MyApp {}
   * ```
   */
  export class AsyncRoute extends AbstractRoute {
    loader: () => Promise<Type>;
    aux: string;
    constructor({name, useAsDefault, path, regex, serializer, data, loader}: RouteDefinition);
  }
  /**
   * `Redirect` is a type of {@link RouteDefinition} used to route a path to a canonical route.
   *
   * It has the following properties:
   * - `path` is a string that uses the route matcher DSL.
   * - `redirectTo` is an array representing the link DSL.
   *
   * Note that redirects **do not** affect how links are generated. For that, see the `useAsDefault`
   * option.
   *
   * ### Example
   * ```
   * import {RouteConfig, Route, Redirect} from 'angular2/router';
   *
   * @RouteConfig([
   *   new Redirect({path: '/', redirectTo: ['/Home'] }),
   *   new Route({path: '/home', component: HomeCmp, name: 'Home'})
   * ])
   * class MyApp {}
   * ```
   */
  export class Redirect extends AbstractRoute {
    redirectTo: any[];
    constructor({name, useAsDefault, path, regex, serializer, data, redirectTo}: RouteDefinition);
  }
}
declare module "angular2/src/router/instruction" {
  /**
   * `RouteParams` is an immutable map of parameters for the given route
   * based on the url matcher and optional parameters for that route.
   *
   * You can inject `RouteParams` into the constructor of a component to use it.
   *
   * ### Example
   *
   * ```
   * import {Component} from 'angular2/core';
   * import {bootstrap} from 'angular2/platform/browser';
   * import {Router, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouteConfig, RouteParams} from
   * 'angular2/router';
   *
   * @Component({directives: [ROUTER_DIRECTIVES]})
   * @RouteConfig([
   *  {path: '/user/:id', component: UserCmp, name: 'UserCmp'},
   * ])
   * class AppCmp {}
   *
   * @Component({ template: 'user: {{id}}' })
   * class UserCmp {
   *   id: string;
   *   constructor(params: RouteParams) {
   *     this.id = params.get('id');
   *   }
   * }
   *
   * bootstrap(AppCmp, ROUTER_PROVIDERS);
   * ```
   */
  export class RouteParams {
    params: {
      [key: string]: string;
    };
    constructor(params: {
      [key: string]: string;
    });
    get(param: string): string;
  }
  /**
   * `RouteData` is an immutable map of additional data you can configure in your {@link Route}.
   *
   * You can inject `RouteData` into the constructor of a component to use it.
   *
   * ### Example
   *
   * ```
   * import {Component} from 'angular2/core';
   * import {bootstrap} from 'angular2/platform/browser';
   * import {Router, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouteConfig, RouteData} from
   * 'angular2/router';
   *
   * @Component({directives: [ROUTER_DIRECTIVES]})
   * @RouteConfig([
   *  {path: '/user/:id', component: UserCmp, name: 'UserCmp', data: {isAdmin: true}},
   * ])
   * class AppCmp {}
   *
   * @Component({...})
   * @View({ template: 'user: {{isAdmin}}' })
   * class UserCmp {
   *   string: isAdmin;
   *   constructor(data: RouteData) {
   *     this.isAdmin = data.get('isAdmin');
   *   }
   * }
   *
   * bootstrap(AppCmp, ROUTER_PROVIDERS);
   * ```
   */
  export class RouteData {
    data: {
      [key: string]: any;
    };
    constructor(data?: {
      [key: string]: any;
    });
    get(key: string): any;
  }
  export var BLANK_ROUTE_DATA: RouteData;
  /**
   * `Instruction` is a tree of {@link ComponentInstruction}s with all the information needed
   * to transition each component in the app to a given route, including all auxiliary routes.
   *
   * `Instruction`s can be created using {@link Router#generate}, and can be used to
   * perform route changes with {@link Router#navigateByInstruction}.
   *
   * ### Example
   *
   * ```
   * import {Component} from 'angular2/core';
   * import {bootstrap} from 'angular2/platform/browser';
   * import {Router, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouteConfig} from 'angular2/router';
   *
   * @Component({directives: [ROUTER_DIRECTIVES]})
   * @RouteConfig([
   *  {...},
   * ])
   * class AppCmp {
   *   constructor(router: Router) {
   *     var instruction = router.generate(['/MyRoute']);
   *     router.navigateByInstruction(instruction);
   *   }
   * }
   *
   * bootstrap(AppCmp, ROUTER_PROVIDERS);
   * ```
   */
  export abstract class Instruction {
    component: ComponentInstruction;
    child: Instruction;
    auxInstruction: {
      [key: string]: Instruction;
    };
    constructor(component: ComponentInstruction, child: Instruction, auxInstruction: {
      [key: string]: Instruction;
    });
    urlPath: string;
    urlParams: string[];
    specificity: string;
    abstract resolveComponent(): Promise<ComponentInstruction>;
    /**
     * converts the instruction into a URL string
     */
    toRootUrl(): string;
    /** @internal */
    _toNonRootUrl(): string;
    toUrlQuery(): string;
    /**
     * Returns a new instruction that shares the state of the existing instruction, but with
     * the given child {@link Instruction} replacing the existing child.
     */
    replaceChild(child: Instruction): Instruction;
    /**
     * If the final URL for the instruction is ``
     */
    toUrlPath(): string;
    toLinkUrl(): string;
    /** @internal */
    _toLinkUrl(): string;
    /** @internal */
    _stringifyPathMatrixAuxPrefixed(): string;
    /** @internal */
    _stringifyMatrixParams(): string;
    /** @internal */
    _stringifyPathMatrixAux(): string;
    /** @internal */
    _stringifyAux(): string;
  }
  /**
   * a resolved instruction has an outlet instruction for itself, but maybe not for...
   */
  export class ResolvedInstruction extends Instruction {
    constructor(component: ComponentInstruction, child: Instruction, auxInstruction: {
      [key: string]: Instruction;
    });
    resolveComponent(): Promise<ComponentInstruction>;
  }
  /**
   * Represents a resolved default route
   */
  export class DefaultInstruction extends ResolvedInstruction {
    constructor(component: ComponentInstruction, child: DefaultInstruction);
    toLinkUrl(): string;
    /** @internal */
    _toLinkUrl(): string;
  }
  /**
   * Represents a component that may need to do some redirection or lazy loading at a later time.
   */
  export class UnresolvedInstruction extends Instruction {
    private _resolver;
    private _urlPath;
    private _urlParams;
    constructor(_resolver: () => Promise<Instruction>, _urlPath?: string, _urlParams?: string[]);
    urlPath: string;
    urlParams: string[];
    resolveComponent(): Promise<ComponentInstruction>;
  }
  export class RedirectInstruction extends ResolvedInstruction {
    private _specificity;
    constructor(component: ComponentInstruction, child: Instruction, auxInstruction: {
      [key: string]: Instruction;
    }, _specificity: string);
    specificity: string;
  }
  /**
   * A `ComponentInstruction` represents the route state for a single component.
   *
   * `ComponentInstructions` is a public API. Instances of `ComponentInstruction` are passed
   * to route lifecycle hooks, like {@link CanActivate}.
   *
   * `ComponentInstruction`s are [hash consed](https://en.wikipedia.org/wiki/Hash_consing). You should
   * never construct one yourself with "new." Instead, rely on {@link Router/RouteRecognizer} to
   * construct `ComponentInstruction`s.
   *
   * You should not modify this object. It should be treated as immutable.
   */
  export class ComponentInstruction {
    urlPath: string;
    urlParams: string[];
    componentType: any;
    terminal: boolean;
    specificity: string;
    params: {
      [key: string]: string;
    };
    reuse: boolean;
    routeData: RouteData;
    /**
     * @internal
     */
    constructor(urlPath: string, urlParams: string[], data: RouteData, componentType: any, terminal: boolean, specificity: string, params?: {
      [key: string]: string;
    });
  }
}
declare module "angular2/src/router/rules/route_handlers/route_handler" {
  import { Type } from "angular2/src/facade/lang";
  import { RouteData } from "angular2/src/router/instruction";
  export interface RouteHandler {
    componentType: Type;
    resolveComponentType(): Promise<any>;
    data: RouteData;
  }
}
declare module "angular2/src/router/rules/rules" {
  import { RouteHandler } from "angular2/src/router/rules/route_handlers/route_handler";
  import { Url } from "angular2/src/router/url_parser";
  import { ComponentInstruction } from "angular2/src/router/instruction";
  import { RoutePath } from "angular2/src/router/rules/route_paths/route_path";
  import { GeneratedUrl } from "angular2/src/router/rules/route_paths/route_path";
  export abstract class RouteMatch {
  }
  export class PathMatch extends RouteMatch {
    instruction: ComponentInstruction;
    remaining: Url;
    remainingAux: Url[];
    constructor(instruction: ComponentInstruction, remaining: Url, remainingAux: Url[]);
  }
  export class RedirectMatch extends RouteMatch {
    redirectTo: any[];
    specificity: any;
    constructor(redirectTo: any[], specificity: any);
  }
  export interface AbstractRule {
    hash: string;
    path: string;
    recognize(beginningSegment: Url): Promise<RouteMatch>;
    generate(params: {
      [key: string]: any;
    }): ComponentInstruction;
  }
  export class RedirectRule implements AbstractRule {
    private _pathRecognizer;
    redirectTo: any[];
    hash: string;
    constructor(_pathRecognizer: RoutePath, redirectTo: any[]);
    path: string;
    /**
     * Returns `null` or a `ParsedUrl` representing the new path to match
     */
    recognize(beginningSegment: Url): Promise<RouteMatch>;
    generate(params: {
      [key: string]: any;
    }): ComponentInstruction;
  }
  export class RouteRule implements AbstractRule {
    private _routePath;
    handler: RouteHandler;
    specificity: string;
    terminal: boolean;
    hash: string;
    private _cache;
    constructor(_routePath: RoutePath, handler: RouteHandler);
    path: string;
    recognize(beginningSegment: Url): Promise<RouteMatch>;
    generate(params: {
      [key: string]: any;
    }): ComponentInstruction;
    generateComponentPathValues(params: {
      [key: string]: any;
    }): GeneratedUrl;
    private _getInstruction(urlPath, urlParams, params);
  }
}
declare module "angular2/src/router/rules/route_handlers/async_route_handler" {
  import { Type } from "angular2/src/facade/lang";
  import { RouteHandler } from "angular2/src/router/rules/route_handlers/route_handler";
  import { RouteData } from "angular2/src/router/instruction";
  export class AsyncRouteHandler implements RouteHandler {
    private _loader;
    /** @internal */
    _resolvedComponent: Promise<Type>;
    componentType: Type;
    data: RouteData;
    constructor(_loader: () => Promise<Type>, data?: {
      [key: string]: any;
    });
    resolveComponentType(): Promise<Type>;
  }
}
declare module "angular2/src/router/rules/route_handlers/sync_route_handler" {
  import { Type } from "angular2/src/facade/lang";
  import { RouteHandler } from "angular2/src/router/rules/route_handlers/route_handler";
  import { RouteData } from "angular2/src/router/instruction";
  export class SyncRouteHandler implements RouteHandler {
    componentType: Type;
    data: RouteData;
    /** @internal */
    _resolvedComponent: Promise<any>;
    constructor(componentType: Type, data?: {
      [key: string]: any;
    });
    resolveComponentType(): Promise<any>;
  }
}
declare module "angular2/src/router/utils" {
  export class TouchMap {
    map: {
      [key: string]: string;
    };
    keys: {
      [key: string]: boolean;
    };
    constructor(map: {
      [key: string]: any;
    });
    get(key: string): string;
    getUnused(): {
      [key: string]: any;
    };
  }
  export function normalizeString(obj: any): string;
}
declare module "angular2/src/router/rules/route_paths/param_route_path" {
  import { Url } from "angular2/src/router/url_parser";
  import { RoutePath, GeneratedUrl, MatchedUrl } from "angular2/src/router/rules/route_paths/route_path";
  /**
   * Parses a URL string using a given matcher DSL, and generates URLs from param maps
   */
  export class ParamRoutePath implements RoutePath {
    routePath: string;
    specificity: string;
    terminal: boolean;
    hash: string;
    private _segments;
    /**
     * Takes a string representing the matcher DSL
     */
    constructor(routePath: string);
    matchUrl(url: Url): MatchedUrl;
    generateUrl(params: {
      [key: string]: any;
    }): GeneratedUrl;
    toString(): string;
    private _parsePathString(routePath);
    private _calculateSpecificity();
    private _calculateHash();
    private _assertValidPath(path);
    static RESERVED_CHARS: RegExp;
  }
}
declare module "angular2/src/router/rules/rule_set" {
  import { AbstractRule, RouteRule, RouteMatch } from "angular2/src/router/rules/rules";
  import { RouteDefinition } from "angular2/src/router/route_config/route_config_impl";
  import { Url } from "angular2/src/router/url_parser";
  import { ComponentInstruction } from "angular2/src/router/instruction";
  /**
   * A `RuleSet` is responsible for recognizing routes for a particular component.
   * It is consumed by `RouteRegistry`, which knows how to recognize an entire hierarchy of
   * components.
   */
  export class RuleSet {
    rulesByName: Map<string, RouteRule>;
    auxRulesByName: Map<string, RouteRule>;
    auxRulesByPath: Map<string, RouteRule>;
    rules: AbstractRule[];
    defaultRule: RouteRule;
    /**
     * Configure additional rules in this rule set from a route definition
     * @returns {boolean} true if the config is terminal
     */
    config(config: RouteDefinition): boolean;
    /**
     * Given a URL, returns a list of `RouteMatch`es, which are partial recognitions for some route.
     */
    recognize(urlParse: Url): Promise<RouteMatch>[];
    recognizeAuxiliary(urlParse: Url): Promise<RouteMatch>[];
    hasRoute(name: string): boolean;
    componentLoaded(name: string): boolean;
    loadComponent(name: string): Promise<any>;
    generate(name: string, params: any): ComponentInstruction;
    generateAuxiliary(name: string, params: any): ComponentInstruction;
    private _assertNoHashCollision(hash, path);
    private _getRoutePath(config);
  }
}
declare module "angular2/src/router/route_config/route_config_decorator" {
  import { RouteDefinition } from "angular2/src/router/route_config/route_config_impl";
  export { Route, Redirect, AuxRoute, AsyncRoute, RouteDefinition } from "angular2/src/router/route_config/route_config_impl";
  /**
   * The `RouteConfig` decorator defines routes for a given component.
   *
   * It takes an array of {@link RouteDefinition}s.
   */
  export var RouteConfig: (configs: RouteDefinition[]) => ClassDecorator;
}
declare module "angular2/src/router/route_config/route_config_normalizer" {
  import { RouteDefinition } from "angular2/src/router/route_config/route_config_decorator";
  import { Type } from "angular2/src/facade/lang";
  import { RouteRegistry } from "angular2/src/router/route_registry";
  /**
   * Given a JS Object that represents a route config, returns a corresponding Route, AsyncRoute,
   * AuxRoute or Redirect object.
   *
   * Also wraps an AsyncRoute's loader function to add the loaded component's route config to the
   * `RouteRegistry`.
   */
  export function normalizeRouteConfig(config: RouteDefinition, registry: RouteRegistry): RouteDefinition;
  export function assertComponentExists(component: Type, path: string): void;
}
declare module "angular2/src/router/route_registry" {
  import { Type } from "angular2/src/facade/lang";
  import { OpaqueToken } from "angular2/core";
  import { RouteDefinition } from "angular2/src/router/route_config/route_config_impl";
  import { Instruction } from "angular2/src/router/instruction";
  /**
   * Token used to bind the component with the top-level {@link RouteConfig}s for the
   * application.
   *
   * ### Example ([live demo](http://plnkr.co/edit/iRUP8B5OUbxCWQ3AcIDm))
   *
   * ```
   * import {Component} from 'angular2/core';
   * import {
   *   ROUTER_DIRECTIVES,
   *   ROUTER_PROVIDERS,
   *   RouteConfig
   * } from 'angular2/router';
   *
   * @Component({directives: [ROUTER_DIRECTIVES]})
   * @RouteConfig([
   *  {...},
   * ])
   * class AppCmp {
   *   // ...
   * }
   *
   * bootstrap(AppCmp, [ROUTER_PROVIDERS]);
   * ```
   */
  export const ROUTER_PRIMARY_COMPONENT: OpaqueToken;
  /**
   * The RouteRegistry holds route configurations for each component in an Angular app.
   * It is responsible for creating Instructions from URLs, and generating URLs based on route and
   * parameters.
   */
  export class RouteRegistry {
    private _rootComponent;
    private _rules;
    constructor(_rootComponent: Type);
    /**
     * Given a component and a configuration object, add the route to this registry
     */
    config(parentComponent: any, config: RouteDefinition): void;
    /**
     * Reads the annotations of a component and configures the registry based on them
     */
    configFromComponent(component: any): void;
    /**
     * Given a URL and a parent component, return the most specific instruction for navigating
     * the application into the state specified by the url
     */
    recognize(url: string, ancestorInstructions: Instruction[]): Promise<Instruction>;
    /**
     * Recognizes all parent-child routes, but creates unresolved auxiliary routes
     */
    private _recognize(parsedUrl, ancestorInstructions, _aux?);
    private _auxRoutesToUnresolved(auxRoutes, parentInstructions);
    /**
     * Given a normalized list with component names and params like: `['user', {id: 3 }]`
     * generates a url with a leading slash relative to the provided `parentComponent`.
     *
     * If the optional param `_aux` is `true`, then we generate starting at an auxiliary
     * route boundary.
     */
    generate(linkParams: any[], ancestorInstructions: Instruction[], _aux?: boolean): Instruction;
    private _generate(linkParams, ancestorInstructions, prevInstruction, _aux, _originalLink);
    hasRoute(name: string, parentComponent: any): boolean;
    generateDefault(componentCursor: Type): Instruction;
  }
}
declare module "angular2/src/router/lifecycle/lifecycle_annotations_impl" {
  export class RouteLifecycleHook {
    name: string;
    constructor(name: string);
  }
  export class CanActivate {
    fn: Function;
    constructor(fn: Function);
  }
  export const routerCanReuse: RouteLifecycleHook;
  export const routerCanDeactivate: RouteLifecycleHook;
  export const routerOnActivate: RouteLifecycleHook;
  export const routerOnReuse: RouteLifecycleHook;
  export const routerOnDeactivate: RouteLifecycleHook;
}
declare module "angular2/src/router/lifecycle/lifecycle_annotations" {
  import { ComponentInstruction } from "angular2/src/router/instruction";
  export { routerCanReuse, routerCanDeactivate, routerOnActivate, routerOnReuse, routerOnDeactivate } from "angular2/src/router/lifecycle/lifecycle_annotations_impl";
  /**
   * Defines route lifecycle hook `CanActivate`, which is called by the router to determine
   * if a component can be instantiated as part of a navigation.
   *
   * <aside class="is-right">
   * Note that unlike other lifecycle hooks, this one uses an annotation rather than an interface.
   * This is because the `CanActivate` function is called before the component is instantiated.
   * </aside>
   *
   * The `CanActivate` hook is called with two {@link ComponentInstruction}s as parameters, the first
   * representing the current route being navigated to, and the second parameter representing the
   * previous route or `null`.
   *
   * ```typescript
   * @CanActivate((next, prev) => boolean | Promise<boolean>)
   * ```
   *
   * If `CanActivate` returns or resolves to `false`, the navigation is cancelled.
   * If `CanActivate` throws or rejects, the navigation is also cancelled.
   * If `CanActivate` returns or resolves to `true`, navigation continues, the component is
   * instantiated, and the {@link OnActivate} hook of that component is called if implemented.
   *
   * ### Example
   *
   * {@example router/ts/can_activate/can_activate_example.ts region='canActivate' }
   */
  export var CanActivate: (hook: (next: ComponentInstruction, prev: ComponentInstruction) => Promise<boolean> | boolean) => ClassDecorator;
}
declare module "angular2/src/router/lifecycle/route_lifecycle_reflector" {
  import { RouteLifecycleHook } from "angular2/src/router/lifecycle/lifecycle_annotations_impl";
  export function hasLifecycleHook(e: RouteLifecycleHook, type: any): boolean;
  export function getCanActivateHook(type: any): Function;
}
declare module "angular2/src/router/interfaces" {
  import { ComponentInstruction } from "angular2/src/router/instruction";
  /**
   * Defines route lifecycle method `routerOnActivate`, which is called by the router at the end of a
   * successful route navigation.
   *
   * For a single component's navigation, only one of either {@link OnActivate} or {@link OnReuse}
   * will be called depending on the result of {@link CanReuse}.
   *
   * The `routerOnActivate` hook is called with two {@link ComponentInstruction}s as parameters, the
   * first
   * representing the current route being navigated to, and the second parameter representing the
   * previous route or `null`.
   *
   * If `routerOnActivate` returns a promise, the route change will wait until the promise settles to
   * instantiate and activate child components.
   *
   * ### Example
   * {@example router/ts/on_activate/on_activate_example.ts region='routerOnActivate'}
   */
  export interface OnActivate {
    routerOnActivate(nextInstruction: ComponentInstruction, prevInstruction: ComponentInstruction): any | Promise<any>;
  }
  /**
   * Defines route lifecycle method `routerOnReuse`, which is called by the router at the end of a
   * successful route navigation when {@link CanReuse} is implemented and returns or resolves to true.
   *
   * For a single component's navigation, only one of either {@link OnActivate} or {@link OnReuse}
   * will be called, depending on the result of {@link CanReuse}.
   *
   * The `routerOnReuse` hook is called with two {@link ComponentInstruction}s as parameters, the
   * first
   * representing the current route being navigated to, and the second parameter representing the
   * previous route or `null`.
   *
   * ### Example
   * {@example router/ts/reuse/reuse_example.ts region='reuseCmp'}
   */
  export interface OnReuse {
    routerOnReuse(nextInstruction: ComponentInstruction, prevInstruction: ComponentInstruction): any | Promise<any>;
  }
  /**
   * Defines route lifecycle method `routerOnDeactivate`, which is called by the router before
   * destroying
   * a component as part of a route change.
   *
   * The `routerOnDeactivate` hook is called with two {@link ComponentInstruction}s as parameters, the
   * first
   * representing the current route being navigated to, and the second parameter representing the
   * previous route.
   *
   * If `routerOnDeactivate` returns a promise, the route change will wait until the promise settles.
   *
   * ### Example
   * {@example router/ts/on_deactivate/on_deactivate_example.ts region='routerOnDeactivate'}
   */
  export interface OnDeactivate {
    routerOnDeactivate(nextInstruction: ComponentInstruction, prevInstruction: ComponentInstruction): any | Promise<any>;
  }
  /**
   * Defines route lifecycle method `routerCanReuse`, which is called by the router to determine
   * whether a
   * component should be reused across routes, or whether to destroy and instantiate a new component.
   *
   * The `routerCanReuse` hook is called with two {@link ComponentInstruction}s as parameters, the
   * first
   * representing the current route being navigated to, and the second parameter representing the
   * previous route.
   *
   * If `routerCanReuse` returns or resolves to `true`, the component instance will be reused and the
   * {@link OnDeactivate} hook will be run. If `routerCanReuse` returns or resolves to `false`, a new
   * component will be instantiated, and the existing component will be deactivated and removed as
   * part of the navigation.
   *
   * If `routerCanReuse` throws or rejects, the navigation will be cancelled.
   *
   * ### Example
   * {@example router/ts/reuse/reuse_example.ts region='reuseCmp'}
   */
  export interface CanReuse {
    routerCanReuse(nextInstruction: ComponentInstruction, prevInstruction: ComponentInstruction): boolean | Promise<boolean>;
  }
  /**
   * Defines route lifecycle method `routerCanDeactivate`, which is called by the router to determine
   * if a component can be removed as part of a navigation.
   *
   * The `routerCanDeactivate` hook is called with two {@link ComponentInstruction}s as parameters,
   * the
   * first representing the current route being navigated to, and the second parameter
   * representing the previous route.
   *
   * If `routerCanDeactivate` returns or resolves to `false`, the navigation is cancelled. If it
   * returns or
   * resolves to `true`, then the navigation continues, and the component will be deactivated
   * (the {@link OnDeactivate} hook will be run) and removed.
   *
   * If `routerCanDeactivate` throws or rejects, the navigation is also cancelled.
   *
   * ### Example
   * {@example router/ts/can_deactivate/can_deactivate_example.ts region='routerCanDeactivate'}
   */
  export interface CanDeactivate {
    routerCanDeactivate(nextInstruction: ComponentInstruction, prevInstruction: ComponentInstruction): boolean | Promise<boolean>;
  }
}
declare module "angular2/src/router/directives/router_outlet" {
  import { DynamicComponentLoader, ElementRef, OnDestroy } from "angular2/core";
  import * as routerMod from "angular2/src/router/router";
  import { ComponentInstruction } from "angular2/src/router/instruction";
  /**
   * A router outlet is a placeholder that Angular dynamically fills based on the application's route.
   *
   * ## Use
   *
   * ```
   * <router-outlet></router-outlet>
   * ```
   */
  export class RouterOutlet implements OnDestroy {
    private _elementRef;
    private _loader;
    private _parentRouter;
    name: string;
    private _componentRef;
    private _currentInstruction;
    constructor(_elementRef: ElementRef, _loader: DynamicComponentLoader, _parentRouter: routerMod.Router, nameAttr: string);
    /**
     * Called by the Router to instantiate a new component during the commit phase of a navigation.
     * This method in turn is responsible for calling the `routerOnActivate` hook of its child.
     */
    activate(nextInstruction: ComponentInstruction): Promise<any>;
    /**
     * Called by the {@link Router} during the commit phase of a navigation when an outlet
     * reuses a component between different routes.
     * This method in turn is responsible for calling the `routerOnReuse` hook of its child.
     */
    reuse(nextInstruction: ComponentInstruction): Promise<any>;
    /**
     * Called by the {@link Router} when an outlet disposes of a component's contents.
     * This method in turn is responsible for calling the `routerOnDeactivate` hook of its child.
     */
    deactivate(nextInstruction: ComponentInstruction): Promise<any>;
    /**
     * Called by the {@link Router} during recognition phase of a navigation.
     *
     * If this resolves to `false`, the given navigation is cancelled.
     *
     * This method delegates to the child component's `routerCanDeactivate` hook if it exists,
     * and otherwise resolves to true.
     */
    routerCanDeactivate(nextInstruction: ComponentInstruction): Promise<boolean>;
    /**
     * Called by the {@link Router} during recognition phase of a navigation.
     *
     * If the new child component has a different Type than the existing child component,
     * this will resolve to `false`. You can't reuse an old component when the new component
     * is of a different Type.
     *
     * Otherwise, this method delegates to the child component's `routerCanReuse` hook if it exists,
     * or resolves to true if the hook is not present.
     */
    routerCanReuse(nextInstruction: ComponentInstruction): Promise<boolean>;
    ngOnDestroy(): void;
  }
}
declare module "angular2/src/router/location/platform_location" {
  /**
   * This class should not be used directly by an application developer. Instead, use
   * {@link Location}.
   *
   * `PlatformLocation` encapsulates all calls to DOM apis, which allows the Router to be platform
   * agnostic.
   * This means that we can have different implementation of `PlatformLocation` for the different
   * platforms
   * that angular supports. For example, the default `PlatformLocation` is {@link
   * BrowserPlatformLocation},
   * however when you run your app in a WebWorker you use {@link WebWorkerPlatformLocation}.
   *
   * The `PlatformLocation` class is used directly by all implementations of {@link LocationStrategy}
   * when
   * they need to interact with the DOM apis like pushState, popState, etc...
   *
   * {@link LocationStrategy} in turn is used by the {@link Location} service which is used directly
   * by
   * the {@link Router} in order to navigate between routes. Since all interactions between {@link
   * Router} /
   * {@link Location} / {@link LocationStrategy} and DOM apis flow through the `PlatformLocation`
   * class
   * they are all platform independent.
   */
  export abstract class PlatformLocation {
    abstract getBaseHrefFromDOM(): string;
    abstract onPopState(fn: UrlChangeListener): void;
    abstract onHashChange(fn: UrlChangeListener): void;
    pathname: string;
    search: string;
    hash: string;
    abstract replaceState(state: any, title: string, url: string): void;
    abstract pushState(state: any, title: string, url: string): void;
    abstract forward(): void;
    abstract back(): void;
  }
  /**
   * A serializable version of the event from onPopState or onHashChange
   */
  export interface UrlChangeEvent {
    type: string;
  }
  export interface UrlChangeListener {
    (e: UrlChangeEvent): any;
  }
}
declare module "angular2/src/router/location/location_strategy" {
  import { OpaqueToken } from "angular2/core";
  import { UrlChangeListener } from "angular2/src/router/location/platform_location";
  /**
   * `LocationStrategy` is responsible for representing and reading route state
   * from the browser's URL. Angular provides two strategies:
   * {@link HashLocationStrategy} and {@link PathLocationStrategy} (default).
   *
   * This is used under the hood of the {@link Location} service.
   *
   * Applications should use the {@link Router} or {@link Location} services to
   * interact with application route state.
   *
   * For instance, {@link HashLocationStrategy} produces URLs like
   * `http://example.com#/foo`, and {@link PathLocationStrategy} produces
   * `http://example.com/foo` as an equivalent URL.
   *
   * See these two classes for more.
   */
  export abstract class LocationStrategy {
    abstract path(): string;
    abstract prepareExternalUrl(internal: string): string;
    abstract pushState(state: any, title: string, url: string, queryParams: string): void;
    abstract replaceState(state: any, title: string, url: string, queryParams: string): void;
    abstract forward(): void;
    abstract back(): void;
    abstract onPopState(fn: UrlChangeListener): void;
    abstract getBaseHref(): string;
  }
  /**
   * The `APP_BASE_HREF` token represents the base href to be used with the
   * {@link PathLocationStrategy}.
   *
   * If you're using {@link PathLocationStrategy}, you must provide a provider to a string
   * representing the URL prefix that should be preserved when generating and recognizing
   * URLs.
   *
   * ### Example
   *
   * ```
   * import {Component} from 'angular2/core';
   * import {ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouteConfig} from 'angular2/router';
   *
   * @Component({directives: [ROUTER_DIRECTIVES]})
   * @RouteConfig([
   *  {...},
   * ])
   * class AppCmp {
   *   // ...
   * }
   *
   * bootstrap(AppCmp, [
   *   ROUTER_PROVIDERS,
   *   provide(APP_BASE_HREF, {useValue: '/my/app'})
   * ]);
   * ```
   */
  export const APP_BASE_HREF: OpaqueToken;
  export function normalizeQueryParams(params: string): string;
  export function joinWithSlash(start: string, end: string): string;
}
declare module "angular2/src/router/location/location" {
  import { LocationStrategy } from "angular2/src/router/location/location_strategy";
  import { EventEmitter } from "angular2/src/facade/async";
  /**
   * `Location` is a service that applications can use to interact with a browser's URL.
   * Depending on which {@link LocationStrategy} is used, `Location` will either persist
   * to the URL's path or the URL's hash segment.
   *
   * Note: it's better to use {@link Router#navigate} service to trigger route changes. Use
   * `Location` only if you need to interact with or create normalized URLs outside of
   * routing.
   *
   * `Location` is responsible for normalizing the URL against the application's base href.
   * A normalized URL is absolute from the URL host, includes the application's base href, and has no
   * trailing slash:
   * - `/my/app/user/123` is normalized
   * - `my/app/user/123` **is not** normalized
   * - `/my/app/user/123/` **is not** normalized
   *
   * ### Example
   *
   * ```
   * import {Component} from 'angular2/core';
   * import {
   *   ROUTER_DIRECTIVES,
   *   ROUTER_PROVIDERS,
   *   RouteConfig,
   *   Location
   * } from 'angular2/router';
   *
   * @Component({directives: [ROUTER_DIRECTIVES]})
   * @RouteConfig([
   *  {...},
   * ])
   * class AppCmp {
   *   constructor(location: Location) {
   *     location.go('/foo');
   *   }
   * }
   *
   * bootstrap(AppCmp, [ROUTER_PROVIDERS]);
   * ```
   */
  export class Location {
    platformStrategy: LocationStrategy;
    /** @internal */
    _subject: EventEmitter<any>;
    /** @internal */
    _baseHref: string;
    constructor(platformStrategy: LocationStrategy);
    /**
     * Returns the normalized URL path.
     */
    path(): string;
    /**
     * Given a string representing a URL, returns the normalized URL path without leading or
     * trailing slashes
     */
    normalize(url: string): string;
    /**
     * Given a string representing a URL, returns the platform-specific external URL path.
     * If the given URL doesn't begin with a leading slash (`'/'`), this method adds one
     * before normalizing. This method will also add a hash if `HashLocationStrategy` is
     * used, or the `APP_BASE_HREF` if the `PathLocationStrategy` is in use.
     */
    prepareExternalUrl(url: string): string;
    /**
     * Changes the browsers URL to the normalized version of the given URL, and pushes a
     * new item onto the platform's history.
     */
    go(path: string, query?: string): void;
    /**
     * Changes the browsers URL to the normalized version of the given URL, and replaces
     * the top item on the platform's history stack.
     */
    replaceState(path: string, query?: string): void;
    /**
     * Navigates forward in the platform's history.
     */
    forward(): void;
    /**
     * Navigates back in the platform's history.
     */
    back(): void;
    /**
     * Subscribe to the platform's `popState` events.
     */
    subscribe(onNext: (value: any) => void, onThrow?: (exception: any) => void, onReturn?: () => void): Object;
  }
}
declare module "angular2/src/router/router" {
  import { Type } from "angular2/src/facade/lang";
  import { RouteRegistry } from "angular2/src/router/route_registry";
  import { Instruction } from "angular2/src/router/instruction";
  import { RouterOutlet } from "angular2/src/router/directives/router_outlet";
  import { Location } from "angular2/src/router/location/location";
  import { RouteDefinition } from "angular2/src/router/route_config/route_config_impl";
  /**
   * The `Router` is responsible for mapping URLs to components.
   *
   * You can see the state of the router by inspecting the read-only field `router.navigating`.
   * This may be useful for showing a spinner, for instance.
   *
   * ## Concepts
   *
   * Routers and component instances have a 1:1 correspondence.
   *
   * The router holds reference to a number of {@link RouterOutlet}.
   * An outlet is a placeholder that the router dynamically fills in depending on the current URL.
   *
   * When the router navigates from a URL, it must first recognize it and serialize it into an
   * `Instruction`.
   * The router uses the `RouteRegistry` to get an `Instruction`.
   */
  export class Router {
    registry: RouteRegistry;
    parent: Router;
    hostComponent: any;
    root: Router;
    navigating: boolean;
    lastNavigationAttempt: string;
    /**
     * The current `Instruction` for the router
     */
    currentInstruction: Instruction;
    private _currentNavigation;
    private _outlet;
    private _auxRouters;
    private _childRouter;
    private _subject;
    constructor(registry: RouteRegistry, parent: Router, hostComponent: any, root?: Router);
    /**
     * Constructs a child router. You probably don't need to use this unless you're writing a reusable
     * component.
     */
    childRouter(hostComponent: any): Router;
    /**
     * Constructs a child router. You probably don't need to use this unless you're writing a reusable
     * component.
     */
    auxRouter(hostComponent: any): Router;
    /**
     * Register an outlet to be notified of primary route changes.
     *
     * You probably don't need to use this unless you're writing a reusable component.
     */
    registerPrimaryOutlet(outlet: RouterOutlet): Promise<any>;
    /**
     * Unregister an outlet (because it was destroyed, etc).
     *
     * You probably don't need to use this unless you're writing a custom outlet implementation.
     */
    unregisterPrimaryOutlet(outlet: RouterOutlet): void;
    /**
     * Register an outlet to notified of auxiliary route changes.
     *
     * You probably don't need to use this unless you're writing a reusable component.
     */
    registerAuxOutlet(outlet: RouterOutlet): Promise<any>;
    /**
     * Given an instruction, returns `true` if the instruction is currently active,
     * otherwise `false`.
     */
    isRouteActive(instruction: Instruction): boolean;
    /**
     * Dynamically update the routing configuration and trigger a navigation.
     *
     * ### Usage
     *
     * ```
     * router.config([
     *   { 'path': '/', 'component': IndexComp },
     *   { 'path': '/user/:id', 'component': UserComp },
     * ]);
     * ```
     */
    config(definitions: RouteDefinition[]): Promise<any>;
    /**
     * Navigate based on the provided Route Link DSL. It's preferred to navigate with this method
     * over `navigateByUrl`.
     *
     * ### Usage
     *
     * This method takes an array representing the Route Link DSL:
     * ```
     * ['./MyCmp', {param: 3}]
     * ```
     * See the {@link RouterLink} directive for more.
     */
    navigate(linkParams: any[]): Promise<any>;
    /**
     * Navigate to a URL. Returns a promise that resolves when navigation is complete.
     * It's preferred to navigate with `navigate` instead of this method, since URLs are more brittle.
     *
     * If the given URL begins with a `/`, router will navigate absolutely.
     * If the given URL does not begin with `/`, the router will navigate relative to this component.
     */
    navigateByUrl(url: string, _skipLocationChange?: boolean): Promise<any>;
    /**
     * Navigate via the provided instruction. Returns a promise that resolves when navigation is
     * complete.
     */
    navigateByInstruction(instruction: Instruction, _skipLocationChange?: boolean): Promise<any>;
    /** @internal */
    _settleInstruction(instruction: Instruction): Promise<any>;
    /** @internal */
    _navigate(instruction: Instruction, _skipLocationChange: boolean): Promise<any>;
    private _emitNavigationFinish(url);
    _emitNavigationFail(url: any): void;
    private _afterPromiseFinishNavigating(promise);
    /** @internal */
    _routerCanReuse(instruction: Instruction): Promise<any>;
    private _canActivate(nextInstruction);
    private _routerCanDeactivate(instruction);
    /**
     * Updates this router and all descendant routers according to the given instruction
     */
    commit(instruction: Instruction, _skipLocationChange?: boolean): Promise<any>;
    /** @internal */
    _startNavigating(): void;
    /** @internal */
    _finishNavigating(): void;
    /**
     * Subscribe to URL updates from the router
     */
    subscribe(onNext: (value: any) => void, onError?: (value: any) => void): Object;
    /**
     * Removes the contents of this router's outlet and all descendant outlets
     */
    deactivate(instruction: Instruction): Promise<any>;
    /**
     * Given a URL, returns an instruction representing the component graph
     */
    recognize(url: string): Promise<Instruction>;
    private _getAncestorInstructions();
    /**
     * Navigates to either the last URL successfully navigated to, or the last URL requested if the
     * router has yet to successfully navigate.
     */
    renavigate(): Promise<any>;
    /**
     * Generate an `Instruction` based on the provided Route Link DSL.
     */
    generate(linkParams: any[]): Instruction;
  }
  export class RootRouter extends Router {
    /** @internal */
    _location: Location;
    /** @internal */
    _locationSub: Object;
    constructor(registry: RouteRegistry, location: Location, primaryComponent: Type);
    commit(instruction: Instruction, _skipLocationChange?: boolean): Promise<any>;
    dispose(): void;
  }
}
declare module "angular2/src/router/directives/router_link" {
  import { Router } from "angular2/src/router/router";
  import { Location } from "angular2/src/router/location/location";
  /**
   * The RouterLink directive lets you link to specific parts of your app.
   *
   * Consider the following route configuration:
  
   * ```
   * @RouteConfig([
   *   { path: '/user', component: UserCmp, as: 'User' }
   * ]);
   * class MyComp {}
   * ```
   *
   * When linking to this `User` route, you can write:
   *
   * ```
   * <a [routerLink]="['./User']">link to user component</a>
   * ```
   *
   * RouterLink expects the value to be an array of route names, followed by the params
   * for that level of routing. For instance `['/Team', {teamId: 1}, 'User', {userId: 2}]`
   * means that we want to generate a link for the `Team` route with params `{teamId: 1}`,
   * and with a child route `User` with params `{userId: 2}`.
   *
   * The first route name should be prepended with `/`, `./`, or `../`.
   * If the route begins with `/`, the router will look up the route from the root of the app.
   * If the route begins with `./`, the router will instead look in the current component's
   * children for the route. And if the route begins with `../`, the router will look at the
   * current component's parent.
   */
  export class RouterLink {
    private _router;
    private _location;
    private _routeParams;
    visibleHref: string;
    target: string;
    private _navigationInstruction;
    constructor(_router: Router, _location: Location);
    private _updateLink();
    isRouteActive: boolean;
    routeParams: any[];
    onClick(): boolean;
  }
}
declare module "angular2/src/router/location/hash_location_strategy" {
  import { LocationStrategy } from "angular2/src/router/location/location_strategy";
  import { UrlChangeListener } from "angular2/src/router/location/platform_location";
  import { PlatformLocation } from "angular2/src/router/location/platform_location";
  /**
   * `HashLocationStrategy` is a {@link LocationStrategy} used to configure the
   * {@link Location} service to represent its state in the
   * [hash fragment](https://en.wikipedia.org/wiki/Uniform_Resource_Locator#Syntax)
   * of the browser's URL.
   *
   * For instance, if you call `location.go('/foo')`, the browser's URL will become
   * `example.com#/foo`.
   *
   * ### Example
   *
   * ```
   * import {Component, provide} from 'angular2/core';
   * import {
   *   ROUTER_DIRECTIVES,
   *   ROUTER_PROVIDERS,
   *   RouteConfig,
   *   Location,
   *   LocationStrategy,
   *   HashLocationStrategy
   * } from 'angular2/router';
   *
   * @Component({directives: [ROUTER_DIRECTIVES]})
   * @RouteConfig([
   *  {...},
   * ])
   * class AppCmp {
   *   constructor(location: Location) {
   *     location.go('/foo');
   *   }
   * }
   *
   * bootstrap(AppCmp, [
   *   ROUTER_PROVIDERS,
   *   provide(LocationStrategy, {useClass: HashLocationStrategy})
   * ]);
   * ```
   */
  export class HashLocationStrategy extends LocationStrategy {
    private _platformLocation;
    private _baseHref;
    constructor(_platformLocation: PlatformLocation, _baseHref?: string);
    onPopState(fn: UrlChangeListener): void;
    getBaseHref(): string;
    path(): string;
    prepareExternalUrl(internal: string): string;
    pushState(state: any, title: string, path: string, queryParams: string): void;
    replaceState(state: any, title: string, path: string, queryParams: string): void;
    forward(): void;
    back(): void;
  }
}
declare module "angular2/src/router/location/path_location_strategy" {
  import { LocationStrategy } from "angular2/src/router/location/location_strategy";
  import { PlatformLocation, UrlChangeListener } from "angular2/src/router/location/platform_location";
  /**
   * `PathLocationStrategy` is a {@link LocationStrategy} used to configure the
   * {@link Location} service to represent its state in the
   * [path](https://en.wikipedia.org/wiki/Uniform_Resource_Locator#Syntax) of the
   * browser's URL.
   *
   * `PathLocationStrategy` is the default binding for {@link LocationStrategy}
   * provided in {@link ROUTER_PROVIDERS}.
   *
   * If you're using `PathLocationStrategy`, you must provide a provider for
   * {@link APP_BASE_HREF} to a string representing the URL prefix that should
   * be preserved when generating and recognizing URLs.
   *
   * For instance, if you provide an `APP_BASE_HREF` of `'/my/app'` and call
   * `location.go('/foo')`, the browser's URL will become
   * `example.com/my/app/foo`.
   *
   * ### Example
   *
   * ```
   * import {Component, provide} from 'angular2/core';
   * import {
   *   APP_BASE_HREF
   *   ROUTER_DIRECTIVES,
   *   ROUTER_PROVIDERS,
   *   RouteConfig,
   *   Location
   * } from 'angular2/router';
   *
   * @Component({directives: [ROUTER_DIRECTIVES]})
   * @RouteConfig([
   *  {...},
   * ])
   * class AppCmp {
   *   constructor(location: Location) {
   *     location.go('/foo');
   *   }
   * }
   *
   * bootstrap(AppCmp, [
   *   ROUTER_PROVIDERS, // includes binding to PathLocationStrategy
   *   provide(APP_BASE_HREF, {useValue: '/my/app'})
   * ]);
   * ```
   */
  export class PathLocationStrategy extends LocationStrategy {
    private _platformLocation;
    private _baseHref;
    constructor(_platformLocation: PlatformLocation, href?: string);
    onPopState(fn: UrlChangeListener): void;
    getBaseHref(): string;
    prepareExternalUrl(internal: string): string;
    path(): string;
    pushState(state: any, title: string, url: string, queryParams: string): void;
    replaceState(state: any, title: string, url: string, queryParams: string): void;
    forward(): void;
    back(): void;
  }
}
declare module "angular2/src/router/router_providers_common" {
  /**
   * The Platform agnostic ROUTER PROVIDERS
   */
  export const ROUTER_PROVIDERS_COMMON: any[];
}
declare module "angular2/src/facade/browser" {
  /**
   * JS version of browser APIs. This library can only run in the browser.
   */
  var win: Window;
  export { win as window };
  export var document: Document;
  export var location: Location;
  export var gc: () => any;
  export var performance: Performance;
  export const Event: any;
  export const MouseEvent: any;
  export const KeyboardEvent: any;
  export const EventTarget: any;
  export const History: any;
  export const Location: any;
  export const EventListener: any;
}
declare module "angular2/src/router/location/browser_platform_location" {
  import { UrlChangeListener } from "angular2/src/router/location/platform_location";
  import { PlatformLocation } from "angular2/src/router/location/platform_location";
  /**
   * `PlatformLocation` encapsulates all of the direct calls to platform APIs.
   * This class should not be used directly by an application developer. Instead, use
   * {@link Location}.
   */
  export class BrowserPlatformLocation extends PlatformLocation {
    private _location;
    private _history;
    constructor();
    /** @internal */
    _init(): void;
    /** @internal */
    location: Location;
    getBaseHrefFromDOM(): string;
    onPopState(fn: UrlChangeListener): void;
    onHashChange(fn: UrlChangeListener): void;
    pathname: string;
    search: string;
    hash: string;
    pushState(state: any, title: string, url: string): void;
    replaceState(state: any, title: string, url: string): void;
    forward(): void;
    back(): void;
  }
}
declare module "angular2/src/router/router_providers" {
  /**
   * A list of {@link Provider}s. To use the router, you must add this to your application.
   *
   * ### Example ([live demo](http://plnkr.co/edit/iRUP8B5OUbxCWQ3AcIDm))
   *
   * ```
   * import {Component} from 'angular2/core';
   * import {
   *   ROUTER_DIRECTIVES,
   *   ROUTER_PROVIDERS,
   *   RouteConfig
   * } from 'angular2/router';
   *
   * @Component({directives: [ROUTER_DIRECTIVES]})
   * @RouteConfig([
   *  {...},
   * ])
   * class AppCmp {
   *   // ...
   * }
   *
   * bootstrap(AppCmp, [ROUTER_PROVIDERS]);
   * ```
   */
  export const ROUTER_PROVIDERS: any[];
  /**
   * Use {@link ROUTER_PROVIDERS} instead.
   *
   * @deprecated
   */
  export const ROUTER_BINDINGS: any[];
}
declare module "angular2/router" {
  /**
   * @module
   * @description
   * Maps application URLs into application states, to support deep-linking and navigation.
   */
  export { Router } from "angular2/src/router/router";
  export { RouterOutlet } from "angular2/src/router/directives/router_outlet";
  export { RouterLink } from "angular2/src/router/directives/router_link";
  export { RouteParams, RouteData } from "angular2/src/router/instruction";
  export { PlatformLocation } from "angular2/src/router/location/platform_location";
  export { RouteRegistry, ROUTER_PRIMARY_COMPONENT } from "angular2/src/router/route_registry";
  export { LocationStrategy, APP_BASE_HREF } from "angular2/src/router/location/location_strategy";
  export { HashLocationStrategy } from "angular2/src/router/location/hash_location_strategy";
  export { PathLocationStrategy } from "angular2/src/router/location/path_location_strategy";
  export { Location } from "angular2/src/router/location/location";
  export * from "angular2/src/router/route_config/route_config_decorator";
  export * from "angular2/src/router/route_definition";
  export { OnActivate, OnDeactivate, OnReuse, CanDeactivate, CanReuse } from "angular2/src/router/interfaces";
  export { CanActivate } from "angular2/src/router/lifecycle/lifecycle_annotations";
  export { Instruction, ComponentInstruction } from "angular2/src/router/instruction";
  export { OpaqueToken } from "angular2/core";
  export { ROUTER_PROVIDERS_COMMON } from "angular2/src/router/router_providers_common";
  export { ROUTER_PROVIDERS, ROUTER_BINDINGS } from "angular2/src/router/router_providers";
  /**
   * A list of directives. To use the router directives like {@link RouterOutlet} and
   * {@link RouterLink}, add this to your `directives` array in the {@link View} decorator of your
   * component.
   *
   * ### Example ([live demo](http://plnkr.co/edit/iRUP8B5OUbxCWQ3AcIDm))
   *
   * ```
   * import {Component} from 'angular2/core';
   * import {ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouteConfig} from 'angular2/router';
   *
   * @Component({directives: [ROUTER_DIRECTIVES]})
   * @RouteConfig([
   *  {...},
   * ])
   * class AppCmp {
   *    // ...
   * }
   *
   * bootstrap(AppCmp, [ROUTER_PROVIDERS]);
   * ```
   */
  export const ROUTER_DIRECTIVES: any[];
}
declare module "angular2/src/router/directives/router_link_transform" {
  import { TemplateAstVisitor, ElementAst, BoundDirectivePropertyAst, DirectiveAst } from "angular2/compiler";
  import { AST } from "angular2/src/core/change_detection/parser/ast";
  import { Parser } from "angular2/src/core/change_detection/parser/parser";
  export function parseRouterLinkExpression(parser: Parser, exp: string): AST;
  /**
   * A compiler plugin that implements the router link DSL.
   */
  export class RouterLinkTransform implements TemplateAstVisitor {
    private astTransformer;
    constructor(parser: Parser);
    visitNgContent(ast: any, context: any): any;
    visitEmbeddedTemplate(ast: any, context: any): any;
    visitElement(ast: ElementAst, context: any): any;
    visitVariable(ast: any, context: any): any;
    visitEvent(ast: any, context: any): any;
    visitElementProperty(ast: any, context: any): any;
    visitAttr(ast: any, context: any): any;
    visitBoundText(ast: any, context: any): any;
    visitText(ast: any, context: any): any;
    visitDirective(ast: DirectiveAst, context: any): any;
    visitDirectiveProperty(ast: BoundDirectivePropertyAst, context: any): any;
  }
}
declare module "angular2/src/platform/dom/events/event_manager" {
  import { OpaqueToken } from "angular2/src/core/di";
  import { NgZone } from "angular2/src/core/zone/ng_zone";
  export const EVENT_MANAGER_PLUGINS: OpaqueToken;
  export class EventManager {
    private _zone;
    private _plugins;
    constructor(plugins: EventManagerPlugin[], _zone: NgZone);
    addEventListener(element: HTMLElement, eventName: string, handler: Function): Function;
    addGlobalEventListener(target: string, eventName: string, handler: Function): Function;
    getZone(): NgZone;
    /** @internal */
    _findPluginFor(eventName: string): EventManagerPlugin;
  }
  export class EventManagerPlugin {
    manager: EventManager;
    supports(eventName: string): boolean;
    addEventListener(element: HTMLElement, eventName: string, handler: Function): Function;
    addGlobalEventListener(element: string, eventName: string, handler: Function): Function;
  }
}
declare module "angular2/src/platform/dom/events/dom_events" {
  import { EventManagerPlugin } from "angular2/src/platform/dom/events/event_manager";
  export class DomEventsPlugin extends EventManagerPlugin {
    supports(eventName: string): boolean;
    addEventListener(element: HTMLElement, eventName: string, handler: Function): Function;
    addGlobalEventListener(target: string, eventName: string, handler: Function): Function;
  }
}
declare module "angular2/src/platform/dom/events/key_events" {
  import { EventManagerPlugin } from "angular2/src/platform/dom/events/event_manager";
  import { NgZone } from "angular2/src/core/zone/ng_zone";
  export class KeyEventsPlugin extends EventManagerPlugin {
    constructor();
    supports(eventName: string): boolean;
    addEventListener(element: HTMLElement, eventName: string, handler: Function): Function;
    static parseEventName(eventName: string): {
      [key: string]: string;
    };
    static getEventFullKey(event: KeyboardEvent): string;
    static eventCallback(element: HTMLElement, fullKey: any, handler: Function, zone: NgZone): Function;
    /** @internal */
    static _normalizeKey(keyName: string): string;
  }
}
declare module "angular2/src/platform/dom/events/hammer_common" {
  import { EventManagerPlugin } from "angular2/src/platform/dom/events/event_manager";
  export class HammerGesturesPluginCommon extends EventManagerPlugin {
    constructor();
    supports(eventName: string): boolean;
  }
}
declare module "angular2/src/platform/dom/events/hammer_gestures" {
  import { HammerGesturesPluginCommon } from "angular2/src/platform/dom/events/hammer_common";
  export class HammerGesturesPlugin extends HammerGesturesPluginCommon {
    supports(eventName: string): boolean;
    addEventListener(element: HTMLElement, eventName: string, handler: Function): Function;
  }
}
declare module "angular2/src/platform/dom/dom_tokens" {
  import { OpaqueToken } from "angular2/src/core/di";
  /**
   * A DI Token representing the main rendering context. In a browser this is the DOM Document.
   *
   * Note: Document might not be available in the Application Context when Application and Rendering
   * Contexts are not the same (e.g. when running the application into a Web Worker).
   */
  export const DOCUMENT: OpaqueToken;
}
declare module "angular2/src/animate/css_animation_options" {
  export class CssAnimationOptions {
    /** initial styles for the element */
    fromStyles: {
      [key: string]: any;
    };
    /** destination styles for the element */
    toStyles: {
      [key: string]: any;
    };
    /** classes to be added to the element */
    classesToAdd: string[];
    /** classes to be removed from the element */
    classesToRemove: string[];
    /** classes to be added for the duration of the animation */
    animationClasses: string[];
    /** override the duration of the animation (in milliseconds) */
    duration: number;
    /** override the transition delay (in milliseconds) */
    delay: number;
  }
}
declare module "angular2/src/facade/math" {
  export var Math: any;
  export var NaN: any;
}
declare module "angular2/src/platform/dom/util" {
  export function camelCaseToDashCase(input: string): string;
  export function dashCaseToCamelCase(input: string): string;
}
declare module "angular2/src/animate/browser_details" {
  export class BrowserDetails {
    elapsedTimeIncludesDelay: boolean;
    constructor();
    /**
     * Determines if `event.elapsedTime` includes transition delay in the current browser.  At this
     * time, Chrome and Opera seem to be the only browsers that include this.
     */
    doesElapsedTimeIncludesDelay(): void;
    raf(callback: Function, frames?: number): Function;
  }
}
declare module "angular2/src/animate/animation" {
  import { BrowserDetails } from "angular2/src/animate/browser_details";
  import { CssAnimationOptions } from "angular2/src/animate/css_animation_options";
  export class Animation {
    element: HTMLElement;
    data: CssAnimationOptions;
    browserDetails: BrowserDetails;
    /** functions to be called upon completion */
    callbacks: Function[];
    /** the duration (ms) of the animation (whether from CSS or manually set) */
    computedDuration: number;
    /** the animation delay (ms) (whether from CSS or manually set) */
    computedDelay: number;
    /** timestamp of when the animation started */
    startTime: number;
    /** functions for removing event listeners */
    eventClearFunctions: Function[];
    /** flag used to track whether or not the animation has finished */
    completed: boolean;
    private _stringPrefix;
    /** total amount of time that the animation should take including delay */
    totalTime: number;
    /**
     * Stores the start time and starts the animation
     * @param element
     * @param data
     * @param browserDetails
     */
    constructor(element: HTMLElement, data: CssAnimationOptions, browserDetails: BrowserDetails);
    wait(callback: Function): void;
    /**
     * Sets up the initial styles before the animation is started
     */
    setup(): void;
    /**
     * After the initial setup has occurred, this method adds the animation styles
     */
    start(): void;
    /**
     * Applies the provided styles to the element
     * @param styles
     */
    applyStyles(styles: {
      [key: string]: any;
    }): void;
    /**
     * Adds the provided classes to the element
     * @param classes
     */
    addClasses(classes: string[]): void;
    /**
     * Removes the provided classes from the element
     * @param classes
     */
    removeClasses(classes: string[]): void;
    /**
     * Adds events to track when animations have finished
     */
    addEvents(): void;
    handleAnimationEvent(event: any): void;
    /**
     * Runs all animation callbacks and removes temporary classes
     */
    handleAnimationCompleted(): void;
    /**
     * Adds animation callbacks to be called upon completion
     * @param callback
     * @returns {Animation}
     */
    onComplete(callback: Function): Animation;
    /**
     * Converts the duration string to the number of milliseconds
     * @param duration
     * @returns {number}
     */
    parseDurationString(duration: string): number;
    /**
     * Strips the letters from the duration string
     * @param str
     * @returns {string}
     */
    stripLetters(str: string): string;
  }
}
declare module "angular2/src/animate/css_animation_builder" {
  import { CssAnimationOptions } from "angular2/src/animate/css_animation_options";
  import { Animation } from "angular2/src/animate/animation";
  import { BrowserDetails } from "angular2/src/animate/browser_details";
  export class CssAnimationBuilder {
    browserDetails: BrowserDetails;
    /** @type {CssAnimationOptions} */
    data: CssAnimationOptions;
    /**
     * Accepts public properties for CssAnimationBuilder
     */
    constructor(browserDetails: BrowserDetails);
    /**
     * Adds a temporary class that will be removed at the end of the animation
     * @param className
     */
    addAnimationClass(className: string): CssAnimationBuilder;
    /**
     * Adds a class that will remain on the element after the animation has finished
     * @param className
     */
    addClass(className: string): CssAnimationBuilder;
    /**
     * Removes a class from the element
     * @param className
     */
    removeClass(className: string): CssAnimationBuilder;
    /**
     * Sets the animation duration (and overrides any defined through CSS)
     * @param duration
     */
    setDuration(duration: number): CssAnimationBuilder;
    /**
     * Sets the animation delay (and overrides any defined through CSS)
     * @param delay
     */
    setDelay(delay: number): CssAnimationBuilder;
    /**
     * Sets styles for both the initial state and the destination state
     * @param from
     * @param to
     */
    setStyles(from: {
      [key: string]: any;
    }, to: {
      [key: string]: any;
    }): CssAnimationBuilder;
    /**
     * Sets the initial styles for the animation
     * @param from
     */
    setFromStyles(from: {
      [key: string]: any;
    }): CssAnimationBuilder;
    /**
     * Sets the destination styles for the animation
     * @param to
     */
    setToStyles(to: {
      [key: string]: any;
    }): CssAnimationBuilder;
    /**
     * Starts the animation and returns a promise
     * @param element
     */
    start(element: HTMLElement): Animation;
  }
}
declare module "angular2/src/animate/animation_builder" {
  import { CssAnimationBuilder } from "angular2/src/animate/css_animation_builder";
  import { BrowserDetails } from "angular2/src/animate/browser_details";
  export class AnimationBuilder {
    browserDetails: BrowserDetails;
    /**
     * Used for DI
     * @param browserDetails
     */
    constructor(browserDetails: BrowserDetails);
    /**
     * Creates a new CSS Animation
     * @returns {CssAnimationBuilder}
     */
    css(): CssAnimationBuilder;
  }
}
declare module "angular2/src/platform/dom/shared_styles_host" {
  export class SharedStylesHost {
    /** @internal */
    _styles: string[];
    /** @internal */
    _stylesSet: Set<string>;
    constructor();
    addStyles(styles: string[]): void;
    onStylesAdded(additions: string[]): void;
    getAllStyles(): string[];
  }
  export class DomSharedStylesHost extends SharedStylesHost {
    private _hostNodes;
    constructor(doc: any);
    /** @internal */
    _addStylesToHost(styles: string[], host: Node): void;
    addHost(hostNode: Node): void;
    removeHost(hostNode: Node): void;
    onStylesAdded(additions: string[]): void;
  }
}
declare module "angular2/src/platform/dom/dom_renderer" {
  import { AnimationBuilder } from "angular2/src/animate/animation_builder";
  import { DomSharedStylesHost } from "angular2/src/platform/dom/shared_styles_host";
  import { Renderer, RootRenderer, RenderComponentType, RenderDebugInfo } from "angular2/src/core/render/api";
  import { EventManager } from "angular2/src/platform/dom/events/event_manager";
  export abstract class DomRootRenderer implements RootRenderer {
    document: any;
    eventManager: EventManager;
    sharedStylesHost: DomSharedStylesHost;
    animate: AnimationBuilder;
    private _registeredComponents;
    constructor(document: any, eventManager: EventManager, sharedStylesHost: DomSharedStylesHost, animate: AnimationBuilder);
    renderComponent(componentProto: RenderComponentType): Renderer;
  }
  export class DomRootRenderer_ extends DomRootRenderer {
    constructor(_document: any, _eventManager: EventManager, sharedStylesHost: DomSharedStylesHost, animate: AnimationBuilder);
  }
  export class DomRenderer implements Renderer {
    private _rootRenderer;
    private componentProto;
    private _contentAttr;
    private _hostAttr;
    private _styles;
    constructor(_rootRenderer: DomRootRenderer, componentProto: RenderComponentType);
    renderComponent(componentProto: RenderComponentType): Renderer;
    selectRootElement(selector: string): Element;
    createElement(parent: Element, name: string): Node;
    createViewRoot(hostElement: any): any;
    createTemplateAnchor(parentElement: any): any;
    createText(parentElement: any, value: string): any;
    projectNodes(parentElement: any, nodes: any[]): void;
    attachViewAfter(node: any, viewRootNodes: any[]): void;
    detachView(viewRootNodes: any[]): void;
    destroyView(hostElement: any, viewAllNodes: any[]): void;
    listen(renderElement: any, name: string, callback: Function): Function;
    listenGlobal(target: string, name: string, callback: Function): Function;
    setElementProperty(renderElement: any, propertyName: string, propertyValue: any): void;
    setElementAttribute(renderElement: any, attributeName: string, attributeValue: string): void;
    setBindingDebugInfo(renderElement: any, propertyName: string, propertyValue: string): void;
    setElementDebugInfo(renderElement: any, info: RenderDebugInfo): void;
    setElementClass(renderElement: any, className: string, isAdd: boolean): void;
    setElementStyle(renderElement: any, styleName: string, styleValue: string): void;
    invokeElementMethod(renderElement: any, methodName: string, args: any[]): void;
    setText(renderNode: any, text: string): void;
    /**
     * Performs animations if necessary
     * @param node
     */
    animateNodeEnter(node: Node): void;
    /**
     * If animations are necessary, performs animations then removes the element; otherwise, it just
     * removes the element.
     * @param node
     */
    animateNodeLeave(node: Node): void;
  }
  export const COMPONENT_VARIABLE: string;
  export const HOST_ATTR: string;
  export const CONTENT_ATTR: string;
}
declare module "angular2/src/platform/browser/xhr_impl" {
  import { XHR } from "angular2/src/compiler/xhr";
  export class XHRImpl extends XHR {
    get(url: string): Promise<string>;
  }
}
declare module "angular2/src/platform/browser/generic_browser_adapter" {
  import { Type } from "angular2/src/facade/lang";
  import { DomAdapter } from "angular2/src/platform/dom/dom_adapter";
  /**
   * Provides DOM operations in any browser environment.
   */
  export abstract class GenericBrowserDomAdapter extends DomAdapter {
    private _animationPrefix;
    private _transitionEnd;
    constructor();
    getXHR(): Type;
    getDistributedNodes(el: HTMLElement): Node[];
    resolveAndSetHref(el: HTMLAnchorElement, baseUrl: string, href: string): void;
    supportsDOMEvents(): boolean;
    supportsNativeShadowDOM(): boolean;
    getAnimationPrefix(): string;
    getTransitionEnd(): string;
    supportsAnimation(): boolean;
  }
}
declare module "angular2/src/platform/browser/browser_adapter" {
  import { GenericBrowserDomAdapter } from "angular2/src/platform/browser/generic_browser_adapter";
  /**
   * A `DomAdapter` powered by full browser DOM APIs.
   */
  export class BrowserDomAdapter extends GenericBrowserDomAdapter {
    parse(templateHtml: string): void;
    static makeCurrent(): void;
    hasProperty(element: any, name: string): boolean;
    setProperty(el: any, name: string, value: any): void;
    getProperty(el: any, name: string): any;
    invoke(el: any, methodName: string, args: any[]): any;
    logError(error: any): void;
    log(error: any): void;
    logGroup(error: any): void;
    logGroupEnd(): void;
    attrToPropMap: any;
    query(selector: string): any;
    querySelector(el: any, selector: string): HTMLElement;
    querySelectorAll(el: any, selector: string): any[];
    on(el: any, evt: any, listener: any): void;
    onAndCancel(el: any, evt: any, listener: any): Function;
    dispatchEvent(el: any, evt: any): void;
    createMouseEvent(eventType: string): MouseEvent;
    createEvent(eventType: any): Event;
    preventDefault(evt: Event): void;
    isPrevented(evt: Event): boolean;
    getInnerHTML(el: any): string;
    getOuterHTML(el: any): string;
    nodeName(node: Node): string;
    nodeValue(node: Node): string;
    type(node: HTMLInputElement): string;
    content(node: Node): Node;
    firstChild(el: any): Node;
    nextSibling(el: any): Node;
    parentElement(el: any): Node;
    childNodes(el: any): Node[];
    childNodesAsList(el: any): any[];
    clearNodes(el: any): void;
    appendChild(el: any, node: any): void;
    removeChild(el: any, node: any): void;
    replaceChild(el: Node, newChild: any, oldChild: any): void;
    remove(node: any): Node;
    insertBefore(el: any, node: any): void;
    insertAllBefore(el: any, nodes: any): void;
    insertAfter(el: any, node: any): void;
    setInnerHTML(el: any, value: any): void;
    getText(el: any): string;
    setText(el: any, value: string): void;
    getValue(el: any): string;
    setValue(el: any, value: string): void;
    getChecked(el: any): boolean;
    setChecked(el: any, value: boolean): void;
    createComment(text: string): Comment;
    createTemplate(html: any): HTMLElement;
    createElement(tagName: any, doc?: Document): HTMLElement;
    createElementNS(ns: any, tagName: any, doc?: Document): Element;
    createTextNode(text: string, doc?: Document): Text;
    createScriptTag(attrName: string, attrValue: string, doc?: Document): HTMLScriptElement;
    createStyleElement(css: string, doc?: Document): HTMLStyleElement;
    createShadowRoot(el: HTMLElement): DocumentFragment;
    getShadowRoot(el: HTMLElement): DocumentFragment;
    getHost(el: HTMLElement): HTMLElement;
    clone(node: Node): Node;
    getElementsByClassName(element: any, name: string): HTMLElement[];
    getElementsByTagName(element: any, name: string): HTMLElement[];
    classList(element: any): any[];
    addClass(element: any, className: string): void;
    removeClass(element: any, className: string): void;
    hasClass(element: any, className: string): boolean;
    setStyle(element: any, styleName: string, styleValue: string): void;
    removeStyle(element: any, stylename: string): void;
    getStyle(element: any, stylename: string): string;
    hasStyle(element: any, styleName: string, styleValue?: string): boolean;
    tagName(element: any): string;
    attributeMap(element: any): Map<string, string>;
    hasAttribute(element: any, attribute: string): boolean;
    hasAttributeNS(element: any, ns: string, attribute: string): boolean;
    getAttribute(element: any, attribute: string): string;
    getAttributeNS(element: any, ns: string, name: string): string;
    setAttribute(element: any, name: string, value: string): void;
    setAttributeNS(element: any, ns: string, name: string, value: string): void;
    removeAttribute(element: any, attribute: string): void;
    removeAttributeNS(element: any, ns: string, name: string): void;
    templateAwareRoot(el: any): any;
    createHtmlDocument(): HTMLDocument;
    defaultDoc(): HTMLDocument;
    getBoundingClientRect(el: any): any;
    getTitle(): string;
    setTitle(newTitle: string): void;
    elementMatches(n: any, selector: string): boolean;
    isTemplateElement(el: any): boolean;
    isTextNode(node: Node): boolean;
    isCommentNode(node: Node): boolean;
    isElementNode(node: Node): boolean;
    hasShadowRoot(node: any): boolean;
    isShadowRoot(node: any): boolean;
    importIntoDoc(node: Node): any;
    adoptNode(node: Node): any;
    getHref(el: Element): string;
    getEventKey(event: any): string;
    getGlobalEventTarget(target: string): EventTarget;
    getHistory(): History;
    getLocation(): Location;
    getBaseHref(): string;
    resetBaseElement(): void;
    getUserAgent(): string;
    setData(element: any, name: string, value: string): void;
    getData(element: any, name: string): string;
    getComputedStyle(element: any): any;
    setGlobalVar(path: string, value: any): void;
    requestAnimationFrame(callback: any): number;
    cancelAnimationFrame(id: number): void;
    performanceNow(): number;
  }
}
declare module "angular2/src/platform/browser/testability" {
  import { TestabilityRegistry, Testability, GetTestability } from "angular2/core";
  export class BrowserGetTestability implements GetTestability {
    static init(): void;
    addToWindow(registry: TestabilityRegistry): void;
    findTestabilityInTree(registry: TestabilityRegistry, elem: any, findInAncestors: boolean): Testability;
  }
}
declare module "angular2/src/core/profile/wtf_init" {
  /**
   * This is here because DART requires it. It is noop in JS.
   */
  export function wtfInit(): void;
}
declare module "angular2/src/platform/dom/debug/by" {
  import { Type } from "angular2/src/facade/lang";
  import { Predicate } from "angular2/src/facade/collection";
  import { DebugElement } from "angular2/core";
  /**
   * Predicates for use with {@link DebugElement}'s query functions.
   */
  export class By {
    /**
     * Match all elements.
     *
     * ## Example
     *
     * {@example platform/dom/debug/ts/by/by.ts region='by_all'}
     */
    static all(): Predicate<DebugElement>;
    /**
     * Match elements by the given CSS selector.
     *
     * ## Example
     *
     * {@example platform/dom/debug/ts/by/by.ts region='by_css'}
     */
    static css(selector: string): Predicate<DebugElement>;
    /**
     * Match elements that have the given directive present.
     *
     * ## Example
     *
     * {@example platform/dom/debug/ts/by/by.ts region='by_directive'}
     */
    static directive(type: Type): Predicate<DebugElement>;
  }
}
declare module "angular2/src/core/debug/debug_renderer" {
  import { Renderer, RootRenderer, RenderComponentType, RenderDebugInfo } from "angular2/src/core/render/api";
  export class DebugDomRootRenderer implements RootRenderer {
    private _delegate;
    constructor(_delegate: RootRenderer);
    renderComponent(componentProto: RenderComponentType): Renderer;
  }
  export class DebugDomRenderer implements Renderer {
    private _rootRenderer;
    private _delegate;
    constructor(_rootRenderer: DebugDomRootRenderer, _delegate: Renderer);
    renderComponent(componentType: RenderComponentType): Renderer;
    selectRootElement(selector: string): any;
    createElement(parentElement: any, name: string): any;
    createViewRoot(hostElement: any): any;
    createTemplateAnchor(parentElement: any): any;
    createText(parentElement: any, value: string): any;
    projectNodes(parentElement: any, nodes: any[]): any;
    attachViewAfter(node: any, viewRootNodes: any[]): any;
    detachView(viewRootNodes: any[]): any;
    destroyView(hostElement: any, viewAllNodes: any[]): any;
    listen(renderElement: any, name: string, callback: Function): Function;
    listenGlobal(target: string, name: string, callback: Function): Function;
    setElementProperty(renderElement: any, propertyName: string, propertyValue: any): any;
    setElementAttribute(renderElement: any, attributeName: string, attributeValue: string): any;
    /**
     * Used only in debug mode to serialize property changes to comment nodes,
     * such as <template> placeholders.
     */
    setBindingDebugInfo(renderElement: any, propertyName: string, propertyValue: string): any;
    /**
     * Used only in development mode to set information needed by the DebugNode for this element.
     */
    setElementDebugInfo(renderElement: any, info: RenderDebugInfo): any;
    setElementClass(renderElement: any, className: string, isAdd: boolean): any;
    setElementStyle(renderElement: any, styleName: string, styleValue: string): any;
    invokeElementMethod(renderElement: any, methodName: string, args: any[]): any;
    setText(renderNode: any, text: string): any;
  }
}
declare module "angular2/src/platform/dom/debug/ng_probe" {
  import { DebugNode } from "angular2/src/core/debug/debug_node";
  /**
   * Returns a {@link DebugElement} for the given native DOM element, or
   * null if the given native element does not have an Angular view associated
   * with it.
   */
  export function inspectNativeElement(element: any): DebugNode;
  /**
   * Providers which support debugging Angular applications (e.g. via `ng.probe`).
   */
  export const ELEMENT_PROBE_PROVIDERS: any[];
  export const ELEMENT_PROBE_PROVIDERS_PROD_MODE: any[];
}
declare module "angular2/platform/common_dom" {
  /**
   * This is a set of classes and objects that can be used both in the browser and on the server.
   */
  export { DOM, setRootDomAdapter, DomAdapter } from "angular2/src/platform/dom/dom_adapter";
  export { DomRenderer } from "angular2/src/platform/dom/dom_renderer";
  export { DOCUMENT } from "angular2/src/platform/dom/dom_tokens";
  export { SharedStylesHost, DomSharedStylesHost } from "angular2/src/platform/dom/shared_styles_host";
  export { DomEventsPlugin } from "angular2/src/platform/dom/events/dom_events";
  export { EVENT_MANAGER_PLUGINS, EventManager, EventManagerPlugin } from "angular2/src/platform/dom/events/event_manager";
  export * from "angular2/src/platform/dom/debug/by";
  export * from "angular2/src/platform/dom/debug/ng_probe";
}
declare module "angular2/src/platform/browser/title" {
  /**
   * A service that can be used to get and set the title of a current HTML document.
   *
   * Since an Angular 2 application can't be bootstrapped on the entire HTML document (`<html>` tag)
   * it is not possible to bind to the `text` property of the `HTMLTitleElement` elements
   * (representing the `<title>` tag). Instead, this service can be used to set and get the current
   * title value.
   */
  export class Title {
    /**
     * Get the title of the current HTML document.
     * @returns {string}
     */
    getTitle(): string;
    /**
     * Set the title of the current HTML document.
     * @param newTitle
     */
    setTitle(newTitle: string): void;
  }
}
declare module "angular2/src/platform/browser/tools/common_tools" {
  import { ApplicationRef } from "angular2/src/core/application_ref";
  import { ComponentRef } from "angular2/src/core/linker/dynamic_component_loader";
  /**
   * Entry point for all Angular debug tools. This object corresponds to the `ng`
   * global variable accessible in the dev console.
   */
  export class AngularTools {
    profiler: AngularProfiler;
    constructor(ref: ComponentRef);
  }
  /**
   * Entry point for all Angular profiling-related debug tools. This object
   * corresponds to the `ng.profiler` in the dev console.
   */
  export class AngularProfiler {
    appRef: ApplicationRef;
    constructor(ref: ComponentRef);
    /**
     * Exercises change detection in a loop and then prints the average amount of
     * time in milliseconds how long a single round of change detection takes for
     * the current state of the UI. It runs a minimum of 5 rounds for a minimum
     * of 500 milliseconds.
     *
     * Optionally, a user may pass a `config` parameter containing a map of
     * options. Supported options are:
     *
     * `record` (boolean) - causes the profiler to record a CPU profile while
     * it exercises the change detector. Example:
     *
     * ```
     * ng.profiler.timeChangeDetection({record: true})
     * ```
     */
    timeChangeDetection(config: any): void;
  }
}
declare module "angular2/src/platform/browser/tools/tools" {
  import { ComponentRef } from "angular2/src/core/linker/dynamic_component_loader";
  /**
   * Enabled Angular 2 debug tools that are accessible via your browser's
   * developer console.
   *
   * Usage:
   *
   * 1. Open developer console (e.g. in Chrome Ctrl + Shift + j)
   * 1. Type `ng.` (usually the console will show auto-complete suggestion)
   * 1. Try the change detection profiler `ng.profiler.timeChangeDetection()`
   *    then hit Enter.
   */
  export function enableDebugTools(ref: ComponentRef): void;
  /**
   * Disables Angular 2 tools.
   */
  export function disableDebugTools(): void;
}
declare module "angular2/src/platform/browser_common" {
  export { DOCUMENT } from "angular2/src/platform/dom/dom_tokens";
  export { Title } from "angular2/src/platform/browser/title";
  export { ELEMENT_PROBE_PROVIDERS, ELEMENT_PROBE_PROVIDERS_PROD_MODE, inspectNativeElement, By } from "angular2/platform/common_dom";
  export { BrowserDomAdapter } from "angular2/src/platform/browser/browser_adapter";
  export { enableDebugTools, disableDebugTools } from "angular2/src/platform/browser/tools/tools";
  /**
   * A set of providers to initialize the Angular platform in a web browser.
   *
   * Used automatically by `bootstrap`, or can be passed to {@link platform}.
   */
  export const BROWSER_PROVIDERS: Array<any>;
  /**
   * A set of providers to initialize an Angular application in a web browser.
   *
   * Used automatically by `bootstrap`, or can be passed to {@link PlatformRef.application}.
   */
  export const BROWSER_APP_COMMON_PROVIDERS: Array<any>;
  export function initDomAdapter(): void;
}
declare module "angular2/src/core/angular_entrypoint" {
  /**
   * Marks a function or method as an Angular 2 entrypoint. Only necessary in Dart code.
   *
   * The optional `name` parameter will be reflected in logs when the entry point is processed.
   *
   * See [the wiki][] for detailed documentation.
   * [the wiki]: https://github.com/angular/angular/wiki/Angular-2-Dart-Transformer#entry_points
   *
   * ## Example
   *
   * ```
   * @AngularEntrypoint("name-for-debug")
   * void main() {
   *   bootstrap(MyComponent);
   * }
   * ```
   */
  export class AngularEntrypoint {
    name: String;
    constructor(name?: String);
  }
}
declare module "angular2/router/router_link_dsl" {
  import { Provider } from "angular2/core";
  export { RouterLinkTransform } from "angular2/src/router/directives/router_link_transform";
  /**
   * Enables the router link DSL.
   *
   * Warning. This feature is experimental and can change.
   *
   * To enable the transformer pass the router link DSL provider to `bootstrap`.
   *
   * ## Example:
   * ```
   * import {bootstrap} from 'angular2/platform/browser';
   * import {ROUTER_LINK_DSL_PROVIDER} from 'angular2/router/router_link_dsl';
   *
   * bootstrap(CustomApp, [ROUTER_LINK_DSL_PROVIDER]);
   * ```
   *
   * The DSL allows you to express router links as follows:
   * ```
   * <a [routerLink]="route:User"> <!-- Same as <a [routerLink]="['User']"> -->
   * <a [routerLink]="route:/User"> <!-- Same as <a [routerLink]="['User']"> -->
   * <a [routerLink]="route:./User"> <!-- Same as <a [routerLink]="['./User']"> -->
   * <a [routerLink]="./User(id: value, name: 'Bob')"> <!-- Same as <a [routerLink]="['./User', {id:
   * value, name: 'Bob'}]"> -->
   * <a [routerLink]="/User/Modal"> <!-- Same as <a [routerLink]="['/User', 'Modal']"> -->
   * <a [routerLink]="User[Modal]"> <!-- Same as <a [routerLink]="['User', ['Modal']]"> -->
   * ```
   */
  export const ROUTER_LINK_DSL_PROVIDER: Provider;
}
declare module "angular2/platform/browser" {
  export { AngularEntrypoint } from "angular2/src/core/angular_entrypoint";
  export { BROWSER_PROVIDERS, ELEMENT_PROBE_PROVIDERS, ELEMENT_PROBE_PROVIDERS_PROD_MODE, inspectNativeElement, BrowserDomAdapter, By, Title, DOCUMENT, enableDebugTools, disableDebugTools } from "angular2/src/platform/browser_common";
  import { Type } from "angular2/src/facade/lang";
  import { ComponentRef } from "angular2/core";
  /**
   * An array of providers that should be passed into `application()` when bootstrapping a component.
   */
  export const BROWSER_APP_PROVIDERS: Array<any>;
  /**
   * Bootstrapping for Angular applications.
   *
   * You instantiate an Angular application by explicitly specifying a component to use
   * as the root component for your application via the `bootstrap()` method.
   *
   * ## Simple Example
   *
   * Assuming this `index.html`:
   *
   * ```html
   * <html>
   *   <!-- load Angular script tags here. -->
   *   <body>
   *     <my-app>loading...</my-app>
   *   </body>
   * </html>
   * ```
   *
   * An application is bootstrapped inside an existing browser DOM, typically `index.html`.
   * Unlike Angular 1, Angular 2 does not compile/process providers in `index.html`. This is
   * mainly for security reasons, as well as architectural changes in Angular 2. This means
   * that `index.html` can safely be processed using server-side technologies such as
   * providers. Bindings can thus use double-curly `{{ syntax }}` without collision from
   * Angular 2 component double-curly `{{ syntax }}`.
   *
   * We can use this script code:
   *
   * {@example core/ts/bootstrap/bootstrap.ts region='bootstrap'}
   *
   * When the app developer invokes `bootstrap()` with the root component `MyApp` as its
   * argument, Angular performs the following tasks:
   *
   *  1. It uses the component's `selector` property to locate the DOM element which needs
   *     to be upgraded into the angular component.
   *  2. It creates a new child injector (from the platform injector). Optionally, you can
   *     also override the injector configuration for an app by invoking `bootstrap` with the
   *     `componentInjectableBindings` argument.
   *  3. It creates a new `Zone` and connects it to the angular application's change detection
   *     domain instance.
   *  4. It creates an emulated or shadow DOM on the selected component's host element and loads the
   *     template into it.
   *  5. It instantiates the specified component.
   *  6. Finally, Angular performs change detection to apply the initial data providers for the
   *     application.
   *
   *
   * ## Bootstrapping Multiple Applications
   *
   * When working within a browser window, there are many singleton resources: cookies, title,
   * location, and others. Angular services that represent these resources must likewise be
   * shared across all Angular applications that occupy the same browser window. For this
   * reason, Angular creates exactly one global platform object which stores all shared
   * services, and each angular application injector has the platform injector as its parent.
   *
   * Each application has its own private injector as well. When there are multiple
   * applications on a page, Angular treats each application injector's services as private
   * to that application.
   *
   * ## API
   *
   * - `appComponentType`: The root component which should act as the application. This is
   *   a reference to a `Type` which is annotated with `@Component(...)`.
   * - `customProviders`: An additional set of providers that can be added to the
   *   app injector to override default injection behavior.
   *
   * Returns a `Promise` of {@link ComponentRef}.
   */
  export function bootstrap(appComponentType: Type, customProviders?: Array<any>): Promise<ComponentRef>;
}
