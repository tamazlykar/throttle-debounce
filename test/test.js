'use strict';

let td = require('../index');
let assert = require('chai').assert;
let expect = require('chai').expect;
let sinon = require('sinon');

describe('throttle(f, 1000)', function() {
  let f1000;
  let log = '';

  function f(a) {
    log += a;
  }

  before(function() {
    f1000 = td.throttle(f, 1000);
    this.clock = sinon.useFakeTimers();
  });

  it('первый вызов срабатывает тут же', function() {
    f1000(1); // такой вызов должен сработать тут же
    assert.equal(log, '1');
  });

  it('тормозит второе срабатывание до 1000мс', function() {
    f1000(2); // (тормозим, не прошло 1000мс)
    f1000(3); // (тормозим, не прошло 1000мс)
    // через 1000 мс запланирован вызов с последним аргументом

    assert.equal(log, '1'); // пока что сработал только первый вызов

    this.clock.tick(1000); // прошло 1000мс времени
    assert.equal(log, '13'); // log==13, т.к. сработал вызов f1000(3)
  });

  it('тормозит третье срабатывание до 1000мс после второго', function() {
    this.clock.tick(100);
    f1000(4); // (тормозим, с последнего вызова прошло 100мс - менее 1000мс)
    this.clock.tick(100);
    f1000(5); // (тормозим, с последнего вызова прошло 200мс - менее 1000мс)
    this.clock.tick(700);
    f1000(6); // (тормозим, с последнего вызова прошло 900мс - менее 1000мс)

    this.clock.tick(100); // сработал вызов с 6

    assert.equal(log, '136');
  });

  after(function() {
    this.clock.restore();
  });
});



describe('debounce(f, 1000)', function() {
  let f1000;
  let log = 10; //initial value

  function f(x) {
    log = x;
  }

  before(function() {
    f1000 = td.debounce(f, 1000);
    this.clock = sinon.useFakeTimers();
  });

  it('первый вызов не срабатывает тут же', function() {
    f1000(1); // такой вызов не должен сработать тут же
    assert.equal(log, 10);
  });

  it('не выполняет остальные срабатывание которые шли друг за другом', function() {
    f1000(20); // (тормозим, не прошло 1000мс)
    f1000(30); // (тормозим, не прошло 1000мс)
    // через 1000 мс запланирован вызов с последним аргументом

    assert.equal(log, 10); // пока что сработал только первый вызов
  });

  it('выполнил срабатываение по истечении 1000мс', function () {
    this.clock.tick(1000); // прошло 1000мс времени
    assert.equal(log, 30); // log==30, т.к. сработал вызов f1000(3)
  });

  it('тормозит срабатывания идующие с перерывами в 100мс, 300мс, 900мс друг за другом', function() {
    f1000(90);
    this.clock.tick(100);
    f1000(40); // (тормозим, с последнего вызова прошло 100мс)
    this.clock.tick(300);
    f1000(50); // (тормозим, с последнего вызова прошло 300мс)
    this.clock.tick(900);
    f1000(60); // (тормозим, с последнего вызова прошло 900мс)

    assert.equal(log, 30); // пока что сработал только первый вызов
  });

  it('выполнил срабатываение по истечении 1000мс [2]', function () {
      this.clock.tick(1000); // прошло 1000мс времени
      assert.equal(log, 60); // log==30, т.к. сработал вызов f1000(3)
  });

  after(function() {
    this.clock.restore();
  });
});
