import { API_KEY, YOUTUBE_API_KEY } from '../config/config.js';

$.ajaxPrefilter(function (settings, _, jqXHR) {
  jqXHR.setRequestHeader('Authorization', API_KEY);
});

var searchYouTube = (query, callback) => {
  $.ajax({
    url: 'https://app-hrsei-api.herokuapp.com/api/recastly/videos',
    type: 'GET',
    data: {q: query, key: YOUTUBE_API_KEY},
    contentType: 'application/json',
    success: (data) => {
      console.log(data);
      callback(data);
    },
    error: (error) => {
      console.log('Failed to fetch youtube data ', error);
    }
  });
};

export default searchYouTube;
