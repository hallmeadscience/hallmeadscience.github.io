function divDisplayShow(id)
{
	this.document.getElementById(id).style.display="block";
}

function divDisplayHide(id)
{
	this.document.getElementById(id).style.display="none";
}

function checkQuestionResponse(questionID, qType, correctResponse, elementID)
{
   var isCorrect=false;
    userResponse = document.getElementById(elementID).value;
    if(qType == 'numeric'){
        //alert(correctResponse);
        if (correctResponse == userResponse){
            //alert('yes');
        }
        else {
            //alert('no');
        }
    }
}

function ajaxcallback()
{
	if (xmlHttp.readyState==4 || xmlHttp.readyState=="complete")
	{
		document.getElementById(divName).innerHTML=xmlHttp.responseText;
		document.getElementById(divName).style.display="block";
		//alert("Updating DIV"+divName);
		document.getElementById("loading").style.display="none";

	}

}
function ajaxProcessRequest(requestType, funcDivName, processStr)
{


	xmlHttp=GetXmlHttpObject();

	if (xmlHttp==null)
	{
		alert ("Browser does not support HTTP Request")
		return
	}
	divName = funcDivName;

	var url="/wp-content/plugins/physlabs/scripts/ajax.php?";
	var qrystr=processStr+"&action="+requestType+"&sid="+Math.random();

	var sendURL = url+qrystr;


	xmlHttp.onreadystatechange=ajaxcallback
	xmlHttp.open("POST",sendURL,true)
	xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlHttp.setRequestHeader("Content-length", qrystr.length);
	xmlHttp.setRequestHeader("Connection", "close");
	xmlHttp.send(qrystr);
}

function ajaxQuestionResponseUpdate(responseID, benchID, labID, courseNumber, qType)
{

	var userResponse = '';
	//var dataObject = $('#form-'+responseID).serializeArray();
	//alert(dataObject);
	//alert(responseID+benchID+labID+courseNumber+qType);
	if (qType=='numeric'){
		//userResponse = dataObject;
		userResponse = document.getElementById(responseID).value;

		if (!userResponse)
		{
			alert("please enter your value before clicking");
			return;
		}
	}


	$('#loaderImage'+responseID).show();
	$.ajax({
		type: 'POST',
		url: ajaxurl,

		data: {
			"action": "addResponseToDatabase",
			"userResponse": userResponse,
			"benchID": benchID,
			"responseID": responseID,
      "labID": labID,
			"courseNumber": courseNumber

		},
        dataType: 'json',
		success: function(data){
        //console.log(data);
		//console.log(data);
		//alert(userResponse);
		$('#loaderImage'+responseID).hide();
		$('#'+responseID).css('background-color', '#E1E3E9');
		$(function() {

		    $('#submitButton'+responseID).fadeOut(200, function() {
				$(this).removeClass('btn-primary');
				$(this).addClass('btn-success');
		    $(this).val('Resubmit?').fadeIn(200);

		    });

		});


        // $('#displayVerdict'+questionID).html(data.msg);
//         $('#displayVerdict'+questionID).addClass(data.msg);
//         $('#attemptCountDisplay'+questionID).html(data.attemptCount);
//
        if (data.msg == 'correct')
        {
            jQuery('#inputBox'+questionID).fadeOut ('slow');
            //jQuery('#inputBox'+questionID).fadeOut ('slow', function(){ '#inputBox'+questionID.remove(); });
        }


        //updateThings();
        //jQuery('#info1').html('trig');
        }

	});

	return false;

}

function ajaxInteractiveResponseUpdate(responseID,benchID,labID,courseNumber,yesno){

	$.ajax({
		type: 'POST',
		url: ajaxurl,
		data: {
			"action": "addResponseToDatabase",
			"userResponse": yesno,
			"benchID": benchID,
			"responseID": responseID,
      "labID": labID,
			"courseNumber": courseNumber
		},
        dataType: 'json',
		success: function(data){
			//console.log(responseID + '-status')
			$('#'+responseID+'-status').html('Task has been completed');
			$('#'+responseID+'-status').removeClass("bg-warning");
			$('#'+responseID+'-status').addClass("bg-success");

        }
	});

	return false;
}

function ajaxRefreshData(responseID,section,labID)
{
	$.ajax({
		type: 'GET',
		url: ajaxurl,
		data: {
			"action": "getClassData",
			"section": section,
			"responseID": responseID,
            "labID": labID
		},
    dataType: 'json',
		success: function(data){
		console.log(data);
		//alert(data['headsize']);
		//alert(data);
		//console.log(data);
		//console.log(data);

		//$('#'+responseID).css('background-color', '#E0E6F8');
        // $('#displayVerdict'+questionID).html(data.msg);
//         $('#displayVerdict'+questionID).addClass(data.msg);
//         $('#attemptCountDisplay'+questionID).html(data.attemptCount);
//


        //updateThings();
        //jQuery('#info1').html('trig');
        }
	});
	return false;
}


function updateThings() {

   console.log('ho');
}
