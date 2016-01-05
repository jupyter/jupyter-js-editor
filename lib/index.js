// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
'use strict';
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var phosphor_di_1 = require('phosphor-di');
__export(require('./viewmodel'));
__export(require('./widget'));
/**
 * The dependency token for the `IEditorFactory` interface.
 */
exports.IEditorFactory = new phosphor_di_1.Token('jupyter-js-editor.IEditorFactory');
