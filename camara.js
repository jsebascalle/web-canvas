class Camara{
	constructor(video_id,canvas_id,callback){
		if (!this.isBrowserValid()) return;

		this.video = document.getElementById(video_id);
		this.canvas = document.getElementById(canvas_id);
		this.context = canvas.getContext('2d');
		this.sticker = null;

		navigator.mediaDevices.getUserMedia({ video: true }).then((stream)=>{
	        this.setVideo(stream);
	        this.setCanvas();

	        callback();
	    }).catch(err=>{
	    	console.log(err);
	    });
	}

	isBrowserValid(){
		return navigator.mediaDevices && navigator.mediaDevices.getUserMedia;
	}

	setVideo(stream){
		this.video.srcObject = stream;
	    this.video.play();
	}

	loop(){
		if (this.video.paused || this.video.ended) return;

		this.draw();

		setTimeout(()=>this.loop(), 1000/30);
	}

	draw(){

		this.context.drawImage(this.video, 0, 0, 640, 480);
		
		if (this.sticker != null)
			this.context.drawImage(this.sticker, 30, 30,64,64);
	}

	setCanvas(){
		this.video.addEventListener('play',(ev)=>this.loop());
	}

	snap(){
		this.video.pause();
	}

	unSnap(){
		this.video.play();
	}

	addSticker(img){

		this.sticker = img;
		this.draw();
	}
}