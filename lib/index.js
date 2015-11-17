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
var phosphor_properties_1 = require('phosphor-properties');
var phosphor_signaling_1 = require('phosphor-signaling');
var phosphor_widget_1 = require('phosphor-widget');
/**
 * The data model behind the editor view.
 */
var EditorModel = (function () {
    /**
     * Construct an Editor Model.
     */
    function EditorModel(config) {
        this._disposed = false;
        this._buffer = '';
        var cfg = config || {};
        this.mode = cfg.mode || '';
        this.showLineNumbers = cfg.showLineNumbers || true;
        this.readOnly = cfg.readOnly || false;
        this.tabSize = cfg.tabSize || 4;
    }
    Object.defineProperty(EditorModel.prototype, "buffer", {
        /**
         * Get the string for the current buffer.
         */
        get: function () {
            return this._buffer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditorModel.prototype, "changed", {
        /**
         * A signal emitted when the editor model state changes.
         *
         * #### Notes
         * This is a pure delegate to the [[changedSignal]].
         */
        get: function () {
            return EditorModel.changedSignal.bind(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditorModel.prototype, "mode", {
        /**
         * Get the mode for the editor model.
         *
         * #### Notes
         * This is a pure delegate to the [[modeProperty]].
         */
        get: function () {
            return EditorModel.modeProperty.get(this);
        },
        /**
         * Set the text for the editor model.
         *
         * #### Notes
         * This is a pure delegate to the [[modeProperty]].
         */
        set: function (value) {
            EditorModel.modeProperty.set(this, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditorModel.prototype, "showLineNumbers", {
        /**
         * Get the showLineNumbers flag for the editor model.
         *
         * #### Notes
         * This is a pure delegate to the [[showLineNumbersProperty]].
         */
        get: function () {
            return EditorModel.showLineNumbersProperty.get(this);
        },
        /**
         * Set the showLineNumbers flag for the editor model.
         *
         * #### Notes
         * This is a pure delegate to the [[showLineNumbersProperty]].
         */
        set: function (value) {
            EditorModel.showLineNumbersProperty.set(this, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditorModel.prototype, "readOnly", {
        /**
         * Get the readOnly flag for the editor model.
         *
         * #### Notes
         * This is a pure delegate to the [[readOnlyProperty]].
         */
        get: function () {
            return EditorModel.readOnlyProperty.get(this);
        },
        /**
         * Set the readOnly flag for the editor model.
         *
         * #### Notes
         * This is a pure delegate to the [[readOnlyProperty]].
         */
        set: function (value) {
            EditorModel.readOnlyProperty.set(this, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditorModel.prototype, "tabSize", {
        /**
         * Get the tabSize number for the editor model.
         *
         * #### Notes
         * This is a pure delegate to the [[tabSizeProperty]].
         */
        get: function () {
            return EditorModel.tabSizeProperty.get(this);
        },
        /**
         * Set the tabSize number for the editor model.
         *
         * #### Notes
         * This is a pure delegate to the [[tabSizeProperty]]
         */
        set: function (value) {
            EditorModel.tabSizeProperty.set(this, value);
        },
        enumerable: true,
        configurable: true
    });
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
     * Dispose of this object.
     */
    EditorModel.prototype.dispose = function () {
        this._disposed = true;
    };
    /**
     * A signal emitted when the title state changes.
     *
     * **See also:** [[changed]]
     */
    EditorModel.changedSignal = new phosphor_signaling_1.Signal();
    /**
     * The property descriptor for the mode text.
     *
     * This will be used to set the mode of the editor.
     *
     * The default value is an empty string.
     *
     * **See also:** [[mode]]
     */
    EditorModel.modeProperty = new phosphor_properties_1.Property({
        name: 'mode',
        value: '',
        notify: EditorModel.changedSignal
    });
    /**
     * The property descriptor for the showLineNumbers flag.
     *
     * This will be used to set whether line numbers are visible
     * in the editor.
     *
     * The default value is `true`.
     *
     * **See also:** [[showLineNumbers]]
     */
    EditorModel.showLineNumbersProperty = new phosphor_properties_1.Property({
        name: 'showLineNumbers',
        value: true,
        notify: EditorModel.changedSignal
    });
    /**
     * The property descriptor for the readOnly flag.
     *
     * This will be used to set whether the editor is read-only,
     * or if it is editable.
     *
     * The default value is `false`.
     *
     * **See also:** [[readOnly]]
     */
    EditorModel.readOnlyProperty = new phosphor_properties_1.Property({
        name: 'readOnly',
        value: false,
        notify: EditorModel.changedSignal
    });
    /**
     * The property descriptor for the tabSize number.
     *
     * This determines the number of spaces to use in place of a tab.
     *
     * The default value is `2`.
     *
     * **See also** [[tabSize]]
     */
    EditorModel.tabSizeProperty = new phosphor_properties_1.Property({
        name: 'tabSize',
        value: 2,
        notify: EditorModel.changedSignal
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
 * within this class so any other text editor widget can be easily
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
        this.addClass('jp-EditorWidget');
        this._model = model;
        this._model.changed.connect(this._modelChanged);
        var config = this._buildConfig();
        this._editor = CodeMirror(this.node, config);
        this._editor.on("change", function () {
            _this._startBufferTimer();
        });
    }
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
    EditorWidget.prototype._buildConfig = function () {
        return {
            mode: this._model.mode,
            lineNumbers: this._model.showLineNumbers,
            tabSize: this._model.tabSize
        };
    };
    EditorWidget.prototype._applyConfig = function (config) {
        var _this = this;
        config.value = this._model.buffer;
        this._editor = CodeMirror(this.node, config);
        this._editor.on("change", function () {
            _this._startBufferTimer();
        });
    };
    EditorWidget.prototype._startBufferTimer = function () {
        var _this = this;
        clearTimeout(this._bufferTimeoutId);
        this._bufferTimeoutId = setTimeout(function () {
            var text = _this._editor.getDoc().getValue();
            _this._model.updateBuffer(text);
        }, this._bufferDelay);
    };
    EditorWidget.prototype._modelChanged = function (sender, value) {
        var config = this._buildConfig();
        this._applyConfig(config);
    };
    return EditorWidget;
})(phosphor_widget_1.Widget);
exports.EditorWidget = EditorWidget;
