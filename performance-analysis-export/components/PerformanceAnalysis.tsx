
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { AnalysisControls } from './AnalysisControls';
import { AnalysisProgress } from './AnalysisProgress';
import { AnalysisResults } from './AnalysisResults';
import { useAnalysisSession } from '../hooks/useAnalysisSession';

interface PerformanceAnalysisProps {
  audioData: Blob | null;
  midiData: File | null;
  referenceFile: File | null;
  referenceType: 'audio' | 'midi' | null;
  onAnalysisComplete: (analysis: any) => void;
}

export const PerformanceAnalysis = ({ 
  audioData, 
  midiData, 
  referenceFile, 
  referenceType, 
  onAnalysisComplete 
}: PerformanceAnalysisProps) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('');
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  
  const { toast } = useToast();
  const { 
    createSession, 
    uploadAudioFile, 
    startAnalysis, 
    isLoading: sessionLoading 
  } = useAnalysisSession();

  const performAnalysis = async () => {
    if (!audioData && !midiData) {
      toast({
        title: "Missing Performance Data",
        description: "Please record or upload your performance",
        variant: "destructive",
      });
      return;
    }

    if (!referenceFile) {
      toast({
        title: "Missing Reference",
        description: "Please upload a reference audio or MIDI file",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    setProgress(0);
    setCurrentStep('Creating analysis session...');

    try {
      const session = await createSession('demo-user');
      if (!session) throw new Error('Failed to create session');

      setProgress(20);
      setCurrentStep('Uploading performance audio...');

      const performanceFile = audioData || midiData;
      const performanceFileName = audioData ? 'performance.webm' : 'performance.mid';
      
      await uploadAudioFile(
        performanceFile!, 
        performanceFileName, 
        session.id, 
        'performance'
      );

      setProgress(40);
      setCurrentStep('Uploading reference file...');

      await uploadAudioFile(
        referenceFile, 
        referenceFile.name, 
        session.id, 
        'reference'
      );

      setProgress(60);
      setCurrentStep('Processing audio with AI...');

      const results = await startAnalysis(session.id);
      
      if (results) {
        setProgress(100);
        setCurrentStep('Analysis complete!');
        setAnalysisResults(results);
        onAnalysisComplete(results);
        
        setTimeout(() => {
          setIsAnalyzing(false);
        }, 1000);
      }

    } catch (error) {
      console.error('Analysis error:', error);
      setIsAnalyzing(false);
      toast({
        title: "Analysis Failed",
        description: "Please try again or contact support",
        variant: "destructive",
      });
    }
  };

  const handleNewAnalysis = () => {
    setAnalysisResults(null);
    setProgress(0);
    setCurrentStep('');
  };

  if (analysisResults) {
    return (
      <AnalysisResults 
        results={analysisResults} 
        onNewAnalysis={handleNewAnalysis}
      />
    );
  }

  if (isAnalyzing) {
    return (
      <AnalysisProgress 
        progress={progress} 
        currentStep={currentStep} 
      />
    );
  }

  const getAnalysisType = () => {
    if ((audioData || midiData) && referenceFile) return 'full';
    if (audioData && !referenceFile) return 'audio-only';
    if (midiData && !referenceFile) return 'midi-only';
    return 'none';
  };

  return (
    <AnalysisControls
      analysisType={getAnalysisType()}
      isAnalyzing={isAnalyzing || sessionLoading}
      progress={progress}
      onStartAnalysis={performAnalysis}
    />
  );
};
