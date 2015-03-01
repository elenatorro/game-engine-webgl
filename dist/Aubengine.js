// gl-matrix 1.2.4 - https://github.com/toji/gl-matrix/blob/master/LICENSE.md
(function(a){a.glMatrixArrayType=a.MatrixArray=null;a.vec3={};a.mat3={};a.mat4={};a.quat4={};a.setMatrixArrayType=function(a){return glMatrixArrayType=MatrixArray=a};a.determineMatrixArrayType=function(){return setMatrixArrayType("undefined"!==typeof Float32Array?Float32Array:Array)};determineMatrixArrayType()})("undefined"!=typeof exports?global:this);vec3.create=function(a){var b=new MatrixArray(3);a?(b[0]=a[0],b[1]=a[1],b[2]=a[2]):b[0]=b[1]=b[2]=0;return b};
vec3.set=function(a,b){b[0]=a[0];b[1]=a[1];b[2]=a[2];return b};vec3.add=function(a,b,c){if(!c||a===c)return a[0]+=b[0],a[1]+=b[1],a[2]+=b[2],a;c[0]=a[0]+b[0];c[1]=a[1]+b[1];c[2]=a[2]+b[2];return c};vec3.subtract=function(a,b,c){if(!c||a===c)return a[0]-=b[0],a[1]-=b[1],a[2]-=b[2],a;c[0]=a[0]-b[0];c[1]=a[1]-b[1];c[2]=a[2]-b[2];return c};vec3.multiply=function(a,b,c){if(!c||a===c)return a[0]*=b[0],a[1]*=b[1],a[2]*=b[2],a;c[0]=a[0]*b[0];c[1]=a[1]*b[1];c[2]=a[2]*b[2];return c};
vec3.negate=function(a,b){b||(b=a);b[0]=-a[0];b[1]=-a[1];b[2]=-a[2];return b};vec3.scale=function(a,b,c){if(!c||a===c)return a[0]*=b,a[1]*=b,a[2]*=b,a;c[0]=a[0]*b;c[1]=a[1]*b;c[2]=a[2]*b;return c};vec3.normalize=function(a,b){b||(b=a);var c=a[0],d=a[1],e=a[2],g=Math.sqrt(c*c+d*d+e*e);if(g){if(1===g)return b[0]=c,b[1]=d,b[2]=e,b}else return b[0]=0,b[1]=0,b[2]=0,b;g=1/g;b[0]=c*g;b[1]=d*g;b[2]=e*g;return b};
vec3.cross=function(a,b,c){c||(c=a);var d=a[0],e=a[1],a=a[2],g=b[0],f=b[1],b=b[2];c[0]=e*b-a*f;c[1]=a*g-d*b;c[2]=d*f-e*g;return c};vec3.length=function(a){var b=a[0],c=a[1],a=a[2];return Math.sqrt(b*b+c*c+a*a)};vec3.dot=function(a,b){return a[0]*b[0]+a[1]*b[1]+a[2]*b[2]};vec3.direction=function(a,b,c){c||(c=a);var d=a[0]-b[0],e=a[1]-b[1],a=a[2]-b[2],b=Math.sqrt(d*d+e*e+a*a);if(!b)return c[0]=0,c[1]=0,c[2]=0,c;b=1/b;c[0]=d*b;c[1]=e*b;c[2]=a*b;return c};
vec3.lerp=function(a,b,c,d){d||(d=a);d[0]=a[0]+c*(b[0]-a[0]);d[1]=a[1]+c*(b[1]-a[1]);d[2]=a[2]+c*(b[2]-a[2]);return d};vec3.dist=function(a,b){var c=b[0]-a[0],d=b[1]-a[1],e=b[2]-a[2];return Math.sqrt(c*c+d*d+e*e)};
vec3.unproject=function(a,b,c,d,e){e||(e=a);var g=mat4.create(),f=new MatrixArray(4);f[0]=2*(a[0]-d[0])/d[2]-1;f[1]=2*(a[1]-d[1])/d[3]-1;f[2]=2*a[2]-1;f[3]=1;mat4.multiply(c,b,g);if(!mat4.inverse(g))return null;mat4.multiplyVec4(g,f);if(0===f[3])return null;e[0]=f[0]/f[3];e[1]=f[1]/f[3];e[2]=f[2]/f[3];return e};vec3.str=function(a){return"["+a[0]+", "+a[1]+", "+a[2]+"]"};
mat3.create=function(a){var b=new MatrixArray(9);a&&(b[0]=a[0],b[1]=a[1],b[2]=a[2],b[3]=a[3],b[4]=a[4],b[5]=a[5],b[6]=a[6],b[7]=a[7],b[8]=a[8]);return b};mat3.set=function(a,b){b[0]=a[0];b[1]=a[1];b[2]=a[2];b[3]=a[3];b[4]=a[4];b[5]=a[5];b[6]=a[6];b[7]=a[7];b[8]=a[8];return b};mat3.identity=function(a){a||(a=mat3.create());a[0]=1;a[1]=0;a[2]=0;a[3]=0;a[4]=1;a[5]=0;a[6]=0;a[7]=0;a[8]=1;return a};
mat3.transpose=function(a,b){if(!b||a===b){var c=a[1],d=a[2],e=a[5];a[1]=a[3];a[2]=a[6];a[3]=c;a[5]=a[7];a[6]=d;a[7]=e;return a}b[0]=a[0];b[1]=a[3];b[2]=a[6];b[3]=a[1];b[4]=a[4];b[5]=a[7];b[6]=a[2];b[7]=a[5];b[8]=a[8];return b};mat3.toMat4=function(a,b){b||(b=mat4.create());b[15]=1;b[14]=0;b[13]=0;b[12]=0;b[11]=0;b[10]=a[8];b[9]=a[7];b[8]=a[6];b[7]=0;b[6]=a[5];b[5]=a[4];b[4]=a[3];b[3]=0;b[2]=a[2];b[1]=a[1];b[0]=a[0];return b};
mat3.str=function(a){return"["+a[0]+", "+a[1]+", "+a[2]+", "+a[3]+", "+a[4]+", "+a[5]+", "+a[6]+", "+a[7]+", "+a[8]+"]"};mat4.create=function(a){var b=new MatrixArray(16);a&&(b[0]=a[0],b[1]=a[1],b[2]=a[2],b[3]=a[3],b[4]=a[4],b[5]=a[5],b[6]=a[6],b[7]=a[7],b[8]=a[8],b[9]=a[9],b[10]=a[10],b[11]=a[11],b[12]=a[12],b[13]=a[13],b[14]=a[14],b[15]=a[15]);return b};
mat4.set=function(a,b){b[0]=a[0];b[1]=a[1];b[2]=a[2];b[3]=a[3];b[4]=a[4];b[5]=a[5];b[6]=a[6];b[7]=a[7];b[8]=a[8];b[9]=a[9];b[10]=a[10];b[11]=a[11];b[12]=a[12];b[13]=a[13];b[14]=a[14];b[15]=a[15];return b};mat4.identity=function(a){a||(a=mat4.create());a[0]=1;a[1]=0;a[2]=0;a[3]=0;a[4]=0;a[5]=1;a[6]=0;a[7]=0;a[8]=0;a[9]=0;a[10]=1;a[11]=0;a[12]=0;a[13]=0;a[14]=0;a[15]=1;return a};
mat4.transpose=function(a,b){if(!b||a===b){var c=a[1],d=a[2],e=a[3],g=a[6],f=a[7],h=a[11];a[1]=a[4];a[2]=a[8];a[3]=a[12];a[4]=c;a[6]=a[9];a[7]=a[13];a[8]=d;a[9]=g;a[11]=a[14];a[12]=e;a[13]=f;a[14]=h;return a}b[0]=a[0];b[1]=a[4];b[2]=a[8];b[3]=a[12];b[4]=a[1];b[5]=a[5];b[6]=a[9];b[7]=a[13];b[8]=a[2];b[9]=a[6];b[10]=a[10];b[11]=a[14];b[12]=a[3];b[13]=a[7];b[14]=a[11];b[15]=a[15];return b};
mat4.determinant=function(a){var b=a[0],c=a[1],d=a[2],e=a[3],g=a[4],f=a[5],h=a[6],i=a[7],j=a[8],k=a[9],l=a[10],n=a[11],o=a[12],m=a[13],p=a[14],a=a[15];return o*k*h*e-j*m*h*e-o*f*l*e+g*m*l*e+j*f*p*e-g*k*p*e-o*k*d*i+j*m*d*i+o*c*l*i-b*m*l*i-j*c*p*i+b*k*p*i+o*f*d*n-g*m*d*n-o*c*h*n+b*m*h*n+g*c*p*n-b*f*p*n-j*f*d*a+g*k*d*a+j*c*h*a-b*k*h*a-g*c*l*a+b*f*l*a};
mat4.inverse=function(a,b){b||(b=a);var c=a[0],d=a[1],e=a[2],g=a[3],f=a[4],h=a[5],i=a[6],j=a[7],k=a[8],l=a[9],n=a[10],o=a[11],m=a[12],p=a[13],r=a[14],s=a[15],A=c*h-d*f,B=c*i-e*f,t=c*j-g*f,u=d*i-e*h,v=d*j-g*h,w=e*j-g*i,x=k*p-l*m,y=k*r-n*m,z=k*s-o*m,C=l*r-n*p,D=l*s-o*p,E=n*s-o*r,q=A*E-B*D+t*C+u*z-v*y+w*x;if(!q)return null;q=1/q;b[0]=(h*E-i*D+j*C)*q;b[1]=(-d*E+e*D-g*C)*q;b[2]=(p*w-r*v+s*u)*q;b[3]=(-l*w+n*v-o*u)*q;b[4]=(-f*E+i*z-j*y)*q;b[5]=(c*E-e*z+g*y)*q;b[6]=(-m*w+r*t-s*B)*q;b[7]=(k*w-n*t+o*B)*q;b[8]=
(f*D-h*z+j*x)*q;b[9]=(-c*D+d*z-g*x)*q;b[10]=(m*v-p*t+s*A)*q;b[11]=(-k*v+l*t-o*A)*q;b[12]=(-f*C+h*y-i*x)*q;b[13]=(c*C-d*y+e*x)*q;b[14]=(-m*u+p*B-r*A)*q;b[15]=(k*u-l*B+n*A)*q;return b};mat4.toRotationMat=function(a,b){b||(b=mat4.create());b[0]=a[0];b[1]=a[1];b[2]=a[2];b[3]=a[3];b[4]=a[4];b[5]=a[5];b[6]=a[6];b[7]=a[7];b[8]=a[8];b[9]=a[9];b[10]=a[10];b[11]=a[11];b[12]=0;b[13]=0;b[14]=0;b[15]=1;return b};
mat4.toMat3=function(a,b){b||(b=mat3.create());b[0]=a[0];b[1]=a[1];b[2]=a[2];b[3]=a[4];b[4]=a[5];b[5]=a[6];b[6]=a[8];b[7]=a[9];b[8]=a[10];return b};mat4.toInverseMat3=function(a,b){var c=a[0],d=a[1],e=a[2],g=a[4],f=a[5],h=a[6],i=a[8],j=a[9],k=a[10],l=k*f-h*j,n=-k*g+h*i,o=j*g-f*i,m=c*l+d*n+e*o;if(!m)return null;m=1/m;b||(b=mat3.create());b[0]=l*m;b[1]=(-k*d+e*j)*m;b[2]=(h*d-e*f)*m;b[3]=n*m;b[4]=(k*c-e*i)*m;b[5]=(-h*c+e*g)*m;b[6]=o*m;b[7]=(-j*c+d*i)*m;b[8]=(f*c-d*g)*m;return b};
mat4.multiply=function(a,b,c){c||(c=a);var d=a[0],e=a[1],g=a[2],f=a[3],h=a[4],i=a[5],j=a[6],k=a[7],l=a[8],n=a[9],o=a[10],m=a[11],p=a[12],r=a[13],s=a[14],a=a[15],A=b[0],B=b[1],t=b[2],u=b[3],v=b[4],w=b[5],x=b[6],y=b[7],z=b[8],C=b[9],D=b[10],E=b[11],q=b[12],F=b[13],G=b[14],b=b[15];c[0]=A*d+B*h+t*l+u*p;c[1]=A*e+B*i+t*n+u*r;c[2]=A*g+B*j+t*o+u*s;c[3]=A*f+B*k+t*m+u*a;c[4]=v*d+w*h+x*l+y*p;c[5]=v*e+w*i+x*n+y*r;c[6]=v*g+w*j+x*o+y*s;c[7]=v*f+w*k+x*m+y*a;c[8]=z*d+C*h+D*l+E*p;c[9]=z*e+C*i+D*n+E*r;c[10]=z*g+C*
j+D*o+E*s;c[11]=z*f+C*k+D*m+E*a;c[12]=q*d+F*h+G*l+b*p;c[13]=q*e+F*i+G*n+b*r;c[14]=q*g+F*j+G*o+b*s;c[15]=q*f+F*k+G*m+b*a;return c};mat4.multiplyVec3=function(a,b,c){c||(c=b);var d=b[0],e=b[1],b=b[2];c[0]=a[0]*d+a[4]*e+a[8]*b+a[12];c[1]=a[1]*d+a[5]*e+a[9]*b+a[13];c[2]=a[2]*d+a[6]*e+a[10]*b+a[14];return c};
mat4.multiplyVec4=function(a,b,c){c||(c=b);var d=b[0],e=b[1],g=b[2],b=b[3];c[0]=a[0]*d+a[4]*e+a[8]*g+a[12]*b;c[1]=a[1]*d+a[5]*e+a[9]*g+a[13]*b;c[2]=a[2]*d+a[6]*e+a[10]*g+a[14]*b;c[3]=a[3]*d+a[7]*e+a[11]*g+a[15]*b;return c};
mat4.translate=function(a,b,c){var d=b[0],e=b[1],b=b[2],g,f,h,i,j,k,l,n,o,m,p,r;if(!c||a===c)return a[12]=a[0]*d+a[4]*e+a[8]*b+a[12],a[13]=a[1]*d+a[5]*e+a[9]*b+a[13],a[14]=a[2]*d+a[6]*e+a[10]*b+a[14],a[15]=a[3]*d+a[7]*e+a[11]*b+a[15],a;g=a[0];f=a[1];h=a[2];i=a[3];j=a[4];k=a[5];l=a[6];n=a[7];o=a[8];m=a[9];p=a[10];r=a[11];c[0]=g;c[1]=f;c[2]=h;c[3]=i;c[4]=j;c[5]=k;c[6]=l;c[7]=n;c[8]=o;c[9]=m;c[10]=p;c[11]=r;c[12]=g*d+j*e+o*b+a[12];c[13]=f*d+k*e+m*b+a[13];c[14]=h*d+l*e+p*b+a[14];c[15]=i*d+n*e+r*b+a[15];
return c};mat4.scale=function(a,b,c){var d=b[0],e=b[1],b=b[2];if(!c||a===c)return a[0]*=d,a[1]*=d,a[2]*=d,a[3]*=d,a[4]*=e,a[5]*=e,a[6]*=e,a[7]*=e,a[8]*=b,a[9]*=b,a[10]*=b,a[11]*=b,a;c[0]=a[0]*d;c[1]=a[1]*d;c[2]=a[2]*d;c[3]=a[3]*d;c[4]=a[4]*e;c[5]=a[5]*e;c[6]=a[6]*e;c[7]=a[7]*e;c[8]=a[8]*b;c[9]=a[9]*b;c[10]=a[10]*b;c[11]=a[11]*b;c[12]=a[12];c[13]=a[13];c[14]=a[14];c[15]=a[15];return c};
mat4.rotate=function(a,b,c,d){var e=c[0],g=c[1],c=c[2],f=Math.sqrt(e*e+g*g+c*c),h,i,j,k,l,n,o,m,p,r,s,A,B,t,u,v,w,x,y,z;if(!f)return null;1!==f&&(f=1/f,e*=f,g*=f,c*=f);h=Math.sin(b);i=Math.cos(b);j=1-i;b=a[0];f=a[1];k=a[2];l=a[3];n=a[4];o=a[5];m=a[6];p=a[7];r=a[8];s=a[9];A=a[10];B=a[11];t=e*e*j+i;u=g*e*j+c*h;v=c*e*j-g*h;w=e*g*j-c*h;x=g*g*j+i;y=c*g*j+e*h;z=e*c*j+g*h;e=g*c*j-e*h;g=c*c*j+i;d?a!==d&&(d[12]=a[12],d[13]=a[13],d[14]=a[14],d[15]=a[15]):d=a;d[0]=b*t+n*u+r*v;d[1]=f*t+o*u+s*v;d[2]=k*t+m*u+A*
v;d[3]=l*t+p*u+B*v;d[4]=b*w+n*x+r*y;d[5]=f*w+o*x+s*y;d[6]=k*w+m*x+A*y;d[7]=l*w+p*x+B*y;d[8]=b*z+n*e+r*g;d[9]=f*z+o*e+s*g;d[10]=k*z+m*e+A*g;d[11]=l*z+p*e+B*g;return d};mat4.rotateX=function(a,b,c){var d=Math.sin(b),b=Math.cos(b),e=a[4],g=a[5],f=a[6],h=a[7],i=a[8],j=a[9],k=a[10],l=a[11];c?a!==c&&(c[0]=a[0],c[1]=a[1],c[2]=a[2],c[3]=a[3],c[12]=a[12],c[13]=a[13],c[14]=a[14],c[15]=a[15]):c=a;c[4]=e*b+i*d;c[5]=g*b+j*d;c[6]=f*b+k*d;c[7]=h*b+l*d;c[8]=e*-d+i*b;c[9]=g*-d+j*b;c[10]=f*-d+k*b;c[11]=h*-d+l*b;return c};
mat4.rotateY=function(a,b,c){var d=Math.sin(b),b=Math.cos(b),e=a[0],g=a[1],f=a[2],h=a[3],i=a[8],j=a[9],k=a[10],l=a[11];c?a!==c&&(c[4]=a[4],c[5]=a[5],c[6]=a[6],c[7]=a[7],c[12]=a[12],c[13]=a[13],c[14]=a[14],c[15]=a[15]):c=a;c[0]=e*b+i*-d;c[1]=g*b+j*-d;c[2]=f*b+k*-d;c[3]=h*b+l*-d;c[8]=e*d+i*b;c[9]=g*d+j*b;c[10]=f*d+k*b;c[11]=h*d+l*b;return c};
mat4.rotateZ=function(a,b,c){var d=Math.sin(b),b=Math.cos(b),e=a[0],g=a[1],f=a[2],h=a[3],i=a[4],j=a[5],k=a[6],l=a[7];c?a!==c&&(c[8]=a[8],c[9]=a[9],c[10]=a[10],c[11]=a[11],c[12]=a[12],c[13]=a[13],c[14]=a[14],c[15]=a[15]):c=a;c[0]=e*b+i*d;c[1]=g*b+j*d;c[2]=f*b+k*d;c[3]=h*b+l*d;c[4]=e*-d+i*b;c[5]=g*-d+j*b;c[6]=f*-d+k*b;c[7]=h*-d+l*b;return c};
mat4.frustum=function(a,b,c,d,e,g,f){f||(f=mat4.create());var h=b-a,i=d-c,j=g-e;f[0]=2*e/h;f[1]=0;f[2]=0;f[3]=0;f[4]=0;f[5]=2*e/i;f[6]=0;f[7]=0;f[8]=(b+a)/h;f[9]=(d+c)/i;f[10]=-(g+e)/j;f[11]=-1;f[12]=0;f[13]=0;f[14]=-(2*g*e)/j;f[15]=0;return f};mat4.perspective=function(a,b,c,d,e){a=c*Math.tan(a*Math.PI/360);b*=a;return mat4.frustum(-b,b,-a,a,c,d,e)};
mat4.ortho=function(a,b,c,d,e,g,f){f||(f=mat4.create());var h=b-a,i=d-c,j=g-e;f[0]=2/h;f[1]=0;f[2]=0;f[3]=0;f[4]=0;f[5]=2/i;f[6]=0;f[7]=0;f[8]=0;f[9]=0;f[10]=-2/j;f[11]=0;f[12]=-(a+b)/h;f[13]=-(d+c)/i;f[14]=-(g+e)/j;f[15]=1;return f};
mat4.lookAt=function(a,b,c,d){d||(d=mat4.create());var e,g,f,h,i,j,k,l,n=a[0],o=a[1],a=a[2];f=c[0];h=c[1];g=c[2];k=b[0];c=b[1];e=b[2];if(n===k&&o===c&&a===e)return mat4.identity(d);b=n-k;c=o-c;k=a-e;l=1/Math.sqrt(b*b+c*c+k*k);b*=l;c*=l;k*=l;e=h*k-g*c;g=g*b-f*k;f=f*c-h*b;(l=Math.sqrt(e*e+g*g+f*f))?(l=1/l,e*=l,g*=l,f*=l):f=g=e=0;h=c*f-k*g;i=k*e-b*f;j=b*g-c*e;(l=Math.sqrt(h*h+i*i+j*j))?(l=1/l,h*=l,i*=l,j*=l):j=i=h=0;d[0]=e;d[1]=h;d[2]=b;d[3]=0;d[4]=g;d[5]=i;d[6]=c;d[7]=0;d[8]=f;d[9]=j;d[10]=k;d[11]=
0;d[12]=-(e*n+g*o+f*a);d[13]=-(h*n+i*o+j*a);d[14]=-(b*n+c*o+k*a);d[15]=1;return d};mat4.fromRotationTranslation=function(a,b,c){c||(c=mat4.create());var d=a[0],e=a[1],g=a[2],f=a[3],h=d+d,i=e+e,j=g+g,a=d*h,k=d*i,d=d*j,l=e*i,e=e*j,g=g*j,h=f*h,i=f*i,f=f*j;c[0]=1-(l+g);c[1]=k+f;c[2]=d-i;c[3]=0;c[4]=k-f;c[5]=1-(a+g);c[6]=e+h;c[7]=0;c[8]=d+i;c[9]=e-h;c[10]=1-(a+l);c[11]=0;c[12]=b[0];c[13]=b[1];c[14]=b[2];c[15]=1;return c};
mat4.str=function(a){return"["+a[0]+", "+a[1]+", "+a[2]+", "+a[3]+", "+a[4]+", "+a[5]+", "+a[6]+", "+a[7]+", "+a[8]+", "+a[9]+", "+a[10]+", "+a[11]+", "+a[12]+", "+a[13]+", "+a[14]+", "+a[15]+"]"};quat4.create=function(a){var b=new MatrixArray(4);a&&(b[0]=a[0],b[1]=a[1],b[2]=a[2],b[3]=a[3]);return b};quat4.set=function(a,b){b[0]=a[0];b[1]=a[1];b[2]=a[2];b[3]=a[3];return b};
quat4.calculateW=function(a,b){var c=a[0],d=a[1],e=a[2];if(!b||a===b)return a[3]=-Math.sqrt(Math.abs(1-c*c-d*d-e*e)),a;b[0]=c;b[1]=d;b[2]=e;b[3]=-Math.sqrt(Math.abs(1-c*c-d*d-e*e));return b};quat4.dot=function(a,b){return a[0]*b[0]+a[1]*b[1]+a[2]*b[2]+a[3]*b[3]};quat4.inverse=function(a,b){var c=a[0],d=a[1],e=a[2],g=a[3],c=(c=c*c+d*d+e*e+g*g)?1/c:0;if(!b||a===b)return a[0]*=-c,a[1]*=-c,a[2]*=-c,a[3]*=c,a;b[0]=-a[0]*c;b[1]=-a[1]*c;b[2]=-a[2]*c;b[3]=a[3]*c;return b};
quat4.conjugate=function(a,b){if(!b||a===b)return a[0]*=-1,a[1]*=-1,a[2]*=-1,a;b[0]=-a[0];b[1]=-a[1];b[2]=-a[2];b[3]=a[3];return b};quat4.length=function(a){var b=a[0],c=a[1],d=a[2],a=a[3];return Math.sqrt(b*b+c*c+d*d+a*a)};quat4.normalize=function(a,b){b||(b=a);var c=a[0],d=a[1],e=a[2],g=a[3],f=Math.sqrt(c*c+d*d+e*e+g*g);if(0===f)return b[0]=0,b[1]=0,b[2]=0,b[3]=0,b;f=1/f;b[0]=c*f;b[1]=d*f;b[2]=e*f;b[3]=g*f;return b};
quat4.multiply=function(a,b,c){c||(c=a);var d=a[0],e=a[1],g=a[2],a=a[3],f=b[0],h=b[1],i=b[2],b=b[3];c[0]=d*b+a*f+e*i-g*h;c[1]=e*b+a*h+g*f-d*i;c[2]=g*b+a*i+d*h-e*f;c[3]=a*b-d*f-e*h-g*i;return c};quat4.multiplyVec3=function(a,b,c){c||(c=b);var d=b[0],e=b[1],g=b[2],b=a[0],f=a[1],h=a[2],a=a[3],i=a*d+f*g-h*e,j=a*e+h*d-b*g,k=a*g+b*e-f*d,d=-b*d-f*e-h*g;c[0]=i*a+d*-b+j*-h-k*-f;c[1]=j*a+d*-f+k*-b-i*-h;c[2]=k*a+d*-h+i*-f-j*-b;return c};
quat4.toMat3=function(a,b){b||(b=mat3.create());var c=a[0],d=a[1],e=a[2],g=a[3],f=c+c,h=d+d,i=e+e,j=c*f,k=c*h,c=c*i,l=d*h,d=d*i,e=e*i,f=g*f,h=g*h,g=g*i;b[0]=1-(l+e);b[1]=k+g;b[2]=c-h;b[3]=k-g;b[4]=1-(j+e);b[5]=d+f;b[6]=c+h;b[7]=d-f;b[8]=1-(j+l);return b};
quat4.toMat4=function(a,b){b||(b=mat4.create());var c=a[0],d=a[1],e=a[2],g=a[3],f=c+c,h=d+d,i=e+e,j=c*f,k=c*h,c=c*i,l=d*h,d=d*i,e=e*i,f=g*f,h=g*h,g=g*i;b[0]=1-(l+e);b[1]=k+g;b[2]=c-h;b[3]=0;b[4]=k-g;b[5]=1-(j+e);b[6]=d+f;b[7]=0;b[8]=c+h;b[9]=d-f;b[10]=1-(j+l);b[11]=0;b[12]=0;b[13]=0;b[14]=0;b[15]=1;return b};
quat4.slerp=function(a,b,c,d){d||(d=a);var e=a[0]*b[0]+a[1]*b[1]+a[2]*b[2]+a[3]*b[3],g,f;if(1<=Math.abs(e))return d!==a&&(d[0]=a[0],d[1]=a[1],d[2]=a[2],d[3]=a[3]),d;g=Math.acos(e);f=Math.sqrt(1-e*e);if(0.001>Math.abs(f))return d[0]=0.5*a[0]+0.5*b[0],d[1]=0.5*a[1]+0.5*b[1],d[2]=0.5*a[2]+0.5*b[2],d[3]=0.5*a[3]+0.5*b[3],d;e=Math.sin((1-c)*g)/f;c=Math.sin(c*g)/f;d[0]=a[0]*e+b[0]*c;d[1]=a[1]*e+b[1]*c;d[2]=a[2]*e+b[2]*c;d[3]=a[3]*e+b[3]*c;return d};
quat4.str=function(a){return"["+a[0]+", "+a[1]+", "+a[2]+", "+a[3]+"]"};

