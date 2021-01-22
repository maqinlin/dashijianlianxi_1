$(function () {
    $('#link-login').on('click', function () {
        $('.reg-box').show();
        $('.login-box').hide();
    })
    $('#link-reg').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    })
})
//表单验证
verification();

//注册发送请求
register();

//登录发送请求
enter();




//表单验证
function verification() {
    var form = layui.form;
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function (value) {
            var pwd = $('.reg-box [name="password"]').val();
            if (value !== pwd) {
                return '两次密码不一致!'
            }
        }
    })
}

//注册发送请求
function register() {
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        var layer = layui.layer;
        var data = {
            username: $('#form_reg [name="username"]').val(),
            password: $('#form_reg [name="password"]').val()
        };
        $.post('/api/reguser',
            data, function (res) {
                // console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message);
                }
                layer.msg('注册成功,请登录!');
                $('#link-reg').click();
            })
    })
}

//登录发送请求
function enter() {
    $('#form_login').submit(function (e) {
        e.preventDefault()
        let layer = layui.layer;
        $.ajax({
            type: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                // console.log(res.token);
                if (res.status != 0) {
                    return layer.msg(res.message);
                }
                layer.msg('登录成功!');
                localStorage.setItem('token', res.token);
                location.href = 'index.html';
            }
        })
    })
}

