
export interface AnalysisMetrics {
  noteAccuracy?: string;
  avgTimingDeviation?: string;
  tempoStability?: string;
  dynamicRange?: string;
  articulationConsistency?: string;
  pitchAccuracy?: string;
  avgTempo?: string;
  timingVariation?: string;
  overallStability?: string;
  harmonicComplexity?: string;
  rhythmicVariety?: string;
  velocityRange?: string;
  structuralBalance?: string;
  melodicDevelopment?: string;
}

export interface DetailedAnalysis {
  metrics: AnalysisMetrics;
  strongPoints: string[];
  improvementAreas: string[];
  professionalInsights: string[];
}

export interface AnalysisResult {
  timingAccuracy: number;
  pitchAccuracy: number;
  overallScore: number;
  feedback: string;
  detailedAnalysis: DetailedAnalysis;
  strengthAreas?: string[];
  improvementAreas?: string[];
  aiAnalysis?: string;
  averageTimingDeviation?: number;
  dynamicsScore?: number;
  timingAnalysis?: any[];
  pitchAnalysis?: any[];
  measureDetails?: any[];
}

export type AnalysisType = 'full' | 'audio-only' | 'midi-only' | 'none';
