import type { ShaderSpec } from "@/components/effects/ShaderCanvas";

/**
 * The real fragment shaders from the referenced 21st.dev components, ported to
 * WebGL1 (float loops → int, `tanh` polyfilled, `#version 300 es` removed,
 * fixed uniforms inlined). The visuals match the originals; we just run the
 * fragment through one raw-WebGL quad instead of three.js.
 */

// aliimam/shader-animation — concentric line rings.
const RINGS = `precision highp float;
uniform vec2 resolution;
uniform float time;
void main(void){
  vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
  float t = time*0.05;
  float lineWidth = 0.002;
  vec3 color = vec3(0.0);
  for(int j = 0; j < 3; j++){
    for(int i=0; i < 5; i++){
      color[j] += lineWidth*float(i*i) / abs(fract(t - 0.01*float(j)+float(i)*0.01)*5.0 - length(uv) + mod(uv.x+uv.y, 0.2));
    }
  }
  gl_FragColor = vec4(color[0],color[1],color[2],1.0);
}`;

// thanh/animated-shader-background — flowing aurora ("falling stars" set).
const STARS = `precision highp float;
uniform float iTime;
uniform vec2 iResolution;
#define NUM_OCTAVES 3
vec4 tanh4(vec4 x){ vec4 e = exp(min(x, 8.0) * 2.0); return (e - 1.0) / (e + 1.0); }
float rand(vec2 n){ return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453); }
float noise(vec2 p){
  vec2 ip = floor(p); vec2 u = fract(p); u = u*u*(3.0-2.0*u);
  float res = mix(mix(rand(ip), rand(ip + vec2(1.0,0.0)), u.x), mix(rand(ip + vec2(0.0,1.0)), rand(ip + vec2(1.0,1.0)), u.x), u.y);
  return res*res;
}
float fbm(vec2 x){
  float v = 0.0; float a = 0.3; vec2 shift = vec2(100.0);
  mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
  for (int i = 0; i < NUM_OCTAVES; ++i){ v += a*noise(x); x = rot*x*2.0 + shift; a *= 0.4; }
  return v;
}
void main(){
  vec2 shake = vec2(sin(iTime*1.2)*0.005, cos(iTime*2.1)*0.005);
  vec2 p = ((gl_FragCoord.xy + shake*iResolution.xy) - iResolution.xy*0.5) / iResolution.y * mat2(6.0,-4.0,4.0,6.0);
  vec2 v; vec4 o = vec4(0.0);
  float f = 2.0 + fbm(p + vec2(iTime*5.0, 0.0))*0.5;
  for (int ii = 0; ii < 35; ii++){
    float i = float(ii);
    v = p + cos(i*i + (iTime + p.x*0.08)*0.025 + i*vec2(13.0,11.0))*3.5 + vec2(sin(iTime*3.0+i)*0.003, cos(iTime*3.5-i)*0.003);
    float tailNoise = fbm(v + vec2(iTime*0.5, i))*0.3*(1.0 - (i/35.0));
    vec4 auroraColors = vec4(0.1+0.3*sin(i*0.2+iTime*0.4), 0.3+0.5*cos(i*0.3+iTime*0.5), 0.7+0.3*sin(i*0.4+iTime*0.3), 1.0);
    vec4 currentContribution = auroraColors * exp(sin(i*i + iTime*0.8)) / length(max(v, vec2(v.x*f*0.015, v.y*1.5)));
    float thinnessFactor = smoothstep(0.0, 1.0, i/35.0)*0.6;
    o += currentContribution*(1.0 + tailNoise*0.8)*thinnessFactor;
  }
  o = tanh4(pow(o/100.0, vec4(1.6)));
  gl_FragColor = o*1.5;
}`;

// aliimam/web-gl-shader — RGB-split sine wave.
const WAVE = `precision highp float;
uniform vec2 resolution;
uniform float time;
const float xScale = 1.0;
const float yScale = 0.5;
const float distortion = 0.05;
void main(){
  vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
  float d = length(p) * distortion;
  float rx = p.x*(1.0+d); float gx = p.x; float bx = p.x*(1.0-d);
  float r = 0.05 / abs(p.y + sin((rx+time)*xScale)*yScale);
  float g = 0.05 / abs(p.y + sin((gx+time)*xScale)*yScale);
  float b = 0.05 / abs(p.y + sin((bx+time)*xScale)*yScale);
  gl_FragColor = vec4(r, g, b, 1.0);
}`;

