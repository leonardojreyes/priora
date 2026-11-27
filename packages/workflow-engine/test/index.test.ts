import { describe, it, expect } from 'vitest';
import { ENGINE_NAME } from '../src/index.js';

describe('workflow-engine', () => {
  it('exposes the engine name', () => {
    expect(ENGINE_NAME).toBe('workflow-engine');
  });
});