var K3D = {};

K3D.load = function(path, resp)
{
	var request = new XMLHttpRequest();
	request.open("GET", path, true);
	request.responseType = "arraybuffer";
	request.onload = function(e){resp(e.target.response);};
	request.send();
}

K3D.save = function(buff, path)
{
	var dataURI = "data:application/octet-stream;base64," + btoa(K3D.parse._buffToStr(buff));
	window.location.href = dataURI;
}

K3D.clone = function(o)
{
	return JSON.parse(JSON.stringify(o));
}



K3D.bin = {};

K3D.bin.f  = new Float32Array(1);
K3D.bin.fb = new Uint8Array(K3D.bin.f.buffer);

K3D.bin.rf		= function(buff, off) { var f = K3D.bin.f, fb = K3D.bin.fb; for(var i=0; i<4; i++) fb[i] = buff[off+i]; return f[0]; }
K3D.bin.rsl		= function(buff, off) { return buff[off] | buff[off+1]<<8; }
K3D.bin.ril		= function(buff, off) { return buff[off] | buff[off+1]<<8 | buff[off+2]<<16 | buff[off+3]<<24; }
K3D.bin.rASCII0 = function(buff, off) { var s = ""; while(buff[off]!=0) s += String.fromCharCode(buff[off++]); return s; }


