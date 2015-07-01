/**
 * Created by mingyong on 4/13/15.
 */
 function handleSelectedEvent(e) {
    var model = this.dataItem(e.node);
    var body = document.getElementById('body')
    var view = document.getElementById("sethsw");
    var clientWidth = document.body.clientWidth;
    var clientHeight = document.body.clientHeight;
    var mask = document.getElementById('mask');
    var oAdd = document.getElementById('groupTable');
    var oWindow = document.getElementById('window');
    var oMask = document.getElementById('mask1');
    var oClose = document.getElementById('close');
    var oClose1 = document.getElementById('close1');
//    var oTest = document.getElementById('test');
    var oSystem = document.getElementById('system');
    var oEdit1 = document.getElementById('edit1');
    var set1 = document.getElementById("set1");
    var set2 = document.getElementById("set2");
    var username1 = document.getElementById("username1");
    var email1 = document.getElementById("email1")
    var password1 = document.getElementById("password1")
    var fullname1 = document.getElementById("fullname1")
    var homedirectory1 = document.getElementById("homedirectory1")
    var ssh1 = document.getElementById("ssh1")
    var hidform = document.getElementById("hidform");
    var viewG = document.getElementById('viewG');
    var stor = document.getElementById('Testing');
    var commandName;
    var intervalld;
    var intervalld1;
    var intervalld12;
    oClose.onclick = function () {
        oMask.style.display = 'none';
        oAdd.style.display = 'none';
    }
    oClose1.onclick = function () {
        oMask.style.display = 'none';
        oEdit1.style.display = 'none';
    }
    if (model.text == "Add Group") {
        viewG.style.display='none';
        view.style.display = 'none';
        //oMask.style.width = clientWidth + 'px';
        //oMask.style.height = clientHeight+'px';
        //mask.style.width = clientWidth + 'px';
        //mask.style.height = clientHeight + 'px';
        oMask.style.display = 'block';
        oAdd.style.display = 'block';
        //oAdd.style.left = (clientWidth-oAdd.offsetWidth)/2 +'px';
        //oAdd.style.top = (clientHeight-oAdd.offsetHeight)/2 +'px';
    }


    else if (model.text == "View Groups") {
        stor.style.display = 'none';
        viewG.style.display = 'block';
        oMask.style.display = 'none';
        view.style.display = 'none';
        oAdd.style.display = 'none';
    }
    else if (model.text == "Add User") {
        //body.innerHTML=Template.load('/adduser.html')
        viewG.style.display = 'none';
        mask.style.width = clientWidth + 'px';
        mask.style.height = clientHeight + 'px';
        set1.style.left = (clientWidth - set1.style.offsetWidth) / 2 + 'px';
        set1.style.top = (clientHeight - set1.style.offsetHeight) / 2 + 'px';
        set1.style.display = 'block';
        mask.style.display = 'block';
        view.style.display = 'none';
    }

    else if (model.text == "View Users") {
        oMask.style.display = 'none';
        oAdd.style.display = 'none';
        view.style.display = 'block';
        viewG.style.display='none';
    }
    else if (model.text == "Categorized Mail")
        alert("Categorized Mail")
    else if (model.text == "Large Mail")
        alert("Large Mail")
    else if (model.text == "Unread Mail")
        alert("Unread Mail")
    else if(model.text=="Testing"){
        view.style.display = 'none';
        viewG.style.display = 'none';
        document.getElementById("Testing").style.display="block";
    }
    else {
        $.get("/isuser/", {'username': model.text}, function (r) {
                     //alert(result)
                 if(r) {
                            $.getJSON("/info/", {'username': model.text}, function (str) {
                                //alert(str['password']);
                                username1.value = str['username']
                                fullname1.value = str['fullname']
                                email1.value = str['email']
                                password1.value = str['password']
                                homedirectory1.value = str['homedirectory']
                                ssh1.value = str['ssh']
                            })
                            mask.style.width = clientWidth + 'px';
                            mask.style.height = clientHeight + 'px';
                            set1.style.left = (clientWidth - set1.style.offsetWidth) / 2 + 'px';
                            set1.style.top = (clientHeight - set1.style.offsetHeight) / 2 + 'px';
                            set2.style.display = 'block';
                            mask.style.display = 'block';
                     }
                }
        )
        $.get("/text",{'name':model.text},function(r){
            if(r){
                //oMask.style.width = clientWidth + 'px';
                //oMask.style.height = clientHeight+'px';
                oEdit1.style.display = 'block';
                oMask.style.display ='block';
                //oEdit1.style.left = (clientWidth - oEdit1.offsetWidth)/2 +'px';
                //oEdit1.style.top = (clientHeight - oEdit1.offsetHeight)/2 +'px';
                $.get("/ajax_G",{'name':model.text},function(ret){
                    document.getElementById('g_id').value = ret['groupID'];
                    document.getElementById('g_id1').value =ret['groupID'];
                    document.getElementById('g_name').value = ret['name'];
             })
        }
        } )


    }
}

