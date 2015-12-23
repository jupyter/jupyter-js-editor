Jupyter JS Editor
=================

Code/text editor for Jupyter.

[API Docs](http://jupyter.github.io/jupyter-js-editor/)


Package Install
---------------

**Prerequisites**
- [node](http://nodejs.org/)

```bash
npm install --save jupyter-js-editor
```


Source Build
------------

**Prerequisites**
- [git](http://git-scm.com/)
- [node 0.12+](http://nodejs.org/)

```bash
git clone https://github.com/jupyter/jupyter-js-editor.git
cd jupyter-js-editor
npm install
npm run build
```

**Rebuild**
```bash
npm run clean
npm run build
```


Run Tests
---------

Follow the source build instructions first.

```bash
npm test
```


Build Docs
----------

Follow the source build instructions first.

```bash
npm run docs
```

Navigate to `docs/index.html`.


Run the Example
---------------

Follow the source build instructions first.

```bash
npm run serve:example
```

Navigate to `example/`.


Supported Runtimes
------------------

The runtime versions which are currently *known to work* are listed below.
Earlier versions may also work, but come with no guarantees.

- IE 11+
- Firefox 32+
- Chrome 38+


Usage Examples
--------------

**Note:** This module is fully compatible with Babel/ES6/ES5. Simply
omit the type declarations when using a language other than TypeScript.