K3D.bin.wf		= function(buff, off, v) { var f=new Float32Array(buff.buffer, off, 1); f[0]=v; }
K3D.bin.wsl		= function(buff, off, v) { buff[off]=v; buff[off+1]=v>>8; }
K3D.bin.wil		= function(buff, off, v) { buff[off]=v; buff[off+1]=v>>8; buff[off+2]=v>>16; buff[off+3]>>24; }
K3D.parse = {};

K3D.parse._buffToStr = function(buff)
{
	var a = new Uint8Array(buff);
	var s = "";
	for(var i=0; i<a.length; i++) s = s.concat(String.fromCharCode(a[i]));
	return s;
}

K3D.parse._strToBuff = function(str)
{
  var buf = new ArrayBuffer(str.length);
  var bufView = new Uint8Array(buf);
  for (var i=0; i<str.length; i++) bufView[i] = str.charCodeAt(i);
  return buf;
}

K3D.parse._readLine = function(a, off)	// Uint8Array, offset
{
	var s = "";
	while(a[off] != 10) s += String.fromCharCode(a[off++]);
	return s;
}
K3D.parse.fromJSON = function(buff)
{
	var json = JSON.parse(K3D.parse._buffToStr(buff));
	return json;
}

K3D.parse.toJSON = function(object)
{
	var str = JSON.stringify(object);
	return K3D.parse._strToBuff(str);
}

K3D.parse.fromOBJ = function(buff)
{
	var res = {};
	res.groups = {};

	res.c_verts = [];
	res.c_uvt	= [];
	res.c_norms = [];

	res.i_verts = [];
	res.i_uvt   = [];
	res.i_norms = [];

	var cg = {from: 0, to:0};	// current group
	var off = 0;
	var a = new Uint8Array(buff);

	while(off < a.length)
	{
		var line = K3D.parse._readLine(a, off);
		off += line.length + 1;
		line = line.replace(/ +(?= )/g,'');
		line = line.replace(/(^\s+|\s+$)/g, '');
		var cds = line.split(" ");
		if(cds[0] == "g")
		{
			cg.to = res.i_verts.length;
			if(res.groups[cds[1]] == null) res.groups[cds[1]] = {from:res.i_verts.length, to:0};
			cg = res.groups[cds[1]];
		}
		if(cds[0] == "v")
		{
			var x = parseFloat(cds[1]);
			var y = parseFloat(cds[2]);
			var z = parseFloat(cds[3]);
			res.c_verts.push(x,y,z);
		}
		if(cds[0] == "vt")
		{
			var x = parseFloat(cds[1]);
			var y = 1-parseFloat(cds[2]);
			res.c_uvt.push(x,y);
		}
		if(cds[0] == "vn")
		{
			var x = parseFloat(cds[1]);
			var y = parseFloat(cds[2]);
			var z = parseFloat(cds[3]);
			res.c_norms.push(x,y,z);
		}
		if(cds[0] == "f")
		{
			var v0a = cds[1].split("/"), v1a = cds[2].split("/"), v2a = cds[3].split("/");
			var vi0 = parseInt(v0a[0])-1, vi1 = parseInt(v1a[0])-1, vi2 = parseInt(v2a[0])-1;
			var ui0 = parseInt(v0a[1])-1, ui1 = parseInt(v1a[1])-1, ui2 = parseInt(v2a[1])-1;
			var ni0 = parseInt(v0a[2])-1, ni1 = parseInt(v1a[2])-1, ni2 = parseInt(v2a[2])-1;

			var vlen = res.c_verts.length/3, ulen = res.c_uvt.length/2, nlen = res.c_norms.length/3;
			if(vi0<0) vi0 = vlen + vi0+1; if(vi1<0) vi1 = vlen + vi1+1;	if(vi2<0) vi2 = vlen + vi2+1;
			if(ui0<0) ui0 = ulen + ui0+1; if(ui1<0) ui1 = ulen + ui1+1;	if(ui2<0) ui2 = ulen + ui2+1;
			if(ni0<0) ni0 = nlen + ni0+1; if(ni1<0) ni1 = nlen + ni1+1;	if(ni2<0) ni2 = nlen + ni2+1;

			res.i_verts.push(vi0, vi1, vi2);  //cg.i_verts.push(vi0, vi1, vi2)
			res.i_uvt  .push(ui0, ui1, ui2);  //cg.i_uvt  .push(ui0, ui1, ui2);
			res.i_norms.push(ni0, ni1, ni2);  //cg.i_norms.push(ni0, ni1, ni2);
			if(cds.length == 5)
			{
				var v3a = cds[4].split("/");
				var vi3 = parseInt(v3a[0])-1, ui3 = parseInt(v3a[1])-1, ni3 = parseInt(v3a[2])-1;
				if(vi3<0) vi3 = vlen + vi3+1;
				if(ui3<0) ui3 = ulen + ui3+1;
				if(ni3<0) ni3 = nlen + ni3+1;
				res.i_verts.push(vi0, vi2, vi3);  //cg.i_verts.push(vi0, vi2, vi3);
				res.i_uvt  .push(ui0, ui2, ui3);  //cg.i_uvt  .push(ui0, ui2, ui3);
				res.i_norms.push(ni0, ni2, ni3);  //cg.i_norms.push(ni0, ni2, ni3);
			}
		}
	}
	cg.to = res.i_verts.length;

	return res;
}


