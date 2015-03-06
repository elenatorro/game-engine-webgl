var	Configuration = {

	getGLContext : function(name, width, height){
		var canvas  = document.getElementById(name);
		var context = null;

		if (canvas == null){
			alert('Hey! There is no canvas!');
			return null;
		} else {
			c_width  = canvas.width;
			c_height = canvas.height;
		}

		for (var i = 0; i < names.length; ++i) {
			try {
				context = canvas.getContext(names[i]);
			}
			catch(e) {}
				if (context) {
					break;
				}
		}

		if (context == null) {
			alert("Sorry! Not posible to initialize :(");
			return null;
		} else {
			return context;
		}
	},

	requestAnimFrame : function(o){
		requestAnimFrame(o);
	},

	//Triangles
  calculateNormals : function(vs, ind){
      var x=0;
      var y=1;
      var z=2;

      var ns = [];
      for(var i=0;i<vs.length;i=i+3){ //for each vertex, initialize normal x, normal y, normal z
          ns[i+x]=0.0;
          ns[i+y]=0.0;
          ns[i+z]=0.0;
      }

      for(var i=0;i<ind.length;i=i+3){
          var v1 = [];
          var v2 = [];
          var normal = [];
          //p2 - p1
          v1[x] = vs[3*ind[i+2]+x] - vs[3*ind[i+1]+x];
          v1[y] = vs[3*ind[i+2]+y] - vs[3*ind[i+1]+y];
          v1[z] = vs[3*ind[i+2]+z] - vs[3*ind[i+1]+z];
          //p0 - p1
          v2[x] = vs[3*ind[i]+x] - vs[3*ind[i+1]+x];
          v2[y] = vs[3*ind[i]+y] - vs[3*ind[i+1]+y];
          v2[z] = vs[3*ind[i]+z] - vs[3*ind[i+1]+z];
          normal[x] = v1[y]*v2[z] - v1[z]*v2[y];
          normal[y] = v1[z]*v2[x] - v1[x]*v2[z];
          normal[z] = v1[x]*v2[y] - v1[y]*v2[x];
          for(j=0;j<3;j++){ //suma de vectores
              ns[3*ind[i+j]+x] =  ns[3*ind[i+j]+x] + normal[x];
              ns[3*ind[i+j]+y] =  ns[3*ind[i+j]+y] + normal[y];
              ns[3*ind[i+j]+z] =  ns[3*ind[i+j]+z] + normal[z];
          }
      }
      //normalizacion
      for(var i=0;i<vs.length;i=i+3){

          var nn=[];
          nn[x] = ns[i+x];
          nn[y] = ns[i+y];
          nn[z] = ns[i+z];

          var len = Math.sqrt((nn[x]*nn[x])+(nn[y]*nn[y])+(nn[z]*nn[z]));
          if (len == 0) len = 1.0;

          nn[x] = nn[x]/len;
          nn[y] = nn[y]/len;
          nn[z] = nn[z]/len;

          ns[i+x] = nn[x];
          ns[i+y] = nn[y];
          ns[i+z] = nn[z];
      }

      return ns;
  },

    calculateTangents : function(vs, tc, ind){
        var i;
        var tangents = [];
        for(i=0;i<vs.length/3; i++){
            tangents[i]=[0, 0, 0];
        }


        var a = [0, 0, 0], b = [0, 0, 0];
        var triTangent = [0, 0, 0];
        for(i = 0; i < ind.length; i+=3) {
            var i0 = ind[i+0];
            var i1 = ind[i+1];
            var i2 = ind[i+2];

            var pos0 = [ vs[i0 * 3], vs[i0 * 3 + 1], vs[i0 * 3 + 2] ];
            var pos1 = [ vs[i1 * 3], vs[i1 * 3 + 1], vs[i1 * 3 + 2] ];
            var pos2 = [ vs[i2 * 3], vs[i2 * 3 + 1], vs[i2 * 3 + 2] ];

            var tex0 = [ tc[i0 * 2], tc[i0 * 2 + 1] ];
            var tex1 = [ tc[i1 * 2], tc[i1 * 2 + 1] ];
            var tex2 = [ tc[i2 * 2], tc[i2 * 2 + 1] ];

            vec3.subtract(pos1, pos0, a);
            vec3.subtract(pos2, pos0, b);

            var c2c1t = tex1[0] - tex0[0];
            var c2c1b = tex1[1] - tex0[1];
            var c3c1t = tex2[0] - tex0[0];
            var c3c1b = tex2[0] - tex0[1];

            triTangent = [c3c1b * a[0] - c2c1b * b[0], c3c1b * a[1] - c2c1b * b[1], c3c1b * a[2] - c2c1b * b[2]];

            vec3.add(tangents[i0], triTangent);
            vec3.add(tangents[i1], triTangent);
            vec3.add(tangents[i2], triTangent);
        }

        //normalizacion
        var ts = [];
        for(i=0;i<tangents.length; i++){
            var tan = tangents[i];
            vec3.normalize(tan);
            ts.push(tan[0]);
            ts.push(tan[1]);
            ts.push(tan[2]);
        }

        return ts;
    }
}
