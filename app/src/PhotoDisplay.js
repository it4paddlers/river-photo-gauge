import React, { Component } from 'react';
import './assets/styles/PhotoDisplay.css';
import {Button, Container, Grid, Header, Icon, Image, Input, Segment} from 'semantic-ui-react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import wassen from './assets/images/Wassenphoto_2021-10-26_10-36-00.jpeg';
import wassen1 from './assets/images/Wassenphoto_2021-10-26_11-36-00.jpeg';
import wassen2 from './assets/images/Wassenphoto_2021-10-26_12-36-00.jpeg';
import wassen3 from './assets/images/Wassenphoto_2021-10-26_13-36-00.jpeg';
import wassen4 from './assets/images/Wassenphoto_2021-10-26_14-36-00.jpeg';
import wassen5 from './assets/images/Wassenphoto_2021-10-26_15-36-00.jpeg';
import wassen6 from './assets/images/Wassenphoto_2021-10-26_16-36-00.jpeg';

const refIndexMap = {
  0: 'Low',
  1: 'Medium',
  2: 'High'
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
      refPhotoList: [wassen, wassen2, wassen5]
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
    const timeFormatted = time.split(/[-]/).join(':');
    return date + ', ' + timeFormatted;
  }

  setStartDate() {

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
        <Segment basic as={Container}>
        {/* <Grid.Column computer={6} tablet={8} mobile={16} textAlign='center'>
                      <DatePicker
                        showTimeSelect
                        className='calendar'
                        selected={this.state.startWindow} 
                        onChange={date => this.setWindow(date, 'start')} 
                        customInput={<Input label='start' icon='calendar' />}
                        dateFormat="d/MM/yyyy, HH:mm"
                      />
                    </Grid.Column> */}
          <DatePicker
              selected={new Date('01-01-2022')}
              onChange={(date) => this.setStartDate(date)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="h:mm aa"
          />
          <Grid stackable>
            <Grid.Row>
              <Grid.Column computer={6} tablet={8} mobile={16} textAlign='center'>
                <DatePicker
                  showTimeSelect
                  className='calendar'
                  selected={this.state.startWindow} 
                  onChange={date => this.setWindow(date, 'start')} 
                  customInput={<Input label='start' icon='calendar' />}
                  dateFormat="d/MM/yyyy, HH:mm"
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={12}>
                <Grid>
                  <Grid.Row>
                    <Grid.Column textAlign='center'>
                      <Header as='h4'>
                        {this.state.refPhotoShown ?
                            <Icon link name='close' className='close-ref' onClick={this.hideRefPhoto}/> :
                            null
                        }
                        {dateTime}
                      </Header>
                      <Image centered size='large' src={photoShown} />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width={8} textAlign='right'>
                      <Button size='small' onClick={this.previous}>
                        Previous
                      </Button>
                    </Grid.Column>
                    <Grid.Column width={8} textAlign='left'>
                      <Button size='small' onClick={this.next}>
                        Next
                      </Button>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
              <Grid.Column width={4} textAlign='center'>
                <Header as='h4' className='ref-thumbnail'>Low</Header>
                <Image centered size='small' className='ref-thumbnail' src={this.state.photoList[1]}
                       onClick={() => this.showRef(0)} />
                <Header as='h4' className='ref-thumbnail'>Medium</Header>
                <Image centered size='small' className='ref-thumbnail' src={this.state.photoList[3]}
                       onClick={() => this.showRef(1)} />
                <Header as='h4' className='ref-thumbnail'>High</Header>
                <Image centered size='small' className='ref-thumbnail' src={this.state.photoList[5]}
                       onClick={() => this.showRef(2)} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </React.Fragment>
    );
  }
}

export default PhotoDisplay;