K3D.parse.fromMD2 = function(buff)
{
	buff = new Uint8Array(buff);
	var res = {};
	var head = {};
	//res.head = head;
	head.ident			= K3D.bin.ril(buff,  0);             /* magic number: "IDP2" */
	head.version		= K3D.bin.ril(buff,  4);             /* version: must be 8 */

	head.skinwidth		= K3D.bin.ril(buff,  8);             /* texture width */
	head.skinheight		= K3D.bin.ril(buff, 12);             /* texture height */

	head.framesize		= K3D.bin.ril(buff, 16);             /* size in bytes of a frame */

	head.num_skins		= K3D.bin.ril(buff, 20);             /* number of skins */
	head.num_vertices	= K3D.bin.ril(buff, 24);             /* number of vertices per frame */
	head.num_st			= K3D.bin.ril(buff, 28);             /* number of texture coordinates */
	head.num_tris		= K3D.bin.ril(buff, 32);             /* number of triangles */
	head.num_glcmds		= K3D.bin.ril(buff, 36);             /* number of opengl commands */
	head.num_frames		= K3D.bin.ril(buff, 40);             /* number of frames */

	head.offset_skins	= K3D.bin.ril(buff, 44);             /* offset skin data */
	head.offset_st		= K3D.bin.ril(buff, 48);             /* offset texture coordinate data */
	head.offset_tris	= K3D.bin.ril(buff, 52);             /* offset triangle data */
	head.offset_frames	= K3D.bin.ril(buff, 56);             /* offset frame data */
	head.offset_glcmds	= K3D.bin.ril(buff, 60);             /* offset OpenGL command data */
	head.offset_end		= K3D.bin.ril(buff, 64);             /* offset end of file */

	var off = head.offset_st;
	res.c_uvt = [];
	for(var i=0; i<head.num_st; i++)
	{
		var x = K3D.bin.rsl(buff, off  )/head.skinwidth;
		var y = K3D.bin.rsl(buff, off+2)/head.skinheight;
		res.c_uvt.push(x,y);  off += 4;
	}

	var off = head.offset_tris;
	var vi = [], ti = [];
	res.i_verts = vi;
	res.i_uvt = ti;
	//res.tris = {i_verts : vi, i_uvt : ti};
	for(var i=0; i<head.num_tris; i++)
	{
		vi.push(K3D.bin.rsl(buff, off  ), K3D.bin.rsl(buff, off+2), K3D.bin.rsl(buff, off+4 ));
		ti.push(K3D.bin.rsl(buff, off+6), K3D.bin.rsl(buff, off+8), K3D.bin.rsl(buff, off+10));
		off += 12;
	}

	var off = head.offset_skins;
	res.skins = [];
	for(var i=0; i<head.num_skins; i++)
	{
		res.skins.push(K3D.bin.rASCII0(buff, off));
		off += 64;
	}

	var off = head.offset_frames;
	res.frames = [];
	var nms = K3D.parse.fromMD2._normals;
	for(var i=0; i<head.num_frames; i++)
	{
		var fr = {};
		var sx = K3D.bin.rf(buff, off), sy = K3D.bin.rf(buff, off+4), sz = K3D.bin.rf(buff, off+8);  off += 12;
		var tx = K3D.bin.rf(buff, off), ty = K3D.bin.rf(buff, off+4), tz = K3D.bin.rf(buff, off+8);  off += 12;
		fr.name		 = K3D.bin.rASCII0(buff, off); off += 16;
		fr.verts	 = [];
		fr.norms	 = [];

		for(var j=0; j<head.num_vertices; j++)
		{
			fr.verts.push(buff[off]*sx+tx, buff[off+1]*sy+ty, buff[off+2]*sz+tz);
			fr.norms.push(nms[3*buff[off+3]], nms[3*buff[off+3]+1], nms[3*buff[off+3]+2]);
			off += 4;
		}
		res.frames.push(fr);
	}
	return res;
}



/*
	static MD2 normals
*/

K3D.parse.fromMD2._normals =
[
-0.525731,  0.000000,  0.850651,
-0.442863,  0.238856,  0.864188,
-0.295242,  0.000000,  0.955423,
-0.309017,  0.500000,  0.809017,
-0.162460,  0.262866,  0.951056,
 0.000000,  0.000000,  1.000000,
 0.000000,  0.850651,  0.525731,
-0.147621,  0.716567,  0.681718,
 0.147621,  0.716567,  0.681718,
 0.000000,  0.525731,  0.850651,
 0.309017,  0.500000,  0.809017,
 0.525731,  0.000000,  0.850651,
 0.295242,  0.000000,  0.955423,
 0.442863,  0.238856,  0.864188,
 0.162460,  0.262866,  0.951056,
-0.681718,  0.147621,  0.716567,
-0.809017,  0.309017,  0.500000,
-0.587785,  0.425325,  0.688191,
-0.850651,  0.525731,  0.000000,
-0.864188,  0.442863,  0.238856,
-0.716567,  0.681718,  0.147621,
-0.688191,  0.587785,  0.425325,
-0.500000,  0.809017,  0.309017,
-0.238856,  0.864188,  0.442863,
-0.425325,  0.688191,  0.587785,
-0.716567,  0.681718, -0.147621,
-0.500000,  0.809017, -0.309017,
-0.525731,  0.850651,  0.000000,
 0.000000,  0.850651, -0.525731,
-0.238856,  0.864188, -0.442863,
 0.000000,  0.955423, -0.295242,
-0.262866,  0.951056, -0.162460,
 0.000000,  1.000000,  0.000000,
 0.000000,  0.955423,  0.295242,
-0.262866,  0.951056,  0.162460,
 0.238856,  0.864188,  0.442863,
 0.262866,  0.951056,  0.162460,
 0.500000,  0.809017,  0.309017,
 0.238856,  0.864188, -0.442863,
 0.262866,  0.951056, -0.162460,
 0.500000,  0.809017, -0.309017,
 0.850651,  0.525731,  0.000000,
 0.716567,  0.681718,  0.147621,
 0.716567,  0.681718, -0.147621,
 0.525731,  0.850651,  0.000000,
 0.425325,  0.688191,  0.587785,
 0.864188,  0.442863,  0.238856,
 0.688191,  0.587785,  0.425325,
 0.809017,  0.309017,  0.500000,
 0.681718,  0.147621,  0.716567,
 0.587785,  0.425325,  0.688191,
 0.955423,  0.295242,  0.000000,
 1.000000,  0.000000,  0.000000,
 0.951056,  0.162460,  0.262866,
 0.850651, -0.525731,  0.000000,
 0.955423, -0.295242,  0.000000,
 0.864188, -0.442863,  0.238856,
 0.951056, -0.162460,  0.262866,
 0.809017, -0.309017,  0.500000,
 0.681718, -0.147621,  0.716567,
 0.850651,  0.000000,  0.525731,
 0.864188,  0.442863, -0.238856,
 0.809017,  0.309017, -0.500000,
 0.951056,  0.162460, -0.262866,
 0.525731,  0.000000, -0.850651,
 0.681718,  0.147621, -0.716567,
 0.681718, -0.147621, -0.716567,
 0.850651,  0.000000, -0.525731,
 0.809017, -0.309017, -0.500000,
 0.864188, -0.442863, -0.238856,
 0.951056, -0.162460, -0.262866,
 0.147621,  0.716567, -0.681718,
 0.309017,  0.500000, -0.809017,
 0.425325,  0.688191, -0.587785,
 0.442863,  0.238856, -0.864188,
 0.587785,  0.425325, -0.688191,
 0.688191,  0.587785, -0.425325,
-0.147621,  0.716567, -0.681718,
-0.309017,  0.500000, -0.809017,
 0.000000,  0.525731, -0.850651,
-0.525731,  0.000000, -0.850651,
-0.442863,  0.238856, -0.864188,
-0.295242,  0.000000, -0.955423,
-0.162460,  0.262866, -0.951056,
 0.000000,  0.000000, -1.000000,
 0.295242,  0.000000, -0.955423,
 0.162460,  0.262866, -0.951056,
-0.442863, -0.238856, -0.864188,
-0.309017, -0.500000, -0.809017,
-0.162460, -0.262866, -0.951056,
 0.000000, -0.850651, -0.525731,
-0.147621, -0.716567, -0.681718,
 0.147621, -0.716567, -0.681718,
 0.000000, -0.525731, -0.850651,
 0.309017, -0.500000, -0.809017,
 0.442863, -0.238856, -0.864188,
 0.162460, -0.262866, -0.951056,
 0.238856, -0.864188, -0.442863,
 0.500000, -0.809017, -0.309017,
 0.425325, -0.688191, -0.587785,
 0.716567, -0.681718, -0.147621,
 0.688191, -0.587785, -0.425325,
 0.587785, -0.425325, -0.688191,
 0.000000, -0.955423, -0.295242,
 0.000000, -1.000000,  0.000000,
 0.262866, -0.951056, -0.162460,
 0.000000, -0.850651,  0.525731,
 0.000000, -0.955423,  0.295242,
 0.238856, -0.864188,  0.442863,
 0.262866, -0.951056,  0.162460,
 0.500000, -0.809017,  0.309017,
 0.716567, -0.681718,  0.147621,
 0.525731, -0.850651,  0.000000,
-0.238856, -0.864188, -0.442863,
-0.500000, -0.809017, -0.309017,
-0.262866, -0.951056, -0.162460,
-0.850651, -0.525731,  0.000000,
-0.716567, -0.681718, -0.147621,
-0.716567, -0.681718,  0.147621,
-0.525731, -0.850651,  0.000000,
-0.500000, -0.809017,  0.309017,
-0.238856, -0.864188,  0.442863,
-0.262866, -0.951056,  0.162460,
-0.864188, -0.442863,  0.238856,
-0.809017, -0.309017,  0.500000,
-0.688191, -0.587785,  0.425325,
-0.681718, -0.147621,  0.716567,
-0.442863, -0.238856,  0.864188,
-0.587785, -0.425325,  0.688191,
-0.309017, -0.500000,  0.809017,
-0.147621, -0.716567,  0.681718,
-0.425325, -0.688191,  0.587785,
-0.162460, -0.262866,  0.951056,
 0.442863, -0.238856,  0.864188,
 0.162460, -0.262866,  0.951056,
 0.309017, -0.500000,  0.809017,
 0.147621, -0.716567,  0.681718,
 0.000000, -0.525731,  0.850651,
 0.425325, -0.688191,  0.587785,
 0.587785, -0.425325,  0.688191,
 0.688191, -0.587785,  0.425325,
-0.955423,  0.295242,  0.000000,
-0.951056,  0.162460,  0.262866,
-1.000000,  0.000000,  0.000000,
-0.850651,  0.000000,  0.525731,
-0.955423, -0.295242,  0.000000,
-0.951056, -0.162460,  0.262866,
-0.864188,  0.442863, -0.238856,
-0.951056,  0.162460, -0.262866,
-0.809017,  0.309017, -0.500000,
-0.864188, -0.442863, -0.238856,
-0.951056, -0.162460, -0.262866,
-0.809017, -0.309017, -0.500000,
-0.681718,  0.147621, -0.716567,
-0.681718, -0.147621, -0.716567,
-0.850651,  0.000000, -0.525731,
-0.688191,  0.587785, -0.425325,
-0.587785,  0.425325, -0.688191,
-0.425325,  0.688191, -0.587785,
-0.425325, -0.688191, -0.587785,
-0.587785, -0.425325, -0.688191,
-0.688191, -0.587785, -0.425325
];

K3D.parse.fromCollada = function(buff)
{
	var str = K3D.parse._buffToStr(buff);
	var xml = new DOMParser().parseFromString(str,"text/xml");
	xml = xml.childNodes[0];
	var resp = {};

	//console.log(xml);

	var ass = xml.getElementsByTagName("asset"             )[0];
	var geo = xml.getElementsByTagName("library_geometries")[0];
	var ima = xml.getElementsByTagName("library_images"    )[0];
	var mat = xml.getElementsByTagName("library_materials" )[0];
	var eff = xml.getElementsByTagName("library_effects"   )[0];

	//console.log(xml);
	if(ass) resp.asset 		= K3D.parse.fromCollada._asset        (ass);
	if(geo) resp.geometries = K3D.parse.fromCollada._libGeometries(geo);
	if(ima) resp.images     = K3D.parse.fromCollada._libImages    (ima);
	if(mat) resp.materials  = K3D.parse.fromCollada._libMaterials (mat);
	if(eff) resp.effects    = K3D.parse.fromCollada._libEffects   (eff);
	return resp;
}

K3D.parse.fromCollada._asset = function(xml)
{
	//console.log(xml);
	return {
		created : xml.getElementsByTagName("created" )[0].textContent,
		modified: xml.getElementsByTagName("modified")[0].textContent,
		up_axis : xml.getElementsByTagName("up_axis" )[0].textContent
	};
}

