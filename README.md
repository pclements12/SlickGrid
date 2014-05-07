# Auto-Resizing SlickGrid
This is a fork of SlickGrid to support responsive resizing of the width of grids. 

To see the original go [here](https://github.com/mleibman/SlickGrid)

# Example Usage

## As a plugin:
'''javascript
   var grid = new Slick.Grid("#myGrid", data, columns, options);	
   var resize = new Slick.Plugins.Resize({resizeTo: document.body, proportion: 0.50});
   grid.registerPlugin(resize);
'''

[Source](https://github.com/pclements12/SlickGrid/blob/master/examples/examples-plugin-resize.html)

## As a built-in SlickGrid option:

'''javascript
 var options = {
	responsiveResize: true,
	resizeRelativeTo: $(".parent"),
	resizeProportion: .75
  };
'''

[Source](https://github.com/pclements12/SlickGrid/blob/master/examples/example15-responsive-resize.html)

