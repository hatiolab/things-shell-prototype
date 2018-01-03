import '@polymer/polymer/polymer-element';

const div = document.createElement('div');
div.setAttribute('style', 'display: none;');

div.innerHTML = `
<dom-module id="things-shell-theme">
  <template>
    <style>
    /* document-wide defaults */
    :root {
      --primary-text-color: #212121;
      --primary-background-color: #ffffff;
      --secondary-text-color: #737373;
      --disabled-text-color: #9b9b9b;
      --divider-color: #dbdbdb;
      --primary-color: #3f51b5;
      --light-primary-color: #c5cae9;
      --dark-primary-color: #303f9f;
      --accent-color: #ff4081;
      --light-accent-color: #ff80ab;
      --dark-accent-color: #f50057;

      /* Components */

      /* paper-drawer-panel */
      --drawer-menu-color: #ffffff;
      --drawer-border-color: 1px solid #ccc;
      --drawer-toolbar-border-color: 1px solid rgba(0, 0, 0, 0.22);

      /* paper-menu */
      --paper-menu-background-color: #fff;
      --menu-link-color: #111111;

      /* things-editor-color */
      --things-editor-color: {
        width:120px;
        display: inline-block;
      }

      /* element reset style */
      --paper-radio-button-size:12px;
      --paper-radio-button-label-color: var(--things-primary-text-color);
      --paper-radio-button-label-spacing:3px;
      --paper-radio-button-checked-color: var(--things-secondary-color);
      --paper-radio-button-checked-ink-color: var(--things-secondary-color);
      --paper-radio-button-unchecked-color:#bdbdbd;
      --paper-radio-button-unchecked-ink-color:#bdbdbd;
      --paper-badge-background:rgba(0,0,0,.2);
      --paper-badge-margin-left:-25px;
      --paper-fab-background:var(--things-secondary-color);
      --paper-fab-background:tomato;
      --paper-input-container-focus-color:var(--things-secondary-color);
      --paper-toolbar-background:transparent;


      /* brand btn */
      --things-brand:{
        background:var(--things-primary-color);
        height:45px;min-height:45px;
        padding-left:50px;
        color:var(--things-white-color);
        text-transform:capitalize;
        font-size:20px;
        line-height:2.5;
      }
      --things-brand-btn:{
        width:45px;height:45px;
        min-width:initial;
        margin:0;
        padding:0;
        position:fixed;
        top:0;left:0;
        z-index:1;
        @apply(--border-radius-clear);
      }

      /* common style */
      --border-radius-clear: {
        -webkit-border-radius: 0px;
        -moz-border-radius: 0px;
        border-radius: 0px;
      }
      --things-default-padding: {
          padding: 15px;
      }
      --things-tight-padding: {
          padding: 7px;
      }
      --things-loose-padding: {
          padding: 30px;
      }
      --things-table-padding: {
          padding: 15px 15px 0 15px;
      }
      --things-padding-clear: {
          padding: 0
      }
      --things-default-margin: {
          margin: 15px;
      }
      --things-margin-clear: {
          margin: 0
      }

      /* icon size */
      --things-tiny-icon: {
        padding: 0;
        width: 12px;
        height: 12px;
      }
      --things-small-icon: {
        padding: 0;
        width: 16px;
        height: 16px;
      }
      --things-icon: {
        padding: 0;
        width: 19px;
        height: 19px;
      }


      /* color style */
      --things-primary-color: #826960;
      --things-secondary-color: #aa866a;
      --things-focus-background-color: #867f7c;
      --things-primary-background-color: #826960;
      --things-secondary-background-color: #aa866a;
      --things-lightgrey-background-color:rgba(0,0,0,.15);
      --things-white-color:#fff;
      --things-error-color:var(--paper-deep-orange-700);
      --things-primary-text-color: #726765;
      --things-green-text-color: var(--paper-green-600);
      --things-dark-text-color: #585858;
      --things-sidebar-background-color:#707070;

      /* horizontal toolbar style */
      --things-modeler-htoolbar:{
        background-color:var(--things-primary-color);
        color:rgba(255,255,255,.7);
        padding-left:50px;
      }
      --things-modeler-label:{
        margin-right:5px;
        color:#fff;
        font-size:20px;
      }
      --things-modeler-htoolbar-vline:{
        display:block;
        border-left:1px solid rgba(255,255,255,.07);
        border-right:1px solid rgba(0,0,0,.1);
        width:0px;height:18px;
        margin:0 4px;
      }

      /* preview style */
      --things-preview-thumb:{
        width:80%;height:75%;
        min-width:640px;min-height:480px;
        margin:auto;
      }


      /* properties panel style */
      --things-properties-panel:{
        display:block;
        width:270px;
        background-color:var(--paper-blue-grey-50);
      }
      --things-properties-varialbe-panel:{
        display: block;
        max-width:253px;
        min-width:253px;
        background-color:rgba(255,255,255,.5);;
        overflow:hidden;
        margin:0 0 7px 7px;
        padding:7px 0 0 0;
        border:1px solid rgba(0,0,0,.2);
        border-width:0 1px 1px 1px;
      }
      --things-variable-add-btn:{
        background-color:var(--paper-green-500);
        border-radius:3px;
        position:relative;
        float:right;
        margin-top:-14px;
        margin-right:-190px;
        padding:2px 5px;
        color:#fff;
        font-size:10px;
        text-decoration:none;
      }
      --things-variable-item:{
        background-color:#fff;
        border-radius:3px;
        margin:3px 3px 0 0;
        float:left;
        cursor:pointer;
        padding:2px 2px 0 5px;
        color:#333;
        font-size:13px;
      }
      --things-variable-item-del-btn:{
        background-color:#999;
        border-radius:4px;
        display:inline-block;
        position:relative;
        top:-2px;
        left:-1px;
        width:15px;height:14px;
        font-family:verdana;
        color:#fff;
        font-size:11px;
        text-decoration:none;
        text-align:center;
        line-height:1;
      }

      /* list style */
      --things-list-type-container:{
        position:absolute;
         top:9px;right:75px;
         border:1px solid rgba(255,255,255,.2);
         -webkit-border-radius: 4px;-moz-border-radius: 4px;border-radius: 4px;
         overflow:hidden;
         font-size:14px;
         line-height:1;
      }
      --things-list-type-btn:{
        margin:0;padding:4px 10px;
         opacity:.6;
      }
      --things-list-type-btn-focus:{
        background-color:rgba(0,0,0,.2);
         opacity:1;
         -webkit-box-shadow: inset 1px 2px 1px 0px rgba(0,0,0,0.2);
         -moz-box-shadow: inset 1px 2px 1px 0px rgba(0,0,0,0.2);
         box-shadow: inset 1px 2px 1px 0px rgba(0,0,0,0.2);
         font-weight:bold
      }

      /* info & timeline style */
      --things-info-header:{
        background-color:var(--things-primary-color);
        padding:4px 0 0 50px;
        height:41px;
        -webkit-box-shadow: 0px 2px 1px 0px rgba(0,0,0,0.2);
        -moz-box-shadow: 0px 2px 1px 0px rgba(0,0,0,0.2);
        box-shadow: 0px 2px 1px 0px rgba(0,0,0,0.2);
      }
      --things-info-header-btn:{
        width:45px;height:45px;
        padding:5px 10px;
        border-right:1px solid rgba(0,0,0,.2);
        color:#fff;
        opacity:.6;
      }
      --things-info-header-textfield:{
        background-color:rgba(0,0,0,.1);
        margin-left:2px;
        padding:1px 5px;
        -webkit-border-radius:4px;
        -moz-border-radius:4px;
        border-radius:4px;
        border:1px solid rgba(0,0,0,.1);
        color:#fff;
      }
      --things-timeline-line:{
        width:2px;min-height:55px;
        position:absolute;
        margin-top:9px;margin-left:5px;
      }
      --things-timeline-dot:{
        background-color:#fff;
        width:9px;height:9px;
        border-radius:50%;
        position:absolute;
        margin-top:6px;
        z-index:1000;
      }


      /* profile style */
      --things-profile-dialog: {
          -webkit-border-radius: 7px;
          -moz-border-radius: 7px;
          border-radius: 7px;
          -webkit-box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.2);
          -moz-box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.2);
          box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.2);
      }
      --things-profile-img: {
          background-color: #fff;
          width: 100px;
          height: 100px;
          position: absolute;
          margin-top: -60px;
          margin-left: 35%;
          border-radius: 50%;
          border: 4px solid var(--things-secondary-background-color);
          -webkit-box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.2);
          -moz-box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.2);
          box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.2);
      }
      --things-profile-logout: {
          background-color: var(--things-secondary-background-color);
          position: absolute;
          margin:7% 0 0 59%;
          width: 23px;
          height: 23px;
          border: none;
          padding: 0;
          -webkit-border-radius: 50%;
          -moz-border-radius: 50%;
          border-radius: 50%;
          color: #fff;
      }


      /* detail info */
      --things-timecell-active:{
        background-color:#fff;
        margin-left:25px;
        -webkit-border-top-left-radius: 7px;
        -webkit-border-bottom-left-radius: 7px;
        -moz-border-radius-topleft: 7px;
        -moz-border-radius-bottomleft: 7px;
        border-top-left-radius: 7px;
        border-bottom-left-radius: 7px;
        -webkit-box-shadow: 0px 2px 0px 0px rgba(0,0,0,0.1);
        -moz-box-shadow: 0px 2px 0px 0px rgba(0,0,0,0.1);
        box-shadow: 0px 2px 0px 0px rgba(0,0,0,0.1);
      }
      --things-timecell-active-icon:{
        content:"";
        position: absolute;
         left:35px;
         top:5px;
         width: 0;
         height: 0;
         border-top:9px solid transparent;
         border-right:9px solid white;
         border-bottom:9px solid transparent;
      }
      --things-timecell-seq:{
        margin-left:30px;
        margin-bottom:-5px;
        display:block;
        font-size:18px;
        color:var(--paper-blue-grey-600);
      }
      --things-timecell-etc:{
        margin-left:30px;
        font-size:12px;
        color:var(--paper-blue-grey-600);
        opacity:.7
      }


      /* tab style */
      --things-tabs:{
        background-color:rgba(0,0,0,.08);
        max-height:40px;
      }
      --paper-tabs-selection-bar-color:transparent;


      /* form style */
      --things-label:{
        position:relative;
        top:-3px;
        width:25%;
        min-height:20px;
        display:inline-block;
        margin-bottom:10px;
        color:var(--things-primary-text-color);
        font-size:12px;
        text-align:right;
        font-weight:100;
        line-height:1.6;
      }
      --things-input:{
        width:65%;
        margin-bottom:10px;
        padding:3px 5px 2px 5px;
        -webkit-border-radius:4px;
        -moz-border-radius:4px;
        border-radius:4px;
        border:1px solid rgba(0,0,0,.15);
        font-size:14px;
        font-weight:300;
      }
      --things-editor-number-input:{
        width:65%;
        padding:3px 5px 2px 5px;
      }
      --things-input-readonly-important:{
        background-color:transparent;
         padding:0 0 0 3px;
         position:relative;
         top:-2px;
         border-color:transparent;
         font-weight:600;
         color:var(--things-primary-text-color)
      }
      --things-textarea-label-width: 12.25%;
      --things-textarea-width : 94.5%;
      --things-textarea:{
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        border-radius: 4px;
        border: 1px solid rgba(0, 0, 0, .2);
        color: var(--things-primary-text-color);
        font-size: 13px;
        width: 100%;
        height: 84%;
        padding: 1%;
      }
      --things-fieldset:{
        border:none;
        margin:0;
        padding:9px 0 0 0;
        border-bottom:1px solid #cfd8dc;
        color:var(--things-primary-text-color);
        font-size:12px;
      }
      --paper-tabs:{
        background-color:var(--paper-blue-grey-50);
      }
      --things-fieldset-legend:{
        padding:9px 0 0 7px;
        font-size:11px;
        color:#e46c2e;
        font-weight:bold;
        text-transform:capitalize;
      }
      --things-select:{
        max-width:69%;
        min-width:50%;
        margin-bottom:10px;
        padding:3px 20px 2px 5px;
        -webkit-border-radius:4px;
        -moz-border-radius:4px;
        border-radius:4px;
        border:1px solid rgba(0,0,0,.15);
        font-size:15px;
        font-weight:300;
        -webkit-appearance: none;
      }
      --things-input-color:{
        position:relative;
        margin-left:-30px;
        width:25px;height:21px;
        border:none;
        padding:0;
      }
      --things-variable-ruletype-container:{
        display: block;
        width:94%;
        overflow:hidden;
        clear:both;
        margin:-7px 0 7px 7px;
        border:1px solid #ccc;
      }
      --things-record-action-button:{
        background-color:rgba(0,0,0,.5);
        border-radius:50%;
        border:none;
        margin:5px 0 0 4px;
        width:15px;height:15px;
        cursor:pointer;
        color:#fff;
        font-size:12px;
        line-height:0;
        text-indent:-2px;
      }
      --things-label-card-container:{
        background-color:#fff;
        width:22.5%;
        margin:10px 1.4%;
        border-radius:4px;
        -webkit-box-shadow: 1px 1px 2px 0px rgba(0,0,0,0.2);
        -moz-box-shadow: 1px 1px 2px 0px rgba(0,0,0,0.2);
        box-shadow: 1px 1px 2px 0px rgba(0,0,0,0.2);
      }
      --things-properties-ratio-btn:{
        float:right;
        width:25px;height:60px;
        min-width:25px;
        border:none;
        @apply(--things-margin-clear);
        @apply(--things-padding-clear);
        margin-right:10px;
      }
      --things-editor-buttons-radio-button:{
        width:30px;height:25px;
        min-width:initial;
        margin:0 4px 0 0;padding:0;
        border-radius:0;
        display:inline-block;
        opacity:.7;
        border-bottom:2px solid #fff;
      }
      --things-properties-icon-only-label:{
        background: url(/assets/images/icon-properties-label.png) no-repeat;
        width:30px;height:24px;
        margin-top:2px;
        margin-bottom:5px;
      }

      --things-editor-colorbar:{
        border:1px solid #ccc;
      }
      --things-editor-color-input-text:{
        @apply(--things-input);
      }
      --things-editor-color-input-color:{
        -webkit-appearance: none;
        display: inline-block;
        position: absolute;
        top: 1px;
        right: 4px;
        margin: 4px 0 0 4px;
        text-align: center;
        font-size: 0;
      }
      --things-dropdown-item: {
        min-height: 30px;
        border-bottom: 1px solid rgba(0, 0, 0, .1);
        padding: 0 10px;
        font-size: 13px;
        color: var(--things-primary-text-color);
      }
      --things-picker-button: {
        width: 30px;
        height: 25px;
        display: inline-block;
        margin-left: 2px;
        top: -2px;
        -webkit-border-radius: 3px;
        -moz-border-radius: 3px;
        border-radius: 3px;
      }


      /* login style */
      --things-login: {
        background: #fff;
        width: 45%;
        margin: auto;
        margin-top: 12%;
        -webkit-border-radius: 7px;
        -moz-border-radius: 7px;
        border-radius: 7px;
      }
      --things-mobile-login: {
        background: #fff;
        margin: auto;
        width:100%;height:100%;
      }


      /* button style */
      --things-header-button: {
          width: 45px;
          height: 45px;
          display: block;
          border: none;
          border-left: 1px solid rgba(0, 0, 0, .1);
      }
      --things-button: {
          background-color: var(--paper-blue-grey-500);
          min-width: initial;
          max-height:31px;
          padding: 9px 20px 7px 20px;
          font-size: 13px;
          color: #fff;
      }
      --things-button-important: {
          @apply(--things-button);
          background-color: var(--things-secondary-color);
          max-height:31px;
          padding: 9px 20px 7px 20px;
          font-weight: 700;
      }
      --things-search-fab: {
        background-color: var(--things-focus-background-color);
        width: 45px;
        height: 45px;
        position: relative;
        z-index: 5;
        float: right;
        top: -25px;
        margin-bottom: -45px;
        padding:0 !important;
      }
      --things-fab-text:{
        position:absolute;
        margin-top:18px;margin-left:-55px;
        padding:2px 3px;
        width:45px;
        background-color:rgba(0,0,0,.5);
        -moz-border-radius:3px;-webkit-border-radius:3px;border-radius:3px;
        color:#fff;
        font-size:11px;
        text-align:center;
        -webkit-box-shadow: 0px 2px 1px 0px rgba(0,0,0,0.2);
        -moz-box-shadow: 0px 2px 1px 0px rgba(0,0,0,0.2);
        box-shadow: 0px 2px 1px 0px rgba(0,0,0,0.2);
      }
      --things-fab-text-arrow:{
        content:"";
        position: absolute;
        left: 100%;
        top: 5px;
        width: 0;
        height: 0;
        border-top: 3px solid transparent;border-left: 4px solid rgba(0,0,0,.5);
        border-bottom: 3px solid transparent;
      }
      --things-login-link-button: {
        background-color:transparent;
        min-width: initial;
        max-height:31px;
        margin-top:15px;padding: 2px 5px 2px 0;
        font-size: 12px;
        color: var(--things-primary-text-color);
       }
      --things-login-button: {
        background-color: var(--things-focus-background-color);
        min-width: initial;
        width:100%;
        max-height:31px;
        margin-right:0;margin-left:0;
        padding: 15px 20px 17px 20px;
        font-size: 18px;
        color: #fff;
      }
      --things-home-image-url : url(/assets/images/bg-rail.png), url(/assets/images/bg-blue.png), url(/assets/images/bg-green.png);
      --things-home-image-position: 50% 100%, 0 0, 100% 50%;
      --things-home-image:{
        background-color: #f1f1f1;
        background-repeat: no-repeat;
      }

    }

    /* General styles */

    body {
      @apply(--layout-fullbleed);
      @apply(--layout-vertical);
    }

    .space {
      @apply(--layout-flex);
    }

    #drawerToolbar {
      color: var(--secondary-text-color);
      background-color: var(--drawer-menu-color);
      border-bottom: var(--drawer-toolbar-border-color);
    }

    #drawerToolbar .menu-name {
      @apply(--paper-font-title);
    }

    paper-scroll-header-panel {
      height: 100%;
    }

    paper-menu {
      --paper-menu-selected-item: {
        color: var(--primary-color);
      }

      --paper-menu-focused-item-after: {
        background: var(--primary-color);
      }
    }

    paper-menu iron-icon {
      margin-right: 33px;
      opacity: 0.54;
    }

    paper-menu a {
      @apply(--layout-horizontal);
      @apply(--layout-center);

      text-decoration: none;
      color: var(--menu-link-color);
      font-family: 'Roboto', 'Noto', sans-serif;
      -webkit-font-smoothing: antialiased;
      text-rendering: optimizeLegibility;
      font-size: 14px;
      font-weight: 400;
      line-height: 24px;
      min-height: 48px;
      padding: 0 16px;
    }

    #mainToolbar.tall .app-name {
      font-size: 40px;
      font-weight: 300;
      /* Required for main area's paper-scroll-header-panel custom condensing transformation */
      -webkit-transform-origin: left center;
      transform-origin: left center;
    }

    #mainToolbar .middle-container,
    #mainToolbar .bottom-container {
      @apply(--layout-horizontal);
      @apply(--layout-center);
    }

    #mainToolbar .middle-container  {
      height: 100%;
      margin-left: 48px;
    }

    #mainToolbar:not(.tall) .middle-container {
      font-size: 18px;
      padding-bottom: 0;
    }

    #mainToolbar .bottom-container {
      @apply(--paper-font-subhead);

      margin-left: 48px;
      /* Required for main area's paper-scroll-header-panel custom condensing transformation */
      -webkit-transform-origin: left center;
      transform-origin: left center;
    }

    /* Height of the scroll area */
    .content {
      height: 100%;
    }

    section[data-route="home"] paper-material {
      @apply(--paper-font-body2);
    }

    section[data-route="home"] paper-material .subhead {
      @apply(--paper-font-subhead);
    }

    paper-material {
      border-radius: 2px;
      height: 100%;
      padding: 16px 0 16px 0;
      width: calc(98.66% - 16px);
      margin: 16px auto;
      background: white;
    }

    #toast .toast-hide-button {
      color: #eeff41;
      margin: 10px;
    }

    /* Breakpoints */

    /* Small */
    @media (max-width: 600px) {

      #drawer .paper-toolbar {
        margin-left: 16px;
      }

      #mainToolbar.tall .app-name {
        font-size: 24px;
        font-weight: 400;
      }

      paper-material {
        --menu-container-display: none;
        width: calc(97.33% - 32px);
        padding-left: 16px;
        padding-right: 16px;
      }

    }

    /* Tablet+ */
    @media (min-width: 601px) {

      #drawer.paper-drawer-panel > [drawer] {
        border-right: 1px solid rgba(0, 0, 0, 0.14);
      }

      iron-pages {
        padding: 48px 62px;
      }

      paper-material {
        width: calc(98% - 46px);
        margin-bottom: 32px;
        padding-left: 30px;
        padding-right: 30px;
      }

    }

    /* Material Design Adaptive Breakpoints */
    /*
      Below you'll find CSS media queries based on the breakpoint guidance
      published by the Material Design team. You can choose to use, customise
      or remove these breakpoints based on your needs.

      http://www.google.com/design/spec/layout/adaptive-ui.html#adaptive-ui-breakpoints
      */

    /* mobile-small */
    @media all and (min-width: 0) and (max-width: 360px) and (orientation: portrait) { }
    /* mobile-large */
    @media all and (min-width: 361px) and (orientation: portrait) { }
    /* mobile-small-landscape */
    @media all and (min-width: 0) and (max-width: 480px) and (orientation: landscape) { }
    /* mobile-large-landscape */
    @media all and (min-width: 481px) and (orientation: landscape) { }
    /* tablet-small-landscape */
    @media all and (min-width: 600px) and (max-width: 960px) and (orientation: landscape) { }
    /* tablet-large-landscape */
    @media all and (min-width: 961px) and (orientation: landscape) { }
    /* tablet-small */
    @media all and (min-width: 600px) and (orientation: portrait) { }
    /* tablet-large */
    @media all and (min-width: 601px) and (max-width: 840px) and (orientation : portrait) { }
    /* desktop-x-small-landscape */
    @media all and (min-width: 0) and (max-width: 480px) and (orientation: landscape) { }
    /* desktop-x-small */
    @media all and (min-width: 0) and (max-width: 480px) and (max-aspect-ratio: 4/3) { }
    /* desktop-small-landscape */
    @media all and (min-width: 481px) and (max-width: 840px) and (orientation: landscape) { }
    /* desktop-small */
    @media all and (min-width: 481px) and (max-width: 840px) and (max-aspect-ratio: 4/3) { }
    /* desktop-medium-landscape */
    @media all and (min-width: 841px) and (max-width: 1280px) and (orientation: landscape) { }
    /* desktop-medium */
    @media all and (min-width: 841px) and (max-width: 1280px) and (max-aspect-ratio: 4/3) { }
    /* desktop-large */
    @media all and (min-width: 1281px) and (max-width: 1600px) { }
    /* desktop-xlarge */
    @media all and (min-width: 1601px) and (max-width: 1920px) { }

    </style>
  </template>
</dom-module>`;

document.head.appendChild(div);
