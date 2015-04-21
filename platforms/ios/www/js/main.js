    
	


    //---------------------------------------------------//
	var Deviceheight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    var Devicewidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	var h = Deviceheight *0.07;
    var w = Devicewidth;
	//console.log(h);
    var fakeCircle=document.getElementById("fakeCircle");
	var circle=document.getElementById("circle");
	circle.style.height=2.2*h+"px";
	circle.style.width=2.2*h+"px";

	var Fan = document.getElementById("MenuFan");
    // console.log(Fan.style.width);
	Fan.style.height = w*1.4 + "px";
    Fan.style.bottom = w*(-0.75) + "px";
	var MenuRadius = w*1.4;
    //console.log(MenuRadius);

    //$(".itemCircle").css({"height":h, "width":h});


    var MenuOpenStatus = false;
    var targetAddress = 1;

    function MenuOpen(){

    //itemList[0].NewShine(0);

    if(MenuOpenStatus == false){
      if(newFound == true){
      MenuShowR("new", targetAddress);//over_write by address;
      itemList[targetAddress-1].Dom.style.opacity = "1";
      itemList[targetAddress-1].Dom.childNodes[0].style.backgroundImage = "url('images/butterfly.png')";
      itemList[targetAddress-1].NewShine(targetAddress-1);

      itemList[targetAddress].Dom.style.opacity = "1";
      itemList[targetAddress].Dom.childNodes[0].style.backgroundImage = "url('images/watch.png')";

      itemList[targetAddress+1].Dom.style.opacity = "1";
      itemList[targetAddress+1].Dom.childNodes[0].style.backgroundImage = "url('images/box.png')";

      itemList[targetAddress+2].Dom.style.opacity = "1";
      itemList[targetAddress+2].Dom.childNodes[0].style.backgroundImage = "url('images/matchcase.png')";

      itemList[targetAddress+3].Dom.style.opacity = "1";
      itemList[targetAddress+3].Dom.childNodes[0].style.backgroundImage = "url('images/drawing.png')";

      itemList[targetAddress+4].Dom.style.opacity = "1";
      itemList[targetAddress+4].Dom.childNodes[0].style.backgroundImage = "url('images/hopeless.png')";

      itemList[targetAddress+4].Dom.style.opacity = "1";
      itemList[targetAddress+4].Dom.childNodes[0].style.backgroundImage = "url('images/help.png')";
      }
      else{
      MenuShowR("regular", 0);
      }
      
      circle.style.webkitTransform = "rotateZ(135deg)";
      Fan.style.opacity="1";
      searchCircle.style.display="none";
      BlackOut.style.display="block";
      newFound = false;

    }
    else if(MenuOpenStatus == true){
      circle.style.webkitTransform = "rotateZ(0deg)";
      Fan.style.opacity="0";
      searchCircle.style.display="block";
      BlackOut.style.display="none";
      MenuHiddenR();
    }
    MenuOpenStatus = !MenuOpenStatus;
    }



//----------------------------------------------------------//
    // var menuRotateVal = 0;
    var MRControlerDom = document.getElementById("menuRotateController");
    //OpenMode="regular";
    
    function MenuShowR(OpenMode,Address){
    	//if(RefreshTime == 0){

        if(OpenMode === "regular"){
    	$("#menuRotateController").animate({top:'+=30px'},500);
        $(".itemCircleInner").animate({width:'100%',height:"100%"},500);
        }

        if(OpenMode === "new"){

        //----Reset_Rotation------//
        menuRotateController.style.top = "0px";
        Fan.style.webkitTransform = "rotateZ(0deg)";

        //itemNum *
        $("#menuRotateController").animate({top: (Address * -40) + 'px'},500); //40deg=(Math.PI/4.5);
        $(".itemCircleInner").animate({width:'100%',height:"100%"},500);
        
        }

    	setTimeout("RotateRefresh()",16);
        //}
    }

    function MenuHiddenR(){
    	//if(RefreshTime == 0){
    	$("#menuRotateController").animate({top:'-=30px'},500);
        $(".itemCircleInner").animate({width:'0px',height:"0px"},500);
    	setTimeout("RotateRefresh()",16);
        //}
    }

    var menuRotateVal = 0;
    var RefreshTime = 0;
    function RotateRefresh(){
    	RefreshTime ++;
    	if(RefreshTime < 34){
        menuRotateVal = parseFloat(MRControlerDom.style.top);
        //console.log(menuRotateVal);

        Fan.style.webkitTransform = "rotateZ(" + menuRotateVal + "deg)";
         $(".itemCircleInner").css('-webkit-transform','rotate('+ (-1*menuRotateVal) +'deg)');

    	setTimeout("RotateRefresh()",16);
        }
        else if(RefreshTime >= 34){
        RefreshTime = 0;
        }
    }