// thanh/shader-background — warped plasma lines over a grid.
const PLASMA = `precision highp float;
uniform vec2 iResolution;
uniform float iTime;
const float overallSpeed = 0.2;
const float gridSmoothWidth = 0.015;
const float axisWidth = 0.05;
const float majorLineWidth = 0.025;
const float minorLineWidth = 0.0125;
const float majorLineFrequency = 5.0;
const float minorLineFrequency = 1.0;
const float scale = 5.0;
const vec4 lineColor = vec4(0.4, 0.2, 0.8, 1.0);
const float minLineWidth = 0.01;
const float maxLineWidth = 0.2;
const float lineSpeed = 1.0 * overallSpeed;
const float lineAmplitude = 1.0;
const float lineFrequency = 0.2;
const float warpSpeed = 0.2 * overallSpeed;
const float warpFrequency = 0.5;
const float warpAmplitude = 1.0;
const float offsetFrequency = 0.5;
const float offsetSpeed = 1.33 * overallSpeed;
const float minOffsetSpread = 0.6;
const float maxOffsetSpread = 2.0;
const int linesPerGroup = 16;
#define drawCrispLine(pos, halfWidth, t) smoothstep(halfWidth + gridSmoothWidth, halfWidth, abs(pos - (t)))
#define drawSmoothLine(pos, halfWidth, t) smoothstep(halfWidth, 0.0, abs(pos - (t)))
#define drawCircle(pos, radius, coord) smoothstep(radius + gridSmoothWidth, radius, length(coord - (pos)))
float random(float t){ return (cos(t) + cos(t*1.3+1.3) + cos(t*1.4+1.4)) / 3.0; }
float getPlasmaY(float x, float horizontalFade, float offset){ return random(x*lineFrequency + iTime*lineSpeed)*horizontalFade*lineAmplitude + offset; }
void main(){
  vec2 fragCoord = gl_FragCoord.xy;
  vec2 uv = fragCoord.xy / iResolution.xy;
  vec2 space = (fragCoord - iResolution.xy/2.0) / iResolution.x * 2.0 * scale;
  float horizontalFade = 1.0 - (cos(uv.x*6.28)*0.5+0.5);
  float verticalFade = 1.0 - (cos(uv.y*6.28)*0.5+0.5);
  space.y += random(space.x*warpFrequency + iTime*warpSpeed)*warpAmplitude*(0.5+horizontalFade);
  space.x += random(space.y*warpFrequency + iTime*warpSpeed + 2.0)*warpAmplitude*horizontalFade;
  vec4 lines = vec4(0.0);
  vec4 bgColor1 = vec4(0.1, 0.1, 0.3, 1.0);
  vec4 bgColor2 = vec4(0.3, 0.1, 0.5, 1.0);
  for(int l = 0; l < linesPerGroup; l++){
    float normalizedLineIndex = float(l) / float(linesPerGroup);
    float offsetTime = iTime*offsetSpeed;
    float offsetPosition = float(l) + space.x*offsetFrequency;
    float rand = random(offsetPosition + offsetTime)*0.5+0.5;
    float halfWidth = mix(minLineWidth, maxLineWidth, rand*horizontalFade)/2.0;
    float offset = random(offsetPosition + offsetTime*(1.0+normalizedLineIndex))*mix(minOffsetSpread, maxOffsetSpread, horizontalFade);
    float linePosition = getPlasmaY(space.x, horizontalFade, offset);
    float line = drawSmoothLine(linePosition, halfWidth, space.y)/2.0 + drawCrispLine(linePosition, halfWidth*0.15, space.y);
    float circleX = mod(float(l) + iTime*lineSpeed, 25.0) - 12.0;
    vec2 circlePosition = vec2(circleX, getPlasmaY(circleX, horizontalFade, offset));
    float circle = drawCircle(circlePosition, 0.01, space)*4.0;
    line = line + circle;
    lines += line*lineColor*rand;
  }
  vec4 fragColor = mix(bgColor1, bgColor2, uv.x);
  fragColor *= verticalFade;
  fragColor.a = 1.0;
  fragColor += lines;
  gl_FragColor = fragColor;
}`;

// aliimam/shader-lines — light mosaic lines (pairs with a dark spotlight).
const LINES = `precision highp float;
uniform vec2 resolution;
uniform float time;
float random(in float x){ return fract(sin(x)*1e4); }
float random(vec2 st){ return fract(sin(dot(st.xy, vec2(12.9898,78.233)))*43758.5453123); }
void main(void){
  vec2 uv = (gl_FragCoord.xy*2.0 - resolution.xy) / min(resolution.x, resolution.y);
  vec2 fMosaicScal = vec2(4.0, 2.0);
  vec2 vScreenSize = vec2(256.0, 256.0);
  uv.x = floor(uv.x * vScreenSize.x / fMosaicScal.x) / (vScreenSize.x / fMosaicScal.x);
  uv.y = floor(uv.y * vScreenSize.y / fMosaicScal.y) / (vScreenSize.y / fMosaicScal.y);
  float t = time*0.06 + random(uv.x)*0.4;
  float lineWidth = 0.0008;
  vec3 color = vec3(0.0);
  for(int j = 0; j < 3; j++){
    for(int i = 0; i < 5; i++){
      color[j] += lineWidth*float(i*i) / abs(fract(t - 0.01*float(j)+float(i)*0.01)*1.0 - length(uv));
    }
  }
  // Inverted to a light field with darker mosaic lines (pairs with a dark spotlight).
  vec3 ln = vec3(color[2], color[1], color[0]);
  vec3 col = vec3(0.90, 0.90, 0.93) - ln*1.4;
  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}`;

