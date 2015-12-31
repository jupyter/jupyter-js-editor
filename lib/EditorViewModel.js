// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
'use strict';
var phosphor_properties_1 = require('phosphor-properties');
var phosphor_signaling_1 = require('phosphor-signaling');
/**
 * The data model behind the editor view.
 */
var EditorViewModel = (function () {
    /**
     * Construct an Editor Model.
     */
    function EditorViewModel(options) {
        if (options)
            EditorViewModelPrivate.initFrom(this, options);
    }
    Object.defineProperty(EditorViewModel.prototype, "stateChanged", {
        /**
         * A signal emitted when the editor model state changes.
         *
         * #### Notes
         * This is a pure delegate to the [[stateChangedSignal]].
         */
        get: function () {
            return EditorViewModelPrivate.stateChangedSignal.bind(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditorViewModel.prototype, "filename", {
        /**
         * Get the mode for the editor filename.
         */
        get: function () {
            return EditorViewModelPrivate.filenameProperty.get(this);
        },
        /**
         * Set the text for the editor filename.
         */
        set: function (value) {
            EditorViewModelPrivate.filenameProperty.set(this, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditorViewModel.prototype, "fixedHeight", {
        /**
         * Get whether the editor height should be constrained.
         */
        get: function () {
            return EditorViewModelPrivate.fixedHeightProperty.get(this);
        },
        /**
         * Set whether the editor height should be constrained.
         */
        set: function (value) {
            EditorViewModelPrivate.fixedHeightProperty.set(this, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditorViewModel.prototype, "mimetype", {
        /**
         * Get the mode for the editor mimetype.
         */
        get: function () {
            return EditorViewModelPrivate.mimetypeProperty.get(this);
        },
        /**
         * Set the text for the editor mimetype.
         */
        set: function (value) {
            EditorViewModelPrivate.mimetypeProperty.set(this, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditorViewModel.prototype, "lineNumbers", {
        /**
         * Get the lineNumbers flag for the editor model.
         */
        get: function () {
            return EditorViewModelPrivate.lineNumbersProperty.get(this);
        },
        /**
         * Set the lineNumbers flag for the editor model.
         */
        set: function (value) {
            EditorViewModelPrivate.lineNumbersProperty.set(this, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditorViewModel.prototype, "readOnly", {
        /**
         * Get the readOnly flag for the editor model.
         */
        get: function () {
            return EditorViewModelPrivate.readOnlyProperty.get(this);
        },
        /**
         * Set the readOnly flag for the editor model.
         */
        set: function (value) {
            EditorViewModelPrivate.readOnlyProperty.set(this, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditorViewModel.prototype, "tabSize", {
        /**
         * Get the tabSize number for the editor model.
         */
        get: function () {
            return EditorViewModelPrivate.tabSizeProperty.get(this);
        },
        /**
         * Set the tabSize number for the editor model.
         */
        set: function (value) {
            EditorViewModelPrivate.tabSizeProperty.set(this, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditorViewModel.prototype, "text", {
        /**
         * Get the text of the editor model.
         */
        get: function () {
            return EditorViewModelPrivate.textProperty.get(this);
        },
        /**
         * Set the text on the editor model.
         */
        set: function (value) {
            EditorViewModelPrivate.textProperty.set(this, value);
        },
        enumerable: true,
        configurable: true
    });
    return EditorViewModel;
})();
exports.EditorViewModel = EditorViewModel;
/**
 * The namespace for the `EditorViewModel` class private data.
 */
var EditorViewModelPrivate;
(function (EditorViewModelPrivate) {
    /**
     * A signal emitted when the editor state changes.
     */
    EditorViewModelPrivate.stateChangedSignal = new phosphor_signaling_1.Signal();
    /**
     * The property descriptor for the editor mimetype.
     */
    EditorViewModelPrivate.mimetypeProperty = new phosphor_properties_1.Property({
        name: 'mimetype',
        value: '',
        notify: EditorViewModelPrivate.stateChangedSignal
    });
    /**
     * The property descriptor for the editor filename.
     */
    EditorViewModelPrivate.filenameProperty = new phosphor_properties_1.Property({
        name: 'filename',
        value: '',
        notify: EditorViewModelPrivate.stateChangedSignal
    });
    /**
    * A property descriptor which determines whether the editor height should be constrained.
    */
    EditorViewModelPrivate.fixedHeightProperty = new phosphor_properties_1.Property({
        name: 'fixedHeight',
        notify: EditorViewModelPrivate.stateChangedSignal,
        value: false,
    });
    /**
     * The property descriptor for the editor lineNumbers flag.
     */
    EditorViewModelPrivate.lineNumbersProperty = new phosphor_properties_1.Property({
        name: 'lineNumbers',
        value: true,
        notify: EditorViewModelPrivate.stateChangedSignal
    });
    /**
     * The property descriptor for the editor readOnly flag.
     */
    EditorViewModelPrivate.readOnlyProperty = new phosphor_properties_1.Property({
        name: 'readOnly',
        value: false,
        notify: EditorViewModelPrivate.stateChangedSignal
    });
    /**
     * The property descriptor for the editor text.
     */
    EditorViewModelPrivate.textProperty = new phosphor_properties_1.Property({
        name: 'text',
        value: '',
        notify: EditorViewModelPrivate.stateChangedSignal
    });
    /**
     * The property descriptor for the editor tabSize number.
     */
    EditorViewModelPrivate.tabSizeProperty = new phosphor_properties_1.Property({
        name: 'tabSize',
        value: 4,
        notify: EditorViewModelPrivate.stateChangedSignal
    });
    /**
     * Initialize an editor view model from an options object.
     */
    function initFrom(model, options) {
        if (options.mimetype !== void 0) {
            model.mimetype = options.mimetype;
        }
        if (options.filename !== void 0) {
            model.filename = options.filename;
        }
        if (options.fixedHeight !== void 0) {
            model.fixedHeight = options.fixedHeight;
        }
        if (options.lineNumbers !== void 0) {
            model.lineNumbers = options.lineNumbers;
        }
        if (options.readOnly !== void 0) {
            model.readOnly = options.readOnly;
        }
        if (options.text !== void 0) {
            model.text = options.text;
        }
        if (options.tabSize !== void 0) {
            model.tabSize = options.tabSize;
        }
    }
    EditorViewModelPrivate.initFrom = initFrom;
})(EditorViewModelPrivate || (EditorViewModelPrivate = {}));
