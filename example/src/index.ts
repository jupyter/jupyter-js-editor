/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';

import {
  ContentsManager
} from 'jupyter-js-services';

import {
  getBaseUrl
} from 'jupyter-js-utils';

import {
  FileHandler
} from '../../lib/index';


function main(): void {
  let manager = new ContentsManager(getBaseUrl());
  let handler = new FileHandler(manager);
  manager.get('index.html').then(contents => {
    let widget = handler.open(contents);
    widget.id = 'main'
    widget.attach(document.body);
    window.onresize = () => widget.update();
  });
}

window.onload = main;
