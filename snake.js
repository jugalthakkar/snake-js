(function(){
	function Coordinate(x,y){
		this.x=x;
		this.y=y;
	};

	function Snake(options){
		var snake=this;
		this.maxX=options.maxX;
		this.maxY=options.maxY;
		this.orientation=options.initOrientation;
		this.length=options.length;
		this.queue=[];
		window.onkeyup = function(e){
			snake.onWindowKeyUp(e);
		};
		this.init(options);
		setInterval(function(){
			snake.crawl();
			drawBoard(renderer,board);
		},100);
	}

	Snake.prototype={
		orientations:{
			up:'u',
			down:'d',
			left:'l',
			right:'r'
		},
		position:[],
		orientation:'u',
		maxX:0,
		maxY:0,
		init:function(options){
			var i,x=options.startX,y=options.startY;
			this.position=[new Coordinate(x,y)];
			for(i=1;i<this.length;i++){
				switch (this.orientation){
					case this.orientations.down:
					y=(y-1)%this.maxY;
					if(y<0){y+=this.maxY};
					break;
					case this.orientations.up:
					y=(y+1)%this.maxY;
					break;
					case this.orientations.left:
					x=(x+1)%this.maxX;
					break;
					case this.orientations.right:
					x=(x-1)%this.maxX;
					if(x<0){x+=this.maxX};
					break;
				}
				this.position.push(new Coordinate(x,y));
			}
		},
		crawl:function(){
			if(this.isDead()){
				return;
			}
			this.processQueue();
			var i,x=this.position[0].x,y=this.position[0].y;
			this.position.pop();
			switch (this.orientation){
				case this.orientations.up:
				y=(y-1)%this.maxY;
				if(y<0){y+=this.maxY};
				break;
				case this.orientations.down:
				y=(y+1)%this.maxY;
				break;
				case this.orientations.right:
				x=(x+1)%this.maxX;
				break;
				case this.orientations.left:
				x=(x-1)%this.maxX;
				if(x<0){x+=this.maxX};
				break;
			}
			this.position.unshift(new Coordinate(x,y));
		},
		processQueue:function(){
			var success=false;
			while(!success && this.queue.length>0){
				success=this.setOrientation(this.queue.shift());
			}
		},
		isDead:function(){
			var i,
			headX=this.position[0].x,
			headY=this.position[0].y;
			for(i=1;i<this.length;i++){
				if(this.position[i].x==headX && this.position[i].y==headY){
					return true;
				}
			}
			return false;
		},
		setOrientation:function(orientation){
			var lr=[this.orientations.left,this.orientations.right],du=[this.orientations.up,this.orientations.down];
			if(lr.indexOf(orientation)>=0 && lr.indexOf(this.orientation)===-1){
				this.orientation=orientation;
				return true;
			}else	if(du.indexOf(orientation)>=0 && du.indexOf(this.orientation)===-1){
				this.orientation=orientation;
				return true;
			}
			return false;
		},
		onWindowKeyUp:function(e){
			var key = e.keyCode ? e.keyCode : e.which;
			switch(key){
				case 37:
				this.queue.push(this.orientations.left);
				break;
				case 38:
				this.queue.push(this.orientations.up);
				break;
				case 39:
				this.queue.push(this.orientations.right);
				break;
				case 40:
				this.queue.push(this.orientations.down);
				break;
			}
		}
	}

	function Arena(h,w){
		this.height=h;
		this.width=w;
	}

	function Board(arena,snake){
		this.arena=arena;
		this.snake=snake;
	}

	function drawBoard(renderer,board){
		renderer.clear();
		var cellHeight=renderer.getMaxY()/board.arena.height;
		var cellWidth=renderer.getMaxX()/board.arena.width;
		var i;
		var drawOutline=false;
		if(drawOutline){
			var boardrect=renderer.drawRect(0,0,renderer.getMaxX(),renderer.getMaxY(),{color:'red',width:'5'});
			for(i=0;i<=board.arena.height;i++){
				var line=renderer.drawLine(0,cellHeight*i,renderer.getMaxX(),cellHeight*i,{color:'white'});
				console.log(line);
			}

			for(i=0;i<=board.arena.width+1;i++){
				var line=renderer.drawLine(cellWidth*i,0,cellWidth*i,renderer.getMaxY(),{color:'white'});
				console.log(line);
			}
		}
		var position=board.snake.position;
		var padding=2;
		for(i=position.length-1;i>=0;i--){
			var coord=position[i];
			var color='#55c';
			if(i==0){
				color='#5c5';
			}else if(i==position.length-1){
				color='#c55';
			}
			renderer.drawRect(coord.x*cellWidth+padding,coord.y*cellHeight+padding,cellWidth-2*padding,cellHeight-2*padding,{color:color,width:'3'});
		}
	}

	var renderer=new nativeCanvasRenderer('container');
	var arena=new Arena(20,20);
	var snake=new Snake({startX:4,startY:4,length:10,initOrientation:'u',maxX:arena.width,maxY:arena.height});
	var board=new Board(arena,snake);


})();
