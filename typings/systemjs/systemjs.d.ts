// Type definitions for SystemJS 1.6
// Project: https://github.com/stealjs/systemjs
// Definitions by: Steven Silvester <https://github.com/blink1073/>

interface System {
  import(module: string): Promise<any>;
  delete(module: string): boolean;
}


declare var System: System;

declare module 'System' {
  export = System;
}
