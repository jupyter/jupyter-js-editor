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
var phosphor_signaling_1 = require('phosphor-signaling');
var phosphor_widget_1 = require('phosphor-widget');
/**
 * An implementation of IEditorModel.
 */
var EditorModel = (function () {
    function EditorModel() {
        this._lineNumbers = true;
        this._tabSize = 2;
    }
    /**
     * Save the data to file.
     */
    EditorModel.prototype.save = function (data) {
        // to be delegated to jupyter-js-services.
        console.log('model save');
    };
    /**
     * Rename the current file.
     */
    EditorModel.prototype.rename = function (name) {
        // to be delegated to jupyter-js-services.
        console.log('model rename');
    };
    return EditorModel;
})();
exports.EditorModel = EditorModel;
var EditorViewModel = (function () {
    /**
     * Construct an editor view model.
     */
    function EditorViewModel(model) {
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
        this._view = null;
        this._buffer = '';
        /**
         * The delay in milliseconds between view buffer-fetches.
         */
        this._bufferDelay = 1000;
        /**
         * The id returned by setTimeout.
         */
        this._bufferTimeoutId = 0;
        this._model = model;
    }
    /**
     * Set the view object for this view model.
     */
    EditorViewModel.prototype.setView = function (view) {
        this._view = view;
        EditorWidget
            .getContentsChanged(this._view)
            .connect(this._startBufferTimer, this);
    };
    /**
     * Save the current buffer in the existing file.
     */
    EditorViewModel.prototype.save = function () {
        this._updateBuffer();
        this._model.save(this._buffer);
    };
    /**
     * Rename the current file.
     */
    EditorViewModel.prototype.rename = function (name) {
        this._model.rename(name);
    };
    /**
     * The mode of the current editor.
     */
    EditorViewModel.prototype.mode = function () {
        return this._mode;
    };
    /**
     * Dispose of this object.
     */
    EditorViewModel.prototype.dispose = function () {
        this._disposed = true;
        phosphor_signaling_1.clearSignalData(this);
        this._model = null;
        this._view = null;
    };
    Object.defineProperty(EditorViewModel.prototype, "isDisposed", {
        /**
         * Get the disposed status of this object.
         */
        get: function () {
            return this._disposed;
        },
        enumerable: true,
        configurable: true
    });
    EditorViewModel.prototype._updateBuffer = function () {
        if (!this.isDisposed) {
            var data = this._view.getContents();
            this._buffer = data;
        }
    };
    EditorViewModel.prototype._startBufferTimer = function () {
        var _this = this;
        clearTimeout(this._bufferTimeoutId);
        this._bufferTimeoutId = setTimeout(function () {
            _this._updateBuffer();
        }, this._bufferDelay);
    };
    return EditorViewModel;
})();
exports.EditorViewModel = EditorViewModel;
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
    function EditorWidget(vm) {
        var _this = this;
        _super.call(this);
        this.addClass('EditorWidget');
        var config = {
            mode: vm.mode(),
            lineNumbers: vm.showLineNumbers,
            tabSize: vm.tabSize
        };
        this._editor = CodeMirror(this.node, config);
        this._editor.on("change", function () {
            EditorWidget.getContentsChanged(_this).emit(true);
        });
        this._viewmodel = vm;
        this._viewmodel.setView(this);
    }
    /**
     * A pure delegate for [[contentsChangedSignal]].
     */
    EditorWidget.getContentsChanged = function (item) {
        return EditorWidget.contentsChangedSignal.bind(item);
    };
    /**
     * Get the contents of the current view as a string.
     */
    EditorWidget.prototype.getContents = function () {
        var doc = this._editor.getDoc();
        return doc.getValue();
    };
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
    /**
     * A signal which is emitted when the view contents change.
     *
     * #### Notes
     * This is designed for the view-model. The data is *not* passed
     * as the signal argument in order that the view-model can decide
     * when to pull the potentially large data string from the view.
     */
    EditorWidget.contentsChangedSignal = new phosphor_signaling_1.Signal();
    return EditorWidget;
})(phosphor_widget_1.Widget);
exports.EditorWidget = EditorWidget;
