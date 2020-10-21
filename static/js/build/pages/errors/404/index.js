"use strict";
var _a;
var source = (_a = document.getElementById("entry-template")) === null || _a === void 0 ? void 0 : _a.innerHTML;
var template = Handlebars.compile(source);
var context = {
    title: "404",
    description: `"Прицел 15, трубка 20! Бац! Бац... и мимо" (с)`,
};
var block = template(context);
document.body.innerHTML = block;
//# sourceMappingURL=index.js.map