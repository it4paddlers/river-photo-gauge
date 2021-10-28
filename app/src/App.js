import './assets/fomantic/dist/semantic.css';
import { Container, Header, Segment } from 'semantic-ui-react';

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
      </Segment>
    </div>
  );
}

export default App;
