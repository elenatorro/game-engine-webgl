'use strict';

var ShadersContent, exports;

ShadersContent = (function() {
  function ShadersContent() {
  }

  ShadersContent.prototype.vertexContent =
    'const int NUM_LIGHTS = 4;'+

    'attribute vec3 aVertexPosition;'+
    'attribute vec3 aVertexNormal;'+
    'attribute vec4 aVertexColor;'+

    'uniform mat4 uMVMatrix;'+
    'uniform mat4 uPMatrix;'+
    'uniform mat4 uNMatrix;'+

    'uniform bool uTranslateLights;'+
    'uniform vec3 uLightPosition[NUM_LIGHTS];'+


    'varying vec3 vNormal;'+
    'varying vec3 vLightRay[NUM_LIGHTS];'+
    'varying vec3 vEye[NUM_LIGHTS];'+

    'void main(void) {'+

    '     vec4 c = aVertexColor;'+
    '     vec4 vertex = uMVMatrix * vec4(aVertexPosition, 1.0);'+
    '     vNormal = vec3(uNMatrix * vec4(aVertexNormal, 1.0));'+
    '     vec4 lightPosition = vec4(0.0);'+

    '     if (uTranslateLights){'+
    '         for(int i=0; i < NUM_LIGHTS; i++){'+
    '           lightPosition =   uMVMatrix * vec4(uLightPosition[i], 1.0);'+
    '           vLightRay[i] = vertex.xyz - lightPosition.xyz;'+
    '           vEye[i] = -vec3(vertex.xyz);'+
    '         }'+
    '     }'+
    '     else {'+
    '        for(int i=0; i < NUM_LIGHTS; i++){'+
    '          lightPosition = vec4(uLightPosition[i], 1.0);'+
    '          vLightRay[i] = vertex.xyz - lightPosition.xyz;'+
    '          vEye[i] = -vec3(vertex.xyz);'+
    '        }'+
    '    }'+
    '    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);'+
    '}';

  ShadersContent.prototype.fragmentContent = 
    '#ifdef GL_ES'+
    'precision highp float;'+
    '#endif'+


    //Light uniforms
    'const int NUM_LIGHTS = 4;'+
    'uniform vec3  uLa[NUM_LIGHTS];'+   //ambient
    'uniform vec3  uLd[NUM_LIGHTS];'+   //diffuse
    'uniform vec3  uLs[NUM_LIGHTS];'+ //specular
    'uniform vec3 uLightPosition[NUM_LIGHTS];'+

    //Material uniforms
    'uniform vec3  uKa;'+   //ambient
    'uniform vec3  uKd;'+   //diffuse
    'uniform vec3  uKs;'+   //specular
    'uniform float uNs;'+   //specular coefficient
    'uniform float d;'+     //Opacity
    'uniform int   illum;'+ //Illumination mode


    'uniform bool  uWireframe;'+


    'varying vec3 vNormal;'+
    'varying vec3 vLightRay[NUM_LIGHTS];'+
    'varying vec3 vEye[NUM_LIGHTS];'+

    'float calculateAttenuation(in vec3 ray){'+
    '    float dist = length(ray);'+
    '    return (1.0 / (0.1 * dist));'+
    '}'+

    'void main(void) {'+
    '    if (uWireframe || illum == 0){'+
    '        gl_FragColor = vec4(uKd,d);'+
    '        return;'+
    '    }'+

    '   vec3 COLOR = vec3(0.0,0.0,0.0);'+
    '   vec3 N =  normalize(vNormal);'+
    '   vec3 L =  vec3(0.0,0.0,0.0);'+
    '   vec3 E =  vec3(0.0,0.0,0.0);'+
    '   vec3 R =  vec3(0.0,0.0,0.0);'+
    '   vec3 deltaRay = vec3(0.0);'+
    '   const int  lsize = 2;'+
    '   const float step = 0.25;'+
    '   const float inv_total = 1.0/((float(lsize*lsize) + 1.0)*(float(lsize*lsize) + 1.0));'+  //how many deltaRays

    '   float dx = 0.0;'+
    '   float dz = 0.0;'+
    '   float LT = 0.0;'+

    '   if (illum == 1){'+
    '        for(int i = 0; i < NUM_LIGHTS; i++){'+
    '            L = normalize(vLightRay[i]);'+
    '            N = normalize(vNormal);'+
    '            COLOR += (uLa[i] * uKa) + (uLd[i] * uKd * clamp(dot(N, -L),0.0,1.0));'+
    '        }'+
    '        gl_FragColor =  vec4(COLOR,d);'+
    '        return;'+
    '   }'+

    '   if (illum == 2){'+
    '        for(int i = 0; i < NUM_LIGHTS; i++){'+

    '            E = normalize(vEye[i]);'+
    '            L = normalize(vLightRay[i]);'+
    '            R = reflect(L, N);'+
    '            COLOR += (uLa[i] * uKa);'+
    '            COLOR += (uLd[i] * uKd * clamp(dot(N,-L),0.0,1.0));'+// * calculateAttenuation(vLightRay[i]));
    '            COLOR += (uLs[i] * uKs * pow( max(dot(R, E), 0.0), uNs) * 4.0);'+
    '        }'+
    '        gl_FragColor =  vec4(COLOR,d);'+
    '        return;'+
    '   }'+
    '}';

  return ShadersContent;
})();

exports = module.exports = ShadersContent;
