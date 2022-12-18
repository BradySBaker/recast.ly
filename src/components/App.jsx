import Search from './Search.js';
import VideoList from './VideoList.js';
import VideoPlayer from './VideoPlayer.js';
import exampleVideoData from '../data/exampleVideoData.js';

var initialized = true;
var videoData = exampleVideoData;

var timeOut = null;


var App = (props) => {
  const { useState, useEffect } = React;

  if (initialized && props.searchYouTube) {
    initialized = false;
    props.searchYouTube('react', (data) => (videoData = data));
  }
  const [videoList, setVideoList] = useState(videoData);
  const [currentVideo, setCurrentVideo] = useState(videoData[0]);
  const [currentSearch, setCurrentSearch] = useState('');

  useEffect(() => {
    //Debouncer
    if (timeOut) {
      clearTimeout(timeOut);
    }
    timeOut = setTimeout(() => {
      props.searchYouTube(currentSearch, (data) => { if (data.length >= 1) { setVideoList(data); setCurrentVideo(data[0]); } });
    }, 500);
  }, [currentSearch]);

  var selectVideo = function(video) {
    setCurrentVideo(video);
  };

  return (<div>
    <nav className="navbar">
      <div className="col-md-6 offset-md-3">
        {<Search setCurrentSearch={setCurrentSearch}/>}
      </div>
    </nav>
    <div className="row">
      <div className="col-md-7">
        {<VideoPlayer video={currentVideo}/>}
      </div>
      <div className="col-md-5">
        {<VideoList videos={videoList} selectVideo={selectVideo}/>}
      </div>
    </div>
  </div>);
};


// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
export default App;
