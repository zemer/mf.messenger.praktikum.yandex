var source = document.getElementById("entry-template")?.innerHTML;
var template = Handlebars.compile(source);

var context = {
    title: "500",
    description: "Ведутся работы",
};

var block = template(context);

document.body.innerHTML = block;