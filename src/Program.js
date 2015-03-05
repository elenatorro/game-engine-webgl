var Program = {
  //init Program
  attributeList : ["aVertexPosition", "aVertexNormal", "aVertexColor"],
  uniformList   : [	"uPMatrix", "uMVMatrix", "uNMatrix", "uLightPosition", "uWireframe",
                    "uLa", "uLd", "uLs", "uKa", "uKd", "uKs", "uNs", "d", "illum", "uTranslateLights"
                  ],

    getShader : function(gl, id) {
        var str  = Shaders[id]['content'];
        var type = Shaders[id]['type'];

        var shader, message;
        if (type == "x-shader/x-fragment") {
            shader = gl.createShader(gl.FRAGMENT_SHADER);
            message = 'Fragment Shader';
        } else if (type == "x-shader/x-vertex") {
            shader = gl.createShader(gl.VERTEX_SHADER);
            message = 'Vertex Shader';
        } else {
            return null;
        }


        gl.shaderSource(shader, str);
        gl.compileShader(shader);


        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            alert('There was a problem with the ' + message +':\n\n'+ gl.getShaderInfoLog(shader));
            return null;
        }
        return shader;
    },

    load : function() {
     var fragmentShader          = Program.getShader(gl, "fragment");
     var vertexShader            = Program.getShader(gl, "vertex");

     prg = gl.createProgram();
     gl.attachShader(prg, vertexShader);
     gl.attachShader(prg, fragmentShader);

     //taken from https://developer.mozilla.org/en-US/docs/Web/WebGL/WebGL_best_practices (!)
     gl.bindAttribLocation(prg, 0 , "aVertexPosition");
     gl.linkProgram(prg);

     if (!gl.getProgramParameter(prg, gl.LINK_STATUS)) {
      alert("Could not initialise shaders");
     }

     gl.useProgram(prg);
     gl.enableVertexAttribArray(0);

  	 this.setAttributeLocations(this.attributeList);
  	 this.setUniformLocations(this.uniformList);
    },

	setAttributeLocations: function (attrList){

		for(var i=0, max = attrList.length; i <max; i+=1){
			this[attrList[i]] = gl.getAttribLocation(prg, attrList[i]);
		}

	},

	setUniformLocations: function (uniformList){

		for(var i=0, max = uniformList.length; i < max; i +=1){
			this[uniformList[i]] = gl.getUniformLocation(prg, uniformList[i]);
		}
	},

    getUniform: function (uniformLocation){
        return gl.getUniform(prg, uniformLocation);
    }
};
