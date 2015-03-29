(function(){
	window.nativeCanvasRenderer = function (containerId){
		var containerEl=document.getElementById(containerId);
		var canvasEl=document.createElement('canvas');
		canvasEl.id=containerId + '-canvas';
		canvasEl.height=containerEl.clientHeight;
		canvasEl.width=containerEl.clientWidth;
		containerEl.appendChild(canvasEl);
		var ctx=canvasEl.getContext('2d');
		this.drawRect=function(left,top,width,height,options){
			ctx.beginPath();
			ctx.strokeStyle=options.color || 'black';
			ctx.lineWidth=options.width || '1';
			var rect=ctx.strokeRect(left,top,width,height);
			ctx.stroke();
			return rect;
		};
		this.moveRect=function(rect,dx,dy){

		};
		this.clear=function(){
			ctx.clearRect(0,0,this.getMaxX(),this.getMaxY());
		}
		this.drawLine=function(x1,y1,x2,y2,options){
			ctx.beginPath();
			ctx.strokeStyle=options.color || 'black';
			ctx.lineWidth=options.width || '1';
			ctx.moveTo(x1,y1);
			var line=ctx.lineTo(x2,y2);
			ctx.stroke();
			return line;
		};
		this.drawCircle=function(cx,cy,r,options){
			ctx.strokeStyle=options.color || 'black';
			ctx.lineWidth=options.width || '1';
			var circle=ctx.arc(cx,cy,r,0,2*Math.PI);
			ctx.stroke();
			return circle;

		};
		this.getMaxX=function(){return canvasEl.width;};
		this.getMaxY=function(){return canvasEl.height;};
	};
})();
