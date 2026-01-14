'use client';

import { useCallback, useRef, useState } from 'react';

// Project data type
export interface Project {
  title: string;
  description: string;
  image?: string;
  tags: string[];
  liveUrl?: string;
  repoUrl: string;
  featured?: boolean;
}

// Search result with score
export interface SearchResult {
  project: Project;
  score: number;
}

// Model loading states
type ModelStatus = 'idle' | 'loading' | 'ready' | 'error';

// Cosine similarity calculation
function cosineSimilarity(a: number[], b: number[]): number {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

// Convert Tensor to number array
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function tensorToArray(tensor: { data: any }): number[] {
  return Array.from(tensor.data);
}

// Mean pooling for embeddings
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function meanPooling(embeddings: any): number[] {
  // Simple mean pooling if output is tensor
  if (embeddings.data) return tensorToArray(embeddings);

  // If array of arrays (unlikely for feature-extraction single string without pooling logic in simple pipeline usage,
  // but if we handle raw output:
  return [];
}

export function useSemanticSearch(projects: Project[]) {
  const [status, setStatus] = useState<ModelStatus>('idle');
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<SearchResult[] | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const extractorRef = useRef<any>(null);
  const projectEmbeddingsRef = useRef<number[][] | null>(null);

  // Initialize the model
  const initializeModel = useCallback(async () => {
    if (status === 'loading' || status === 'ready') return;

    setStatus('loading');
    setProgress(0);
    setError(null);

    try {
      console.log('Loading transformers module...');
      const { pipeline, env } = await import('@huggingface/transformers');

      if (!env) {
        throw new Error('Transformers env is undefined');
      }

      // Configuration for browser environment
      console.log('Configuring env...');
      env.allowLocalModels = false;
      env.useBrowserCache = true;

      // Load the multilingual model with progress callback
      console.log('Starting pipeline loading...');
      const extractor = await pipeline(
        'feature-extraction',
        'onnx-community/embeddinggemma-300m-ONNX',
        {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          progress_callback: (progressData: any) => {
            if (progressData?.progress) {
              setProgress(Math.round(progressData.progress));
            }
          },
        }
      );
      console.log('Pipeline loaded');

      extractorRef.current = extractor;
      setProgress(100);

      // Pre-compute project embeddings
      console.log('Computing embeddings for projects:', projects.length);
      const embeddings: number[][] = [];
      for (const project of projects) {
        if (!project) continue;
        const text = `${project.title || ''} ${project.description || ''} ${project.tags?.join(' ') || ''}`; // Safety check
        const output = await extractor(text, {
          pooling: 'mean',
          normalize: true,
        });
        embeddings.push(tensorToArray(output));
      }

      projectEmbeddingsRef.current = embeddings;
      setStatus('ready');
      console.log('Semantic search ready');
    } catch (err: unknown) {
      console.error('Failed to load model details:', err);
      // @ts-expect-error - Accessing stacks for debugging
      console.error('Stack:', err?.stack);
      setError(err instanceof Error ? err.message : String(err));
      setStatus('error');
    }
  }, [status, projects]);

  // Search function
  const search = useCallback(
    async (query: string) => {
      if (
        status !== 'ready' ||
        !extractorRef.current ||
        !projectEmbeddingsRef.current
      ) {
        return;
      }

      if (!query.trim()) {
        setResults(null);
        return;
      }

      setIsSearching(true);

      try {
        // Get query embedding
        const queryOutput = await extractorRef.current(query, {
          pooling: 'mean',
          normalize: true,
        });
        const queryEmbedding = tensorToArray(queryOutput);

        // Calculate similarities
        const scores = projectEmbeddingsRef.current.map(
          (projectEmb, index) => ({
            project: projects[index],
            score: cosineSimilarity(queryEmbedding, projectEmb),
          })
        );

        // Sort by score descending
        scores.sort((a, b) => b.score - a.score);

        setResults(scores);
      } catch (err) {
        console.error('Search error:', err);
      } finally {
        setIsSearching(false);
      }
    },
    [status, projects]
  );

  // Clear results
  const clearResults = useCallback(() => {
    setResults(null);
  }, []);

  return {
    status,
    progress,
    results,
    isSearching,
    error,
    initializeModel,
    search,
    clearResults,
  };
}
