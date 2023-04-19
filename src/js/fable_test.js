
var animcontainer = document.getElementById('anim_container');

var animData = {
    container: animcontainer,
	renderer: 'svg',
	loop: false,
	autoplay: true,
	path: '/js/data batwing.json' 
    
    /** 
	path: '/js/data batwing.json' 
	path: 'data211.json' 
    path: 'data200.json' 
    path: 'data21b.json' 
    path: 'data21.json' **/
};

var anim = lottie.loadAnimation(animData);


anim.addEventListener('DOMLoaded', firstLoop);


/**THIS WORKS BUT LOOPS ON CLICK AT END--REMOVE FOR TEST ONLY **/

function firstLoop() {
    anim.playSegments([0,90], true);
    animcontainer.addEventListener('click', secondLoop);
                         
};


