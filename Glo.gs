function getGlobals(){

  var ss=SpreadsheetApp.getActive();

  var sh=ss.getSheetByName('Globals');

  var rg=sh.getDataRange();

  var vA=rg.getValues();

  var g={};

  for(var i=0;i<vA.length;i++){

    g[vA[i][0]]=vA[i][1];

  }

  return g;

}

    

function setGlobals(dfltObj){

  if(dfltObj){

    var ss=SpreadsheetApp.getActive();

    var sh=ss.getSheetByName('Globals');

    var rg=sh.getDataRange();

    var vA=rg.getValues();

    for(var i=0;i<vA.length;i++){

      vA[i][1]=dfltObj[vA[i][0]];

    }

    rg.setValues(vA);

  }

}

  

function getGlobal(name){

  return getGlobals()[name];

}


function setGlobal(name,value){

  var curObj=getGlobals();

  curObj[name]=value;

  setGlobals(curObj);

}


