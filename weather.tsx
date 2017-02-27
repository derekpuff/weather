import * as React from "react";
import * as $ from "jquery";

export interface WeatherProperties {
    location?: string;
    appid: string;
    units?: string;
    width?: number;
}

export interface WeatherState {
    background: string;
    temperature?: number;
    icon?: string;
}

export class Weather extends React.Component<WeatherProperties, WeatherState> {
    public static defaultProps: WeatherProperties = {
        location: "Boston, MA",
        units: "metric",
        width: 170,
        appid: ""
    };
    constructor(props: WeatherProperties) {
        super(props);
        this.state = {
            background: "lightgray"
        };
    }
    render() {
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

        return (<div style={styles.component}>
            <div style={styles.location}>{this.props.location}</div>
            <div style={{ display: "table" }}>
                <div style={{ display: "table-row" }}>
                    <div style={{ display: "table-cell" }}>
                        <img src={src} style={styles.icon} width={size} height={size} />
                        <span style={styles.temperature}>{temperature}&deg;{units}</span>
                    </div>
                </div>
            </div>
        </div>);
    }
    componentDidMount() {
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
            } as WeatherState);
        });
    }
}