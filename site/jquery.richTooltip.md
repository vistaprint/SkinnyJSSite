---
layout: main
title: jquery.richTooltip
---

## jQuery.richTooltip

jQuery.richTooltip is a responsive tooltip which is designed to be optimized for both mouse and touch driven devices. It relies on [Pointy.js](https://github.com/vistaprint/PointyJS) to standardize user driven events.

### Usage

Tooltips can be created both unobtrusively through data attributes or through a programmatic API.

#### Data attributes

##### By convention

You can create tooltips by convention using an ``<aside>`` element adjacent to any other element containing a the ``data-rel="tooltip"`` attribute.

{% highlight html %}

	<a href="#" data-rel="tooltip">Help?</a>
	<aside>
		Your tooltip content!
	</aside>

{% endhighlight %}

##### With a selector

Alternatively you can specify the tooltip content element via the ``data-tooltip`` attribute giving a selector to tooltip content.

{% highlight html %}

	<div>
		<a href="#" data-tooltip="#mytooltip">Help?</a>
	</div>
	..
	<aside id="mytooltip" class="rich-tooltip">
		Your tooltip content!
	</aside>

{% endhighlight %}

#### Programmatic API

To create a tooltip programmatically you simply call ``$(context).richTooltip(options);``. Here is a simple example:

{% highlight javascript %}

	$('#el').richTooltip({
		content: $('#mytooltip')
	});

{% endhighlight %}

The programmatic API allows you to also programmatically hide and show a tooltip via:

{% highlight javascript %}

	// to show a tootlip
	$(context).richTooltip('show');

	// to hide a tooltip
	$(context).richTooltip('hide');

	// to toggle the tooltip
	$(context).richTooltip('toggle');

{% endhighlight %}

#### Events

##### richTooltip:open

A jQuery event ``richTooltip:open`` is triggered on the tooltip context whenever a wired up tooltip is opened.

{% highlight javascript %}

	$(context).on('richTooltip:open', function (event, tooltip) {
		// tooltip will be the instance of the internal Tooltip class
	});

{% endhighlight %}

##### richTooltip:close

A jQuery event ``richTooltip:close`` is triggered on the tooltip context whenever a wired up tooltip is closed.

{% highlight javascript %}

	$(context).on('richTooltip:close', function (event, tooltip) {
		// tooltip will be the instance of the internal Tooltip class
	});

{% endhighlight %}

#### Options

##### Position

Set via ``pos`` or ``data-tooltip-pos``. Acceptable values are: north, east, south or west. This specifies the desired position for the tooltip to appear, however it is not a guarantee the tooltip will appear in the desired position. Positioning is determined by [jquery.calcRestrainedPos.js](https://github.com/vistaprint/SkinnyJS/blob/master/js/jquery.calcRestrainedPos.js), which calculates where the tooltip will be visible within the viewport, within any containers provided, and not overlapping any obstacles specified. Additionally on small screens, such as mobile devices, east and west directions are ignored and it will default to south if either is used.

##### Arrow Style

Set via the ``arrowStyle`` or ``data-tooltip-arrow-style``. Known values are 'outset' or 'inset', by default the value is 'outset'. This styling is used when calculating the optimized position for a tooltip. When the value is outset, the arrow is known to be outside the tooltip's bounding box and therefore increases the positioning distance from the tooltip context. When the styling is inset, it is assumed the arrow is overlapping the tooltip.

##### Opt-out functionality

###### Don't close on window resize

By default, tooltips are closed on window resize. If you'd like to disable this, you can either set the property ``closeOnWindowResize: false`` or add the data attribute ``data-tooltip-ignore-window-resize`` to the tooltip context.

###### Don't close on document click

By default, tooltips are closed on document clicks that aren't to the tooltip itself or its context. If you'd like to disable this, you can either set the property ``closeOnDocumentClick: false`` or add the data attribute ``data-tooltip-ignore-document-click`` to the tooltip context.