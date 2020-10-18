var source = document.getElementById("entry-template")?.innerHTML;
var template = Handlebars.compile(source);

var context = {
    title: "404",
    description: `"Прицел 15, трубка 20! Бац! Бац... и мимо" (с)`,
};

var block = template(context);

document.body.innerHTML = block;