import {Input} from '../wc-input/input.component';

// @TODO hmm this doesn't extend JSX global definition, WHY?
declare global {
  namespace JSX {
    interface IntrinsicElements{
      // 'wc-input': Input
    }
  }
}
