export interface UserInput {
  inputDir: string;
  outputDir: string;
  downscaleOption: 'By Size' | 'By Resolution';
  maxSize?: number;
  resolution?: string;
}
