(function(){
	function Coordinate(x,y){
		this.x=x;
		this.y=y;
	};

	function Snake(options){
		var i,x=options.startX,y=options.startY;
		this.maxX=options.maxX;
		this.maxY=options.maxY;
		this.orientation=options.initOrientation;
		this.position=[new Coordinate(x,y)];
		this.length=options.length;
		for(i=1;i<this.length;i++){
			switch (this.orientation){
				case 'd':
				y=(y-1)%this.maxY;
				if(y<0){y+=this.maxY};
				break;
				case 'u':
				y=(y+1)%this.maxY;
				break;
				case 'l':
				x=(x+1)%this.maxX;
				break;
				case 'r':
				x=(x-1)%this.maxX;
				if(x<0){x+=this.maxX};
				break;
			}
			this.position.push(new Coordinate(x,y));
		}
	}

	Snake.prototype={
		position:[],
		orientation:'u',
		maxX:0,
		maxY:0,
		crawl:function(){
			var i,x=this.position[0].x,y=this.position[0].y;
			this.position.pop();
			switch (this.orientation){
				case 'u':
				y=(y-1)%this.maxY;
				if(y<0){y+=this.maxY};
				break;
				case 'd':
				y=(y+1)%this.maxY;
				break;
				case 'r':
				x=(x+1)%this.maxX;
				break;
				case 'l':
				x=(x-1)%this.maxX;
				if(x<0){x+=this.maxX};
				break;
			}
			this.position.unshift(new Coordinate(x,y));
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
			var lr=['l','r'],du=['u','d'];
			if(lr.indexOf(orientation)>=0 && lr.indexOf(this.orientation)===-1){
				this.orientation=orientation;
			}else	if(du.indexOf(orientation)>=0 && du.indexOf(this.orientation)===-1){
				this.orientation=orientation;
			}
		}
	};

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
		for(i=0;i<position.length;i++){
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
	var dirs=['l','u','r','d','d'];
	var counter=0;
	setInterval(function(){
		if(counter++ ==10){
			counter=0;
			snake.setOrientation(dirs[Math.floor(Math.random()*5)]);
		}
		snake.crawl();
		drawBoard(renderer,board);
	},100);


})();
