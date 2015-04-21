

        // Wait for device API libraries to load //
        document.addEventListener("deviceready", onDeviceReady, false);
        //window.addEventListener("load", onDeviceReady, false);

        // device APIs are available//
        //----------Add_Music_Control_Function---------------//
       
        //-----Control_Array---------//
        var MusicControlList;

        function onDeviceReady() {
            //alert("Start");
            //--------Set_Audio_Source-----------//
             playAudio("telephone", "source/telephone.mp3");
             playAudio("girl", "source/girl.mp3");
             playAudio("universe", "source/universe.mp3");
            //alert("Audio_Setting_Done");
            //--------Set_Possible_Device-------//
            MusicControlList = new Array();
            addControl();
            //-----Start_DistListener---------//
            //alert(MusicControlList.length);
            setInterval("All_Track_DistListener()",20);
            //alert("Start_Listen_To_Dist");
        }

        

        function addControl(){
        //alert("Start_Adding");

    //-----------Syntax_Adding_Control-----------//
    //MusicControlList.push(new musicControl(Name, MediaName, Major, Minor));
    //____MusicControlList_[0]sugar___[1]open___[2]"next_here"_____//
        MusicControlList.push(new musicControl("telephone", telephone_Media, 4771, 56973));
        //alert("finished1");
        MusicControlList.push(new musicControl("girl", girl_Media, 2451, 1224));
        //alert("finished");
        MusicControlList.push(new musicControl("universe", universe_Media, 37352, 57235));
        //alert("finished");
    

    //-----------Done_Build_Array----------------//
        //alert(MusicControlList);
        }

function All_Track_DistListener(){
    for(i=0; i < MusicControlList.length; i++){
       var CurrentControl = MusicControlList[i];
       CurrentControl.DistListener(); 
    }
}




//---------musicControl_Class_START!!!-----------//

function musicControl(Name, MediaName, Major, Minor){
    //alert("Constructor_Called");
     
     var deviceName, major, minor, currentVolume, DeviceIn, DistRead;

     //---------For_Setting_Default---------//
     this.deviceName = Name;
     this.mediaName = MediaName;
     this.major = Major;
     this.minor = Minor;
     this.currentVolume = 0.0;
     this.DeviceIn = false;
     //alert(this.mediaName);

//------------object_Inner_function---------------------//

musicControl.prototype.DistListener = function(){

//------------Have_That_Device_Come_Once?---------------//
//-----Have-----------//

if(this.DeviceIn == true){

        if(closestBeacon == 4771){
        CloseBackground.style.backgroundImage="url('../www/images/telephone.jpg')";
        pieceName.innerHTML="Model 500";
        //console.log("sugar");
        }
        else if(closestBeacon == 2451){
        CloseBackground.style.backgroundImage="url('../www/images/shower.jpg')";
        pieceName.innerHTML="Has Anyone Seen Bertha?";
        }

        else if(closestBeacon == 37352){
        CloseBackground.style.backgroundImage="url('../www/images/universe.jpg')";
        pieceName.innerHTML="Planetary";
        }


    if (this.major != closestBeacon){
        this.currentVolume=0;
    }
    else{

    //---Just_Lost----//
    

    //console.log(this.DistRead);
    if(this.DistRead == -100){
        this.currentVolume += 0.2*(0-this.currentVolume);
    }
    //-----SO_Far-----//
    else if(this.DistRead >= 600){
        this.currentVolume += 0.2*(0-this.currentVolume);
    }
    //--Getting_Close-//
    else if(this.DistRead < 500 && this.DistRead >=100 ){
      this.currentVolume += 0.2*((1-((this.DistRead-100)/400)-this.currentVolume));
    }
    //----Found_It----//
    else if(this.DistRead < 100 && this.DistRead > 0){
      this.currentVolume += 0.2*(1-this.currentVolume);
    }

}
}
//-----Don't_Have----//
else if(this.DeviceIn == false){
    this.currentVolume += 0.2*(0-this.currentVolume);
    }
//------------SET_VOL---------------//
//console.log(this.mediaName);
//alert("hahah");
this.mediaName.setVolume(this.currentVolume);
//console.log(this.currentVolume);
}
}
//-----------!!!musicControl_Class_END!!!------------//


        // Audio player//
        var telephone_Media = null;
        var girl_Media = null;
        var universe_Media = null;

        // Play audio//
        function playAudio(MediaName,src) {
             //alert("PlayCalled");
            // Create Media object from src
            if(MediaName == "telephone"){
                //alert("sugar");
            //sugar_Media="ha";
            telephone_Media = new Media(src, onSuccess, onError);
            telephone_Media.setVolume(0.0);
            telephone_Media.play({numberOfLoops:"infinite"});
            }
            else if(MediaName == "girl"){
                //alert("open");
            //open_Media="ha";
            girl_Media = new Media(src, onSuccess, onError);
            girl_Media.setVolume(0.0);
            girl_Media.play({numberOfLoops:"infinite"});
            }
            else if(MediaName == "universe"){
                //alert("rise");
            //open_Media="ha";
            universe_Media = new Media(src, onSuccess, onError);
            universe_Media.setVolume(0.0);
            universe_Media.play({numberOfLoops:"infinite"});
            }

            //else if(Media == "???"){}
        }

        // onSuccess Callback//
        function onSuccess(){console.log("playAudio():Audio Success");}

        // onError Callback//
        function onError(error) {alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');}

