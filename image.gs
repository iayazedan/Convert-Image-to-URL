function getDataURI(fileId) {

  var file=DriveApp.getFileById(fileId);

  return file.getBlob().getDataAsString();

}


function getImagesPageContent() {

  var ss=SpreadsheetApp.getActive();

  var sh=ss.getSheetByName('MyImages');

  var rg=sh.getRange(1,2,sh.getLastRow(),1);

  var vA=rg.getValues();

  var html='';

  html+='<table>';

  var n=0;

  var w=300;

  for(var i=0;i<vA.length;i+=3) {

    html+='<tr>';

    if(i%9==0){

      html+=Utilities.formatString('<td colspan="3"><img id="img-%s" src="%s" width="%s" /></td>',n++,getDataURI(vA[i][0]),3*w);

      continue;                             

    }else{

      html+=Utilities.formatString('<td><img id="img-%s" src="%s" width="%s" /></td>',n++,getDataURI(vA[i][0]),w);

      html+=Utilities.formatString('<td><img id="img-%s" src="%s" width="%s" /></td>',n++,getDataURI(vA[i+1][0]),w);

      html+=Utilities.formatString('<td><img id="img-%s" src="%s" width="%s" /></td>',n++,getDataURI(vA[i+2][0]),w);

    }

    html+='</tr>';

  }

  html+='</table>';

  var bgimg=getDataURI(SpreadsheetApp.getActive().getSheetByName('MyImagesBackground').getRange('B1').getValue());

  var hObj={heading:'My Images',content:html,bgimage:bgimg};

  

  return hObj;

}


function getSimpleSiteImages() {

  var ss=SpreadsheetApp.getActive();

  var sh=ss.getSheetByName('SimpleSite');

  var rg=sh.getDataRange();

  var vA=rg.getValues();

  var oObj={iA:[]};

  for(var i=0;i<vA.length;i++) {

    oObj.iA[i]=vA[i][2];

    oObj[oObj.iA[i]]=getDataURI(vA[i][1]);

  }

  return oObj;

}