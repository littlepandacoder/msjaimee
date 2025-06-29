
# Installation Guide

## 1. Frontend Setup

Copy these folders to your React project:
- `components/` → `src/components/`
- `hooks/` → `src/hooks/`
- `utils/` → `src/utils/`
- `types/` → `src/types/`

## 2. Install Dependencies

```bash
npm install @supabase/supabase-js @tanstack/react-query recharts lucide-react
```

## 3. Supabase Setup

1. Create a new Supabase project
2. Run the SQL migration in `database/migrations.sql`
3. Deploy edge functions:
   - Copy `supabase/functions/` to your Supabase project
   - Deploy using `supabase functions deploy analyze-performance`

## 4. Environment Variables

Add to your Supabase project secrets:
- `OPENAI_API_KEY` - Your OpenAI API key

## 5. Configure Supabase Client

Create `src/lib/supabase.ts`:
```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

## 6. Usage Example

```tsx
import { PerformanceAnalysis } from './components/PerformanceAnalysis';
import { useState } from 'react';

function App() {
  const [audioData, setAudioData] = useState<Blob | null>(null);
  const [referenceFile, setReferenceFile] = useState<File | null>(null);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Piano Performance Analysis</h1>
      <PerformanceAnalysis
        audioData={audioData}
        midiData={null}
        referenceFile={referenceFile}
        referenceType="audio"
        onAnalysisComplete={(result) => {
          console.log('Analysis complete:', result);
        }}
      />
    </div>
  );
}
```

## 7. Styling

The components use Tailwind CSS classes. Make sure Tailwind is configured in your project, or replace with your preferred styling solution.
