/**
 * Fragment-shader bodies for the selectable backgrounds. Each is remixed from
 * the referenced 21st.dev component (most of which use three.js) into a single
 * lightweight raw-WebGL pass, recolored to the theme. They share HEADER's
 * uniforms (u_time, u_resolution, u_mouse) and noise helpers.
 */

// aliimam/shader-animation — concentric amber ripple.
export const RIPPLE = `
void main(){
  vec2 p=(gl_FragCoord.xy-0.5*u_resolution)/u_resolution.y;
  float r=length(p);
  float a=0.5+0.5*sin(r*26.0 - u_time*1.7);
  vec3 amber=vec3(1.0,0.62,0.16);
  vec3 col=vec3(0.02,0.02,0.03);
  col += amber*pow(a,2.0)*max(0.0,0.55-r)*1.4;
  col += amber*exp(-r*2.6)*0.25;
  col *= smoothstep(1.25,0.1,r);
  gl_FragColor=vec4(max(col,0.0),1.0);
}`;

// thanh/animated-shader-background — falling stars (layers scroll downward).
export const STARS = `
void main(){
  vec2 uv=gl_FragCoord.xy/u_resolution;
  vec3 col=vec3(0.01,0.012,0.025);
  for(int i=0;i<3;i++){
    float fi=float(i);
    vec2 g=uv*vec2(7.0+fi*6.0, 14.0+fi*8.0);
    g.y += u_time*(2.0+fi*1.4);
    vec2 id=floor(g); vec2 f=fract(g);
    float h=hash(id+fi*37.0);
    float star=step(0.965,h);
    float d=length(f-0.5);
    float tw=0.5+0.5*sin(u_time*3.0+h*40.0);
    col += vec3(1.0,0.72,0.32)*star*smoothstep(0.45,0.0,d)*tw*(0.7/(fi+1.0));
  }
  gl_FragColor=vec4(col,1.0);
}`;

// aliimam/web-gl-shader — flowing amber wave.
export const WAVE = `
void main(){
  vec2 p=(gl_FragCoord.xy-0.5*u_resolution)/u_resolution.y;
  float w=0.0;
  for(int i=0;i<4;i++){ float fi=float(i);
    w += sin(p.x*(2.5+fi*2.0)+u_time*(0.8+fi*0.3)+fi)*(0.13/(fi+1.0)); }
  float d=abs(p.y-w);
  vec3 amber=vec3(1.0,0.6,0.15);
  vec3 col=vec3(0.02,0.02,0.045);
  col += amber*smoothstep(0.28,0.0,d)*0.9;
  col += amber*0.10*smoothstep(0.5,0.0,abs(p.y-w)-0.1);
  col *= smoothstep(1.3,0.15,length(p));
  gl_FragColor=vec4(col,1.0);
}`;

// thanh/shader-background — domain-warped nebula.
export const NEBULA = `
void main(){
  vec2 p=(gl_FragCoord.xy-0.5*u_resolution)/u_resolution.y;
  float t=u_time*0.08;
  vec2 q=vec2(fbm(p*2.0+t), fbm(p*2.0-t+3.1));
  float n=fbm(p*3.0+q*2.0+t);
  vec3 a=vec3(1.0,0.55,0.12), b=vec3(0.18,0.05,0.32);
  vec3 col=mix(b,a,smoothstep(0.2,0.92,n))*(0.32+0.55*n);
  col *= smoothstep(1.35,0.2,length(p));
  gl_FragColor=vec4(max(col,0.0),1.0);
}`;

// aliimam/shader-lines — LIGHT background with darker weaving lines.
// (Pair with a dark spotlight.)
export const LINES = `
void main(){
  vec2 uv=gl_FragCoord.xy/u_resolution;
  vec3 bg=vec3(0.93,0.91,0.86);
  float l=0.0;
  for(int i=0;i<6;i++){ float fi=float(i);
    float ph=uv.x*1.6 + fi*0.18 + sin(u_time*0.5+fi*1.3)*0.12;
    float d=abs(fract(uv.y*3.2 - ph - u_time*0.04)-0.5);
    l += smoothstep(0.02,0.0,d-0.47);
  }
  vec3 col=bg - vec3(0.45,0.5,0.55)*l*0.5;
  col = mix(col, vec3(0.95,0.62,0.2), l*0.18);
  gl_FragColor=vec4(col,1.0);
}`;

// ravikatiyar/animated-shader-hero — horizontally moving comets.
export const COMETS = `
void main(){
  vec2 uv=gl_FragCoord.xy/u_resolution;
  float aspect=u_resolution.x/u_resolution.y;
  vec3 col=vec3(0.01,0.012,0.03);
  for(int i=0;i<7;i++){ float fi=float(i);
    float lane=hash(vec2(fi,1.0));
    float speed=0.18+hash(vec2(fi,2.0))*0.4;
    float x=fract(u_time*speed + hash(vec2(fi,3.0)));
    float dy=abs(uv.y-lane);
    float head=smoothstep(0.012,0.0,length(vec2((uv.x-x)*aspect, dy)));
    float behind=step(uv.x,x);
    float tail=smoothstep(0.22,0.0,(x-uv.x))*smoothstep(0.012,0.0,dy)*behind;
    col += vec3(1.0,0.62,0.22)*(head*1.2 + tail*0.6);
  }
  gl_FragColor=vec4(col,1.0);
}`;

// Scottclayton3d/shader-animation — interfering procedural gradient.
export const PRISM = `
void main(){
  vec2 uv=gl_FragCoord.xy/u_resolution;
  float t=u_time*0.22;
  float v=sin(uv.x*6.0+t)+sin(uv.y*6.0+t*1.3)+sin((uv.x+uv.y)*5.0+t*0.7)+sin(length(uv-0.5)*12.0-t);
  v*=0.25;
  vec3 a=vec3(1.0,0.5,0.1), b=vec3(0.12,0.08,0.28);
  vec3 col=mix(b,a,0.5+0.5*v)*0.55;
  gl_FragColor=vec4(col,1.0);
}`;

// Samurai theme background — crimson ink/smoke.
export const SAMURAI_BG = `
void main(){
  vec2 p=(gl_FragCoord.xy-0.5*u_resolution)/u_resolution.y;
  float t=u_time*0.06;
  vec2 q=vec2(fbm(p*1.8+t), fbm(p*1.8-t+5.0));
  float n=fbm(p*2.6+q*2.2+t);
  vec3 crimson=vec3(0.62,0.06,0.08), ink=vec3(0.03,0.01,0.02), gold=vec3(0.85,0.6,0.2);
  vec3 col=mix(ink,crimson,smoothstep(0.25,0.85,n))*(0.4+0.5*n);
  col += gold*pow(max(0.0,n-0.7),2.0)*0.6;
  col *= smoothstep(1.4,0.15,length(p));
  gl_FragColor=vec4(max(col,0.0),1.0);
}`;
