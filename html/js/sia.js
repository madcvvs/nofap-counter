$(window).on('load',function(){
    $('#myModal').modal('show');
});


// fetch data into table
jQuery.get('/fetch', function(data) {
    $('table').html(data);
});
setInterval(function() {
    jQuery.get('/fetch', function(data) {
        $('table').html(data);
    });
}, 500);

// fetch message counter to index
jQuery.get('/count', function(data) {
    $('#c').html(data);
});
setInterval(function() {
    jQuery.get('/count', function(data) {
        $('#c').html(data);
    });
}, 500);

// fetch server counter to index
/*
jQuery.get('includes/c2.php', function(data) {
    $('#c2').html(data);
});
setInterval(function() {
    jQuery.get('includes/c2.php', function(data) {
        $('#c2').html(data);
    });
}, 500);
*/