//-----------------------------------------------------------//

    var itemList = new Array();

    $(document).ready(function(){
        
        initialItems();
    	arrangeItems();
        //MenuOpen();
      
    });

    //-----------Item_Class------------//


    function roundItem(InputDom){
    var Dom,NewItem,shineStatus,displayStatus,shineCount;
    this.Dom = InputDom;//From_HTML
    this.NewItem = true;
    this.shineStatus = false;
    this.displayStatus = false;
    this.shineCount = 0;


    roundItem.prototype.NewShine = function(which){

    //-------------------------------------------------------//
    if(this.NewItem == false){
        this.shineStatus = false;
    }

    if(this.shineStatus == false){
        this.Dom.style.boxShadow = "0px 0px 0px rgba(255,255,255,0.5)";
    }
    else if(this.shineStatus == true){
        this.Dom.style.boxShadow = "0px 0px 48px rgba(255,255,255,0.8)";  
    }

    this.shineCount++;
    this.shineStatus = !this.shineStatus;
    if(this.NewItem == true && this.shineCount<8){
    setTimeout(function(){itemList[which].NewShine(which);},310);
    }
    //-------------------------------------------------------//

    }

    }


    //---------------------------------//

    function initialItems(){
    // for(i=1; i<=12; i++){
    for(i=1; i<=9; i++){
    	var currentItem = document.getElementById('item'+i);
    	
        itemList.push(new roundItem(currentItem));
        //itemList.push(currentItem);
        
        var content = i;
        if(content == 9){
            content = "Contact";
        }
        // currentItem.style.webkitTransition='box-shadow 0.3s ease-in-out';
    	currentItem.innerHTML = "<div class='itemCircleInner' id='i"+i+"'>"+ content +"</div>"
    	}

        
    }

    var rotationAngle = 0;

    function arrangeItems(){
        
    // for(i=0; i<12; i++){
    //     rotationAngle = (i+1)*(Math.PI/6);

    for(i=0; i<9; i++){
        rotationAngle = (i+1)*(Math.PI/(-4.5));
        // if(i==2 || i==5 || i==8 || i==11){
        var ReturnSin = Math.sin(rotationAngle).toFixed(5);
        var ReturnCos = Math.cos(rotationAngle).toFixed(5);
     //    }
     //    else{
    	// var ReturnSin = Math.sin(rotationAngle);
    	// var ReturnCos = Math.cos(rotationAngle);
     //    }


    	//--------------------------------------//
        currentItem = itemList[i].Dom;

        if(i == 0){
           currentItem.style.top = "45.1%";
        }
        else{
        currentItem.style.top = (45.1-(12)*i)+"%";
        //console.log(currentItem.className);
        
        }

        currentItem.style.webkitTransform = "translateX("+ ReturnSin * MenuRadius * (-0.38) +"px) translateY("+ ReturnCos * MenuRadius * (-0.38) +"px)";
        //console.log(itemList[i]);
        $("#i"+(i+1)).bind("click",function(){

        var cancelNewTarget = parseInt(event.target.id.replace(/[^0-9]/ig,""));
        itemList[cancelNewTarget-1].NewItem = false;
        itemList[cancelNewTarget-1].Dom.style.boxShadow = "0px 0px 0px rgba(255,255,255,0)";
        //console.log(itemList[cancelNewTarget].Dom);

        });
        }
    }

    // function cancelNewHandler(object){
    //     console.log(object);
    // }

    //--------------------p5_Touch------------------------//


    function setup(){
    foundShine(fakeCircle);
    }

    //function draw(){}

    function touchStarted(){
    if(MenuOpenStatus == true){
      TurningSpeed=0.0;
    }

    //-------Intro--------//
    StartX = touchX;
    ptouchX = touchX;
    P5touchmove = false;
    }

    function touchEnded(){

      var inertiaIntial = touchX-ptouchX;
      inertia(inertiaIntial);
      InnerRotate = true;

    //-------Intro--------//
    CurrentX = touchX;
    P5touchmove = false;
    }


    function inertia(initialSpeed){
        if(MenuOpenStatus == true){
        //console.log(initialSpeed);
        setTimeout(function(){fraction(initialSpeed);},16); 

        }
    }


    var TurningSpeed = 0;
    function fraction(speed){
    //console.log(speed);
        if(speed != 0){
        if( Math.abs(speed) >= 1){
        TurningSpeed = (speed - 0.05*speed).toFixed(5);;
        }
        else if( speed <= 1 && speed >= -1){
        TurningSpeed = 0;
        }
        //console.log(TurningSpeed);
        menuRotateVal += 0.1*(TurningSpeed);
        Fan.style.webkitTransform = "rotateZ(" + menuRotateVal + "deg)";
        //$(".itemCircleInner").css('-webkit-transform','rotate('+ (-1*menuRotateVal) +'deg)');
        // var items = document.getElementsByClassName("itemCircleInner");
        // for(i=0; i < items.length; i++){
        // items[i].style.webkitTransform = 'rotate('+ (-1*menuRotateVal) +'deg)';
        // }
        setTimeout(function(){fraction(TurningSpeed);},16); 
        
        }
    }


    var InnerRotate = false;
    function touchMoved(){
      InnerRotate = true;

      CurrentX = touchX;
      P5touchmove = true;
    }

    function draw(){

    if(MenuOpenStatus == true && InnerRotate == true){

        menuRotateVal += 0.1*(touchX-ptouchX).toFixed(4);
        MRControlerDom.style.top = menuRotateVal + "px";
        
        Fan.style.webkitTransform = "rotateZ(" + menuRotateVal + "deg)";
        $(".itemCircleInner").css('-webkit-transform','rotate('+ (-1*menuRotateVal) +'deg)');
        // var items = document.getElementsByClassName("itemCircleInner");
        // for(i=0; i < items.length; i++){
        // items[i].style.webkitTransform = 'rotate('+ (-1*menuRotateVal) +'deg)';
        // }

      }
    }


    $(document).bind(
   'touchmove',
   function(e) {
     e.preventDefault();
   }
);

$("#circle").bind("touchstart",MenuOpen);
$("#Result").bind("click",app.startRangingBeacons);



//---------------Found_Shine----------------//

var newFound = true;//false;
var shineStatus = true;

function foundShine(thisElement){

if(newFound == false){
    shineStatus = false;
}

if(shineStatus == false){
    thisElement.style.boxShadow = "0px 0px 0px rgba(255,255,200,1)";
}
else if(shineStatus == true){
    thisElement.style.boxShadow = "0px -10px 48px rgba(255,255,200,1)";  
}

shineStatus = !shineStatus;

if(newFound == true){
setTimeout(function(){foundShine(thisElement);},850)
}

}







