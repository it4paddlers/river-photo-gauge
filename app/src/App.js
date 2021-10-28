import './assets/fomantic/dist/semantic.css';
import { Container, Divider, Header, Segment } from 'semantic-ui-react';

function App() {
  return (
    <div className="App">
      <Segment basic as={Container}>
        <Header as='h1' textAlign='center'>
          River Photo Gauge
        </Header>
        <p>
          Location: Takeout of the <a href='https://rivermap.org/map/#sprache=de&styled=1&zoom=14&lat=46.69075&lng=8.60010&inf=113'>Göschenen-Wassen Section</a>..
        </p>
        <p>
          We are working on finding the best way how to present these pictures... This is just the bare minimum. A better(?) slideshow-style presentation is here, but it might be broken, as it is work in progress.
        </p>
        <Divider />
        <Header as='h2'>
          Calibration
        </Header>
        <Header as='h3'>
          Data missing, we need your help!
        </Header>
        <p>
          We need info about what pictures show low/med/high. So if you have an opinion about the flow you see in the pictures, please <a href='mailto:toro@kanuschle.ch'>tell us</a>.
          <br />
          Or, tell us when you paddled there and how you experienced that level.
          <br />
          Wishes, advice, contributions welcome too ;-)
        </p>
        <p>
          We think <a href='https://redpig.ch/webcams/wassen/calibration_images/daymax-Wassenphoto_2021-07-12_20-24-51.jpg'>this is somewhere in the medium range</a>. Do you agree? And what about low and high?
        </p>
      </Segment>
    </div>
  );
}

export default App;
