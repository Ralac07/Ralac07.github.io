class Page {
    constructor(name, link) {
        this.name = name;
        this.link = link;
      }
}

let sites = [
    new Page("google","https://www.google.com"),
    new Page("button","/button"),
]

let index = 0;

function update(){
    console.log(index);
    try {
        $(".disp").text(sites[index].name);
    } catch (err){
        $(".disp").text(sites[index].link);
    }
    $(".disp").attr("href",sites[index].link);
    
}
update();
$(".prev").on("click",function(){
    if (index == 0) {
        index = sites.length - 1;
    } else {
        index -= 1;
    }
    update();
})

$(".next").on("click",function(){
    index = (index + 1)% sites.length ;
    update();
})