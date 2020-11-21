'use strict';

/**
 * urlBuilder
 *
 * @param  {object} params
 * @param  {string} params.base       the base url
 * @param  {array}  params.libraries  an array of the libraries to be requested
 * @param  {string} params.callback   the callback function
 *
 * @return {string}
 */
function urlBuilder(params) {
  var builtUrl = params.base;

  builtUrl += '?';

  if (params.apiKey) {
    builtUrl += 'key=' + params.apiKey + '&';
  }

  if (params.client) {
    builtUrl += 'client=' + params.client + '&';
  }

  if (params.libraries.length > 0) {
    builtUrl += 'libraries=';

    params.libraries.forEach(function(library, index) {
      builtUrl += library;

      if (index !== params.libraries.length - 1) {
        builtUrl += ',';
      }
    });

    builtUrl += '&';
  }
    
  if (params.region) {
    builtUrl += 'region=' + params.region + '&';
  }

  if (params.language) {
    builtUrl += 'language=' + params.language + '&';
  }

  if (params.version) {
    builtUrl += 'v=' + params.version + '&';
  }

  builtUrl += 'callback=' + params.callback;

  return builtUrl;
}

module.exports = urlBuilder;
