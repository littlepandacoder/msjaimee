
// Main components export
export { PerformanceAnalysis } from './PerformanceAnalysis';
export { AnalysisResults } from './AnalysisResults';
export { AudioRecorder } from './AudioRecorder';
export { MidiRecorder } from './MidiRecorder';
export { ReferenceUploader } from './ReferenceUploader';
export { AnalysisControls } from './AnalysisControls';
export { AnalysisProgress } from './AnalysisProgress';
export { PerformanceCharts } from './PerformanceCharts';
export { DetailedAnalysisReport } from './DetailedAnalysisReport';

// Types export
export type { AnalysisResult, AnalysisType, AnalysisMetrics, DetailedAnalysis } from '../types/analysis';

// Hooks export
export { useAnalysisSession } from '../hooks/useAnalysisSession';

// Utils export
export * from '../utils/analysisUtils';
export * from '../utils/audioUtils';
