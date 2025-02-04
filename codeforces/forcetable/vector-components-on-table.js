function loadVectorCompsTable(id){

function writeMessage(message) {
    text.text(message);
    messageLayer.draw();
}

var colors = ['#DC3522', '#374140', '#D9CB9E', '#00A388', '#BEEB9F', '#FF6138', '#787746', '#703030', '#2F343B', '#C77966', '#7E827A', '#01B0F0', '#FF358B', '#AEEE00', '#F5A503', '#36B1BF', '#FFEEAD', '#8F8164', '#593325'];
function getRandomColor() {
    return colors[Math.round(Math.random() * (colors.length-1))];
}

var mainVector;


var stageAdd2 = new Kinetic.Stage({
    container: id,
    width: 700,
    height: 500,
});

    var sceneLayer = new Kinetic.Layer();

	var imageObj = new Image();

	  imageObj.onload = function() {
	    var forceTable = new Kinetic.Image({
	      x: 100,
	      y: 0,
	      image: imageObj,
	      width: 500,
	      height: 500,
		  opacity: 1

	  });
		  sceneLayer.add(forceTable);

		  stageAdd2.add(sceneLayer);
		   sceneLayer.moveToBottom();
	  }

	 imageObj.src = "force-table-cartesian.png";


function drawScene() {


	//
	// var forcetable = new Kinetic.Circle({
	//     radius: 200,
	//     x: stageAdd2.width()*.5,
	//     y: stageAdd2.height()*.5,
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
    points: [0, stageAdd2.height() * .5, stageAdd2.width(), stageAdd2.height() * .5],
    stroke: 'gray',
    // dash: [10, 10],
    strokeWidth: 1
});

var yaxis = new Kinetic.Line({
    points: [stageAdd2.width() * .5, 0, stageAdd2.width() * .5, stageAdd2.height()],
    stroke: 'gray',
    strokeWidth: 1
});
gridlayer.add(xaxis);
gridlayer.add(yaxis);
//stageAdd2.add(gridlayer);
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

var arrowRadius = 12;
var stickyAngles = [0,90,180,-90];
//var stickyAngles = [0, 30, 45, 60, 90, 120, 135, 150, 180, -30, -45, -60, -90, -120, -135, -150];
//var stickyAngles = [0,30,35,40,45,50,55,60,90,355,350,345,340,];


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
        opacity: 1,
        lineCap: 'round',
    });

    var mainVectorTriangle = new Kinetic.RegularPolygon({
        x: 0,
        y: 0,
        sides: 3,
        radius: arrowRadius,
        offset: [0, Math.round(arrowRadius / 2)],
        fill: color,
        opacity: 1,
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
        fill: '#000',
        opacity: 0,
        listening: false
    });


    var mainVectorLabel2 = new Kinetic.Text({
        x: initialX+20,
        y: initialY+10,
        name: 'vectorlabel2',
        fontFamily: 'Helvetica',
        fontSize: 24,
        text: baseLength+' N',
        fill: '#000',
        opacity: 0,
        listening: false
    });

    var mainVectortip = new Kinetic.Group({
        x: initialX,
        y: initialY,
        name: 'vectortip',
        rotation:(90+baseRotation),
        draggable: (name=='vectorYComp' || name=='vectorXComp' ? false : true)
    });

    mainVectortip.add(mainVectorTriangle);
    mainVectortip.add(mainVectorCircle);

    var mainVector = new Kinetic.Group({
        x: stageAdd2.width() * .5 + xstart,
        y: stageAdd2.height() * .5 + ystart,
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

    mainVectortip.on('dragmove', function() {

        var tip=[];
        tip.x = mainVectortip.x();
        tip.y = -(mainVectortip.y());
		//console.log('tipx:'+ tip.x);
		//.log('tipy:'+ tip.y);
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
            showVectorComps('x');
			showVectorComps('y');
        }
        else
        {
            mainVectortip.rotation(90-angle);
            mainVectorbase.points([0, 0, tip.x, -tip.y]);
            showVectorComps('x');
			showVectorComps('y');
        }

        mainVectorLabel.x(mainVectortip.x()/2+20);
        mainVectorLabel.y(mainVectortip.y()/2+10);
//		mainVectorLabel.text(Math.round(angle)+'\xB0');
		if(angle<0){angleText=angle+360;}
		else{angleText=angle;}
        mainVectorLabel.text(Math.round(angleText*4)/4+'\xB0'); //\xB0
        mainVectorLabel2.x(mainVectortip.x()+20);
        mainVectorLabel2.y(mainVectortip.y()+10);
        mainVectorLabel2.text(baselength+' N'); //\xB0

    });

    mainVector.add(mainVectorbase);
    mainVector.add(mainVectortip);
    mainVector.add(mainVectorLabel);
    mainVector.add(mainVectorLabel2);
    drawlayer.add(mainVector);
}

addVector(100, 4, 0, 0, 0, '#9474B4', 'vectorXComp', vectorlayer);
addVector(100, 4, -Math.PI/2, 0, 0, '#9474B4', 'vectorYComp', vectorlayer);
addVector(141, 6, -Math.PI/4, 0, 0, '#662D91', 'avector', vectorlayer);



function showVectorComps(dir) {

    var sum=[];
    sum.x=0;
    sum.y=0;
    var shapes = vectorlayer.find('.avector');


    $.each(shapes,function() {
		if(dir=='x'){
			sum.x += this.get('Line')[0].points()[2];
			sum.y = 0;

		}
			else{
				sum.x = 0;
				sum.y += this.get('Line')[0].points()[3];

			}
            //sum.y += this.get('Line')[0].points()[3];
    });
    //console.log('x: '+sum.x);
    //console.log('y: '+sum.y);
    var angle = (Math.atan2(sum.y, sum.x))*(180/Math.PI);
    var baselength = Math.sqrt(Math.pow(sum.x,2)+Math.pow(sum.y,2));
	if(dir=='x'){var shapes = vectorlayer.find('.vectorXComp');}
    if(dir=='y'){var shapes = vectorlayer.find('.vectorYComp');}
    var vectortip = shapes[0].get('.vectortip')[0];
    var vectorlabel = shapes[0].get('.vectorlabel')[0];
    var vectorlabel2 = shapes[0].get('.vectorlabel2')[0];

    shapes[0].get('Line')[0].points([0, 0, sum.x, sum.y]);
    vectortip.position({x: sum.x, y: sum.y});
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
    vectorlabel2.text(Math.round(baselength*1)/1+' N'); //\xB0

    vectorlayer.batchDraw();
}

showVectorComps('x');
showVectorComps('y');

//stageAdd2.add(sceneLayer);
stageAdd2.add(messageLayer);
stageAdd2.add(vectorlayer);
stageAdd2.add(sumlayer);
//stage.add(buttonLayer);
stageAdd2.draw();

}