K3D.parse.fromCollada._libGeometries = function(xml)
{
	xml = xml.getElementsByTagName("geometry");
	var res = [];
	for(var i=0; i<xml.length; i++)
	{
		var g = xml[i];
		var o = K3D.parse.fromCollada._getMesh(g.getElementsByTagName("mesh")[0]);
		res.push(o);
	}
	return res;
}

K3D.parse.fromCollada._getMesh = function(mesh)
{
	//console.log(mesh);
	var res = {};
	var ss = mesh.getElementsByTagName("source");
	var sources = res.sources = {};
	for(var i=0; i<ss.length; i++)
	{
		var farr = ss[i].getElementsByTagName("float_array")[0].textContent.split(" ");
		var fl = farr.length - (farr[farr.length-1] == "" ? 1 : 0);
		var arr = new Array(fl);
		for(var j=0; j<fl; j++) arr[j] = parseFloat(farr[j]);
		sources[ss[i].getAttribute("id")] = arr;
	}

	res.triangles = [];
	var tgs = mesh.getElementsByTagName("triangles");
	if(tgs == null) return res;
	for(var i=0; i<tgs.length; i++)
	{
		var t = {};
		var tnode = tgs[i];
		t.material = tnode.getAttribute("material");
		var inputs = tnode.getElementsByTagName("input");
		var inds = [];
		for(var j=0; j<inputs.length; j++)
		{
			var inp = inputs[j], arr = [];
			inds[parseInt(inp.getAttribute("offset"))] = arr;
			var par = inp.getAttribute("semantic");
			t["s_"+par] = (par == "VERTEX") ?
							mesh.getElementsByTagName("vertices")[0].getElementsByTagName("input")[0].getAttribute("source").substring(1)
							: inp.getAttribute("source").substring(1);

			t["i_"+par] = arr;
			var psrc = sources[t["s_"+par]];
		}
		var indices = tnode.getElementsByTagName("p")[0].textContent.split(" ");
		var inum = 3*Math.floor(indices.length/3);
		for(var j=0; j<inum; j++) inds[j%inputs.length].push(parseInt(indices[j]));

		/*
		if(t.s_VERTEX  ) t.u_VERTEX   = K3D.edit.unwrap(t.i_VERTEX  , sources[t.s_VERTEX  ], 3);
		if(t.s_TEXCOORD) t.u_TEXCOORD = K3D.edit.unwrap(t.i_TEXCOORD, sources[t.s_TEXCOORD], 2);
		if(t.s_NORMAL  ) t.u_NORMAL   = K3D.edit.unwrap(t.i_NORMAL  , sources[t.s_NORMAL  ], 3);
		//*/
		//if(t.s_TEXCOORD) for(var j=1; j<t.u_TEXCOORD.length; j+=2) t.u_TEXCOORD[j] = 1 - t.u_TEXCOORD[j];

		/*
		t.u_INDEX = new Array(t.i_VERTEX.length);
		for(var j=0; j<t.i_VERTEX.length; j++) t.u_INDEX[j] = j;
		*/

		res.triangles.push(t);
	}
	return res;
}

K3D.parse.fromCollada._libImages = function(xml)
{
	xml = xml.getElementsByTagName("image");
	var res = {};
	for(var i=0; i<xml.length; i++)
	{
		res[xml[i].getAttribute("id")] = xml[i].getElementsByTagName("init_from")[0].textContent;
	}
	return res;
}

K3D.parse.fromCollada._libMaterials = function(xml)
{
	xml = xml.getElementsByTagName("material");
	var res = {};
	for(var i=0; i<xml.length; i++)
	{
		res[xml[i].getAttribute("name")] = xml[i].getElementsByTagName("instance_effect")[0].getAttribute("url").substring(1);
	}
	return res;
}

K3D.parse.fromCollada._libEffects = function(xml)
{
	xml = xml.getElementsByTagName("effect");
	var res = {};
	for(var i=0; i<xml.length; i++)
	{
		var eff = {};
		var params = xml[i].getElementsByTagName("newparam");
		for(var j=0; j<params.length; j++)
		{
			var srf = params[j].getElementsByTagName("surface")[0];
			if(srf) eff.surface = srf.getElementsByTagName("init_from")[0].textContent;
		}
		res[xml[i].getAttribute("id")] = eff;
	}
	return res;
}





K3D.parse.from3DS = function(buff)
{
	buff = new Uint8Array(buff);
	var res = {};
	if(K3D.bin.rsl(buff, 0) != 0x4d4d) return null;
	var lim = K3D.bin.ril(buff, 2);

	var off = 6;
	while(off < lim)
	{
		var cid = K3D.bin.rsl(buff, off);
		var lng = K3D.bin.ril(buff, off+2);
		//console.log(cid.toString(16), lng);

		if(cid == 0x3d3d) res.edit = K3D.parse.from3DS._edit3ds(buff, off, lng);
		if(cid == 0xb000) res.keyf = K3D.parse.from3DS._keyf3ds(buff, off, lng);

		off += lng;
	}
	return res;
}

K3D.parse.from3DS._edit3ds = function(buff, coff, clng)	// buffer, chunk offset, length
{
	var res = {};
	var off = coff+6;
	while(off < coff+clng)
	{
		var cid = K3D.bin.rsl(buff, off);
		var lng = K3D.bin.ril(buff, off+2);
		//console.log("\t", cid.toString(16), lng);

		if(cid == 0x4000) { if(res.objects==null) res.objects = []; res.objects.push(K3D.parse.from3DS._edit_object(buff, off, lng)); }
		//if(cid == 0xb000) res.KEYF3DS = K3D.parse.from3DS._keyf3ds(buff, off, lng);

		off += lng;
	}
	return res;
}

K3D.parse.from3DS._keyf3ds = function(buff, coff, clng)
{
	var res = {};
	var off = coff+6;
	while(off < coff+clng)
	{
		var cid = K3D.bin.rsl(buff, off);
		var lng = K3D.bin.ril(buff, off+2);
		//console.log("\t\t", cid.toString(16), lng);

		//if(cid == 0x4000) { res.objects.push(K3D.parse.from3DS._edit_object(buff, off, lng)); }
		if(cid == 0xb002) { if(res.desc==null) res.desc = []; res.desc.push(K3D.parse.from3DS._keyf_objdes(buff, off, lng)); }

		off += lng;
	}
	return res;
}

K3D.parse.from3DS._keyf_objdes = function(buff, coff, clng)
{
	var res = {};
	var off = coff+6;
	while(off < coff+clng)
	{
		var cid = K3D.bin.rsl(buff, off);
		var lng = K3D.bin.ril(buff, off+2);
		//console.log("\t\t\t", cid.toString(16), lng);

		if(cid == 0xb010) res.hierarchy = K3D.parse.from3DS._keyf_objhierarch(buff, off, lng);
		if(cid == 0xb011) res.dummy_name = K3D.bin.rASCII0(buff, off+6);
		off += lng;
	}
	return res;
}

K3D.parse.from3DS._keyf_objhierarch = function(buff, coff, clng)
{
	var res = {};
	var off = coff+6;
	res.name = K3D.bin.rASCII0(buff, off);  off += res.name.length+1;
	res.hierarchy = K3D.bin.rsl(buff, off+4);
	return res;
}

K3D.parse.from3DS._edit_object = function(buff, coff, clng)	// buffer, chunk offset, length
{
	var res = {};
	var off = coff+6;
	res.name = K3D.bin.rASCII0(buff, off);  off += res.name.length+1;
	//console.log(res.name);
	while(off < coff+clng)
	{
		var cid = K3D.bin.rsl(buff, off);
		var lng = K3D.bin.ril(buff, off+2);
		//console.log("\t\t", cid.toString(16), lng);

		if(cid == 0x4100) res.mesh = K3D.parse.from3DS._obj_trimesh(buff, off, lng);
		//if(cid == 0xb000) res.KEYF3DS = K3D.parse.from3DS._keyf3ds(buff, off, lng);

		off += lng;
	}
	return res;
}

K3D.parse.from3DS._obj_trimesh = function(buff, coff, clng)	// buffer, chunk offset, length
{
	var res = {};
	var off = coff+6;

	while(off < coff+clng)
	{
		var cid = K3D.bin.rsl(buff, off);
		var lng = K3D.bin.ril(buff, off+2);
		//console.log("\t\t\t", cid.toString(16), lng);

		if(cid == 0x4110) res.vertices      = K3D.parse.from3DS._tri_vertexl     (buff, off, lng);
		if(cid == 0x4120) res.indices       = K3D.parse.from3DS._tri_facel1      (buff, off, lng);
		if(cid == 0x4140) res.uvt			= K3D.parse.from3DS._tri_mappingcoors(buff, off, lng);
		if(cid == 0x4160) res.local		    = K3D.parse.from3DS._tri_local       (buff, off, lng);
		off += lng;
	}
	return res;
}

K3D.parse.from3DS._tri_vertexl = function(buff, coff, clng)	// buffer, chunk offset, length
{
	var res = [];
	var off = coff+6;
	var n = K3D.bin.rsl(buff, off);  off += 2;
	for(var i=0; i<n; i++)
	{
		res.push(K3D.bin.rf(buff, off  ));	res.push(K3D.bin.rf(buff, off+4));	res.push(K3D.bin.rf(buff, off+8));
		off += 12;
	}
	return res;
}

K3D.parse.from3DS._tri_facel1 = function(buff, coff, clng)	// buffer, chunk offset, length
{
	var res = [];
	var off = coff+6;
	var n = K3D.bin.rsl(buff, off);  off += 2;
	for(var i=0; i<n; i++)
	{
		res.push(K3D.bin.rsl(buff, off  ));
		res.push(K3D.bin.rsl(buff, off+2));
		res.push(K3D.bin.rsl(buff, off+4));
		off += 8;
	}
	return res;
}

K3D.parse.from3DS._tri_mappingcoors = function(buff, coff, clng)	// buffer, chunk offset, length
{
	var res = [];
	var off = coff+6;
	var n = K3D.bin.rsl(buff, off);  off += 2;
	for(var i=0; i<n; i++)
	{
		res.push(  K3D.bin.rf(buff, off  ));
		res.push(1-K3D.bin.rf(buff, off+4));
		off += 8;
	}
	return res;
}

K3D.parse.from3DS._tri_local = function(buff, coff, clng)	// buffer, chunk offset, length
{
	var res = {};
	var off = coff+6;
	res.X = [K3D.bin.rf(buff, off), K3D.bin.rf(buff, off+4), K3D.bin.rf(buff, off+8)];  off += 12;
	res.Y = [K3D.bin.rf(buff, off), K3D.bin.rf(buff, off+4), K3D.bin.rf(buff, off+8)];  off += 12;
	res.Z = [K3D.bin.rf(buff, off), K3D.bin.rf(buff, off+4), K3D.bin.rf(buff, off+8)];  off += 12;
	res.C = [K3D.bin.rf(buff, off), K3D.bin.rf(buff, off+4), K3D.bin.rf(buff, off+8)];  off += 12;
	return res;
}

K3D.parse.fromBIV = function(buff)
{
	buff = new Uint8Array(buff);
	var res = {};

	var head = {};

	head.id		= K3D.bin.ril(buff,  0);

	head.verS	= K3D.bin.ril(buff,  4);
	head.texS	= K3D.bin.ril(buff,  8);
	head.indS	= K3D.bin.ril(buff, 12);

	head.verO	= K3D.bin.ril(buff, 16);
	head.verL	= K3D.bin.ril(buff, 20);
	head.texO	= K3D.bin.ril(buff, 24);
	head.texL	= K3D.bin.ril(buff, 28);
	head.indO	= K3D.bin.ril(buff, 32);
	head.indL	= K3D.bin.ril(buff, 36);

	if(head.verO != 0) res.vertices = K3D.parse.fromBIV._readFloats(buff, head.verO, head.verL);
	if(head.texO != 0) res.uvt      = K3D.parse.fromBIV._readFloats(buff, head.texO, head.texL);
	if(head.indO != 0) res.indices  = K3D.parse.fromBIV._readInts  (buff, head.indO, head.indL, head.indS);

	return res;
}

