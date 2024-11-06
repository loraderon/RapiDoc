import { css } from 'lit';

/*
This file is reserved for any custom css that developers want to add to
customize their theme. Simply add your css to this file and yarn build.
*/

export default css`
  .m-markdown p:not(:first-child) {
    margin-block-start: 6px;
  }
  
  a {
    color: var(--brand-friendly) !important;    
  }
  a:hover {
    color: var(--brand-flow) !important;
  }
  
  .m-markdown code {
    color: var(--brand-innovation);
  }
`;
