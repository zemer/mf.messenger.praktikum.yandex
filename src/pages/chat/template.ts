const template = `
<div class="container">
    <div class="main full-width full-screen row-container">
        <div class="left-panel column-container">
            <header class="chat-list-title full-width row-container">
                <h1 class="white-title">#ЧАТ</h1>
                <div class="white-title">
                    <nav>
                        {{{toList}}}
                        {{{toProfile}}}
                    </nav>
                </div>
            </header>
            <div class="white-border">
                {{{buttonPlusUser}}}
                {{{createChat}}}
            </div>
            <div class="chat-list full-width full-height">
                {{{usersList}}}
            </div>
        </div>
        <div class="right-panel full-width full-height">
            <header class="messages-title full-width row-container">
                <div>
                    <span class="chat-item-photo" />
                </div>
                <div class="chat-item-title">
                    <span>{{title}}</span>
                </div>
            </header>
            <hr class="devider" />
            <div class="messages full-width full-height column-container overflow-auto">
                {{{messages}}}
            </div>
            <form onsubmit="return logForm()">
                {{{sendMessage}}}
            </form>
        </div>
    </div>
</div>
`;

export default template;