K3D.parse.toBIV = function(obj)
{
	var maxi = 0;
	for(var i=0; i<obj.indices.length; i++)	maxi = Math.max(maxi, obj.indices[i]);

	var indS = 32;
	if(maxi<=0xffff) indS = 16;

	var len = 40;
	if(obj.vertices) len+=obj.vertices.length*4;
	if(obj.uvt     ) len+=obj.uvt     .length*4;
	if(obj.indices ) len+=obj.indices .length*indS/8;


	var buff = new Uint8Array(len);

	K3D.bin.wil(buff,  0, 0x6976616e);

	K3D.bin.wil(buff,  4, 32);
	K3D.bin.wil(buff,  8, 32);
	K3D.bin.wil(buff, 12, indS);

	var off = 40;
	if(obj.vertices)
	{
		K3D.bin.wil(buff, 16, off);
		K3D.bin.wil(buff, 20, 4*obj.vertices.length);
		K3D.parse.fromBIV._writeFloats(buff, off, obj.vertices);
		off += 4*obj.vertices.length;
	}
	if(obj.uvt)
	{
		K3D.bin.wil(buff, 24, off);
		K3D.bin.wil(buff, 28, 4*obj.uvt.length);
		K3D.parse.fromBIV._writeFloats(buff, off, obj.uvt);
		off += 4*obj.uvt.length;
	}
	if(obj.indices)
	{
		K3D.bin.wil(buff, 32, off);
		K3D.bin.wil(buff, 36, 4*obj.indices.length);
		K3D.parse.fromBIV._writeInts  (buff, off, obj.indices, indS);
	}
	return buff.buffer;
}

K3D.parse.fromBIV._readFloats = function(buff, off, len)
{
	var arr = [];
	for(var i=0; i<len/4; i++) arr.push( K3D.bin.rf(buff, off+4*i));
	return arr;
}

K3D.parse.fromBIV._writeFloats = function(buff, off, arr)
{
	for(var i=0; i<arr.length; i++) K3D.bin.wf(buff, off+4*i, arr[i]);
}

K3D.parse.fromBIV._readInts   = function(buff, off, len, cs)
{
	var arr = [];
	for(var i=0; i<len/4; i++)
	{
		if(cs==16) arr.push( K3D.bin.rsl(buff, off+2*i));
		if(cs==32) arr.push( K3D.bin.ril(buff, off+4*i));
	}
	return arr;
}

K3D.parse.fromBIV._writeInts   = function(buff, off, arr, cs)
{
	for(var i=0; i<arr.length; i++)
	{
		if(cs==16) K3D.bin.wsl(buff, off+2*i, arr[i]);
		if(cs==32) K3D.bin.wil(buff, off+4*i, arr[i]);
	}
}
K3D.gen = {};

K3D.gen.Plane = function(sw, sh, tsw, tsh)
{
	if(!tsw) tsw = 1;
	if(!tsh) tsh = 1;
	var r = {verts:[], inds:[], uvt:[]};
	var ssw = sw+1, ssh = sh+1
	for(var i=0; i<ssh; i++)
	{
		for(var j=0; j<ssw; j++)
		{
			var x = -1 + j*(2/sw);
			var y = -1 + i*(2/sh);
			r.verts.push(x, y, 0);
			r.uvt.push(tsw*j/sw, tsh*i/sh);
			if(i<sh && j<sw)
				r.inds.push(i*ssw+j, i*ssw+j+1, (i+1)*ssw+j,   i*ssw+j+1, (i+1)*ssw+j, (i+1)*ssw+j+1);
		}
	}
	return r;
}
K3D.gen.Cube = function()
{
	var r = {
		verts:[	-1, 1,-1,   1, 1,-1,  -1,-1,-1,   1,-1,-1, // front
				-1, 1, 1,   1, 1, 1,  -1,-1, 1,   1,-1, 1, // back

				-1, 1, 1,  -1, 1,-1,  -1,-1, 1,  -1,-1,-1, // left
				 1, 1, 1,   1, 1,-1,   1,-1, 1,   1,-1,-1, // right

				-1, 1,-1,   1, 1,-1,  -1, 1, 1,   1, 1, 1, // top
				-1,-1,-1,   1,-1,-1,  -1,-1, 1,   1,-1, 1  // bottom
		],
		inds:[	0,1,2, 1,2,3, 4,5,6, 5,6,7,
				8,9,10, 9,10,11, 12,13,14, 13,14,15,
				16,17,18, 17,18,19, 20,21,22, 21,22,23
		],
		uvt:[
				1/4,1/4,  2/4,1/4,  1/4,2/4,  2/4,2/4, // front
				4/4,1/4,  3/4,1/4,  4/4,2/4,  3/4,2/4, // back

				0/4,1/4,  1/4,1/4,  0/4,2/4,  1/4,2/4, // left
				3/4,1/4,  2/4,1/4,  3/4,2/4,  2/4,2/4, // right

				1/4,1/4,  2/4,1/4,  1/4,0/4,  2/4,0/4, // top
				1/4,2/4,  2/4,2/4,  1/4,3/4,  2/4,3/4, // bottom
		]
	};
	return r;
}
K3D.gen.Sphere = function(sx, sy)
{
	var r = {verts:[], inds:[], uvt:[]};

	var dx = 2*Math.PI/sx;
	var dy = Math.PI/sy;
	var nx = sx+1, ny = sy+1;
	for(var i=0; i<ny; i++)	// rows
	{
		for(var j=0; j<nx; j++) // cols
		{
			var lat = -Math.PI/2 + i*Math.PI/sy;
			var lon =  j*2*Math.PI/sx;
			var x = Math.cos(lat) * Math.cos(lon);
			var y = Math.sin(lat);
			var z = Math.cos(lat) * Math.sin(lon);

			r.verts.push(x,y,z);
			r.uvt.push(j/sx, i/sy);
			if(i<sy && j<sx)          // 6 indices for 2 triangles
				r.inds.push(nx*i+j, nx*i+j+1, nx*(i+1)+j, nx*i+j+1, nx*(i+1)+j, nx*(i+1)+j+1);
		}
	}
	return r;
}
K3D.mat = {};

K3D.mat.scale = function(x,y,z)
{
	return [
		x,0,0,0,
		0,y,0,0,
		0,0,z,0,
		0,0,0,1
	];
}

K3D.mat.translate = function(x,y,z)
{
	return [
		1,0,0,0,
		0,1,0,0,
		0,0,1,0,
		x,y,z,1
	];
}

K3D.mat.rotateDeg = function(x,y,z)
{
	var r = Math.PI/180;
	return K3D.mat.rotate(x*r, y*r, z*r);
}

K3D.mat.rotate = function(x,y,z)
{
	var m = [
		1,0,0,0,
		0,1,0,0,
		0,0,1,0,
		0,0,0,1
	];
	var a =  x;	// alpha
	var b =  y;	// beta
	var g =  z;	// gama

	var ca = Math.cos(a), cb = Math.cos(b), cg = Math.cos(g);
	var sa = Math.sin(a), sb = Math.sin(b), sg = Math.sin(g);

	m[0] = cb*cg;				m[1] = -cb*sg;					m[2 ] = sb;
	m[4] = (ca*sg+sa*sb*cg);	m[5] = (ca*cg-sa*sb*sg);		m[6 ] = -sa*cb;
	m[8] = (sa*sg-ca*sb*cg);	m[9] = (sa*cg+ca*sb*sg);		m[10] = ca*cb;

	return m;
}


K3D.edit = {};

K3D.edit.interpolate = function(a, b, d, t)
{
	for(var i=0; i<a.length; i++) d[i] = a[i] + t*(b[i] - a[i]);
}


K3D.edit.transform = function(a, m)
{
	for(var i=0; i<a.length; i+=3)
	{
		var x = a[i], y = a[i+1], z = a[i+2];
		a[i+0] = m[0]*x + m[4]*y + m[8 ]*z + m[12];
		a[i+1] = m[1]*x + m[5]*y + m[9 ]*z + m[13];
		a[i+2] = m[2]*x + m[6]*y + m[10]*z + m[14];
	}
}

// starting indices, starting coordinates, coordinates per index

K3D.edit.unwrap = function(ind, crd, cpi)
{
	var ncrd = new Array(Math.floor(ind.length/3)*cpi);
	for(var i=0; i<ind.length; i++)
	{
		for(var j=0; j<cpi; j++)
		{
			ncrd[i*cpi+j] = crd[ind[i]*cpi+j];
		}
	}
	return ncrd;
}

// current indices, new indices, current array, coordinates per vertex

K3D.edit.remap = function(ind, nind, arr, cpi)
{
	var ncrd = new Array(arr.length);
	for(var i=0; i<ind.length; i++)
	{
		for(var j=0; j<cpi; j++)
		{
			ncrd[nind[i]*cpi+j] = arr[ind[i]*cpi+j];
		}
	}
	return ncrd;
}




K3D.utils = {};

K3D.utils.getAABB = function(vts)
{
	var minx, miny, minz, maxx, maxy, maxz;
	minx = miny = minz = 999999999;
	maxx = maxy = maxz = -minx;

	for(var i=0; i<vts.length; i+=3)
	{
		var vx = vts[i+0];
		var vy = vts[i+1];
		var vz = vts[i+2];
		if(vx<minx) minx = vx;  if(vx>maxx) maxx = vx;
		if(vy<miny) miny = vy;  if(vy>maxy) maxy = vy;
		if(vz<minz) minz = vz;  if(vy>maxz) maxz = vz;
	}
	return {min:{x:minx, y:miny, z:minz}, max:{x:maxx, y:maxy, z:maxz}};
}

'use strict';

function Entity(elements, files) {
    this.elements = elements || [];
    this.files    = files    || [];
  }

Entity.prototype.beginDraw = function(children) {
  children.forEach(function(child) {
    child.draw();
  })
};

Entity.prototype.endDraw   = function() {};

'use strict';

function Tree(root) {
    this.root            = root;
    this.entityMatrix    = [];
  }

  Tree.prototype = {
    getRoot : function() {
      return this.root;
    },

    preorder  : function(node, doSomething) {
        if (node == null) return;
        doSomething(node);
        this.preorder(node.firstChild(), doSomething);
        this.preorder(node.nextSibling(), doSomething);
    },

    pushEntity : function(entity) {
      this.entityMatrix.push(entity);
    },

    popEntity : function() {
      this.entityMatrix.pop();
    },

    inorder   : function() {
      /* TODO */
    },

    postorder : function() {
      /* TODO */
    }
  }

'use strict';

