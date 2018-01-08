import '@polymer/polymer/polymer-element';

const div = document.createElement('div');
div.setAttribute('style', 'display: none;');

div.innerHTML = `
<dom-module id="shared-styles">
  <template>
    <style>

    ::-webkit-scrollbar {width:5px;}
    ::-webkit-scrollbar-track {background-color:transparent;}
    ::-webkit-scrollbar-thumb {background-color:rgba(0,0,0,.2);}
    ::-webkit-scrollbar-thumb:hover {background-color:#aa866a;}

    *:focus{outline: none;}

    .page-title {
      @apply(--paper-font-display2);
    }

    paper-menu a > *, paper-menu paper-item > *, paper-menu paper-icon-item > * {
      pointer-events: none;
    }

    @media (max-width: 600px) {
      .page-title {
        font-size: 24px!important;
      }
    }

    body {
      background: #fafafa;
      font-family: 'Roboto', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      color: #333;
    }

    .content{padding:0px !important;}
    ol,ul{list-style:none;margin:0;padding:0;}
    a{color:#fff;}
    table{border-collapse:collapse;border:none;}


    .fieldset-hr{
      width:92%;height:1px;
      background-color:rgba(0,0,0,.1);
      border:0;
      margin:3px auto !important;
      position:relative;top:4px;
    }
    fieldset div.full-width{
      width:95%;
      overflow:hidden;
      margin-left:7px;
    }

    .icon-only-label{
      background:url(./assets/images/icon-properties-label.png) no-repeat;
      color:transparent !important;
    }
    .icon-only-label.color        {background-position:70% -498px;}
    .icon-only-label.font-size  {background-position:70% -594px;}
    .icon-only-label.leading    {background-position:70% -696px;}
    .icon-only-label.hscale      {background-position:70% -296px;}
    .icon-only-label.vscale      {background-position:70% -396px;}
    .icon-only-label.linewidth {background-position:70% -894px;}
    .icon-only-label.lineHeight{background-position:70% -995px;}

    .line-type paper-menu{overflow:hidden;max-width:100px;}
    .line-type paper-item{
      background:url(./assets/images/icon-properties-line-type.png) 50% 0 no-repeat;
      min-height:25px;
      padding:3px 9px;
      width:80px;
    }
    /*.line-type.solid::shadow paper-menu-button::shadow .paper-input-container input{background-position:50%    10px}*/
    .line-type paper-item.solid             {background-position:50%    10px}
    .line-type paper-item.round-dot         {background-position:50%   -40px}
    .line-type paper-item.square-dot        {background-position:50%   -90px}
    .line-type paper-item.dash              {background-position:50%  -140px}
    .line-type paper-item.dash-dot          {background-position:50%  -190px}
    .line-type paper-item.long-dash         {background-position:50%  -240px}
    .line-type paper-item.long-dash-dot     {background-position:50%  -290px}
    .line-type paper-item.long-dash-dot-dot {background-position:50%  -340px}

    .line-type .paper-input-container input{background:url(./assets/images/icon-properties-line-type.png) 50% 0 no-repeat !important;}
    .line-type.solid .paper-input-container input            {background-position:50%    5px !important}
    .line-type.round-dot .paper-input-container input        {background-position:50%  -45px !important}
    .line-type.square-dot .paper-input-container input       {background-position:50%  -85px !important}
    .line-type.dash .paper-input-container input             {background-position:50% -145px !important}
    .line-type.dash-dot .paper-input-container input         {background-position:50% -185px !important}
    .line-type.long-dash .paper-input-container input        {background-position:50% -245px !important}
    .line-type.long-dash-dot .paper-input-container input    {background-position:50% -285px !important}
    .line-type.long-dash-dot-dot .paper-input-container input{background-position:50% -345px !important}

    .arrow-type paper-menu{overflow:hidden;max-width:140px;}
    .arrow-type paper-item{
      background:url(./assets/images/icon-properties-arrow-type.png) 50% 0 no-repeat;
      min-height:30px;
      padding:3px 7px;
      width:30px;
      float:left;
    }
    .arrow-type paper-item.begin-no           {background-position:50%    16px}
    .arrow-type paper-item.begin-arrow        {background-position:50%   -39px}
    .arrow-type paper-item.begin-open-arrow   {background-position:50%   -89px}
    .arrow-type paper-item.begin-stealth-arrow{background-position:50%  -139px}
    .arrow-type paper-item.begin-diamond-arrow{background-position:50%  -190px}
    .arrow-type paper-item.begin-oval-arrow   {background-position:50%  -238px}
    .arrow-type paper-item.begin-size1        {background-position:50%  -286px}
    .arrow-type paper-item.begin-size2        {background-position:50%  -336px}
    .arrow-type paper-item.begin-size3        {background-position:50%  -386px}
    .arrow-type paper-item.begin-size4        {background-position:50%  -436px}
    .arrow-type paper-item.begin-size5        {background-position:50%  -486px}
    .arrow-type paper-item.begin-size6        {background-position:50%  -536px}
    .arrow-type paper-item.begin-size7        {background-position:50%  -589px}
    .arrow-type paper-item.begin-size8        {background-position:50%  -639px}
    .arrow-type paper-item.begin-size9        {background-position:50%  -689px}
    .arrow-type paper-item.end-no             {background-position:50%    16px}
    .arrow-type paper-item.end-arrow          {background-position:50%  -739px}
    .arrow-type paper-item.end-open-arrow     {background-position:50%  -789px}
    .arrow-type paper-item.end-stealth-arrow  {background-position:50%  -839px}
    .arrow-type paper-item.end-diamond-arrow  {background-position:50%  -890px}
    .arrow-type paper-item.end-oval-arrow     {background-position:50%  -938px}
    .arrow-type paper-item.end-size1          {background-position:50%  -986px}
    .arrow-type paper-item.end-size2          {background-position:50% -1036px}
    .arrow-type paper-item.end-size3          {background-position:50% -1086px}
    .arrow-type paper-item.end-size4          {background-position:50% -1136px}
    .arrow-type paper-item.end-size5          {background-position:50% -1186px}
    .arrow-type paper-item.end-size6          {background-position:50% -1236px}
    .arrow-type paper-item.end-size7          {background-position:50% -1289px}
    .arrow-type paper-item.end-size8          {background-position:50% -1339px}
    .arrow-type paper-item.end-size9          {background-position:50% -1389px}

    .arrow-type .paper-input-container input{background:url(./assets/images/icon-properties-arrow-type.png) 110% 0 no-repeat !important;}
    .arrow-type.begin-no .paper-input-container input           {background-position:110%     5px !important}
    .arrow-type.begin-arrow .paper-input-container input        {background-position:110%   -50px !important}
    .arrow-type.begin-open-arrow .paper-input-container input   {background-position:110%  -100px !important}
    .arrow-type.begin-stealth-arrow .paper-input-container input{background-position:110%  -150px !important}
    .arrow-type.begin-diamond-arrow .paper-input-container input{background-position:110%  -200px !important}
    .arrow-type.begin-oval-arrow .paper-input-container input   {background-position:110%  -250px !important}
    .arrow-type.begin-size1 .paper-input-container input        {background-position:110%  -298px !important}
    .arrow-type.begin-size2 .paper-input-container input        {background-position:110%  -348px !important}
    .arrow-type.begin-size3 .paper-input-container input        {background-position:110%  -398px !important}
    .arrow-type.begin-size4 .paper-input-container input        {background-position:110%  -448px !important}
    .arrow-type.begin-size5 .paper-input-container input        {background-position:110%  -498px !important}
    .arrow-type.begin-size6 .paper-input-container input        {background-position:110%  -548px !important}
    .arrow-type.begin-size7 .paper-input-container input        {background-position:110%  -600px !important}
    .arrow-type.begin-size8 .paper-input-container input        {background-position:110%  -650px !important}
    .arrow-type.begin-size9 .paper-input-container input        {background-position:110%  -700px !important}
    .arrow-type.end-no .paper-input-container input             {background-position:110%     5px !important}
    .arrow-type.end-arrow .paper-input-container input          {background-position:110%  -750px !important}
    .arrow-type.end-open-arrow .paper-input-container input     {background-position:110%  -800px !important}
    .arrow-type.end-stealth-arrow .paper-input-container input  {background-position:110%  -850px !important}
    .arrow-type.end-diamond-arrow .paper-input-container input  {background-position:110%  -900px !important}
    .arrow-type.end-oval-arrow .paper-input-container input     {background-position:110%  -950px !important}
    .arrow-type.end-size1 .paper-input-container input          {background-position:110%  -998px !important}
    .arrow-type.end-size2 .paper-input-container input          {background-position:110% -1048px !important}
    .arrow-type.end-size3 .paper-input-container input          {background-position:110% -1098px !important}
    .arrow-type.end-size4 .paper-input-container input          {background-position:110% -1148px !important}
    .arrow-type.end-size5 .paper-input-container input          {background-position:110% -1198px !important}
    .arrow-type.end-size6 .paper-input-container input          {background-position:110% -1248px !important}
    .arrow-type.end-size7 .paper-input-container input          {background-position:110% -1300px !important}
    .arrow-type.end-size8 .paper-input-container input          {background-position:110% -1350px !important}
    .arrow-type.end-size9 .paper-input-container input          {background-position:110% -1400px !important}
    /*.arrow-type. .paper-input-container input            {background-position:110%    px !important}
    .arrow-type. .paper-input-container input            {background-position:110%    px !important}*/

    .pull-left {float:left;}
    .pull-right{float:right;}
    .width10per{width:10% !important;}
    .width22per{width:22% !important;}
    .talign-left  {text-align:left   !important;}
    .talign-right {text-align:right  !important;}
    .talign-center{text-align:center !important;}
    .scroll-y{overflow-y:auto;}
    .shadow{
      -webkit-box-shadow: 2px 2px 1px 0px rgba(0,0,0,0.15);
      -moz-box-shadow:    2px 2px 1px 0px rgba(0,0,0,0.15);
      box-shadow:         2px 2px 1px 0px rgba(0,0,0,0.15);
    }
    .radius{
      -webkit-border-radius: 7px;
      -moz-border-radius:    7px;
      border-radius:         7px;
    }

    .whitebox{background:#fff}
    .paddingbox{padding:15px;}

    .things-context-menu paper-menu{min-width:120px;}
    .things-context-menu paper-item{
      min-height:35px;
      padding:0 12px;
      border-bottom:1px solid #efefef;
      font-size:13px;
    }
    .things-context-menu paper-item span{
      position:absolute;
      top:5px;
      right:10px;
      color:#999;
      font-size:12px;
    }
    .things-context-menu paper-menu-button{
      padding:0;
      width:100%;
    }
    .things-context-menu paper-menu-button paper-item iron-icon{
      position:absolute;
      top:8px;
      right:5px;
      padding:1px;
      width:15px;height:15px;
      opacity:.5;
    }

    things-property-label{border-left:none !important;}

    .same-width .btn-group{
      width:45%;
      min-width:112px;
    }
    .column-double-iconlabel .btn-group{
      width:93%;
      margin-left:3%;
    }

    /* Small devices (tablets, 768px and up) */
    @media only all and (max-width:300px)  {things-item paper-card.things-item{width:  98% !important;}}
    @media only all and (min-width: 300px)  {things-item paper-card.things-item{width:  98% !important;}}
    @media only all and (min-width: 400px)  {things-item paper-card.things-item{width:  47% !important;}}
    @media only all and (min-width: 750px)  {things-item paper-card.things-item{width:31.5% !important;}}
    @media only all and (min-width: 990px)  {things-item paper-card.things-item{width:23.5% !important;}}
    @media only all and (min-width: 1400px) {things-item paper-card.things-item{width:18.5% !important;}}

    </style>
  </template>
</dom-module>`;

document.head.appendChild(div);
