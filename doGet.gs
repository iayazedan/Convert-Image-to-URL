function getScriptURL(qs) {

  var url = ScriptApp.getService().getUrl();

  //Logger.log(url + qs);

  return url + qs ;

}


function doGet(e) 

{

  //Logger.log('query params: ' + Utilities.jsonStringify(e));

  if(e.queryString !=='')

  {  

    switch(e.parameter.mode)

    {

      case 'simplesite':

        setPage('simplesite');        

        return HtmlService

        .createTemplateFromFile('simplesite')

        .evaluate()

        .addMetaTag('viewport', 'width=device-width, initial-scale=1')

        .setTitle("Simple Site");

        break;  

      case 'myimages':

        setPage('myimages');        

        return HtmlService

        .createTemplateFromFile('myimages')

        .evaluate()

        .addMetaTag('viewport', 'width=device-width, initial-scale=1')

        .setTitle("My Images");

        break;  

      case 'mediaconverter':

         setPage('mediaconverter');

         return HtmlService

        .createTemplateFromFile('mediaconverter')

        .evaluate()

        .addMetaTag('viewport', 'width=device-width, initial-scale=1')

        .setTitle("Media Converter");

        break;

      default:

        setPage('mediaconverter');

        return HtmlService

        .createTemplateFromFile('mediaconverter')

        .evaluate()

        .addMetaTag('viewport', 'width=device-width, initial-scale=1')

        .setTitle("Media Converter");

        break;

    }

  }

  else

  {

    setPage('mediaconverter');

    return HtmlService

    .createTemplateFromFile('mediaconverter')

    .evaluate()

    .addMetaTag('viewport', 'width=device-width, initial-scale=1')

    .setTitle("Media Converter");

  }

}


function getPageData()

{

  var s='';

  s+='<input type="button" value="Media Converter" onClick="getUrl(\'?mode=mediaconverter\');" />';

  s+='<input type="button" value="My Images" onClick="getUrl(\'?mode=myimages\');" />';

  s+='<input type="button" value="Simple Site" onClick="getUrl(\'?mode=simplesite\');" />';

  

  var rObj={menu:s,title:getPage()};

  Logger.log(rObj);

  return rObj;

}


function include(
resources) {

  return HtmlService.createHtmlOutputFromFile(
resources).getContent();

}


function setPage(page) {

  var ps=PropertiesService.getUserProperties();

  ps.setProperty('PageTitle', page);

  return ps.getProperty('PageTitle');

}


function initPage() {

  var ps=PropertiesService.getUserProperties();

  ps.setProperty('PageTitle','');

  return ps.getProperty('PageTitle');

}


function getPage() {

  var ps=PropertiesService.getUserProperties();

  var pt=ps.getProperty('PageTitle');

  return pt;

}

  

function doGet1(e) 

{

  //Logger.log('query params: ' + Utilities.jsonStringify(e));

  if(e.queryString !=='')

  {  

    switch(e.parameter.mode)

    {

      case 'simplesite':

        setPage('simplesite');        

        return HtmlService

        .createTemplateFromFile('simplesite')

        .evaluate()

        .addMetaTag('viewport', 'width=device-width, initial-scale=1')

        .setTitle("Simple Site");

        break;  

      case 'myimages':

        setPage('myimages');        

        return HtmlService

        .createTemplateFromFile('myimages')

        .evaluate()

        .addMetaTag('viewport', 'width=device-width, initial-scale=1')

        .setTitle("My Images");

        break;  

      default:

        setPage('myimages');        

        return HtmlService

        .createTemplateFromFile('myimages')

        .evaluate()

        .addMetaTag('viewport', 'width=device-width, initial-scale=1')

        .setTitle("My Images");

        break;  

    }

  }

  else

  {

    setPage('myimages');        

    return HtmlService

    .createTemplateFromFile('myimages')

    .evaluate()

    .addMetaTag('viewport', 'width=device-width, initial-scale=1')

    .setTitle("My Images");

        

  }

}