function NodeTree(entity, father, children) {
    this.entity    = entity   || '';
    this.father    = father   || '';
    this.children  = children || [];
  }

  NodeTree.prototype.getFather = function() {
    return this.father;
  };

  NodeTree.prototype.setFather = function(father) {
    this.father = father;
  }

  NodeTree.prototype.getEntity = function() {
    return this.entity;
  }

  NodeTree.prototype.setEntity = function(entity) {
    this.entity = entity;
  }

  NodeTree.prototype.index = function() {
    if (!this.isRoot()) return this.father.children.indexOf(this);
  }

  NodeTree.prototype.isRoot = function() {
    return (this.father == '');
  };

  NodeTree.prototype.childrenNumber = function() {
    return this.children.length;
  };

  NodeTree.prototype.nextSibling = function() {
    return ((!this.isRoot()) && (this.hasSibling())) ? this.father.getChild(this.index() +1) : null;
  };

  NodeTree.prototype.hasSibling = function() {
    return (this.father.existsChild(this.father.getChild(this.index() +1 )));
  }

  NodeTree.prototype.addChild = function(child) {
    child.setFather(this);
    this.children.push(child);
  };

  NodeTree.prototype.newChild = function() {
    return this.addChild(new NodeTree('', this, []));
  };

  NodeTree.prototype.getChild = function(index) {
    return (this.existsChild(this.children[index])) ? this.children[index] : null;
  };

  NodeTree.prototype.firstChild = function() {
    return this.getChild(0);
  };

  NodeTree.prototype.lastChild = function() {
    return this.getChild(this.childrenNumber() -1);
  };

  NodeTree.prototype.removeChild = function(child) {
    (this.existsChild(child)) ? this.children.splice(this.index(), 1) : false;
  };

  NodeTree.prototype.removeChildren = function() {
    this.children = [];
  };

  NodeTree.prototype.delete = function() {
    this.father.removeChild(this);
  };

  NodeTree.prototype.existsChild = function(child) {
    return (this.children.indexOf(child) != -1);
  };

  NodeTree.prototype.draw = function() {
    if (this.entity) {
      var children = this.children;
      this.entity.beginDraw(children);
      this.entity.endDraw();
    } else {
      console.log('There is no entity for this node');
    }
  };

'use strict';

function ShadersContent() {
  this.vertexContent =
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

  this.fragmentContent =
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
}

'use strict';

  function Shader(gl) {
    this.program      = null; //gl.createProgram
    this.vertices     = null;
    this.indices      = null;

    //attributes pointing to the current VBO
    this.index        = null;
    this.size         = null;
    this.type         = null; //FIXED, BYTE, UNSIGNED_BYTE, FLOAT, SHORT, or UNSIGNED_SHORT.
    this.norm         = null;
    this.stride       = null;
    this.offset       = null;
    this.pointer      = null;


    this.vertexBuffer = null; //gl.createBuffer();//current VBO
    this.indexBuffer  = null; //gl.createBuffer();

    this.vertexShader   = document.getElementById('vertexShader');
    this.fragmentShader = document.getElementById('fragmentShader');
  }

  Shader.prototype.setProgram = function(program) {
    this.program = program;
  };

  Shader.prototype.getVertexShader = function() {
    return this.vertexShader.innerHTML;
  };

  Shader.prototype.getFragmentShader = function() {
    return this.fragmentShader.innerHTML;
  };

  Shader.prototype.getVertices = function() {
    return this.vertices;
  };

  Shader.prototype.getIndices = function() {
    return this.indices;
  };

  Shader.prototype.setVertices = function(vertices) {
    this.vertices = vertices;
  };

  Shader.prototype.setIndices = function(indices) {
    this.indices = indices;
  };

  Shader.prototype.getVertexBuffer = function() {
    return this.vertexBuffer;
  };

  Shader.prototype.getIndexBuffer = function() {
    return this.indexBuffer;
  };

  Shader.prototype.setBuffers = function(context) { //context = Aubengine.gl
    context.bindBuffer(context.ARRAY_BUFFER, this.getVertexBuffer());
    context.bufferData(context.ARRAY_BUFFER, new Float32Array(this.getVertices()), context.STATIC_DRAW);
    context.bindBuffer(context.ARRAY_BUFFER, null);

    context.bindBuffer(context.ELEMENT_ARRAY_BUFFER, this.getIndexBuffer());
    context.bufferData(context.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.getIndices()), context.STATIC_DRAW);
    context.bindBuffer(context.ELEMENT_ARRAY_BUFFER, null);
  }

  Shader.prototype.setPointer = function(context) {
    this.pointer = context.vertexAttribPointer(this.index, this.size, this,type, this.norm, this.stride, this.offset);
  }

  Shader.prototype.getPointer = function(context) {
    return this.pointer;
  };


  Shader.prototype.vertexName = function() {
    return "x-shader/x-vertex";
  };


  Shader.prototype.fragmentName = function() {
    return "x-shader/x-fragment";
 };

  Shader.prototype.createShader = function(type) {
    if (type == 'VERTEX') {return gl.createShader(gl.VERTEX_SHADER)}
    else if (type == 'FRAGMENT') {return gl.createShader(gl.FRAGMENT_SHADER)}
    else {console.log('Incorrect shader'); return null};
  };

  Shader.prototype.checkCompilation = function(gl, shader) {
    if (!gl.getShaderParameters(shader, gl.COMPILE_STATUS)) return false;
  }

  Shader.prototype.addShader = function(type, gl, program, source) {
    var shader = this.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!this.checkCompilation(gl, shader)) return gl.getShaderInfoLog(shader);
    gl.attachShader(program, shader);
  };

  Shader.prototype.initProgram = function(gl) {
    var program = null;
    if (this.program == null) { //no program yet, it has to read the shaders
      program = gl.createProgram();
      this.addShader('VERTEX',   gl, program, this.getVertexShader());
      this.addShader('FRAGMENT', gl, program, this.getFragmentShader());
      gl.linkProgram(program);
      gl.useProgram(program);
      return program;
    } else { //use the current program configuration
      return this.program;
    };
  };

  Shader.prototype.draw = function(gl) { //the beginDraw hardrock function
    //Initiate the program with the shader configuration
      var program = this.initProgram(gl);
      /* TODO */
      //1. Vertex Configuration. Model View matrix.
      //2. Lights Configuration.
      //3. Textures Configuration.
      //4. Camera Configuration
      //5. Bind Buffers
  };

'use strict';

function Color(hex) {
    this.hex  = hex || '#FFFFFF';
    this.rgba = this.hex2rgb(this.hex, 1);
    this.vec  = null;
  }

  Color.prototype.hex2rgb = function(hex, opacity) {
    var hexStr = hex.replace('#','');
    var r = parseInt(hexStr.substring(0,2), 16);
    var g = parseInt(hexStr.substring(2,4), 16);
    var b = parseInt(hexStr.substring(4,6), 16);
    return [r/255,g/255,b/255,opacity];
  };

  Color.prototype.rgb2hex = function(rgb) {
   return "#" +
    ("0" + parseInt(rgb[0],10).toString(16)).slice(-2) +
    ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
    ("0" + parseInt(rgb[2],10).toString(16)).slice(-2);
  }

  Color.prototype.setColorRgba = function(r,g,b,a) {
    this.rgba     = [r,g,b, a || 1];
    this.hex      = this.rgb2hex(this.rgba);
    this.vec      = vec4(r,g,b,a);
  }

  Color.prototype.setColorHex = function(hex, opacity) {
    this.hex      = hex;
    this.rgba     = this.rgba(hex, opacity || 1);
    this.vec      = vec4(this.rgba[0],this.rgba[1],this.rgba[2],this.rgba[3]);
  }

  Color.prototype.getHex  = function() {
    return this.hex;
  };

  Color.prototype.getRgba = function() {
    return this.rgba;
  };

  Color.prototype.getVec  = function() {
    return this.vec;
  };

'use strict';

function Light(name){
	this.id = name;
	this.position = [0.0,0.0,0.0];
	this.ambient  = [0.0,0.0,0.0,0.0];
	this.diffuse  = [0.0,0.0,0.0,0.0];
	this.specular = [0.0,0.0,0.0,0.0];
}

  Light.prototype.setPosition = function(position) {
  	this.position = position.slice(0);
  }
  Light.prototype.setDiffuse = function (diffuse) {
  	this.diffuse = diffuse.slice(0);
  }

  Light.prototype.setAmbient = function(ambient) {
  	this.ambient = ambient.slice(0);
  }

  Light.prototype.setSpecular = function(specular) {
  	this.specular = specular.slice(0);
  }

  Light.prototype.setProperty = function(name, value) {
  	if(typeof name == 'string'){
  		if (value instanceof Array){
  			this[name] = value.slice(0);
  		}
  		else {
  			this[name] = value;
  		}
  	}
  	else{
  		throw 'The property name must be a string';
  	}
  }

'use strict';

function Transform(matrix) {
    this.matrix = matrix;
  }

Transform.prototype.scale = function(gl, x, y, z, matrix) {

};

Transform.prototype.rotate = function() {
  /* TODO */
};

Transform.prototype.translate = function(light) {
  /* TODO */
};

'use strict';
/* uses gl-matrix-min.js */
var CAMERA_ORBITING_TYPE = 1;
var CAMERA_TRACKING_TYPE = 2;

function Camera(t){
    this.matrix     = mat4.create();
    this.up         = vec3.create();
    this.right      = vec3.create();
    this.normal     = vec3.create();
    this.position   = vec3.create();
    this.focus      = vec3.create();
    this.observer   = 0.0;
    this.elevation  = 0.0;
    this.type       = t; //1 or 2
    this.steps      = 0;

    this.home = vec3.create();

    this.hookRenderer = null;
    this.hookGUIUpdate = null;

    this.FOV = 30;
    this.minZ = 0.1;
    this.maxZ = 10000

    this.prototype = new Entity();
}

Camera.prototype.setType = function(type){
    this.type = type;
    if (type != CAMERA_ORBITING_TYPE && type != CAMERA_TRACKING_TYPE) {
        alert('Wrong Camera Type!. Setting Orbitting type by default');
        this.type = CAMERA_ORBITING_TYPE;
    }
}

Camera.prototype.goHome = function(home){
    if (home != null){
        this.home = home;
    }

    this.setPosition(this.home);
    this.setobserver(0);
    this.setElevation(0);
    this.steps = 0;
}

Camera.prototype.dolly = function(steps){
    var camera   = this;
    var position = vec3.create();
    var normal   = vec3.create();

    position = camera.position;
    var step = steps - c.steps;

    vec3.normalize(camera.normal,normal);

    var newPosition = vec3.create();

    if(camera.type == CAMERA_TRACKING_TYPE){
        newPosition[0] = position[0] - step*normal[0];
        newPosition[1] = position[1] - step*normal[1];
        newPosition[2] = position[2] - step*normal[2];
    }
    else{
        newPosition[0] = position[0];
        newPosition[1] = position[1];
        newPosition[2] = position[2] - step;
    }

    camera.setPosition(newPosition);
    camera.steps = step;
}

Camera.prototype.setPosition = function(position){
    vec3.set(position, this.position);
    this.update();
}

//Align the normal to the focus vector
Camera.prototype.setFocus = function(focus){
	vec3.set(focus, this.focus);
	this.update();
}

Camera.prototype.setObserver = function(observer){
    this.changeObserver(observer - this.observer);
}

Camera.prototype.changeObserver = function(observer){
    var camera = this;
    camera.observer += observer;

    if (camera.observer > 360 || camera.observer <-360) {
		camera.observer = camera.observer % 360;
	}
    camera.update();
}

Camera.prototype.setElevation = function(ellevation){
    this.changeElevation(elevation - this.elevation);
}

Camera.prototype.changeElevation = function(elevation){
    var ccamera = this;

    camera.elevation += elevation;

    if (camera.elevation > 360 || camera.elevation <-360) {
		camera.elevation = camera.elevation % 360;
	}
    camera.update();
}

Camera.prototype.calculateOrientation = function(){
	var matrix = this.matrix;
    mat4.multiplyVec4(matrix, [1, 0, 0, 0], this.right);
    mat4.multiplyVec4(matrix, [0, 1, 0, 0], this.up);
    mat4.multiplyVec4(matrix, [0, 0, 1, 0], this.normal);
}

