(()=>{
"use strict";

/* ============================================================
   CELESTIAL BODIES DATABASE
   ============================================================ */
const BODIES={
    sun:{
        name:"Sun",type:"Star (G2V)",
        diameter:"1,392,700 km",distance:"—",day:"25.4 days",year:"—",
        moons:"8 planets",temp:"5,500°C",gravity:"274 m/s²",
        desc:"The star at the center of the Solar System. A nearly perfect sphere of hot plasma radiating energy from nuclear fusion of hydrogen into helium.",
        color:0xffaa00,emissive:0xff8800,emissiveI:1.5,atmoColor:[1,.6,.1],
        hasAtmo:true,hasClouds:false,hasRing:false,isStar:true,tilt:0.13,
    },
    mercury:{
        name:"Mercury",type:"Terrestrial Planet",
        diameter:"4,880 km",distance:"57.9M km",day:"58.6 days",year:"88 days",
        moons:"0",temp:"167°C",gravity:"3.7 m/s²",
        desc:"The smallest and closest planet to the Sun. Its cratered surface resembles Earth's Moon. It has virtually no atmosphere.",
        color:0xb5a48a,emissive:0x1a1510,emissiveI:0.05,atmoColor:[.5,.45,.4],
        hasAtmo:false,hasClouds:false,hasRing:false,isStar:false,tilt:0.03,
    },
    venus:{
        name:"Venus",type:"Terrestrial Planet",
        diameter:"12,104 km",distance:"108.2M km",day:"243 days",year:"225 days",
        moons:"0",temp:"464°C",gravity:"8.87 m/s²",
        desc:"The second planet and the hottest in the Solar System due to its thick CO₂ atmosphere creating an extreme greenhouse effect.",
        color:0xe8c56d,emissive:0x2a2010,emissiveI:0.1,atmoColor:[.9,.7,.3],
        hasAtmo:true,hasClouds:true,hasRing:false,isStar:false,tilt:2.64,
    },
    earth:{
        name:"Earth",type:"Terrestrial Planet",
        diameter:"12,742 km",distance:"149.6M km",day:"24 hours",year:"365.25 days",
        moons:"1",temp:"15°C",gravity:"9.8 m/s²",
        desc:"The third planet from the Sun and the only astronomical object known to harbor life. About 71% of its surface is covered with water.",
        color:0x4f8eff,emissive:0x061228,emissiveI:0.08,atmoColor:[.35,.6,1],
        hasAtmo:true,hasClouds:true,hasRing:false,isStar:false,tilt:0.41,
    },
    moon:{
        name:"Moon",type:"Natural Satellite",
        diameter:"3,474 km",distance:"384,400 km",day:"27.3 days",year:"27.3 days",
        moons:"0",temp:"-20°C",gravity:"1.62 m/s²",
        desc:"Earth's only natural satellite. The fifth-largest moon in the Solar System. Its surface is covered with impact craters and volcanic plains.",
        color:0xaaaaaa,emissive:0x0a0a0a,emissiveI:0.02,atmoColor:[.5,.5,.5],
        hasAtmo:false,hasClouds:false,hasRing:false,isStar:false,tilt:0.12,
    },
    mars:{
        name:"Mars",type:"Terrestrial Planet",
        diameter:"6,779 km",distance:"227.9M km",day:"24.6 hours",year:"687 days",
        moons:"2",temp:"-65°C",gravity:"3.72 m/s²",
        desc:"The Red Planet. The iron oxide prevalent on its surface gives it a reddish appearance. It hosts the largest volcano in the solar system, Olympus Mons.",
        color:0xc1440e,emissive:0x1a0800,emissiveI:0.05,atmoColor:[.8,.4,.2],
        hasAtmo:true,hasClouds:false,hasRing:false,isStar:false,tilt:0.44,
    },
    jupiter:{
        name:"Jupiter",type:"Gas Giant",
        diameter:"139,820 km",distance:"778.5M km",day:"9.9 hours",year:"11.86 years",
        moons:"95",temp:"-110°C",gravity:"24.79 m/s²",
        desc:"The largest planet in the Solar System. A gas giant with a mass more than two and a half times that of all other planets combined. Famous for its Great Red Spot.",
        color:0xc89b6a,emissive:0x1a1208,emissiveI:0.05,atmoColor:[.7,.55,.35],
        hasAtmo:true,hasClouds:false,hasRing:false,isStar:false,tilt:0.05,
    },
    saturn:{
        name:"Saturn",type:"Gas Giant",
        diameter:"116,460 km",distance:"1.434B km",day:"10.7 hours",year:"29.46 years",
        moons:"146",temp:"-140°C",gravity:"10.44 m/s²",
        desc:"The sixth planet known for its extensive ring system made of ice and rock particles. The least dense planet — it could float on water.",
        color:0xe8d5a3,emissive:0x1a1508,emissiveI:0.05,atmoColor:[.8,.7,.5],
        hasAtmo:true,hasClouds:false,hasRing:true,isStar:false,tilt:0.47,
    },
    uranus:{
        name:"Uranus",type:"Ice Giant",
        diameter:"50,724 km",distance:"2.871B km",day:"17.2 hours",year:"84 years",
        moons:"28",temp:"-195°C",gravity:"8.87 m/s²",
        desc:"The seventh planet rotates on its side with an axial tilt of 98°. Its pale blue color comes from methane in its atmosphere absorbing red light.",
        color:0x72c9d2,emissive:0x081a1c,emissiveI:0.05,atmoColor:[.4,.75,.8],
        hasAtmo:true,hasClouds:false,hasRing:true,isStar:false,tilt:1.71,
    },
    neptune:{
        name:"Neptune",type:"Ice Giant",
        diameter:"49,528 km",distance:"4.495B km",day:"16.1 hours",year:"164.8 years",
        moons:"16",temp:"-200°C",gravity:"11.15 m/s²",
        desc:"The eighth and farthest planet. Known for its vivid blue color and supersonic winds — the fastest in the Solar System reaching 2,100 km/h.",
        color:0x3f54ba,emissive:0x060820,emissiveI:0.08,atmoColor:[.2,.3,.8],
        hasAtmo:true,hasClouds:false,hasRing:false,isStar:false,tilt:0.49,
    },
};

const BODY_KEYS=Object.keys(BODIES);
const R=2.5, SEG=128, TEX=2048, TEXH=1024;

/* ============================================================
   STATE
   ============================================================ */
const S={
    body:"earth",dragging:false,px:0,py:0,vx:0,vy:0,
    rx:0.35,ry:0,zoomT:6.2,zoom:6.2,
    auto:true,showClouds:true,showRings:true,
    mx:0,my:0,
};

/* ============================================================
   DOM
   ============================================================ */
const el=id=>document.getElementById(id);
const canvas=el("globe"),loader=el("loader"),ldFill=el("ld-fill"),ldPct=el("ld-pct");
const rsLat=el("rs-lat"),rsLng=el("rs-lng"),rsZoom=el("rs-zoom");
const tip=el("tip");

/* ============================================================
   NOISE
   ============================================================ */
function hash(x,y){let h=x*374761393+y*668265263;h=(h^(h>>13))*1274126177;return((h^(h>>16))&0x7fffffff)/0x7fffffff}
function noise(x,y){
    const ix=Math.floor(x),iy=Math.floor(y),fx=x-ix,fy=y-iy;
    const sx=fx*fx*(3-2*fx),sy=fy*fy*(3-2*fy);
    const a=hash(ix,iy),b=hash(ix+1,iy),c=hash(ix,iy+1),d=hash(ix+1,iy+1);
    return a+(b-a)*sx+(c-a)*sy+(d-a-c+a-(b-a))*sx*sy;
}
function fbm(x,y,oct=6){let v=0,a=.5,f=1;for(let i=0;i<oct;i++){v+=a*noise(x*f,y*f);f*=2.03;a*=.49}return v}

/* ============================================================
   TEXTURE GENERATORS
   ============================================================ */
function genSunTex(w,h){
    const cv=document.createElement("canvas");cv.width=w;cv.height=h;
    const ctx=cv.getContext("2d"),img=ctx.createImageData(w,h),d=img.data;
    for(let y=0;y<h;y++){const lat=(y/h)*Math.PI;for(let x=0;x<w;x++){
        const lng=(x/w)*Math.PI*2;
        const nx=Math.cos(lng)*Math.sin(lat)*3,nz=Math.sin(lng)*Math.sin(lat)*3;
        const n1=fbm(nx+1,nz+1,6),n2=fbm(nx*2+10,nz*2+10,4)*.3;
        const v=n1+n2;
        const i=(y*w+x)*4;
        d[i]=Math.min(255,200+v*100);d[i+1]=Math.min(255,120+v*120);
        d[i+2]=Math.min(255,20+v*80);d[i+3]=255;
    }}
    ctx.putImageData(img,0,0);return new THREE.CanvasTexture(cv);
}

function genMercuryTex(w,h){
    const cv=document.createElement("canvas");cv.width=w;cv.height=h;
    const ctx=cv.getContext("2d"),img=ctx.createImageData(w,h),d=img.data;
    for(let y=0;y<h;y++){const lat=(y/h)*Math.PI;for(let x=0;x<w;x++){
        const lng=(x/w)*Math.PI*2;
        const nx=Math.cos(lng)*Math.sin(lat)*5,nz=Math.sin(lng)*Math.sin(lat)*5;
        const base=fbm(nx+3,nz+7,7),craters=fbm(nx*4+20,nz*4+20,5);
        const v=base*.6+.4;const c=craters>.55?(craters-.55)*3:0;
        const bright=(v-c*.15)*180;
        const i=(y*w+x)*4;
        d[i]=bright*1.05;d[i+1]=bright*.95;d[i+2]=bright*.85;d[i+3]=255;
    }}
    ctx.putImageData(img,0,0);return new THREE.CanvasTexture(cv);
}

function genVenusTex(w,h){
    const cv=document.createElement("canvas");cv.width=w;cv.height=h;
    const ctx=cv.getContext("2d"),img=ctx.createImageData(w,h),d=img.data;
    for(let y=0;y<h;y++){const lat=(y/h)*Math.PI;for(let x=0;x<w;x++){
        const lng=(x/w)*Math.PI*2;
        const nx=Math.cos(lng)*Math.sin(lat)*4,ny=Math.cos(lat)*4,nz=Math.sin(lng)*Math.sin(lat)*4;
        const band=fbm(nx+ny*2,nz,5);const swirl=fbm(nx*3+100,nz*3+ny*2+100,4)*.2;
        const v=band+swirl;
        const i=(y*w+x)*4;
        d[i]=180+v*60;d[i+1]=150+v*50;d[i+2]=80+v*40;d[i+3]=255;
    }}
    ctx.putImageData(img,0,0);return new THREE.CanvasTexture(cv);
}

function genEarthTex(w,h){
    const cv=document.createElement("canvas");cv.width=w;cv.height=h;
    const ctx=cv.getContext("2d"),img=ctx.createImageData(w,h),d=img.data;
    for(let y=0;y<h;y++){const lat=(y/h)*Math.PI;const latD=90-y/h*180;for(let x=0;x<w;x++){
        const lng=(x/w)*Math.PI*2;
        const nx=Math.cos(lng)*Math.sin(lat)*4,nz=Math.sin(lng)*Math.sin(lat)*4;
        const elev=fbm(nx+2.3,nz+5.7,7)+fbm(nx*3+10,nz*3+20,5)*.3;
        const polar=Math.abs(latD),ice=polar>72-fbm(nx*2,nz*2,3)*15;
        const land=elev>.42;
        let r,g,b;
        if(ice){const v=.9+fbm(nx*5,nz*5,3)*.1;r=210*v;g=225*v;b=240*v}
        else if(land){
            const h2=(elev-.42)*3+fbm(nx*8,nz*8,4)*.15;
            if(polar>55){r=80+h2*60;g=100+h2*40;b=80+h2*30}
            else if(polar>35){const gv=fbm(nx*6,nz*6,3);r=40+h2*80+gv*20;g=85+h2*50+gv*30;b=30+h2*30}
            else if(polar>15){const dn=fbm(nx*3+100,nz*3+100,4);if(dn>.52){r=180+h2*40;g=155+h2*35;b=100+h2*20}else{r=35+h2*60;g=95+h2*45;b=25+h2*25}}
            else{const rf=fbm(nx*4,nz*4,4);r=20+h2*40+rf*15;g=75+h2*35+rf*25;b=15+h2*20}
            if(h2>.6){const s=(h2-.6)*3;r=r*(1-s)+220*s;g=g*(1-s)+225*s;b=b*(1-s)+235*s}
        }else{
            const dp=(0.42-elev)*2.5,on=fbm(nx*2+50,nz*2+50,3)*.08;
            if(dp<.15){r=30+on*20;g=90+on*25;b=150+on*15}
            else if(dp<.4){r=15+on*10;g=55+on*15;b=130+on*10}
            else{r=8+on*8;g=30+on*10;b=90+on*10}
        }
        const i=(y*w+x)*4;d[i]=Math.max(0,Math.min(255,r));d[i+1]=Math.max(0,Math.min(255,g));d[i+2]=Math.max(0,Math.min(255,b));d[i+3]=255;
    }}
    ctx.putImageData(img,0,0);return new THREE.CanvasTexture(cv);
}

function genMoonTex(w,h){
    const cv=document.createElement("canvas");cv.width=w;cv.height=h;
    const ctx=cv.getContext("2d"),img=ctx.createImageData(w,h),d=img.data;
    for(let y=0;y<h;y++){const lat=(y/h)*Math.PI;for(let x=0;x<w;x++){
        const lng=(x/w)*Math.PI*2;
        const nx=Math.cos(lng)*Math.sin(lat)*5,nz=Math.sin(lng)*Math.sin(lat)*5;
        const base=fbm(nx+7,nz+3,7),craters=fbm(nx*4+50,nz*4+50,5);
        const maria=fbm(nx*1.5+20,nz*1.5+20,4);
        let v=base*.5+.5;
        if(craters>.56)v-=(craters-.56)*1.5;
        if(maria<.38)v-=(.38-maria)*.4;
        v=Math.max(.15,Math.min(1,v));
        const bright=v*180;
        const i=(y*w+x)*4;
        d[i]=bright*1.0;d[i+1]=bright*.98;d[i+2]=bright*.95;d[i+3]=255;
    }}
    ctx.putImageData(img,0,0);return new THREE.CanvasTexture(cv);
}

function genMarsTex(w,h){
    const cv=document.createElement("canvas");cv.width=w;cv.height=h;
    const ctx=cv.getContext("2d"),img=ctx.createImageData(w,h),d=img.data;
    for(let y=0;y<h;y++){const lat=(y/h)*Math.PI;const latD=90-y/h*180;for(let x=0;x<w;x++){
        const lng=(x/w)*Math.PI*2;
        const nx=Math.cos(lng)*Math.sin(lat)*4,nz=Math.sin(lng)*Math.sin(lat)*4;
        const elev=fbm(nx+8,nz+4,7);
        const detail=fbm(nx*5+30,nz*5+30,4)*.15;
        const polar=Math.abs(latD);
        let r,g,b;
        if(polar>75){const ic=.85+fbm(nx*3,nz*3,3)*.15;r=200*ic;g=195*ic;b=190*ic}
        else{const v=elev+detail;r=160+v*60;g=70+v*40;b=20+v*30;
            if(elev>.55){const dk=(elev-.55)*3;r-=dk*30;g-=dk*15;b+=dk*10}
        }
        const i=(y*w+x)*4;d[i]=Math.max(0,Math.min(255,r));d[i+1]=Math.max(0,Math.min(255,g));d[i+2]=Math.max(0,Math.min(255,b));d[i+3]=255;
    }}
    ctx.putImageData(img,0,0);return new THREE.CanvasTexture(cv);
}

function genGasGiantTex(w,h,baseR,baseG,baseB,bandFreq,stormChance){
    const cv=document.createElement("canvas");cv.width=w;cv.height=h;
    const ctx=cv.getContext("2d"),img=ctx.createImageData(w,h),d=img.data;
    for(let y=0;y<h;y++){const lat=(y/h)*Math.PI;const latN=y/h;for(let x=0;x<w;x++){
        const lng=(x/w)*Math.PI*2;
        const nx=Math.cos(lng)*Math.sin(lat)*3,nz=Math.sin(lng)*Math.sin(lat)*3;
        const band=Math.sin(latN*Math.PI*bandFreq)*.3;
        const turb=fbm(nx+latN*5,nz+latN*3,5)*.25;
        const flow=fbm(nx*3+latN*8+50,nz*2+50,4)*.15;
        const v=.5+band+turb+flow;

        let r=baseR+v*60,g=baseG+v*45,b=baseB+v*35;

        // Storm spots
        const storm=fbm(nx*6+200,nz*6+latN*10+200,3);
        if(storm>stormChance){const s=(storm-stormChance)*5;r+=s*30;g-=s*10;b-=s*15}

        const i=(y*w+x)*4;d[i]=Math.max(0,Math.min(255,r));d[i+1]=Math.max(0,Math.min(255,g));d[i+2]=Math.max(0,Math.min(255,b));d[i+3]=255;
    }}
    ctx.putImageData(img,0,0);return new THREE.CanvasTexture(cv);
}

function genIceGiantTex(w,h,baseR,baseG,baseB){
    const cv=document.createElement("canvas");cv.width=w;cv.height=h;
    const ctx=cv.getContext("2d"),img=ctx.createImageData(w,h),d=img.data;
    for(let y=0;y<h;y++){const lat=(y/h)*Math.PI;const latN=y/h;for(let x=0;x<w;x++){
        const lng=(x/w)*Math.PI*2;
        const nx=Math.cos(lng)*Math.sin(lat)*4,nz=Math.sin(lng)*Math.sin(lat)*4;
        const band=Math.sin(latN*Math.PI*12)*.08;
        const clouds=fbm(nx*2+80,nz*2+80,5)*.15;
        const subtle=fbm(nx+latN*3,nz,4)*.1;
        const v=.5+band+clouds+subtle;
        const i=(y*w+x)*4;
        d[i]=Math.max(0,Math.min(255,baseR+v*50));
        d[i+1]=Math.max(0,Math.min(255,baseG+v*45));
        d[i+2]=Math.max(0,Math.min(255,baseB+v*40));
        d[i+3]=255;
    }}
    ctx.putImageData(img,0,0);return new THREE.CanvasTexture(cv);
}

function genBumpTex(w,h,seed=0){
    const cv=document.createElement("canvas");cv.width=w;cv.height=h;
    const ctx=cv.getContext("2d"),img=ctx.createImageData(w,h),d=img.data;
    for(let y=0;y<h;y++){const lat=(y/h)*Math.PI;for(let x=0;x<w;x++){
        const lng=(x/w)*Math.PI*2;
        const nx=Math.cos(lng)*Math.sin(lat)*4,nz=Math.sin(lng)*Math.sin(lat)*4;
        const v=fbm(nx+seed,nz+seed+5,6);
        const b=Math.min(255,v*255);
        const i=(y*w+x)*4;d[i]=d[i+1]=d[i+2]=b;d[i+3]=255;
    }}
    ctx.putImageData(img,0,0);return new THREE.CanvasTexture(cv);
}

function genCloudTex(w,h){
    const cv=document.createElement("canvas");cv.width=w;cv.height=h;
    const ctx=cv.getContext("2d"),img=ctx.createImageData(w,h),d=img.data;
    for(let y=0;y<h;y++){const lat=(y/h)*Math.PI;for(let x=0;x<w;x++){
        const lng=(x/w)*Math.PI*2;
        const nx=Math.cos(lng)*Math.sin(lat),nz=Math.sin(lng)*Math.sin(lat);
        const c=fbm(nx*5+100,nz*5+200,6);
        const a=c>.48?Math.min(1,(c-.48)*4):0;
        const i=(y*w+x)*4;d[i]=d[i+1]=d[i+2]=255;d[i+3]=a*180;
    }}
    ctx.putImageData(img,0,0);return new THREE.CanvasTexture(cv);
}

function genRingTex(w){
    const cv=document.createElement("canvas");cv.width=w;cv.height=64;
    const ctx=cv.getContext("2d"),img=ctx.createImageData(w,64),d=img.data;
    for(let x=0;x<w;x++){
        const t=x/w;
        const gap1=t>.18&&t<.22, gap2=t>.48&&t<.5, gap3=t>.72&&t<.74;
        const density=gap1||gap2||gap3?0:(fbm(t*20,0,4)*.6+.4)*(.3+Math.sin(t*Math.PI)*.7);
        const bright=180+fbm(t*30+100,5,3)*60;
        for(let y=0;y<64;y++){
            const i=(y*w+x)*4;
            d[i]=bright;d[i+1]=bright*.9;d[i+2]=bright*.7;d[i+3]=density*220;
        }
    }
    ctx.putImageData(img,0,0);return new THREE.CanvasTexture(cv);
}

/* ============================================================
   THREE.JS
   ============================================================ */
let scene,camera,renderer,clock;
let bodyGroup,mainMesh,cloudMesh,atmosMesh,ringMesh;
let starField,sunLight;
let texCache={};

const ATMO_VS=`varying vec3 vN;varying vec3 vP;void main(){vN=normalize(normalMatrix*normal);vP=(modelMatrix*vec4(position,1.)).xyz;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`;
const ATMO_FS=`uniform vec3 uCol;varying vec3 vN;varying vec3 vP;void main(){vec3 vd=normalize(cameraPosition-vP);float rim=1.-max(0.,dot(vd,vN));rim=pow(rim,3.2);gl_FragColor=vec4(uCol,rim*.65);}`;

function ldProgress(p){const v=Math.min(100,Math.round(p*100));ldFill.style.width=v+"%";ldPct.textContent=v+"%"}

function initScene(){
    clock=new THREE.Clock();
    scene=new THREE.Scene();
    scene.fog=new THREE.FogExp2(0x000003,.005);

    camera=new THREE.PerspectiveCamera(45,innerWidth/innerHeight,.1,500);
    camera.position.set(0,0,S.zoom);

    renderer=new THREE.WebGLRenderer({canvas,antialias:true});
    renderer.setPixelRatio(Math.min(devicePixelRatio,2));
    renderer.setSize(innerWidth,innerHeight);
    renderer.toneMapping=THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure=1.15;

    scene.add(new THREE.AmbientLight(0x334466,.35));
    sunLight=new THREE.DirectionalLight(0xfff5e6,1.4);
    sunLight.position.set(5,3,5);
    scene.add(sunLight);
    scene.add(new THREE.DirectionalLight(0x223366,.2).translateX(-4).translateY(-2).translateZ(-3));
    scene.add(new THREE.HemisphereLight(0x4488cc,0x002244,.12));

    buildStars();
    buildBody("earth");
    setupInput();
    animate();
}

function buildStars(){
    const N=6000,geo=new THREE.BufferGeometry(),p=new Float32Array(N*3);
    for(let i=0;i<N;i++){
        const r=60+Math.random()*140,th=Math.random()*Math.PI*2,ph=Math.acos(2*Math.random()-1);
        p[i*3]=r*Math.sin(ph)*Math.cos(th);p[i*3+1]=r*Math.sin(ph)*Math.sin(th);p[i*3+2]=r*Math.cos(ph);
    }
    geo.setAttribute("position",new THREE.BufferAttribute(p,3));
    starField=new THREE.Points(geo,new THREE.PointsMaterial({color:0xffffff,size:.12,transparent:true,opacity:.65,sizeAttenuation:true,depthWrite:false}));
    scene.add(starField);
}

function getBodyTex(key){
    if(texCache[key])return texCache[key];
    let tex;
    const w=TEX,h=TEXH;
    switch(key){
        case"sun":tex=genSunTex(w,h);break;
        case"mercury":tex=genMercuryTex(w,h);break;
        case"venus":tex=genVenusTex(w,h);break;
        case"earth":tex=genEarthTex(w,h);break;
        case"moon":tex=genMoonTex(w,h);break;
        case"mars":tex=genMarsTex(w,h);break;
        case"jupiter":tex=genGasGiantTex(w,h,150,110,60,18,.62);break;
        case"saturn":tex=genGasGiantTex(w,h,180,160,100,14,.68);break;
        case"uranus":tex=genIceGiantTex(w,h,60,170,185);break;
        case"neptune":tex=genIceGiantTex(w,h,30,50,160);break;
    }
    texCache[key]=tex;
    return tex;
}

function buildBody(key){
    const bd=BODIES[key];

    /* Remove old */
    if(bodyGroup){scene.remove(bodyGroup)}
    bodyGroup=new THREE.Group();
    scene.add(bodyGroup);

    const tex=getBodyTex(key);
    const bumpTex=genBumpTex(512,256,BODY_KEYS.indexOf(key)*10);
    ldProgress(.85);

    /* Main sphere */
    let mat;
    if(bd.isStar){
        mat=new THREE.MeshBasicMaterial({
            map:tex,
            color:new THREE.Color(bd.color),
        });
    }else{
        mat=new THREE.MeshPhongMaterial({
            map:tex,
            bumpMap:bumpTex,
            bumpScale:.03,
            specular:new THREE.Color(0x222222),
            shininess:15,
            emissive:new THREE.Color(bd.emissive),
            emissiveIntensity:bd.emissiveI,
        });
    }
    mainMesh=new THREE.Mesh(new THREE.SphereGeometry(R,SEG,SEG),mat);
    bodyGroup.add(mainMesh);

    /* Sun glow */
    if(bd.isStar){
        const glowMat=new THREE.ShaderMaterial({
            vertexShader:ATMO_VS,
            fragmentShader:`varying vec3 vN;varying vec3 vP;void main(){vec3 vd=normalize(cameraPosition-vP);float rim=1.-max(0.,dot(vd,vN));rim=pow(rim,2.);gl_FragColor=vec4(1.,.6,.1,rim*.8);}`,
            transparent:true,side:THREE.BackSide,depthWrite:false,blending:THREE.AdditiveBlending,
        });
        const glow=new THREE.Mesh(new THREE.SphereGeometry(R*1.3,64,64),glowMat);
        bodyGroup.add(glow);

        const sunPt=new THREE.PointLight(0xffcc66,2,20);
        sunPt.position.set(0,0,0);
        bodyGroup.add(sunPt);

        sunLight.intensity=.3;
    }else{
        sunLight.intensity=1.4;
    }

    /* Atmosphere */
    if(bd.hasAtmo){
        const ac=bd.atmoColor;
        const atmosMat=new THREE.ShaderMaterial({
            vertexShader:ATMO_VS,fragmentShader:ATMO_FS,
            uniforms:{uCol:{value:new THREE.Color(ac[0],ac[1],ac[2])}},
            transparent:true,side:THREE.BackSide,depthWrite:false,blending:THREE.AdditiveBlending,
        });
        atmosMesh=new THREE.Mesh(new THREE.SphereGeometry(R*1.12,64,64),atmosMat);
        bodyGroup.add(atmosMesh);

        /* Inner rim */
        const rimMat=new THREE.ShaderMaterial({
            vertexShader:ATMO_VS,
            fragmentShader:`uniform vec3 uCol;varying vec3 vN;varying vec3 vP;void main(){vec3 vd=normalize(cameraPosition-vP);float rim=1.-max(0.,dot(vd,vN));rim=pow(rim,5.);gl_FragColor=vec4(uCol,rim*.25);}`,
            uniforms:{uCol:{value:new THREE.Color(ac[0],ac[1],ac[2])}},
            transparent:true,side:THREE.FrontSide,depthWrite:false,
        });
        bodyGroup.add(new THREE.Mesh(new THREE.SphereGeometry(R*1.002,64,64),rimMat));
    }else{atmosMesh=null}

    /* Clouds */
    cloudMesh=null;
    if(bd.hasClouds){
        const cTex=genCloudTex(1024,512);
        const cMat=new THREE.MeshPhongMaterial({map:cTex,transparent:true,opacity:.45,depthWrite:false,side:THREE.DoubleSide});
        cloudMesh=new THREE.Mesh(new THREE.SphereGeometry(R*1.008,64,64),cMat);
        cloudMesh.visible=S.showClouds;
        bodyGroup.add(cloudMesh);
    }

    /* Rings */
    ringMesh=null;
    if(bd.hasRing){
        const rTex=genRingTex(512);
        rTex.wrapS=THREE.ClampToEdgeWrapping;
        const innerR=R*1.3,outerR=R*2.4;
        const rGeo=new THREE.RingGeometry(innerR,outerR,128);
        /* Fix UV mapping for ring */
        const pos=rGeo.attributes.position;
        const uv=rGeo.attributes.uv;
        for(let i=0;i<pos.count;i++){
            const x=pos.getX(i),z=pos.getZ(i);
            const dist=Math.sqrt(x*x+z*z);
            uv.setXY(i,(dist-innerR)/(outerR-innerR),.5);
        }
        const rMat=new THREE.MeshBasicMaterial({map:rTex,transparent:true,side:THREE.DoubleSide,depthWrite:false,opacity:.85});
        ringMesh=new THREE.Mesh(rGeo,rMat);
        ringMesh.rotation.x=Math.PI/2+.1;
        ringMesh.visible=S.showRings;
        bodyGroup.add(ringMesh);

        /* Ring shadow on planet (darkened disc) */
        const shadowGeo=new THREE.RingGeometry(innerR*.98,outerR*.5,64);
        const shadowMat=new THREE.MeshBasicMaterial({color:0x000000,transparent:true,opacity:.12,side:THREE.DoubleSide,depthWrite:false});
        const shadowMesh=new THREE.Mesh(shadowGeo,shadowMat);
        shadowMesh.rotation.x=Math.PI/2+.1;
        shadowMesh.position.y=-.01;
        bodyGroup.add(shadowMesh);
    }

    bodyGroup.rotation.x=bd.tilt;
    bodyGroup.rotation.y=S.ry;

    /* Update UI */
    updateInfoPanel(key);
    ldProgress(1);
}

/* ============================================================
   INFO PANEL UPDATE
   ============================================================ */
function updateInfoPanel(key){
    const bd=BODIES[key];
    el("ip-name").textContent=bd.name;
    el("ip-type").textContent=bd.type;
    el("ip-diameter").textContent=bd.diameter;
    el("ip-distance").textContent=bd.distance;
    el("ip-day").textContent=bd.day;
    el("ip-year").textContent=bd.year;
    el("ip-moons").textContent=bd.moons;
    el("ip-temp").textContent=bd.temp;
    el("ip-gravity").textContent=bd.gravity;
    el("ip-desc").textContent=bd.desc;
    el("body-subtitle").textContent=bd.name.toUpperCase();
    el("body-subtitle").style.color=`#${new THREE.Color(bd.color).getHexString()}`;
}

/* ============================================================
   SWITCH BODY
   ============================================================ */
function switchBody(key){
    if(key===S.body)return;
    S.body=key;

    /* Button state */
    document.querySelectorAll(".p-btn").forEach(b=>b.classList.remove("active"));
    document.querySelector(`.p-btn[data-body="${key}"]`).classList.add("active");

    /* Transition out */
    gsap.to(bodyGroup.scale,{x:.01,y:.01,z:.01,duration:.3,ease:"power3.in",onComplete(){
        buildBody(key);
        bodyGroup.scale.set(.01,.01,.01);
        gsap.to(bodyGroup.scale,{x:1,y:1,z:1,duration:.6,ease:"elastic.out(1,0.6)"});
    }});

    /* Reset rotation */
    S.rx=BODIES[key].tilt;S.ry=0;S.vx=0;S.vy=0;
    S.zoomT=6.2;

    /* Cloud/ring button states */
    el("t-clouds").classList.toggle("active",BODIES[key].hasClouds&&S.showClouds);
    el("t-ring").classList.toggle("active",BODIES[key].hasRing&&S.showRings);
}

/* ============================================================
   INPUT
   ============================================================ */
function setupInput(){
    canvas.addEventListener("pointerdown",e=>{S.dragging=true;S.px=e.clientX;S.py=e.clientY;S.vx=0;S.vy=0;canvas.style.cursor="grabbing"});
    window.addEventListener("pointermove",e=>{
        S.mx=(e.clientX/innerWidth-.5)*2;S.my=(e.clientY/innerHeight-.5)*2;
        if(!S.dragging)return;
        const dx=e.clientX-S.px,dy=e.clientY-S.py;
        S.vx=dx*.004;S.vy=dy*.004;
        S.ry+=S.vx;S.rx+=S.vy;
        S.rx=Math.max(-Math.PI/2,Math.min(Math.PI/2,S.rx));
        S.px=e.clientX;S.py=e.clientY;
    });
    window.addEventListener("pointerup",()=>{S.dragging=false;canvas.style.cursor="grab"});
    canvas.addEventListener("wheel",e=>{e.preventDefault();S.zoomT+=e.deltaY*.004;S.zoomT=Math.max(3.2,Math.min(14,S.zoomT))},{passive:false});

    /* Pinch */
    let pinch=0;
    canvas.addEventListener("touchstart",e=>{if(e.touches.length===2){const dx=e.touches[0].clientX-e.touches[1].clientX,dy=e.touches[0].clientY-e.touches[1].clientY;pinch=Math.sqrt(dx*dx+dy*dy)}},{passive:true});
    canvas.addEventListener("touchmove",e=>{if(e.touches.length===2){const dx=e.touches[0].clientX-e.touches[1].clientX,dy=e.touches[0].clientY-e.touches[1].clientY;const d=Math.sqrt(dx*dx+dy*dy);S.zoomT+=(pinch-d)*.012;S.zoomT=Math.max(3.2,Math.min(14,S.zoomT));pinch=d}},{passive:true});

    window.addEventListener("resize",()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight)});

    /* Buttons */
    el("t-reset").onclick=()=>{gsap.to(S,{rx:BODIES[S.body].tilt,ry:0,zoomT:6.2,duration:1,ease:"power3.inOut"});S.vx=0;S.vy=0};
    el("t-spin").onclick=()=>{S.auto=!S.auto;el("t-spin").classList.toggle("active",S.auto)};
    el("t-zin").onclick=()=>{S.zoomT=Math.max(3.2,S.zoomT-.8)};
    el("t-zout").onclick=()=>{S.zoomT=Math.min(14,S.zoomT+.8)};
    el("t-clouds").onclick=()=>{
        S.showClouds=!S.showClouds;
        el("t-clouds").classList.toggle("active",S.showClouds);
        if(cloudMesh)gsap.to(cloudMesh.material,{opacity:S.showClouds?.45:0,duration:.3,onStart(){if(S.showClouds)cloudMesh.visible=true},onComplete(){if(!S.showClouds&&cloudMesh)cloudMesh.visible=false}});
    };
    el("t-ring").onclick=()=>{
        S.showRings=!S.showRings;
        el("t-ring").classList.toggle("active",S.showRings);
        if(ringMesh)gsap.to(ringMesh.material,{opacity:S.showRings?.85:0,duration:.3,onStart(){if(S.showRings)ringMesh.visible=true},onComplete(){if(!S.showRings&&ringMesh)ringMesh.visible=false}});
    };

    /* Planet buttons */
    document.querySelectorAll(".p-btn").forEach(b=>{
        b.addEventListener("click",()=>switchBody(b.dataset.body));
    });

    /* Keyboard: 1-0 for planets, plus shortcuts */
    document.addEventListener("keydown",e=>{
        const num=parseInt(e.key);
        if(num>=0&&num<=9){
            const keys=["sun","mercury","venus","earth","moon","mars","jupiter","saturn","uranus","neptune"];
            switchBody(keys[num]);return;
        }
        switch(e.key){
            case" ":e.preventDefault();S.auto=!S.auto;el("t-spin").classList.toggle("active",S.auto);break;
            case"r":case"R":el("t-reset").click();break;
            case"+":case"=":S.zoomT=Math.max(3.2,S.zoomT-.5);break;
            case"-":S.zoomT=Math.min(14,S.zoomT+.5);break;
            case"c":case"C":el("t-clouds").click();break;
            case"ArrowRight":
                const ci=BODY_KEYS.indexOf(S.body);
                switchBody(BODY_KEYS[(ci+1)%BODY_KEYS.length]);break;
            case"ArrowLeft":
                const ci2=BODY_KEYS.indexOf(S.body);
                switchBody(BODY_KEYS[(ci2-1+BODY_KEYS.length)%BODY_KEYS.length]);break;
        }
    });
}

