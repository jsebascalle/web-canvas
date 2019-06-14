;(function(){
	        
	var camara = new Camara("video","canvas",function(){

		var btnSnap = document.getElementById("snap");
		var btnDownload = document.getElementById("download");
		var btnCancel = document.getElementById("cancel");
		var btnSticker = document.getElementById("sticker");

		document.querySelectorAll(".sticker").forEach(function(element){
			element.addEventListener("click", addSticker);
		})

		btnSnap.addEventListener("click", function(){
			camara.snap();
			document.getElementById("actions").style.display = "block";
		});

		btnCancel.addEventListener("click", function(){
			camara.unSnap();
			document.getElementById("actions").style.display = "none";
		});

		btnDownload.addEventListener("click", function() {
			camara.context.drawImage(video, 0, 0, 640, 480);
			var imageUrl = camara.canvas.toDataURL("image/png");
			var link = document.getElementById("download-link");

			link.href = imageUrl;
			link.download = "photo.png";
			link.click();
		});


		btnSticker.addEventListener("click", function(){
			document.getElementById("stickers").style.display = "block";
		});

		function addSticker(){
			camara.addSticker(this);
			document.getElementById("stickers").style.display = "none";
		}
	});
	        
})()