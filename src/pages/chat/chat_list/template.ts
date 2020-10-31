export const template = `
<div class="container full-height">
    <div class="main full-width full-height row-container">
        <div class="left-panel full-height column-container">
            <header class="chat-list-title full-width row-container">
                <h1 class="title-font white-title">#ЧАТ</h1>
                <div class="white-title">
                    <nav>
                        <a href="/profile">Профиль ></a>
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
            <div class="select-chat full-width full-height column-container">
                <span class="caption-font">Выберите чат</span>
            </div>
        </div>
    </div>
</div>
`; 