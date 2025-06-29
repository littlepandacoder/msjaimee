
# Performance Analysis System Export

This package contains all the essential components for implementing piano performance analysis with AI feedback.

## Features
- Audio recording and MIDI input
- Real-time performance analysis
- AI-powered feedback using OpenAI
- Detailed charts and visualizations
- PDF report generation
- Machine learning data collection

## Installation

1. Install required dependencies:
```bash
npm install @supabase/supabase-js @tanstack/react-query recharts lucide-react
```

2. Set up Supabase:
   - Create a new Supabase project
   - Run the SQL migrations in `database/migrations.sql`
   - Deploy the edge functions in `supabase/functions/`
   - Add your OpenAI API key to Supabase secrets

3. Copy the components and utilities to your project

## File Structure
```
components/           # React components
hooks/               # Custom React hooks
utils/               # Utility functions
types/               # TypeScript type definitions
supabase/            # Backend edge functions
database/            # Database schema
```

## Usage

Import the main component:
```tsx
import { PerformanceAnalysis } from './components/PerformanceAnalysis';

function App() {
  return (
    <PerformanceAnalysis
      audioData={audioBlob}
      midiData={midiFile}
      referenceFile={referenceFile}
      referenceType="audio"
      onAnalysisComplete={(result) => console.log(result)}
    />
  );
}
```

## Configuration

Make sure to configure these environment variables:
- OPENAI_API_KEY (in Supabase secrets)
- Supabase URL and keys in your frontend
