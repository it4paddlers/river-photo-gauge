// Import css files
import React, { Component } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import {Button, Container, Grid, Header, Image, Segment} from 'semantic-ui-react';
import wassen from './assets/images/Wassenphoto_2021-10-26_10-36-00.jpeg';
import wassen1 from './assets/images/Wassenphoto_2021-10-26_11-36-00.jpeg';
import wassen2 from './assets/images/Wassenphoto_2021-10-26_12-36-00.jpeg';
import wassen3 from './assets/images/Wassenphoto_2021-10-26_13-36-00.jpeg';
import wassen4 from './assets/images/Wassenphoto_2021-10-26_14-36-00.jpeg';
import wassen5 from './assets/images/Wassenphoto_2021-10-26_15-36-00.jpeg';
import wassen6 from './assets/images/Wassenphoto_2021-10-26_16-36-00.jpeg';

class PhotoDisplay extends Component{
  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.getPhotoDateTime = this.getPhotoDateTime.bind(this);
  }

  next() {
    this.slider.slickNext();
  }

  previous() {
    this.slider.slickPrev();
  }

  getPhotoDateTime(photoUrl) {
    const filename = photoUrl.split(/[/]/).pop();
    const [date, time] = filename.split(/[_.]+/).slice(1, 3);
    const timeFormatted = time.split(/[-]/).join(':');
    return date + ', ' + timeFormatted;
  }

  render() {
    const settings = {
      infinite: false,
      speed: 0,
      slidesToShow: 1,
      slidesToScroll: 1,
      fade: true
    };

    const photoList = [wassen, wassen1, wassen2, wassen3, wassen4, wassen5, wassen6]

    return (
      <React.Fragment>
        <Segment basic as={Container}>
          <Grid stackable>
            <Grid.Row>
              <Grid.Column width={12}>
                <Grid>
                  <Grid.Row>
                    <Grid.Column textAlign='center'>
                      <Slider ref={c => (this.slider = c)} {...settings}>
                        {photoList.map((photo, i) => {
                          const dateTime = this.getPhotoDateTime(photo);
                          return (
                              <div key={i}>
                                <Header as='h4'>{dateTime}</Header>
                                <Image centered size='large' src={photo} />
                              </div>
                          )
                        })}
                      </Slider>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width={8} textAlign='right'>
                      <Button small onClick={this.previous}>
                        Previous
                      </Button>
                    </Grid.Column>
                    <Grid.Column width={8} textAlign='left'>
                      <Button small onClick={this.next}>
                        Next
                      </Button>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
              <Grid.Column width={4} textAlign='center'>
                <Header as='h4'>Low</Header>
                <Image centered size='small' src={wassen1} />
                <Header as='h4'>Med</Header>
                <Image centered size='small' src={wassen4} />
                <Header as='h4'>High</Header>
                <Image centered size='small' src={wassen6} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </React.Fragment>
    );
  }
}

export default PhotoDisplay;
