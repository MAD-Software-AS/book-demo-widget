# mad-book-demo-widget

## Local Development
To install the dependencies for local development, run:

```bash
# Install the dependencies
npm install
```
```bash
# To start the development server, run:
npm run dev
```

## To build the project, run:

```bash
npm run build
```

Move widget.min.js from dist folder to root of your project.

## Installation

```bash
# import the widget in your HTML file
<head>
  <script src="./widget.min.js"></script>
</head>
```

```html
<!-- Add the widget container in your HTML file -->
<div id="mad-book-demo-widget"></div>
```

```javascript
<script>
  window.onload = () => {
    widget = window.MAD_BOOK_DEMO_WIDGET({
      targetId: 'mad-book-demo-widget',
      env: 'dev',
      ...
    });
  }
</script>
```