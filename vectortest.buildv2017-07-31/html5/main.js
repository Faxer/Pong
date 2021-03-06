
//${CONFIG_BEGIN}
CFG_BINARY_FILES="*.bin|*.dat";
CFG_BRL_GAMETARGET_IMPLEMENTED="1";
CFG_BRL_THREAD_IMPLEMENTED="1";
CFG_CD="";
CFG_CONFIG="debug";
CFG_HOST="macos";
CFG_HTML5_WEBAUDIO_ENABLED="1";
CFG_IMAGE_FILES="*.png|*.jpg";
CFG_LANG="js";
CFG_MODPATH="";
CFG_MOJO_AUTO_SUSPEND_ENABLED="1";
CFG_MOJO_DRIVER_IMPLEMENTED="1";
CFG_MUSIC_FILES="*.wav|*.ogg|*.mp3|*.m4a";
CFG_OPENGL_GLES20_ENABLED="0";
CFG_SAFEMODE="0";
CFG_SOUND_FILES="*.wav|*.ogg|*.mp3|*.m4a";
CFG_TARGET="html5";
CFG_TEXT_FILES="*.txt|*.xml|*.json";
//${CONFIG_END}

//${METADATA_BEGIN}
var META_DATA="[mojo_font.png];type=image/png;width=864;height=13;\n";
//${METADATA_END}

//${TRANSCODE_BEGIN}

// Javascript Cerberus runtime.
//
// Placed into the public domain 24/02/2011.
// No warranty implied; use at your own risk.

//***** JavaScript Runtime *****

var D2R=0.017453292519943295;
var R2D=57.29577951308232;

var err_info="";
var err_stack=[];

var dbg_index=0;

function push_err(){
	err_stack.push( err_info );
}

function pop_err(){
	err_info=err_stack.pop();
}

function stackTrace(){
	if( !err_info.length ) return "";
	var str=err_info+"\n";
	for( var i=err_stack.length-1;i>0;--i ){
		str+=err_stack[i]+"\n";
	}
	return str;
}

function print( str ){
	var cons=document.getElementById( "GameConsole" );
	if( cons ){
		cons.value+=str+"\n";
		cons.scrollTop=cons.scrollHeight-cons.clientHeight;
	}else if( window.console!=undefined ){
		window.console.log( str );
	}
	return 0;
}

function alertError( err ){
	if( typeof(err)=="string" && err=="" ) return;
	alert( "Cerberus Runtime Error : "+err.toString()+"\n\n"+stackTrace() );
}

function error( err ){
	throw err;
}

function debugLog( str ){
	if( window.console!=undefined ) window.console.log( str );
}

function debugStop(){
	debugger;	//	error( "STOP" );
}

function dbg_object( obj ){
	if( obj ) return obj;
	error( "Null object access" );
}

function dbg_charCodeAt( str,index ){
	if( index<0 || index>=str.length ) error( "Character index out of range" );
	return str.charCodeAt( index );
}

function dbg_array( arr,index ){
	if( index<0 || index>=arr.length ) error( "Array index out of range" );
	dbg_index=index;
	return arr;
}

function new_bool_array( len ){
	var arr=Array( len );
	for( var i=0;i<len;++i ) arr[i]=false;
	return arr;
}

function new_number_array( len ){
	var arr=Array( len );
	for( var i=0;i<len;++i ) arr[i]=0;
	return arr;
}

function new_string_array( len ){
	var arr=Array( len );
	for( var i=0;i<len;++i ) arr[i]='';
	return arr;
}

function new_array_array( len ){
	var arr=Array( len );
	for( var i=0;i<len;++i ) arr[i]=[];
	return arr;
}

function new_object_array( len ){
	var arr=Array( len );
	for( var i=0;i<len;++i ) arr[i]=null;
	return arr;
}

function resize_bool_array( arr,len ){
	var i=arr.length;
	arr=arr.slice(0,len);
	if( len<=i ) return arr;
	arr.length=len;
	while( i<len ) arr[i++]=false;
	return arr;
}

function resize_number_array( arr,len ){
	var i=arr.length;
	arr=arr.slice(0,len);
	if( len<=i ) return arr;
	arr.length=len;
	while( i<len ) arr[i++]=0;
	return arr;
}

function resize_string_array( arr,len ){
	var i=arr.length;
	arr=arr.slice(0,len);
	if( len<=i ) return arr;
	arr.length=len;
	while( i<len ) arr[i++]="";
	return arr;
}

function resize_array_array( arr,len ){
	var i=arr.length;
	arr=arr.slice(0,len);
	if( len<=i ) return arr;
	arr.length=len;
	while( i<len ) arr[i++]=[];
	return arr;
}

function resize_object_array( arr,len ){
	var i=arr.length;
	arr=arr.slice(0,len);
	if( len<=i ) return arr;
	arr.length=len;
	while( i<len ) arr[i++]=null;
	return arr;
}

function string_compare( lhs,rhs ){
	var n=Math.min( lhs.length,rhs.length ),i,t;
	for( i=0;i<n;++i ){
		t=lhs.charCodeAt(i)-rhs.charCodeAt(i);
		if( t ) return t;
	}
	return lhs.length-rhs.length;
}

function string_replace( str,find,rep ){	//no unregex replace all?!?
	var i=0;
	for(;;){
		i=str.indexOf( find,i );
		if( i==-1 ) return str;
		str=str.substring( 0,i )+rep+str.substring( i+find.length );
		i+=rep.length;
	}
}

function string_trim( str ){
	var i=0,i2=str.length;
	while( i<i2 && str.charCodeAt(i)<=32 ) i+=1;
	while( i2>i && str.charCodeAt(i2-1)<=32 ) i2-=1;
	return str.slice( i,i2 );
}

function string_startswith( str,substr ){
	return substr.length<=str.length && str.slice(0,substr.length)==substr;
}

function string_endswith( str,substr ){
	return substr.length<=str.length && str.slice(str.length-substr.length,str.length)==substr;
}

function string_tochars( str ){
	var arr=new Array( str.length );
	for( var i=0;i<str.length;++i ) arr[i]=str.charCodeAt(i);
	return arr;
}

function string_fromchars( chars ){
	var str="",i;
	for( i=0;i<chars.length;++i ){
		str+=String.fromCharCode( chars[i] );
	}
	return str;
}

function object_downcast( obj,clas ){
	if( obj instanceof clas ) return obj;
	return null;
}

function object_implements( obj,iface ){
	if( obj && obj.implments && obj.implments[iface] ) return obj;
	return null;
}

function extend_class( clas ){
	var tmp=function(){};
	tmp.prototype=clas.prototype;
	return new tmp;
}

function ThrowableObject(){
}

ThrowableObject.prototype.toString=function(){ 
	return "Uncaught Cerberus Exception"; 
}


function BBGameEvent(){}
BBGameEvent.KeyDown=1;
BBGameEvent.KeyUp=2;
BBGameEvent.KeyChar=3;
BBGameEvent.MouseDown=4;
BBGameEvent.MouseUp=5;
BBGameEvent.MouseMove=6;
BBGameEvent.TouchDown=7;
BBGameEvent.TouchUp=8;
BBGameEvent.TouchMove=9;
BBGameEvent.MotionAccel=10;

function BBGameDelegate(){}
BBGameDelegate.prototype.StartGame=function(){}
BBGameDelegate.prototype.SuspendGame=function(){}
BBGameDelegate.prototype.ResumeGame=function(){}
BBGameDelegate.prototype.UpdateGame=function(){}
BBGameDelegate.prototype.RenderGame=function(){}
BBGameDelegate.prototype.KeyEvent=function( ev,data ){}
BBGameDelegate.prototype.MouseEvent=function( ev,data,x,y ){}
BBGameDelegate.prototype.TouchEvent=function( ev,data,x,y ){}
BBGameDelegate.prototype.MotionEvent=function( ev,data,x,y,z ){}
BBGameDelegate.prototype.DiscardGraphics=function(){}

function BBDisplayMode( width,height ){
	this.width=width;
	this.height=height;
}

function BBGame(){
	BBGame._game=this;
	this._delegate=null;
	this._keyboardEnabled=false;
	this._updateRate=0;
	this._started=false;
	this._suspended=false;
	this._debugExs=(CFG_CONFIG=="debug");
	this._startms=Date.now();
}

BBGame.Game=function(){
	return BBGame._game;
}

BBGame.prototype.SetDelegate=function( delegate ){
	this._delegate=delegate;
}

BBGame.prototype.Delegate=function(){
	return this._delegate;
}

BBGame.prototype.SetUpdateRate=function( updateRate ){
	this._updateRate=updateRate;
}

BBGame.prototype.SetKeyboardEnabled=function( keyboardEnabled ){
	this._keyboardEnabled=keyboardEnabled;
}

BBGame.prototype.Started=function(){
	return this._started;
}

BBGame.prototype.Suspended=function(){
	return this._suspended;
}

BBGame.prototype.Millisecs=function(){
	return Date.now()-this._startms;
}

BBGame.prototype.GetDate=function( date ){
	var n=date.length;
	if( n>0 ){
		var t=new Date();
		date[0]=t.getFullYear();
		if( n>1 ){
			date[1]=t.getMonth()+1;
			if( n>2 ){
				date[2]=t.getDate();
				if( n>3 ){
					date[3]=t.getHours();
					if( n>4 ){
						date[4]=t.getMinutes();
						if( n>5 ){
							date[5]=t.getSeconds();
							if( n>6 ){
								date[6]=t.getMilliseconds();
							}
						}
					}
				}
			}
		}
	}
}

BBGame.prototype.SaveState=function( state ){
	localStorage.setItem( "cerberusstate@"+document.URL,state );	//key can't start with dot in Chrome!
	return 1;
}

BBGame.prototype.LoadState=function(){
	var state=localStorage.getItem( "cerberusstate@"+document.URL );
	if( state ) return state;
	return "";
}

BBGame.prototype.LoadString=function( path ){

	var xhr=new XMLHttpRequest();
	xhr.open( "GET",this.PathToUrl( path ),false );
	
//	if( navigator.userAgent.indexOf( "Chrome/48." )>0 ){
//		xhr.setRequestHeader( "If-Modified-Since","Sat, 1 Jan 2000 00:00:00 GMT" );
//	}
	
	xhr.send( null );
	
	if( xhr.status==200 || xhr.status==0 ) return xhr.responseText;
	
	return "";
}

BBGame.prototype.CountJoysticks=function( update ){
	return 0;
}

BBGame.prototype.PollJoystick=function( port,joyx,joyy,joyz,buttons ){
	return false;
}

BBGame.prototype.OpenUrl=function( url ){
	window.location=url;
}

BBGame.prototype.SetMouseVisible=function( visible ){
	if( visible ){
		this._canvas.style.cursor='default';	
	}else{
		this._canvas.style.cursor="url('data:image/cur;base64,AAACAAEAICAAAAAAAACoEAAAFgAAACgAAAAgAAAAQAAAAAEAIAAAAAAAgBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA55ZXBgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOeWVxAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADnllcGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9////////////////////+////////f/////////8%3D'), auto";
	}
}

BBGame.prototype.GetDeviceWidth=function(){
	return 0;
}

BBGame.prototype.GetDeviceHeight=function(){
	return 0;
}

BBGame.prototype.SetDeviceWindow=function( width,height,flags ){
}

BBGame.prototype.GetDisplayModes=function(){
	return new Array();
}

BBGame.prototype.GetDesktopMode=function(){
	return null;
}

BBGame.prototype.SetSwapInterval=function( interval ){
}

BBGame.prototype.PathToFilePath=function( path ){
	return "";
}

//***** js Game *****

BBGame.prototype.PathToUrl=function( path ){
	return path;
}

BBGame.prototype.LoadData=function( path ){

	var xhr=new XMLHttpRequest();
	xhr.open( "GET",this.PathToUrl( path ),false );

	if( xhr.overrideMimeType ) xhr.overrideMimeType( "text/plain; charset=x-user-defined" );
	
//	if( navigator.userAgent.indexOf( "Chrome/48." )>0 ){
//		xhr.setRequestHeader( "If-Modified-Since","Sat, 1 Jan 2000 00:00:00 GMT" );
//	}

	xhr.send( null );
	if( xhr.status!=200 && xhr.status!=0 ) return null;

	var r=xhr.responseText;
	var buf=new ArrayBuffer( r.length );
	var bytes=new Int8Array( buf );
	for( var i=0;i<r.length;++i ){
		bytes[i]=r.charCodeAt( i );
	}
	return buf;
}

//***** INTERNAL ******

BBGame.prototype.Die=function( ex ){

	this._delegate=new BBGameDelegate();
	
	if( !ex.toString() ){
		return;
	}
	
	if( this._debugExs ){
		print( "Cerberus Runtime Error : "+ex.toString() );
		print( stackTrace() );
	}
	
	throw ex;
}