Camera.prototype.update = function(){
	mat4.identity(this.matrix);

	this.calculateOrientation();

    if (this.type == CAMERA_TRACKING_TYPE){
        mat4.translate(this.matrix, this.position);
        mat4.rotateY(this.matrix, this.observer * Math.PI/180);
        mat4.rotateX(this.matrix, this.elevation * Math.PI/180);
    }
    else {
        var trxLook = mat4.create();
        mat4.rotateY(this.matrix, this.observer * Math.PI/180);
        mat4.rotateX(this.matrix, this.elevation * Math.PI/180);
        mat4.translate(this.matrix,this.position);
    }

    this.calculateOrientation();

    if(this.type == CAMERA_TRACKING_TYPE){
        mat4.multiplyVec4(this.matrix, [0, 0, 0, 1], this.position);
    }

    if(this.hookRenderer){
        this.hookRenderer();
    }
    if(this.hookGUIUpdate){
        this.hookGUIUpdate();
    }
};

Camera.prototype.getViewTransform = function(){
    var matrix = mat4.create();
    mat4.inverse(this.matrix, matrix);
    return matrix;
};

/* Using K3D library for meshes. http://k3d.ivank.net/ */
'use strict';
  function Mesh(gl) {
    this.vertices           = new Float32Array();
    this.normals            = new Float32Array();
    this.vertexCoordinates  = new Float32Array();
    this.verticesAndIndices = new Array();

    this.file           = "";
    this.textures       = new Array();
    this.textureUrl     = new Array();
    this.texturePath    = "";
    this.textureNum     = null;
    this.textureImage   = null;
    this.texture        = null;
    this.color          = new Color('#222222');
  }

  Mesh.prototype.setVertices = function(vertices) {
    this.vertices = vertices;
  };

  Mesh.prototype.setNormals = function(normals) {
    this.normals = normals;
  }

  Mesh.prototype.setVertexCoordinates = function(vertexCoordinates) {
    this.vertexCoordinates = vertexCoordinates;
  };

  Mesh.prototype.setVerticesAndIndices = function(verticesAndIndices) {
    this.verticesAndIndices = verticesAndIndices;
  };

  Mesh.prototype.setMesh = function(dataFile) { //datafile = array
    this.vertices           = dataFile[0];
    this.normals            = dataFile[1];
    this.vertexCoordinates  = dataFile[2];
    this.verticesAndIndices = dataFile[3];
  }

  Mesh.prototype.getMesh = function() {
    return [this.vertices, this.normals, this.vertexCoordinates, this.verticesAndIndices];
  }

  Mesh.prototype.addIndicesVertices = function(model, indices) {
    model.i_verts.forEach(function(element, index) {indices.push(index);})
    return indices;
  };

  Mesh.prototype.startMesh = function(model, modelFiles) {
    this.vertices           = new Float32Array(K3D.edit.unwrap(model.i_verts, model.c_verts, 3));
    this.normals            = new Float32Array(K3D.edit.unwrap(model.i_norms, model.c_norms, 3));
    this.vertexCoordinates  = new Float32Array(K3D.edit.unwrap(model.i_uvt, model.c_uvt, 2));
    this.verticesAndIndices = this.addIndicesVertices(model, new Array());
    var mesh = this.getMesh();
    modelFiles.push(mesh);
  };

  Mesh.prototype.isAnObj  = function(file) {
    return file.indexOf('.obj' >= 0);
  }

  Mesh.prototype.isAModel = function(file, models) {
    return models.indexOf(file >= 0);
  }

  Mesh.prototype.parseModel = function(obj, mesh, models) {
    models.push(mesh.file);
    return K3D.parse.fromOBJ(obj);
  }

  Mesh.prototype.initMesh = function(obj, mesh, models, modelFiles) {
    var model  = null;
    var exists = false;

    if (this.isAnObj(mesh.file)) {
      if (this.isAModel(this.file, models)) {
        model = this.parseModel(obj, mesh, models);
      }

      else {//is not a model
        exists = true;
        var index     = models.indexOf(mesh.file);
        var dataFile  = modelFiles[index];
        this.setMesh(dataFile);
      }
    } //is not an object

    if(model != null && !exists){
      this.startMesh(models, modelFiles)
    }

    else {
      console.log("The model couldn't be created");
    }
  };

  /* Texture Operations */
  Mesh.prototype.urlLoaded = function() {
    return this.textures.indexOf(this.textureUrl >= 0);
  };

  Mesh.prototype.isLoaded = function(texture) {
    return this.textures.indexOf(texture >= 0);
  }

  Mesh.prototype.loadImage = function(gl, mesh) {
    this.textureImg = new Image();
    this.textureImg.src = this.textureUrl;
    this.textureImg.onload = function() {
      mesh.bindImageTexture(gl, mesh.textureImg, mesh.texture);
    }
  };

  Mesh.prototype.loadTexture = function(gl, mesh) {
    if (!this.urlLoaded()) {
      this.texture = gl.createTexture();
      this.loadImage(gl, mesh);
    }
  };

  Mesh.prototype.bindImageTexture  = function(gl, image, texture) {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.bindTexture(gl.TEXTURE_2D, null);
    this.saveFiles(image, texture);
  }

  Mesh.prototype.getTextureFromSrc = function(src) {
    var files = src.split("/");
    return files[files.lenght-1];
  }

  Mesh.prototype.saveFiles = function(image, texture) {
    var textureFile = this.getTextureFromSrc(image.src);
    if (this.isLoaded(textureImage)) {
      this.textures.push(textureFile);
      this.textureFiles.push([image, texture, textureFile]);
    }
    this.updateNum();
  }

  Mesh.prototype.updateNum = function() {
    this.textureNum = this.textures.indexOf(this.textureImg.src);
  };

'use strict';

function Resource(name, data) {
    this.name = name;
    this.data = data || '';
  };

  Resource.prototype.setName = function(name) {
    this.name = name;
  };

  Resource.prototype.getName = function() {
    return this.name;
  };

'use strict';

function ResourceManager(path) {
    this.resources = [];
    this.path      = path || '';
    this.file      = require("fs");
  }

ResourceManager.prototype.getResource = function(name) {
  var resource = this.searchResource(name);
  if (!resource) {
    resource = new Resource(name, '');
    this.writeResource(resource);
  }
  return resource;
};

ResourceManager.prototype.writeResource = function(resource) {
  this.file.appendFileSync(this.path, resource.name + '#' + resource.data + '\n');
}

ResourceManager.prototype.readName = function(line) {
  return line.split('#')[0];
}

ResourceManager.prototype.readData = function(line) {
  return line.split('#')[1];
}

ResourceManager.prototype.getFileText = function(path) {
  console.log(this.file);
  this.path = path;
  return this.file.readFileSync(this.path).toString();
};

ResourceManager.prototype.getFileContent = function() {
  return this.file.readFileSync(this.path).toString().split('\n');
}

ResourceManager.prototype.searchResource = function(name) {
  var fileContent = this.getFileContent();
  var i = 0;
  while ( i < fileContent.length) {
    if (this.readName(fileContent[i]) == name) return fileContent[i];
    i++;
  }
  return false;
}

ResourceManager.prototype.addResource = function(resource) {
  this.resources.push(resource);
}

ResourceManager.prototype.getFile = function() {
  return this.file;
}

ResourceManager.prototype.setPath = function(path) {
  this.path = path;
}

ResourceManager.prototype.getPath = function(path) {
  return this.path;
}

ResourceManager.prototype.readAllResources = function() {
  var resource = null;
  this.getFileContent().forEach(function (line) {
    resource = new Resource(this.readName(line), this.readData(line));
    this.resources.push(resource);
  })
};

'use strict';

function Scene(gl, program) {
    this.root    = new NodeTree();
    this.tree    = new Tree(this.root);
    this.matrix  = new Array();
    this.gl      = gl;
    this.shader  = new Shader();
  }

  Scene.prototype.setGl = function(gl) {
    this.gl = gl;
  };

  Scene.prototype.getLastMatrix = function() {
    	if (this.matrix.length>0) return this.matrix[this.matrix.length-1];
    	else return null;
  };

  Scene.prototype.getMatrix = function() {
    return this.matrix;
  };

  Scene.prototype.getRoot = function() {
    return this.root;
  };

  Scene.prototype.getTree = function() {
    return this.tree;
  };


  /* scene lights */
  var Lights = {
  	list : [],
  	add : function(light) {
      if (!(light instanceof Light)){
        alert('the parameter is not a light');
        return;
      }
      this.list.push(light);
  	},

  	getArray: function(type) {
  		var array = [];
      this.list.forEach(function(element, index) {
        array = array.concat(element[type]);
      })
      return array;
  	},

  	get: function(index){
  		if ((typeof index == 'number') && index >= 0 && index < this.list.length){
  			return this.list[index];
  		}
  		else if (typeof index == 'string'){
  			for(var i=0, max = this.list.length; i < max; i+=1){
  				if (this.list[i].id == index) return this.list[i];
  			}
  			throw 'Light ' + index + ' does not exist';
  		}
  		else {
  			throw 'Unknown parameter';
  		}
  	}
  }

'use strict';

/* Dependencies */

function Aubengine(width, height, canvasId) {
    /* Properties */
    this.width     = width;
    this.height    = height;
    this.names     = ['webgl', 'experimental-webgl', 'webkit-3d', 'moz-webgl'];
    this.canvasId  = canvasId;

    /* WebGL elements*/
    this.gl        = null;

    /* Entities */
    this.mesh      = new Mesh();
    this.light     = new Light();
    this.color     = new Color();
    this.transform = new Transform();
    this.shader    = new Shader(this.gl);

    /* Scene */
    this.scene   = new Scene(this.gl, this.program);

    /* Resource Manager */
    this.content = new ShadersContent();
    this.vertexShaderContent   = this.content.vertexContent;
    this.fragmentShaderContent = this.content.fragmentContent;
}

  Aubengine.prototype.setVertexShaderContent = function(content) {
    this.vertexShaderContent = content;
  };

  Aubengine.prototype.getManager = function() {
    return this.manager;
  }
  /* Basic previous configuration */
  Aubengine.prototype.getGl = function() {
    return this.gl;
  };

  Aubengine.prototype.setGl = function(gl) {
    this.gl = gl;
    this.scene.setGl(gl);
  };

  Aubengine.prototype.setProgram = function(program) {
    this.program = program;
    this.scene.setProgram(program);
  };

  Aubengine.prototype.setShaders = function(content, type) {
       var script = document.createElement('script');
       script.setAttribute('type', type);
       script.innerHTML = content;
       document.body.appendChild(script);
  }

  Aubengine.prototype.startWeb = function() {
    var canvas = document.getElementById(this.canvasId);
    var i = 0;
    this.gl = canvas.getContext('webgl');
    this.setShaders(this.vertexShaderContent,   this.shader.vertexName());
    this.setShaders(this.fragmentShaderContent, this.shader.fragmentName());
    // while ((this.gl == null) && (i < this.names.length)) {
    //   console.log(this.names[i]);
    //   try {
    //     this.gl = canvas.getContext(this.names[i]);
    //   } catch (e) {
    //     console.log(e);
    //   };
    //   i++;
    // }
  };

  Aubengine.prototype.createBuffer = function() {
    this.gl.createBuffer();
  };

  Aubengine.prototype.isStarted = function() {
    if (this.gl == null) {return false;}
    else {return true;}
  };



/* Main functions, the real magic */
  Aubengine.prototype.clear = function() {
    if (this.isStarted()) {
      this.gl.clear(this.gl.COLOR_BUFFER_BIT);
      this.gl.viewport(0, 0, this.width, this.height);
    }
  };

  Aubengine.prototype.changeColor = function(color) {
    if (this.isStarted()) {
      this.gl.clearColor(color[0], color[1], color[2], color[3]);
      this.clear(this.gl);
    }
  };

  Aubengine.prototype.scale = function(gl, x, y, z, matrix) {
    this.transform.scale(gl, x, y, z, matrix);
  };

  /* TODO */
  //all the façade methods for transformations and lights and cameras
