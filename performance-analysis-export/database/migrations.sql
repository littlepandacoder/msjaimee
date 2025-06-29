
-- Create analysis sessions table
CREATE TABLE public.analysis_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
  performance_audio_path TEXT,
  reference_audio_path TEXT,
  analysis_status TEXT DEFAULT 'pending',
  analysis_results JSONB,
  ml_data_stored BOOLEAN DEFAULT false,
  model_version_used TEXT,
  confidence_score NUMERIC,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create ML training data table
CREATE TABLE public.ml_training_data (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID REFERENCES public.analysis_sessions(id),
  audio_features JSONB NOT NULL,
  reference_features JSONB,
  timing_data JSONB NOT NULL,
  pitch_data JSONB NOT NULL,
  dynamics_data JSONB NOT NULL,
  performance_metrics JSONB NOT NULL,
  user_feedback JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create model metrics table
CREATE TABLE public.model_metrics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  model_version TEXT NOT NULL,
  accuracy_score NUMERIC,
  precision_score NUMERIC,
  recall_score NUMERIC,
  f1_score NUMERIC,
  training_data_count INTEGER NOT NULL,
  validation_data_count INTEGER NOT NULL,
  training_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  metadata JSONB
);

-- Enable Row Level Security
ALTER TABLE public.analysis_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ml_training_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.model_metrics ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for analysis_sessions
CREATE POLICY "Users can view their own sessions" ON public.analysis_sessions
  FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can create sessions" ON public.analysis_sessions
  FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can update their own sessions" ON public.analysis_sessions
  FOR UPDATE USING (auth.uid() = user_id OR user_id IS NULL);

-- Create RLS policies for ml_training_data
CREATE POLICY "Allow read access to ml_training_data" ON public.ml_training_data
  FOR SELECT USING (true);

CREATE POLICY "Allow insert to ml_training_data" ON public.ml_training_data
  FOR INSERT WITH CHECK (true);

-- Create RLS policies for model_metrics
CREATE POLICY "Allow read access to model_metrics" ON public.model_metrics
  FOR SELECT USING (true);

CREATE POLICY "Allow insert to model_metrics" ON public.model_metrics
  FOR INSERT WITH CHECK (true);
