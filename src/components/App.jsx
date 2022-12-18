import Search from './Search.js';
import VideoList from './VideoList.js';
import VideoPlayer from './VideoPlayer.js';
import exampleVideoData from '../data/exampleVideoData.js';

var initialized = true;
var videoData = exampleVideoData;

var readyToSearch = true;

var debouncer = () => {
  if (readyToSearch === true) {
    readyToSearch = false;
    setTimeout(() => readyToSearch = true, 500);
    return true;
  }
  return false;
};

var App = (props) => {
  const { useState, useEffect } = React;

  if (props.searchYouTube && initialized) {
    initialized = false;
    props.searchYouTube('react', (data) => (videoData = data));
  }
  const [videoList, setVideoList] = useState(videoData);
  const [currentVideo, setCurrentVideo] = useState(videoData[0]);
  const [currentSearch, setCurrentSearch] = useState('');

  useEffect(() => {
    if (debouncer() && currentSearch !== '') {
      console.log(currentSearch);
      props.searchYouTube(currentSearch, (data) => setVideoList(data));
      selectVideo(videoList[0]);
    }
  });

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
