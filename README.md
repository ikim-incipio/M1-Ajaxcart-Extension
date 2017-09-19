M1-Ajaxcart-Extension
========================
Ajax Add to Cart solution from category product listing

Features
--------

* ajax works directly from category product list or grid
* updates the layout immediately such as miniblock block and account menu in header
* works for both simple and configurable products
* able to assign quantity of product to add
* small popup for configurable products

Notes
-----

* added own controller to handle ajax request in the backend
* override layout and template and js to prevent default functions and call ajax
* changed catalog/product/list.phtml and configurableswatches/catalog/product/list/swatches.phtml
* added quantity text input to list.phtml 
* override product-media.js and swatches-list.js under skin/rwd
* route config product ajax to ajaxcart/index and simple product ajax to ajaxcart/simple
* refer to ajaxcart.xml for overrides and addition/removal of js files
* ajaxcart.js contains logic for handling from initiating ajax call to rendering the result

Changelog
---------

### 1.0.1 [2017-09-18]

* added css

### 1.0.0 [2017-09-18]

* fully working extension release
