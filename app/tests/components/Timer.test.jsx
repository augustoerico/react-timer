var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jquery');
var TestUtils = require('react-addons-test-utils');

var Timer = require('Timer');

describe('Timer', () => {
    it('should exist', () => {
        expect(Timer).toExist();
    });

    describe('startTimer', () => {
        it('should initialize the timer', () => {
            var timer = TestUtils.renderIntoDocument(<Timer />);
            expect(timer.state.count).toBe(0);
            expect(timer.state.status).toBe('paused');
        });

        it('should start the timer', (done) => {
            var timer = TestUtils.renderIntoDocument(<Timer />);
            timer.startTimer();

            setTimeout(() => {
                expect(timer.state.count).toBe(1);
                done()
            }, 1001);
        });

        it('should pause the timer', (done) => {
            var timer = TestUtils.renderIntoDocument(<Timer />);
            timer.startTimer();

            setTimeout(() => {
                timer.pauseTimer();

                expect(timer.state.count).toBe(1);
                setTimeout(() => {
                    expect(timer.state.count).toBe(1);
                    done();
                }, 1001);
            }, 1001);
        });

        it('should clear the timer', (done) => {
            var timer = TestUtils.renderIntoDocument(<Timer />);
            timer.startTimer();

            setTimeout(() => {
                expect(timer.state.count).toBe(1);
                timer.resetTimer();
                expect(timer.state.count).toBe(0);
                expect(timer.state.status).toBe('paused');

                setTimeout(() => {
                    expect(timer.state.count).toBe(0);
                    expect(timer.state.status).toBe('paused');
                    done();
                }, 1001);
            }, 1001);
        });
    });
});
