var $content = $('#content')
var $readMoreBtn = $('<button>')

$content.addClass('partial-hidden')
$readMoreBtn.text('อ่านต่อ').insertAfter($content)

$readMoreBtn.on('click', function () {
	$(this).remove()
	$content.removeClass('partial-hidden')
})

$.ajax({
	url: '/',
	success: function (data) {
		console.log(data)
	}
})