function graph(){
    var form1 = document.getElementById("container");
    form1.style.display='block';
    var options=$("#testCommand option:selected");
    var hosts = $("#destinationIP").val();
    //var commandName = options.text();
    var result = document.getElementById("result");
    var form = document.getElementById("form");
    form.style.display='none';
    //alert(commandName);
    var ModuleID = options.val();
    if(!ModuleID){
        ModuleID = '1016';
    }
    $("#state").val();
    $("#result").val();
    var url = '/home/?ModuleID='+ModuleID+'&hosts='+hosts+'&commandName='+commandName;

    $.ajax({
        url: url,
        type: "get",
        async: false, //默认为true 异步
        error: function () {
            $("#state").val("Error");
            alert('error');
        },
        success: function (str) {
            //$("#state").val("OK");
            //alert('success');
            //alert(str);
            var str1 = 100 - str;
            var str2 = str / 100;
            var str3 = str1 / 100;
            //alert(str1);
            //$("#result").val(100-data);
            $('#container').highcharts({
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false
                },
                title: {
                    text: 'Cpu'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            color: '#000000',
                            connectorColor: '#000000',
                            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                        }
                    }
                },
                series: [{
                    type: 'pie',
                    name: 'Browser share',
                    data: [
                        ['Occupy', str3],
                        ['Free', str2]
                    ]
                }]
            });

        }

    });

}
function ping(){
    var form1 = document.getElementById("container");
    form1.style.display='none';
    var options=$("#testCommand option:selected");
    var hosts = $("#destinationIP").val();
    var commandName = options.text();
    var form = document.getElementById("form");
    var result = document.getElementById("result");
    //alert(commandName);
    var ModuleID = options.val();
    if(!ModuleID){
        ModuleID = '1016';
    }

    //alert(ModuleID)
    $("#state").val();
    $("#result").val();
    //var hosts = 'www.szu.edu.cn';
    var url = '/home/?ModuleID='+ModuleID+'&hosts='+hosts+'&commandName='+commandName;

    $.ajax({
        url: url,
        type: "get",
        async: false, //默认为true 异步
        error: function () {
            $("#state").val("Error");
            alert('error');
        },
        success: function (str) {
            //

            form.style.display='block';
            $("#result").val(str);

        }

    });
}
function showMemory(){
$(function () {
    var chart1;

    chart1 = new Highcharts.Chart({
        chart: {
	    renderTo: 'container',
            type: 'pie',
            options3d: {
                enabled: true,
                alpha: 45,
                beta: 0
            }
        },
        title: {
            text: 'MemInfo'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 35,
                dataLabels: {
                    enabled: true,
                    format: '{point.name}'
                }
            }
        },
        series: [{
            type: 'pie',
            name: 'percentage',
            data: [
                {
                    name: 'Used Space:'+1-memory(),
                    y: 1-memory(),
                    sliced: true,
                    selected: true
                },
                ['Unused Space'+memory(),   memory()]
            ]
        }]
    });

});
}
function memory(com){
    var form = document.getElementById("form");
    form.style.display='none';
    var form1 = document.getElementById("container");
    form1.style.display='block';
    var options=$("#testCommand option:selected");
    var hosts = $("#destinationIP").val();
    //var commandName = com;//options.text();
    var MemoryUsage;
    var ModuleID = options.val();
    if(!ModuleID){
        ModuleID = '1016';
    }

    $("#state").val();
    $("#result").val();
    //var hosts = 'www.szu.edu.cn';
    var url = '/home/?ModuleID='+ModuleID+'&hosts='+hosts+'&commandName='+commandName;
    $.ajax({
                url:url,
                type:"get",
                async : false, //默认为true 异步
                error:function(){
                    $("#state").val("Error");
                    alert('error');
                },
                success:function(data){
                   $("#state").val("OK");
                   $("#result").val(data);
		   MemoryUsage = parseFloat(data);

               }
            });
    //return MemoryUsage;
    $(function () {
    var chart1;

    chart1 = new Highcharts.Chart({
        chart: {
	    renderTo: 'container',
            type: 'pie',
            options3d: {
                enabled: true,
                alpha: 45,
                beta: 0
            }
        },
        title: {
            text: 'Memory'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 35,
                dataLabels: {
                    enabled: true,
                    format: '{point.name}'
                }
            }
        },
        series: [{
            type: 'pie',
            name: 'percentage',
            data: [
                {
                    name: 'Used Space',
                    y: 1-MemoryUsage,
                    sliced: true,
                    selected: true
                },
                ['Unused Space',   MemoryUsage]
            ]
        }]
    });
    //setInterval(function(){
    //            var series=chart1.series;
    //            while(series.length > 0) {
    //                series[0].remove(false);
    //            }
    //            chart1.redraw();
    //        },5000);
    //
    //         //add new series for the chart
    // setInterval(function(){
    //            chart1.addSeries({
    //               type: 'pie',
    //       	   name: 'percentage',
    //     	   data: [
    //          	    {
    //                name: 'Used Space',
    //                y: 1-memory(),
    //                sliced: true,
    //                selected: true
    //                },
    //                ['Unused Space',   memory()]
    //        	   	 ]
    //          	  }, false);
    //            chart1.redraw();
    //        },5000);
});
}
function getdata(){
    var options=$("#testCommand option:selected");
    var hosts = $("#destinationIP").val();
    var commandName = options.text();
    //alert(commandName);
    var ModuleID = options.val();

    if(!ModuleID){
        ModuleID = '1016';
    }

    $("#state").val();
    $("#result").val();
    //var hosts = 'www.szu.edu.cn';
    var url = '/home/?ModuleID='+ModuleID+'&hosts='+hosts+'&commandName='+commandName;

    var cpuusage;
    var netcodition;
    $.ajax({
                url:url,
                type:"get",
                async :false, //默认为true 异步
                datatype:"json",
                error:function(){
                    $("#state").val("Error");
                    alert('errsor');
                },
                success:function(data){


                $("#state").val("OK");
                //accept by bytes;
                var accept1=data.split(":");
                var accept2=accept1[1].split("(");
                var accept3=accept2[0];
                accept3=accept3/1000;

                  //send by bytes;
                var send1=data.split(":");
                var send2=send1[2].split("(");
                var send3=send2[0];
                send3=send3/1000;

                netcodition=parseFloat(accept3)+parseFloat(send3);
                netcodition=netcodition.toFixed(2);
                 $("#result").val(netcodition);
                //cpuusage=parseFloat(data);

               netcodition=parseFloat(netcodition);

               }
            });

   //return cpuusage;
    return netcodition;
}
function df(){
    var options=$("#testCommand option:selected");
    var hosts = $("#destinationIP").val();
    var commandName = options.text();
    //alert(commandName);
    var ModuleID = options.val();
    if(!ModuleID){
        ModuleID = '1016';
    }

    var disk;

    $("#state").val();
    $("#result").val();
    //var hosts = 'www.szu.edu.cn';
    var url = '/home/?ModuleID='+ModuleID+'&hosts='+hosts+'&commandName='+commandName;
    $.ajax({
                url:url,
                type:"get",
                async : false, //默认为true 异步

                error:function(){
                    $("#state").val("Error");
                    alert('error');
                },

                success:function(data){
                   $("#state").val("OK");
                   $("#result").val(data);
                   disk=data.toString();
                   // alert(disk);
               }
            });
    return disk;
}

