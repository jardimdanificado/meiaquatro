var rascunho = [];
//------------------------------------------
//SISTEMA.FILE
//------------------------------------------
rascunho.file = [];
rascunho.file.model = [];
rascunho.file.model.getAnimLength= function (folderpath) 
{
	let lfile;
	let found = false;
	let index = 0;
	while (found == false) 
	{
		lfile = new File(folderpath + index);
		if (lfile.exists()) 
		{
			index++;
		}

		else
			found = true;
	}
	return index;
};
rascunho.file.model.load= function (filepath, iname) 
{
	if (typeof filepath === 'object') 
	{
		if (iname) 
		{
			this[iname] = [];
			for (i = 0; i < filepath.length; i++) 
			{
				this[iname] = [];
				this[iname][filepath[i].split("/")[filepath[i].split("/").length - 1]] = [];
				for (k = 0; k < this.getAnimLength(filepath[i]); k++) 
				{
					this[iname][filepath[i].split("/")[filepath[i].split("/").length - 1]]
						.push(loadModel(filepath[i] + k + ".obj"));
				}
				this.push(this[iname]);
			}
		}
		else 
		{
			let lobj = [];
			for (i = 0; i < filepath.length; i++) 
			{
				lobj[filepath[i].split("/")[filepath[i].split("/").length - 1]] = [];
				for (k = 0; k < this.getAnimLength(filepath[i]); k++) 
				{
					lobj[filepath[i].split("/")[filepath[i].split("/").length - 1]]
						.push(loadModel(filepath[i] + k + ".obj"));
				}
			}
			this.push(lobj);
		}
	}

	else if (iname) 
	{
		this[iname] = loadModel(filepath);
		this.push(this[iname]);
	}
	else
		this.push(loadModel(filepath));
};
rascunho.file.image = [];
rascunho.file.image.load = function (filepath, iname) {
	if (typeof filepath === 'object') {
		if (iname) {
			this[iname] = [];
			for (i = 0; i < filepath.length; i++) {
				this[iname] = [];
				this[iname][filepath[i].split("/")[filepath[i].split("/").length - 1]] = [];
				for (k = 0; k < this.getAnimLength(filepath[i]); k++) {
					this[iname][filepath[i].split("/")[filepath[i].split("/").length - 1]]
						.push(loadModel(filepath[i] + k + ".png"));
				}
				this.push(this[iname]);
			}
		}

		else {
			let lobj = [];
			for (i = 0; i < filepath.length; i++) {
				lobj[filepath[i].split("/")[filepath[i].split("/").length - 1]] = [];
				for (k = 0; k < this.getAnimLength(filepath[i]); k++) {
					lobj[filepath[i].split("/")[filepath[i].split("/").length - 1]]
						.push(loadModel(filepath[i] + k + ".png"));
				}
			}
			this.push(lobj);
		}
	}

	else if (iname) 
	{
		this[iname] = loadImage(filepath);
		this.push(this[iname]);
	}

	else
		this.push(loadImage(filepath));
}
rascunho.file.font=[];
rascunho.file.font.load = function (filepath, iname) 
{
	if (iname) 
	{
		this[iname] = loadFont(filepath);
		this.push(this[iname]);
	}
	else
		this.push(loadFont(filepath));
}

//------------------------------------------
//SISTEMA.WORLD
//------------------------------------------

rascunho.world =
{
	creature: [],
	plant: [],
	prop: [],
	item: []
}

//------------------------------------------
//SISTEMA.RENDER
//------------------------------------------

