# TEG Engaging Networks Fix Premium Gifts

"Fix" Engaging Networks' premium gifts list so it can be more easily customized and, you know, add label elements for the radio buttons.

## Requires

* jQuery 3.6+ [https://releases.jquery.com/](https://releases.jquery.com/)

## Installation

Ensure you have jQuery and TEENFixPG in your page template. Then just initialize it with a ``new`` statement.

```html

<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js" referrerpolicy="no-referrer"></script>
<script src="https://aaf1a18515da0e792f78-c27fdabe952dfc357fe25ebf5c8897ee.ssl.cf5.rackcdn.com/*EN Site ID*/TEGENFixPG.js" referrerpolicy="no-referrer"></script>
<script>
	jQuery(document).ready(() => {
		window.TEGENPGFixed = new TEGENFixPG({*Options*});
	}); // end jQuery(document).ready
</script>
```

## Options

TEGENFixPG has two optional properties which allow you to set callbacks for when a selection is made or when the list of premiums is altered. Both functions are bound to the
context of the TEENFixPG object with a ``.call(this)`` statement.

| Option      | Default        | Description                                                                                                                                                       |
|-------------|----------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| afterFix    | ``() => true`` | A function to run just after the list of available premiums is updated with labels.                                                                               |
| afterSelect | ``() => true`` | A function to run just after the user makes a premium selection. This is bound to the ``onClick`` and ``onKeydown`` event handlers for the premium radio buttons. |

## Per-Form Customization

If this is installed in a page template and running on multiple premium donation forms, the client will ineveitably want something special for a single page. Because of this,
TEGENFixPG checks for a global object ``TEGENFPGCustom`` with the optional callbacks.

```javascript
var TEGENFPGCustom = {
	afterFix    : () => 'do whatever',
	afterSelect : () => { alert('Premium selected.'); },
} 
```

Drop your definition of ``TEGENFPGCustom`` in a code block at the top of the form.

## Method

# isVisible()

Returns ``true`` if Engaging Networks has populated a premium option in the premium gift block.

```javascript
if (TEGENPGFixed.isVisible()) {
   alert("It's visible!")
}
```
