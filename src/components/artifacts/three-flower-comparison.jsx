import React, { useState, useEffect, useRef } from 'react';

// Iris PCA data embedded
const IRIS_DATA = {
  "eigenvalues": [1.0, 0.3131852510872176, 0.05028507293718103],
  "explained_variance_ratio": [0.729624454132999, 0.2285076178670174, 0.036689218892828744],
  "pc_scores": [[-2.2647028088075873,0.4800265965209897,0.12770602230015168],[-2.0809611519657665,-0.6741335566053523,0.2346088539845673],[-2.3642290538902997,-0.3419080238846757,-0.044201484838744566],[-2.299384217042707,-0.5973945076746751,-0.09129010632068262],[-2.3898421663138434,0.6468353829020275,-0.015738195676259593],[-2.0756309481765105,1.489177523321167,-0.02696829443978301],[-2.444028835134151,0.0476441976300146,-0.33547040114311477],[-2.232847158872014,0.2231480726895922,0.08845496897855356],[-2.3334679399473314,-1.1151802974300756,-0.14398233250776412],[-2.1840837356893986,-0.46487262591534106,0.2752699528527141],[-2.1649346279726127,1.0400584443833654,0.13609945338856655],[-2.2004268943539016,0.3123054830283977,-0.1330058755703685],[-2.2666891432042063,-0.7293102233025033,0.08904001710163161],[-2.6269851762765587,-1.502811396027382,-0.2177900218225721],[-2.220095475396814,2.3358858147966234,0.1913744518734786],[-1.9461673654777926,2.1907704181534126,-0.5020007155647741],[-2.1880862925896634,1.629554551127968,-0.03331968873179252],[-2.2647028088075873,0.4800265965209897,0.14455009951064853],[-1.8329027155208065,1.7489272469639854,-0.36919640405358445],[-2.1573967069066673,0.8984349726177006,-0.19963218424348108],[-2.02186465277821,0.9172063488653567,0.48579995451867676],[-2.2125847994322757,0.7127978002096552,-0.2077449013471226],[-2.6269851762765587,0.6887386779162787,-0.3874950976152177],[-1.8329027155208065,0.28682397984498316,0.03821176729814964],[-2.2125847994322757,0.24906496802912337,-0.4168129096831788],[-2.0596801006967336,-0.7499802999421341,0.12913436965026032],[-2.0809611519657665,0.09685224867082758,0.1269473869495651],[-2.1983557500012426,0.5202686302423898,0.029933191075693405],[-2.1983557500012426,0.7580121828896899,0.08696226060125798],[-2.3642290538902997,-0.39750653782466176,-0.014870087663946846],[-2.0596801006967336,-0.5127988903546058,-0.034988853462046336],[-2.02186465277821,0.9172063488653567,0.15337534621991513],[-2.220095475396814,1.4153990461309696,0.1327951336069703],[-2.0756309481765105,1.6712945649219947,0.21724287621996206],[-2.1840837356893986,-0.46487262591534106,-0.015738195676259593],[-2.1840837356893986,-0.08612740948660685,0.009696934847127855],[-2.220095475396814,0.6886965063796544,0.019015088971406574],[-2.1840837356893986,0.6099697694058488,0.2672126346694427],[-2.3642290538902997,-0.9191346506764655,-0.09997024168628706],[-2.2004268943539016,0.2646686413283626,0.08396769735586679],[-2.3255943093858894,0.6045052547303155,-0.07686091871118165],[-2.3334679399473314,-0.9544168469764306,-0.3177645810988117],[-2.3642290538902997,-0.5162282618911915,-0.0034541076959584463],[-2.02186465277821,0.7324082484056179,-0.054867754217929515],[-2.0756309481765105,0.5419366916024604,0.4064399879665168],[-2.0809611519657665,-0.6741335566053523,0.15188785906862946],[-2.1573967069066673,0.49473976704228507,0.11363199414060906],[-2.3334679399473314,-0.4522727161953063,-0.10130408648842218],[-2.1649346279726127,0.8581363183678004,0.04046879553619088],[-2.232847158872014,0.04764419763001459,0.06347756820772554],[0.5307068037195178,0.7541268686579974,-0.43897119261313936],[0.42042795745176594,0.3178679013224843,-0.1461028987015189],[0.6423185214247212,0.40252306864832,0.0004880226939309863],[0.10720892203568566,-1.0556684915502016,-0.15631038597776155],[0.38861014685441464,0.014254970002445098,-0.06102993098059693],[-0.01377383807155645,-0.26072531160671314,0.0406039795652902],[0.49145939432185494,0.7957969702893876,0.05330954137534644],[-0.7329426055312068,-1.0072206447701667,-0.09095899731638155],[0.22540286318653356,0.06623484281091793,0.05163783164509285],[-0.25983850414177115,-0.7252248090707958,0.08462264380089819],[0.5307068037195178,-1.751877477226934,-0.08962512234913039],[0.08117146962903853,0.35898839511623444,0.08562989787323516],[0.10720892203568566,-1.0949506878501666,-0.6097093230390666],[-0.06585874318845973,-0.23022384852670017,0.04210943298838721],[0.3779506212198982,-0.7914867099840743,-0.13963118183995102],[0.33310408441922337,0.5625166982993849,-0.15831587771863873],[0.057901960107709105,-0.18025327817839369,0.03654005756789604],[-0.11793365830536302,-0.6590688099992012,-0.4149799138411299],[0.5733927899228634,-0.4986842046228984,-0.23942662303251326],[0.02978441059639524,-0.6590688099992012,0.22174299011697165],[-0.01377383807155645,0.4404697635537196,0.6022700166610295],[0.22540286318653356,-0.08612740948660685,-0.015069086963248107],[0.33310408441922337,-0.7036102090142459,-0.30776460757501704],[0.15928383715258895,-0.022808628857782,-0.026884933872241295],[0.33310408441922337,-0.0047356291378169565,0.12101712980860015],[0.3779506212198982,0.14397279320662393,0.04094341192560455],[0.5093257524504848,0.1356067623066588,0.015552989929348325],[0.5946738411918963,0.40252306864832,0.17232780403137857],[-0.06585874318845973,-0.025121853857737488,0.08028257611820156],[0.2893603155798807,-1.0745720556501467,-0.14226288656983597],[-0.18303730963558987,-1.2041735136500367,-0.07836820711546853],[-0.18303730963558987,-0.9771093456764058,-0.10864060633019754],[-0.0232969918584249,-0.3812241099466078,0.024605195284401137],[0.057901960107709105,-0.6147860037492238,0.07528757769875255],[0.6849795077280939,0.016567195002400586,-0.2010131916168762],[0.2893603155798807,0.7374767798725893,0.3021324945454054],[-0.06585874318845973,0.23770909669289526,-0.1728009939375225],[0.08117146962903853,0.4089802385537495,-0.10680774394296333],[-0.11793365830536302,-0.1593818639584239,0.04044278613505385],[0.2680792643108477,-0.7293102233025033,-0.08195605665558955],[0.057901960107709105,-0.4523148877318919,0.06197027980344242],[-0.2172002554717364,-0.43202320773188633,-0.14826849136797054],[0.08117146962903853,-0.28256801279213644,0.0573322393573447],[0.15928383715258895,-0.26072531160671314,0.12968387348265628],[0.2680792643108477,-0.03049962889678848,-0.044201484838744566],[0.18532128955923608,-0.7040053232459386,0.12518400061276316],[0.15928383715258895,-0.34118247938843207,0.19883306605574192],[0.2680792643108477,-0.2583750978584441,0.035858662578694316],[0.42042795745176594,-0.08612740948660685,0.0406039795652902],[0.2893603155798807,0.07013234281136294,0.055536962791970266],[1.2785037180867082,0.6831490254258048,0.3603903056595326],[0.7915766826213316,-0.47757203591485495,0.10529355178464318],[1.1349289697423173,0.4342051211336849,-0.02946559326143529],[0.851576585972168,0.011942744002489599,-0.17463385631275704],[1.0778353296501237,0.4030000813424598,-0.21312586986765045],[1.6013504203051579,0.625034132945694,0.3871054081963807],[0.05790196010770911,-1.1704168539300407,-0.029133491961479797],[1.3213406874281228,0.2451354788933205,-0.08369892869082372],[1.1135479184732844,-0.629158002449189,-0.3074983827371621],[1.1775301751223523,0.8316594180433038,0.6189871139635653],[0.7915766826213316,0.36289324271623144,0.02627189878426209],[0.6636984564590609,-0.15547701635842093,0.00952635697999774],[0.9850265684389102,0.3384478946255598,0.007047992351127162],[0.7489156963179589,-0.6741335566053523,-0.024735956563240995],[0.7702397413888983,-0.4355798019636288,0.015552989929348325],[0.8302355996687954,0.48389239724185455,0.21657535327918628],[0.8729005009385955,0.051939861629969615,-0.07152541875938456],[1.7146783278445858,1.0011849377834352,0.5905757969239805],[1.7359593791136188,-0.3688454777466379,-0.5953092969103809],[0.48359129919495165,-0.6741335566053523,-0.16063258746890633],[1.0351703433467512,0.541684363339135,0.2121430165831662],[0.5307068037195178,-0.4690157626635994,-0.25643711319283508],[1.756240430382652,-0.019496403857826502,-0.25310099823558596],[0.5307068037195178,-0.21328113160758032,-0.11847117327883186],[0.9423615821355375,0.6412428331427887,0.3270872073940924],[1.0138892920777181,0.19062958260082538,0.09579750730053206],[0.6210374701556883,0.009630519002534111,-0.15481309757347465],[0.6210374701556883,-0.01128670873799262,-0.03715581346199183],[1.2785037180867082,-0.14527332296042392,-0.14059117682957103],[1.3959916149559893,0.23021467749287278,0.4434394640164803],[0.9850265684389102,-0.029133997433827144,-0.11096867248855637],[0.3779506212198982,-1.0388330062746684,0.19366071613023917],[0.8942005109062649,-0.23440813172665519,-0.42646869182286383],[1.3746625587031211,0.6206628264458641,-0.3291592657874774],[0.8088545484051624,-1.0430137064746513,-0.06419889093462386],[0.6636984564590609,0.2080462402933504,-0.11163737851689432],[1.0565213896319489,0.24117296802956838,-0.01936995203351825],[0.9637045221537126,-0.20517308752646206,0.24423176431483347],[0.7489156963179589,-0.021442598068007003,0.03185594420139873],[0.8942005109062649,0.2847091722933554,-0.15781602498231377],[0.851576585972168,0.5377539203024948,0.6090145720770735],[0.9637045221537126,-0.06638785858617425,0.28954271206677184],[0.9210805308665046,-1.4078552800273869,-0.3874950976152177],[1.0351703433467512,0.03993519766901809,-0.08553179107805794],[0.7275646500527962,-0.34118247938843207,0.19883306605574192],[1.2253612054319384,0.37713890920830194,-0.0369753927323743],[1.0884664193751476,-0.2829862974267431,0.3771074029620686],[1.9266893850855883,-0.1855842978864819,0.15188785906862946],[1.3533299106883386,0.7123606695296901,0.13109307642239803],[1.289395369356493,-0.10650111608651175,-0.08769688539113119],[1.178704939483613,0.11042520298090779,0.0718115578114447],[1.7932331958851162,0.006964370862183043,0.18632980619954198],[1.622631471574191,0.3978194630483173,-0.06686090705863535],[1.8572854525341841,0.2660140831533928,-0.08186590547808436],[1.3853669412193715,0.4030000813424598,0.011845811510053803],[2.0373265076101097,0.47431368552121696,-0.13348654084431735],[1.1681278394835659,-0.20584577712660205,0.35234375404218983],[1.5197326350279357,0.1506748882049746,0.18799654627043932],[1.622631471574191,-0.3882623532147105,0.05180225297105958],[1.7932331958851162,-0.004035629137816957,0.022442351336158323],[1.4916487117168612,0.8262949033677705,0.0034463312144221606],[1.0244683154535267,0.5159000788124597,0.2188524973859378],[1.3533299106883386,0.2247568466933403,-0.1413028915702046],[1.0244683154535267,-0.1855842978864819,0.12935111941231932],[1.1147471617207884,0.006964370862183043,-0.20346117000938218],[1.622631471574191,-0.16491653752641147,0.21174300335006894],[1.4489627254134069,0.6206628264458641,0.029933191075693405],[1.1574669419836318,-0.08612740948660685,-0.24143211477338609],[2.232908654806938,0.10022889958081256,0.11196028168014142],[1.9480704363546213,0.22985000839338542,-0.14493062147470728],[1.2146373216664501,0.21457684669334026,-0.08186590547808436],[1.6546280364600148,0.42833603992824176,-0.2585498688003171]],
  "species": [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
  "species_names": ["setosa", "versicolor", "virginica"]
};

export default function ThreeFlowerComparison() {
  const [flower1, setFlower1] = useState(0);
  const [flower2, setFlower2] = useState(50);
  const [flower3, setFlower3] = useState(100);
  
  const [zoom12, setZoom12] = useState(1);
  const [cutoff12, setCutoff12] = useState(0.5);
  
  const [zoom13, setZoom13] = useState(1);
  const [cutoff13, setCutoff13] = useState(0.5);
  
  const [zoom23, setZoom23] = useState(1);
  const [cutoff23, setCutoff23] = useState(0.5);
  
  const [time, setTime] = useState(0);
  
  const canvasFlower1Ref = useRef(null);
  const canvasFlower2Ref = useRef(null);
  const canvasFlower3Ref = useRef(null);
  
  const canvasChladni12Ref = useRef(null);
  const canvasChladni13Ref = useRef(null);
  const canvasChladni23Ref = useRef(null);
  
  useEffect(() => {
    const animate = () => {
      setTime(t => t + 0.02);
    };
    
    const animationId = requestAnimationFrame(function loop() {
      animate();
      requestAnimationFrame(loop);
    });
    
    return () => cancelAnimationFrame(animationId);
  }, []);
  
  const getWaveValue = (position, pcScores, eigenvalues, zoom, wavelength, t) => {
    let value = 0;
    for (let i = 0; i < eigenvalues.length; i++) {
      const amplitude = eigenvalues[i];
      const freq = Math.abs(pcScores[i]) * zoom;
      value += amplitude * Math.sin((position / wavelength) * 2 * Math.PI * freq + t);
    }
    return value;
  };
  
  const drawSuperposition = (canvas, pcScores, eigenvalues, color, label) => {
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, width, height);
    
    const wavelength = width / 2;
    const amplitude = height / 3;
    const centerY = height / 2;
    
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    
    for (let x = 0; x < width; x++) {
      const y = centerY + amplitude * getWaveValue(x, pcScores, eigenvalues, 1, wavelength, time);
      if (x === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();
    
    // Draw center line
    ctx.beginPath();
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    ctx.moveTo(0, centerY);
    ctx.lineTo(width, centerY);
    ctx.stroke();
    ctx.setLineDash([]);
    
    // Draw label
    ctx.fillStyle = color;
    ctx.font = '11px sans-serif';
    ctx.fillText(label, 5, 14);
  };
  
  const drawChladniPattern = (canvas, pcScoresX, pcScoresY, zoom, cutoff) => {
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    const eigenvalues = IRIS_DATA.eigenvalues;
    
    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;
    const wavelength = width / 2;
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const waveX = getWaveValue(x, pcScoresX, eigenvalues, zoom, wavelength, time);
        const waveY = getWaveValue(y, pcScoresY, eigenvalues, zoom, wavelength, time);
        
        const combined = waveX * waveY;
        const thresholded = Math.abs(combined) < cutoff ? 0 : combined;
        
        const intensity = Math.floor((thresholded + 1) * 127.5);
        
        const idx = (y * width + x) * 4;
        data[idx] = intensity;
        data[idx + 1] = Math.floor(intensity * 0.7);
        data[idx + 2] = Math.floor(intensity * 1.2);
        data[idx + 3] = 255;
      }
    }
    
    ctx.putImageData(imageData, 0, 0);
  };
  
  useEffect(() => {
    const eigenvalues = IRIS_DATA.eigenvalues;
    
    const species1 = IRIS_DATA.species_names[IRIS_DATA.species[flower1]];
    const species2 = IRIS_DATA.species_names[IRIS_DATA.species[flower2]];
    const species3 = IRIS_DATA.species_names[IRIS_DATA.species[flower3]];
    
    drawSuperposition(canvasFlower1Ref.current, IRIS_DATA.pc_scores[flower1], eigenvalues, '#3b82f6', `#${flower1 + 1} ${species1}`);
    drawSuperposition(canvasFlower2Ref.current, IRIS_DATA.pc_scores[flower2], eigenvalues, '#10b981', `#${flower2 + 1} ${species2}`);
    drawSuperposition(canvasFlower3Ref.current, IRIS_DATA.pc_scores[flower3], eigenvalues, '#a78bfa', `#${flower3 + 1} ${species3}`);
    
    drawChladniPattern(canvasChladni12Ref.current, IRIS_DATA.pc_scores[flower1], IRIS_DATA.pc_scores[flower2], zoom12, cutoff12);
    drawChladniPattern(canvasChladni13Ref.current, IRIS_DATA.pc_scores[flower1], IRIS_DATA.pc_scores[flower3], zoom13, cutoff13);
    drawChladniPattern(canvasChladni23Ref.current, IRIS_DATA.pc_scores[flower2], IRIS_DATA.pc_scores[flower3], zoom23, cutoff23);
  }, [time, flower1, flower2, flower3, zoom12, cutoff12, zoom13, cutoff13, zoom23, cutoff23]);
  
  const getSpeciesColor = (index) => {
    const species = IRIS_DATA.species[index];
    return ['#3b82f6', '#10b981', '#a78bfa'][species];
  };
  
  const getSpeciesName = (index) => {
    return IRIS_DATA.species_names[IRIS_DATA.species[index]];
  };
  
  return (
    <div className="flex flex-col items-center min-h-screen bg-slate-900 p-4">
      <div className="w-full max-w-4xl">
        <h1 className="text-2xl font-bold text-white mb-1 text-center">Three-Flower Spectral Comparison</h1>
        <p className="text-slate-400 text-xs text-center mb-4">PCA-based wave interference patterns between observation pairs</p>
        
        {/* Flower Selection */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-slate-800 p-3 rounded-lg">
            <label className="flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <span className="text-blue-400 text-sm font-medium">Flower 1</span>
                <span className="text-blue-400 font-mono text-sm">#{flower1 + 1}</span>
              </div>
              <input
                type="range"
                min="0"
                max="149"
                value={flower1}
                onChange={(e) => setFlower1(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg cursor-pointer accent-blue-500"
              />
              <span className="text-xs" style={{color: getSpeciesColor(flower1)}}>{getSpeciesName(flower1)}</span>
            </label>
            <canvas ref={canvasFlower1Ref} width={200} height={50} className="w-full mt-2 border border-slate-700 rounded" />
          </div>
          
          <div className="bg-slate-800 p-3 rounded-lg">
            <label className="flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <span className="text-green-400 text-sm font-medium">Flower 2</span>
                <span className="text-green-400 font-mono text-sm">#{flower2 + 1}</span>
              </div>
              <input
                type="range"
                min="0"
                max="149"
                value={flower2}
                onChange={(e) => setFlower2(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg cursor-pointer accent-green-500"
              />
              <span className="text-xs" style={{color: getSpeciesColor(flower2)}}>{getSpeciesName(flower2)}</span>
            </label>
            <canvas ref={canvasFlower2Ref} width={200} height={50} className="w-full mt-2 border border-slate-700 rounded" />
          </div>
          
          <div className="bg-slate-800 p-3 rounded-lg">
            <label className="flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <span className="text-purple-400 text-sm font-medium">Flower 3</span>
                <span className="text-purple-400 font-mono text-sm">#{flower3 + 1}</span>
              </div>
              <input
                type="range"
                min="0"
                max="149"
                value={flower3}
                onChange={(e) => setFlower3(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg cursor-pointer accent-purple-500"
              />
              <span className="text-xs" style={{color: getSpeciesColor(flower3)}}>{getSpeciesName(flower3)}</span>
            </label>
            <canvas ref={canvasFlower3Ref} width={200} height={50} className="w-full mt-2 border border-slate-700 rounded" />
          </div>
        </div>
        
        {/* Chladni Patterns Grid */}
        <div className="grid grid-cols-3 gap-3">
          {/* 1 vs 2 */}
          <div className="bg-slate-800 p-3 rounded-lg">
            <div className="text-center text-sm text-slate-300 mb-2">
              <span className="text-blue-400">1</span> × <span className="text-green-400">2</span>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <label className="flex flex-col gap-1">
                <span className="text-slate-400 text-xs">Zoom</span>
                <input
                  type="range"
                  min="0.5"
                  max="4"
                  step="0.1"
                  value={zoom12}
                  onChange={(e) => setZoom12(parseFloat(e.target.value))}
                  className="w-full h-1 bg-slate-700 rounded-lg cursor-pointer"
                />
              </label>
              <label className="flex flex-col gap-1">
                <span className="text-slate-400 text-xs">Cutoff</span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={cutoff12}
                  onChange={(e) => setCutoff12(parseFloat(e.target.value))}
                  className="w-full h-1 bg-slate-700 rounded-lg cursor-pointer"
                />
              </label>
            </div>
            <canvas ref={canvasChladni12Ref} width={150} height={150} className="w-full border border-slate-700 rounded" />
          </div>
          
          {/* 1 vs 3 */}
          <div className="bg-slate-800 p-3 rounded-lg">
            <div className="text-center text-sm text-slate-300 mb-2">
              <span className="text-blue-400">1</span> × <span className="text-purple-400">3</span>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <label className="flex flex-col gap-1">
                <span className="text-slate-400 text-xs">Zoom</span>
                <input
                  type="range"
                  min="0.5"
                  max="4"
                  step="0.1"
                  value={zoom13}
                  onChange={(e) => setZoom13(parseFloat(e.target.value))}
                  className="w-full h-1 bg-slate-700 rounded-lg cursor-pointer"
                />
              </label>
              <label className="flex flex-col gap-1">
                <span className="text-slate-400 text-xs">Cutoff</span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={cutoff13}
                  onChange={(e) => setCutoff13(parseFloat(e.target.value))}
                  className="w-full h-1 bg-slate-700 rounded-lg cursor-pointer"
                />
              </label>
            </div>
            <canvas ref={canvasChladni13Ref} width={150} height={150} className="w-full border border-slate-700 rounded" />
          </div>
          
          {/* 2 vs 3 */}
          <div className="bg-slate-800 p-3 rounded-lg">
            <div className="text-center text-sm text-slate-300 mb-2">
              <span className="text-green-400">2</span> × <span className="text-purple-400">3</span>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <label className="flex flex-col gap-1">
                <span className="text-slate-400 text-xs">Zoom</span>
                <input
                  type="range"
                  min="0.5"
                  max="4"
                  step="0.1"
                  value={zoom23}
                  onChange={(e) => setZoom23(parseFloat(e.target.value))}
                  className="w-full h-1 bg-slate-700 rounded-lg cursor-pointer"
                />
              </label>
              <label className="flex flex-col gap-1">
                <span className="text-slate-400 text-xs">Cutoff</span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={cutoff23}
                  onChange={(e) => setCutoff23(parseFloat(e.target.value))}
                  className="w-full h-1 bg-slate-700 rounded-lg cursor-pointer"
                />
              </label>
            </div>
            <canvas ref={canvasChladni23Ref} width={150} height={150} className="w-full border border-slate-700 rounded" />
          </div>
        </div>
        
        {/* Legend */}
        <div className="mt-4 flex justify-center gap-6 text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-blue-500"></span> setosa (0-49)
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-green-500"></span> versicolor (50-99)
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-purple-400"></span> virginica (100-149)
          </span>
        </div>
      </div>
    </div>
  );
}
