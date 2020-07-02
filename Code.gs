function onOpen(){

  SpreadsheetApp.getUi().createMenu('My Menu')

  .addItem('Media Converter', 'showImageConverterAsDialog')

  .addItem('Build Media File List', 'buildMediaFileList')

  .addItem('Build Sound FolderList', 'buildSoundFolderList')

  .addToUi();

}


function saveDataURIInFile(filename,datauri,type) {

  Logger.log('filename: %s\ndatauri: %s\ntype: %s\n',filename,datauri,type);

  if(filename && datauri && type) {

    var folder=DriveApp.getFolderById(getGlobal('MediaFolderId'));

    var files=folder.getFilesByName(filename);

    while(files.hasNext()) {

      files.next().setTrashed(true);

    }

    var f=folder.createFile(filename,datauri,MimeType.PLAIN_TEXT);

    return {name:f.getName(),id:f.getId(),type:type,uri:DriveApp.getFileById(f.getId()).getBlob().getDataAsString()};

  }else{

    throw('Invalid input in saveDataURIInFile.');

  }

}


function showImageConverterAsDialog(){

  var ui=HtmlService.createTemplateFromFile('mediaconverter').evaluate().setWidth(600).setHeight(550);

  SpreadsheetApp.getUi().showModelessDialog(ui, 'Media Converter');

}


function include(filename){

  return HtmlService.createHtmlOutputFromFile(filename).getContent();

}


function createDataTable(){

  var data=getData();

  var s='<table>';

  for(var i=0;i<data.length;i++){

    s+='<tr>';

    for(var j=0;j<data[i].length;j++){

      s+=Utilities.formatString('<td>%s</td>', data[i][j]);

    }

    s+='</tr>';

  }

  s+='</table>';

  return s;

}


function convImageUrl(url){

  var url=url || "http://jimesteban.com/images/mimincoopers.png";

  var blob=UrlFetchApp.fetch(url).getBlob();

  var b64Url='data:' + blob.getContentType() + ';base64,' + Utilities.base64Encode(blob.getBytes());

  return b64Url;

}


function buildMediaFileList(){

  var ss=SpreadsheetApp.getActive();

  var sh=ss.getSheetByName('Media File List');

  sh.clearContents();

  var mA=[['Media File Name','Media File Type','Media File Id']]

  var mediaFolder=DriveApp.getFolderById(getGlobal('MediaFolderId'));

  var files=mediaFolder.getFiles();

  while(files.hasNext()){

    var file=files.next();

    var s=file.getBlob().getDataAsString().split(',')[0];

    var type=s.slice(s.indexOf(':')+1,s.indexOf(';'));

    mA.push([file.getName(),type,file.getId()]);

  }

  sh.getRange(1,1,mA.length,mA[0].length).setValues(mA);

}


function buildSoundFolderList(){

  var ss=SpreadsheetApp.getActive();

  var sh=ss.getSheetByName('Sound Folder List');

  sh.clearContents();

  var mA=[['Sound File Name','Sound File Type','Sound File Id']]

  var mediaFolder=DriveApp.getFolderById(getGlobal('SoundFolderId'));

  var files=mediaFolder.getFiles();

  while(files.hasNext()){

    var file=files.next();

    var s=file.getBlob().getDataAsString().split(',')[0];

    var type=s.slice(s.indexOf(':')+1,s.indexOf(';'));

    mA.push([file.getName(),type,file.getId()]);

  }

  sh.getRange(1,1,mA.length,mA[0].length).setValues(mA);

}


function getMediaSelectionList(){

  var mediaFolder=DriveApp.getFolderById(getGlobal('MediaFolderId'));

  var files=mediaFolder.getFiles();

  var vA=[];

  while(files.hasNext()){

    var file=files.next();    

    vA.push([file.getName(),file.getId()]);

  }

  return vA;

}


function getSelectedFile(fileId){

  var file=DriveApp.getFileById(fileId);

  var dataURI=file.getBlob().getDataAsString();

  var s=dataURI.split(',')[0];

  var mediaType=s.slice(s.indexOf(':')+1,s.indexOf('/'));

  var fileType=s.slice(s.indexOf('/')+1,s.indexOf(';'));

  var fObj={name:file.getName(),uri:dataURI ,type:mediaType,filetype:fileType};

  return fObj;

}



