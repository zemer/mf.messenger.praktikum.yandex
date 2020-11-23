const template = `
<section class="chat-item">
    {{{avatar}}}
    <div>
        <div class="chat-item-title">
            <span>{{title}}</span>
        </div>
        <div class="chat-item-preview">
            <span>{{preview}}</span>
        </div>
    </div>
    <div class="filler"></div>
    <div class="chat-item-date">
        <span>{{date}}</span>
    </div>
    {{{deleteButton}}}
</section>
`;

export default template;
