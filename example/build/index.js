/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';
var index_1 = require('../../lib/index');
function main() {
    var model = new index_1.EditorModel();
    var view = new index_1.CodeMirrorWidget(model);
    view.attach(document.getElementById('main'));
    model.filename = 'test.js';
    view.update();
    window.onresize = function () { return view.update(); };
}
window.onload = main;
