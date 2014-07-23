---
layout: main
title: jquery.richTooltip
---

## jQuery.richTooltip

jQuery.richTooltip is a tooltip replacement which, unlike traditional tooltips, is designed to work on both desktop and touch/mobile devices. 

### Usage

{% highlight html %}

	<a href="#" data-rel="tooltip">Help?</a>
	<aside>
		Your tooltip content!
	</aside>

{% endhighlight %}

{% highlight html %}

	<div>
		<a href="#" data-tooltip="#mytooltip">Help?</a>
	</div>
	..
	<aside id="mytooltip" class="rich-tooltip">
		Your tooltip content!
	</aside>

{% endhighlight %}

{% highlight javascript %}
    $('#el').richTooltip({
    	content: $('#mytooltip')
    });
{% endhighlight %}
