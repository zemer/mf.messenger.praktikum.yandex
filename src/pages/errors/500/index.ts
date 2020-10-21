{
    const source = document.getElementById("entry-template")?.innerHTML;
    const template = Handlebars.compile(source);

    const context = {
        title: "500",
        description: "Ведутся работы",
    };

    const block = template(context);

    document.body.innerHTML = block;
}