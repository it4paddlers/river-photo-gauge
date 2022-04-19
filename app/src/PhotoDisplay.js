import React, { Component } from 'react';
import './assets/styles/PhotoDisplay.css';
import {Button, Divider, Grid, Header, Image, Segment} from 'semantic-ui-react';
import wassen from './assets/images/Wassenphoto_2021-10-26_10-36-00.jpeg';
import wassen1 from './assets/images/Wassenphoto_2021-10-26_11-36-00.jpeg';
import wassen2 from './assets/images/Wassenphoto_2021-10-26_12-36-00.jpeg';
import wassen3 from './assets/images/Wassenphoto_2021-10-26_13-36-00.jpeg';
import wassen4 from './assets/images/Wassenphoto_2021-10-26_14-36-00.jpeg';
import wassen5 from './assets/images/Wassenphoto_2021-10-26_15-36-00.jpeg';
import wassen6 from './assets/images/Wassenphoto_2021-10-26_16-36-00.jpeg';
import refhigh from './assets/images/high.jpeg';
import refmed  from './assets/images/med.jpeg';
import reflow  from './assets/images/low.jpeg';

const refIndexMap = {
  0: 'High',
  1: 'Medium',
  2: 'Low'
}

class PhotoDisplay extends Component{
  constructor(props) {
    super(props);
    this.state = {
      photoIndex: 0,
      photoList: [],
      refPhotoShown: false,
      refPhotoIndex: 0,
      refPhotoList: []
    };

    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.showRef = this.showRef.bind(this);
    this.hideRefPhoto = this.hideRefPhoto.bind(this);
    this.getPhotoDateTime = this.getPhotoDateTime.bind(this);
  }

  componentDidMount() {
    this.setState({
      photoList: [wassen, wassen1, wassen2, wassen3, wassen4, wassen5, wassen6],
      refPhotoList: [refhigh, refmed, reflow]
    });
  }

  next() {
    this.hideRefPhoto();
    if (this.state.photoIndex < this.state.photoList.length - 1) {
      this.setState({
        photoIndex: this.state.photoIndex + 1
      });
    }
  }

  previous() {
    this.hideRefPhoto();
    if (this.state.photoIndex > 0) {
      this.setState({
        photoIndex: this.state.photoIndex - 1}
      );
    }
  }

  showRef(refNum) {
    this.setState({
      refPhotoShown: true,
      refPhotoIndex: refNum
    });
  }

  hideRefPhoto() {
    this.setState({refPhotoShown: false});
  }

  getPhotoDateTime(photoUrl) {
    const filename = photoUrl.split(/[/]/).pop();
    const [date, time] = filename.split(/[_.]+/).slice(1, 3);
    const timeWithColons = time.split(/[-]/).join(':');
    const jsDate = new Date(date + ' ' + timeWithColons);
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    const dateFormatted = jsDate.toLocaleDateString('en-GB', options);
    const timeFormatted = jsDate.toLocaleTimeString('en-GB');
    const timeWithoutSecs = timeFormatted.split(':').slice(0,2).join(':');
    return timeWithoutSecs + ' - ' + dateFormatted;
  }

  render() {
    let dateTime;
    let photoShown;
    if (this.state.refPhotoShown) {
      photoShown = this.state.refPhotoList[this.state.refPhotoIndex];
      dateTime = "Reference: " + refIndexMap[this.state.refPhotoIndex];
    } else {
      photoShown = this.state.photoList[this.state.photoIndex]
      if (this.state.photoList.length > 0) {
        dateTime = this.getPhotoDateTime(photoShown);
      }
    }

    return (
      <React.Fragment>
        <Segment basic>
          <Grid>
            {/* Tablet and computer display */}
            <Grid.Row only='tablet computer'>
              <Grid.Column width={6} textAlign='right'>
                <Button size='small' onClick={this.previous}>
                  Previous
                </Button>
              </Grid.Column>
              <Grid.Column width={6} textAlign='left'>
                <Button size='small' onClick={this.next}>
                  &nbsp;&nbsp;&nbsp;Next&nbsp;&nbsp;&nbsp;
                </Button>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row only='tablet computer'>
              <Grid.Column textAlign='center' width={12}>
                <Header as='h4'>
                  {dateTime}
                </Header>
                <Image centered size='massive' src={photoShown} />
              </Grid.Column>
              <Grid.Column textAlign='center' width={4}>
                <Grid.Row>
                  <Header as='h4' className='ref-thumbnail'>Low</Header>
                  <Image centered fluid className='ref-thumbnail' src={this.state.refPhotoList[2]}
                    onMouseEnter={() => this.showRef(2)} onMouseLeave={() => this.hideRefPhoto()} />
                  <br />
                </Grid.Row>
                <Grid.Row>
                  <Header as='h4' className='ref-thumbnail'>Medium</Header>
                  <Image centered fluid className='ref-thumbnail' src={this.state.refPhotoList[1]}
                    onMouseEnter={() => this.showRef(1)} onMouseLeave={() => this.hideRefPhoto()} />
                  <br />
                </Grid.Row>
                <Grid.Row>
                  <Header as='h4' className='ref-thumbnail'>High</Header>
                  <Image centered fluid className='ref-thumbnail' src={this.state.refPhotoList[0]}
                    onMouseEnter={() => this.showRef(0)} onMouseLeave={() => this.hideRefPhoto()} />
                </Grid.Row>
              </Grid.Column>
            </Grid.Row>

            {/* Mobile display */}
            <Grid.Row only='mobile'>
              <Grid.Column width={8} textAlign='right'>
                <Button size='small' onClick={this.previous}>
                  Previous
                </Button>
              </Grid.Column>
              <Grid.Column width={8} textAlign='left'>
                <Button size='small' onClick={this.next}>
                  &nbsp;&nbsp;&nbsp;Next&nbsp;&nbsp;&nbsp;
                </Button>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row only='mobile'>
              <Grid.Column textAlign='center'>
                <Header as='h4'>
                  {dateTime}
                </Header>
                <Image centered size='massive' src={photoShown} />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row centered only='mobile'>
              <Grid.Column width={5} textAlign='center'>
                <Header as='h4' className='ref-thumbnail'>Low</Header>
                <Image centered fluid className='ref-thumbnail' src={this.state.refPhotoList[2]}
                  onTouchStart={() => this.showRef(2)} onTouchEnd={() => this.hideRefPhoto()} />
              </Grid.Column>
              <Grid.Column width={5} textAlign='center'>
                <Header as='h4' className='ref-thumbnail'>Medium</Header>
                <Image centered fluid className='ref-thumbnail' src={this.state.refPhotoList[1]}
                  onTouchStart={() => this.showRef(1)} onTouchEnd={() => this.hideRefPhoto()} />
              </Grid.Column>
              <Grid.Column width={5} textAlign='center'>
                <Header as='h4' className='ref-thumbnail'>High</Header>
                <Image centered fluid className='ref-thumbnail' src={this.state.refPhotoList[0]}
                  onTouchStart={() => this.showRef(0)} onTouchEnd={() => this.hideRefPhoto()} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </React.Fragment>
    );
  }
}

export default PhotoDisplay;
