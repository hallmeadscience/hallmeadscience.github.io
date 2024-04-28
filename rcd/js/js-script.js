// popup code
function openWindow(url, name) {
  var l = openWindow.arguments.length;
  var w = "";
  var h = "";
  var features = "";

  for (i=2; i<l; i++) {
    var param = openWindow.arguments[i];
    if ( (parseInt(param) == 0) ||
      (isNaN(parseInt(param))) ) {
      features += param + ',';
    } else {
      (w == "") ? w = "width=" + param + "," :
       h = "height=" + param;
    }
  }

  features += w + h;
  var code = "popupWin = window.open(url, name";
  if (l > 2) code += ", '" + features;
  code += "')";
  eval(code);
  }
  
// drop down menu
function gotosite(site) {            
        if (site != "") {                    
                self.location=site; 
        }
}   

// dhtml Nav
function MM_showHideLayers(object,val) { 
document.getElementById(object).style.visibility = val; 
} 

//hirmes
function newPage()
{
	box = document.pageForm.pageSelect;
	destination = box.options[box.selectedIndex].value;
	if ( destination != "none" ) {
		location.href = destination + ".html";
	}
}

document.write('<style type=\"text/css\">.keyword {width:90px;}</style>')