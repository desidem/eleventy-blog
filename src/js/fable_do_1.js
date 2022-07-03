
var animcontainer = document.getElementById('anim_container');

var animData = {
    container: animcontainer,
	renderer: 'svg',
	loop: false,
	autoplay: true,
	path: '/js/data_do115.json' 
    /** 
	
	path: 'data211.json' 
    path: 'data200.json' 
    path: 'data21b.json' 
    path: 'data21.json' **/
};

var anim = lottie.loadAnimation(animData);


anim.addEventListener('DOMLoaded', firstLoop);


/**THIS WORKS BUT LOOPS ON CLICK AT END--REMOVE FOR TEST ONLY **/

function firstLoop() {
    anim.playSegments([3,4], true);
    animcontainer.addEventListener('click', secondLoop);
                         
};

function secondLoop() {
    anim.playSegments([14,127], true);
    animcontainer.addEventListener('click', thirdLoop);
                         
    
};

function thirdLoop() {
    anim.playSegments([143,274], true);
    animcontainer.addEventListener('click', fourthLoop);
    
 /**   anim.addEventListener('complete', removeClick); **/

};

function fourthLoop() {
    anim.playSegments([285,423], true);
    animcontainer.addEventListener('click', fifthLoop);
    
 /**   anim.addEventListener('complete', removeClick); **/

};

function fifthLoop() {
    anim.playSegments([435,496], true);
	anim.addEventListener('complete', removeClick);

    
    /** next bit is added for alert box **/
    /**
    
    animcontainer.addEventListener('click', alert);
    alert("Hello! I am an alert box!!");
    **/
}; 

var popup = document.getElementById("myPopup");


function removeClick (event){
    animcontainer.removeEventListener('click', secondLoop);
    animcontainer.removeEventListener('click', thirdLoop);
    animcontainer.removeEventListener('click', fourthLoop);
    animcontainer.removeEventListener('click', fifthLoop);
	
    anim.removeEventListener('complete', removeClick);

    popup.classList.toggle("show");
};



    
 /**   animcontainer.addEventListener('click', alert);  **/

 
        
        

/**
function removeClick (event){
    animcontainer.removeEventListener('click', sixthLoop);
};

/**
function alert() {
    
    ("Hello! I am an alert box!!");

    

};

/**

animcontainer.addEventListener('click', secondLoop);


/**
function removeClick (event){
    animcontainer.removeEventListener('click', secondLoop);
};



/**
animcontainer.removeEventListener('click', secondLoop);
       

animcontainer.addEventListener('click', function(event) {
          anim.addEventListener('loopComplete', transition )                     
                               
                               };

/** reserve, this works


animcontainer.addEventListener('click', function() {
      anim.playSegments([221,350], true);
   
});

**/
/** keep working on this to remove Event Listener **/
/**
var someFrame = 340; // For example, this will fire after the 40th frame

/** function removeClick**/
/**

animcontainer.addEventListener('click', function() {

      if (anim.playSegments > someFrame) {
          animcontainer.removeEventListener('click', secondLoop);
     
      
          // Do whatever you want at that frame   
          }
                                            
};

/** NEED TO DISABLE event listener, after play segments

/**
animcontainer.removeEventListener('click', function () {
    anim.playSegments == 300
});



/**
function firstLoop() {
    anim.playSegments([0,220], true);
};


function secondLoop() {    
    anim.playSegments([221,400], true);
    animcontainer.removeEventListener( 'click');
});



animcontainer.addEventListener('click', function(event) {
      anim.addEventListener( 'onComplete', secondLoop );
});


/**

animcontainer.addEventListener('click', function() {
    anim.playSegments([221,300], true);
    

});
/**
 animcontainer.removeEventlistener('click', function(event) {
     anim.playSegments( 'onComplete');
 });
                               
/**
    
function secondLoop() {
    anim.playSegments([221,400], true);
  /**  anim.removeEventListener('loopComplete'); **/
    

/**
};

animcontainer.addEventListener('click', function(event) {
      anim.addEventListener( 'onComplete', secondLoop );
});
                               
/**
    
    animcontainer.addEventListener('click', function() {
        anim.playSegments([221,400], true);
    }
                                 )
}

    
    /**

    
function secondLoop() {
    anim.playSegments ([251,400], false);
    
    
    
};
/**
animcontainer.addEventListener('loopComplete', function(event) {
    anim.addEventListener( 'loopComplete'); **/
/**
animcontainer.addEventListener('click', function(event) {
    anim.addEventListener( 'loopComplete', secondLoop);
});



 animcontainer.addEventListener('click', function() {
      anim.playSegments([251,400], true);
     
     
      });
/**


var container = document.getElementById("anim_container");

var animData = {
	container: container,
	renderer: 'svg',
	autoplay: true,
	loop: true,
	path: 'data3.json'


};

var anim = lottie.loadAnimation(animData);

/**
animation = lottie.loadAnimation{
	container: document.getElementById("anim_container"),
	renderer: "svg",
	loop: true,
	autoplay: true,
	path: "data3.json"

};

/**
var container = document.getElementById('anim_container');


var animData = {
	container: container,
	renderer: 'svg',
	autoplay: true,
	loop: true,
	animationData: 'data3.json'
};

var anim = lottie.loadAnimation(animData);

/**
var container = document.getElementById('animation');


var animData = {
	container: container,
	renderer: 'svg',
	autoplay: true,
	loop: true,
	path: 'data3.json'
};

var anim = lottie.loadAnimation(animData);


/**
<script>
</script>


var docWidth = document.documentElement.offsetWidth;

[].forEach.call(
  document.querySelectorAll('*'),
  function(el) {
    if (el.offsetWidth > docWidth) {
      console.log(el);
    }
  }
);
<script src="data3.js"></script>



/** USE FOR PAGE 2 ANIMATION! --INCLUDES REMOVE EVENT **/

/**
var animcontainer = document.getElementById('anim_container');

var animData = {
    container: animcontainer,
	renderer: 'svg',
	loop: false,
	autoplay: true,
	path: 'data4.json' 
    /** path: 'data21.json' **/ /**
};

**/

/**
var anim = lottie.loadAnimation(animData);


anim.addEventListener('DOMLoaded', firstLoop);


/**THIS WORKS BUT LOOPS ON CLICK AT END--REMOVE FOR TEST ONLY **/ /**
function firstLoop() {
    anim.playSegments([0,220], true);
  
    
};

function secondLoop() {
    anim.playSegments([221,350], true);
    
    anim.addEventListener('complete', removeClick);

};

animcontainer.addEventListener('click', secondLoop);

function removeClick (event){
    animcontainer.removeEventListener('click', secondLoop);
};






**/