export const template = `
<div class="edit-message full-width row-container">
    {{{newChatName}}}
    <div>
        {{{buttonCreateChat}}}
    </div>
</div>
<div class="chat-list full-width full-height">
    {{#each items}}
        {{{this}}}
    {{/each}}
</div>
`; 