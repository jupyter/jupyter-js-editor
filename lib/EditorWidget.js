// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CodeMirror = require('codemirror');
require('codemirror/mode/meta');
require('codemirror/lib/codemirror.css');
var dmp = require('diff-match-patch');
var phosphor_widget_1 = require('phosphor-widget');
/**
 * The class name added to CodeMirrorWidget instances.
 */
var FILE_BROWSER_CLASS = 'jp-CodeMirroWidget';
/**
 * The class name added to a fixed height editor.
 */
var FIXED_HEIGHT_CLASS = 'jp-mod-fixedHeight';
/**
 * Initialize diff match patch.
 */
var diffMatchPatch = new dmp.diff_match_patch();
/**
 * A widget which hosts a CodeMirror editor.
 */
var CodeMirrorWidget = (function (_super) {
    __extends(CodeMirrorWidget, _super);
    /**
     * Construct a CodeMirror widget.
     */
    function CodeMirrorWidget(model) {
        var _this = this;
        _super.call(this);
        this._editor = null;
        this._model = null;
        this._dirty = false;
        this.addClass(FILE_BROWSER_CLASS);
        this._model = model;
        this._editor = CodeMirror(this.node);
        this.updateMimetype(model.mimetype);
        this.updateFilename(model.filename);
        this.updateReadOnly(model.readOnly);
        this.updateTabSize(model.tabSize);
        this.updateLineNumbers(model.lineNumbers);
        this.updateFixedHeight(model.fixedHeight);
        this.updateText(model.text);
        this._editor.on('change', function (instance, change) {
            _this._model.text = _this._editor.getDoc().getValue();
        });
        model.stateChanged.connect(this.onModelStateChanged, this);
    }
    /**
     * Update whether the editor has a fixed maximum height.
     */
    CodeMirrorWidget.prototype.updateFixedHeight = function (fixedHeight) {
        this.toggleClass(FIXED_HEIGHT_CLASS, fixedHeight);
    };
    /**
     * Update the text in the widget.
     *
     * #### Notes
     * This function attempts to restore the cursor to the correct
     * place by using the bitap algorithm to find the corresponding
     * position of the cursor in the new text.
     */
    CodeMirrorWidget.prototype.updateText = function (text) {
        if (!this.isAttached || !this.isVisible) {
            this._dirty = true;
            return;
        }
        this.update();
    };
    /**
     * Set the mode by given the mimetype.
     *
     * #### Notes
     * Valid mimetypes are listed in https://github.com/codemirror/CodeMirror/blob/master/mode/meta.js.
     */
    CodeMirrorWidget.prototype.updateMimetype = function (mimetype) {
        if (CodeMirror.mimeModes.hasOwnProperty(mimetype)) {
            this._editor.setOption('mode', mimetype);
        }
        else {
            var info = CodeMirror.findModeByMIME(mimetype);
            if (info) {
                this._loadCodeMirrorMode(info.mode);
            }
        }
    };
    /**
     * Set the mode by the given filename if the mimetype is not set.
     */
    CodeMirrorWidget.prototype.updateFilename = function (filename) {
        if (this._model.mimetype) {
            return;
        }
        var info = CodeMirror.findModeByFileName(filename);
        if (info) {
            this._loadCodeMirrorMode(info.mode);
        }
    };
    /**
     * Set the tab size.
     */
    CodeMirrorWidget.prototype.updateTabSize = function (size) {
        this._editor.setOption('tabSize', size);
    };
    /**
     * Update whether line numbers are shown.
     */
    CodeMirrorWidget.prototype.updateLineNumbers = function (lineNumbers) {
        this._editor.setOption('lineNumbers', lineNumbers);
    };
    /**
     * Update the read only property of the editor.
     */
    CodeMirrorWidget.prototype.updateReadOnly = function (readOnly) {
        this._editor.setOption('readOnly', readOnly);
    };
    /**
     * Handle afterAttach messages.
     */
    CodeMirrorWidget.prototype.onAfterAttach = function (msg) {
        if (this._dirty)
            this.update();
        this._editor.refresh();
    };
    /**
     * A message handler invoked on an `'after-show'` message.
     */
    CodeMirrorWidget.prototype.onAfterShow = function (msg) {
        if (this._dirty)
            this.update();
        this._editor.refresh();
    };
    /**
     * Handle resize messages.
     */
    CodeMirrorWidget.prototype.onResize = function (msg) {
        if (msg.width < 0 || msg.height < 0) {
            this._editor.refresh();
        }
        else {
            this._editor.setSize(msg.width, msg.height);
        }
    };
    /**
     * A message handler invoked on an `'update-request'` message.
     */
    CodeMirrorWidget.prototype.onUpdateRequest = function (msg) {
        this._dirty = false;
        var doc = this._editor.getDoc();
        var oldText = doc.getValue();
        var text = this._model.text;
        if (oldText !== text) {
            // TODO: do something smart with all the selections
            var oldCursor = doc.indexFromPos(doc.getCursor());
            var cursor = 0;
            if (oldCursor === oldText.length) {
                // if the cursor was at the end, keep it at the end
                cursor = text.length;
            }
            else {
                var fragment = oldText.substr(oldCursor, 10);
                cursor = diffMatchPatch.match_main(text, fragment, oldCursor);
            }
            doc.setValue(text);
            doc.setCursor(doc.posFromIndex(cursor));
        }
    };
    /**
     * Change handler for model updates.
     */
    CodeMirrorWidget.prototype.onModelStateChanged = function (sender, args) {
        switch (args.name) {
            case 'fixedHeight':
                this.updateFixedHeight(args.newValue);
                break;
            case 'text':
                this.updateText(args.newValue);
                break;
            case 'filename':
                this.updateFilename(args.newValue);
                break;
            case 'mimetype':
                this.updateMimetype(args.newValue);
                break;
            case 'lineNumbers':
                this.updateLineNumbers(args.newValue);
                break;
            case 'readOnly':
                this.updateReadOnly(args.newValue);
                break;
            case 'tabSize':
                this.updateTabSize(args.newValue);
                break;
        }
    };
    /**
     * Load a CodeMirror mode.
     */
    CodeMirrorWidget.prototype._loadCodeMirrorMode = function (mode) {
        var _this = this;
        // load codemirror mode module, and set the mode
        if (CodeMirror.modes.hasOwnProperty(mode)) {
            this._editor.setOption('mode', mode);
        }
        else {
            switch (mode) {
                case 'python':
                    require('codemirror/mode/python/python');
                    this._editor.setOption('mode', mode);
                    break;
                case 'javascript':
                case 'typescript':
                    require('codemirror/mode/javascript/javascript');
                    this._editor.setOption('mode', mode);
                    break;
                case 'css':
                    require('codemirror/mode/css/css');
                    this._editor.setOption('mode', mode);
                    break;
                case 'julia':
                    require('codemirror/mode/julia/julia');
                    this._editor.setOption('mode', mode);
                    break;
                case 'r':
                    require('codemirror/mode/r/r');
                    this._editor.setOption('mode', mode);
                    break;
                case 'markdown':
                    require('codemirror/mode/markdown/markdown');
                    this._editor.setOption('mode', mode);
                    break;
                default:
                    require.ensure([], function (require) {
                        require("codemirror/mode/" + mode + "/" + mode + ".js");
                        _this._editor.setOption('mode', mode);
                    });
                    break;
            }
        }
    };
    return CodeMirrorWidget;
})(phosphor_widget_1.Widget);
exports.CodeMirrorWidget = CodeMirrorWidget;
