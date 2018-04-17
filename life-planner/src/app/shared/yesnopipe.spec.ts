/* tslint:disable:no-unused-variable */

import {YesNoPipe} from './YesNoPipe';

describe('Pipe: Default', () => {
  let pipe: YesNoPipe;

  beforeEach(() => {
    pipe = new YesNoPipe();
  });

  it('providing no value returns fallback', () => {
    expect(pipe.transform(null)).toBe('No');
  });

  it('providing a value returns value', () => {
    expect(pipe.transform(true)).toBe('Yes');
  });

  it('asking for https returns https', () => {
    expect(pipe.transform(false)).toBe('No');
  });
});
