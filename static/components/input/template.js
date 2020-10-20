export const template = `
<div class="field">
    <label for="{{id}}">{{label}}</label>
    <input id="{{id}}" type="{{type}}"/>
    {{{errorHelper}}}
</div>
`;

// {{#if showError}}
// <div>{{errorText}}</div>
// {{else}}
// {{/if}}