// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
'use strict';

import expect = require('expect.js');

import {
  EditorViewModel, CodeMirrorWidget
} from '../../lib';


describe('jupyter-js-editor', () => {

  describe('CodeMirrorWidget', () => {

    it('should always pass', () => {
        let model = new EditorViewModel();
        let widget = new CodeMirrorWidget(model);
    });

  });

});
