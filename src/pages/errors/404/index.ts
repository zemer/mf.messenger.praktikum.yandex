{
    const source = document.getElementById("entry-template")?.innerHTML;
    const template = Handlebars.compile(source);

    const context = {
        title: "404",
        description: `"Прицел 15, трубка 20! Бац! Бац... и мимо" (с)`,
    };

    const block = template(context);

    document.body.innerHTML = block;
}