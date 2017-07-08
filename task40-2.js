/**
 * Created by Administrator on 2017/4/10.
 */
var  Calender=function(opts) {
    this.input = $(opts.id)[0];
    this.startYear = opts.startYear;
    this.endYear = opts.endYear;
    this.containerId=opts.containerId;
    this.container=opts.containerId;
    this.year = new Date().getFullYear();
    this.month = new Date().getMonth();
    this.date = new Date().getDate();

    this.createTable=function () {
        var inner=$("<div class='title'> <div class='left'></div><select name='year' class='year'></select><select name='month' class='month'></select><div class='right'></div> </div> <div class='weekdays'> <div class='weekday'>日</div><div class='weekday'>一</div><div class='weekday'>二</div><div class='weekday'>三</div><div class='weekday'>四</div><div class='weekday'>五</div><div class='weekday'>六</div> </div> <div class='days'></div>");
        this.container=$("<div id="+this.container+"></div>");
        var confirm=$("<div class='confirm'><button class='enter'>确定</button><button class='cancel'>取消</button></div>")
        $(this.container).addClass("wrap").append(inner).append(confirm);
        $("body").append(this.container);
        this.container[0].style.left=this.input.getBoundingClientRect().left+"px";
        this.container[0].style.top=this.input.getBoundingClientRect().bottom+"px";
        for(var i=this.startYear;i<this.endYear;i++) {
            $("div#"+this.containerId+" .year").append("<option>"+i+"</option>");
        }
        for(var j=1;j<=12;j++){
            $("div#"+this.containerId+" .month").append("<option>"+j+"</option>");
        }
        $(this.container).hide();
    },
    this.initData=function () {
        var nextMonth=this.month+1;
        var dates=new Date(this.year,nextMonth,0).getDate();
        var weekday=new Date(this.year,this.month,1).getDay();
        var now=new Date();
        if(this.year==now.getFullYear()&&this.month==now.getMonth()){
            var index=this.date;
        }
        for(var i=0;i<weekday;i++){
            $("div#"+this.containerId+" .days").append($("<div class='blank'></div>"));
        }
        for(var j=1;j<dates+1;j++){
            $("div#"+this.containerId+" .days").append($('<div class="day">'+j+'</div>'))
            if(index&&index==j){
                $("div#"+this.containerId+" .days").append($('<div class="day toDay">'+j+'</div>'))
            }
        }
        $("div#"+this.containerId+" .year").val(this.year);
        $("div#"+this.containerId+" .month").val(this.month+1);
    },
    this.deletetData=function () {
        $("div#"+this.containerId+" .days").empty();
    },
    this.addEvent=function () {
        var that=this;
        $("div#"+this.containerId+" .title").on("click",function (event) {
            if(event.target.className=="left"){
                var newDate=new Date(that.year,--that.month,that.date);
                that.year=newDate.getFullYear();
                that.month=newDate.getMonth();
                that.date=newDate.getDate();
                that.deletetData();
                that.initData();
            }else if(event.target.className=="right"){
                var newDate=new Date(that.year,++that.month,that.date);
                that.year=newDate.getFullYear();
                that.month=newDate.getMonth();
                that.date=newDate.getDate();
                that.deletetData();
                that.initData();
            }
        });
        $("div#"+this.containerId+" .year").on("change",function (event) {
            var newDate=new Date(this.value,that.month,that.date);
            that.year=newDate.getFullYear();
            that.month=newDate.getMonth();
            that.deletetData();
            that.initData();
        });
        $("div#"+this.containerId+" .month").on("change",function (event) {
            var newDate=new Date(that.year,this.value-1,that.date);
            that.year=newDate.getFullYear();
            that.month=newDate.getMonth();
            that.deletetData();
            that.initData();
        });
        $("div#"+this.containerId+" .days").on("dblclick",function (event) {
            if (event.target.className=="day click") {
                $(that.input).val(that.year + "年" + (that.month+1) + "月" + event.target.innerHTML + "日");
                $(that.container.hide());
            }
        });
        $(that.input).on("click",function () {
            $(that.container).show();
        });
        $("div#"+this.containerId+" .cancel").on("click",function () {
            $(that.container.hide());
        });
        $("div#"+that.containerId+" .days").on("click",function (event) {
            if (event.target.className=="day"&&$("div#"+that.containerId+" .click").length==0) {
                event.target.className+=" click";
            }else if(event.target.className=="day"&&$("div#"+that.containerId+" .click").length==1){
                $("div#"+that.containerId+" .click")[0].className="day";
                event.target.className+=" click";
            }
        });
        $("div#"+that.containerId+" .enter").on("click",function () {
            if ($("div#" + that.containerId + " .click").length==1) {
                $(that.input).val(that.year + "年" + (that.month + 1) + "月" + $("div#" + that.containerId + " .click")[0].innerHTML + "日");
                $(that.container.hide());
            }else{
                alert("请选择日期")
            }
        });
    }
    this.createTable();
    this.initData();
    this.addEvent();
}