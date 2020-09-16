import React from "react";
import styled from "styled-components";

import { dateFormat } from "../utils/utils";

class Time extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: dateFormat(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    };
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({
        time: dateFormat(new Date(), 'yyyy-MM-dd HH:mm:ss'),
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return (
      <div className={this.props.className}>
        {this.state.time}
      </div>
    );
  }
}

const TimeStyle = styled(Time)`
  &{
    font-size: 20px;
    text-align: center;
    color: white;
    margin-right: 95px;
  }
`;

export default TimeStyle;