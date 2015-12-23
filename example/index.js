/*-----------------------------------------------------------------------------
| Copyright (c) Jupyter Development Team.
| Distributed under the terms of the Modified BSD License.
|----------------------------------------------------------------------------*/
'use strict';
var index_1 = require('../lib/index');
var initialCode = "def f(n):\n    for i in range(n):\n        print(i)\n";
function main() {
    var textModel = new index_1.EditorViewModel();
    textModel.text = initialCode;
    textModel.mimetype = 'text/x-python';
    textModel.lineNumbers = true;
    var widget = new index_1.CodeMirrorWidget(textModel);
    widget.attach(document.body);
}
main();
