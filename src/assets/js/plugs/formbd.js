/*底部每个表单*/ 
 function add_ajaxmessage() {

        var name = document.getElementById("name");
        var tel = document.getElementById("tel");
		var time = document.getElementById("time");
            var url = window.location.href;
        var mobile = "!/^1\d{10}$/";

        if ($("#name").val() == "") {

            layer.msg("姓名不能为空，请输入姓名!");

            return;

        }
        if ($("#tel").val() == "" || !/^1\d{10}$/.test($("#tel").val())) {

            layer.msg("请输入正确的手机号码!");

            return;

        }

        var dataString =
            'name=' + name.value +
            '&tel=' + tel.value +
			'&time=' + time.value +
			'&url=' + url +
            '&action=post' +
            '&diyid=1&do=2&dede_fields=name,text;tel,text;time,text;url,text&dede_fieldshash=3d48ac0a96fa6a607608161ca1e226e9';


        $.ajax({
            type: "POST",
            url: "/plus/diy.php", //提交到后台文件
            data: dataString, //传值
            success: function(data) {
                //$("#666").html(data);//以html的形式显示在指定id的元素里，看下面注释01
                layer.msg("提交成功"); //显示PHP返回的值，如不需要显示，注释掉这行即可
                $('#form')[0].reset(); //提交后清除id="form"的值
            }
        });
        return false;
    }
	
	/*固定表单*/ 
	 function add_dbbd(){
        var name = document.getElementById("db_name");
            var tel = document.getElementById("db_tel");
            var kc = document.getElementById("db_kc");
            var time = document.getElementById("time");
            var url = window.location.href;
            var mobile = "!/^1\d{10}$/";

            if ($("#db_name").val() == "") {

                layer.msg("姓名不能为空，请输入姓名!");

                return;

            }
            if ($("#db_tel").val() == "" || !/^1\d{10}$/.test($("#db_tel").val())) {

                layer.msg("请输入正确的手机号码!");

                return;

            }

            var dataString =
                'db_name=' + name.value +
                '&db_tel=' + tel.value +
                '&db_kc=' + kc.value +
                '&time=' + time.value +
                
                '&db_url=' + url +
                '&action=post' +
                '&diyid=2&do=2&dede_fields=db_name,text;db_tel,text;db_kc,select;time,text;db_url,text&dede_fieldshash=15eb84b3c7a9994ce7c0552ff8ce9613';


            $.ajax({
                type: "POST",
                url: "../../plus/diy.php", //提交到后台文件
                data: dataString, //传值
                success: function(data) {
                    //$("#666").html(data);//以html的形式显示在指定id的元素里，看下面注释01
                    layer.msg("提交成功"); //显示PHP返回的值，如不需要显示，注释掉这行即可
                    $('#form')[0].reset(); //提交后清除id="form"的值
                }
            });
            return false;
      }
	  
	  /*地址获取*/
	   function add_dztwo(){
		      var xq = document.getElementById("dztwo");
        var name = document.getElementById("dztwo_name");
            var tel = document.getElementById("dztwo_tel");
            var time = document.getElementById("time");
            var url = window.location.href;
            var mobile = "!/^1\d{10}$/";
            if ($("#dztwo_name").val() == "") {

                layer.msg("姓名不能为空，请输入姓名!");

                return;

            }
            if ($("#dztwo_tel").val() == "" || !/^1\d{10}$/.test($("#dztwo_tel").val())) {

                layer.msg("请输入正确的手机号码!");

                return;

            }

            var dataString =
                'dztwo=' + xq.value +
                '&dztwo_name=' + name.value +
                '&dztwo_tel=' + tel.value +
                '&time=' + time.value +
                '&dztow_url=' + url +
                '&action=post' +
                '&diyid=4&do=2&dede_fields=dztwo,select;dztwo_name,text;dztwo_tel,text;time,text;dztow_url,text&dede_fieldshash=467c98fe9b488b347097f049ff4cc7af';


            $.ajax({
                type: "POST",
                url: "/plus/diy.php", //提交到后台文件
                data: dataString, //传值
                success: function(data) {
                    //$("#666").html(data);//以html的形式显示在指定id的元素里，看下面注释01
                    layer.msg("提交成功"); //显示PHP返回的值，如不需要显示，注释掉这行即可
                    $('#form')[0].reset(); //提交后清除id="form"的值
                }
            });
            return false;
      }
       
      

      /*单行表单*/
      function add_ajaxmessage1() {


        var tel = document.getElementById("dz_tel");
        var time = document.getElementById("time");
        var url = window.location.href;
        var mobile = "!/^1\d{10}$/";
        
        
        if ($("#dz_tel").val() == "" || !/^1\d{10}$/.test($("#dz_tel").val())) {
        
            layer.msg("请输入正确的手机号码!");
        
            return;
        
        }
        
        var dataString =
            
            'dz_tel=' + tel.value +
            '&time=' + time.value +
            '&zlhq_url=' + url +
            '&action=post' +
            '&diyid=3&do=2&dede_fields=dz_tel,text;time,text;zlhq_url,text&dede_fieldshash=7a435ddb33f67d8d8119880bed8dd9fc';
        
        
        $.ajax({
            type: "POST",
            url: "/plus/diy.php", //提交到后台文件
            data: dataString, //传值
            success: function(data) {
                //$("#666").html(data);//以html的形式显示在指定id的元素里，看下面注释01
                layer.msg("提交成功"); //显示PHP返回的值，如不需要显示，注释掉这行即可
                $('#form')[0].reset(); //提交后清除id="form"的值
            }
        });
        return false;
        }
	
	