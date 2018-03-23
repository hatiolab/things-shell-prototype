// import '@polymer/polymer/polymer.js';
// import '@polymer/iron-ajax/iron-ajax';

export const AppLocalizeBehavior = {
  /**
   * Internal singleton cache. This is the private implementation of the
   * behaviour; don't interact with it directly.
   */
  __localizationCache: {
    requests: {},  /* One iron-request per unique resources path. */
    messages: {},  /* Unique localized strings. Invalidated when the language, formats or resources change. */
    ajax: null     /* Global iron-ajax object used to request resource files. */
  },
  /**
   * Fired after the resources have been loaded.
   *
   * @event app-localize-resources-loaded
   */
  /**
   * Fired when the resources cannot be loaded due to an error.
   *
   * @event app-localize-resources-error
   */
  properties: {
    /**
     * The language used for translation.
     */
    language: {
      type: String
    },
    /**
     * The dictionary of localized messages, for each of the languages that
     * are going to be used. See http://formatjs.io/guides/message-syntax/ for
     * more information on the message syntax.
     *
     * For example, a valid dictionary would be:
     * this.resources = {
     *  'en': { 'greeting': 'Hello!' }, 'fr' : { 'greeting': 'Bonjour!' }
     * }
     */
    resources: {
      type: Object
    },
    /**
     * Optional dictionary of user defined formats, as explained here:
     * http://formatjs.io/guides/message-syntax/#custom-formats
     *
     * For example, a valid dictionary of formats would be:
     * this.formats = {
     *    number: { USD: { style: 'currency', currency: 'USD' } }
     * }
     */
    formats: {
      type: Object,
      value: function () { return {} }
    },
    /**
     * If true, will use the provided key when
     * the translation does not exist for that key.
     */
    useKeyIfMissing: {
      type: Boolean,
      value: false
    },
    /**
     * Translates a string to the current `language`. Any parameters to the
     * string should be passed in order, as follows:
     * `localize(stringKey, param1Name, param1Value, param2Name, param2Value)`
     */
    localize: {
      type: Function,
      computed: '__computeLocalize(language, resources, formats)'
    },
    /**
    * If true, will bubble up the event to the parents
    */
    bubbleEvent: {
      type: Boolean,
      value: false
    }
  },
  loadResources: function (path, language, merge) {
    var proto = this.constructor.prototype;
    // Check if localCache exist just in case.
    this.__checkLocalizationCache(proto);
    // If the global ajax object has not been initialized, initialize and cache it.
    var ajax = proto.__localizationCache.ajax;
    if (!ajax) {
      ajax = proto.__localizationCache.ajax = document.createElement('iron-ajax');
    }
    var request = proto.__localizationCache.requests[path];
    function onRequestResponse(event) {
      this.__onRequestResponse(event, language, merge);
    }
    if (!request) {
      ajax.url = path;
      var request = ajax.generateRequest();
      request.completes.then(
        onRequestResponse.bind(this),
        this.__onRequestError.bind(this));
      // Cache the instance so that it can be reused if the same path is loaded.
      proto.__localizationCache.requests[path] = request;
    } else {
      request.completes.then(
        onRequestResponse.bind(this),
        this.__onRequestError.bind(this));
    }
  },
  /**
   * Returns a computed `localize` method, based on the current `language`.
   */
  __computeLocalize: function (language, resources, formats) {
    var proto = this.constructor.prototype;
    // Check if localCache exist just in case.
    this.__checkLocalizationCache(proto);
    // Everytime any of the parameters change, invalidate the strings cache.
    if (!proto.__localizationCache) {
      proto['__localizationCache'] = { requests: {}, messages: {}, ajax: null };
    }
    proto.__localizationCache.messages = {};
    return function () {
      var key = arguments[0];
      if (!key || !resources || !language || !resources[language])
        return;
      // Cache the key/value pairs for the same language, so that we don't
      // do extra work if we're just reusing strings across an application.
      var translatedValue = resources[language][key];
      if (!translatedValue) {
        return this.useKeyIfMissing ? key : '';
      }
      var messageKey = key + translatedValue;
      var translatedMessage = proto.__localizationCache.messages[messageKey];
      if (!translatedMessage) {
        translatedMessage = new IntlMessageFormat(translatedValue, language, formats);
        proto.__localizationCache.messages[messageKey] = translatedMessage;
      }
      var args = {};
      for (var i = 1; i < arguments.length; i += 2) {
        args[arguments[i]] = arguments[i + 1];
      }
      return translatedMessage.format(args);
    };
  },
  __onRequestResponse: function (event, language, merge) {
    var propertyUpdates = {};
    var newResources = event.response;
    if (merge) {
      if (language) {
        propertyUpdates.resources = Object.assign({}, this.resources || {});
        propertyUpdates['resources.' + language] = Object.assign(
          propertyUpdates.resources[language] || {}, newResources);
      } else {
        propertyUpdates.resources = Object.assign(this.resources, newResources);
      }
    } else {
      if (language) {
        propertyUpdates.resources = {};
        propertyUpdates.resources[language] = newResources;
        propertyUpdates['resources.' + language] = newResources;
      } else {
        propertyUpdates.resources = newResources;
      }
    }
    if (this.setProperties) {
      this.setProperties(propertyUpdates);
    } else {
      for (var key in propertyUpdates) {
        this.set(key, propertyUpdates[key]);
      }
    }
    this.fire('app-localize-resources-loaded', event, { bubbles: this.bubbleEvent });
  },
  __onRequestError: function (event) {
    this.fire('app-localize-resources-error');
  },
  __checkLocalizationCache: function (proto) {
    // do nothing if proto is undefined.
    if (proto === undefined) return;
    // In the event proto not have __localizationCache object, create it.
    if (proto['__localizationCache'] === undefined) {
      proto['__localizationCache'] = { requests: {}, messages: {}, ajax: null };
    }
  }
}
