import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const QWERTY_LAYOUT = {
  'q': [0, 0], 'w': [1, 0], 'e': [2, 0], 'r': [3, 0], 't': [4, 0], 'y': [5, 0], 'u': [6, 0], 'i': [7, 0], 'o': [8, 0], 'p': [9, 0],
  'a': [0, 1], 's': [1, 1], 'd': [2, 1], 'f': [3, 1], 'g': [4, 1], 'h': [5, 1], 'j': [6, 1], 'k': [7, 1], 'l': [8, 1],
  'z': [0, 2], 'x': [1, 2], 'c': [2, 2], 'v': [3, 2], 'b': [4, 2], 'n': [5, 2], 'm': [6, 2],
  ' ': [3.5, 3]
};

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz ';

const chiSquareCDF = (x, k) => {
  if (x <= 0) return 0;
  const gammaInc = (a, x) => {
    let sum = 0, term = 1 / a, n = 0;
    while (Math.abs(term) > 1e-10 && n < 1000) {
      sum += term;
      n++;
      term *= x / (a + n);
    }
    const logGamma = (z) => {
      const coef = [0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
      if (z < 0.5) return Math.log(Math.PI) - Math.log(Math.sin(Math.PI * z)) - logGamma(1 - z);
      z -= 1;
      let x = coef[0];
      for (let i = 1; i < 9; i++) x += coef[i] / (z + i);
      const t = z + 7.5;
      return 0.5 * Math.log(2 * Math.PI) + (z + 0.5) * Math.log(t) - t + Math.log(x);
    };
    return sum * Math.exp(-x + a * Math.log(x) - logGamma(a));
  };
  return gammaInc(k / 2, x / 2);
};

const chiSquareTest = (observed, expected) => {
  let chiSq = 0, df = 0;
  for (let i = 0; i < observed.length; i++) {
    if (expected[i] > 0) {
      chiSq += Math.pow(observed[i] - expected[i], 2) / expected[i];
      df++;
    }
  }
  df = df - 1;
  return { chiSq, df, pValue: 1 - chiSquareCDF(chiSq, df) };
};

const ksProb = (lambda) => {
  if (lambda <= 0) return 1;
  if (lambda > 10) return 0;
  let sum = 0;
  for (let i = 1; i <= 100; i++) sum += Math.pow(-1, i - 1) * Math.exp(-2 * i * i * lambda * lambda);
  return 2 * sum;
};

const ksTest = (data, cdf) => {
  const sorted = [...data].sort((a, b) => a - b);
  let dPlus = 0, dMinus = 0;
  for (let i = 0; i < sorted.length; i++) {
    const empirical = (i + 1) / sorted.length;
    const theoretical = cdf(sorted[i]);
    dPlus = Math.max(dPlus, empirical - theoretical);
    dMinus = Math.max(dMinus, theoretical - (i / sorted.length));
  }
  const d = Math.max(dPlus, dMinus);
  const n = sorted.length;
  return { d, pValue: ksProb((Math.sqrt(n) + 0.12 + 0.11 / Math.sqrt(n)) * d) };
};

const ksTwoSample = (data1, data2) => {
  const sorted1 = [...data1].sort((a, b) => a - b);
  const sorted2 = [...data2].sort((a, b) => a - b);
  const allPoints = [...new Set([...sorted1, ...sorted2])].sort((a, b) => a - b);
  let maxD = 0;
  for (let point of allPoints) {
    const cdf1 = sorted1.filter(x => x <= point).length / sorted1.length;
    const cdf2 = sorted2.filter(x => x <= point).length / sorted2.length;
    maxD = Math.max(maxD, Math.abs(cdf1 - cdf2));
  }
  const n1 = sorted1.length, n2 = sorted2.length;
  const en = Math.sqrt((n1 * n2) / (n1 + n2));
  return { d: maxD, pValue: ksProb((en + 0.12 + 0.11 / en) * maxD) };
};

const klDivergence = (p, q) => {
  let kl = 0;
  for (let i = 0; i < p.length; i++) {
    if (p[i] > 0 && q[i] > 0) kl += p[i] * Math.log2(p[i] / q[i]);
  }
  return kl;
};

const chiSquareHomogeneity = (freq1, freq2) => {
  let chiSq = 0, df = 0;
  const n1 = Object.values(freq1).reduce((a, b) => a + b, 0);
  const n2 = Object.values(freq2).reduce((a, b) => a + b, 0);
  const total = n1 + n2;
  const allChars = new Set([...Object.keys(freq1), ...Object.keys(freq2)]);
  for (let char of allChars) {
    const o1 = freq1[char] || 0, o2 = freq2[char] || 0, rowTotal = o1 + o2;
    if (rowTotal > 0) {
      const e1 = (rowTotal * n1) / total, e2 = (rowTotal * n2) / total;
      if (e1 > 0) chiSq += Math.pow(o1 - e1, 2) / e1;
      if (e2 > 0) chiSq += Math.pow(o2 - e2, 2) / e2;
      df++;
    }
  }
  df = Math.max(1, df - 1);
  return { chiSq, df, pValue: 1 - chiSquareCDF(chiSq, df) };
};

const welchTTest = (data1, data2) => {
  const mean1 = data1.reduce((a, b) => a + b, 0) / data1.length;
  const mean2 = data2.reduce((a, b) => a + b, 0) / data2.length;
  const var1 = data1.reduce((sum, x) => sum + Math.pow(x - mean1, 2), 0) / (data1.length - 1);
  const var2 = data2.reduce((sum, x) => sum + Math.pow(x - mean2, 2), 0) / (data2.length - 1);
  const t = (mean1 - mean2) / Math.sqrt(var1 / data1.length + var2 / data2.length);
  const df = Math.pow(var1 / data1.length + var2 / data2.length, 2) / (Math.pow(var1 / data1.length, 2) / (data1.length - 1) + Math.pow(var2 / data2.length, 2) / (data2.length - 1));
  const tCDF = (t, df) => {
    if (t < 0) return 1 - tCDF(-t, df);
    return 0.5 * (1 + Math.sign(t) * (1 - Math.pow(1 + t * t / df, -(df + 1) / 2)));
  };
  return { t, df, pValue: 2 * (1 - tCDF(Math.abs(t), df)), mean1, mean2 };
};

const formatPValue = (p) => {
  if (p < 0.001) return 'p < .001***';
  if (p < 0.01) return `p = ${p.toFixed(3)}**`;
  if (p < 0.05) return `p = ${p.toFixed(3)}*`;
  if (p < 0.1) return `p = ${p.toFixed(3)}†`;
  return `p = ${p.toFixed(3)}`;
};

const RandomStringAnalyzer = () => {
  const [userInput, setUserInput] = useState('');
  const [cryptoString, setCryptoString] = useState('');

  const generateCryptoString = () => {
    if (userInput.length === 0) return;
    const array = new Uint8Array(userInput.length);
    crypto.getRandomValues(array);
    setCryptoString(Array.from(array).map(val => ALPHABET[val % ALPHABET.length]).join(''));
  };

  const calculateEntropy = (str) => {
    if (str.length === 0) return 0;
    const freq = {};
    for (let char of str) freq[char] = (freq[char] || 0) + 1;
    let entropy = 0;
    for (let char in freq) {
      const p = freq[char] / str.length;
      entropy -= p * Math.log2(p);
    }
    return entropy;
  };

  const getCharFrequency = (str) => {
    const freq = {};
    for (let char of str) freq[char] = (freq[char] || 0) + 1;
    return freq;
  };

  const getKeyDistance = (char1, char2) => {
    const pos1 = QWERTY_LAYOUT[char1.toLowerCase()];
    const pos2 = QWERTY_LAYOUT[char2.toLowerCase()];
    if (!pos1 || !pos2) return null;
    return Math.sqrt(Math.pow(pos2[0] - pos1[0], 2) + Math.pow(pos2[1] - pos1[1], 2));
  };

  const getBigramDistances = (str) => {
    const distances = [];
    for (let i = 0; i < str.length - 1; i++) {
      const dist = getKeyDistance(str[i], str[i + 1]);
      if (dist !== null) distances.push(dist);
    }
    return distances;
  };

  const getTopBigrams = (str, limit = 5) => {
    const bigrams = {};
    for (let i = 0; i < str.length - 1; i++) {
      const bigram = str[i] + str[i + 1];
      bigrams[bigram] = (bigrams[bigram] || 0) + 1;
    }
    return Object.entries(bigrams).sort((a, b) => b[1] - a[1]).slice(0, limit);
  };

  const statisticalTests = useMemo(() => {
    if (!cryptoString || userInput.length === 0) return null;
    const userFreq = getCharFrequency(userInput);
    const cryptoFreq = getCharFrequency(cryptoString);
    const expectedFreq = userInput.length / ALPHABET.length;
    const userObserved = ALPHABET.split('').map(c => userFreq[c] || 0);
    const userExpected = ALPHABET.split('').map(() => expectedFreq);
    const cryptoExpectedFreq = cryptoString.length / ALPHABET.length;
    const cryptoObserved = ALPHABET.split('').map(c => cryptoFreq[c] || 0);
    const cryptoExpected = ALPHABET.split('').map(() => cryptoExpectedFreq);
    const userChiSq = chiSquareTest(userObserved, userExpected);
    const cryptoChiSq = chiSquareTest(cryptoObserved, cryptoExpected);
    const userCharIndices = userInput.split('').map(c => ALPHABET.indexOf(c) / ALPHABET.length);
    const cryptoCharIndices = cryptoString.split('').map(c => ALPHABET.indexOf(c) / ALPHABET.length);
    const userKS = ksTest(userCharIndices, x => x);
    const cryptoKS = ksTest(cryptoCharIndices, x => x);
    const homogeneity = chiSquareHomogeneity(userFreq, cryptoFreq);
    const userProbs = ALPHABET.split('').map(c => (userFreq[c] || 0.5) / (userInput.length + ALPHABET.length * 0.5));
    const cryptoProbs = ALPHABET.split('').map(c => (cryptoFreq[c] || 0.5) / (cryptoString.length + ALPHABET.length * 0.5));
    const kl1 = klDivergence(userProbs, cryptoProbs);
    const kl2 = klDivergence(cryptoProbs, userProbs);
    const klSym = (kl1 + kl2) / 2;
    const ks2Sample = ksTwoSample(userCharIndices, cryptoCharIndices);
    const userDistances = getBigramDistances(userInput);
    const cryptoDistances = getBigramDistances(cryptoString);
    const distanceKS = userDistances.length > 0 && cryptoDistances.length > 0 ? ksTwoSample(userDistances, cryptoDistances) : null;
    const distanceTTest = userDistances.length > 0 && cryptoDistances.length > 0 ? welchTTest(userDistances, cryptoDistances) : null;
    return { userChiSq, cryptoChiSq, userKS, cryptoKS, homogeneity, klSym, ks2Sample, distanceKS, distanceTTest };
  }, [userInput, cryptoString]);

  const prepareFrequencyData = useMemo(() => {
    const userFreq = getCharFrequency(userInput);
    const cryptoFreq = getCharFrequency(cryptoString);
    const allChars = new Set([...Object.keys(userFreq), ...Object.keys(cryptoFreq)]);
    return Array.from(allChars).sort().map(char => ({
      char: char === ' ' ? '␣' : char,
      user: userFreq[char] || 0,
      crypto: cryptoFreq[char] || 0
    }));
  }, [userInput, cryptoString]);

  const prepareDistanceData = useMemo(() => {
    const userDistances = getBigramDistances(userInput);
    const cryptoDistances = getBigramDistances(cryptoString);
    const bins = {};
    for (let i = 0; i <= 10; i += 0.5) bins[i.toFixed(1)] = { user: 0, crypto: 0 };
    userDistances.forEach(d => {
      const bin = (Math.floor(d / 0.5) * 0.5).toFixed(1);
      if (bins[bin]) bins[bin].user++;
    });
    cryptoDistances.forEach(d => {
      const bin = (Math.floor(d / 0.5) * 0.5).toFixed(1);
      if (bins[bin]) bins[bin].crypto++;
    });
    return Object.entries(bins).map(([dist, counts]) => ({ distance: dist, ...counts }));
  }, [userInput, cryptoString]);

  const userEntropy = calculateEntropy(userInput);
  const cryptoEntropy = calculateEntropy(cryptoString);
  const userBigrams = getTopBigrams(userInput);
  const cryptoBigrams = getTopBigrams(cryptoString);

  return (
    <div className="w-full" style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
      <div className="bg-white rounded-lg shadow-md" style={{padding: '1.5rem'}}>
        <h1 className="text-2xl font-bold" style={{marginBottom: '0.5rem'}}>Random String Pattern Analyzer</h1>
        <p className="text-gray-600" style={{marginBottom: '1rem'}}>Type a "random" string. We'll compare patterns to crypto random.</p>
        <textarea value={userInput} onChange={(e) => setUserInput(e.target.value.toLowerCase())} placeholder="Type your random string here..." className="w-full p-3 border border-gray-300 rounded-lg font-mono text-sm resize-none focus:ring-2 focus:ring-blue-500" style={{height: '8rem'}} />
        <div style={{marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '1rem'}}>
          <button onClick={generateCryptoString} disabled={userInput.length === 0} className="bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300" style={{padding: '0.5rem 1.5rem'}}>
            Generate Random Comparison
          </button>
          <span className="text-sm text-gray-600">{userInput.length} characters</span>
        </div>
      </div>

      {cryptoString && (<>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
          <div className="bg-blue-50 rounded-lg" style={{padding: '1rem'}}>
            <h3 className="font-semibold" style={{marginBottom: '0.5rem'}}>Your String</h3>
            <p className="font-mono text-sm break-all">{userInput}</p>
          </div>
          <div className="bg-green-50 rounded-lg" style={{padding: '1rem'}}>
            <h3 className="font-semibold" style={{marginBottom: '0.5rem'}}>Crypto Random</h3>
            <p className="font-mono text-sm break-all">{cryptoString}</p>
          </div>
        </div>

        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
          <div className="bg-white rounded-lg shadow-md" style={{padding: '1.5rem'}}>
            <h3 className="text-lg font-semibold" style={{marginBottom: '1rem'}}>Entropy</h3>
            <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
              <div><span className="text-sm text-gray-600">Your string:</span><span className="text-2xl font-bold text-blue-600" style={{marginLeft: '0.5rem'}}>{userEntropy.toFixed(3)}</span><span className="text-sm text-gray-500" style={{marginLeft: '0.25rem'}}>bits</span></div>
              <div><span className="text-sm text-gray-600">Crypto:</span><span className="text-2xl font-bold text-green-600" style={{marginLeft: '0.5rem'}}>{cryptoEntropy.toFixed(3)}</span><span className="text-sm text-gray-500" style={{marginLeft: '0.25rem'}}>bits</span></div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md" style={{padding: '1.5rem'}}>
            <h3 className="text-lg font-semibold" style={{marginBottom: '1rem'}}>Top Bigrams</h3>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
              <div>
                <p className="text-xs text-gray-600" style={{marginBottom: '0.5rem'}}>Your string:</p>
                {userBigrams.map(([bigram, count]) => (
                  <div key={bigram} className="text-sm font-mono"><span className="text-blue-600">{bigram.replace(' ', '␣')}</span><span className="text-gray-500" style={{marginLeft: '0.5rem'}}>({count})</span></div>
                ))}
              </div>
              <div>
                <p className="text-xs text-gray-600" style={{marginBottom: '0.5rem'}}>Crypto:</p>
                {cryptoBigrams.map(([bigram, count]) => (
                  <div key={bigram} className="text-sm font-mono"><span className="text-green-600">{bigram.replace(' ', '␣')}</span><span className="text-gray-500" style={{marginLeft: '0.5rem'}}>({count})</span></div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md" style={{padding: '1.5rem'}}>
          <h3 className="text-lg font-semibold" style={{marginBottom: '1rem'}}>Character Frequency</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={prepareFrequencyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="char" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="user" fill="#3b82f6" name="Your String" />
              <Bar dataKey="crypto" fill="#10b981" name="Crypto" />
            </BarChart>
          </ResponsiveContainer>
          {statisticalTests && (
            <div style={{marginTop: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
              <div style={{borderTop: '1px solid #e5e7eb', paddingTop: '1rem'}}>
                <h4 className="font-semibold text-sm" style={{marginBottom: '0.5rem'}}>Your String</h4>
                <div className="text-sm" style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                  <div><span className="text-gray-600">χ² vs uniform:</span><div style={{marginLeft: '0.5rem'}}>χ²={statisticalTests.userChiSq.chiSq.toFixed(2)} (df={statisticalTests.userChiSq.df})</div><div className="font-mono text-xs" style={{marginLeft: '0.5rem'}}>{formatPValue(statisticalTests.userChiSq.pValue)}</div></div>
                  <div><span className="text-gray-600">KS vs uniform:</span><div style={{marginLeft: '0.5rem'}}>D={statisticalTests.userKS.d.toFixed(4)}</div><div className="font-mono text-xs" style={{marginLeft: '0.5rem'}}>{formatPValue(statisticalTests.userKS.pValue)}</div></div>
                </div>
              </div>
              <div style={{borderTop: '1px solid #e5e7eb', paddingTop: '1rem'}}>
                <h4 className="font-semibold text-sm" style={{marginBottom: '0.5rem'}}>Crypto Random</h4>
                <div className="text-sm" style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                  <div><span className="text-gray-600">χ² vs uniform:</span><div style={{marginLeft: '0.5rem'}}>χ²={statisticalTests.cryptoChiSq.chiSq.toFixed(2)} (df={statisticalTests.cryptoChiSq.df})</div><div className="font-mono text-xs" style={{marginLeft: '0.5rem'}}>{formatPValue(statisticalTests.cryptoChiSq.pValue)}</div></div>
                  <div><span className="text-gray-600">KS vs uniform:</span><div style={{marginLeft: '0.5rem'}}>D={statisticalTests.cryptoKS.d.toFixed(4)}</div><div className="font-mono text-xs" style={{marginLeft: '0.5rem'}}>{formatPValue(statisticalTests.cryptoKS.pValue)}</div></div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md" style={{padding: '1.5rem'}}>
          <h3 className="text-lg font-semibold" style={{marginBottom: '1rem'}}>Bigram Distance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={prepareDistanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="distance" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="user" fill="#3b82f6" name="Your String" />
              <Bar dataKey="crypto" fill="#10b981" name="Crypto" />
            </BarChart>
          </ResponsiveContainer>
          {statisticalTests?.distanceTTest && (
            <div style={{marginTop: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
              <div style={{borderTop: '1px solid #e5e7eb', paddingTop: '1rem'}}><h4 className="font-semibold text-sm" style={{marginBottom: '0.5rem'}}>Your String</h4><div className="text-sm">Mean: {statisticalTests.distanceTTest.mean1.toFixed(3)}</div></div>
              <div style={{borderTop: '1px solid #e5e7eb', paddingTop: '1rem'}}><h4 className="font-semibold text-sm" style={{marginBottom: '0.5rem'}}>Crypto</h4><div className="text-sm">Mean: {statisticalTests.distanceTTest.mean2.toFixed(3)}</div></div>
            </div>
          )}
        </div>

        {statisticalTests && (
          <div className="bg-white rounded-lg shadow-md" style={{padding: '1.5rem'}}>
            <h3 className="text-lg font-semibold" style={{marginBottom: '1rem'}}>Bivariate Tests</h3>
            <div className="text-sm" style={{display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
              <div><span className="text-gray-600">χ² homogeneity:</span><div style={{marginLeft: '0.5rem'}}>χ²={statisticalTests.homogeneity.chiSq.toFixed(2)} (df={statisticalTests.homogeneity.df})</div><div className="font-mono text-xs" style={{marginLeft: '0.5rem'}}>{formatPValue(statisticalTests.homogeneity.pValue)}</div></div>
              <div><span className="text-gray-600">Two-sample KS:</span><div style={{marginLeft: '0.5rem'}}>D={statisticalTests.ks2Sample.d.toFixed(4)}</div><div className="font-mono text-xs" style={{marginLeft: '0.5rem'}}>{formatPValue(statisticalTests.ks2Sample.pValue)}</div></div>
              <div><span className="text-gray-600">KL divergence:</span><div style={{marginLeft: '0.5rem'}}>{statisticalTests.klSym.toFixed(4)} bits</div></div>
              {statisticalTests.distanceTTest && (
                <div><span className="text-gray-600">Welch's t (distance):</span><div style={{marginLeft: '0.5rem'}}>t={statisticalTests.distanceTTest.t.toFixed(3)} (df={statisticalTests.distanceTTest.df.toFixed(1)})</div><div className="font-mono text-xs" style={{marginLeft: '0.5rem'}}>{formatPValue(statisticalTests.distanceTTest.pValue)}</div></div>
              )}
              {statisticalTests.distanceKS && (
                <div><span className="text-gray-600">KS (distance):</span><div style={{marginLeft: '0.5rem'}}>D={statisticalTests.distanceKS.d.toFixed(4)}</div><div className="font-mono text-xs" style={{marginLeft: '0.5rem'}}>{formatPValue(statisticalTests.distanceKS.pValue)}</div></div>
              )}
            </div>
            <div className="text-xs text-gray-500" style={{marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid #e5e7eb'}}>*** p&lt;.001, ** p&lt;.01, * p&lt;.05, † p&lt;.10</div>
          </div>
        )}
      </>)}
    </div>
  );
};

export default RandomStringAnalyzer;