/* ============================================================
   ANIMATION LOOP
   ============================================================ */
function animate(){
    requestAnimationFrame(animate);
    const t=clock.getElapsedTime();

    /* Inertia */
    if(!S.dragging){
        S.vx*=.93;S.vy*=.93;
        S.ry+=S.vx;S.rx+=S.vy;
        S.rx=Math.max(-Math.PI/2,Math.min(Math.PI/2,S.rx));
    }

    /* Auto spin */
    if(S.auto&&!S.dragging&&Math.abs(S.vx)<.0005)S.ry+=.002;

    if(bodyGroup){
        bodyGroup.rotation.x=S.rx;
        bodyGroup.rotation.y=S.ry;
    }

    /* Zoom */
    S.zoom+=(S.zoomT-S.zoom)*.07;
    camera.position.z=S.zoom;

    /* Clouds drift */
    if(cloudMesh&&cloudMesh.visible)cloudMesh.rotation.y+=.0003;

    /* Sun surface animation */
    if(S.body==="sun"&&mainMesh){
        mainMesh.rotation.y=S.ry+t*.01;
    }

    /* Stars */
    if(starField){starField.rotation.y=t*.001;starField.rotation.x=Math.sin(t*.0005)*.01}

    /* Ring tilt animation */
    if(ringMesh&&ringMesh.visible){
        ringMesh.rotation.z=Math.sin(t*.2)*.02;
    }

    /* Camera subtle sway */
    camera.position.x+=(S.mx*.8-camera.position.x)*.012;
    camera.position.y+=(.0+S.my*.4-camera.position.y)*.012;
    camera.lookAt(0,0,0);

    updateStats();
    renderer.render(scene,camera);
}

function updateStats(){
    const latD=-(S.rx*180/Math.PI);
    const lngR=-((S.ry%(Math.PI*2))*180/Math.PI);
    const lngD=((lngR%360)+540)%360-180;
    rsLat.textContent=latD.toFixed(1)+"°";
    rsLng.textContent=lngD.toFixed(1)+"°";
    rsZoom.textContent=(14/S.zoom).toFixed(1)+"×";
}

/* ============================================================
   INIT
   ============================================================ */
setTimeout(()=>{
    ldProgress(.01);
    initScene();
    setTimeout(()=>{loader.classList.add("done")},500);
},60);

})();