let sites = [
    "https://www.google.com",
    "/button"
];
let labels = [
    "google",
    "button"
]

let index = 0;

function update(){
    console.log(index);
    try {
        $(".disp").text(labels[index]);
    } catch (err){
        $(".disp").text(sites[index]);
    }
    $(".disp").attr("href",sites[index]);
    
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