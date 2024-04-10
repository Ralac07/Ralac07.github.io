var data;
var index;
function reset(){
    data = [0];
    update();
    data = [];
    update();
    index = 0;
}
function update(){
    $(".result").text(data.join(""));
    try {
        $(".output").text(eval(data.join("").replace("×","*").replace("÷","/")));

    } catch (error) {
        $(".output").text("");
    }
}
reset();
$(".num").on("click",function(){
    data.push($(this).text()==undefined?"":$(this).text());
    index += 1;
    update();
});

$("#flip").on("click",function(){
    data[index-1] *= -1;
    update();
});


$("#c").on("click",function(){
    reset();
    update();
});

$("#ce").on("click",function(){
    data[index-1] = "";
    update();
});


$(".opr").on("click",function(){
    data.push($(this).text());
    index += 1;
    update();
});

$("#submit").on("click",function(){
    // $(".output").text(eval(data.join("").replace("×","*").replace("÷","/")));
    temp = data
    reset()
    data.push(eval(temp.join("").replace("×","*").replace("÷","/")))
    index+=1
    update()
})

$("#memory > .save").on("click",function(){
    
})