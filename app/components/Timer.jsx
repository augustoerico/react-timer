var React = require('react');

var Clock = require('Clock');
var Controls = require('Controls');

var Timer = React.createClass({
    getInitialState: function() {
        return {
            status: 'paused',
            count: 0
        }
    },
    componentDidUpdate: function(prevProps, prevState) {
        if (prevState.status !== this.state.status) {
            switch (this.state.status) {
                case 'started':
                    this.startTimer();
                    break;
                case 'stopped':
                    this.resetTimer();
                    break;
                case 'paused':
                    this.pauseTimer();
                    break;
            }
        }
    },
    handleStatusChange: function (status) {
        this.setState({
            status: status
        });
    },
    startTimer: function () {
        this.timer = setInterval(() => {
            this.setState({
                count: this.state.count + 1
            });
        }, 1000);
    },
    pauseTimer: function () {
        clearInterval(this.timer);
        this.setState({
            status: 'paused'
        });
    },
    resetTimer: function() {
        clearInterval(this.timer);
        this.setState({
            count: 0,
            status: 'paused'
        });
    },
    renderControlArea: function () {
        var {status} = this.state;
        return <Controls countdownStatus={status} onStatusChange={this.handleStatusChange} />
    },
    render: function () {
        return (
            <div>
                <h1 className="page-title">Timer App</h1>
                <Clock totalSeconds={this.state.count} />
                {this.renderControlArea()}
            </div>
        )
    }
});

module.exports = Timer;
