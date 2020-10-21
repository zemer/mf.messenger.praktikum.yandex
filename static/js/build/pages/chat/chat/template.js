export const template = `
<div class="container full-height">
    <div class="main full-width full-height row-container">
        <div class="left-panel full-height column-container">
            <header class="chat-list-title full-width row-container">
                <div>
                    <h1 class="white-title">#ЧАТ</h1>
                </div>
                <div></div>
                <div class="white-title">
                    <nav>
                        <a href="../../user_profile/user_profile.html">Профиль ></a>
                    </nav>
                </div>
            </header>
            <div class="chat-list full-width full-height">
                {{#each items}}
                    {{{this}}}
                {{/each}}
            </div>
        </div>
        <div class="right-panel full-width full-height">
            <header class="messages-title full-width row-container">
                <div>
                    <span class="chat-item-photo" />
                </div>
                <div class="chat-item-user">
                    <span>{{user}}</span>
                </div>
            </header>
            <hr class="devider" />
            <div class="messages full-width full-height column-container">
                {{#each messages}}
                    {{{this}}}
                {{/each}}
            </div>
            <form onsubmit="return logForm()">
                {{{sendMessage}}}
            </form>
        </div>
    </div>
</div>
`;
//# sourceMappingURL=template.js.map