function lineName(str){
    var i=0;
    var lineCtn;
    var array=new Array();

    var line = str.split('\n');

    for(i=1;i<line.length;i++){
        lineCtn=line[i];
        var kong = lineCtn.indexOf(' ');
        var name = lineCtn.substring(0,kong);
        array[i-1]=name;
    }

    return array;
}
function lineNum(str){
    var i=0;
    var lineCtn;
    var array=new Array();

    var line = str.split('\n');

    for(i=1;i<line.length;i++){
        lineCtn=line[i];
        var kong = lineCtn.indexOf('%');
        var num = lineCtn.substring(kong-2,kong);
        var val = Number(num);
        array[i-1]=val;
    }

    return array;
}
function lineSize(str){
    var i=0;
    var lineCtn;
    var array=new Array();

    var line = str.split('\n');

    for(i=1;i<line.length;i++){
        lineCtn=line[i];
        ln = lineCtn.replace(/\s+/g, ' ');
        var l1=ln.split(' ');
        var l2=l1[1];
        var val=Number(l2);
        array[i-1]=val;
    }

    return array;
}

function runshowdf(){

    var Sum=0;
    var dPer=new Array();
    var a = df();

    var dName = lineName(a);
    var dNum  = lineNum(a);
    var dSize = lineSize(a);

    for(var j=0;j<dSize.length;j++){
        Sum+=dSize[j];
    }
    for(var k=0;k<dSize.length;k++){
        f=dSize[k]/Sum*100;
        // f=Math.round(x*100)/100;
        // nf=Math.round(f*100)/100);
        var ss=f.toString();
        var string = ss.substring(0,ss.indexOf(".") + 3);
        var aa=Number(string);
        dPer[k]=aa;
    }

    //alert(dPer);

    // $(function () {
    var chart;
    // chart = new Highcharts.Chart({
    $('#container').highcharts({
        chart: {
            // renderTo: 'container',
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        title: {
            text: 'disk'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    color: '#000000',
                    connectorColor: '#000000',
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                }
            }
        },
        series: [{
            type: 'pie',
            name: 'Used rate',
            data: [
                [dName[0], dPer[0]],
                [dName[1], dPer[1]],
                {
                    name: dName[2],
                    y: dPer[2],
                    sliced: true,
                    selected: true
                },
                [dName[3], dPer[3]],
                [dName[4], dPer[4]],
                //[dName[5], dPer[5]],
                // for(i=0;i<dName.length;i++){
                //     [dName[i],]
                // }
            ]
        }]
    // });
    }
    );
}

