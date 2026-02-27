import React, { useState, useEffect, useRef } from 'react';

const BiasVarianceSVM = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [C, setC] = useState(1); // Regularization parameter
  const [selectedClass, setSelectedClass] = useState('healthy');
  const [showTestData, setShowTestData] = useState(true);

  // Medical example: Heart disease risk based on age and blood pressure
  const classes = {
    'healthy': { name: 'Healthy', color: '#4ECDC4', emoji: '💚' },
    'at_risk': { name: 'At Risk', color: '#FF6B6B', emoji: '⚠️' }
  };

  // Generate more realistic training data
  const generateTrainingData = () => {
    const data: Array<{x: number, y: number, class: string, age: number, bp: number}> = [];

    // Healthy patients: younger age, lower blood pressure
    for (let i = 0; i < 30; i++) {
      const age = Math.random() * 40 + 25; // 25-65 years
      const bp = Math.random() * 30 + 110 + (age - 25) * 0.8; // 110-150 mmHg, slight correlation with age
      data.push({
        x: (age - 20) * 6, // Scale to canvas
        y: 400 - (bp - 100) * 4, // Scale to canvas (inverted y)
        class: 'healthy',
        age: Math.round(age),
        bp: Math.round(bp)
      });
    }

    // At-risk patients: older age, higher blood pressure
    for (let i = 0; i < 30; i++) {
      const age = Math.random() * 40 + 45; // 45-85 years
      const bp = Math.random() * 40 + 140 + (age - 45) * 0.6; // 140-200 mmHg
      data.push({
        x: (age - 20) * 6,
        y: 400 - (bp - 100) * 4,
        class: 'at_risk',
        age: Math.round(age),
        bp: Math.round(bp)
      });
    }

    return data;
  };

  const generateTestData = () => {
    const data: Array<{x: number, y: number, class: string, age: number, bp: number}> = [];

    // Test data with similar distribution but some noise
    for (let i = 0; i < 15; i++) {
      const age = Math.random() * 40 + 30;
      const bp = Math.random() * 35 + 115 + (age - 30) * 0.7;
      data.push({
        x: (age - 20) * 6,
        y: 400 - (bp - 100) * 4,
        class: 'healthy',
        age: Math.round(age),
        bp: Math.round(bp)
      });
    }

    for (let i = 0; i < 15; i++) {
      const age = Math.random() * 35 + 50;
      const bp = Math.random() * 35 + 145 + (age - 50) * 0.5;
      data.push({
        x: (age - 20) * 6,
        y: 400 - (bp - 100) * 4,
        class: 'at_risk',
        age: Math.round(age),
        bp: Math.round(bp)
      });
    }

    return data;
  };

  const [trainingData, setTrainingData] = useState(generateTrainingData);
  const [testData, setTestData] = useState(generateTestData);

  // Compute decision boundary and predictions
  const computeDecisionBoundary = (data: typeof trainingData, regularization: number) => {
    const width = 400;
    const height = 400;
    const grid: Array<{x: number, y: number, class: string}> = [];
    const step = 8;

    for (let x = 0; x < width; x += step) {
      for (let y = 0; y < height; y += step) {
        let healthyScore = 0;
        let riskScore = 0;

        // Compute weighted votes from training data
        data.forEach(point => {
          const distance = Math.sqrt((x - point.x) ** 2 + (y - point.y) ** 2);
          // Higher C = less regularization = more sensitivity to individual points
          // Lower C = more regularization = smoother boundaries
          const sigma = Math.max(5, 100 / regularization); // Inverse relationship
          const weight = Math.exp(-distance * distance / (2 * sigma * sigma));

          if (point.class === 'healthy') {
            healthyScore += weight;
          } else {
            riskScore += weight;
          }
        });

        const predictedClass = healthyScore > riskScore ? 'healthy' : 'at_risk';
        grid.push({ x, y, class: predictedClass });
      }
    }

    return grid;
  };

  // Calculate performance metrics
  const calculateMetrics = (data: typeof trainingData, decisionBoundary: ReturnType<typeof computeDecisionBoundary>) => {
    let tp = 0, tn = 0, fp = 0, fn = 0;

    data.forEach(point => {
      // Find the closest grid point to predict class
      let closestDistance = Infinity;
      let prediction = 'healthy';

      decisionBoundary.forEach(gridPoint => {
        const distance = Math.sqrt((point.x - gridPoint.x) ** 2 + (point.y - gridPoint.y) ** 2);
        if (distance < closestDistance) {
          closestDistance = distance;
          prediction = gridPoint.class;
        }
      });

      const actual = point.class;
      if (actual === 'at_risk' && prediction === 'at_risk') tp++;
      else if (actual === 'healthy' && prediction === 'healthy') tn++;
      else if (actual === 'healthy' && prediction === 'at_risk') fp++;
      else if (actual === 'at_risk' && prediction === 'healthy') fn++;
    });

    const accuracy = (tp + tn) / (tp + tn + fp + fn);
    const precision = tp / (tp + fp) || 0;
    const recall = tp / (tp + fn) || 0;
    const f1 = 2 * (precision * recall) / (precision + recall) || 0;

    return { accuracy, precision, recall, f1, tp, tn, fp, fn };
  };

  const [decisionBoundary, setDecisionBoundary] = useState<ReturnType<typeof computeDecisionBoundary>>([]);
  const [trainMetrics, setTrainMetrics] = useState<ReturnType<typeof calculateMetrics>>({ accuracy: 0, precision: 0, recall: 0, f1: 0, tp: 0, tn: 0, fp: 0, fn: 0 });
  const [testMetrics, setTestMetrics] = useState<ReturnType<typeof calculateMetrics>>({ accuracy: 0, precision: 0, recall: 0, f1: 0, tp: 0, tn: 0, fp: 0, fn: 0 });

  useEffect(() => {
    const boundary = computeDecisionBoundary(trainingData, C);
    setDecisionBoundary(boundary);

    const trainPerf = calculateMetrics(trainingData, boundary);
    const testPerf = calculateMetrics(testData, boundary);

    setTrainMetrics(trainPerf);
    setTestMetrics(testPerf);
  }, [C, trainingData, testData]);

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, 400, 400);

    // Draw decision boundary
    decisionBoundary.forEach(point => {
      ctx.fillStyle = classes[point.class as keyof typeof classes].color + '15';
      ctx.fillRect(point.x, point.y, 8, 8);
    });

    // Draw axis labels
    ctx.fillStyle = '#666';
    ctx.font = '12px Arial';
    ctx.fillText('Age (years)', 200, 390);
    ctx.save();
    ctx.translate(15, 200);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Blood Pressure (mmHg)', 0, 0);
    ctx.restore();

    // Draw training points
    trainingData.forEach(point => {
      ctx.fillStyle = classes[point.class as keyof typeof classes].color;
      ctx.beginPath();
      ctx.arc(point.x, point.y, 6, 0, 2 * Math.PI);
      ctx.fill();
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 2;
      ctx.stroke();
    });

    // Draw test points (if shown)
    if (showTestData) {
      testData.forEach(point => {
        ctx.fillStyle = classes[point.class as keyof typeof classes].color;
        ctx.beginPath();
        ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
        ctx.fill();
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 3]);
        ctx.stroke();
        ctx.setLineDash([]);
      });
    }
  };

  useEffect(() => {
    drawCanvas();
  }, [decisionBoundary, trainingData, testData, showTestData]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Convert back to age and blood pressure
    const age = Math.round(x / 6 + 20);
    const bp = Math.round(100 + (400 - y) / 4);

    setTrainingData(prev => [...prev, {
      x,
      y,
      class: selectedClass,
      age,
      bp
    }]);
  };

  const regenerateData = () => {
    setTrainingData(generateTrainingData());
    setTestData(generateTestData());
  };

  const getOverfittingAnalysis = () => {
    const trainAcc = trainMetrics.accuracy || 0;
    const testAcc = testMetrics.accuracy || 0;
    const gap = trainAcc - testAcc;

    if (C < 0.5) {
      return {
        status: "Underfitting",
        color: "text-orange-500",
        description: "High regularization creates overly smooth boundaries. Both training and test accuracy are low."
      };
    } else if (C > 15 && gap > 0.1) {
      return {
        status: "Overfitting",
        color: "text-red-500",
        description: "Low regularization creates complex, jagged boundaries. Model memorizes training data but fails on test data."
      };
    } else {
      return {
        status: "Good Fit",
        color: "text-green-500",
        description: "Balanced regularization. Training and test accuracy are similar and reasonably high."
      };
    }
  };

  const analysis = getOverfittingAnalysis();

  return (
    <div className="p-6 max-w-6xl mx-auto bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Heart Disease Risk Prediction - Bias-Variance Trade-off
        </h1>
        <p className="text-gray-600 text-sm">
          See how regularization affects overfitting in medical diagnosis
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Canvas and Controls */}
        <div className="lg:col-span-2 bg-white rounded-lg p-4 shadow-lg">
          <div className="mb-4 flex flex-wrap gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Add Patient Type:
              </label>
              <div className="flex gap-2">
                {Object.entries(classes).map(([key, info]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedClass(key)}
                    className={`px-3 py-2 rounded-lg border-2 transition-all ${
                      selectedClass === key
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <span className="text-lg">{info.emoji}</span>
                    <div className="text-xs text-gray-600">{info.name}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Display:
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={showTestData}
                  onChange={(e) => setShowTestData(e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm">Show Test Data (dashed)</span>
              </label>
            </div>
          </div>

          <div className="border-2 border-gray-300 rounded-lg overflow-hidden">
            <canvas
              ref={canvasRef}
              width={400}
              height={400}
              onClick={handleCanvasClick}
              className="cursor-crosshair bg-gray-50 max-w-full"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600 mb-2">
              Click to add patients. Solid circles = training data, dashed = test data
            </p>
            <button
              onClick={regenerateData}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Generate New Dataset
            </button>
          </div>

          {/* Slider */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Regularization Parameter (C): {C.toFixed(2)}
            </label>
            <input
              type="range"
              value={C}
              onChange={(e) => setC(parseFloat(e.target.value))}
              min={0.01}
              max={50}
              step={0.01}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>High Regularization<br/>(Smooth boundaries)</span>
              <span className="text-right">Low Regularization<br/>(Complex boundaries)</span>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-white rounded-lg p-4 shadow-lg">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Performance Metrics
          </h2>

          <div className="space-y-4">
            {/* Overfitting Status */}
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-center">
                <div className={`text-lg font-bold ${analysis.color}`}>
                  {analysis.status}
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  {analysis.description}
                </p>
              </div>
            </div>

            {/* Training Metrics */}
            <div className="border-l-4 border-green-500 pl-3">
              <h3 className="font-semibold text-green-700 mb-2">Training Set</h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Accuracy:</span>
                  <span className="font-mono">{(trainMetrics.accuracy || 0).toFixed(3)}</span>
                </div>
                <div className="flex justify-between">
                  <span>F1 Score:</span>
                  <span className="font-mono">{(trainMetrics.f1 || 0).toFixed(3)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Precision:</span>
                  <span className="font-mono">{(trainMetrics.precision || 0).toFixed(3)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Recall:</span>
                  <span className="font-mono">{(trainMetrics.recall || 0).toFixed(3)}</span>
                </div>
              </div>
            </div>

            {/* Test Metrics */}
            <div className="border-l-4 border-blue-500 pl-3">
              <h3 className="font-semibold text-blue-700 mb-2">Test Set</h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Accuracy:</span>
                  <span className="font-mono">{(testMetrics.accuracy || 0).toFixed(3)}</span>
                </div>
                <div className="flex justify-between">
                  <span>F1 Score:</span>
                  <span className="font-mono">{(testMetrics.f1 || 0).toFixed(3)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Precision:</span>
                  <span className="font-mono">{(testMetrics.precision || 0).toFixed(3)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Recall:</span>
                  <span className="font-mono">{(testMetrics.recall || 0).toFixed(3)}</span>
                </div>
              </div>
            </div>

            {/* Performance Gap */}
            <div className="bg-yellow-50 p-3 rounded-lg">
              <h3 className="font-semibold text-yellow-800 mb-2">Performance Gap</h3>
              <div className="text-sm">
                <div className="flex justify-between">
                  <span>Train - Test Accuracy:</span>
                  <span className="font-mono">
                    {((trainMetrics.accuracy || 0) - (testMetrics.accuracy || 0)).toFixed(3)}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  Large gaps indicate overfitting
                </p>
              </div>
            </div>

            {/* Key Insights */}
            <div className="bg-blue-50 p-3 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">Key Insights</h3>
              <ul className="text-xs text-gray-700 space-y-1">
                <li>• Low C: Simple boundaries, may underfit</li>
                <li>• High C: Complex boundaries, may overfit</li>
                <li>• Optimal C: Best test performance</li>
                <li>• Large train-test gap = overfitting</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiasVarianceSVM;