BBGame.prototype.StartGame=function(){

	if( this._started ) return;
	this._started=true;
	
	if( this._debugExs ){
		try{
			this._delegate.StartGame();
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.StartGame();
	}
}

BBGame.prototype.SuspendGame=function(){

	if( !this._started || this._suspended ) return;
	this._suspended=true;
	
	if( this._debugExs ){
		try{
			this._delegate.SuspendGame();
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.SuspendGame();
	}
}

BBGame.prototype.ResumeGame=function(){

	if( !this._started || !this._suspended ) return;
	this._suspended=false;
	
	if( this._debugExs ){
		try{
			this._delegate.ResumeGame();
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.ResumeGame();
	}
}

BBGame.prototype.UpdateGame=function(){

	if( !this._started || this._suspended ) return;

	if( this._debugExs ){
		try{
			this._delegate.UpdateGame();
		}catch( ex ){
			this.Die( ex );
		}	
	}else{
		this._delegate.UpdateGame();
	}
}

BBGame.prototype.RenderGame=function(){

	if( !this._started ) return;
	
	if( this._debugExs ){
		try{
			this._delegate.RenderGame();
		}catch( ex ){
			this.Die( ex );
		}	
	}else{
		this._delegate.RenderGame();
	}
}

BBGame.prototype.KeyEvent=function( ev,data ){

	if( !this._started ) return;
	
	if( this._debugExs ){
		try{
			this._delegate.KeyEvent( ev,data );
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.KeyEvent( ev,data );
	}
}

BBGame.prototype.MouseEvent=function( ev,data,x,y ){

	if( !this._started ) return;
	
	if( this._debugExs ){
		try{
			this._delegate.MouseEvent( ev,data,x,y );
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.MouseEvent( ev,data,x,y );
	}
}

BBGame.prototype.TouchEvent=function( ev,data,x,y ){

	if( !this._started ) return;
	
	if( this._debugExs ){
		try{
			this._delegate.TouchEvent( ev,data,x,y );
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.TouchEvent( ev,data,x,y );
	}
}

BBGame.prototype.MotionEvent=function( ev,data,x,y,z ){

	if( !this._started ) return;
	
	if( this._debugExs ){
		try{
			this._delegate.MotionEvent( ev,data,x,y,z );
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.MotionEvent( ev,data,x,y,z );
	}
}

BBGame.prototype.DiscardGraphics=function(){

	if( !this._started ) return;
	
	if( this._debugExs ){
		try{
			this._delegate.DiscardGraphics();
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.DiscardGraphics();
	}
}


var webglGraphicsSeq=1;

function BBHtml5Game( canvas ){

	BBGame.call( this );
	BBHtml5Game._game=this;
	this._canvas=canvas;
	this._loading=0;
	this._timerSeq=0;
	this._gl=null;
	
	if( CFG_OPENGL_GLES20_ENABLED=="1" ){

		//can't get these to fire!
		canvas.addEventListener( "webglcontextlost",function( event ){
			event.preventDefault();
//			print( "WebGL context lost!" );
		},false );

		canvas.addEventListener( "webglcontextrestored",function( event ){
			++webglGraphicsSeq;
//			print( "WebGL context restored!" );
		},false );

		var attrs={ alpha:false };
	
		this._gl=this._canvas.getContext( "webgl",attrs );

		if( !this._gl ) this._gl=this._canvas.getContext( "experimental-webgl",attrs );
		
		if( !this._gl ) this.Die( "Can't create WebGL" );
		
		gl=this._gl;
	}
	
	// --- start gamepad api by skn3 ---------
	this._gamepads = null;
	this._gamepadLookup = [-1,-1,-1,-1];//support 4 gamepads
	var that = this;
	window.addEventListener("gamepadconnected", function(e) {
		that.connectGamepad(e.gamepad);
	});
	
	window.addEventListener("gamepaddisconnected", function(e) {
		that.disconnectGamepad(e.gamepad);
	});
	
	//need to process already connected gamepads (before page was loaded)
	var gamepads = this.getGamepads();
	if (gamepads && gamepads.length > 0) {
		for(var index=0;index < gamepads.length;index++) {
			this.connectGamepad(gamepads[index]);
		}
	}
	// --- end gamepad api by skn3 ---------
}

BBHtml5Game.prototype=extend_class( BBGame );

BBHtml5Game.Html5Game=function(){
	return BBHtml5Game._game;
}

// --- start gamepad api by skn3 ---------
BBHtml5Game.prototype.getGamepads = function() {
	return navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
}

BBHtml5Game.prototype.connectGamepad = function(gamepad) {
	if (!gamepad) {
		return false;
	}
	
	//check if this is a standard gamepad
	if (gamepad.mapping == "standard") {
		//yup so lets add it to an array of valid gamepads
		//find empty controller slot
		var slot = -1;
		for(var index = 0;index < this._gamepadLookup.length;index++) {
			if (this._gamepadLookup[index] == -1) {
				slot = index;
				break;
			}
		}
		
		//can we add this?
		if (slot != -1) {
			this._gamepadLookup[slot] = gamepad.index;
			
			//console.log("gamepad at html5 index "+gamepad.index+" mapped to Cerberus gamepad unit "+slot);
		}
	} else {
		console.log('Cerberus has ignored gamepad at raw port #'+gamepad.index+' with unrecognised mapping scheme \''+gamepad.mapping+'\'.');
	}
}

BBHtml5Game.prototype.disconnectGamepad = function(gamepad) {
	if (!gamepad) {
		return false;
	}
	
	//scan all gamepads for matching index
	for(var index = 0;index < this._gamepadLookup.length;index++) {
		if (this._gamepadLookup[index] == gamepad.index) {
			//remove this gamepad
			this._gamepadLookup[index] = -1
			break;
		}
	}
}

BBHtml5Game.prototype.PollJoystick=function(port, joyx, joyy, joyz, buttons){
	//is this the first gamepad being polled
	if (port == 0) {
		//yes it is so we use the web api to get all gamepad info
		//we can then use this in subsequent calls to PollJoystick
		this._gamepads = this.getGamepads();
	}
	
	//dont bother processing if nothing to process
	if (!this._gamepads) {
	  return false;
	}
	
	//so use the Cerberus port to find the correct raw data
	var index = this._gamepadLookup[port];
	if (index == -1) {
		return false;
	}

	var gamepad = this._gamepads[index];
	if (!gamepad) {
		return false;
	}
	//so now process gamepad axis/buttons according to the standard mappings
	//https://w3c.github.io/gamepad/#remapping
	
	//left stick axis
	joyx[0] = gamepad.axes[0];
	joyy[0] = -gamepad.axes[1];
	
	//right stick axis
	joyx[1] = gamepad.axes[2];
	joyy[1] = -gamepad.axes[3];
	
	//left trigger
	joyz[0] = gamepad.buttons[6] ? gamepad.buttons[6].value : 0.0;
	
	//right trigger
	joyz[1] = gamepad.buttons[7] ? gamepad.buttons[7].value : 0.0;
	
	//clear button states
	for(var index = 0;index <32;index++) {
		buttons[index] = false;
	}
	
	//map html5 "standard" mapping to Cerberuss joy codes
	/*
	Const JOY_A=0
	Const JOY_B=1
	Const JOY_X=2
	Const JOY_Y=3
	Const JOY_LB=4
	Const JOY_RB=5
	Const JOY_BACK=6
	Const JOY_START=7
	Const JOY_LEFT=8
	Const JOY_UP=9
	Const JOY_RIGHT=10
	Const JOY_DOWN=11
	Const JOY_LSB=12
	Const JOY_RSB=13
	Const JOY_MENU=14
	*/
	buttons[0] = gamepad.buttons[0] && gamepad.buttons[0].pressed;
	buttons[1] = gamepad.buttons[1] && gamepad.buttons[1].pressed;
	buttons[2] = gamepad.buttons[2] && gamepad.buttons[2].pressed;
	buttons[3] = gamepad.buttons[3] && gamepad.buttons[3].pressed;
	buttons[4] = gamepad.buttons[4] && gamepad.buttons[4].pressed;
	buttons[5] = gamepad.buttons[5] && gamepad.buttons[5].pressed;
	buttons[6] = gamepad.buttons[8] && gamepad.buttons[8].pressed;
	buttons[7] = gamepad.buttons[9] && gamepad.buttons[9].pressed;
	buttons[8] = gamepad.buttons[14] && gamepad.buttons[14].pressed;
	buttons[9] = gamepad.buttons[12] && gamepad.buttons[12].pressed;
	buttons[10] = gamepad.buttons[15] && gamepad.buttons[15].pressed;
	buttons[11] = gamepad.buttons[13] && gamepad.buttons[13].pressed;
	buttons[12] = gamepad.buttons[10] && gamepad.buttons[10].pressed;
	buttons[13] = gamepad.buttons[11] && gamepad.buttons[11].pressed;
	buttons[14] = gamepad.buttons[16] && gamepad.buttons[16].pressed;
	
	//success
	return true
}
// --- end gamepad api by skn3 ---------


BBHtml5Game.prototype.ValidateUpdateTimer=function(){

	++this._timerSeq;
	if( this._suspended ) return;
	
	var game=this;
	var seq=game._timerSeq;
	
	var maxUpdates=4;
	var updateRate=this._updateRate;
	
	if( !updateRate ){

		var reqAnimFrame=(window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame);
	
		if( reqAnimFrame ){
			function animate(){
				if( seq!=game._timerSeq ) return;
	
				game.UpdateGame();
				if( seq!=game._timerSeq ) return;
	
				reqAnimFrame( animate );
				game.RenderGame();
			}
			reqAnimFrame( animate );
			return;
		}
		
		maxUpdates=1;
		updateRate=60;
	}
	
	var updatePeriod=1000.0/updateRate;
	var nextUpdate=0;

	function timeElapsed(){
		if( seq!=game._timerSeq ) return;
		
		if( !nextUpdate ) nextUpdate=Date.now();
		
		for( var i=0;i<maxUpdates;++i ){
		
			game.UpdateGame();
			if( seq!=game._timerSeq ) return;
			
			nextUpdate+=updatePeriod;
			var delay=nextUpdate-Date.now();
			
			if( delay>0 ){
				setTimeout( timeElapsed,delay );
				game.RenderGame();
				return;
			}
		}
		nextUpdate=0;
		setTimeout( timeElapsed,0 );
		game.RenderGame();
	}

	setTimeout( timeElapsed,0 );
}

//***** BBGame methods *****

BBHtml5Game.prototype.SetUpdateRate=function( updateRate ){

	BBGame.prototype.SetUpdateRate.call( this,updateRate );
	
	this.ValidateUpdateTimer();
}

BBHtml5Game.prototype.GetMetaData=function( path,key ){
	if( path.indexOf( "cerberus://data/" )!=0 ) return "";
	path=path.slice(16);

	var i=META_DATA.indexOf( "["+path+"]" );
	if( i==-1 ) return "";
	i+=path.length+2;

	var e=META_DATA.indexOf( "\n",i );
	if( e==-1 ) e=META_DATA.length;

	i=META_DATA.indexOf( ";"+key+"=",i )
	if( i==-1 || i>=e ) return "";
	i+=key.length+2;

	e=META_DATA.indexOf( ";",i );
	if( e==-1 ) return "";

	return META_DATA.slice( i,e );
}

BBHtml5Game.prototype.PathToUrl=function( path ){
	if( path.indexOf( "cerberus:" )!=0 ){
		return path;
	}else if( path.indexOf( "cerberus://data/" )==0 ) {
		return "data/"+path.slice( 16 );
	}
	return "";
}

BBHtml5Game.prototype.GetLoading=function(){
	return this._loading;
}

BBHtml5Game.prototype.IncLoading=function(){
	++this._loading;
	return this._loading;
}

BBHtml5Game.prototype.DecLoading=function(){
	--this._loading;
	return this._loading;
}

BBHtml5Game.prototype.GetCanvas=function(){
	return this._canvas;
}

BBHtml5Game.prototype.GetWebGL=function(){
	return this._gl;
}

BBHtml5Game.prototype.GetDeviceWidth=function(){
	return this._canvas.width;
}

BBHtml5Game.prototype.GetDeviceHeight=function(){
	return this._canvas.height;
}

//***** INTERNAL *****

BBHtml5Game.prototype.UpdateGame=function(){

	if( !this._loading ) BBGame.prototype.UpdateGame.call( this );
}

BBHtml5Game.prototype.SuspendGame=function(){

	BBGame.prototype.SuspendGame.call( this );
	
	BBGame.prototype.RenderGame.call( this );
	
	this.ValidateUpdateTimer();
}

BBHtml5Game.prototype.ResumeGame=function(){

	BBGame.prototype.ResumeGame.call( this );
	
	this.ValidateUpdateTimer();
}

BBHtml5Game.prototype.Run=function(){

	var game=this;
	var canvas=game._canvas;
	
	var xscale=1;
	var yscale=1;
	
	var touchIds=new Array( 32 );
	for( i=0;i<32;++i ) touchIds[i]=-1;
	
	function eatEvent( e ){
		if( e.stopPropagation ){
			e.stopPropagation();
			e.preventDefault();
		}else{
			e.cancelBubble=true;
			e.returnValue=false;
		}
	}
	
	function keyToChar( key ){
		switch( key ){
		case 8:case 9:case 13:case 27:case 32:return key;
		case 33:case 34:case 35:case 36:case 37:case 38:case 39:case 40:case 45:return key|0x10000;
		case 46:return 127;
		}
		return 0;
	}
	
	function mouseX( e ){
		var x=e.clientX+document.body.scrollLeft;
		var c=canvas;
		while( c ){
			x-=c.offsetLeft;
			c=c.offsetParent;
		}
		return x*xscale;
	}
	
	function mouseY( e ){
		var y=e.clientY+document.body.scrollTop;
		var c=canvas;
		while( c ){
			y-=c.offsetTop;
			c=c.offsetParent;
		}
		return y*yscale;
	}

	function touchX( touch ){
		var x=touch.pageX;
		var c=canvas;
		while( c ){
			x-=c.offsetLeft;
			c=c.offsetParent;
		}
		return x*xscale;
	}			
	
	function touchY( touch ){
		var y=touch.pageY;
		var c=canvas;
		while( c ){
			y-=c.offsetTop;
			c=c.offsetParent;
		}
		return y*yscale;
	}
	
	canvas.onkeydown=function( e ){
		game.KeyEvent( BBGameEvent.KeyDown,e.keyCode );
		var chr=keyToChar( e.keyCode );
		if( chr ) game.KeyEvent( BBGameEvent.KeyChar,chr );
		if( e.keyCode<48 || (e.keyCode>111 && e.keyCode<122) ) eatEvent( e );
	}

	canvas.onkeyup=function( e ){
		game.KeyEvent( BBGameEvent.KeyUp,e.keyCode );
	}

	canvas.onkeypress=function( e ){
		if( e.charCode ){
			game.KeyEvent( BBGameEvent.KeyChar,e.charCode );
		}else if( e.which ){
			game.KeyEvent( BBGameEvent.KeyChar,e.which );
		}
	}

	canvas.onmousedown=function( e ){
		switch( e.button ){
		case 0:game.MouseEvent( BBGameEvent.MouseDown,0,mouseX(e),mouseY(e) );break;
		case 1:game.MouseEvent( BBGameEvent.MouseDown,2,mouseX(e),mouseY(e) );break;
		case 2:game.MouseEvent( BBGameEvent.MouseDown,1,mouseX(e),mouseY(e) );break;
		}
		eatEvent( e );
	}
	
	canvas.onmouseup=function( e ){
		switch( e.button ){
		case 0:game.MouseEvent( BBGameEvent.MouseUp,0,mouseX(e),mouseY(e) );break;
		case 1:game.MouseEvent( BBGameEvent.MouseUp,2,mouseX(e),mouseY(e) );break;
		case 2:game.MouseEvent( BBGameEvent.MouseUp,1,mouseX(e),mouseY(e) );break;
		}
		eatEvent( e );
	}
	
	canvas.onmousemove=function( e ){
		game.MouseEvent( BBGameEvent.MouseMove,-1,mouseX(e),mouseY(e) );
		eatEvent( e );
	}

	canvas.onmouseout=function( e ){
		game.MouseEvent( BBGameEvent.MouseUp,0,mouseX(e),mouseY(e) );
		game.MouseEvent( BBGameEvent.MouseUp,1,mouseX(e),mouseY(e) );
		game.MouseEvent( BBGameEvent.MouseUp,2,mouseX(e),mouseY(e) );
		eatEvent( e );
	}
	
	canvas.onclick=function( e ){
		if( game.Suspended() ){
			canvas.focus();
		}
		eatEvent( e );
		return;
	}
	
	canvas.oncontextmenu=function( e ){
		return false;
	}
	
	canvas.ontouchstart=function( e ){
		if( game.Suspended() ){
			canvas.focus();
		}
		for( var i=0;i<e.changedTouches.length;++i ){
			var touch=e.changedTouches[i];
			for( var j=0;j<32;++j ){
				if( touchIds[j]!=-1 ) continue;
				touchIds[j]=touch.identifier;
				game.TouchEvent( BBGameEvent.TouchDown,j,touchX(touch),touchY(touch) );
				break;
			}
		}
		eatEvent( e );
	}
	
	canvas.ontouchmove=function( e ){
		for( var i=0;i<e.changedTouches.length;++i ){
			var touch=e.changedTouches[i];
			for( var j=0;j<32;++j ){
				if( touchIds[j]!=touch.identifier ) continue;
				game.TouchEvent( BBGameEvent.TouchMove,j,touchX(touch),touchY(touch) );
				break;
			}
		}
		eatEvent( e );
	}
	
	canvas.ontouchend=function( e ){
		for( var i=0;i<e.changedTouches.length;++i ){
			var touch=e.changedTouches[i];
			for( var j=0;j<32;++j ){
				if( touchIds[j]!=touch.identifier ) continue;
				touchIds[j]=-1;
				game.TouchEvent( BBGameEvent.TouchUp,j,touchX(touch),touchY(touch) );
				break;
			}
		}
		eatEvent( e );
	}
	
	window.ondevicemotion=function( e ){
		var tx=e.accelerationIncludingGravity.x/9.81;
		var ty=e.accelerationIncludingGravity.y/9.81;
		var tz=e.accelerationIncludingGravity.z/9.81;
		var x,y;
		switch( window.orientation ){
		case   0:x=+tx;y=-ty;break;
		case 180:x=-tx;y=+ty;break;
		case  90:x=-ty;y=-tx;break;
		case -90:x=+ty;y=+tx;break;
		}
		game.MotionEvent( BBGameEvent.MotionAccel,0,x,y,tz );
		eatEvent( e );
	}

	canvas.onfocus=function( e ){
		if( CFG_MOJO_AUTO_SUSPEND_ENABLED=="1" ){
			game.ResumeGame();
		}else{
			game.ValidateUpdateTimer();
		}
	}
	
	canvas.onblur=function( e ){
		for( var i=0;i<256;++i ) game.KeyEvent( BBGameEvent.KeyUp,i );
		if( CFG_MOJO_AUTO_SUSPEND_ENABLED=="1" ){
			game.SuspendGame();
		}
	}

	canvas.updateSize=function(){
		xscale=canvas.width/canvas.clientWidth;
		yscale=canvas.height/canvas.clientHeight;
		game.RenderGame();
	}
	
	canvas.updateSize();
	
	canvas.focus();
	
	game.StartGame();
	
	game.RenderGame();
}


function BBCerberusGame( canvas ){
	BBHtml5Game.call( this,canvas );
}

BBCerberusGame.prototype=extend_class( BBHtml5Game );

BBCerberusGame.Main=function( canvas ){

	var game=new BBCerberusGame( canvas );

	try{

		bbInit();
		bbMain();

	}catch( ex ){
	
		game.Die( ex );
		return;
	}

	if( !game.Delegate() ) return;
	
	game.Run();
}


// HTML5 mojo runtime.
//
// Copyright 2011 Mark Sibly, all rights reserved.
// No warranty implied; use at your own risk.

// ***** gxtkGraphics class *****

function gxtkGraphics(){
	this.game=BBHtml5Game.Html5Game();
	this.canvas=this.game.GetCanvas()
	this.width=this.canvas.width;
	this.height=this.canvas.height;
	this.gl=null;
	this.gc=this.canvas.getContext( '2d' );
	this.tmpCanvas=null;
	this.r=255;
	this.b=255;
	this.g=255;
	this.white=true;
	this.color="rgb(255,255,255)"
	this.alpha=1;
	this.blend="source-over";
	this.ix=1;this.iy=0;
	this.jx=0;this.jy=1;
	this.tx=0;this.ty=0;
	this.tformed=false;
	this.scissorX=0;
	this.scissorY=0;
	this.scissorWidth=0;
	this.scissorHeight=0;
	this.clipped=false;
}

gxtkGraphics.prototype.BeginRender=function(){
	this.width=this.canvas.width;
	this.height=this.canvas.height;
	if( !this.gc ) return 0;
	this.gc.save();
	if( this.game.GetLoading() ) return 2;
	return 1;
}

gxtkGraphics.prototype.EndRender=function(){
	if( this.gc ) this.gc.restore();
}

gxtkGraphics.prototype.Width=function(){
	return this.width;
}

gxtkGraphics.prototype.Height=function(){
	return this.height;
}

gxtkGraphics.prototype.LoadSurface=function( path ){
	var game=this.game;

	var ty=game.GetMetaData( path,"type" );
	if( ty.indexOf( "image/" )!=0 ) return null;
	
	game.IncLoading();

	var image=new Image();
	image.onload=function(){ game.DecLoading(); }
	image.onerror=function(){ game.DecLoading(); }
	image.meta_width=parseInt( game.GetMetaData( path,"width" ) );
	image.meta_height=parseInt( game.GetMetaData( path,"height" ) );
	image.src=game.PathToUrl( path );

	return new gxtkSurface( image,this );
}

gxtkGraphics.prototype.CreateSurface=function( width,height ){
	var canvas=document.createElement( 'canvas' );
	
	canvas.width=width;
	canvas.height=height;
	canvas.meta_width=width;
	canvas.meta_height=height;
	canvas.complete=true;
	
	var surface=new gxtkSurface( canvas,this );
	
	surface.gc=canvas.getContext( '2d' );
	
	return surface;
}

gxtkGraphics.prototype.SetAlpha=function( alpha ){
	this.alpha=alpha;
	this.gc.globalAlpha=alpha;
}

gxtkGraphics.prototype.SetColor=function( r,g,b ){
	this.r=r;
	this.g=g;
	this.b=b;
	this.white=(r==255 && g==255 && b==255);
	this.color="rgb("+(r|0)+","+(g|0)+","+(b|0)+")";
	this.gc.fillStyle=this.color;
	this.gc.strokeStyle=this.color;
}

gxtkGraphics.prototype.SetBlend=function( blend ){
	switch( blend ){
	case 1:
		this.blend="lighter";
		break;
	default:
		this.blend="source-over";
	}
	this.gc.globalCompositeOperation=this.blend;
}

gxtkGraphics.prototype.SetScissor=function( x,y,w,h ){
	this.scissorX=x;
	this.scissorY=y;
	this.scissorWidth=w;
	this.scissorHeight=h;
	this.clipped=(x!=0 || y!=0 || w!=this.canvas.width || h!=this.canvas.height);
	this.gc.restore();
	this.gc.save();
	if( this.clipped ){
		this.gc.beginPath();
		this.gc.rect( x,y,w,h );
		this.gc.clip();
		this.gc.closePath();
	}
	this.gc.fillStyle=this.color;
	this.gc.strokeStyle=this.color;	
	this.gc.globalAlpha=this.alpha;	
	this.gc.globalCompositeOperation=this.blend;
	if( this.tformed ) this.gc.setTransform( this.ix,this.iy,this.jx,this.jy,this.tx,this.ty );
}

gxtkGraphics.prototype.SetMatrix=function( ix,iy,jx,jy,tx,ty ){
	this.ix=ix;this.iy=iy;
	this.jx=jx;this.jy=jy;
	this.tx=tx;this.ty=ty;
	this.gc.setTransform( ix,iy,jx,jy,tx,ty );
	this.tformed=(ix!=1 || iy!=0 || jx!=0 || jy!=1 || tx!=0 || ty!=0);
}

gxtkGraphics.prototype.Cls=function( r,g,b ){
	if( this.tformed ) this.gc.setTransform( 1,0,0,1,0,0 );
	this.gc.fillStyle="rgb("+(r|0)+","+(g|0)+","+(b|0)+")";
	this.gc.globalAlpha=1;
	this.gc.globalCompositeOperation="source-over";
	this.gc.fillRect( 0,0,this.canvas.width,this.canvas.height );
	this.gc.fillStyle=this.color;
	this.gc.globalAlpha=this.alpha;
	this.gc.globalCompositeOperation=this.blend;
	if( this.tformed ) this.gc.setTransform( this.ix,this.iy,this.jx,this.jy,this.tx,this.ty );
}

gxtkGraphics.prototype.DrawPoint=function( x,y ){
	if( this.tformed ){
		var px=x;
		x=px * this.ix + y * this.jx + this.tx;
		y=px * this.iy + y * this.jy + this.ty;
		this.gc.setTransform( 1,0,0,1,0,0 );
		this.gc.fillRect( x,y,1,1 );
		this.gc.setTransform( this.ix,this.iy,this.jx,this.jy,this.tx,this.ty );
	}else{
		this.gc.fillRect( x,y,1,1 );
	}
}

gxtkGraphics.prototype.DrawRect=function( x,y,w,h ){
	if( w<0 ){ x+=w;w=-w; }
	if( h<0 ){ y+=h;h=-h; }
	if( w<=0 || h<=0 ) return;
	//
	this.gc.fillRect( x,y,w,h );
}

gxtkGraphics.prototype.DrawLine=function( x1,y1,x2,y2 ){
	if( this.tformed ){
		var x1_t=x1 * this.ix + y1 * this.jx + this.tx;
		var y1_t=x1 * this.iy + y1 * this.jy + this.ty;
		var x2_t=x2 * this.ix + y2 * this.jx + this.tx;
		var y2_t=x2 * this.iy + y2 * this.jy + this.ty;
		this.gc.setTransform( 1,0,0,1,0,0 );
	  	this.gc.beginPath();
	  	this.gc.moveTo( x1_t,y1_t );
	  	this.gc.lineTo( x2_t,y2_t );
	  	this.gc.stroke();
	  	this.gc.closePath();
		this.gc.setTransform( this.ix,this.iy,this.jx,this.jy,this.tx,this.ty );
	}else{
	  	this.gc.beginPath();
	  	this.gc.moveTo( x1,y1 );
	  	this.gc.lineTo( x2,y2 );
	  	this.gc.stroke();
	  	this.gc.closePath();
	}
}

gxtkGraphics.prototype.DrawOval=function( x,y,w,h ){
	if( w<0 ){ x+=w;w=-w; }
	if( h<0 ){ y+=h;h=-h; }
	if( w<=0 || h<=0 ) return;
	//
  	var w2=w/2,h2=h/2;
	this.gc.save();
	this.gc.translate( x+w2,y+h2 );
	this.gc.scale( w2,h2 );
  	this.gc.beginPath();
	this.gc.arc( 0,0,1,0,Math.PI*2,false );
	this.gc.fill();
  	this.gc.closePath();
	this.gc.restore();
}

gxtkGraphics.prototype.DrawPoly=function( verts ){
	if( verts.length<2 ) return;
	this.gc.beginPath();
	this.gc.moveTo( verts[0],verts[1] );
	for( var i=2;i<verts.length;i+=2 ){
		this.gc.lineTo( verts[i],verts[i+1] );
	}
	this.gc.fill();
	this.gc.closePath();
}

gxtkGraphics.prototype.DrawPoly2=function( verts,surface,srx,srcy ){
	if( verts.length<4 ) return;
	this.gc.beginPath();
	this.gc.moveTo( verts[0],verts[1] );
	for( var i=4;i<verts.length;i+=4 ){
		this.gc.lineTo( verts[i],verts[i+1] );
	}
	this.gc.fill();
	this.gc.closePath();
}

gxtkGraphics.prototype.DrawSurface=function( surface,x,y ){
	if( !surface.image.complete ) return;
	
	if( this.white ){
		this.gc.drawImage( surface.image,x,y );
		return;
	}
	
	this.DrawImageTinted( surface.image,x,y,0,0,surface.swidth,surface.sheight );
}

gxtkGraphics.prototype.DrawSurface2=function( surface,x,y,srcx,srcy,srcw,srch ){
	if( !surface.image.complete ) return;

	if( srcw<0 ){ srcx+=srcw;srcw=-srcw; }
	if( srch<0 ){ srcy+=srch;srch=-srch; }
	if( srcw<=0 || srch<=0 ) return;

	if( this.white ){
		this.gc.drawImage( surface.image,srcx,srcy,srcw,srch,x,y,srcw,srch );
		return;
	}
	
	this.DrawImageTinted( surface.image,x,y,srcx,srcy,srcw,srch  );
}

gxtkGraphics.prototype.DrawImageTinted=function( image,dx,dy,sx,sy,sw,sh ){

	if( !this.tmpCanvas ){
		this.tmpCanvas=document.createElement( "canvas" );
	}

	if( sw>this.tmpCanvas.width || sh>this.tmpCanvas.height ){
		this.tmpCanvas.width=Math.max( sw,this.tmpCanvas.width );
		this.tmpCanvas.height=Math.max( sh,this.tmpCanvas.height );
	}
	
	var tmpGC=this.tmpCanvas.getContext( "2d" );
	tmpGC.globalCompositeOperation="copy";
	
	tmpGC.drawImage( image,sx,sy,sw,sh,0,0,sw,sh );
	
	var imgData=tmpGC.getImageData( 0,0,sw,sh );
	
	var p=imgData.data,sz=sw*sh*4,i;
	
	for( i=0;i<sz;i+=4 ){
		p[i]=p[i]*this.r/255;
		p[i+1]=p[i+1]*this.g/255;
		p[i+2]=p[i+2]*this.b/255;
	}
	
	tmpGC.putImageData( imgData,0,0 );
	
	this.gc.drawImage( this.tmpCanvas,0,0,sw,sh,dx,dy,sw,sh );
}

gxtkGraphics.prototype.ReadPixels=function( pixels,x,y,width,height,offset,pitch ){

	var imgData=this.gc.getImageData( x,y,width,height );
	
	var p=imgData.data,i=0,j=offset,px,py;
	
	for( py=0;py<height;++py ){
		for( px=0;px<width;++px ){
			pixels[j++]=(p[i+3]<<24)|(p[i]<<16)|(p[i+1]<<8)|p[i+2];
			i+=4;
		}
		j+=pitch-width;
	}
}

gxtkGraphics.prototype.WritePixels2=function( surface,pixels,x,y,width,height,offset,pitch ){

	if( !surface.gc ){
		if( !surface.image.complete ) return;
		var canvas=document.createElement( "canvas" );
		canvas.width=surface.swidth;
		canvas.height=surface.sheight;
		surface.gc=canvas.getContext( "2d" );
		surface.gc.globalCompositeOperation="copy";
		surface.gc.drawImage( surface.image,0,0 );
		surface.image=canvas;
	}

	var imgData=surface.gc.createImageData( width,height );

	var p=imgData.data,i=0,j=offset,px,py,argb;
	
	for( py=0;py<height;++py ){
		for( px=0;px<width;++px ){
			argb=pixels[j++];
			p[i]=(argb>>16) & 0xff;
			p[i+1]=(argb>>8) & 0xff;
			p[i+2]=argb & 0xff;
			p[i+3]=(argb>>24) & 0xff;
			i+=4;
		}
		j+=pitch-width;
	}
	
	surface.gc.putImageData( imgData,x,y );
}

// ***** gxtkSurface class *****

function gxtkSurface( image,graphics ){
	this.image=image;
	this.graphics=graphics;
	this.swidth=image.meta_width;
	this.sheight=image.meta_height;
}

// ***** GXTK API *****

gxtkSurface.prototype.Discard=function(){
	if( this.image ){
		this.image=null;
	}
}

gxtkSurface.prototype.Width=function(){
	return this.swidth;
}

gxtkSurface.prototype.Height=function(){
	return this.sheight;
}

gxtkSurface.prototype.Loaded=function(){
	return this.image.complete;
}

gxtkSurface.prototype.OnUnsafeLoadComplete=function(){
}

if( CFG_HTML5_WEBAUDIO_ENABLED=="1" && (window.AudioContext || window.webkitAudioContext) ){

//print( "Using WebAudio!" );

// ***** WebAudio *****

var wa=null;

// ***** WebAudio gxtkSample *****

var gxtkSample=function(){
	this.waBuffer=null;
	this.state=0;
}

gxtkSample.prototype.Load=function( path ){
	if( this.state ) return false;

	var req=new XMLHttpRequest();
	
	req.open( "get",BBGame.Game().PathToUrl( path ),true );
	req.responseType="arraybuffer";
	
	var abuf=this;
	
	req.onload=function(){
		wa.decodeAudioData( req.response,function( buffer ){
			//success!
			abuf.waBuffer=buffer;
			abuf.state=1;
		},function(){
			abuf.state=-1;
		} );
	}
	
	req.onerror=function(){
		abuf.state=-1;
	}
	
	req.send();
	
	this.state=2;
			
	return true;
}

gxtkSample.prototype.Discard=function(){
}

// ***** WebAudio gxtkChannel *****

var gxtkChannel=function(){
	this.buffer=null;
	this.flags=0;
	this.volume=1;
	this.pan=0;
	this.rate=1;
	this.waSource=null;
	this.waPan=wa.create
	this.waGain=wa.createGain();
	this.waGain.connect( wa.destination );
	this.waPanner=wa.createPanner();
	this.waPanner.rolloffFactor=0;
	this.waPanner.panningModel="equalpower";
	this.waPanner.connect( this.waGain );
	this.startTime=0;
	this.offset=0;
	this.state=0;
}

// ***** WebAudio gxtkAudio *****

var gxtkAudio=function(){

	if( !wa ){
		window.AudioContext=window.AudioContext || window.webkitAudioContext;
		wa=new AudioContext();
	}
	
	this.okay=true;
	this.music=null;
	this.musicState=0;
	this.musicVolume=1;
	this.channels=new Array();
	for( var i=0;i<32;++i ){
		this.channels[i]=new gxtkChannel();
	}
}

gxtkAudio.prototype.Suspend=function(){
	if( this.MusicState()==1 ) this.music.pause();
	for( var i=0;i<32;++i ){
		var chan=this.channels[i];
		if( chan.state!=1 ) continue;
		this.PauseChannel( i );
		chan.state=5;
	}
}

gxtkAudio.prototype.Resume=function(){
	if( this.MusicState()==1 ) this.music.play();
	for( var i=0;i<32;++i ){
		var chan=this.channels[i];
		if( chan.state!=5 ) continue;
		chan.state=2;
		this.ResumeChannel( i );
	}
}

gxtkAudio.prototype.LoadSample=function( path ){

	var sample=new gxtkSample();
	if( !sample.Load( BBHtml5Game.Html5Game().PathToUrl( path ) ) ) return null;
	
	return sample;
}

gxtkAudio.prototype.PlaySample=function( buffer,channel,flags ){

	if( buffer.state!=1 ) return;

	var chan=this.channels[channel];
	
	if( chan.state ){
		chan.waSource.onended=null
		try {
			chan.waSource.stop( 0 );
			chan.state = 0			
		} catch (err) {			
		}
	}
	
	chan.buffer=buffer;
	chan.flags=flags;

	chan.waSource=wa.createBufferSource();
	chan.waSource.buffer=buffer.waBuffer;
	chan.waSource.playbackRate.value=chan.rate;
	chan.waSource.loop=(flags&1)!=0;
	chan.waSource.connect( chan.waPanner );
	
	chan.waSource.onended=function( e ){
		chan.waSource=null;
		chan.state=0;
	}

	chan.offset=0;	
	chan.startTime=wa.currentTime;
	chan.waSource.start( 0 );

	chan.state=1;
}

gxtkAudio.prototype.StopChannel=function( channel ){

	var chan=this.channels[channel];
	if( !chan.state ) return;
	
	if( chan.state==1 ){
		chan.waSource.onended=null;
		try {
			chan.waSource.stop( 0 );
		} catch (err) {			
		}
		chan.waSource=null;
	}

	chan.state=0;
}

gxtkAudio.prototype.PauseChannel=function( channel ){

	var chan=this.channels[channel];
	if( chan.state!=1 ) return;
	
	chan.offset=(chan.offset+(wa.currentTime-chan.startTime)*chan.rate)%chan.buffer.waBuffer.duration;
	
	chan.waSource.onended=null;
	try {
		chan.waSource.stop( 0 );
	} catch (err) {			
	}
	chan.waSource=null;
	
	chan.state=2;
}

gxtkAudio.prototype.ResumeChannel=function( channel ){

	var chan=this.channels[channel];
	if( chan.state!=2 ) return;
	
	chan.waSource=wa.createBufferSource();
	chan.waSource.buffer=chan.buffer.waBuffer;
	chan.waSource.playbackRate.value=chan.rate;
	chan.waSource.loop=(chan.flags&1)!=0;
	chan.waSource.connect( chan.waPanner );
	
	chan.waSource.onended=function( e ){
		chan.waSource=null;
		chan.state=0;
	}
	
	chan.startTime=wa.currentTime;
	chan.waSource.start( 0,chan.offset );

	chan.state=1;
}

gxtkAudio.prototype.ChannelState=function( channel ){
	return this.channels[channel].state & 3;
}

gxtkAudio.prototype.SetVolume=function( channel,volume ){
	var chan=this.channels[channel];

	chan.volume=volume;
	
	chan.waGain.gain.value=volume;
}

gxtkAudio.prototype.SetPan=function( channel,pan ){
	var chan=this.channels[channel];

	chan.pan=pan;
	
	var sin=Math.sin( pan*3.14159265359/2 );
	var cos=Math.cos( pan*3.14159265359/2 );
	
	chan.waPanner.setPosition( sin,0,-cos );
}

gxtkAudio.prototype.SetRate=function( channel,rate ){

	var chan=this.channels[channel];

	if( chan.state==1 ){
		//update offset for pause/resume
		var time=wa.currentTime;
		chan.offset=(chan.offset+(time-chan.startTime)*chan.rate)%chan.buffer.waBuffer.duration;
		chan.startTime=time;
	}

	chan.rate=rate;
	
	if( chan.waSource ) chan.waSource.playbackRate.value=rate;
}

gxtkAudio.prototype.PlayMusic=function( path,flags ){
	if( this.musicState ) this.music.pause();
	this.music=new Audio( BBGame.Game().PathToUrl( path ) );
	this.music.loop=(flags&1)!=0;
	this.music.play();
	this.musicState=1;
}

gxtkAudio.prototype.StopMusic=function(){
	if( !this.musicState ) return;
	this.music.pause();
	this.music=null;
	this.musicState=0;
}

gxtkAudio.prototype.PauseMusic=function(){
	if( this.musicState!=1 ) return;
	this.music.pause();
	this.musicState=2;
}

gxtkAudio.prototype.ResumeMusic=function(){
	if( this.musicState!=2 ) return;
	this.music.play();
	this.musicState=1;
}

gxtkAudio.prototype.MusicState=function(){
	if( this.musicState==1 && this.music.ended && !this.music.loop ){
		this.music=null;
		this.musicState=0;
	}
	return this.musicState;
}

gxtkAudio.prototype.SetMusicVolume=function( volume ){
	this.musicVolume=volume;
	if( this.musicState ) this.music.volume=volume;
}

}else{

//print( "Using OldAudio!" );

// ***** gxtkChannel class *****

var gxtkChannel=function(){
	this.sample=null;
	this.audio=null;
	this.volume=1;
	this.pan=0;
	this.rate=1;
	this.flags=0;
	this.state=0;
}

// ***** gxtkAudio class *****

var gxtkAudio=function(){
	this.game=BBHtml5Game.Html5Game();
	this.okay=typeof(Audio)!="undefined";
	this.music=null;
	this.channels=new Array(33);
	for( var i=0;i<33;++i ){
		this.channels[i]=new gxtkChannel();
		if( !this.okay ) this.channels[i].state=-1;
	}
}

gxtkAudio.prototype.Suspend=function(){
	var i;
	for( i=0;i<33;++i ){
		var chan=this.channels[i];
		if( chan.state==1 ){
			if( chan.audio.ended && !chan.audio.loop ){
				chan.state=0;
			}else{
				chan.audio.pause();
				chan.state=3;
			}
		}
	}
}

gxtkAudio.prototype.Resume=function(){
	var i;
	for( i=0;i<33;++i ){
		var chan=this.channels[i];
		if( chan.state==3 ){
			chan.audio.play();
			chan.state=1;
		}
	}
}

gxtkAudio.prototype.LoadSample=function( path ){
	if( !this.okay ) return null;

	var audio=new Audio( this.game.PathToUrl( path ) );
	if( !audio ) return null;
	
	return new gxtkSample( audio );
}

gxtkAudio.prototype.PlaySample=function( sample,channel,flags ){
	if( !this.okay ) return;
	
	var chan=this.channels[channel];

	if( chan.state>0 ){
		chan.audio.pause();
		chan.state=0;
	}
	
	for( var i=0;i<33;++i ){
		var chan2=this.channels[i];
		if( chan2.state==1 && chan2.audio.ended && !chan2.audio.loop ) chan.state=0;
		if( chan2.state==0 && chan2.sample ){
			chan2.sample.FreeAudio( chan2.audio );
			chan2.sample=null;
			chan2.audio=null;
		}
	}

	var audio=sample.AllocAudio();
	if( !audio ) return;

	audio.loop=(flags&1)!=0;
	audio.volume=chan.volume;
	audio.play();

	chan.sample=sample;
	chan.audio=audio;
	chan.flags=flags;
	chan.state=1;
}

gxtkAudio.prototype.StopChannel=function( channel ){
	var chan=this.channels[channel];
	
	if( chan.state>0 ){
		chan.audio.pause();
		chan.state=0;
	}
}

gxtkAudio.prototype.PauseChannel=function( channel ){
	var chan=this.channels[channel];
	
	if( chan.state==1 ){
		if( chan.audio.ended && !chan.audio.loop ){
			chan.state=0;
		}else{
			chan.audio.pause();
			chan.state=2;
		}
	}
}

gxtkAudio.prototype.ResumeChannel=function( channel ){
	var chan=this.channels[channel];
	
	if( chan.state==2 ){
		chan.audio.play();
		chan.state=1;
	}
}

gxtkAudio.prototype.ChannelState=function( channel ){
	var chan=this.channels[channel];
	if( chan.state==1 && chan.audio.ended && !chan.audio.loop ) chan.state=0;
	if( chan.state==3 ) return 1;
	return chan.state;
}

gxtkAudio.prototype.SetVolume=function( channel,volume ){
	var chan=this.channels[channel];
	if( chan.state>0 ) chan.audio.volume=volume;
	chan.volume=volume;
}

gxtkAudio.prototype.SetPan=function( channel,pan ){
	var chan=this.channels[channel];
	chan.pan=pan;
}

gxtkAudio.prototype.SetRate=function( channel,rate ){
	var chan=this.channels[channel];
	chan.rate=rate;
}

gxtkAudio.prototype.PlayMusic=function( path,flags ){
	this.StopMusic();
	
	this.music=this.LoadSample( path );
	if( !this.music ) return;
	
	this.PlaySample( this.music,32,flags );
}

gxtkAudio.prototype.StopMusic=function(){
	this.StopChannel( 32 );

	if( this.music ){
		this.music.Discard();
		this.music=null;
	}
}

gxtkAudio.prototype.PauseMusic=function(){
	this.PauseChannel( 32 );
}

gxtkAudio.prototype.ResumeMusic=function(){
	this.ResumeChannel( 32 );
}

gxtkAudio.prototype.MusicState=function(){
	return this.ChannelState( 32 );
}

gxtkAudio.prototype.SetMusicVolume=function( volume ){
	this.SetVolume( 32,volume );
}

// ***** gxtkSample class *****

//function gxtkSample( audio ){
var gxtkSample=function( audio ){
	this.audio=audio;
	this.free=new Array();
	this.insts=new Array();
}

gxtkSample.prototype.FreeAudio=function( audio ){
	this.free.push( audio );
}

gxtkSample.prototype.AllocAudio=function(){
	var audio;
	while( this.free.length ){
		audio=this.free.pop();
		try{
			audio.currentTime=0;
			return audio;
		}catch( ex ){
//			print( "AUDIO ERROR1!" );
		}
	}
	
	//Max out?
	if( this.insts.length==8 ) return null;
	
	audio=new Audio( this.audio.src );
	
	//yucky loop handler for firefox!
	//
	audio.addEventListener( 'ended',function(){
		if( this.loop ){
			try{
				this.currentTime=0;
				this.play();
			}catch( ex ){
//				print( "AUDIO ERROR2!" );
			}
		}
	},false );

	this.insts.push( audio );
	return audio;
}

gxtkSample.prototype.Discard=function(){
}

}


function BBThread(){
	this.result=null;
	this.running=false;
}

BBThread.prototype.Start=function(){
	this.result=null;
	this.running=true;
	this.Run__UNSAFE__();
}

BBThread.prototype.IsRunning=function(){
	return this.running;
}

BBThread.prototype.Result=function(){
	return this.result;
}

BBThread.prototype.Run__UNSAFE__=function(){
	this.running=false;
}


function BBAsyncImageLoaderThread(){
	this._running=false;
}

BBAsyncImageLoaderThread.prototype.Start=function(){

	var thread=this;

	thread._surface=null;
	thread._result=false;
	thread._running=true;

	var image=new Image();

	image.onload=function( e ){
		image.meta_width=image.width;
		image.meta_height=image.height;
		thread._surface=new gxtkSurface( image,thread._device )
		thread._result=true;
		thread._running=false;
	}
	
	image.onerror=function( e ){
		thread._running=false;
	}
	
	image.src=BBGame.Game().PathToUrl( thread._path );
}

BBAsyncImageLoaderThread.prototype.IsRunning=function(){
	return this._running;
}



function BBAsyncSoundLoaderThread(){
	this._running=false;
}
  
if( CFG_HTML5_WEBAUDIO_ENABLED=="1" && (window.AudioContext || window.webkitAudioContext) ){

BBAsyncSoundLoaderThread.prototype.Start=function(){

	this._sample=null;
	if( !this._device.okay ) return;
	
	var thread=this;
	
	thread._sample=null;
	thread._result=false;
	thread._running=true;

	var req=new XMLHttpRequest();
	req.open( "get",BBGame.Game().PathToUrl( this._path ),true );
	req.responseType="arraybuffer";
	
	req.onload=function(){
		//load success!
		wa.decodeAudioData( req.response,function( buffer ){
			//decode success!
			thread._sample=new gxtkSample();
			thread._sample.waBuffer=buffer;
			thread._sample.state=1;
			thread._result=true;
			thread._running=false;
		},function(){	
			//decode fail!
			thread._running=false;
		} );
	}
	
	req.onerror=function(){
		//load fail!
		thread._running=false;
	}
	
	req.send();
}
	
}else{
 
BBAsyncSoundLoaderThread.prototype.Start=function(){

	this._sample=null;
	if( !this._device.okay ) return;
	
	var audio=new Audio();
	if( !audio ) return;
	
	var thread=this;
	
	thread._sample=null;
	thread._result=false;
	thread._running=true;

	audio.src=BBGame.Game().PathToUrl( this._path );
	audio.preload='auto';	
	
	var success=function( e ){
		thread._sample=new gxtkSample( audio );
		thread._result=true;
		thread._running=false;
		audio.removeEventListener( 'canplaythrough',success,false );
		audio.removeEventListener( 'error',error,false );
	}
	
	var error=function( e ){
		thread._running=false;
		audio.removeEventListener( 'canplaythrough',success,false );
		audio.removeEventListener( 'error',error,false );
	}
	
	audio.addEventListener( 'canplaythrough',success,false );
	audio.addEventListener( 'error',error,false );
	
	//voodoo fix for Chrome!
	var timer=setInterval( function(){ if( !thread._running ) clearInterval( timer ); },200 );
	
	audio.load();
}

}
  
BBAsyncSoundLoaderThread.prototype.IsRunning=function(){
	return this._running;
}

function c_App(){
	Object.call(this);
}
c_App.m_new=function(){
	push_err();
	err_info="/Applications/Cerberus/modules/mojo/app.cxs<152>";
	if((bb_app__app)!=null){
		err_info="/Applications/Cerberus/modules/mojo/app.cxs<152>";
		error("App has already been created");
	}
	err_info="/Applications/Cerberus/modules/mojo/app.cxs<153>";
	bb_app__app=this;
	err_info="/Applications/Cerberus/modules/mojo/app.cxs<154>";
	bb_app__delegate=c_GameDelegate.m_new.call(new c_GameDelegate);
	err_info="/Applications/Cerberus/modules/mojo/app.cxs<155>";
	bb_app__game.SetDelegate(bb_app__delegate);
	pop_err();
	return this;
}
c_App.prototype.p_OnResize=function(){
	push_err();
	pop_err();
	return 0;
}
c_App.prototype.p_OnCreate=function(){
	push_err();
	pop_err();
	return 0;
}
c_App.prototype.p_OnSuspend=function(){
	push_err();
	pop_err();
	return 0;
}
c_App.prototype.p_OnResume=function(){
	push_err();
	pop_err();
	return 0;
}
c_App.prototype.p_OnUpdate=function(){
	push_err();
	pop_err();
	return 0;
}
c_App.prototype.p_OnLoading=function(){
	push_err();
	pop_err();
	return 0;
}
c_App.prototype.p_OnRender=function(){
	push_err();
	pop_err();
	return 0;
}
c_App.prototype.p_OnClose=function(){
	push_err();
	err_info="/Applications/Cerberus/modules/mojo/app.cxs<177>";
	bb_app_EndApp();
	pop_err();
	return 0;
}
c_App.prototype.p_OnBack=function(){
	push_err();
	err_info="/Applications/Cerberus/modules/mojo/app.cxs<181>";
	this.p_OnClose();
	pop_err();
	return 0;
}
function c_collisions(){
	c_App.call(this);
}
c_collisions.prototype=extend_class(c_App);
c_collisions.m_new=function(){
	push_err();
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<13>";
	c_App.m_new.call(this);
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<13>";
	pop_err();
	return this;
}
c_collisions.prototype.p_OnUpdate=function(){
	push_err();
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<20>";
	if((bb_input_KeyDown(37))!=0){
		err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<21>";
		dbg_object(bb_vectortest_square1).m_posx=dbg_object(bb_vectortest_square1).m_posx-1.0;
	}
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<24>";
	if((bb_input_KeyDown(39))!=0){
		err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<25>";
		dbg_object(bb_vectortest_square1).m_posx=dbg_object(bb_vectortest_square1).m_posx+1.0;
	}
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<28>";
	if((bb_input_KeyDown(38))!=0){
		err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<29>";
		dbg_object(bb_vectortest_square1).m_posy=dbg_object(bb_vectortest_square1).m_posy-1.0;
	}
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<33>";
	if((bb_input_KeyDown(40))!=0){
		err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<34>";
		dbg_object(bb_vectortest_square1).m_posy=dbg_object(bb_vectortest_square1).m_posy+1.0;
	}
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<38>";
	if(bb_vectortest_square1.p_collide(bb_vectortest_square2)){
		err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<39>";
		dbg_object(bb_vectortest_square1).m_collided=true;
	}
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<43>";
	dbg_object(bb_vectortest_square1).m_angle=-20;
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<45>";
	dbg_object(bb_vectortest_square2).m_angle=dbg_object(bb_vectortest_square2).m_angle+1;
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<48>";
	pop_err();
	return 0;
}
c_collisions.prototype.p_OnRender=function(){
	push_err();
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<52>";
	bb_graphics_Cls(0.0,0.0,0.0);
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<54>";
	bb_vectortest_square1.p_render();
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<55>";
	bb_vectortest_square2.p_render();
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<57>";
	if(dbg_object(bb_vectortest_square1).m_collided){
		err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<58>";
		print("COLLI "+String(bb_app_Millisecs()));
	}
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<63>";
	pop_err();
	return 0;
}
c_collisions.prototype.p_OnCreate=function(){
	push_err();
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<67>";
	bb_app_SetUpdateRate(30);
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<71>";
	bb_vectortest_square1=c_poly.m_new.call(new c_poly,150,250,3);
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<74>";
	bb_vectortest_square1.p_add_point(c_point.m_new.call(new c_point,-25,-25));
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<80>";
	bb_vectortest_square1.p_add_point(c_point.m_new.call(new c_point,25,25));
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<84>";
	bb_vectortest_square1.p_add_point(c_point.m_new.call(new c_point,-25,25));
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<87>";
	bb_vectortest_square2=c_poly.m_new.call(new c_poly,250,250,5);
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<92>";
	bb_vectortest_square2.p_add_point(c_point.m_new.call(new c_point,-25,-25));
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<95>";
	bb_vectortest_square2.p_add_point(c_point.m_new.call(new c_point,0,15));
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<98>";
	bb_vectortest_square2.p_add_point(c_point.m_new.call(new c_point,25,-25));
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<101>";
	bb_vectortest_square2.p_add_point(c_point.m_new.call(new c_point,25,25));
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<103>";
	bb_vectortest_square2.p_add_point(c_point.m_new.call(new c_point,-25,25));
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<109>";
	pop_err();
	return 0;
}
var bb_app__app=null;
function c_GameDelegate(){
	BBGameDelegate.call(this);
	this.m__graphics=null;
	this.m__audio=null;
	this.m__input=null;
}
c_GameDelegate.prototype=extend_class(BBGameDelegate);
c_GameDelegate.m_new=function(){
	push_err();
	err_info="/Applications/Cerberus/modules/mojo/app.cxs<65>";
	pop_err();
	return this;
}
c_GameDelegate.prototype.StartGame=function(){
	push_err();
	err_info="/Applications/Cerberus/modules/mojo/app.cxs<75>";
	this.m__graphics=(new gxtkGraphics);
	err_info="/Applications/Cerberus/modules/mojo/app.cxs<76>";
	bb_graphics_SetGraphicsDevice(this.m__graphics);
	err_info="/Applications/Cerberus/modules/mojo/app.cxs<77>";
	bb_graphics_SetFont(null,32);
	err_info="/Applications/Cerberus/modules/mojo/app.cxs<79>";
	this.m__audio=(new gxtkAudio);
	err_info="/Applications/Cerberus/modules/mojo/app.cxs<80>";
	bb_audio_SetAudioDevice(this.m__audio);
	err_info="/Applications/Cerberus/modules/mojo/app.cxs<82>";
	this.m__input=c_InputDevice.m_new.call(new c_InputDevice);
	err_info="/Applications/Cerberus/modules/mojo/app.cxs<83>";
	bb_input_SetInputDevice(this.m__input);
	err_info="/Applications/Cerberus/modules/mojo/app.cxs<85>";
	bb_app_ValidateDeviceWindow(false);
	err_info="/Applications/Cerberus/modules/mojo/app.cxs<87>";
	bb_app_EnumDisplayModes();
	err_info="/Applications/Cerberus/modules/mojo/app.cxs<89>";
	bb_app__app.p_OnCreate();
	pop_err();
}
c_GameDelegate.prototype.SuspendGame=function(){
	push_err();
	err_info="/Applications/Cerberus/modules/mojo/app.cxs<93>";
	bb_app__app.p_OnSuspend();
	err_info="/Applications/Cerberus/modules/mojo/app.cxs<94>";
	this.m__audio.Suspend();
	pop_err();
}
c_GameDelegate.prototype.ResumeGame=function(){
	push_err();
	err_info="/Applications/Cerberus/modules/mojo/app.cxs<98>";
	this.m__audio.Resume();
	err_info="/Applications/Cerberus/modules/mojo/app.cxs<99>";
	bb_app__app.p_OnResume();
	pop_err();
}
c_GameDelegate.prototype.UpdateGame=function(){
	push_err();
	err_info="/Applications/Cerberus/modules/mojo/app.cxs<103>";
	bb_app_ValidateDeviceWindow(true);
	err_info="/Applications/Cerberus/modules/mojo/app.cxs<104>";
	this.m__input.p_BeginUpdate();
	err_info="/Applications/Cerberus/modules/mojo/app.cxs<105>";
	bb_app__app.p_OnUpdate();
	err_info="/Applications/Cerberus/modules/mojo/app.cxs<106>";
	this.m__input.p_EndUpdate();
	pop_err();
}
c_GameDelegate.prototype.RenderGame=function(){
	push_err();
	err_info="/Applications/Cerberus/modules/mojo/app.cxs<110>";
	bb_app_ValidateDeviceWindow(true);
	err_info="/Applications/Cerberus/modules/mojo/app.cxs<111>";
	var t_mode=this.m__graphics.BeginRender();
	err_info="/Applications/Cerberus/modules/mojo/app.cxs<112>";
	if((t_mode)!=0){
		err_info="/Applications/Cerberus/modules/mojo/app.cxs<112>";
		bb_graphics_BeginRender();
	}
	err_info="/Applications/Cerberus/modules/mojo/app.cxs<113>";
	if(t_mode==2){
		err_info="/Applications/Cerberus/modules/mojo/app.cxs<113>";
		bb_app__app.p_OnLoading();
	}else{
		err_info="/Applications/Cerberus/modules/mojo/app.cxs<113>";
		bb_app__app.p_OnRender();
	}
	err_info="/Applications/Cerberus/modules/mojo/app.cxs<114>";
	if((t_mode)!=0){
		err_info="/Applications/Cerberus/modules/mojo/app.cxs<114>";
		bb_graphics_EndRender();
	}
	err_info="/Applications/Cerberus/modules/mojo/app.cxs<115>";
	this.m__graphics.EndRender();
	pop_err();
}
c_GameDelegate.prototype.KeyEvent=function(t_event,t_data){
	push_err();
	err_info="/Applications/Cerberus/modules/mojo/app.cxs<119>";
	this.m__input.p_KeyEvent(t_event,t_data);
	err_info="/Applications/Cerberus/modules/mojo/app.cxs<120>";
	if(t_event!=1){
		pop_err();
		return;
	}
	err_info="/Applications/Cerberus/modules/mojo/app.cxs<121>";
	var t_1=t_data;
	err_info="/Applications/Cerberus/modules/mojo/app.cxs<122>";
	if(t_1==432){
		err_info="/Applications/Cerberus/modules/mojo/app.cxs<123>";
		bb_app__app.p_OnClose();
	}else{
		err_info="/Applications/Cerberus/modules/mojo/app.cxs<124>";
		if(t_1==416){
			err_info="/Applications/Cerberus/modules/mojo/app.cxs<125>";
			bb_app__app.p_OnBack();
		}
	}
	pop_err();
}
c_GameDelegate.prototype.MouseEvent=function(t_event,t_data,t_x,t_y){
	push_err();
	err_info="/Applications/Cerberus/modules/mojo/app.cxs<130>";
	this.m__input.p_MouseEvent(t_event,t_data,t_x,t_y);
	pop_err();
}
c_GameDelegate.prototype.TouchEvent=function(t_event,t_data,t_x,t_y){
	push_err();
	err_info="/Applications/Cerberus/modules/mojo/app.cxs<134>";
	this.m__input.p_TouchEvent(t_event,t_data,t_x,t_y);
	pop_err();
}
c_GameDelegate.prototype.MotionEvent=function(t_event,t_data,t_x,t_y,t_z){
	push_err();
	err_info="/Applications/Cerberus/modules/mojo/app.cxs<138>";
	this.m__input.p_MotionEvent(t_event,t_data,t_x,t_y,t_z);
	pop_err();
}
c_GameDelegate.prototype.DiscardGraphics=function(){
	push_err();
	err_info="/Applications/Cerberus/modules/mojo/app.cxs<142>";
	this.m__graphics.DiscardGraphics();
	pop_err();
}
var bb_app__delegate=null;
var bb_app__game=null;
function bbMain(){
	push_err();
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<115>";
	c_collisions.m_new.call(new c_collisions);
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<116>";
	pop_err();
	return 0;
}
var bb_graphics_device=null;
function bb_graphics_SetGraphicsDevice(t_dev){
	push_err();
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<63>";
	bb_graphics_device=t_dev;
	pop_err();
	return 0;
}
function c_Image(){
	Object.call(this);
	this.m_surface=null;
	this.m_width=0;
	this.m_height=0;
	this.m_frames=[];
	this.m_flags=0;
	this.m_tx=.0;
	this.m_ty=.0;
	this.m_source=null;
}
c_Image.m_DefaultFlags=0;
c_Image.m_new=function(){
	push_err();
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<70>";
	pop_err();
	return this;
}
c_Image.prototype.p_SetHandle=function(t_tx,t_ty){
	push_err();
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<114>";
	dbg_object(this).m_tx=t_tx;
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<115>";
	dbg_object(this).m_ty=t_ty;
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<116>";
	dbg_object(this).m_flags=dbg_object(this).m_flags&-2;
	pop_err();
	return 0;
}
c_Image.prototype.p_ApplyFlags=function(t_iflags){
	push_err();
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<198>";
	this.m_flags=t_iflags;
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<200>";
	if((this.m_flags&2)!=0){
		err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<201>";
		err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<201>";
		var t_=this.m_frames;
		err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<201>";
		var t_2=0;
		err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<201>";
		while(t_2<t_.length){
			err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<201>";
			var t_f=dbg_array(t_,t_2)[dbg_index];
			err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<201>";
			t_2=t_2+1;
			err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<202>";
			dbg_object(t_f).m_x+=1;
		}
		err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<204>";
		this.m_width-=2;
	}
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<207>";
	if((this.m_flags&4)!=0){
		err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<208>";
		err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<208>";
		var t_3=this.m_frames;
		err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<208>";
		var t_4=0;
		err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<208>";
		while(t_4<t_3.length){
			err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<208>";
			var t_f2=dbg_array(t_3,t_4)[dbg_index];
			err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<208>";
			t_4=t_4+1;
			err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<209>";
			dbg_object(t_f2).m_y+=1;
		}
		err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<211>";
		this.m_height-=2;
	}
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<214>";
	if((this.m_flags&1)!=0){
		err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<215>";
		this.p_SetHandle((this.m_width)/2.0,(this.m_height)/2.0);
	}
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<218>";
	if(this.m_frames.length==1 && dbg_object(dbg_array(this.m_frames,0)[dbg_index]).m_x==0 && dbg_object(dbg_array(this.m_frames,0)[dbg_index]).m_y==0 && this.m_width==this.m_surface.Width() && this.m_height==this.m_surface.Height()){
		err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<219>";
		this.m_flags|=65536;
	}
	pop_err();
	return 0;
}
c_Image.prototype.p_Init=function(t_surf,t_nframes,t_iflags){
	push_err();
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<144>";
	if((this.m_surface)!=null){
		err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<144>";
		error("Image already initialized");
	}
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<145>";
	this.m_surface=t_surf;
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<147>";
	this.m_width=((this.m_surface.Width()/t_nframes)|0);
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<148>";
	this.m_height=this.m_surface.Height();
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<150>";
	this.m_frames=new_object_array(t_nframes);
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<151>";
	for(var t_i=0;t_i<t_nframes;t_i=t_i+1){
		err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<152>";
		dbg_array(this.m_frames,t_i)[dbg_index]=c_Frame.m_new.call(new c_Frame,t_i*this.m_width,0);
	}
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<155>";
	this.p_ApplyFlags(t_iflags);
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<156>";
	pop_err();
	return this;
}
c_Image.prototype.p_Init2=function(t_surf,t_x,t_y,t_iwidth,t_iheight,t_nframes,t_iflags,t_src,t_srcx,t_srcy,t_srcw,t_srch){
	push_err();
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<160>";
	if((this.m_surface)!=null){
		err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<160>";
		error("Image already initialized");
	}
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<161>";
	this.m_surface=t_surf;
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<162>";
	this.m_source=t_src;
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<164>";
	this.m_width=t_iwidth;
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<165>";
	this.m_height=t_iheight;
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<167>";
	this.m_frames=new_object_array(t_nframes);
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<169>";
	var t_ix=t_x;
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<169>";
	var t_iy=t_y;
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<171>";
	for(var t_i=0;t_i<t_nframes;t_i=t_i+1){
		err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<172>";
		if(t_ix+this.m_width>t_srcw){
			err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<173>";
			t_ix=0;
			err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<174>";
			t_iy+=this.m_height;
		}
		err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<176>";
		if(t_ix+this.m_width>t_srcw || t_iy+this.m_height>t_srch){
			err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<177>";
			error("Image frame outside surface");
		}
		err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<179>";
		dbg_array(this.m_frames,t_i)[dbg_index]=c_Frame.m_new.call(new c_Frame,t_ix+t_srcx,t_iy+t_srcy);
		err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<180>";
		t_ix+=this.m_width;
	}
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<183>";
	this.p_ApplyFlags(t_iflags);
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<184>";
	pop_err();
	return this;
}
c_Image.prototype.p_Width=function(){
	push_err();
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<81>";
	pop_err();
	return this.m_width;
}
c_Image.prototype.p_Height=function(){
	push_err();
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<85>";
	pop_err();
	return this.m_height;
}
c_Image.prototype.p_Frames=function(){
	push_err();
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<93>";
	var t_=this.m_frames.length;
	pop_err();
	return t_;
}
function c_GraphicsContext(){
	Object.call(this);
	this.m_defaultFont=null;
	this.m_font=null;
	this.m_firstChar=0;
	this.m_matrixSp=0;
	this.m_ix=1.0;
	this.m_iy=.0;
	this.m_jx=.0;
	this.m_jy=1.0;
	this.m_tx=.0;
	this.m_ty=.0;
	this.m_tformed=0;
	this.m_matDirty=0;
	this.m_color_r=.0;
	this.m_color_g=.0;
	this.m_color_b=.0;
	this.m_alpha=.0;
	this.m_blend=0;
	this.m_scissor_x=.0;
	this.m_scissor_y=.0;
	this.m_scissor_width=.0;
	this.m_scissor_height=.0;
	this.m_matrixStack=new_number_array(192);
}
c_GraphicsContext.m_new=function(){
	push_err();
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<29>";
	pop_err();
	return this;
}
c_GraphicsContext.prototype.p_Validate=function(){
	push_err();
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<40>";
	if((this.m_matDirty)!=0){
		err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<41>";
		bb_graphics_renderDevice.SetMatrix(dbg_object(bb_graphics_context).m_ix,dbg_object(bb_graphics_context).m_iy,dbg_object(bb_graphics_context).m_jx,dbg_object(bb_graphics_context).m_jy,dbg_object(bb_graphics_context).m_tx,dbg_object(bb_graphics_context).m_ty);
		err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<42>";
		this.m_matDirty=0;
	}
	pop_err();
	return 0;
}
var bb_graphics_context=null;
function bb_data_FixDataPath(t_path){
	push_err();
	err_info="/Applications/Cerberus/modules/mojo/data.cxs<7>";
	var t_i=t_path.indexOf(":/",0);
	err_info="/Applications/Cerberus/modules/mojo/data.cxs<8>";
	if(t_i!=-1 && t_path.indexOf("/",0)==t_i+1){
		err_info="/Applications/Cerberus/modules/mojo/data.cxs<8>";
		pop_err();
		return t_path;
	}
	err_info="/Applications/Cerberus/modules/mojo/data.cxs<9>";
	if(string_startswith(t_path,"./") || string_startswith(t_path,"/")){
		err_info="/Applications/Cerberus/modules/mojo/data.cxs<9>";
		pop_err();
		return t_path;
	}
	err_info="/Applications/Cerberus/modules/mojo/data.cxs<10>";
	var t_="cerberus://data/"+t_path;
	pop_err();
	return t_;
}
function c_Frame(){
	Object.call(this);
	this.m_x=0;
	this.m_y=0;
}
c_Frame.m_new=function(t_x,t_y){
	push_err();
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<23>";
	dbg_object(this).m_x=t_x;
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<24>";
	dbg_object(this).m_y=t_y;
	pop_err();
	return this;
}
c_Frame.m_new2=function(){
	push_err();
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<18>";
	pop_err();
	return this;
}
function bb_graphics_LoadImage(t_path,t_frameCount,t_flags){
	push_err();
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<240>";
	var t_surf=bb_graphics_device.LoadSurface(bb_data_FixDataPath(t_path));
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<241>";
	if((t_surf)!=null){
		err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<241>";
		var t_=(c_Image.m_new.call(new c_Image)).p_Init(t_surf,t_frameCount,t_flags);
		pop_err();
		return t_;
	}
	pop_err();
	return null;
}
function bb_graphics_LoadImage2(t_path,t_frameWidth,t_frameHeight,t_frameCount,t_flags){
	push_err();
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<245>";
	var t_surf=bb_graphics_device.LoadSurface(bb_data_FixDataPath(t_path));
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<246>";
	if((t_surf)!=null){
		err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<246>";
		var t_=(c_Image.m_new.call(new c_Image)).p_Init2(t_surf,0,0,t_frameWidth,t_frameHeight,t_frameCount,t_flags,null,0,0,t_surf.Width(),t_surf.Height());
		pop_err();
		return t_;
	}
	pop_err();
	return null;
}
function bb_graphics_SetFont(t_font,t_firstChar){
	push_err();
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<549>";
	if(!((t_font)!=null)){
		err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<550>";
		if(!((dbg_object(bb_graphics_context).m_defaultFont)!=null)){
			err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<551>";
			dbg_object(bb_graphics_context).m_defaultFont=bb_graphics_LoadImage("mojo_font.png",96,2);
		}
		err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<553>";
		t_font=dbg_object(bb_graphics_context).m_defaultFont;
		err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<554>";
		t_firstChar=32;
	}
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<556>";
	dbg_object(bb_graphics_context).m_font=t_font;
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<557>";
	dbg_object(bb_graphics_context).m_firstChar=t_firstChar;
	pop_err();
	return 0;
}
var bb_audio_device=null;
function bb_audio_SetAudioDevice(t_dev){
	push_err();
	err_info="/Applications/Cerberus/modules/mojo/audio.cxs<22>";
	bb_audio_device=t_dev;
	pop_err();
	return 0;
}
function c_InputDevice(){
	Object.call(this);
	this.m__joyStates=new_object_array(4);
	this.m__keyDown=new_bool_array(512);
	this.m__keyHitPut=0;
	this.m__keyHitQueue=new_number_array(33);
	this.m__keyHit=new_number_array(512);
	this.m__charGet=0;
	this.m__charPut=0;
	this.m__charQueue=new_number_array(32);
	this.m__mouseX=.0;
	this.m__mouseY=.0;
	this.m__touchX=new_number_array(32);
	this.m__touchY=new_number_array(32);
	this.m__accelX=.0;
	this.m__accelY=.0;
	this.m__accelZ=.0;
}
c_InputDevice.m_new=function(){
	push_err();
	err_info="/Applications/Cerberus/modules/mojo/inputdevice.cxs<26>";
	for(var t_i=0;t_i<4;t_i=t_i+1){
		err_info="/Applications/Cerberus/modules/mojo/inputdevice.cxs<27>";
		dbg_array(this.m__joyStates,t_i)[dbg_index]=c_JoyState.m_new.call(new c_JoyState);
	}
	pop_err();
	return this;
}
c_InputDevice.prototype.p_PutKeyHit=function(t_key){
	push_err();
	err_info="/Applications/Cerberus/modules/mojo/inputdevice.cxs<241>";
	if(this.m__keyHitPut==this.m__keyHitQueue.length){
		pop_err();
		return;
	}
	err_info="/Applications/Cerberus/modules/mojo/inputdevice.cxs<242>";
	dbg_array(this.m__keyHit,t_key)[dbg_index]+=1;
	err_info="/Applications/Cerberus/modules/mojo/inputdevice.cxs<243>";
	dbg_array(this.m__keyHitQueue,this.m__keyHitPut)[dbg_index]=t_key;
	err_info="/Applications/Cerberus/modules/mojo/inputdevice.cxs<244>";
	this.m__keyHitPut+=1;
	pop_err();
}
c_InputDevice.prototype.p_BeginUpdate=function(){
	push_err();
	err_info="/Applications/Cerberus/modules/mojo/inputdevice.cxs<193>";
	for(var t_i=0;t_i<4;t_i=t_i+1){
		err_info="/Applications/Cerberus/modules/mojo/inputdevice.cxs<194>";
		var t_state=dbg_array(this.m__joyStates,t_i)[dbg_index];
		err_info="/Applications/Cerberus/modules/mojo/inputdevice.cxs<195>";
		if(!BBGame.Game().PollJoystick(t_i,dbg_object(t_state).m_joyx,dbg_object(t_state).m_joyy,dbg_object(t_state).m_joyz,dbg_object(t_state).m_buttons)){
			err_info="/Applications/Cerberus/modules/mojo/inputdevice.cxs<195>";
			break;
		}
		err_info="/Applications/Cerberus/modules/mojo/inputdevice.cxs<196>";
		for(var t_j=0;t_j<32;t_j=t_j+1){
			err_info="/Applications/Cerberus/modules/mojo/inputdevice.cxs<197>";
			var t_key=256+t_i*32+t_j;
			err_info="/Applications/Cerberus/modules/mojo/inputdevice.cxs<198>";
			if(dbg_array(dbg_object(t_state).m_buttons,t_j)[dbg_index]){
				err_info="/Applications/Cerberus/modules/mojo/inputdevice.cxs<199>";
				if(!dbg_array(this.m__keyDown,t_key)[dbg_index]){
					err_info="/Applications/Cerberus/modules/mojo/inputdevice.cxs<200>";
					dbg_array(this.m__keyDown,t_key)[dbg_index]=true;
					err_info="/Applications/Cerberus/modules/mojo/inputdevice.cxs<201>";
					this.p_PutKeyHit(t_key);
				}
			}else{
				err_info="/Applications/Cerberus/modules/mojo/inputdevice.cxs<204>";
				dbg_array(this.m__keyDown,t_key)[dbg_index]=false;
			}
		}
	}
	pop_err();
}
c_InputDevice.prototype.p_EndUpdate=function(){
	push_err();
	err_info="/Applications/Cerberus/modules/mojo/inputdevice.cxs<211>";
	for(var t_i=0;t_i<this.m__keyHitPut;t_i=t_i+1){
		err_info="/Applications/Cerberus/modules/mojo/inputdevice.cxs<212>";
		dbg_array(this.m__keyHit,dbg_array(this.m__keyHitQueue,t_i)[dbg_index])[dbg_index]=0;
	}
	err_info="/Applications/Cerberus/modules/mojo/inputdevice.cxs<214>";
	this.m__keyHitPut=0;
	err_info="/Applications/Cerberus/modules/mojo/inputdevice.cxs<215>";
	this.m__charGet=0;
	err_info="/Applications/Cerberus/modules/mojo/inputdevice.cxs<216>";
	this.m__charPut=0;
	pop_err();
}
c_InputDevice.prototype.p_KeyEvent=function(t_event,t_data){
	push_err();
	err_info="/Applications/Cerberus/modules/mojo/inputdevice.cxs<115>";
	var t_1=t_event;
	err_info="/Applications/Cerberus/modules/mojo/inputdevice.cxs<116>";
	if(t_1==1){
		err_info="/Applications/Cerberus/modules/mojo/inputdevice.cxs<117>";
		if(!dbg_array(this.m__keyDown,t_data)[dbg_index]){
			err_info="/Applications/Cerberus/modules/mojo/inputdevice.cxs<118>";
			dbg_array(this.m__keyDown,t_data)[dbg_index]=true;
			err_info="/Applications/Cerberus/modules/mojo/inputdevice.cxs<119>";
			this.p_PutKeyHit(t_data);
			err_info="/Applications/Cerberus/modules/mojo/inputdevice.cxs<120>";
			if(t_data==1){
				err_info="/Applications/Cerberus/modules/mojo/inputdevice.cxs<121>";
				dbg_array(this.m__keyDown,384)[dbg_index]=true;
				err_info="/Applications/Cerberus/modules/mojo/inputdevice.cxs<122>";
				this.p_PutKeyHit(384);
			}else{
				err_info="/Applications/Cerberus/modules/mojo/inputdevice.cxs<123>";
				if(t_data==384){
					err_info="/Applications/Cerberus/modules/mojo/inputdevice.cxs<124>";
					dbg_array(this.m__keyDown,1)[dbg_index]=true;
					err_info="/Applications/Cerberus/modules/mojo/inputdevice.cxs<125>";
					this.p_PutKeyHit(1);
				}
			}
		}
	}else{
		err_info="/Applications/Cerberus/modules/mojo/inputdevice.cxs<128>";
		if(t_1==2){
			err_info="/Applications/Cerberus/modules/mojo/inputdevice.cxs<129>";
			if(dbg_array(this.m__keyDown,t_data)[dbg_index]){
				err_info="/Applications/Cerberus/modules/mojo/inputdevice.cxs<130>";
				dbg_array(this.m__keyDown,t_data)[dbg_index]=false;
				err_info="/Applications/Cerberus/modules/mojo/inputdevice.cxs<131>";
				if(t_data==1){
					err_info="/Applications/Cerberus/modules/mojo/inputdevice.cxs<132>";
					dbg_array(this.m__keyDown,384)[dbg_index]=false;
				}else{
					err_info="/Applications/Cerberus/modules/mojo/inputdevice.cxs<133>";
					if(t_data==384){
						err_info="/Applications/Cerberus/modules/mojo/inputdevice.cxs<134>";
						dbg_array(this.m__keyDown,1)[dbg_index]=false;
					}
				}
			}
		}else{
			err_info="/Applications/Cerberus/modules/mojo/inputdevice.cxs<137>";
			if(t_1==3){
				err_info="/Applications/Cerberus/modules/mojo/inputdevice.cxs<138>";
				if(this.m__charPut<this.m__charQueue.length){
					err_info="/Applications/Cerberus/modules/mojo/inputdevice.cxs<139>";
					dbg_array(this.m__charQueue,this.m__charPut)[dbg_index]=t_data;
					err_info="/Applications/Cerberus/modules/mojo/inputdevice.cxs<140>";
					this.m__charPut+=1;
				}
			}
		}
	}
	pop_err();
}
c_InputDevice.prototype.p_MouseEvent=function(t_event,t_data,t_x,t_y){
	push_err();
	err_info="/Applications/Cerberus/modules/mojo/inputdevice.cxs<146>";
	var t_2=t_event;
	err_info="/Applications/Cerberus/modules/mojo/inputdevice.cxs<147>";
	if(t_2==4){
		err_info="/Applications/Cerberus/modules/mojo/inputdevice.cxs<148>";
		this.p_KeyEvent(1,1+t_data);
	}else{
		err_info="/Applications/Cerberus/modules/mojo/inputdevice.cxs<149>";
		if(t_2==5){
			err_info="/Applications/Cerberus/modules/mojo/inputdevice.cxs<150>";
			this.p_KeyEvent(2,1+t_data);
			pop_err();
			return;
		}else{
			err_info="/Applications/Cerberus/modules/mojo/inputdevice.cxs<152>";
			if(t_2==6){
			}else{
				pop_err();
				return;
			}
		}
	}
	err_info="/Applications/Cerberus/modules/mojo/inputdevice.cxs<156>";
	this.m__mouseX=t_x;
	err_info="/Applications/Cerberus/modules/mojo/inputdevice.cxs<157>";
	this.m__mouseY=t_y;
	err_info="/Applications/Cerberus/modules/mojo/inputdevice.cxs<158>";
	dbg_array(this.m__touchX,0)[dbg_index]=t_x;
	err_info="/Applications/Cerberus/modules/mojo/inputdevice.cxs<159>";
	dbg_array(this.m__touchY,0)[dbg_index]=t_y;
	pop_err();
}
c_InputDevice.prototype.p_TouchEvent=function(t_event,t_data,t_x,t_y){
	push_err();
	err_info="/Applications/Cerberus/modules/mojo/inputdevice.cxs<163>";
	var t_3=t_event;
	err_info="/Applications/Cerberus/modules/mojo/inputdevice.cxs<164>";
	if(t_3==7){
		err_info="/Applications/Cerberus/modules/mojo/inputdevice.cxs<165>";
		this.p_KeyEvent(1,384+t_data);
	}else{
		err_info="/Applications/Cerberus/modules/mojo/inputdevice.cxs<166>";
		if(t_3==8){
			err_info="/Applications/Cerberus/modules/mojo/inputdevice.cxs<167>";
			this.p_KeyEvent(2,384+t_data);
			pop_err();
			return;
		}else{
			err_info="/Applications/Cerberus/modules/mojo/inputdevice.cxs<169>";
			if(t_3==9){
			}else{
				pop_err();
				return;
			}
		}
	}
	err_info="/Applications/Cerberus/modules/mojo/inputdevice.cxs<173>";
	dbg_array(this.m__touchX,t_data)[dbg_index]=t_x;
	err_info="/Applications/Cerberus/modules/mojo/inputdevice.cxs<174>";
	dbg_array(this.m__touchY,t_data)[dbg_index]=t_y;
	err_info="/Applications/Cerberus/modules/mojo/inputdevice.cxs<175>";
	if(t_data==0){
		err_info="/Applications/Cerberus/modules/mojo/inputdevice.cxs<176>";
		this.m__mouseX=t_x;
		err_info="/Applications/Cerberus/modules/mojo/inputdevice.cxs<177>";
		this.m__mouseY=t_y;
	}
	pop_err();
}
c_InputDevice.prototype.p_MotionEvent=function(t_event,t_data,t_x,t_y,t_z){
	push_err();
	err_info="/Applications/Cerberus/modules/mojo/inputdevice.cxs<182>";
	var t_4=t_event;
	err_info="/Applications/Cerberus/modules/mojo/inputdevice.cxs<183>";
	if(t_4==10){
	}else{
		pop_err();
		return;
	}
	err_info="/Applications/Cerberus/modules/mojo/inputdevice.cxs<187>";
	this.m__accelX=t_x;
	err_info="/Applications/Cerberus/modules/mojo/inputdevice.cxs<188>";
	this.m__accelY=t_y;
	err_info="/Applications/Cerberus/modules/mojo/inputdevice.cxs<189>";
	this.m__accelZ=t_z;
	pop_err();
}
c_InputDevice.prototype.p_KeyDown=function(t_key){
	push_err();
	err_info="/Applications/Cerberus/modules/mojo/inputdevice.cxs<47>";
	if(t_key>0 && t_key<512){
		err_info="/Applications/Cerberus/modules/mojo/inputdevice.cxs<47>";
		pop_err();
		return dbg_array(this.m__keyDown,t_key)[dbg_index];
	}
	err_info="/Applications/Cerberus/modules/mojo/inputdevice.cxs<48>";
	pop_err();
	return false;
}
function c_JoyState(){
	Object.call(this);
	this.m_joyx=new_number_array(2);
	this.m_joyy=new_number_array(2);
	this.m_joyz=new_number_array(2);
	this.m_buttons=new_bool_array(32);
}
c_JoyState.m_new=function(){
	push_err();
	err_info="/Applications/Cerberus/modules/mojo/inputdevice.cxs<14>";
	pop_err();
	return this;
}
var bb_input_device=null;
function bb_input_SetInputDevice(t_dev){
	push_err();
	err_info="/Applications/Cerberus/modules/mojo/input.cxs<22>";
	bb_input_device=t_dev;
	pop_err();
	return 0;
}
var bb_app__devWidth=0;
var bb_app__devHeight=0;
function bb_app_ValidateDeviceWindow(t_notifyApp){
	push_err();
	err_info="/Applications/Cerberus/modules/mojo/app.cxs<57>";
	var t_w=bb_app__game.GetDeviceWidth();
	err_info="/Applications/Cerberus/modules/mojo/app.cxs<58>";
	var t_h=bb_app__game.GetDeviceHeight();
	err_info="/Applications/Cerberus/modules/mojo/app.cxs<59>";
	if(t_w==bb_app__devWidth && t_h==bb_app__devHeight){
		pop_err();
		return;
	}
	err_info="/Applications/Cerberus/modules/mojo/app.cxs<60>";
	bb_app__devWidth=t_w;
	err_info="/Applications/Cerberus/modules/mojo/app.cxs<61>";
	bb_app__devHeight=t_h;
	err_info="/Applications/Cerberus/modules/mojo/app.cxs<62>";
	if(t_notifyApp){
		err_info="/Applications/Cerberus/modules/mojo/app.cxs<62>";
		bb_app__app.p_OnResize();
	}
	pop_err();
}
function c_DisplayMode(){
	Object.call(this);
	this.m__width=0;
	this.m__height=0;
}
c_DisplayMode.m_new=function(t_width,t_height){
	push_err();
	err_info="/Applications/Cerberus/modules/mojo/app.cxs<192>";
	this.m__width=t_width;
	err_info="/Applications/Cerberus/modules/mojo/app.cxs<193>";
	this.m__height=t_height;
	pop_err();
	return this;
}
c_DisplayMode.m_new2=function(){
	push_err();
	err_info="/Applications/Cerberus/modules/mojo/app.cxs<189>";
	pop_err();
	return this;
}
function c_Map(){
	Object.call(this);
	this.m_root=null;
}
c_Map.m_new=function(){
	push_err();
	err_info="/Applications/Cerberus/modules/cerberus/map.cxs<7>";
	pop_err();
	return this;
}
c_Map.prototype.p_Compare=function(t_lhs,t_rhs){
}
c_Map.prototype.p_FindNode=function(t_key){
	push_err();
	err_info="/Applications/Cerberus/modules/cerberus/map.cxs<157>";
	var t_node=this.m_root;
	err_info="/Applications/Cerberus/modules/cerberus/map.cxs<159>";
	while((t_node)!=null){
		err_info="/Applications/Cerberus/modules/cerberus/map.cxs<160>";
		var t_cmp=this.p_Compare(t_key,dbg_object(t_node).m_key);
		err_info="/Applications/Cerberus/modules/cerberus/map.cxs<161>";
		if(t_cmp>0){
			err_info="/Applications/Cerberus/modules/cerberus/map.cxs<162>";
			t_node=dbg_object(t_node).m_right;
		}else{
			err_info="/Applications/Cerberus/modules/cerberus/map.cxs<163>";
			if(t_cmp<0){
				err_info="/Applications/Cerberus/modules/cerberus/map.cxs<164>";
				t_node=dbg_object(t_node).m_left;
			}else{
				err_info="/Applications/Cerberus/modules/cerberus/map.cxs<166>";
				pop_err();
				return t_node;
			}
		}
	}
	err_info="/Applications/Cerberus/modules/cerberus/map.cxs<169>";
	pop_err();
	return t_node;
}
c_Map.prototype.p_Contains=function(t_key){
	push_err();
	err_info="/Applications/Cerberus/modules/cerberus/map.cxs<25>";
	var t_=this.p_FindNode(t_key)!=null;
	pop_err();
	return t_;
}
c_Map.prototype.p_RotateLeft=function(t_node){
	push_err();
	err_info="/Applications/Cerberus/modules/cerberus/map.cxs<251>";
	var t_child=dbg_object(t_node).m_right;
	err_info="/Applications/Cerberus/modules/cerberus/map.cxs<252>";
	dbg_object(t_node).m_right=dbg_object(t_child).m_left;
	err_info="/Applications/Cerberus/modules/cerberus/map.cxs<253>";
	if((dbg_object(t_child).m_left)!=null){
		err_info="/Applications/Cerberus/modules/cerberus/map.cxs<254>";
		dbg_object(dbg_object(t_child).m_left).m_parent=t_node;
	}
	err_info="/Applications/Cerberus/modules/cerberus/map.cxs<256>";
	dbg_object(t_child).m_parent=dbg_object(t_node).m_parent;
	err_info="/Applications/Cerberus/modules/cerberus/map.cxs<257>";
	if((dbg_object(t_node).m_parent)!=null){
		err_info="/Applications/Cerberus/modules/cerberus/map.cxs<258>";
		if(t_node==dbg_object(dbg_object(t_node).m_parent).m_left){
			err_info="/Applications/Cerberus/modules/cerberus/map.cxs<259>";
			dbg_object(dbg_object(t_node).m_parent).m_left=t_child;
		}else{
			err_info="/Applications/Cerberus/modules/cerberus/map.cxs<261>";
			dbg_object(dbg_object(t_node).m_parent).m_right=t_child;
		}
	}else{
		err_info="/Applications/Cerberus/modules/cerberus/map.cxs<264>";
		this.m_root=t_child;
	}
	err_info="/Applications/Cerberus/modules/cerberus/map.cxs<266>";
	dbg_object(t_child).m_left=t_node;
	err_info="/Applications/Cerberus/modules/cerberus/map.cxs<267>";
	dbg_object(t_node).m_parent=t_child;
	pop_err();
	return 0;
}
c_Map.prototype.p_RotateRight=function(t_node){
	push_err();
	err_info="/Applications/Cerberus/modules/cerberus/map.cxs<271>";
	var t_child=dbg_object(t_node).m_left;
	err_info="/Applications/Cerberus/modules/cerberus/map.cxs<272>";
	dbg_object(t_node).m_left=dbg_object(t_child).m_right;
	err_info="/Applications/Cerberus/modules/cerberus/map.cxs<273>";
	if((dbg_object(t_child).m_right)!=null){
		err_info="/Applications/Cerberus/modules/cerberus/map.cxs<274>";
		dbg_object(dbg_object(t_child).m_right).m_parent=t_node;
	}
	err_info="/Applications/Cerberus/modules/cerberus/map.cxs<276>";
	dbg_object(t_child).m_parent=dbg_object(t_node).m_parent;
	err_info="/Applications/Cerberus/modules/cerberus/map.cxs<277>";
	if((dbg_object(t_node).m_parent)!=null){
		err_info="/Applications/Cerberus/modules/cerberus/map.cxs<278>";
		if(t_node==dbg_object(dbg_object(t_node).m_parent).m_right){
			err_info="/Applications/Cerberus/modules/cerberus/map.cxs<279>";
			dbg_object(dbg_object(t_node).m_parent).m_right=t_child;
		}else{
			err_info="/Applications/Cerberus/modules/cerberus/map.cxs<281>";
			dbg_object(dbg_object(t_node).m_parent).m_left=t_child;
		}
	}else{
		err_info="/Applications/Cerberus/modules/cerberus/map.cxs<284>";
		this.m_root=t_child;
	}
	err_info="/Applications/Cerberus/modules/cerberus/map.cxs<286>";
	dbg_object(t_child).m_right=t_node;
	err_info="/Applications/Cerberus/modules/cerberus/map.cxs<287>";
	dbg_object(t_node).m_parent=t_child;
	pop_err();
	return 0;
}
c_Map.prototype.p_InsertFixup=function(t_node){
	push_err();
	err_info="/Applications/Cerberus/modules/cerberus/map.cxs<212>";
	while(((dbg_object(t_node).m_parent)!=null) && dbg_object(dbg_object(t_node).m_parent).m_color==-1 && ((dbg_object(dbg_object(t_node).m_parent).m_parent)!=null)){
		err_info="/Applications/Cerberus/modules/cerberus/map.cxs<213>";
		if(dbg_object(t_node).m_parent==dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_left){
			err_info="/Applications/Cerberus/modules/cerberus/map.cxs<214>";
			var t_uncle=dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_right;
			err_info="/Applications/Cerberus/modules/cerberus/map.cxs<215>";
			if(((t_uncle)!=null) && dbg_object(t_uncle).m_color==-1){
				err_info="/Applications/Cerberus/modules/cerberus/map.cxs<216>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="/Applications/Cerberus/modules/cerberus/map.cxs<217>";
				dbg_object(t_uncle).m_color=1;
				err_info="/Applications/Cerberus/modules/cerberus/map.cxs<218>";
				dbg_object(dbg_object(t_uncle).m_parent).m_color=-1;
				err_info="/Applications/Cerberus/modules/cerberus/map.cxs<219>";
				t_node=dbg_object(t_uncle).m_parent;
			}else{
				err_info="/Applications/Cerberus/modules/cerberus/map.cxs<221>";
				if(t_node==dbg_object(dbg_object(t_node).m_parent).m_right){
					err_info="/Applications/Cerberus/modules/cerberus/map.cxs<222>";
					t_node=dbg_object(t_node).m_parent;
					err_info="/Applications/Cerberus/modules/cerberus/map.cxs<223>";
					this.p_RotateLeft(t_node);
				}
				err_info="/Applications/Cerberus/modules/cerberus/map.cxs<225>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="/Applications/Cerberus/modules/cerberus/map.cxs<226>";
				dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_color=-1;
				err_info="/Applications/Cerberus/modules/cerberus/map.cxs<227>";
				this.p_RotateRight(dbg_object(dbg_object(t_node).m_parent).m_parent);
			}
		}else{
			err_info="/Applications/Cerberus/modules/cerberus/map.cxs<230>";
			var t_uncle2=dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_left;
			err_info="/Applications/Cerberus/modules/cerberus/map.cxs<231>";
			if(((t_uncle2)!=null) && dbg_object(t_uncle2).m_color==-1){
				err_info="/Applications/Cerberus/modules/cerberus/map.cxs<232>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="/Applications/Cerberus/modules/cerberus/map.cxs<233>";
				dbg_object(t_uncle2).m_color=1;
				err_info="/Applications/Cerberus/modules/cerberus/map.cxs<234>";
				dbg_object(dbg_object(t_uncle2).m_parent).m_color=-1;
				err_info="/Applications/Cerberus/modules/cerberus/map.cxs<235>";
				t_node=dbg_object(t_uncle2).m_parent;
			}else{
				err_info="/Applications/Cerberus/modules/cerberus/map.cxs<237>";
				if(t_node==dbg_object(dbg_object(t_node).m_parent).m_left){
					err_info="/Applications/Cerberus/modules/cerberus/map.cxs<238>";
					t_node=dbg_object(t_node).m_parent;
					err_info="/Applications/Cerberus/modules/cerberus/map.cxs<239>";
					this.p_RotateRight(t_node);
				}
				err_info="/Applications/Cerberus/modules/cerberus/map.cxs<241>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="/Applications/Cerberus/modules/cerberus/map.cxs<242>";
				dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_color=-1;
				err_info="/Applications/Cerberus/modules/cerberus/map.cxs<243>";
				this.p_RotateLeft(dbg_object(dbg_object(t_node).m_parent).m_parent);
			}
		}
	}
	err_info="/Applications/Cerberus/modules/cerberus/map.cxs<247>";
	dbg_object(this.m_root).m_color=1;
	pop_err();
	return 0;
}
c_Map.prototype.p_Set=function(t_key,t_value){
	push_err();
	err_info="/Applications/Cerberus/modules/cerberus/map.cxs<29>";
	var t_node=this.m_root;
	err_info="/Applications/Cerberus/modules/cerberus/map.cxs<30>";
	var t_parent=null;
	err_info="/Applications/Cerberus/modules/cerberus/map.cxs<30>";
	var t_cmp=0;
	err_info="/Applications/Cerberus/modules/cerberus/map.cxs<32>";
	while((t_node)!=null){
		err_info="/Applications/Cerberus/modules/cerberus/map.cxs<33>";
		t_parent=t_node;
		err_info="/Applications/Cerberus/modules/cerberus/map.cxs<34>";
		t_cmp=this.p_Compare(t_key,dbg_object(t_node).m_key);
		err_info="/Applications/Cerberus/modules/cerberus/map.cxs<35>";
		if(t_cmp>0){
			err_info="/Applications/Cerberus/modules/cerberus/map.cxs<36>";
			t_node=dbg_object(t_node).m_right;
		}else{
			err_info="/Applications/Cerberus/modules/cerberus/map.cxs<37>";
			if(t_cmp<0){
				err_info="/Applications/Cerberus/modules/cerberus/map.cxs<38>";
				t_node=dbg_object(t_node).m_left;
			}else{
				err_info="/Applications/Cerberus/modules/cerberus/map.cxs<40>";
				dbg_object(t_node).m_value=t_value;
				err_info="/Applications/Cerberus/modules/cerberus/map.cxs<41>";
				pop_err();
				return false;
			}
		}
	}
	err_info="/Applications/Cerberus/modules/cerberus/map.cxs<45>";
	t_node=c_Node.m_new.call(new c_Node,t_key,t_value,-1,t_parent);
	err_info="/Applications/Cerberus/modules/cerberus/map.cxs<47>";
	if((t_parent)!=null){
		err_info="/Applications/Cerberus/modules/cerberus/map.cxs<48>";
		if(t_cmp>0){
			err_info="/Applications/Cerberus/modules/cerberus/map.cxs<49>";
			dbg_object(t_parent).m_right=t_node;
		}else{
			err_info="/Applications/Cerberus/modules/cerberus/map.cxs<51>";
			dbg_object(t_parent).m_left=t_node;
		}
		err_info="/Applications/Cerberus/modules/cerberus/map.cxs<53>";
		this.p_InsertFixup(t_node);
	}else{
		err_info="/Applications/Cerberus/modules/cerberus/map.cxs<55>";
		this.m_root=t_node;
	}
	err_info="/Applications/Cerberus/modules/cerberus/map.cxs<57>";
	pop_err();
	return true;
}
c_Map.prototype.p_Insert=function(t_key,t_value){
	push_err();
	err_info="/Applications/Cerberus/modules/cerberus/map.cxs<146>";
	var t_=this.p_Set(t_key,t_value);
	pop_err();
	return t_;
}
function c_IntMap(){
	c_Map.call(this);
}
c_IntMap.prototype=extend_class(c_Map);
c_IntMap.m_new=function(){
	push_err();
	err_info="/Applications/Cerberus/modules/cerberus/map.cxs<534>";
	c_Map.m_new.call(this);
	err_info="/Applications/Cerberus/modules/cerberus/map.cxs<534>";
	pop_err();
	return this;
}
c_IntMap.prototype.p_Compare=function(t_lhs,t_rhs){
	push_err();
	err_info="/Applications/Cerberus/modules/cerberus/map.cxs<537>";
	var t_=t_lhs-t_rhs;
	pop_err();
	return t_;
}
function c_Stack(){
	Object.call(this);
	this.m_data=[];
	this.m_length=0;
}
c_Stack.m_new=function(){
	push_err();
	pop_err();
	return this;
}
c_Stack.m_new2=function(t_data){
	push_err();
	err_info="/Applications/Cerberus/modules/cerberus/stack.cxs<13>";
	dbg_object(this).m_data=t_data.slice(0);
	err_info="/Applications/Cerberus/modules/cerberus/stack.cxs<14>";
	dbg_object(this).m_length=t_data.length;
	pop_err();
	return this;
}
c_Stack.prototype.p_Push=function(t_value){
	push_err();
	err_info="/Applications/Cerberus/modules/cerberus/stack.cxs<71>";
	if(this.m_length==this.m_data.length){
		err_info="/Applications/Cerberus/modules/cerberus/stack.cxs<72>";
		this.m_data=resize_object_array(this.m_data,this.m_length*2+10);
	}
	err_info="/Applications/Cerberus/modules/cerberus/stack.cxs<74>";
	dbg_array(this.m_data,this.m_length)[dbg_index]=t_value;
	err_info="/Applications/Cerberus/modules/cerberus/stack.cxs<75>";
	this.m_length+=1;
	pop_err();
}
c_Stack.prototype.p_Push2=function(t_values,t_offset,t_count){
	push_err();
	err_info="/Applications/Cerberus/modules/cerberus/stack.cxs<83>";
	for(var t_i=0;t_i<t_count;t_i=t_i+1){
		err_info="/Applications/Cerberus/modules/cerberus/stack.cxs<84>";
		this.p_Push(dbg_array(t_values,t_offset+t_i)[dbg_index]);
	}
	pop_err();
}
c_Stack.prototype.p_Push3=function(t_values,t_offset){
	push_err();
	err_info="/Applications/Cerberus/modules/cerberus/stack.cxs<79>";
	this.p_Push2(t_values,t_offset,t_values.length-t_offset);
	pop_err();
}
c_Stack.prototype.p_ToArray=function(){
	push_err();
	err_info="/Applications/Cerberus/modules/cerberus/stack.cxs<18>";
	var t_t=new_object_array(this.m_length);
	err_info="/Applications/Cerberus/modules/cerberus/stack.cxs<19>";
	for(var t_i=0;t_i<this.m_length;t_i=t_i+1){
		err_info="/Applications/Cerberus/modules/cerberus/stack.cxs<20>";
		dbg_array(t_t,t_i)[dbg_index]=dbg_array(this.m_data,t_i)[dbg_index];
	}
	err_info="/Applications/Cerberus/modules/cerberus/stack.cxs<22>";
	pop_err();
	return t_t;
}
function c_Node(){
	Object.call(this);
	this.m_key=0;
	this.m_right=null;
	this.m_left=null;
	this.m_value=null;
	this.m_color=0;
	this.m_parent=null;
}
c_Node.m_new=function(t_key,t_value,t_color,t_parent){
	push_err();
	err_info="/Applications/Cerberus/modules/cerberus/map.cxs<364>";
	dbg_object(this).m_key=t_key;
	err_info="/Applications/Cerberus/modules/cerberus/map.cxs<365>";
	dbg_object(this).m_value=t_value;
	err_info="/Applications/Cerberus/modules/cerberus/map.cxs<366>";
	dbg_object(this).m_color=t_color;
	err_info="/Applications/Cerberus/modules/cerberus/map.cxs<367>";
	dbg_object(this).m_parent=t_parent;
	pop_err();
	return this;
}
c_Node.m_new2=function(){
	push_err();
	err_info="/Applications/Cerberus/modules/cerberus/map.cxs<361>";
	pop_err();
	return this;
}
var bb_app__displayModes=[];
var bb_app__desktopMode=null;
function bb_app_DeviceWidth(){
	push_err();
	err_info="/Applications/Cerberus/modules/mojo/app.cxs<263>";
	pop_err();
	return bb_app__devWidth;
}
function bb_app_DeviceHeight(){
	push_err();
	err_info="/Applications/Cerberus/modules/mojo/app.cxs<267>";
	pop_err();
	return bb_app__devHeight;
}
function bb_app_EnumDisplayModes(){
	push_err();
	err_info="/Applications/Cerberus/modules/mojo/app.cxs<33>";
	var t_modes=bb_app__game.GetDisplayModes();
	err_info="/Applications/Cerberus/modules/mojo/app.cxs<34>";
	var t_mmap=c_IntMap.m_new.call(new c_IntMap);
	err_info="/Applications/Cerberus/modules/mojo/app.cxs<35>";
	var t_mstack=c_Stack.m_new.call(new c_Stack);
	err_info="/Applications/Cerberus/modules/mojo/app.cxs<36>";
	for(var t_i=0;t_i<t_modes.length;t_i=t_i+1){
		err_info="/Applications/Cerberus/modules/mojo/app.cxs<37>";
		var t_w=dbg_object(dbg_array(t_modes,t_i)[dbg_index]).width;
		err_info="/Applications/Cerberus/modules/mojo/app.cxs<38>";
		var t_h=dbg_object(dbg_array(t_modes,t_i)[dbg_index]).height;
		err_info="/Applications/Cerberus/modules/mojo/app.cxs<39>";
		var t_size=t_w<<16|t_h;
		err_info="/Applications/Cerberus/modules/mojo/app.cxs<40>";
		if(t_mmap.p_Contains(t_size)){
		}else{
			err_info="/Applications/Cerberus/modules/mojo/app.cxs<42>";
			var t_mode=c_DisplayMode.m_new.call(new c_DisplayMode,dbg_object(dbg_array(t_modes,t_i)[dbg_index]).width,dbg_object(dbg_array(t_modes,t_i)[dbg_index]).height);
			err_info="/Applications/Cerberus/modules/mojo/app.cxs<43>";
			t_mmap.p_Insert(t_size,t_mode);
			err_info="/Applications/Cerberus/modules/mojo/app.cxs<44>";
			t_mstack.p_Push(t_mode);
		}
	}
	err_info="/Applications/Cerberus/modules/mojo/app.cxs<47>";
	bb_app__displayModes=t_mstack.p_ToArray();
	err_info="/Applications/Cerberus/modules/mojo/app.cxs<48>";
	var t_mode2=bb_app__game.GetDesktopMode();
	err_info="/Applications/Cerberus/modules/mojo/app.cxs<49>";
	if((t_mode2)!=null){
		err_info="/Applications/Cerberus/modules/mojo/app.cxs<50>";
		bb_app__desktopMode=c_DisplayMode.m_new.call(new c_DisplayMode,dbg_object(t_mode2).width,dbg_object(t_mode2).height);
	}else{
		err_info="/Applications/Cerberus/modules/mojo/app.cxs<52>";
		bb_app__desktopMode=c_DisplayMode.m_new.call(new c_DisplayMode,bb_app_DeviceWidth(),bb_app_DeviceHeight());
	}
	pop_err();
}
var bb_graphics_renderDevice=null;
function bb_graphics_SetMatrix(t_ix,t_iy,t_jx,t_jy,t_tx,t_ty){
	push_err();
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<313>";
	dbg_object(bb_graphics_context).m_ix=t_ix;
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<314>";
	dbg_object(bb_graphics_context).m_iy=t_iy;
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<315>";
	dbg_object(bb_graphics_context).m_jx=t_jx;
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<316>";
	dbg_object(bb_graphics_context).m_jy=t_jy;
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<317>";
	dbg_object(bb_graphics_context).m_tx=t_tx;
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<318>";
	dbg_object(bb_graphics_context).m_ty=t_ty;
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<319>";
	dbg_object(bb_graphics_context).m_tformed=((t_ix!=1.0 || t_iy!=0.0 || t_jx!=0.0 || t_jy!=1.0 || t_tx!=0.0 || t_ty!=0.0)?1:0);
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<320>";
	dbg_object(bb_graphics_context).m_matDirty=1;
	pop_err();
	return 0;
}
function bb_graphics_SetMatrix2(t_m){
	push_err();
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<309>";
	bb_graphics_SetMatrix(dbg_array(t_m,0)[dbg_index],dbg_array(t_m,1)[dbg_index],dbg_array(t_m,2)[dbg_index],dbg_array(t_m,3)[dbg_index],dbg_array(t_m,4)[dbg_index],dbg_array(t_m,5)[dbg_index]);
	pop_err();
	return 0;
}
function bb_graphics_SetColor(t_r,t_g,t_b){
	push_err();
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<255>";
	dbg_object(bb_graphics_context).m_color_r=t_r;
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<256>";
	dbg_object(bb_graphics_context).m_color_g=t_g;
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<257>";
	dbg_object(bb_graphics_context).m_color_b=t_b;
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<258>";
	bb_graphics_renderDevice.SetColor(t_r,t_g,t_b);
	pop_err();
	return 0;
}
function bb_graphics_SetAlpha(t_alpha){
	push_err();
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<272>";
	dbg_object(bb_graphics_context).m_alpha=t_alpha;
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<273>";
	bb_graphics_renderDevice.SetAlpha(t_alpha);
	pop_err();
	return 0;
}
function bb_graphics_SetBlend(t_blend){
	push_err();
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<281>";
	dbg_object(bb_graphics_context).m_blend=t_blend;
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<282>";
	bb_graphics_renderDevice.SetBlend(t_blend);
	pop_err();
	return 0;
}
function bb_graphics_SetScissor(t_x,t_y,t_width,t_height){
	push_err();
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<290>";
	dbg_object(bb_graphics_context).m_scissor_x=t_x;
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<291>";
	dbg_object(bb_graphics_context).m_scissor_y=t_y;
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<292>";
	dbg_object(bb_graphics_context).m_scissor_width=t_width;
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<293>";
	dbg_object(bb_graphics_context).m_scissor_height=t_height;
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<294>";
	bb_graphics_renderDevice.SetScissor(((t_x)|0),((t_y)|0),((t_width)|0),((t_height)|0));
	pop_err();
	return 0;
}
function bb_graphics_BeginRender(){
	push_err();
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<226>";
	bb_graphics_renderDevice=bb_graphics_device;
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<227>";
	dbg_object(bb_graphics_context).m_matrixSp=0;
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<228>";
	bb_graphics_SetMatrix(1.0,0.0,0.0,1.0,0.0,0.0);
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<229>";
	bb_graphics_SetColor(255.0,255.0,255.0);
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<230>";
	bb_graphics_SetAlpha(1.0);
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<231>";
	bb_graphics_SetBlend(0);
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<232>";
	bb_graphics_SetScissor(0.0,0.0,(bb_app_DeviceWidth()),(bb_app_DeviceHeight()));
	pop_err();
	return 0;
}
function bb_graphics_EndRender(){
	push_err();
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<236>";
	bb_graphics_renderDevice=null;
	pop_err();
	return 0;
}
function c_BBGameEvent(){
	Object.call(this);
}
function bb_app_EndApp(){
	push_err();
	err_info="/Applications/Cerberus/modules/mojo/app.cxs<259>";
	error("");
	pop_err();
}
function bb_input_KeyDown(t_key){
	push_err();
	err_info="/Applications/Cerberus/modules/mojo/input.cxs<40>";
	var t_=((bb_input_device.p_KeyDown(t_key))?1:0);
	pop_err();
	return t_;
}
function c_shape(){
	Object.call(this);
	this.m_posx=.0;
	this.m_posy=.0;
	this.m_width=0;
	this.m_collided=false;
	this.m_angle=0;
}
c_shape.prototype.p_collide=function(t_shape2){
}
c_shape.prototype.p_render=function(){
	push_err();
	pop_err();
}
c_shape.m_new=function(){
	push_err();
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<223>";
	pop_err();
	return this;
}
function c_poly(){
	c_shape.call(this);
	this.m_num_points=0;
	this.m_points=[];
	this.m_success=[];
	this.m_point_index=0;
}
c_poly.prototype=extend_class(c_shape);
c_poly.prototype.p_next_point=function(t_a){
	push_err();
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<269>";
	if(t_a<this.m_num_points-1){
		err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<270>";
		var t_=t_a+1;
		pop_err();
		return t_;
	}else{
		err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<272>";
		pop_err();
		return 0;
	}
}
c_poly.prototype.p_prev_point=function(t_a){
	push_err();
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<277>";
	if(t_a>0){
		err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<278>";
		var t_=t_a-1;
		pop_err();
		return t_;
	}else{
		err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<280>";
		var t_2=this.m_num_points-1;
		pop_err();
		return t_2;
	}
}
c_poly.prototype.p_collide=function(t_shape2){
	push_err();
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<302>";
	var t_hit_this=false;
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<303>";
	if((object_downcast((t_shape2),c_circle))!=null){
		err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<305>";
		var t_circ=object_downcast((t_shape2),c_circle);
		err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<307>";
		for(var t_iter=0;t_iter<=this.m_num_points-1;t_iter=t_iter+1){
			err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<308>";
			if(bb_vectortest_distance(((dbg_object(t_circ).m_posx)|0),((dbg_object(t_circ).m_posy)|0),((dbg_object(dbg_array(this.m_points,t_iter)[dbg_index]).m_rotatedx)|0),((dbg_object(dbg_array(this.m_points,t_iter)[dbg_index]).m_rotatedy)|0))<(dbg_object(t_circ).m_width)){
				err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<309>";
				t_hit_this=true;
			}
		}
	}
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<315>";
	if((object_downcast((t_shape2),c_poly))!=null){
		err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<317>";
		var t_pol=object_downcast((t_shape2),c_poly);
		err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<319>";
		for(var t_iter2=0;t_iter2<=this.m_num_points-1;t_iter2=t_iter2+1){
			err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<322>";
			if(dbg_array(dbg_object(this).m_points,t_iter2)[dbg_index].p_collide(t_shape2)==true){
				err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<323>";
				t_hit_this=true;
				err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<324>";
				pop_err();
				return true;
			}
		}
	}
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<330>";
	pop_err();
	return t_hit_this;
}
c_poly.prototype.p_render=function(){
	push_err();
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<254>";
	for(var t_iter=0;t_iter<=this.m_num_points-1;t_iter=t_iter+1){
		err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<255>";
		dbg_array(dbg_object(this).m_points,t_iter)[dbg_index].p_rotate_around((dbg_object(this).m_angle),dbg_object(this).m_posx,dbg_object(this).m_posy);
		err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<256>";
		dbg_array(dbg_object(this).m_points,this.p_next_point(t_iter))[dbg_index].p_rotate_around((dbg_object(this).m_angle),dbg_object(this).m_posx,dbg_object(this).m_posy);
		err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<257>";
		if(dbg_array(this.m_success,t_iter)[dbg_index]==true){
			err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<258>";
			bb_graphics_SetColor(255.0,0.0,0.0);
		}
		err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<260>";
		bb_graphics_DrawText(String(t_iter),dbg_object(dbg_array(dbg_object(this).m_points,t_iter)[dbg_index]).m_rotatedx,dbg_object(dbg_array(dbg_object(this).m_points,t_iter)[dbg_index]).m_rotatedy,0.0,0.0);
		err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<261>";
		bb_graphics_DrawLine(dbg_object(dbg_array(dbg_object(this).m_points,t_iter)[dbg_index]).m_rotatedx,dbg_object(dbg_array(dbg_object(this).m_points,t_iter)[dbg_index]).m_rotatedy,dbg_object(dbg_array(dbg_object(this).m_points,this.p_next_point(t_iter))[dbg_index]).m_rotatedx,dbg_object(dbg_array(dbg_object(this).m_points,this.p_next_point(t_iter))[dbg_index]).m_rotatedy);
		err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<262>";
		bb_graphics_SetColor(255.0,255.0,255.0);
	}
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<264>";
	bb_graphics_DrawRect(dbg_object(this).m_posx,dbg_object(this).m_posy,3.0,3.0);
	pop_err();
}
c_poly.m_new=function(t_x,t_y,t_ps){
	push_err();
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<285>";
	c_shape.m_new.call(this);
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<286>";
	dbg_object(this).m_posx=(t_x);
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<287>";
	dbg_object(this).m_posy=(t_y);
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<288>";
	dbg_object(this).m_angle=0;
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<290>";
	this.m_num_points=t_ps;
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<292>";
	this.m_points=new_object_array(t_ps);
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<293>";
	this.m_success=new_bool_array(t_ps);
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<295>";
	for(var t_iter=0;t_iter<=t_ps-1;t_iter=t_iter+1){
		err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<296>";
		dbg_array(this.m_success,t_iter)[dbg_index]=false;
	}
	pop_err();
	return this;
}
c_poly.m_new2=function(){
	push_err();
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<241>";
	c_shape.m_new.call(this);
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<241>";
	pop_err();
	return this;
}
c_poly.prototype.p_add_point=function(t_p){
	push_err();
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<248>";
	dbg_array(this.m_points,this.m_point_index)[dbg_index]=t_p;
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<249>";
	this.m_point_index=this.m_point_index+1;
	pop_err();
}
var bb_vectortest_square1=null;
var bb_vectortest_square2=null;
function c_circle(){
	c_shape.call(this);
}
c_circle.prototype=extend_class(c_shape);
function c_point(){
	c_shape.call(this);
	this.m_rotatedx=.0;
	this.m_rotatedy=.0;
}
c_point.prototype=extend_class(c_shape);
c_point.prototype.p_collide=function(t_shape2){
	push_err();
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<148>";
	var t_result=false;
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<149>";
	var t_other_number=0;
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<150>";
	if((object_downcast((t_shape2),c_poly))!=null){
		err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<151>";
		var t_p=object_downcast((t_shape2),c_poly);
		err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<152>";
		var t_angles=new_number_array(dbg_object(t_p).m_num_points);
		err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<153>";
		var t_backwards_angles=new_number_array(dbg_object(t_p).m_num_points);
		err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<154>";
		var t_angle_to_middle=new_number_array(dbg_object(t_p).m_num_points);
		err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<155>";
		var t_tolerance_angle=new_number_array(dbg_object(t_p).m_num_points);
		err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<156>";
		var t_point_num=0;
		err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<158>";
		for(var t_iter=0;t_iter<=dbg_object(t_p).m_num_points-1;t_iter=t_iter+1){
			err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<159>";
			var t_t=c_Vector.m_new.call(new c_Vector,dbg_object(dbg_array(dbg_object(t_p).m_points,t_iter)[dbg_index]).m_rotatedx,dbg_object(dbg_array(dbg_object(t_p).m_points,t_iter)[dbg_index]).m_rotatedy);
			err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<160>";
			var t_t2=c_Vector.m_new.call(new c_Vector,dbg_object(dbg_array(dbg_object(t_p).m_points,t_p.p_next_point(t_iter))[dbg_index]).m_rotatedx,dbg_object(dbg_array(dbg_object(t_p).m_points,t_p.p_next_point(t_iter))[dbg_index]).m_rotatedy);
			err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<161>";
			var t_t3=c_Vector.m_new.call(new c_Vector,0.0,0.0);
			err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<162>";
			t_t3.p_MakeBetween(t_t,t_t2);
			err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<164>";
			dbg_array(t_angles,t_iter)[dbg_index]=((t_t3.p_Direction())|0);
			err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<167>";
			var t_t22=c_Vector.m_new.call(new c_Vector,dbg_object(dbg_array(dbg_object(t_p).m_points,t_p.p_prev_point(t_iter))[dbg_index]).m_rotatedx,dbg_object(dbg_array(dbg_object(t_p).m_points,t_p.p_prev_point(t_iter))[dbg_index]).m_rotatedy);
			err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<168>";
			var t_t33=c_Vector.m_new.call(new c_Vector,0.0,0.0);
			err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<169>";
			t_t33.p_MakeBetween(t_t,t_t22);
			err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<170>";
			dbg_array(t_backwards_angles,t_iter)[dbg_index]=((t_t33.p_Direction())|0);
			err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<173>";
			var t_t222=c_Vector.m_new.call(new c_Vector,this.m_posx,this.m_posy);
			err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<174>";
			var t_t333=c_Vector.m_new.call(new c_Vector,0.0,0.0);
			err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<175>";
			t_t333.p_MakeBetween(t_t,t_t222);
			err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<176>";
			dbg_array(t_angle_to_middle,t_iter)[dbg_index]=((t_t333.p_Direction())|0);
			err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<177>";
			dbg_array(t_tolerance_angle,t_iter)[dbg_index]=bb_math_Abs(dbg_array(t_angles,t_iter)[dbg_index]-dbg_array(t_backwards_angles,t_iter)[dbg_index]);
		}
		err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<181>";
		for(var t_iter2=0;t_iter2<=dbg_object(t_p).m_num_points-1;t_iter2=t_iter2+1){
			err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<182>";
			dbg_array(dbg_object(t_p).m_success,t_iter2)[dbg_index]=false;
		}
		err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<185>";
		t_result=true;
		err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<187>";
		for(var t_iter3=0;t_iter3<=dbg_object(t_p).m_num_points-1;t_iter3=t_iter3+1){
			err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<188>";
			var t_t4=c_Vector.m_new.call(new c_Vector,dbg_object(dbg_array(dbg_object(t_p).m_points,t_iter3)[dbg_index]).m_rotatedx,dbg_object(dbg_array(dbg_object(t_p).m_points,t_iter3)[dbg_index]).m_rotatedy);
			err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<189>";
			var t_t23=c_Vector.m_new.call(new c_Vector,dbg_object(this).m_rotatedx,dbg_object(this).m_rotatedy);
			err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<190>";
			var t_t32=c_Vector.m_new.call(new c_Vector,0.0,0.0);
			err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<191>";
			t_t32.p_MakeBetween(t_t4,t_t23);
			err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<192>";
			if(t_t32.p_Direction()<(dbg_array(t_angles,t_iter3)[dbg_index]) && t_t32.p_Direction()>(dbg_array(t_backwards_angles,t_iter3)[dbg_index]) || dbg_array(t_tolerance_angle,t_iter3)[dbg_index]>179){
				err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<193>";
				dbg_array(dbg_object(t_p).m_success,t_iter3)[dbg_index]=true;
			}
		}
		err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<199>";
		for(var t_iter4=0;t_iter4<=dbg_object(t_p).m_num_points-1;t_iter4=t_iter4+1){
			err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<200>";
			if(dbg_array(dbg_object(t_p).m_success,t_iter4)[dbg_index]==false){
				err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<201>";
				t_result=false;
			}
		}
	}
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<208>";
	pop_err();
	return t_result;
}
c_point.prototype.p_rotate_around=function(t_angle,t_cx,t_cy){
	push_err();
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<130>";
	var t_s=Math.sin((t_angle)*D2R);
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<131>";
	var t_c=Math.cos((t_angle)*D2R);
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<133>";
	var t_px=dbg_object(this).m_posx;
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<134>";
	var t_py=dbg_object(this).m_posy;
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<136>";
	var t_xnew=t_px*t_c-t_py*t_s;
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<137>";
	var t_ynew=t_px*t_s+t_py*t_c;
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<139>";
	dbg_object(this).m_rotatedx=t_xnew+t_cx;
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<140>";
	dbg_object(this).m_rotatedy=t_ynew+t_cy;
	pop_err();
}
c_point.m_new=function(t_x1,t_y1){
	push_err();
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<123>";
	c_shape.m_new.call(this);
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<124>";
	dbg_object(this).m_posx=(t_x1);
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<125>";
	dbg_object(this).m_posy=(t_y1);
	pop_err();
	return this;
}
c_point.m_new2=function(){
	push_err();
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<119>";
	c_shape.m_new.call(this);
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<119>";
	pop_err();
	return this;
}
c_point.prototype.p_render=function(){
	push_err();
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<213>";
	if(this.m_collided==true){
		err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<214>";
		bb_graphics_SetColor(255.0,255.0,0.0);
	}
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<216>";
	bb_graphics_DrawText(String(this.m_posx)+" "+String(this.m_posy),this.m_posx,this.m_posy,0.0,0.0);
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<217>";
	bb_graphics_DrawRect(this.m_posx,this.m_posy,2.0,2.0);
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<218>";
	bb_graphics_SetColor(255.0,255.0,255.0);
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<219>";
	this.m_collided=false;
	pop_err();
}
function bb_vectortest_distance(t_x1,t_y1,t_x2,t_y2){
	push_err();
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<6>";
	var t_x=Math.sqrt((t_x1-t_x2)*(t_x1-t_x2)+(t_y1-t_y2)*(t_y1-t_y2));
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectortest.cxs<7>";
	pop_err();
	return t_x;
}
function c_Vector(){
	Object.call(this);
	this.m_X=.0;
	this.m_Y=.0;
}
c_Vector.m_new=function(t_x,t_y){
	push_err();
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectors.cxs<21>";
	this.m_X=t_x;
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectors.cxs<22>";
	this.m_Y=t_y;
	pop_err();
	return this;
}
c_Vector.prototype.p_MakeBetween=function(t_PositionFrom,t_PositionToo){
	push_err();
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectors.cxs<267>";
	if(t_PositionFrom==null || t_PositionToo==null){
		err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectors.cxs<267>";
		pop_err();
		return this;
	}
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectors.cxs<268>";
	this.m_X=dbg_object(t_PositionToo).m_X-dbg_object(t_PositionFrom).m_X;
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectors.cxs<269>";
	this.m_Y=dbg_object(t_PositionToo).m_Y-dbg_object(t_PositionFrom).m_Y;
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectors.cxs<270>";
	pop_err();
	return this;
}
c_Vector.prototype.p_Direction=function(){
	push_err();
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectors.cxs<189>";
	var t_angle=(Math.atan2(-this.m_Y,this.m_X)*R2D);
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectors.cxs<190>";
	if(t_angle<0.0){
		err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectors.cxs<191>";
		t_angle=t_angle+360.0;
	}
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectors.cxs<195>";
	pop_err();
	return t_angle;
}
c_Vector.prototype.p_Length=function(){
	push_err();
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectors.cxs<151>";
	var t_=Math.sqrt(this.m_X*this.m_X+this.m_Y*this.m_Y);
	pop_err();
	return t_;
}
c_Vector.prototype.p_Set2=function(t_vector){
	push_err();
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectors.cxs<28>";
	this.m_X=dbg_object(t_vector).m_X;
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectors.cxs<29>";
	this.m_Y=dbg_object(t_vector).m_Y;
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectors.cxs<30>";
	pop_err();
	return this;
}
c_Vector.prototype.p_Set3=function(t_x,t_y){
	push_err();
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectors.cxs<33>";
	this.m_X=t_x;
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectors.cxs<34>";
	this.m_Y=t_y;
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectors.cxs<35>";
	pop_err();
	return this;
}
c_Vector.prototype.p_Normalize=function(){
	push_err();
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectors.cxs<136>";
	var t_Length=this.p_Length();
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectors.cxs<137>";
	if(t_Length==0.0){
		err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectors.cxs<138>";
		pop_err();
		return this;
	}
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectors.cxs<143>";
	this.p_Set3(this.m_X/t_Length,this.m_Y/t_Length);
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectors.cxs<144>";
	pop_err();
	return this;
}
c_Vector.prototype.p_Multiply=function(t_Value){
	push_err();
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectors.cxs<66>";
	this.m_X*=t_Value;
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectors.cxs<67>";
	this.m_Y*=t_Value;
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectors.cxs<68>";
	pop_err();
	return this;
}
c_Vector.prototype.p_Length2=function(t_length){
	push_err();
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectors.cxs<158>";
	if(t_length==0.0){
		err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectors.cxs<159>";
		this.m_X=0.0;
		err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectors.cxs<160>";
		this.m_Y=0.0;
		pop_err();
		return;
	}
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectors.cxs<164>";
	if(this.m_X==0.0 && this.m_Y==0.0){
		err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectors.cxs<165>";
		this.m_X=t_length;
	}
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectors.cxs<168>";
	this.p_Normalize();
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectors.cxs<169>";
	this.p_Multiply(t_length);
	pop_err();
}
c_Vector.prototype.p_MakeField=function(t_direction,t_length){
	push_err();
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectors.cxs<89>";
	this.m_X=Math.cos((-t_direction)*D2R)*t_length;
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectors.cxs<90>";
	this.m_Y=Math.sin((-t_direction)*D2R)*t_length;
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectors.cxs<91>";
	pop_err();
	return this;
}
c_Vector.prototype.p_Direction2=function(t_direction){
	push_err();
	err_info="/Users/peterscheutz/GitHub/Felix/Pong/vectors.cxs<205>";
	this.p_MakeField(t_direction,this.p_Length());
	pop_err();
}
function bb_math_Abs(t_x){
	push_err();
	err_info="/Applications/Cerberus/modules/cerberus/math.cxs<46>";
	if(t_x>=0){
		err_info="/Applications/Cerberus/modules/cerberus/math.cxs<46>";
		pop_err();
		return t_x;
	}
	err_info="/Applications/Cerberus/modules/cerberus/math.cxs<47>";
	var t_=-t_x;
	pop_err();
	return t_;
}
function bb_math_Abs2(t_x){
	push_err();
	err_info="/Applications/Cerberus/modules/cerberus/math.cxs<73>";
	if(t_x>=0.0){
		err_info="/Applications/Cerberus/modules/cerberus/math.cxs<73>";
		pop_err();
		return t_x;
	}
	err_info="/Applications/Cerberus/modules/cerberus/math.cxs<74>";
	var t_=-t_x;
	pop_err();
	return t_;
}
function bb_graphics_DebugRenderDevice(){
	push_err();
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<53>";
	if(!((bb_graphics_renderDevice)!=null)){
		err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<53>";
		error("Rendering operations can only be performed inside OnRender");
	}
	pop_err();
	return 0;
}
function bb_graphics_Cls(t_r,t_g,t_b){
	push_err();
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<379>";
	bb_graphics_DebugRenderDevice();
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<381>";
	bb_graphics_renderDevice.Cls(t_r,t_g,t_b);
	pop_err();
	return 0;
}
function bb_graphics_DrawImage(t_image,t_x,t_y,t_frame){
	push_err();
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<453>";
	bb_graphics_DebugRenderDevice();
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<454>";
	if(t_frame<0 || t_frame>=dbg_object(t_image).m_frames.length){
		err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<454>";
		error("Invalid image frame");
	}
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<457>";
	var t_f=dbg_array(dbg_object(t_image).m_frames,t_frame)[dbg_index];
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<459>";
	bb_graphics_context.p_Validate();
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<461>";
	if((dbg_object(t_image).m_flags&65536)!=0){
		err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<462>";
		bb_graphics_renderDevice.DrawSurface(dbg_object(t_image).m_surface,t_x-dbg_object(t_image).m_tx,t_y-dbg_object(t_image).m_ty);
	}else{
		err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<464>";
		bb_graphics_renderDevice.DrawSurface2(dbg_object(t_image).m_surface,t_x-dbg_object(t_image).m_tx,t_y-dbg_object(t_image).m_ty,dbg_object(t_f).m_x,dbg_object(t_f).m_y,dbg_object(t_image).m_width,dbg_object(t_image).m_height);
	}
	pop_err();
	return 0;
}
function bb_graphics_PushMatrix(){
	push_err();
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<334>";
	var t_sp=dbg_object(bb_graphics_context).m_matrixSp;
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<335>";
	if(t_sp==dbg_object(bb_graphics_context).m_matrixStack.length){
		err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<335>";
		dbg_object(bb_graphics_context).m_matrixStack=resize_number_array(dbg_object(bb_graphics_context).m_matrixStack,t_sp*2);
	}
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<336>";
	dbg_array(dbg_object(bb_graphics_context).m_matrixStack,t_sp+0)[dbg_index]=dbg_object(bb_graphics_context).m_ix;
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<337>";
	dbg_array(dbg_object(bb_graphics_context).m_matrixStack,t_sp+1)[dbg_index]=dbg_object(bb_graphics_context).m_iy;
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<338>";
	dbg_array(dbg_object(bb_graphics_context).m_matrixStack,t_sp+2)[dbg_index]=dbg_object(bb_graphics_context).m_jx;
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<339>";
	dbg_array(dbg_object(bb_graphics_context).m_matrixStack,t_sp+3)[dbg_index]=dbg_object(bb_graphics_context).m_jy;
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<340>";
	dbg_array(dbg_object(bb_graphics_context).m_matrixStack,t_sp+4)[dbg_index]=dbg_object(bb_graphics_context).m_tx;
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<341>";
	dbg_array(dbg_object(bb_graphics_context).m_matrixStack,t_sp+5)[dbg_index]=dbg_object(bb_graphics_context).m_ty;
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<342>";
	dbg_object(bb_graphics_context).m_matrixSp=t_sp+6;
	pop_err();
	return 0;
}
function bb_graphics_Transform(t_ix,t_iy,t_jx,t_jy,t_tx,t_ty){
	push_err();
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<356>";
	var t_ix2=t_ix*dbg_object(bb_graphics_context).m_ix+t_iy*dbg_object(bb_graphics_context).m_jx;
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<357>";
	var t_iy2=t_ix*dbg_object(bb_graphics_context).m_iy+t_iy*dbg_object(bb_graphics_context).m_jy;
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<358>";
	var t_jx2=t_jx*dbg_object(bb_graphics_context).m_ix+t_jy*dbg_object(bb_graphics_context).m_jx;
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<359>";
	var t_jy2=t_jx*dbg_object(bb_graphics_context).m_iy+t_jy*dbg_object(bb_graphics_context).m_jy;
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<360>";
	var t_tx2=t_tx*dbg_object(bb_graphics_context).m_ix+t_ty*dbg_object(bb_graphics_context).m_jx+dbg_object(bb_graphics_context).m_tx;
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<361>";
	var t_ty2=t_tx*dbg_object(bb_graphics_context).m_iy+t_ty*dbg_object(bb_graphics_context).m_jy+dbg_object(bb_graphics_context).m_ty;
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<362>";
	bb_graphics_SetMatrix(t_ix2,t_iy2,t_jx2,t_jy2,t_tx2,t_ty2);
	pop_err();
	return 0;
}
function bb_graphics_Transform2(t_m){
	push_err();
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<352>";
	bb_graphics_Transform(dbg_array(t_m,0)[dbg_index],dbg_array(t_m,1)[dbg_index],dbg_array(t_m,2)[dbg_index],dbg_array(t_m,3)[dbg_index],dbg_array(t_m,4)[dbg_index],dbg_array(t_m,5)[dbg_index]);
	pop_err();
	return 0;
}
function bb_graphics_Translate(t_x,t_y){
	push_err();
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<366>";
	bb_graphics_Transform(1.0,0.0,0.0,1.0,t_x,t_y);
	pop_err();
	return 0;
}
function bb_graphics_Rotate(t_angle){
	push_err();
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<374>";
	bb_graphics_Transform(Math.cos((t_angle)*D2R),-Math.sin((t_angle)*D2R),Math.sin((t_angle)*D2R),Math.cos((t_angle)*D2R),0.0,0.0);
	pop_err();
	return 0;
}
function bb_graphics_Scale(t_x,t_y){
	push_err();
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<370>";
	bb_graphics_Transform(t_x,0.0,0.0,t_y,0.0,0.0);
	pop_err();
	return 0;
}
function bb_graphics_PopMatrix(){
	push_err();
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<346>";
	var t_sp=dbg_object(bb_graphics_context).m_matrixSp-6;
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<347>";
	bb_graphics_SetMatrix(dbg_array(dbg_object(bb_graphics_context).m_matrixStack,t_sp+0)[dbg_index],dbg_array(dbg_object(bb_graphics_context).m_matrixStack,t_sp+1)[dbg_index],dbg_array(dbg_object(bb_graphics_context).m_matrixStack,t_sp+2)[dbg_index],dbg_array(dbg_object(bb_graphics_context).m_matrixStack,t_sp+3)[dbg_index],dbg_array(dbg_object(bb_graphics_context).m_matrixStack,t_sp+4)[dbg_index],dbg_array(dbg_object(bb_graphics_context).m_matrixStack,t_sp+5)[dbg_index]);
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<348>";
	dbg_object(bb_graphics_context).m_matrixSp=t_sp;
	pop_err();
	return 0;
}
function bb_graphics_DrawImage2(t_image,t_x,t_y,t_rotation,t_scaleX,t_scaleY,t_frame){
	push_err();
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<471>";
	bb_graphics_DebugRenderDevice();
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<472>";
	if(t_frame<0 || t_frame>=dbg_object(t_image).m_frames.length){
		err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<472>";
		error("Invalid image frame");
	}
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<475>";
	var t_f=dbg_array(dbg_object(t_image).m_frames,t_frame)[dbg_index];
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<477>";
	bb_graphics_PushMatrix();
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<479>";
	bb_graphics_Translate(t_x,t_y);
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<480>";
	bb_graphics_Rotate(t_rotation);
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<481>";
	bb_graphics_Scale(t_scaleX,t_scaleY);
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<483>";
	bb_graphics_Translate(-dbg_object(t_image).m_tx,-dbg_object(t_image).m_ty);
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<485>";
	bb_graphics_context.p_Validate();
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<487>";
	if((dbg_object(t_image).m_flags&65536)!=0){
		err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<488>";
		bb_graphics_renderDevice.DrawSurface(dbg_object(t_image).m_surface,0.0,0.0);
	}else{
		err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<490>";
		bb_graphics_renderDevice.DrawSurface2(dbg_object(t_image).m_surface,0.0,0.0,dbg_object(t_f).m_x,dbg_object(t_f).m_y,dbg_object(t_image).m_width,dbg_object(t_image).m_height);
	}
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<493>";
	bb_graphics_PopMatrix();
	pop_err();
	return 0;
}
function bb_graphics_DrawText(t_text,t_x,t_y,t_xalign,t_yalign){
	push_err();
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<578>";
	bb_graphics_DebugRenderDevice();
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<580>";
	if(!((dbg_object(bb_graphics_context).m_font)!=null)){
		err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<580>";
		pop_err();
		return 0;
	}
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<582>";
	var t_w=dbg_object(bb_graphics_context).m_font.p_Width();
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<583>";
	var t_h=dbg_object(bb_graphics_context).m_font.p_Height();
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<585>";
	t_x-=Math.floor((t_w*t_text.length)*t_xalign);
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<586>";
	t_y-=Math.floor((t_h)*t_yalign);
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<588>";
	for(var t_i=0;t_i<t_text.length;t_i=t_i+1){
		err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<589>";
		var t_ch=dbg_charCodeAt(t_text,t_i)-dbg_object(bb_graphics_context).m_firstChar;
		err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<590>";
		if(t_ch>=0 && t_ch<dbg_object(bb_graphics_context).m_font.p_Frames()){
			err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<591>";
			bb_graphics_DrawImage(dbg_object(bb_graphics_context).m_font,t_x+(t_i*t_w),t_y,t_ch);
		}
	}
	pop_err();
	return 0;
}
function bb_graphics_DrawLine(t_x1,t_y1,t_x2,t_y2){
	push_err();
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<402>";
	bb_graphics_DebugRenderDevice();
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<404>";
	bb_graphics_context.p_Validate();
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<405>";
	bb_graphics_renderDevice.DrawLine(t_x1,t_y1,t_x2,t_y2);
	pop_err();
	return 0;
}
function bb_graphics_DrawRect(t_x,t_y,t_w,t_h){
	push_err();
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<394>";
	bb_graphics_DebugRenderDevice();
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<396>";
	bb_graphics_context.p_Validate();
	err_info="/Applications/Cerberus/modules/mojo/graphics.cxs<397>";
	bb_graphics_renderDevice.DrawRect(t_x,t_y,t_w,t_h);
	pop_err();
	return 0;
}
function bb_app_Millisecs(){
	push_err();
	err_info="/Applications/Cerberus/modules/mojo/app.cxs<233>";
	var t_=bb_app__game.Millisecs();
	pop_err();
	return t_;
}
var bb_app__updateRate=0;
function bb_app_SetUpdateRate(t_hertz){
	push_err();
	err_info="/Applications/Cerberus/modules/mojo/app.cxs<224>";
	bb_app__updateRate=t_hertz;
	err_info="/Applications/Cerberus/modules/mojo/app.cxs<225>";
	bb_app__game.SetUpdateRate(t_hertz);
	pop_err();
}
function bbInit(){
	bb_app__app=null;
	bb_app__delegate=null;
	bb_app__game=BBGame.Game();
	bb_graphics_device=null;
	bb_graphics_context=c_GraphicsContext.m_new.call(new c_GraphicsContext);
	c_Image.m_DefaultFlags=0;
	bb_audio_device=null;
	bb_input_device=null;
	bb_app__devWidth=0;
	bb_app__devHeight=0;
	bb_app__displayModes=[];
	bb_app__desktopMode=null;
	bb_graphics_renderDevice=null;
	bb_vectortest_square1=null;
	bb_vectortest_square2=null;
	bb_app__updateRate=0;
}
//${TRANSCODE_END}
