---
layout: main
title: jQuery.richTooltips
---

## jQuery.richTooltips

jQuery.richTooltips is simple responsive tooltip replacement for the classic desktop tooltip approach. It is mobile compatible and designed to help in cases where more information may be needed but there isn't a better way to reveal it.

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