rascunho.render = [];
rascunho.render.scene = [];
rascunho.render.scene.model = [];
rascunho.render.scene.model.add = function(ref, imodel)
{
	//ref must contains at least: name, color, position(vec3), rotation(vec3), scale(vec3)
	if(ref.model)
	{
		this[ref.name] = ref.model;
	}
	else if(imodel)
		this[ref.name] = imodel;
	this[ref.name].active = true;
	this[ref.name].color = ref.color;
	this[ref.name].position = ref.position; 
	this[ref.name].rotation = ref.rotation;
	this[ref.name].scale = ref.scale;
	if(ref.texture)
	{
		this[ref.name].texture = ref.texture;
	}
		
	this.push(this[ref.name]);
}
rascunho.render.scene.text = [];
rascunho.render.scene.text.add = function(ref, istring)
{
	//if UI must contains: name, color, position(vec2),fontSize, font
	//if 3D must contains: name, color, position(vec3),rotation(vec3),fontSize, font
	
	this[ref.name] = ref;
	this[ref.name].active = true;
	this[ref.name].string = istring;
	if(ref.rotation)//if ref contains rotation then is 3D
		this[ref.name].isUI = false;
	else
		this[ref.name].isUI = true;
	this.push(this[ref.name]);
}
rascunho.render.scene.image= [];
rascunho.render.scene.image.add = function(ref, iimage)
{
	//ref must contains: name, position(vec2), rotation(vec2) and scale(vec2 but please use wh instead xy)
	this[ref.name] = iimage;
	this[ref.name].active = true;
	this[ref.name].position = ref.position; 
	this[ref.name].rotation = ref.rotation;
	this[ref.name].scale = ref.scale;
	if(ref.rotation.z && ref.scale.z && ref.position.z)//if ref contains rotation then is 3D
		this[ref.name].isUI = false;
	else
		this[ref.name].isUI = true;
	this.push(this[ref.name]);
}
rascunho.render.scene.shape = [];
rascunho.render.scene.shape.add = function(ref, ishape)
{
	//ref must contains at least: name, color, position(vec2), scale(vec2 but use wh instead xy)
	this[ref.name] = ref;
	this[ref.name].active = true;
	this[ref.name].shape = ishape;
	this.push(this[ref.name]);
}
rascunho.render.scene.background=
{
	r: 1,
	g: 1,
	b: 1,
	a: 1
};
rascunho.render.scene.render= function()
{
	clear(this.background.r,this.background.g,this.background.b,this.background.a);
	noStroke();
	if(this.model.length)
	{
		for(i=0;i<this.model.length;i++)
			if(this.model[i].active)
			{
				this.gfx.clear(this.background.r,this.background.g,this.background.b,this.background.a);
				this.gfx.push(); // Start a new drawing state
				this.gfx.fill(this.model[i].color.r,this.model[i].color.g,this.model[i].color.b);
				this.gfx.translate(this.model[i].position.x, this.model[i].position.y, this.model[i].position.z);
				this.gfx.scale(this.model[i].scale.x, this.model[i].scale.y, this.model[i].scale.z);
				this.gfx.rotateX(this.model[i].rotation.x);
				this.gfx.rotateY(this.model[i].rotation.y);
				this.gfx.rotateZ(this.model[i].rotation.z);
				//strokeWeight(10);
				if(this.model[i].texture)
					this.gfx.texture(this.model[i].texture);
				this.gfx.model(this.model[i]);
				//console.log(this.model[i])
				this.gfx.pop();
			}
	}
	if(this.text.length)
		for(i=0;i<this.text.length;i++)
			if(this.text[i].active)
			{
				this.gfx.push(); // Start a new drawing state
				this.gfx.fill(this.text[i].color.r,this.text[i].color.g,this.text[i].color.b,this.text[i].color.a);
				this.gfx.textFont(this.text[i].font);
				this.gfx.textSize(this.text[i].fontSize);
				this.gfx.textAlign(CENTER, CENTER);
				if(this.text[i].isUI)
				{
					this.gfx.text(this.text[i].string, this.text[i].position.x, this.text[i].y);
				}
				else
				{
					this.gfx.translate(this.text[i].position.x, this.text[i].position.y, this.text[i].position.z);
					this.gfx.scale(this.text[i].scale.x, this.text[i].scale.y, this.text[i].scale.z);
					this.gfx.rotate(this.text[i].rotation.x, this.text[i].rotation.y, this.text[i].rotation.z);
					this.gfx.text(this.text[i].string);
				}
				this.gfx.pop();
			}
	if(this.image.length)
		for(i=0;i<this.image.length;i++)
			if(this.image[i].active)
			{
				this.gfx.push(); // Start a new drawing state
				if(this.text[i].isUI)
				{
					this.gfx.image(this.image[i], this.image[i].position.x, this.image[i].position.y, this.image[i].scale.w, this.image[i].scale.h);
				}
				else
				{
					this.gfx.translate(this.image[i].position.x, this.image[i].position.y, this.image[i].position.z);
					this.gfx.rotate(this.image[i].rotation.x, this.image[i].rotation.y, this.image[i].rotation.z);
					this.gfx.texture(this.image[i]);
					this.gfx.plane(this.image[i].scale.w,this.image[i].scale.h);
				}
				this.gfx.pop();
			}
	if(this.shape.length)
		for(i=0;i<this.shape.length;i++)
			if(this.shape[i].active)
			{
				push(); // Start a new drawing state
				fill(this.shape[i].color.r,this.shape[i].color.g,this.shape[i].color.b,this.shape[i].color.a);
				this.shape[i].shape(this.shape[i].position.x, this.shape[i].position.y, this.shape[i].scale.w, this.shape[i].scale.h);
				pop();
			}
}

//------------------------------------------
//SISTEMA
//------------------------------------------

class Sistema
{
	title = "estado novo";
	screen = {w:windowWidth,h:windowHeight};
	vocabulary =
	{
		unplayable: ['wall','object','item','prop','door','furniture','tree','plant','other'],
		static: ['wall','door','tree'],
		free: ['plant','furniture','prop','item','object', ,'other'],
		none: ['appearence','ghost','visual','gas','effect','floor','tile'],
		living: ['player','creature','human']
	};
	file = {...rascunho.file};
	world = {...rascunho.world};
	render = {...rascunho.render};

	canvas;
	gfx;
	setup = function()
	{
		this.canvas = createCanvas(sistema.screen.w, sistema.screen.h, P2D);
		this.gfx = createGraphics(sistema.screen.w, sistema.screen.h, WEBGL);
		this.render.scene.gfx = this.gfx;
		this.render.scene.model.background = this.background;
		//this applies NEAREST for all images interpolation
		//for(let i=0;i<this.file.image.length;i++)
		//	this.gfx.getTexture(this.file.image[i]).setInterpolation(NEAREST, NEAREST);
		//perspective(PI / 3.0, sistema.screen.w / sistema.screen.h, 0.001, 1000);
		//this.gfx.ortho()
		this.gfx.background(255);
		this.gfx.frameRate(60);
		noCursor();
		frameRate(60);
		this.gfx.orbitControl();
		this.gfx.angleMode(DEGREES);
		this.render.scene.camera = this.gfx.createCamera();
		//this.render.scene.camera.setPosition(-8,-14,3);
		//this.render.scene.camera.lookAt(0, 0, 0);
	}
	constructor()
	{
		
	}
}