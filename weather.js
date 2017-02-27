"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var $ = require("jquery");
var Weather = (function (_super) {
    __extends(Weather, _super);
    function Weather(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            background: "lightgray"
        };
        return _this;
    }
    Weather.prototype.render = function () {
        var styles = {
            component: {
                backgroundColor: this.state.background,
                borderRadius: 10,
                width: this.props.width
            },
            location: {
                fontFamily: "Gill Sans Light,Verdana,Courier New",
                fontSize: 14,
                paddingTop: 10,
                textAlign: "center"
            },
            temperature: {
                verticalAlign: "middle",
                fontFamily: "Gill Sans Light,Verdana,Courier New",
                fontSize: 32
            },
            icon: {
                verticalAlign: "middle"
            }
        };
        var units = "C";
        switch (this.props.units.toLowerCase()) {
            case "kelvin":
                units = "K";
                break;
            case "imperial":
                units = "F";
                break;
        }
        var src = "";
        var temperature = 0;
        if (this.state) {
            console.log("render: icon=" + this.state.icon + " temperature=" + this.state.temperature);
            if (this.state.icon != null) {
                src = "http://openweathermap.org/img/w/" + this.state.icon + ".png";
            }
            if (this.state.temperature != null) {
                temperature = Math.round(this.state.temperature);
            }
            console.log("temp=" + temperature + " href=" + src);
        }
        var size = 70;
        return (React.createElement("div", { style: styles.component },
            React.createElement("div", { style: styles.location }, this.props.location),
            React.createElement("div", { style: { display: "table" } },
                React.createElement("div", { style: { display: "table-row" } },
                    React.createElement("div", { style: { display: "table-cell" } },
                        React.createElement("img", { src: src, style: styles.icon, width: size, height: size }),
                        React.createElement("span", { style: styles.temperature },
                            temperature,
                            "\u00B0",
                            units))))));
    };
    Weather.prototype.componentDidMount = function () {
        var weather = this;
        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/weather?q=" + this.props.location + "&units=" + this.props.units + "&appid=" + this.props.appid,
            async: false
        }).done(function (data) {
            console.log(data.main);
            var icon = "";
            if (data.weather && data.weather.length > 0) {
                icon = data.weather[0].icon;
            }
            weather.setState({
                temperature: Number(data.main.temp),
                icon: icon
            });
        });
    };
    return Weather;
}(React.Component));
Weather.defaultProps = {
    location: "Boston, MA",
    units: "metric",
    width: 170,
    appid: ""
};
exports.Weather = Weather;
//# sourceMappingURL=weather.js.map