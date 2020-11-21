'use strict';

var Promise = require('es6-promise').Promise;
var urlBuilder = require('../lib/url-builder.js');

var googleApi;

function loadAutoCompleteAPI(params) {
  var script = document.createElement('script');

  script.type = 'text/javascript';

  script.src = urlBuilder({
    base: 'https://maps.googleapis.com/maps/api/js',
    libraries: params.libraries || [],
    callback: 'googleMapsAutoCompleteAPILoad',
    apiKey: params.apiKey,
    client: params.client,
    region: params.region,
    language: params.language,
    version: params.version
  });

  document.querySelector('head').appendChild(script);
}

/**
 * googleMapsApiLoader
 *
 * @param  {object} params
 * @param  {object} params.libraries
 *
 * @return {promise}
 */
function googleMapsApiLoader(params) {
  if (googleApi) {
    return Promise.resolve(googleApi);
  }

  return new Promise(function(resolve, reject) {
    loadAutoCompleteAPI(params);

    window.googleMapsAutoCompleteAPILoad = function() {
      googleApi = window.google;
      resolve(googleApi);
    };

    setTimeout(function() {
      if (!window.google) {
        reject(new Error('Loading took too long'));
      }
    }, 5000);
  });
}

module.exports = googleMapsApiLoader;

