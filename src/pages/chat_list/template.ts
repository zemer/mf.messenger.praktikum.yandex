export const template = `
<div class="container">
    <div class="main full-width full-screen row-container">
        <div class="left-panel column-container">
            <header class="chat-list-title full-width row-container">
                <h1 class="title-font white-title">#ЧАТ</h1>
                <div class="white-title">
                    <nav>
                        {{{toProfile}}}
                    </nav>
                </div>
            </header>
            <div class="white-border">
                {{{buttonPlusChat}}}
                {{{createChat}}}
            </div>
            <div class="chat-list full-width full-height">
                {{#each items}}
                    {{{this}}}
                {{/each}}
            </div>
        </div>
        <div class="right-panel full-width full-height">
            <div class="select-chat full-width full-height column-container">
                <span class="caption-font">Выберите чат</span>
            </div>
        </div>
    </div>
</div>
`; 