function runshow(){
    var form = document.getElementById("form");
    form.style.display='none';
    var form1 = document.getElementById("container");
    form1.style.display='block';
$(document).ready(function() {
        Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });

        var chart;
        $('#container').highcharts({
            chart: {
                type: 'spline',
                animation: Highcharts.svg, // don't animate in old IE
                marginRight: 10,
                events: {
                    load: function() {

                        // set up the updating of the chart each second
                        var series = this.series[0];
                        var x;
			intervalld1=setInterval(function() {
                                x = (new Date()).getTime();

			},2000);
			 // current time
			intervalld2=setInterval(function(){
                            var y1 = getdata();

			    var y2;
			    setTimeout(y2=getdata(),1000);
			    var y=y2-y1;
                            series.addPoint([x, y], true, true);
                        }, 2000);
                    }
                }
            },
            title: {
                text: 'get net information'
            },
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 150
            },
            yAxis: {
                title: {
                    text: 'Flow (KB)'

                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                formatter: function() {
                        return '<b>'+ this.series.name +'</b><br/>'+
                        Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) +'<br/>'+
                        Highcharts.numberFormat(this.y, 2);
                }
            },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            series: [{
                name: 'Random data',
                data: (function() {
                    // generate an array of random data
                    var data = [],
                        time = (new Date()).getTime(),
                        i;

                    for (i = -19; i <= 0; i++) {
                        data.push({
                            x: time + i * 1000,
                            y:0
                        });
                    }

                    return data;
                })()
            }]
        });
    });
}
function checkTesting(){
    var options=$("#testCommand option:selected");
    commandName = options.text();

    if(commandName=="top") {
        graph();
        intervalld=setInterval(graph, 5000);
    }
    else if(commandName=="ping")
    {
        ping();
    }
    else if(commandName=="mem"){
        memory();
        intervalld=setInterval(memory,5000);
    }
    else if(commandName=="network"){
        runshow();
    }
    else if(commandName=="df -m"){
        runshowdf();
    }
};
function stop(){
        if(intervalld!=0)
            clearInterval(intervalld);
        if(intervalld1!=0)
            clearInterval(intervalld1);
        if(intervalld2!=0)
            clearInterval(intervalld2);
}