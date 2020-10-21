export const template = `
<main>
    <div class="container">
        <div class="user-profile-title full-width row-container">
            <div class="white-title">
                <nav>
                    <a href="../chat/chat/chat.html">&lt; Назад</a>
                </nav>
            </div>
        </div>
        <div class="row-container user-profile">
            <div>
                <span class="user-profile-photo">Добавьте фото</span>
            </div>
            <form onsubmit="return logForm()">
                <div class="column-container">
                    <div class="column-container">
                        {{{firtName}}}
                        {{{secondName}}}
                        {{{login}}}
                        {{{email}}}
                        {{{phone}}}
                        {{{oldPassword}}}
                        {{{newPassword}}}
                    </div>

                    <div class="column-container centered-container">
                        {{{button}}}
                    </div>
                </div>
            </form>
        </div>
    </div>
</main>
`;
//# sourceMappingURL=template.js.map