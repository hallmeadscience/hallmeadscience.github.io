function loadbalanceairplane(id){

function writeMessage(message) {
    text.text(message);
    messageLayer.draw();
}

var colors = ['#DC3522', '#374140', '#D9CB9E', '#00A388', '#BEEB9F', '#FF6138', '#787746', '#703030', '#2F343B', '#C77966', '#7E827A', '#01B0F0', '#FF358B', '#AEEE00', '#F5A503', '#36B1BF', '#FFEEAD', '#8F8164', '#593325'];
function getRandomColor() {
    return colors[Math.round(Math.random() * (colors.length-1))];
}

var mainVector;
var resultantMagnitude = 0;
var resultantDir=0;
var dataTableArray =['Resultant', 'Thrust', 'Drag', 'Weight', 'Lift'];
var stageAdd1 = new Kinetic.Stage({
    container: id,
    width: 700,
    height: 500,
});


var buttonLayer = new Kinetic.Layer();
var sceneLayer = new Kinetic.Layer();
var dataLayer = new Kinetic.Layer();

function makeDataTable(name, fields, textsize, textcolor, fill, opacity, width, height, posx, posy, drawlayer) {

    var DataTableBG = new Kinetic.Rect({
        width: width,
        height: height,
        fill: fill,
		stroke: '#000',
        opacity: opacity,
        offset: {x: 0, y: 0}
    });
    var	DataToPresent;
	fields.forEach(function(entry) {
		//DataToPresent = DataToPresent+entry+': '+'\n';
	});

	var DataTableText = new Kinetic.Text({
        y: 00,
        width: width,
        height: height,
        fontFamily: 'Helvetica',
        fontSize: textsize,
        text: fields[0]+': '+ resultantMagnitude/2 + ' kN, '+resultantDir,
        fill: textcolor,
        padding: 1,
        align: 'left'
	})

    var DataTable = new Kinetic.Group({
        x: posx,
        y: posy,
        // x: Math.round(stage.width() * 0.7),
        // y: Math.round(stage.height() * 0.2),
        offset: {x: width/2, y: height/2},
        name: name,
    });
    DataTable.add(DataTableBG);
    DataTable.add(DataTableText);

    dataLayer.add(DataTable);
    dataLayer.draw();
}
function updateDataTable(name, message, field){
	dataLayer.find('.dataTable')[0].get('Text')[field].text(name+message);
}

function makeLabel(name, text, textsize, textcolor, fill, opacity, width, height, posx, posy, drawlayer) {
    var ButtonBG = new Kinetic.Rect({
        width: width,
        height: height,
        fill: fill,
        opacity: opacity,
        offset: {x: 0, y: 0}
    });
    var ButtonText = new Kinetic.Text({
        // x: 0,
        y: height/2-textsize,
        width: width,
        height: height,
        fontFamily: 'Helvetica Neue',
        fontSize: textsize,
        text: text,
        fill: textcolor,
        padding: 10,
        align: 'center'
    });
    var ButtonSimple = new Kinetic.Group({
        x: posx,
        y: posy,
        // x: Math.round(stage.width() * 0.7),
        // y: Math.round(stage.height() * 0.2),
        offset: {x: width/2, y: height/2},
        name: name,
    });
    ButtonSimple.add(ButtonBG);
    ButtonSimple.add(ButtonText);
    drawlayer.add(ButtonSimple);
    drawlayer.draw();

    ButtonSimple.on('mouseover mousedown touchstart', function() {
        this.scale({x: 0.98, y: 0.98});
        buttonLayer.batchDraw();
    });

    ButtonSimple.on('mouseout mouseup touchend', function() {
        this.scale({x: 1, y: 1});
        buttonLayer.batchDraw();
    });
}


    var sceneLayer = new Kinetic.Layer();

	var imageObj = new Image();

	  imageObj.onload = function() {
	    var forceTable = new Kinetic.Image({
	      x: 106,
	      y: 110,
	      image: imageObj,
	      width: 960/2,
	      height: 540/2,
		  opacity: 1

	  });
		  sceneLayer.add(forceTable);

		  stageAdd1.add(sceneLayer);
		   sceneLayer.moveToBottom();
	  }

	 imageObj.src = "airplane.png";


function drawScene() {


	//
	// var forcetable = new Kinetic.Circle({
	//     radius: 200,
	//     x: stageAdd1.width()*.5,
	//     y: stageAdd1.height()*.5,
	//     fill: '#dadada',
	//     opacity: 0.8,
	//     offset: {x:0, y: 0}
	// });
	//
	//     sceneLayer.add(forcetable);


}

drawScene();

 //GRID begin %%%%%%%%%%%%%%%%%%%%%
var gridlayer = new Kinetic.Layer();

var xaxis = new Kinetic.Line({
    points: [0, stageAdd1.height() * .5, stageAdd1.width(), stageAdd1.height() * .5],
    stroke: 'gray',
    // dash: [10, 10],
    strokeWidth: 1
});

var yaxis = new Kinetic.Line({
    points: [stageAdd1.width() * .5, 0, stageAdd1.width() * .5, stageAdd1.height()],
    stroke: 'gray',
    strokeWidth: 1
});
gridlayer.add(xaxis);
gridlayer.add(yaxis);
//stageAdd1.add(gridlayer);
 //GRID end %%%%%%%%%%%%%%%%%%%%%






var vectorlayer = new Kinetic.Layer({
    name: 'veclayer',
});

var sumlayer = new Kinetic.Layer();
var messageLayer = new Kinetic.Layer();

var text = new Kinetic.Text({
    x: 10,
    y: 10,
    fontFamily: 'Calibri',
    fontSize: 24,
    text: '',
    fill: 'black'
});

var vectors = [];
vectors.push({magnitude: 1, name: 'Resultant', present: 0});
// forces.push({direction: 90, magnitude: 100, name: 'Normal', present: 0});
var vectorCount = vectors.length;
var vectorCountUser = 0;



function drawStatus() {
   // makeLabel('checklist', 'Check List:', 20, 'white', '#c4c4c4', 0.8, 150, 50, Math.round(stage.width() * 0.9), 200, buttonLayer);
   // makeLabel('checkCount', 'Vector Count', 20, 'white', '#d9d9d9', 0.8, 150, 50, Math.round(stage.width() * 0.9), 250, buttonLayer);
    vectors.forEach(function(vector, index, array) {
        var checkname = 'check'+index;
        var checkcolor = (vector.present==0 ? '#d9d9d9' : '#54b543');
        var checkpos = 20+index*50;
        makeLabel(checkname, vector.name, 20, 'white', checkcolor, 0.8, 150, 50, Math.round(stageAdd1.width() * 0.1), checkpos, buttonLayer);
    });
    buttonLayer.batchDraw();
}
drawStatus();

function updateStatus() {
    vectors.forEach(function(vector, index, array) {
        var checkname = '.check'+index;
        var checkcolor = (vector.present==0 ? '#d9d9d9' : '#54b543');
        // var checkpos = 200+index*50;
        buttonLayer.find(checkname)[0].get('Rect')[0].fill(checkcolor);

        // makeLabel(checkname, force.name, 20, 'white', checkcolor, 0.8, 150, 50, Math.round(stage.width() * 0.9), checkpos, buttonLayer);
    });
    var checkcolor = (vectorCount==vectorCountUser ? '#54b543' : '#d9d9d9');
    //buttonLayer.find('.checkCount')[0].get('Rect')[0].fill(checkcolor);
    buttonLayer.batchDraw();
	dataLayer.batchDraw();
}


var arrowRadius = 12;
var stickyAngles = [];
for (i = 5; i <= 180; i+=5) {

    stickyAngles.push(i);
	stickyAngles.push(-i);
}
stickyAngles.push(0);
//var stickyAngles = [0,10,20,30,40,50,60,70,80,90,100,110,120,130,140,150,160,170,180];
//var stickyAngles = [0,30,35,40,45,50,55,60,90,-30,-35,-40,-45,-50,-55,-60,-65,-90];
//var stickyAngles = [0, 30, 45, 60, 90, 120, 135, 150, 180, -30, -45, -60, -90, -120, -135, -150];
//var stickyAngles = [0,30,35,40,45,50,55,60,90,355,350,345,340,];


function checkForces() {

    var checks = [];

    var shapes = vectorlayer.find('.vectorSum');
    vectorCountUser = shapes.length;
    vectorCount = vectors.length;

    vectors.forEach(function(vector, index, array) {
        // console.log('element.name')
        var match=0;
        // console.log("element:", force.name);
        shapes.forEach(function(userForce, userIndex, userArray) {
            // var compX = userForce.get('Line')[0].points()[2];
            // var compY = userForce.get('Line')[0].points()[3];
            var userForceTip = userForce.get('.vectortip')[0];
            var compX = userForceTip.x();
            var compY = userForceTip.y();
            var angle = -(Math.atan2(compY, compX))*(180/Math.PI);
            // baselength = Math.round(baselength/5) * 5;
            var baselength = Math.round(Math.sqrt(Math.pow(compX,2)+Math.pow(compY,2)));
            // console.log("baselength " + baselength + ' angle: ' + angle);
            // console.log("baselength " + baselength);
            if (baselength < vector.magnitude){
                match=1;
				ajaxInteractiveResponseUpdate('balanceAirplane',benchID,'lab2',courseNumber,match)

            }
        });
        vector.present = match;

    });
}

function addVector(baseLength, baseWidth, baseRotation, xstart, ystart, color, name, drawlayer) {

    // var initialX = (baseLength-arrowRadius) * Math.cos(baseRotation);
    // var initialY = (baseLength-arrowRadius) * Math.sin(baseRotation);
    var initialX = (baseLength) * Math.cos(baseRotation);
    var initialY = (baseLength) * Math.sin(baseRotation);

    baseLength = Math.round(baseLength);
    baseRotation = Math.round(baseRotation*180/Math.PI);

    var mainVectorbase = new Kinetic.Line({
        x: 0,
        y: 0,
        points: [0, 0, initialX, initialY],
        stroke: color,
        strokeWidth: baseWidth,
        dash: (name == 'vectorSum' ? [15,5] : 0),
        opacity: 0.7,
        lineCap: 'round',
    });

    var mainVectorTriangle = new Kinetic.RegularPolygon({
        x: 0,
        y: 0,
        sides: 3,
        radius: arrowRadius,
        offset: [0, Math.round(arrowRadius / 2)],
        fill: color,
        opacity: 0.7,
    });

    var mainVectorCircle = new Kinetic.Circle({
        x: 0,
        y: 0,
        radius: 20,
        stroke: 'black',
        dash: [4,4],
        strokeWidth: 1,
        opacity: 0,
    });

	var angleText;

	if(baseRotation>0){angleText=-1*baseRotation+360;}
	else{angleText=-baseRotation;}

    var mainVectorLabel = new Kinetic.Text({
        x: initialX/2+20,
        y: initialY/2+10,
        name: 'vectorlabel',
        fontFamily: 'Helvetica',
        fontSize: 24,
		//text: baseRotation,
        text: angleText+'\xB0',
        fill: color,
        opacity: 0,
        listening: false
    });


    var mainVectorLabel2 = new Kinetic.Text({
        x: initialX+20,
        y: initialY+10,
        name: 'vectorlabel2',
        fontFamily: 'Helvetica',
        fontSize: 24,
        text: 2*baseLength+' N',
        fill: '#000',
        opacity: 0,
        listening: false
    });

    var mainVectorLabel3 = new Kinetic.Text({
        x: initialX+20,
        y: initialY+10,
        name: 'vectorlabel2',
        fontFamily: 'Helvetica',
        fontSize: 18,
        text: name,
        fill: color,
        opacity: 1,
        listening: false

    });

    var mainVectortip = new Kinetic.Group({
        x: initialX,
        y: initialY,
        name: 'vectortip',
        rotation:(90+baseRotation),
        draggable: (name=='vectorSum'||name=='weight' ? false : true)
    });

    mainVectortip.add(mainVectorTriangle);
    mainVectortip.add(mainVectorCircle);

    var mainVector = new Kinetic.Group({
        x: stageAdd1.width() * .5 + xstart,
        y: stageAdd1.height() * .5 + ystart,
        draggable: false,
        name: name,
    });

    mainVector.on('mouseover mousedown touchstart', function() {
        mainVectorCircle.opacity((mainVector.name() == 'vectorSum' ? 0 : 0.5));
        mainVectorLabel.opacity(1);
        mainVectorLabel2.opacity(1);
        document.body.style.cursor = 'pointer';
        vectorlayer.batchDraw();
    });

    mainVector.on('mouseout mouseup touchend dragend', function() {
        mainVectorCircle.opacity(0);
        mainVectorLabel.opacity(0);
        mainVectorLabel2.opacity(0);
        document.body.style.cursor = 'default';
        vectorlayer.batchDraw();
    });

    mainVectortip.on('dragend', function() {
        checkForces();
        updateStatus();
    });

    mainVectortip.on('dragmove', function() {

        var tip=[];
        tip.x = mainVectortip.x();
        tip.y = -(mainVectortip.y());
		//console.log('tipx:'+ tip.x);
		//console.log('tipy:'+ tip.y);
        var baselength = Math.sqrt(Math.pow(tip.x,2)+ Math.pow(tip.y,2));
        var angle = Math.atan2(tip.y, tip.x)*180/Math.PI;
        baselength = Math.round(baselength/5) * 5;

        var pos=[];
        pos.x = baselength*Math.cos(angle*Math.PI/180);
        pos.y = -baselength*Math.sin(angle*Math.PI/180);
        mainVectortip.position(pos);
        mainVectorbase.points([0, 0, pos.x, pos.y]);

        var stickyAngle;

        $.each(stickyAngles,function() {
            if (Math.abs(this-angle) < 5) stickyAngle = this;
        });

        if (stickyAngle) {
            angle = stickyAngle;
            pos.x = baselength*Math.cos(stickyAngle*Math.PI/180);
            pos.y = -baselength*Math.sin(stickyAngle*Math.PI/180);
            mainVectortip.position(pos);
            mainVectorbase.points([0, 0, pos.x, pos.y]);
            mainVectortip.rotation(90-stickyAngle);
            showVectorSum();
        }
        else
        {
            mainVectortip.rotation(90-angle);
            mainVectorbase.points([0, 0, tip.x, -tip.y]);
            showVectorSum();
        }

        mainVectorLabel.x(mainVectortip.x()/2+20);
        mainVectorLabel.y(mainVectortip.y()/2+10);
//		mainVectorLabel.text(Math.round(angle)+'\xB0');
		if(angle<0){angleText=angle+360;}
		else{angleText=angle;}
		mainVectorLabel.text(Math.round(angleText)+'\xB0');
      //  mainVectorLabel.text(Math.round(angleText)+'\xB0' +' '+ baselength +'kN');
		mainVectorLabel.fontSize(14); //\xB0
       // mainVectorLabel2.x(mainVectortip.x()+20);
       // mainVectorLabel2.y(mainVectortip.y()+10);
       // mainVectorLabel2.text(2*baselength+' N'); //\xB0
        mainVectorLabel3.x(mainVectortip.x()+20);
        mainVectorLabel3.y(mainVectortip.y()+10);
        mainVectorLabel3.text(name);
		dataLayer.batchDraw();

    });

    mainVector.add(mainVectorbase);
    mainVector.add(mainVectortip);
    mainVector.add(mainVectorLabel);
    //mainVector.add(mainVectorLabel2);
	mainVector.add(mainVectorLabel3);
    drawlayer.add(mainVector);
}

addVector(100, 4, -4*Math.PI/4, 0, 0, 'black', 'vectorSum', vectorlayer);

addVector(90, 6, -Math.PI-.2, -100, 0, 'red', 'drag', vectorlayer);
addVector(100, 6, Math.PI/2, 0, 0, 'orange', 'weight', vectorlayer);
addVector(140, 6, -Math.PI/2+.2, -50,10, 'green', 'lift', vectorlayer);
addVector(120, 6, -.1, 50, 20, 'blue', 'thrust', vectorlayer);


function showVectorSum() {

    var sum=[];
    sum.x=0;
    sum.y=0;
    var shapes = vectorlayer.find('.drag, .weight, .thrust, .lift');


    $.each(shapes,function() {
            sum.x += this.get('Line')[0].points()[2];
            sum.y += this.get('Line')[0].points()[3];
    });
    //console.log('x: '+sum.x);
    //console.log('y: '+sum.y);
    var angle = (Math.atan2(sum.y, sum.x))*(180/Math.PI);
    var baselength = Math.sqrt(Math.pow(sum.x,2)+Math.pow(sum.y,2));
    var shapes = vectorlayer.find('.vectorSum');
    var vectortip = shapes[0].get('.vectortip')[0];
    var vectorlabel = shapes[0].get('.vectorlabel')[0];
    var vectorlabel2 = shapes[0].get('.vectorlabel2')[0];

    shapes[0].get('Line')[0].points([0, 0, sum.x, sum.y]);
    vectortip.position(sum);
    vectortip.rotation(90+angle);

    vectorlabel.x(vectortip.x()/2+20);
    vectorlabel.y(vectortip.y()/2+10);
	angleText = (Math.atan2(-1*sum.y, sum.x))*(180/Math.PI);
	if(angleText<0){angleText=angleText+360;}
	else{angleText=angleText;}
    vectorlabel.text(Math.round(angleText)+'\xB0'); //\xB0
    vectorlabel2.x(vectortip.x()+20);
    vectorlabel2.y(vectortip.y()+10);
//	vectorlabel2.text(2*baselength);

    vectorlabel2.text(2*Math.round(baselength*100)/100+' N'); //\xB0
	vectorlabel2.opacity(0);
    vectorlayer.batchDraw();
	resultantMagnitude = 100*Math.round(baselength*100)/100;

	if (resultantMagnitude < 1){vectortip.opacity(0); resultantDir = 'na';}
	else {vectortip.opacity(1);	resultantDir = Math.round(angleText)+'\xB0';}
	//dataLayer.batchDraw();
	//console.log(resultantMagnitude);
	//dataLayer.DataTable.DataTableText.text(resultantMagnitude);
	//dataLayer.find('.dataTable')[0].get('Text')[field].text(name+message);
	makeDataTable('dataTable', dataTableArray, 14, '#000', 'white', 1, 200, 30, 600, 30, dataLayer)
}

showVectorSum();

//makeDataTable('dataTable', dataTableArray, 14, '#000', 'white', 1, 200, 150, 600, 30, dataLayer)


//stageAdd1.add(sceneLayer);
stageAdd1.add(messageLayer);
stageAdd1.add(vectorlayer);
stageAdd1.add(sumlayer);
stageAdd1.add(buttonLayer);
stageAdd1.add(dataLayer);
stageAdd1.draw();

}
