/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use-strict';
var phosphor_widget_1 = require('phosphor-widget');
var index_1 = require('../../lib/index');
function main() {
    var model = new index_1.EditorModel();
    var viewmodel = new index_1.EditorViewModel(model);
    var view = new index_1.EditorWidget(viewmodel);
    phosphor_widget_1.Widget.attach(view, document.getElementById('main'));
    view.update();
    window.onresize = function () { return view.update(); };
}
window.onload = main;
//# sourceMappingURL=index.js.map