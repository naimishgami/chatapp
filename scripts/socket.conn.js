$(function(){
    var socket = io.connect();
    var $messageArea = $('#messageArea');
    var $messageForm = $('#messageForm');
    var $message = $('#message');
    var $chat = $('#chat');

    var $users = $('#users');
    var $userArea = $('#userArea');
    var $userForm = $('#userForm');
    var $username = $('#username');

    $messageForm.submit(function(e){
        console.log('Submitted!!!');
        e.preventDefault();
        socket.emit('send message', $message.val());
        $message.val('');
    });

    $userForm.submit(function(e){
        console.log('User Submitted!!!');
        e.preventDefault();
        socket.emit('new user', $username.val(), function(data){
            if(data) {
                $userArea.hide();
                $messageArea.show();
            }
        });
        $username.val('');
    });

    socket.on('new message', function(data){
        $chat.append('<div class="well"><strong>'+data.user+'</strong>:'+data.msg+'</div>');
    });

    socket.on('get users', function(data) {
        var html = '';
        for (i = 0;i < data.length; i++) {
            html += '<li class="list-group-item">'+data[i]+'</li>';
        }
        $users.html(html);
    });
});