/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use-strict';

import {
  Widget
} from 'phosphor-widget';

import {
  EditorWidget, EditorModel
} from '../../lib/index';


function main(): void {
  var model = new EditorModel();
  var view = new EditorWidget(model);

  Widget.attach(view, document.getElementById('main'));
  view.update();

  window.onresize = () => view.update();
}

window.onload = main;
