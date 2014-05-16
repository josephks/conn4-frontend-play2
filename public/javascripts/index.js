
function boardToString(){
  var ans = "";

  for(var ir = CONN4.rows; ir > 0 ; ir--){
    for(var ic = 1; ic <= CONN4.cols ; ic++){
        var tdid = "row"+ir+"col"+ic;
        switch(document.getElementById(tdid).className){
           case "redcell" :
              ans += "R";
           break;
           case "blackcell" :
              ans += "B";
           break;
           default:
              ans += " ";
       }//switch
      ans += "\n";
      console.log("classname for "+tdid+"is: "+document.getElementById(tdid).className);
    } //for ic
  } //for ir
  return ans;
}

function getHints(){
  document.getElementById("msgarea").textContent += " boardToString(): "+ boardToString();  //placeholder
  //jQuery.get( "/api/hints", { "key" :   boardToString() }, function(data, textStatus, jqXHR){
           //set hint data here
  // )  , json
}

function getSvgObjElem(filename){
  var objelm = document.createElement("object");
  objelm.setAttribute("data","assets/images/" + filename);
  objelm.setAttribute("type","image/svg+xml");
  return objelm;
}
 var CONN4 = {  boarddata : { col: {}, row: {}, diag1:{}, diag2: {}} ,
      whoseturn : "r", //r or b
      movebutton : [],
      movetd : []
   };

function  move(colidx){
    var colarr = CONN4.boarddata.col["" + colidx];
    //find last entry that is not empty and change to color
    //console.log("colarr (len "+colarr.length+") is: "+colarr);
    var cell = {};
    for(var i = colarr.length - 1 ; i >= 0; i--){
        // console.log("i: "+i);
        if (colarr[i].className ===  "emptycell" ){
            cell = colarr[i];
            if(i == 0){
                CONN4.movebutton[colidx].disabled = true;
                CONN4.movetd[colidx].className = "";
                CONN4.movebutton[colidx].className = "invisible";
            }
            break;
        }
    }
    if(CONN4.whoseturn === "r"){
        cell.className = "redcell";
        CONN4.whoseturn = "b";
        jQuery("#msgarea").text("black's turn");
        jQuery(".movebutton button").removeClass("red")
        jQuery(".movebutton button").addClass("black")
    }else{
        cell.className = "blackcell";
        CONN4.whoseturn = "r";
        jQuery("#msgarea").text("red's turn");
        jQuery(".movebutton button").removeClass("black")
        jQuery(".movebutton button").addClass("red")
    }
    var arrname = ["col", "row", "diag1", "diag2"] ;
    for(var ai in arrname ){
        // console.log("calling whowins on arrname[" + ai+" ] which is "+ arrname[ai] +" which is : "+CONN4.boarddata[arrname[ai]].toString());
        if (whowins( CONN4.boarddata[ arrname[ai] ])){
            var color = CONN4.whoseturn === "r" ? "black" : "red";
            document.getElementById("msgarea").textContent = color + " wins!";
            document.getElementById("buttonrow").className = "invisible";
            return;
        }
    }
}


 function whowins (outerarr){ //an array of tds
     var debug = false;
     var current = "";
     var inrow = 0;
     if (debug) console.log(" whowins() starting")
     for(var outeri in outerarr){
       var arr = outerarr[outeri];
       for(var i in arr) {
         if (!arr[i]) continue; // Skip null, undefi
         if (arr[i].className ===  current){
            inrow++;
            if (debug) console.log(" whowins()["+outeri+"]["+i+"] current="+current+" inrow="+inrow);
            if(current && inrow === 4 && current !== "emptycell" ){
                console.log(" whowins()["+outeri+"]["+i+"] returning "+current);
                return current;
            }
          }else{
             current = arr[i].className;
             inrow = 1;
             if (debug) console.log(" whowins()["+outeri+"]["+i+"] current="+current+" inrow="+inrow);
          }
       }
     }
     if (debug) console.log(" whowins() after for loop");
 }

 function createBoard(){      //called once
  //first find the css for the move button
//   for(var ssridx in document.styleSheets[0].cssRules){
//       var ssr = document.styleSheets[0].cssRules[ssridx];
//       //console.log("ssr: "+ssr);
//       if (ssr.selectorText === ".movebutton button" ){
//          CONN4.movecss = ssr;
//           console.log("found: "+ssr);
//          break;
//       }
//   }

  var ir = 0;
  var ic = 0;
  var thetable = document.getElementById("thetable");
  var rows =  parseInt(  document.getElementById("rows").value);
  var cols =  parseInt( document.getElementById("cols").value);
  CONN4.rows = rows;
  CONN4.cols = cols;

 // var boarddata = Array(cols); //array of arrays
  var boardcols = Array(cols);
  var boardrows = Array(rows);
  var diags1   = {};
  var diags2   = {};

  var hintrow  = document.createElement("tr");
  thetable.appendChild(hintrow);
  for(ic = 1; ic <= cols ; ic++){
     var newtd = document.createElement("td");
     newtd.className = "hintbox";
     hintrow.appendChild(newtd);
  }

  var buttonrow  = document.createElement("tr");
  buttonrow.id = "buttonrow";
  thetable.appendChild(buttonrow);
  for(ic = 1; ic <= cols ; ic++){
     var newtd = document.createElement("td");
     newtd.className = "movebutton";
     buttonrow.appendChild(newtd);
     CONN4.movetd[ic] = newtd;
     var newbutton = document.createElement("button");
     newbutton.setAttribute("class", "red");
     var helper = function (i) {
         return function (e) {
         move(i);
        };
     };

     newbutton.onclick = helper(ic);
     /*(function() {
         // Define and invoke
         var col = ic; // Private state of function be
         return function() { return move(col); };
        });             */
     newtd.appendChild(newbutton);
     CONN4.movebutton[ic] = newbutton;

  }

  for(ir = rows; ir > 0 ; ir--){
    var newrow = document.createElement("tr");
    newrow.setAttribute("class", "cells")
    thetable.appendChild(newrow);
    for(ic = 1; ic <= cols ; ic++){
        var newtd = document.createElement("td");
        newtd.setAttribute("id","row"+ir+"col"+ic);
        newtd.className = "emptycell";
        newrow.appendChild(newtd);
        //objelm = getSvgObjElem("greycircle.svg");
        //newtd.appendChild(objelm);
        if (!  CONN4.boarddata.col["" + ic]) { CONN4.boarddata.col["" + ic] = []; }
        CONN4.boarddata.col["" + ic].push( newtd);
         if (!  CONN4.boarddata.row["" + ir]    ) { CONN4.boarddata.row["" + ir] = []; }
        CONN4.boarddata.row["" + ir].push( newtd);
          if (!  CONN4.boarddata.diag1["" + (ir + ic)]    ) { CONN4.boarddata.diag1["" + (ir + ic)] = []; }
        CONN4.boarddata.diag1["" + (ir + ic)].push( newtd);
          if (!   CONN4.boarddata.diag2["" + (ic - ir)]   ) { CONN4.boarddata.diag2["" + (ic - ir)] = []; }
        CONN4.boarddata.diag2["" + (ic - ir)].push( newtd);
    }
  }
  document.getElementById("theform").className = "invisible" ;
  document.getElementById("hintbutton").className = "" ;
  console.log("done with createBoard")
}