// Scottclayton3d/shader-animation — palette fractal with gradient overlay.
const PRISM = `precision mediump float;
uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;
vec3 palette(float t){
  vec3 a = vec3(0.5); vec3 b = vec3(0.5); vec3 c = vec3(1.0); vec3 d = vec3(0.263, 0.416, 0.557);
  return a + b*cos(6.28318*(c*t+d));
}
void main(){
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 uv0 = uv;
  uv = uv*2.0 - 1.0;
  uv.x *= u_resolution.x / u_resolution.y;
  float d = length(uv);
  vec3 col = vec3(0.0);
  for(int ii = 0; ii < 4; ii++){
    float i = float(ii);
    uv = fract(uv*1.5) - 0.5;
    d = length(uv)*exp(-length(uv0));
    vec3 color = palette(length(uv0) + i*0.4 + u_time*0.01);
    d = sin(d*4.0 + u_time)/36.0;
    d = pow(0.005/d, 1.5);
    vec2 mouseEffect = u_mouse - uv0;
    float mouseDist = length(mouseEffect);
    d *= 1.0 + sin(mouseDist*10.0 - u_time*2.0)*0.1;
    col += color*d;
  }
  float wave = sin(uv0.x*2.0 + u_time)*0.01;
  col += vec3(wave);
  vec3 gradient1 = vec3(0.1, 0.2, 0.5);
  vec3 gradient2 = vec3(0.9, 0.1, 0.4);
  vec3 gradientMix = mix(gradient1, gradient2, uv0.y + sin(u_time)*0.2);
  col = mix(col, gradientMix, 0.3);
  gl_FragColor = vec4(col, 1.0);
}`;

// ravikatiyar/animated-shader-hero (Matthias Hurrle) — space clouds + streaks.
const COMETS = `precision highp float;
uniform vec2 resolution;
uniform float time;
#define FC gl_FragCoord.xy
#define T time
#define R resolution
#define MN min(R.x,R.y)
float rnd(vec2 p){ p=fract(p*vec2(12.9898,78.233)); p+=dot(p,p+34.56); return fract(p.x*p.y); }
float noise(in vec2 p){
  vec2 i=floor(p), f=fract(p), u=f*f*(3.0-2.0*f);
  float a=rnd(i), b=rnd(i+vec2(1,0)), c=rnd(i+vec2(0,1)), d=rnd(i+1.0);
  return mix(mix(a,b,u.x), mix(c,d,u.x), u.y);
}
float fbm(vec2 p){
  float t=0.0, a=1.0; mat2 m=mat2(1.0,-0.5,0.2,1.2);
  for (int i=0; i<5; i++){ t+=a*noise(p); p*=2.0*m; a*=0.5; }
  return t;
}
float clouds(vec2 p){
  float d=1.0, t=0.0;
  for (int ii=0; ii<3; ii++){
    float i=float(ii);
    float a=d*fbm(i*10.0 + p.x*0.2 + 0.2*(1.0+i)*p.y + d + i*i + p);
    t=mix(t,d,a); d=a; p*=2.0/(i+1.0);
  }
  return t;
}
void main(void){
  vec2 uv=(FC-0.5*R)/MN, st=uv*vec2(2,1);
  vec3 col=vec3(0);
  float bg=clouds(vec2(st.x+T*0.5, -st.y));
  uv*=1.0-0.3*(sin(T*0.2)*0.5+0.5);
  for (int ii=1; ii<12; ii++){
    float i=float(ii);
    uv+=0.1*cos(i*vec2(0.1+0.01*i, 0.8)+i*i+T*0.5+0.1*uv.x);
    vec2 p=uv;
    float d=length(p);
    col+=0.00125/d*(cos(sin(i)*vec3(1,2,3))+1.0);
    float b=noise(i+p+bg*1.731);
    col+=0.002*b/length(max(p, vec2(b*p.x*0.02, p.y)));
    col=mix(col, vec3(bg*0.25, bg*0.137, bg*0.05), d);
  }
  gl_FragColor=vec4(col,1.0);
}`;

export const SHADERS = {
  rings: { fragment: RINGS, res: "resolution", time: "time", timeScale: 3 },
  stars: { fragment: STARS, res: "iResolution", time: "iTime", timeScale: 1 },
  wave: { fragment: WAVE, res: "resolution", time: "time", timeScale: 0.6 },
  plasma: { fragment: PLASMA, res: "iResolution", time: "iTime", timeScale: 1 },
  lines: { fragment: LINES, res: "resolution", time: "time", timeScale: 3 },
  prism: { fragment: PRISM, res: "u_resolution", time: "u_time", timeScale: 1 },
  comets: { fragment: COMETS, res: "resolution", time: "time", timeScale: 1 },
} satisfies Record<string, ShaderSpec>;

export type ShaderKey = keyof typeof SHADERS;
