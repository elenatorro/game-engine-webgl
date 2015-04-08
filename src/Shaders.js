var Shaders = {
     "vertex" : {
      'type' : "x-shader/x-vertex",
       'content' : "const int NUM_LIGHTS =" + Lights.setNumLights() + ";\n"
        /* geometry */
        + "   attribute vec3 aVertexPosition;\n"
        + "   attribute vec3 aVertexNormal;\n"
        + "   attribute vec4 aVertexColor;\n"
        + "   attribute vec2 aVertexTextureCoords;\n"
        /* matrices */
        + "   uniform mat4 uMVMatrix;\n"
        + "   uniform mat4 uPMatrix;\n"
        + "   uniform mat4 uNMatrix;\n"
        /* lights */
        + "   uniform bool uTranslateLights;\n"
        + "   uniform vec3 uLightPosition[NUM_LIGHTS];\n"
        /* varyings */
        + "   varying vec3 vNormal;\n"
        + "   varying vec3 vLightRay[NUM_LIGHTS];\n"
        + "   varying vec3 vEye[NUM_LIGHTS];\n"
        + "   varying vec2 vTextureCoord;\n"

        + "   void main(void) {\n"

        + "        vec4 c = aVertexColor;\n"
        + "        vec4 vertex = uMVMatrix * vec4(aVertexPosition, 1.0);\n" //coordenadas de vista
        + "        vNormal = vec3(uNMatrix * vec4(aVertexNormal, 1.0));\n" //normal para la diferencia de vectores
        + "        vec4 lightPosition = vec4(0.0);\n"

        + "        if (uTranslateLights){ "
        + "            for(int i=0; i < NUM_LIGHTS; i++){ "
        + "              lightPosition =   uMVMatrix * vec4(uLightPosition[i], 1.0);\n"
        + "              vLightRay[i] = vertex.xyz - lightPosition.xyz;\n"
        + "              vEye[i] = -vec3(vertex.xyz);\n"
        + "            }\n"
        + "        }\n"

        + "        else {\n"
        + "           for(int i=0; i < NUM_LIGHTS; i++){\n"
        + "             lightPosition = vec4(uLightPosition[i], 1.0);\n"
        + "             vLightRay[i] = vertex.xyz - lightPosition.xyz;\n"
        + "             vEye[i] = -vec3(vertex.xyz);\n"
        + "           }\n"
        + "       }\n"
        + "       gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);\n" //pasa a 2D, multiplicando por el vertice original
        + "       vTextureCoord = aVertexTextureCoords;\n" //texturas
        + "   }\n"
  },

  "fragment" : {
    'type' : "x-shader/x-fragment",
    'content' : "#ifdef GL_ES\n"
  + "precision highp float;\n"
  + "#endif\n"

  //Light uniforms
  + "  const int NUM_LIGHTS =" + Lights.setNumLights() + ";\n"
  + "  uniform vec3  uLa[NUM_LIGHTS];\n"   //ambient
  + "  uniform vec3  uLd[NUM_LIGHTS];\n"   //diffuse
  + "  uniform vec3  uLs[NUM_LIGHTS];\n"   //specular
  + "  uniform vec3  uLightPosition[NUM_LIGHTS];\n"

   //Material uniforms
  + "  uniform vec3  uKa;\n"   //ambient
  + "  uniform vec3  uKd;\n"   //diffuse
  + "  uniform vec3  uKs;\n"   //specular
  + "  uniform float uNs;\n"   //specular coefficient
  + "  uniform float d;\n"    //Opacity
  + "  uniform int   illum;\n" //Illumination mode

  + "  uniform bool  uWireframe;\n" //wireframe
  + "  uniform bool  uTextures;\n" //wireframe
  + "  uniform sampler2D uSampler;\n" //texturas

  /* varying */
  + "  varying vec3 vNormal;\n"
  + "  varying vec3 vLightRay[NUM_LIGHTS];\n"
  + "  varying vec3 vEye[NUM_LIGHTS];\n"
  + "  varying vec2 vTextureCoord;\n"

  + "  float calculateAttenuation(in vec3 ray){\n"
  + "      float dist = length(ray);\n"
  + "      return (1.0 / (0.1 * dist));\n"
  + "  }\n"

  + "  void main(void) {\n"
  + "      if (uWireframe || illum == 0){\n"
  + "          gl_FragColor = vec4(uKd,d);\n"
  + "          return;\n"
  + "      }\n"

  + "     vec3 COLOR = vec3(0.0,0.0,0.0);\n"
  + "     vec3 N =  normalize(vNormal);\n"
  + "     vec3 L =  vec3(0.0,0.0,0.0);\n"
  + "     vec3 E =  vec3(0.0,0.0,0.0);\n"
  + "     vec3 R =  vec3(0.0,0.0,0.0);\n"
  + "     vec3 deltaRay = vec3(0.0);\n"
  + "     const int  lsize = 2;\n"
  + "     const float step = 0.25;\n"
  + "     const float inv_total = 1.0/((float(lsize*lsize) + 1.0)*(float(lsize*lsize) + 1.0));\n"  //how many deltaRays

  + "     float dx = 0.0;\n"
  + "     float dz = 0.0;\n"
  + "     float LT = 0.0;\n"

  + "     if (illum == 1){\n"
  + "          for(int i = 0; i < NUM_LIGHTS; i++){\n"
  + "              L = normalize(vLightRay[i]);\n"
  + "              N = normalize(vNormal);\n"
  + "              COLOR += (uLa[i] * uKa) + (uLd[i] * uKd * clamp(dot(N, -L),0.0,1.0));\n"
  + "          }\n"

  + "       if (uTextures){\n"
  + "         gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));\n"
  + "       } else {\n"
  + "         gl_FragColor =  vec4(COLOR,d);\n"
  + "       }\n"
  + "       return;\n"
  + "     }\n"

  + "     if (illum == 2){\n"
  + "          for(int i = 0; i < NUM_LIGHTS; i++){\n"

  + "              E = normalize(vEye[i]);\n"
  + "              L = normalize(vLightRay[i]);\n"
  + "              R = reflect(L, N);\n"
  + "              COLOR += (uLa[i] * uKa);\n"
  + "              COLOR += (uLd[i] * uKd * clamp(dot(N,-L),0.0,1.0));\n"// * calculateAttenuation(vLightRay[i]));
  + "              COLOR += (uLs[i] * uKs * pow( max(dot(R, E), 0.0), uNs) * 4.0);\n"
  + "          }\n"
  + "       if (uTextures){\n"
  + "         gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));\n"
  + "       } else {\n"
  + "         gl_FragColor = vec4(COLOR,d);\n"
  + "       }\n"
  + "       return;\n"
  + "     }\n"
  + "  }\n"
  }
}
