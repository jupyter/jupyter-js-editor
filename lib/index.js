/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var phosphor_widget_1 = require('phosphor-widget');
/**
 * The data model behind the editor view.
 */
var EditorModel = (function () {
    /**
     * Construct an Editor Model.
     */
    function EditorModel(config) {
        /**
         * Flag that determines whether to show line numbers.
         */
        this.showLineNumbers = true;
        /**
         * Flag that determines whether the view is read-only.
         */
        this.readOnly = true;
        /**
         * Number of spaces to use for a tab.
         */
        this.tabSize = 2;
        this._mode = '';
        this._disposed = false;
        this._buffer = '';
        var cfg = config || {};
        this._mode = config.mode || 'python';
        this.showLineNumbers = config.showLineNumbers || true;
        this.readOnly = config.readOnly || false;
        this.tabSize = config.tabSize || 4;
    }
    /**
     * Updates the buffer stored in the model.
     *
     * @param value - A string containing the complete data in the view.
     */
    EditorModel.prototype.updateBuffer = function (value) {
        if (!this.isDisposed) {
            this._buffer = value;
        }
    };
    /**
     * Save the current buffer in the existing file.
     */
    EditorModel.prototype.save = function () {
        // delegate to jupyter-js-services
        console.log('model save');
    };
    /**
     * Rename the current file.
     */
    EditorModel.prototype.rename = function (name) {
        // delegate to jupyter-js-services
        console.log('model rename');
    };
    /**
     * The mode of the current editor.
     */
    EditorModel.prototype.mode = function () {
        return this._mode;
    };
    /**
     * Dispose of this object.
     */
    EditorModel.prototype.dispose = function () {
        this._disposed = true;
    };
    Object.defineProperty(EditorModel.prototype, "isDisposed", {
        /**
         * Get the disposed status of this object.
         */
        get: function () {
            return this._disposed;
        },
        enumerable: true,
        configurable: true
    });
    return EditorModel;
})();
exports.EditorModel = EditorModel;
/**
 * A widget used for entering text/code.
 *
 * #### Notes
 * This class happens to use Codemirror as the hosted widget for
 * text entry, but Codemirror is entirely encapsulated
 * within this class. As long as the IEditorWidget interface is
 * adhered to, any other text editor widget can be easily
 * swapped in.
 */
var EditorWidget = (function (_super) {
    __extends(EditorWidget, _super);
    /**
     * Construct an EditorWidget.
     */
    function EditorWidget(model) {
        var _this = this;
        _super.call(this);
        this._bufferTimeoutId = 0;
        this._bufferDelay = 1000;
        this.addClass('Ph-EditorWidget');
        var config = {
            mode: model.mode(),
            lineNumbers: model.showLineNumbers,
            tabSize: model.tabSize
        };
        this._editor = CodeMirror(this.node, config);
        this._editor.on("change", function () {
            _this._startBufferTimer();
        });
        this._model = model;
    }
    Object.defineProperty(EditorWidget.prototype, "fontSize", {
        /**
         * Set the font size in the editor.
         */
        set: function (size) {
            (this._editor.getWrapperElement()).style["font-size"] = size;
            this._editor.refresh();
        },
        enumerable: true,
        configurable: true
    });
    EditorWidget.prototype.onAfterAttach = function (msg) {
        this._editor.refresh();
    };
    EditorWidget.prototype.onResize = function (msg) {
        if (msg.width < 0 || msg.height < 0) {
            this._editor.refresh();
        }
        else {
            this._editor.setSize(msg.width, msg.height);
        }
    };
    EditorWidget.prototype._startBufferTimer = function () {
        var _this = this;
        clearTimeout(this._bufferTimeoutId);
        this._bufferTimeoutId = setTimeout(function () {
            var text = _this._editor.getDoc().getValue();
            _this._model.updateBuffer(text);
        }, this._bufferDelay);
    };
    return EditorWidget;
})(phosphor_widget_1.Widget);
exports.EditorWidget = EditorWidget;
