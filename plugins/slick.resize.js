(function ($) {
  // register namespace
  $.extend(true, window, {
    "Slick": {
      "Plugins": {
        "Resize": Resize
      }
    }
  });


  /***
   * A plugin to responsively autoresize the grid on window resizes relative to an anchor element, while maintaining initial relative column widths
   * @param options {Object} Options:
   *    relativeTo:   a DOM element to anchor the resize behavior (should be a parent or ancestor of the grid)
   *    proportion: 0-1 float value giving the proportion of the relativeTo element's width to size the grid.
   * @class Slick.Plugins.Resize
   * @constructor
   */
  function Resize(options) {
    var _grid;
    var _self = this;
	var _windowWidth = document.body.clientWidth;
	var _initialWidths = {};
    var _defaults = {
      relativeTo: document.body,
	  proportion: 1
    };


    function init(grid) {
      options = $.extend(true, {}, _defaults, options);
      _grid = grid;
	  //forceFitColumns must be true for resizing to work properly!
	  _grid.getOptions().forceFitColumns = true;
	  //store the initial widths so when we resize, we can maintain the proportions, even if they
	  //were lost by resizing to all min-widths or all max-width
	  var columns = _grid.getColumns();
      for(var i = 0; i < columns.length; i++){
		_initialWidths[columns[i].id] = columns[i].width || null;
	  }
	  $(window).on("resize", onResize);
	  resize();
    }
	
	function destroy(){
	  $(window).off("resize", onResize);
	}
	
	function onResize(ev){
	  //make sure this is a window resize and not an IE reflow-resize
	  if(document.body.clientWidth != _windowWidth){
	    _windowWidth = document.body.clientWidth;
	    resize();
	  }
	}

	function resize(){
		var $container = $(_grid.getContainerNode());
		var columns = _grid.getColumns();
		$container.css("width", options.proportion * $(options.relativeTo).width());
		for(var i = 0; i < columns.length; i++){
			columns[i].width = _initialWidths[columns[i].id];
		}
		_grid.resizeCanvas();
		_grid.autosizeColumns();
	}

    $.extend(this, {
      "init": init,
      "destroy": destroy,

      "resize": resize
    });
  }
})(jQuery);