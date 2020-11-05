export const template = `
<main>
    <div class="container full-screen">
        <div class="user-profile-title full-width row-container space-between">
            <div class="white-title">
                <nav>
                    {{{backButton}}}
                </nav>
            </div>
            <div class="white-title">
                {{{logoutButton}}}
            </div>
        </div>
        <div class="row-container user-profile full-width overflow-auto">
            {{{avatar}}}
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
                        <input type="file" id="file" required hidden />
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