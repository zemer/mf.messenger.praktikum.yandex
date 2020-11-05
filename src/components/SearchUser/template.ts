export const template = `
<div class="edit-message full-width row-container">
    {{{newChatName}}}
    <div>
        {{{buttonCreateChat}}}
    </div>
</div>
<div class="chat-list full-screen">
    {{#each items}}
        {{{this}}}
    {{/each}}
</div>
`; 