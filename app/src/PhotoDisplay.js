// Import css files
import React, { Component } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Button, Container, Grid, Image, Segment } from 'semantic-ui-react';
import wassen from './assets/images/Wassenphoto_2021-10-26_10-36-00.jpeg'
import wassen1 from './assets/images/Wassenphoto_2021-10-26_11-36-00.jpeg'
import wassen2 from './assets/images/Wassenphoto_2021-10-26_12-36-00.jpeg'
import wassen3 from './assets/images/Wassenphoto_2021-10-26_13-36-00.jpeg'
import wassen4 from './assets/images/Wassenphoto_2021-10-26_14-36-00.jpeg'
import wassen5 from './assets/images/Wassenphoto_2021-10-26_15-36-00.jpeg'
import wassen6 from './assets/images/Wassenphoto_2021-10-26_16-36-00.jpeg'

class PhotoDisplay extends Component{
  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
  }

  next() {
    this.slider.slickNext();
  }

  previous() {
    this.slider.slickPrev();
  }

  render() {
    var settings = {
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };

    var photoList = [wassen, wassen1, wassen2, wassen3, wassen4, wassen5, wassen6]

    return (
      <React.Fragment>
        <Segment basic as={Container}>
          <Grid>
            <Grid.Row>
              <Grid.Column textAlign='center'>
                <Slider ref={c => (this.slider = c)} {...settings}>
                  {photoList.map(photo => {
                    return (
                      <div>
                        <Image centered size='large' src={wassen} />
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
                <Button onClick={this.next}>
                  Next
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </React.Fragment>
    );
  }
}

export default PhotoDisplay;