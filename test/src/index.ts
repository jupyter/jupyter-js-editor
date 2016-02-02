// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
'use strict';

import expect = require('expect.js');

import {
  ContentsManager
} from 'jupyter-js-services';

import {
  FileHandler
} from '../../lib';


describe('jupyter-js-editor', () => {

  describe('FileHandler', () => {

    it('should always pass', () => {
      let manager = new ContentsManager('');
      let handler = new FileHandler(manager);
    });

  });

});
