// Theme-specific annotations for artifacts
// Each artifact can have different annotations for different themes

type ArtifactAnnotations = Record<string, Record<string, string>>;

export const artifactAnnotations: ArtifactAnnotations = {
  'bouncing-ball': {
    'fun': `A playful demonstration of animation and interactivity. Adjust the slider and watch the ball respond.`,
    'introspection': `A minimal test case for React hydration in static sites. How much JavaScript is too much?`,
  },
  'random-string-analyzer': {
    'statistics': `A battery of statistical tests (chi-square, KS, entropy, KL divergence) applied to character and bigram distributions. Demonstrates how formal tests can detect human patterns invisible to intuition.`,
    'introspection': `Type what feels random. Watch the statistics reveal your systematic biases - keyboard proximity, letter preferences, rhythm. A mirror for recognizing the limits of human randomness.`,
  },
  'three-flower-comparison': {
    'machine-learning': `PCA reduces the four Iris measurements to three principal components. Here those components become wave frequencies - a literal sonification of dimensionality reduction. The interference patterns reveal geometric relationships invisible in the raw data.`,
    'statistics': `Each flower's PCA scores define a unique waveform. Pairwise multiplication produces Chladni-like patterns where nodal lines (dark regions) indicate phase opposition. The cutoff threshold controls which correlations surface.`,
    'fun': `Pick three flowers, watch them oscillate, see what patterns emerge when they interfere. The classic Iris dataset, reimagined as an audiovisual toy.`,
  },
  'wave-visualization': {
    'machine-learning': `Shows the decomposition explicitly: PC1 contributes most variance (largest amplitude), PC2 and PC3 add detail. The superposition is a weighted sum where eigenvalues determine each component's contribution.`,
    'statistics': `The frequency parameters (c1, c2) act as zoom levels into the wave structure. Phase offset reveals how temporal alignment between X and Y waves creates or destroys interference nodes.`,
    'introspection': `What does it mean to "see" a statistical transform? This artifact makes PCA tangible - the abstract rotation of coordinate axes becomes visible wave interference.`,
  },
  'persistent-homology-viz': {
    'machine-learning': `Persistent homology extracts topological features from point cloud data at multiple scales. The filtration process shown here is foundational to topological data analysis (TDA), revealing structure that clustering algorithms miss.`,
    'statistics': `Persistence barcodes and diagrams provide statistical summaries of topological features. Long bars indicate robust features; points far from the diagonal represent significant structure. This is shape statistics.`,
  },
  'bias-variance-svm': {
    'machine-learning': `The regularization parameter C controls the bias-variance trade-off directly. Low C penalizes complexity, yielding high-bias/low-variance models. High C allows the model to fit training data closely, risking high variance. The train-test accuracy gap reveals when you've crossed from learning signal to memorizing noise.`,
    'statistics': `Precision, recall, and F1 scores tell different stories about model errors. In medical diagnosis, false negatives (missed disease) may be costlier than false positives. The gap between training and test metrics is itself a statistic - a measure of generalization failure.`,
  },
  'isometric-grid': {
    'fun': `A drawing toy for impossible objects. Fill triangles, trace edges, build Penrose triangles and other visual paradoxes. The numbered grid makes it easy to share recipes: "fill 42, 43, 61, 62..." and someone else can reconstruct your impossible figure.`,
    'introspection': `Penrose triangles are locally consistent but globally impossible - each corner looks fine, but the whole cannot exist in 3D space. A metaphor for beliefs that seem reasonable in isolation but contradict when combined. The grid makes the construction explicit: where exactly does the impossibility arise?`,
  },
};

export function getArtifactAnnotation(artifactSlug: string, themeSlug: string): string | undefined {
  return artifactAnnotations[artifactSlug]?.[themeSlug];
}

export function getArtifactThemes(artifactSlug: string): string[] {
  return Object.keys(artifactAnnotations[artifactSlug] || {});
}
