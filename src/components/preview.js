import React from 'react';
import Layout from './layout';
import Paranoma from './paranoma';

class Preview extends React.Component {
  constructor(props) {
    super(props);
    this.submission = this.props.submission;
  }

  handicappedText() {
    if (!this.submission.handicapped) {
      return 'Is handicapped accessible';
    } else if (!this.submission.separateHandicapped)
      return 'Is handicapped accessible (Handicapped cubicle inside toilet)';
    else {
      return 'Is handicapped accessible (Has separate handicapped toilet)';
    }
  }

  glanceStyle(bool) {
    return {
      textDecoration: bool ? '' : 'line-through',
      color: bool ? '' : 'gray',
    };
  }

  render() {
    return (
      <Layout>
        <h3>{this.submission.name}</h3>
        {/*<Map lat={lat} lon={lon} />*/}
        <Paranoma paranomaUrl={this.submission.paranomaUrl} />
        <h4>At a glance</h4>
        <ul style={{listStyle: 'none'}}>
          <li style={this.glanceStyle(this.submission.facilities.male)}>
            <i className="em-svg em-man-raising-hand" />
            Has Male toilet
          </li>
          <li style={this.glanceStyle(this.submission.facilities.female)}>
            <i className="em-svg em-woman-raising-hand" />
            Has Female toilet
          </li>
          <li style={this.glanceStyle(this.submission.facilities.handicapped)}>
            <i className="em-svg em-wheelchair" />
            {this.handicappedText()}
          </li>
          <li style={this.glanceStyle(this.submission.facilities.waterCooler)}>
            <i className="em-svg em-potable_water" />
            Has water cooler
          </li>
          <li style={this.glanceStyle(this.submission.facilities.showerHeads)}>
            <i className="em-svg em-shower" />
            Has shower heads
          </li>
          <li style={this.glanceStyle(this.submission.facilities.hose)}>
            <i className="em-svg em-sweat_drops" />
            Has hose
          </li>
        </ul>
      </Layout>
    );
  }
}

export default Preview;
