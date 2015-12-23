/*-----------------------------------------------------------------------------
| Copyright (c) Jupyter Development Team.
| Distributed under the terms of the Modified BSD License.
|----------------------------------------------------------------------------*/
'use strict';

import {
  EditorViewModel, CodeMirrorWidget
} from '../lib/index';

let initialCode = `def f(n):
    for i in range(n):
        print(i)
`;

function main(): void {
  let textModel = new EditorViewModel();
  textModel.text = initialCode;
  textModel.mimetype = 'text/x-python';
  textModel.lineNumbers = true;
  let widget = new CodeMirrorWidget(textModel);
  widget.attach(document.body);
}

main();
