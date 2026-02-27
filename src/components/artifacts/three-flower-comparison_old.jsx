import React, { useState, useEffect, useRef } from 'react';

// Iris PCA data embedded
const IRIS_DATA = {
  "eigenvalues": [1.0, 0.3131852510872176, 0.05028507293718103],
  "explained_variance_ratio": [0.729624454132999, 0.2285076178670174, 0.036689218892828744],
  "pc_scores": [[-2.2647028088075873,0.4800265965209897,0.12770602230015168],[-2.0809611519657665,-0.6741335566053523,0.2346088539845673],[-2.3642290538902997,-0.3419080238846757,-0.044201484838744566],[-2.299384217042707,-0.5973945076746751,-0.09129010632068262],[-2.3898421663138434,0.6468353829020275,-0.015738195676259593],[-2.0756309481765105,1.489177523321167,-0.02696829443978301],[-2.444028835134151,0.0476441976300146,-0.33547040114311477],[-2.232847158872014,0.2231480726895922,0.08845496897855356],[-2.3334679399473314,-1.1151802974300756,-0.14398233250776412],[-2.1840837356893986,-0.46487262591534106,0.2752699528527141],[-2.1649346279726127,1.0400584443833654,0.13609945338856655],[-2.2004268943539016,0.3123054830283977,-0.1330058755703685],[-2.2666891432042063,-0.7293102233025033,0.08904001710163161],[-2.6269851762765587,-1.502811396027382,-0.2177900218225721],[-2.220095475396814,2.3358858147966234,0.1913744518734786],[-1.9461673654777926,2.1907704181534126,-0.5020007155647741],[-2.1880862925896634,1.629554551127968,-0.03331968873179252],[-2.2647028088075873,0.4800265965209897,0.14455009951064853],[-1.8329027155208065,1.7489272469639854,-0.36919640405358445],[-2.1573967069066673,0.8984349726177006,-0.19963218424348108],[-2.02186465277821,0.9172063488653567,0.48579995451867676],[-2.2125847994322757,0.7127978002096552,-0.2077449013471226],[-2.6269851762765587,0.6887386779162787,-0.3874950976152177],[-1.8329027155208065,0.28682397984498316,0.03821176729814964],[-2.2125847994322757,0.24906496802912337,-0.4168129096831788],[-2.0596801006967336,-0.7499802999421341,0.12913436965026032],[-2.0809611519657665,0.09685224867082758,0.1269473869495651],[-2.1983557500012426,0.5202686302423898,0.029933191075693405],[-2.1983557500012426,0.7580121828896899,0.08696226060125798],[-2.3642290538902997,-0.39750653782466176,-0.014870087663946846],[-2.0596801006967336,-0.5127988903546058,-0.034988853462046336],[-2.02186465277821,0.9172063488653567,0.15337534621991513],[-2.220095475396814,1.4153990461309696,0.1327951336069703],[-2.0756309481765105,2.1070618953434826,0.18103723851878615],[-2.1840837356893986,-0.46487262591534106,0.13318494757929684],[-2.1649346279726127,0.2968197964649524,0.1911072045118252],[-2.02186465277821,0.9172063488653567,0.11629193799178034],[-2.1543198836134394,1.0555415870169447,-0.06826599350893926],[-2.5588769842456424,1.8619648467732867,-0.08698823802163773],[-2.1840837356893986,-0.5494755832316317,0.045815517083111966],[-2.2004268943539016,0.39778233232835737,0.1511039336082898],[-2.649999999999999,-0.8799274804833046,-0.14272679688077638],[-2.2666891432042063,-1.199147883080148,0.07527050970654447],[-2.0171013851291513,-0.3266051665646063,-0.11180641590857767],[-1.8009319449598232,0.6734357206961781,0.3066802371111028],[-2.1880862925896634,0.06170293440082405,-0.03642464668351728],[-2.1573967069066673,1.0668588289409795,0.05110495577663574],[-2.444028835134151,0.8984349726177006,-0.22826164398172923],[-2.1983557500012426,-0.36346982222453075,-0.002207087942172094],[-2.1649346279726127,-0.6741335566053523,0.09863540348103819],[1.406396088584949,0.25805841661993594,-0.05995613227878789],[1.178704939483613,0.007997598942193164,-0.4289345916638055],[1.5303898025313804,0.2350825638133577,-0.028994826451869876],[0.579470720530923,-0.7606174407520992,0.3157085885152294],[1.2893953693564926,0.13540597836498954,0.11612703176103857],[0.7620401623938022,-0.28298629742674315,-0.25584986880031704],[1.1361221536208545,0.38217918162831707,-0.14076960195165115],[0.197840692813028,-1.7743194485006855,0.08854635178842991],[1.178704939483613,-0.3189108838846755,0.06858024811942956],[0.5048991486680437,-0.7193002998521341,-0.2832668133951072],[0.07067932117212903,-1.259933531610218,0.36817673395218965],[0.9351587813598913,-0.3882623532147105,0.2645622854990116],[0.8245681959972229,-0.3573308838846753,0.2569336703885728],[1.4809676604478282,0.5822714528757589,0.2605236855859378],[1.622631471574191,1.7742301887939198,-0.28001696779651575],[1.36909070932516,1.0821773159709099,0.18965882628649827],[1.0457493667225596,0.3771420509083521,0.43065690606479545],[0.6406498188165708,-0.28298629742674315,-0.24976437461958877],[1.3639669412193717,0.6976570704357941,-0.06852764712953268],[0.8352050367282559,0.14049913006503967,0.3048887866322042],[1.0244683154535267,0.5262372095324248,0.12768927934142199],[1.5517707537004134,0.7379742113357592,0.013711324786088644],[0.6619308700855037,0.0902289195808075,0.5062857738736067],[1.1787859907525988,0.5262372095324248,-0.1329675181087151],[0.5687706205309228,-0.2366520548467083,-0.13848428083826194],[0.669296819351283,0.0902289195808075,0.05597127305801276],[1.2360220017074267,0.7483113420557242,0.09331606961968396],[1.5730518049693464,0.5055657401023899,0.14772634078096947],[1.4596866091788952,0.3411793276883819,0.21424076318621842],[0.7620401623938022,-0.3882623532147105,0.4253596498989749],[0.5261801999370767,-0.5081617596346411,0.12077477352215342],[0.5261801999370767,-0.5081617596346411,0.4026139863444562],[1.2786772180875596,0.40796918162828686,-0.03947314281327435],[0.7620401623938022,1.4517333886709347,-0.30166953414196764],[0.30149762947770993,-1.0165820622801829,-0.10820415832718326],[0.5794517717999558,-0.6998288177921517,0.3157085885152294],[0.8565860879972889,0.2660140831533928,0.3388069090528664],[0.6619308700855037,-1.3005821622801483,0.14163084659023854],[0.7407591111248692,-0.17529434025654182,0.04597579297105958],[1.1574669419836318,0.08004206128085762,0.12768927934142199],[0.7620401623938022,-0.3882623532147105,0.20424528310926524],[0.975528133095458,0.6616942471158291,0.11612703176103857],[1.029103366187748,-0.1443628209265067,0.06274926820638274],[0.4729180974990108,-0.8489489111533694,-0.031974029894324126],[0.5901328230689888,-0.5184988903546062,0.12077477352215342],[0.8459491623317775,0.10532206128085766,0.15105460913952683],[0.6832119213544366,0.17954770320498945,-0.34193053243488916],[1.2786772180875596,0.7483113420557242,0.09914704953273078],[1.029103366187748,0.16427454150494922,-0.02363216289022753],[1.5730518049693464,0.4952286093824249,0.03846951144164633],[2.1693726963395986,1.6093118819778283,0.052969412411080925],[1.6866837283600808,-0.27789313572669297,-0.2627949270529704],[2.200818299071372,0.5416543831124597,0.013711324786088644],[1.1254840023518216,-0.47506934051547214,-0.4926788281092868],[2.138927093607825,0.9686520100878173,0.019576838061123485],[1.1254840023518216,-0.4595864979354372,0.37900770386523646],[1.5730518049693464,0.14049913006503967,-0.2557531937542904],[2.0693526526346536,0.32590617598833185,-0.06852764712953268],[1.6119121564972016,0.19991455250494927,0.19549980620954507],[1.4063960885849488,-0.15472967922645657,-0.12680619592052545],[1.5090087512624474,-0.32114830826465645,-0.13265330091521469],[1.6652648770910479,0.16427454150494922,-0.36026309877033104],[1.5090087512624474,-0.5030246289146761,0.22006174310926204],[1.0244683154535267,-0.64881413520530223,0.11612703176103857],[1.6865205721255693,0.044801469102208834,-0.35192857868256],[1.1788491469871103,-0.6128513119853371,-0.03697539273237431],[1.0564685542475932,0.34118247938843207,0.2645622854990116],[1.4063960885849488,-0.09631425778656182,0.011845811510053803],[1.289395369356493,0.6976570704357941,0.08748508970663296],[1.0564685542475932,-0.4698236286554023,0.03680276133931551],[0.7301222704938362,-0.08612740948660685,0.11029605184799175],[1.1681278394835659,0.11042520298090779,0.01601483159700698],[1.2893953693564926,-0.03726568464662691,0.14689309085186609],[1.6012752308316903,0.12559283666494933,0.022442351336158323],[1.36909070932516,1.0307287853009451,-0.031974029894324126],[1.9266893850855883,-0.03726568464662691,-0.42846547801862164],[1.7932331958851162,0.3771420509083521,-0.059539380913232074],[1.5517707537004134,0.0696374809008425,-0.41513721965006994],[1.6865205721255693,0.6206628264458641,-0.3627480405176777],[1.5730518049693464,0.04989463080225396,-0.42013291169317976],[2.0266893850855883,-0.24684891314665825,-0.25668311872942],[1.3213854693564926,0.4182629506224946,0.21590750326711575],[2.0480704363546213,0.6309999571658292,-0.10570640825628592],[1.6759468027045695,0.2402196945333228,0.13275982650329536],[1.5730518049693464,0.34627564108848214,0.03846951144164633],[2.169372696339599,0.8778435339377354,-0.02863442281932421],[1.0671054949786262,0.3359049862683471,0.5570507157164597],[1.0778293787441146,0.1711488242849317,-0.11430416598947501],[1.1361221536208545,-0.5596127139516668,-0.07436862704257949],[1.4916487117168612,0.34118247938843207,0.19883306605574192],[1.2253612054319384,0.37713890920830194,-0.0369753927323743],[1.0884664193751476,-0.2829862974267431,0.3771074029620686],[1.9266893850855883,-0.1855842978864819,0.15188785906862946],[1.3533299106883386,0.7123606695296901,0.13109307642239803],[1.289395369356493,-0.10650111608651175,-0.08769688539113119],[1.178704939483613,0.11042520298090779,0.0718115578114447],[1.7932331958851162,0.006964370862183043,0.18632980619954198],[1.622631471574191,0.3978194630483173,-0.06686090705863535],[1.8572854525341841,0.2660140831533928,-0.08186590547808436],[1.3853669412193715,0.4030000813424598,0.011845811510053803],[2.0373265076101097,0.47431368552121696,-0.13348654084431735],[1.1681278394835659,-0.20584577712660205,0.35234375404218983],[1.5197326350279357,0.1506748882049746,0.18799654627043932],[1.622631471574191,-0.3882623532147105,0.05180225297105958],[1.7932331958851162,-0.004035629137816957,0.022442351336158323],[1.4916487117168612,0.8262949033677705,0.0034463312144221606],[1.0244683154535267,0.5159000788124597,0.2188524973859378],[1.3533299106883386,0.2247568466933403,-0.1413028915702046],[1.0244683154535267,-0.1855842978864819,0.12935111941231932],[1.1147471617207884,0.006964370862183043,-0.20346117000938218],[1.622631471574191,-0.16491653752641147,0.21174300335006894],[1.4489627254134069,0.6206628264458641,0.029933191075693405],[1.1574669419836318,-0.08612740948660685,-0.24143211477338609],[2.232908654806938,0.10022889958081256,0.11196028168014142],[1.9480704363546213,0.22985000839338542,-0.14493062147470728],[1.2146373216664501,0.21457684669334026,-0.08186590547808436],[1.6546280364600148,0.42833603992824176,-0.2585498688003171]],
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
  
  const drawSuperposition = (canvas, pcScores, eigenvalues, color, label) => {
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, width, height);
    
    const centerY = height / 2;
    const maxAmplitude = height / 3;
    const wavelength = width / 2;
    const baseFreq = 1.0; // Fixed base frequency for display
    
    // Draw center line
    ctx.beginPath();
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    ctx.moveTo(0, centerY);
    ctx.lineTo(width, centerY);
    ctx.stroke();
    ctx.setLineDash([]);
    
    // Draw superposition
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.5;
    
    for (let x = 0; x < width; x++) {
      let ySum = 0;
      for (let i = 0; i < 3; i++) {
        ySum += eigenvalues[i] * Math.sin((x / wavelength) * 2 * Math.PI * pcScores[i] * baseFreq + time);
      }
      const y = centerY + maxAmplitude * ySum;
      
      if (x === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    
    ctx.stroke();
    
    // Draw label
    if (label) {
      ctx.fillStyle = color;
      ctx.font = '12px monospace';
      ctx.fillText(label, 10, 20);
    }
  };
  
  const getSuperposedWaveValue = (position, pcScores, eigenvalues, zoom, wavelength) => {
    let sum = 0;
    for (let i = 0; i < 3; i++) {
      sum += eigenvalues[i] * Math.sin((position / wavelength) * 2 * Math.PI * pcScores[i] * zoom + time);
    }
    return sum;
  };
  
  const drawChladniPattern = (canvas, pcScoresX, pcScoresY, zoom, cutoff) => {
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, width, height);
    
    const wavelength = width / 2;
    const eigenvalues = IRIS_DATA.eigenvalues;
    
    // Calculate max amplitude for normalization
    const maxAmplitude = eigenvalues.reduce((sum, val) => sum + val, 0);
    
    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const waveX = getSuperposedWaveValue(x, pcScoresX, eigenvalues, zoom, wavelength);
        const waveY = getSuperposedWaveValue(y, pcScoresY, eigenvalues, zoom, wavelength);
        
        // Normalize
        const normalizedX = waveX / maxAmplitude;
        const normalizedY = waveY / maxAmplitude;
        
        const combined = normalizedX * normalizedY;
        const thresholded = Math.abs(combined) < cutoff ? 0 : combined;
        
        const intensity = Math.floor((thresholded + 1) * 127.5);
        
        const idx = (y * width + x) * 4;
        data[idx] = intensity;
        data[idx + 1] = intensity * 0.7;
        data[idx + 2] = intensity * 1.2;
        data[idx + 3] = 255;
      }
    }
    
    ctx.putImageData(imageData, 0, 0);
  };
  
  useEffect(() => {
    const eigenvalues = IRIS_DATA.eigenvalues;
    
    // Draw the three superposed waveforms
    drawSuperposition(canvasFlower1Ref.current, IRIS_DATA.pc_scores[flower1], eigenvalues, '#3b82f6', `Flower ${flower1 + 1}`);
    drawSuperposition(canvasFlower2Ref.current, IRIS_DATA.pc_scores[flower2], eigenvalues, '#10b981', `Flower ${flower2 + 1}`);
    drawSuperposition(canvasFlower3Ref.current, IRIS_DATA.pc_scores[flower3], eigenvalues, '#a78bfa', `Flower ${flower3 + 1}`);
    
    // Draw the three Chladni patterns
    drawChladniPattern(canvasChladni12Ref.current, IRIS_DATA.pc_scores[flower1], IRIS_DATA.pc_scores[flower2], zoom12, cutoff12);
    drawChladniPattern(canvasChladni13Ref.current, IRIS_DATA.pc_scores[flower1], IRIS_DATA.pc_scores[flower3], zoom13, cutoff13);
    drawChladniPattern(canvasChladni23Ref.current, IRIS_DATA.pc_scores[flower2], IRIS_DATA.pc_scores[flower3], zoom23, cutoff23);
  }, [time, flower1, flower2, flower3, zoom12, cutoff12, zoom13, cutoff13, zoom23, cutoff23]);
  
  const getSpeciesName = (index) => {
    const species = IRIS_DATA.species[index];
    return IRIS_DATA.species_names[species];
  };
  
  const getSpeciesColor = (index) => {
    const species = IRIS_DATA.species[index];
    return ['#3b82f6', '#10b981', '#a78bfa'][species];
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 p-8">
      <div className="w-full max-w-6xl">
        <h1 className="text-3xl font-bold text-white mb-2 text-center">Three-Flower Spectral Comparison</h1>
        <p className="text-slate-400 text-sm text-center mb-6">PCA-based wave interference patterns between observation pairs</p>
        
        {/* Flower Selection */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-slate-800 p-4 rounded-lg">
            <label className="flex flex-col gap-2">
              <span className="text-blue-400 font-medium">Flower 1</span>
              <select
                value={flower1}
                onChange={(e) => setFlower1(parseInt(e.target.value))}
                className="bg-slate-700 text-white p-2 rounded text-sm"
                style={{color: getSpeciesColor(flower1)}}
              >
                {IRIS_DATA.pc_scores.map((_, idx) => (
                  <option key={idx} value={idx}>
                    #{idx} - {getSpeciesName(idx)}
                  </option>
                ))}
              </select>
            </label>
          </div>
          
          <div className="bg-slate-800 p-4 rounded-lg">
            <label className="flex flex-col gap-2">
              <span className="text-emerald-400 font-medium">Flower 2</span>
              <select
                value={flower2}
                onChange={(e) => setFlower2(parseInt(e.target.value))}
                className="bg-slate-700 text-white p-2 rounded text-sm"
                style={{color: getSpeciesColor(flower2)}}
              >
                {IRIS_DATA.pc_scores.map((_, idx) => (
                  <option key={idx} value={idx}>
                    #{idx} - {getSpeciesName(idx)}
                  </option>
                ))}
              </select>
            </label>
          </div>
          
          <div className="bg-slate-800 p-4 rounded-lg">
            <label className="flex flex-col gap-2">
              <span className="text-purple-400 font-medium">Flower 3</span>
              <select
                value={flower3}
                onChange={(e) => setFlower3(parseInt(e.target.value))}
                className="bg-slate-700 text-white p-2 rounded text-sm"
                style={{color: getSpeciesColor(flower3)}}
              >
                {IRIS_DATA.pc_scores.map((_, idx) => (
                  <option key={idx} value={idx}>
                    #{idx} - {getSpeciesName(idx)}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
        
        {/* Waveforms */}
        <div className="space-y-3 mb-8">
          <div>
            <h3 className="text-sm text-blue-400 font-medium mb-1">Flower 1 Spectral Signature</h3>
            <canvas ref={canvasFlower1Ref} width={900} height={100} className="w-full border-2 border-blue-500 rounded-lg shadow-lg" />
          </div>
          <div>
            <h3 className="text-sm text-emerald-400 font-medium mb-1">Flower 2 Spectral Signature</h3>
            <canvas ref={canvasFlower2Ref} width={900} height={100} className="w-full border-2 border-emerald-500 rounded-lg shadow-lg" />
          </div>
          <div>
            <h3 className="text-sm text-purple-400 font-medium mb-1">Flower 3 Spectral Signature</h3>
            <canvas ref={canvasFlower3Ref} width={900} height={100} className="w-full border-2 border-purple-500 rounded-lg shadow-lg" />
          </div>
        </div>
        
        {/* Chladni Patterns */}
        <h2 className="text-2xl font-bold text-white mb-4 text-center">Interference Patterns</h2>
        <div className="grid grid-cols-3 gap-6">
          {/* Pattern 1-2 */}
          <div className="space-y-3">
            <h3 className="text-center text-sm font-medium text-white">Flowers 1 × 2</h3>
            <canvas ref={canvasChladni12Ref} width={250} height={250} className="w-full border border-slate-700 rounded-lg shadow-lg" />
            <div className="bg-slate-800 p-3 rounded-lg space-y-2">
              <label className="flex flex-col gap-1">
                <div className="flex justify-between items-center">
                  <span className="text-slate-200 text-xs">Zoom</span>
                  <span className="text-cyan-400 font-mono text-xs">{zoom12.toFixed(1)}×</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="3"
                  step="0.1"
                  value={zoom12}
                  onChange={(e) => setZoom12(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
              </label>
              <label className="flex flex-col gap-1">
                <div className="flex justify-between items-center">
                  <span className="text-slate-200 text-xs">Cutoff</span>
                  <span className="text-purple-400 font-mono text-xs">{cutoff12.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={cutoff12}
                  onChange={(e) => setCutoff12(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
              </label>
            </div>
          </div>
          
          {/* Pattern 1-3 */}
          <div className="space-y-3">
            <h3 className="text-center text-sm font-medium text-white">Flowers 1 × 3</h3>
            <canvas ref={canvasChladni13Ref} width={250} height={250} className="w-full border border-slate-700 rounded-lg shadow-lg" />
            <div className="bg-slate-800 p-3 rounded-lg space-y-2">
              <label className="flex flex-col gap-1">
                <div className="flex justify-between items-center">
                  <span className="text-slate-200 text-xs">Zoom</span>
                  <span className="text-cyan-400 font-mono text-xs">{zoom13.toFixed(1)}×</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="3"
                  step="0.1"
                  value={zoom13}
                  onChange={(e) => setZoom13(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
              </label>
              <label className="flex flex-col gap-1">
                <div className="flex justify-between items-center">
                  <span className="text-slate-200 text-xs">Cutoff</span>
                  <span className="text-purple-400 font-mono text-xs">{cutoff13.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={cutoff13}
                  onChange={(e) => setCutoff13(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
              </label>
            </div>
          </div>
          
          {/* Pattern 2-3 */}
          <div className="space-y-3">
            <h3 className="text-center text-sm font-medium text-white">Flowers 2 × 3</h3>
            <canvas ref={canvasChladni23Ref} width={250} height={250} className="w-full border border-slate-700 rounded-lg shadow-lg" />
            <div className="bg-slate-800 p-3 rounded-lg space-y-2">
              <label className="flex flex-col gap-1">
                <div className="flex justify-between items-center">
                  <span className="text-slate-200 text-xs">Zoom</span>
                  <span className="text-cyan-400 font-mono text-xs">{zoom23.toFixed(1)}×</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="3"
                  step="0.1"
                  value={zoom23}
                  onChange={(e) => setZoom23(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
              </label>
              <label className="flex flex-col gap-1">
                <div className="flex justify-between items-center">
                  <span className="text-slate-200 text-xs">Cutoff</span>
                  <span className="text-purple-400 font-mono text-xs">{cutoff23.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={cutoff23}
                  onChange={(e) => setCutoff23(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
